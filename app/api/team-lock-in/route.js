import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";
import fs from 'fs/promises';
import path from 'path';

const remoteExecutablePath = "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

async function getBrowser() {
  const options = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    headless: "new"
  };

  if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
    return puppeteerCore.launch({
      ...options,
      args: [...options.args, ...chromium.args],
      executablePath: await chromium.executablePath(remoteExecutablePath),
    });
  } else {
    return puppeteer.launch(options);
  }
}

async function scrapeScheduleData() {
  let browser;
  let page;
  
  try {
    browser = await getBrowser();
    page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36');

    console.log('Navigating to Autosport...');
    await page.goto('https://www.autosport.com/f1/schedule/2025/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    const scheduleData = await page.evaluate(() => {
      const items = document.querySelectorAll('.ms-schedule-table__item');
      
      return Array.from(items).map(item => {
        // Get race title
        const titleInfo = item.querySelector('.ms-schedule-table-item-main__info')?.textContent.trim() || 'Unknown Race';
        
        // Get all rows within this race item
        const rows = item.querySelectorAll('tr');
        
        const sessions = Array.from(rows).map(row => {
          // Get the main cell for session type
          const mainCell = row.querySelector('.ms-schedule-table__cell.ms-schedule-table__cell--main');
          const dateCell = row.querySelector('.ms-schedule-table__cell.ms-schedule-table__cell--date');
          
          // Get the raw text content and clean it up
          const mainText = mainCell?.textContent.trim();
          const sessionType = mainText?.split('-')?.pop()?.trim() || 'Unknown';
          
          const dateText = dateCell?.textContent.trim();
          
          // Extract date and time using regex
          const dateMatch = dateText?.match(/(\d{1,2}\s+[A-Za-z]{3})/);
          const timeMatch = dateText?.match(/(\d{1,2}:\d{2})/);
          
          const date = dateMatch ? dateMatch[1] : null;
          const time = timeMatch ? timeMatch[1] : null;
          
          // Combine date and time if both exist
          const formattedDateTime = date && time ? `${date} ${time}` : null;
          
          return {
            type: sessionType,
            dateTime: formattedDateTime
          };
        }).filter(session => session.dateTime && session.type !== 'Unknown'); // Filter out invalid sessions

        const isUpcoming = item.classList.contains('ms-schedule-table__item--upcoming');
        const isOpen = item.classList.contains('ms-schedule-table__item--open');

        return {
          title: titleInfo,
          isUpcoming,
          isOpen,
          sessions
        };
      });
    });
    
    return scheduleData;

  } catch (error) {
    console.error('Error scraping schedule:', error);
    throw error;
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}

export async function GET() {
  try {
    const scheduleData = await scrapeScheduleData();
    const upcomingRace = scheduleData.find(race => race.isUpcoming || race.isOpen);
    const qualifyingSession = upcomingRace?.sessions.find(session => session.type === 'QU');
    
    if (!qualifyingSession) {
      throw new Error('No qualifying session found for upcoming race');
    }

    // Parse the qualifying date and time
    const [day, month, time] = qualifyingSession.dateTime.split(' ');
    const [hours, minutes] = time.split(':');
    
    const months = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    // Create date object for the qualifying time using 2025 for the F1 season
    const qualifyingDate = new Date(2025, months[month], parseInt(day), parseInt(hours), parseInt(minutes));
    
    // Calculate lock time (1 hour before qualifying)
    const lockTime = new Date(qualifyingDate);
    lockTime.setHours(lockTime.getHours() - 1);
    
    const now = new Date();
    
    // Create the response data with all session times
    const raceLockInData = {
      qualifyingDate: qualifyingDate.toISOString(),
      lockTime: lockTime.toISOString(),
      isLocked: now >= lockTime,
      lastUpdated: now.toISOString(),
      upcomingRace: {
        ...upcomingRace,
        sessions: upcomingRace.sessions.map(session => ({
          ...session,
          dateTime: (() => {
            const [d, m, t] = session.dateTime.split(' ');
            const [h, min] = t.split(':');
            return new Date(2025, months[m], parseInt(d), parseInt(h), parseInt(min)).toISOString();
          })()
        }))
      }
    };

    // Create the content for race-lock-in.ts
    const dataFileContent = `import { RaceLockIn } from '../types/team-lock-in';

export const raceLockIn: RaceLockIn = ${JSON.stringify(raceLockInData, null, 2)};

export function updateRaceLockIn(data: RaceLockIn) {
  Object.assign(raceLockIn, data);
}
`;

    const dataFilePath = path.join(process.cwd(), 'lib', 'data', 'race-lock-in.ts');
    await fs.writeFile(dataFilePath, dataFileContent, 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      message: 'Data successfully written to race-lock-in.ts',
      raceLockInData,
      upcomingRace: raceLockInData.upcomingRace
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      errorStack: error.stack
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

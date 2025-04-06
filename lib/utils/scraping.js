import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";
import fs from 'fs/promises';
import path from 'path';

// Constructor name mapping
export const constructorFullNames = {
  'RED': 'Red Bull Racing',
  'MCL': 'McLaren',
  'FER': 'Ferrari',
  'MER': 'Mercedes',
  'AST': 'Aston Martin',
  'WIL': 'Williams',
  'VRB': 'Racing Bulls',
  'KCK': 'Kick Sauber',
  'HAA': 'Haas',
  'ALP': 'Alpine'
};

// Driver name mapping
export const driverFullNames = {
  'NOR': 'Lando Norris',
  'VER': 'Max Verstappen',
  'RUS': 'George Russell',
  'PIA': 'Oscar Piastri',
  'ANT': 'Kimi Antonelli',
  'ALB': 'Alexander Albon',
  'OCO': 'Esteban Ocon',
  'STR': 'Lance Stroll',
  'HAM': 'Lewis Hamilton',
  'LEC': 'Charles Leclerc',
  'HUL': 'Nico Hulkenberg',
  'BEA': 'Oliver Bearman',
  'TSU': 'Yuki Tsunoda',
  'SAI': 'Carlos Sainz',
  'HAD': 'Isack Hadjar',
  'GAS': 'Pierre Gasly',
  'LAW': 'Liam Lawson',
  'DOO': 'Jack Doohan',
  'BOR': 'Gabriel Bortoleto',
  'ALO': 'Fernando Alonso'
};

// Driver team mapping
export const driverTeams = {
  'NOR': 'McLaren',
  'VER': 'Red Bull Racing',
  'RUS': 'Mercedes',
  'PIA': 'McLaren',
  'ANT': 'Mercedes',
  'ALB': 'Williams',
  'OCO': 'Haas',
  'STR': 'Aston Martin',
  'HAM': 'Ferrari',
  'LEC': 'Ferrari',
  'HUL': 'Kick Sauber',
  'BEA': 'Haas',
  'TSU': 'Red Bull Racing',
  'SAI': 'Williams',
  'HAD': 'Racing Bulls',
  'GAS': 'Alpine',
  'LAW': 'Racing Bulls',
  'DOO': 'Alpine',
  'BOR': 'Kick Sauber',
  'ALO': 'Aston Martin'
};

// Country mapping
export const countryToISOCode = {
  'Australia': 'au',
  'Japan': 'jp',
  'China': 'cn',
  'United States': 'us',
  'Miami': 'us',
  'Italy': 'it',
  'Monaco': 'mc',
  'Canada': 'ca',
  'Spain': 'es',
  'Austria': 'at',
  'United Kingdom': 'gb',
  'Great Britain': 'gb',
  'Hungary': 'hu',
  'Belgium': 'be',
  'Netherlands': 'nl',
  'Azerbaijan': 'az',
  'Singapore': 'sg',
  'Mexico': 'mx',
  'Brazil': 'br',
  'Las Vegas': 'us',
  'Qatar': 'qa',
  'Abu Dhabi': 'ae',
  'Saudi Arabia': 'sa',
  'Bahrain': 'bh',
  'Emilia-Romagna': 'it'
};

const remoteExecutablePath = "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

let browser = null;

async function getBrowser() {
  if (browser) return browser;

  try {
    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      // Use chromium-min for Vercel environment
      browser = await puppeteerCore.launch({
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--single-process'
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(remoteExecutablePath),
        headless: true,
        ignoreHTTPSErrors: true
      });
    } else {
      // Local development environment
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true
      });
    }
    return browser;
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }
}

// Change this function to be exported
export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

export async function scrapeConstructorStandings() {
  let page;
  try {
    console.log('Starting F1 Fantasy constructors standings scraper...');
    
    const browser = await getBrowser();
    page = await browser.newPage();
    
    console.log('Navigating to F1 Fantasy Tools Team Calculator...');
    await page.goto('https://f1fantasytools.com/team-calculator', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 8000));

    await page.evaluate(() => {
      const constructorsSection = document.querySelector('h2');
      if (constructorsSection) {
        constructorsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    const standings = await page.evaluate((constructorNames) => {
      const tables = document.querySelectorAll('table');
      const table = tables[tables.length - 1];
      
      if (!table) return [];

      const rows = table.querySelectorAll('tr');

      return Array.from(rows)
        .map(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length < 3) return null;

          const constructorId = cells[0].textContent?.trim() || '';
          const price = cells[1].textContent?.trim() || '';
          const priceChange = cells[2].textContent?.trim() || '';

          if (!constructorId) return null;

          return {
            id: constructorId,
            name: constructorNames[constructorId] || constructorId,
            price: price.replace(/[^0-9.]/g, '') || '',
            priceChange: priceChange.replace(/[^0-9.+-]/g, '') || ''
          };
        })
        .filter(item => item !== null);
    }, constructorFullNames);

    console.log(`Extracted ${standings.length} constructor standings`);
    return { standings };

  } catch (error) {
    console.error('Error scraping F1 Fantasy constructor standings:', error);
    throw error;
  } finally {
    if (page) await page.close();
  }
}

export async function scrapeDriverStandings() {
  let page;
  try {
    console.log('Starting F1 Fantasy standings scraper...');
    
    const browser = await getBrowser();
    page = await browser.newPage();
    
    console.log('Navigating to F1 Fantasy Tools Team Calculator...');
    await page.goto('https://f1fantasytools.com/team-calculator', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 8000));

    const standings = await page.evaluate((driverNames, driverTeams) => {
      const container = document.querySelector('.h-full.w-full.data-\\[panel-group-direction\\=vertical\\]\\:flex-col.flex.min-w-\\[24rem\\].max-w-fit.flex-col.gap-0.overflow-x-auto');
      if (!container) {
        console.log('Main container not found');
        return [];
      }

      const tbody = container.querySelector('[class*="[&_tr:last-child]:border-0"]');
      if (!tbody) {
        console.log('Tbody not found');
        return [];
      }

      const rows = tbody.querySelectorAll('tr');
      console.log(`Found ${rows.length} total rows`);

      return Array.from(rows)
        .map(row => {
          const driverElement = row.querySelector('[class*="rounded-md"][class*="text-white"]') || 
                              row.querySelector('[class*="bg-[var(--bg-color)]"]') ||
                              row.querySelector('[class*="rounded-md"]');
          
          const driverId = driverElement?.textContent?.trim() || '';
          const cells = row.querySelectorAll('td');
          
          const priceText = cells[1]?.textContent?.trim() || '';
          const price = priceText.replace(/[^0-9.]/g, '');
          
          const priceChangeText = cells[2]?.textContent?.trim() || '';
          const priceChange = priceChangeText.replace(/[^0-9.+-]/g, '');

          if (!driverId) {
            console.log('No driver ID found in row');
            return null;
          }

          return {
            id: driverId,
            name: driverNames[driverId] || driverId,
            team: driverTeams[driverId] || 'Unknown Team',
            price: price || '0',
            priceChange: priceChange || '0'
          };
        })
        .filter(item => item !== null);
    }, driverFullNames, driverTeams);

    console.log(`Extracted ${standings.length} driver standings`);
    return { standings };

  } catch (error) {
    console.error('Error scraping F1 Fantasy standings:', error);
    throw error;
  } finally {
    if (page) await page.close();
  }
}

export async function scrapeF1Calendar() {
  let page;
  try {
    console.log('Starting F1 calendar scraper...');
    const browser = await getBrowser();
    page = await browser.newPage();
    
    console.log('Navigating to F1 website...');
    await page.goto('https://www.formula1.com/en/racing/2025', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Page loaded, starting extraction...');

    const data = await page.evaluate(() => {
      const items = document.querySelectorAll('.outline-offset-4.outline-scienceBlue.group.outline-0.focus-visible\\:outline-2');
      console.log(`Found ${items.length} items`);

      return Array.from(items).map(item => {
        const roundText = item.querySelector('.mr-l.pe-xs')?.textContent?.trim() || '';
        const round = roundText === 'TESTING' 
          ? 'TESTING'
          : roundText.replace(/ROUND\s+(\d+)/i, '$1');

        const dateElement = item.querySelector('.f1-inner-wrapper.flex.flex-col.gap-xxs');
        const rawDate = dateElement?.textContent?.trim() || 'N/A';
        const date = rawDate !== 'N/A' ? rawDate.replace(/(\d+)([A-Za-z]+)/, '$1 $2') : 'N/A';
        
        let countryElement = item.querySelector('.f1-heading.tracking-normal.text-fs-18px.leading-tight.normal-case.font-bold.non-italic.f1-heading__body.font-formulaOne.overflow-hidden');
        if (!countryElement || countryElement.textContent?.trim() === '') {
          countryElement = item.querySelector('.f1-heading.tracking-normal.text-fs-22px.tablet\\:text-fs-32px.leading-tight.normal-case.font-bold.non-italic.f1-heading__body.font-formulaOne.flex.items-center');
        }
        const country = countryElement ? countryElement.textContent?.trim() || 'N/A' : 'N/A';

        const nameElement = item.querySelector('.f1-heading.tracking-normal.text-fs-12px.leading-tight.normal-case.font-normal.non-italic.f1-heading__body.font-formulaOne');
        const name = nameElement ? nameElement.textContent?.trim() || 'N/A' : 'N/A';

        return { round, date, country, name };
      });
    });

    const dataWithFlags = data.map(item => {
      if (item.round === 'TESTING') {
        return {
          ...item,
          flagUrl: 'https://media.formula1.com/content/dam/fom-website/races/2025/race-listing/Pre-Season-Testing.jpg'
        };
      }
      
      const isoCode = countryToISOCode[item.country] || '';
      const flagUrl = isoCode ? `https://flagcdn.com/w640/${isoCode}.png` : null;
      return {
        ...item,
        flagUrl
      };
    });

    console.log(`Extracted data: ${JSON.stringify(dataWithFlags, null, 2)}`);
    return dataWithFlags;

  } catch (error) {
    console.error('Error scraping F1 calendar:', error);
    throw error;
  } finally {
    if (page) await page.close();
  }
}

// Add this new function for schedule scraping
export async function scrapeScheduleData() {
  let page;
  try {
    const browser = await getBrowser();
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
        const titleInfo = item.querySelector('.ms-schedule-table-item-main__info')?.textContent.trim() || 'Unknown Race';
        
        const rows = item.querySelectorAll('tr');
        
        const sessions = Array.from(rows).map(row => {
          const mainCell = row.querySelector('.ms-schedule-table__cell.ms-schedule-table__cell--main');
          const dateCell = row.querySelector('.ms-schedule-table__cell.ms-schedule-table__cell--date');
          
          const mainText = mainCell?.textContent.trim();
          const sessionType = mainText?.split('-')?.pop()?.trim() || 'Unknown';
          
          const dateText = dateCell?.textContent.trim();
          
          const dateMatch = dateText?.match(/(\d{1,2}\s+[A-Za-z]{3})/);
          const timeMatch = dateText?.match(/(\d{1,2}:\d{2})/);
          
          const date = dateMatch ? dateMatch[1] : null;
          const time = timeMatch ? timeMatch[1] : null;
          
          const formattedDateTime = date && time ? `${date} ${time}` : null;
          
          return {
            type: sessionType,
            dateTime: formattedDateTime
          };
        }).filter(session => session.dateTime && session.type !== 'Unknown');

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
  }
}

// Update the existing scrapeQualifyingDateTime function
export async function scrapeQualifyingDateTime() {
  try {
    const scheduleData = await scrapeScheduleData();
    const upcomingRace = scheduleData.find(race => race.isUpcoming || race.isOpen);
    const qualifyingSession = upcomingRace?.sessions.find(session => session.type === 'QU');
    
    if (!qualifyingSession) {
      throw new Error('No qualifying session found for upcoming race');
    }

    // Parse the date and time
    const [day, month, time] = qualifyingSession.dateTime.split(' ');
    const [hours, minutes] = time.split(':');
    
    const months = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const qualifyingDate = new Date(2024, months[month], parseInt(day), parseInt(hours), parseInt(minutes));
    return qualifyingDate;

  } catch (error) {
    console.error('Error scraping qualifying date:', error);
    // Return a date 2 hours from now as fallback
    const testDate = new Date();
    testDate.setHours(testDate.getHours() + 2);
    return testDate;
  }
}

export async function isTeamLocked() {
  try {
    const qualifyingDate = await scrapeQualifyingDateTime();
    const now = new Date();
    const lockTime = new Date(qualifyingDate.getTime() - (60 * 60 * 1000));
    
    console.log('Current time:', now);
    console.log('Lock time:', lockTime);
    console.log('Qualifying time:', qualifyingDate);
    
    return now >= lockTime;
  } catch (error) {
    console.error('Error checking team lock status:', error);
    return false;
  }
}

export async function getTimeUntilLock() {
  try {
    const qualifyingDate = await scrapeQualifyingDateTime();
    const now = new Date();
    const lockTime = new Date(qualifyingDate.getTime() - (60 * 60 * 1000));
    
    if (now >= lockTime) {
      return 0;
    }
    
    return lockTime.getTime() - now.getTime();
  } catch (error) {
    console.error('Error calculating time until lock:', error);
    return null;
  }
}

export async function writeConstructorsFile(data) {
  const filePath = path.join(process.cwd(), 'lib', 'data', 'constructors.ts');
  
  const formattedStandings = data.standings.map(standing => `  {
    id: ${JSON.stringify(standing.id)},
    name: ${JSON.stringify(standing.name)},
    price: ${JSON.stringify(standing.price)},
    priceChange: ${JSON.stringify(standing.priceChange)}
  }`).join(',\n');

  const fileContent = `import { ConstructorStanding } from "@/lib/types/standing";

export const constructors: ConstructorStanding[] = [
${formattedStandings}
];
`;

  await fs.writeFile(filePath, fileContent, 'utf-8');
  console.log('Data written to constructors.ts successfully');
}

export async function writeDriversFile(data) {
  const filePath = path.join(process.cwd(), 'lib', 'data', 'drivers.ts');
  
  const formattedStandings = data.standings.map(standing => `  {
    id: ${JSON.stringify(standing.id)},
    name: ${JSON.stringify(standing.name)},
    team: ${JSON.stringify(standing.team)},
    price: ${JSON.stringify(standing.price)},
    priceChange: ${JSON.stringify(standing.priceChange)}
  }`).join(',\n');

  const fileContent = `import { DriverStanding } from "@/lib/types/standing";

export const drivers: DriverStanding[] = [
${formattedStandings}
];
`;

  await fs.writeFile(filePath, fileContent, 'utf-8');
  console.log('Data written to drivers.ts successfully');
}

export async function writeRacesFile(data) {
  const filePath = path.join(process.cwd(), 'lib', 'data', 'races.ts');
  
  const formattedRaces = data.map(race => `  {
    round: ${JSON.stringify(race.round)},
    date: ${JSON.stringify(race.date)},
    country: ${JSON.stringify(race.country)},
    name: ${JSON.stringify(race.name)},
    flagUrl: ${race.flagUrl ? JSON.stringify(race.flagUrl) : 'null'}
  }`).join(',\n');

  const fileContent = `import { Race } from "@/lib/types/race";

export const races: Race[] = [
${formattedRaces}
];
`;

  await fs.writeFile(filePath, fileContent, 'utf-8');
  console.log('Data written to races.ts successfully');
}

export async function writeRaceLockInFile(scheduleData) {
  try {
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

    const dataFileContent = `import { RaceLockIn } from '../types/team-lock-in';

export const raceLockIn: RaceLockIn = ${JSON.stringify(raceLockInData, null, 2)};

export function updateRaceLockIn(data: RaceLockIn) {
  Object.assign(raceLockIn, data);
}
`;

    const dataFilePath = path.join(process.cwd(), 'lib', 'data', 'race-lock-in.ts');
    await fs.writeFile(dataFilePath, dataFileContent, 'utf-8');
    console.log('Data written to race-lock-in.ts successfully');
    return raceLockInData;
  } catch (error) {
    console.error('Error writing race lock-in file:', error);
    throw error;
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const pathname = url.pathname;
    let response;

    if (pathname.includes('team-lock-in')) {
      const scheduleData = await scrapeScheduleData();
      const raceLockInData = await writeRaceLockInFile(scheduleData);
      const upcomingRace = raceLockInData.upcomingRace;

      response = {
        success: true,
        message: 'Data successfully written to race-lock-in.ts',
        raceLockInData,
        upcomingRace
      };
    } else if (pathname.includes('race-calendar-scraper')) {
      const data = await scrapeF1Calendar();
      await writeRacesFile(data);
      response = data;
    } else {
      const isDrivers = pathname.includes('driver-standings-scraper');
      const data = isDrivers 
        ? await scrapeDriverStandings()
        : await scrapeConstructorStandings();
        
      await (isDrivers ? writeDriversFile : writeConstructorsFile)(data);
      response = data;
    }

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      errorStack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await closeBrowser();
  }
} 
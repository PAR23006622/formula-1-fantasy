import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

// Update country name to ISO code mapping
const countryToISOCode = {
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

async function scrapeF1Calendar() {
  let browser;
  try {
    console.log('Starting F1 calendar scraper...');
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();
    
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
        // Extract and format round number
        const roundText = item.querySelector('.mr-l.pe-xs')?.textContent.trim() || '';
        // If it's "TESTING", keep as is, otherwise extract just the number
        const round = roundText === 'TESTING' 
          ? 'TESTING'
          : roundText.replace(/ROUND\s+(\d+)/i, '$1');

        // Extract date, country, and name data
        const dateElement = item.querySelector('.f1-inner-wrapper.flex.flex-col.gap-xxs');
        const rawDate = dateElement ? dateElement.textContent.trim() : 'N/A';
        const date = rawDate !== 'N/A' ? rawDate.replace(/(\d+)([A-Za-z]+)/, '$1 $2') : 'N/A';
        
        // Try both country selectors
        let countryElement = item.querySelector('.f1-heading.tracking-normal.text-fs-18px.leading-tight.normal-case.font-bold.non-italic.f1-heading__body.font-formulaOne.overflow-hidden');
        if (!countryElement || countryElement.textContent.trim() === '') {
          countryElement = item.querySelector('.f1-heading.tracking-normal.text-fs-22px.tablet\\:text-fs-32px.leading-tight.normal-case.font-bold.non-italic.f1-heading__body.font-formulaOne.flex.items-center');
        }
        const country = countryElement ? countryElement.textContent.trim() : 'N/A';

        const nameElement = item.querySelector('.f1-heading.tracking-normal.text-fs-12px.leading-tight.normal-case.font-normal.non-italic.f1-heading__body.font-formulaOne');
        const name = nameElement ? nameElement.textContent.trim() : 'N/A';
        
        console.log(`Round: ${round}, Date: ${date}, Country: ${country}, Name: ${name}`);

        return { round, date, country, name };
      });
    });

    // Update flag URLs logic to handle testing case
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
    await browser.close();
    return dataWithFlags;

  } catch (error) {
    console.error('Error scraping F1 calendar:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

// Update the writeToRacesFile function
async function writeToRacesFile(data) {
  const filePath = path.join(process.cwd(), 'lib', 'data', 'races.ts');
  
  // Format each race object without quotes around property names
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

// Update the GET method to write to file
export async function GET(req) {
  try {
    const data = await scrapeF1Calendar();
    
    // Write the data to races.ts
    await writeToRacesFile(data);

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Export the functions so they can be used by the cron job
export { scrapeF1Calendar, writeToRacesFile }; 
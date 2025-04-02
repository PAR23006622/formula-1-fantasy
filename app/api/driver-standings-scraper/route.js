import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

// Update driver name mapping for 2025 season
const driverFullNames = {
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

// Update driver team mapping for 2025 season
const driverTeams = {
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

async function scrapeF1OfficialGrid() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.formula1.com/en/drivers', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const gridData = await page.evaluate(() => {
      const gridContainer = document.querySelector('.flex.flex-col.tablet\\:grid.tablet\\:grid-cols-12.\\[\\&\\>\\*\\]\\:col-span-12.tablet\\:\\[\\&\\>\\*\\]\\:col-span-6.gap-xl.laptop\\:\\[\\&\\>\\*\\]\\:col-span-4.desktop\\:\\[\\&\\>\\*\\:nth-child\\(-n\\+3\\)\\]\\:col-span-4.desktop\\:\\[\\&\\>\\*\\:nth-child\\(n\\+4\\)\\]\\:col-span-3');
      
      if (!gridContainer) {
        console.log('Grid container not found');
        return [];
      }

      const teamElements = gridContainer.querySelectorAll('.f1-heading.tracking-normal.text-fs-12px.leading-tight.normal-case.font-normal.non-italic.f1-heading__body.font-formulaOne.text-greyDark');
      console.log('Found team elements:', teamElements.length);

      return Array.from(teamElements).map(element => {
        const team = element.textContent?.trim() || '';
        console.log('Team found:', team);
        return team;
      });
    });

    console.log('Scraped team data:', gridData);
    await browser.close();
    return gridData;
  } catch (error) {
    console.error('Error scraping F1 grid:', error);
    if (browser) await browser.close();
    throw error;
  }
}

async function scrapeF1FantasyStandings() {
  let browser;
  try {
    console.log('Starting F1 Fantasy standings scraper...');
    
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    console.log('Navigating to F1 Fantasy Tools Team Calculator...');
    await page.goto('https://f1fantasytools.com/team-calculator', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 8000));

    const standings = await page.evaluate((driverNames, driverTeams) => {
      // First find the main container
      const container = document.querySelector('.h-full.w-full.data-\\[panel-group-direction\\=vertical\\]\\:flex-col.flex.min-w-\\[24rem\\].max-w-fit.flex-col.gap-0.overflow-x-auto');
      if (!container) {
        console.log('Main container not found');
        return [];
      }

      // Find the tbody with the specific class
      const tbody = container.querySelector('[class*="[&_tr:last-child]:border-0"]');
      if (!tbody) {
        console.log('Tbody not found');
        return [];
      }

      // Get all rows
      const rows = tbody.querySelectorAll('tr');
      console.log(`Found ${rows.length} total rows`);

      return Array.from(rows).map(row => {
        // Get driver ID from the colored box - try multiple possible selectors
        const driverElement = row.querySelector('[class*="rounded-md"][class*="text-white"]') || 
                            row.querySelector('[class*="bg-[var(--bg-color)]"]') ||
                            row.querySelector('[class*="rounded-md"]');
        
        const driverId = driverElement?.textContent?.trim();

        // Get all cells
        const cells = row.querySelectorAll('td');
        
        // Get price and price change, making sure to handle any whitespace or currency symbols
        const priceText = cells[1]?.textContent?.trim();
        const price = priceText?.replace(/[^0-9.]/g, '');
        
        const priceChangeText = cells[2]?.textContent?.trim();
        const priceChange = priceChangeText?.replace(/[^0-9.+-]/g, '');

        if (!driverId) {
          console.log('No driver ID found in row');
          return null;
        }

        console.log(`Found driver: ${driverId}, price: ${price}, change: ${priceChange}`);
        return {
          id: driverId,
          name: driverNames[driverId] || driverId,
          team: driverTeams[driverId] || '',
          price: price || '',
          priceChange: priceChange || ''
        };
      }).filter(Boolean);
    }, driverFullNames, driverTeams);

    console.log(`Extracted ${standings.length} driver standings`);
    if (standings.length < 20) {
      console.warn(`Warning: Only found ${standings.length} drivers instead of expected 20`);
    }
    await browser.close();

    return {
      standings: standings
    };

  } catch (error) {
    console.error('Error scraping F1 Fantasy standings:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

async function writeToStandingsFile(data) {
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

export async function GET(req) {
  try {
    const data = await scrapeF1FantasyStandings();
    await writeToStandingsFile(data);

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

export { scrapeF1FantasyStandings, writeToStandingsFile };

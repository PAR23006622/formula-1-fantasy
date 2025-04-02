import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

// Constructor name mapping
const constructorFullNames = {
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

async function scrapeF1FantasyStandings() {
  let browser;
  try {
    console.log('Starting F1 Fantasy constructors standings scraper...');
    
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Navigating to F1 Fantasy Tools Team Calculator...');
    await page.goto('https://f1fantasytools.com/team-calculator', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 8000));

    // Find and click the Constructors section
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

      return Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) return null;

        const constructorId = cells[0].textContent?.trim();
        const price = cells[1].textContent?.trim();
        const priceChange = cells[2].textContent?.trim();

        if (!constructorId) return null;

        return {
          id: constructorId,
          name: constructorNames[constructorId] || constructorId,
          price: price?.replace(/[^0-9.]/g, '') || '',
          priceChange: priceChange?.replace(/[^0-9.+-]/g, '') || ''
        };
      }).filter(Boolean);
    }, constructorFullNames);

    console.log(`Extracted ${standings.length} constructor standings`);
    await browser.close();

    return {
      standings: standings
    };

  } catch (error) {
    console.error('Error scraping F1 Fantasy constructor standings:', error);
    if (browser) await browser.close();
    throw error;
  }
}

async function writeToStandingsFile(data) {
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

import { scrapeConstructorStandings, scrapeDriverStandings, scrapeF1Calendar } from './lib/utils/scraping.js';

async function runScrapers() {
  try {
    console.log('Starting scrapers...');

    console.log('\nScraping constructor standings...');
    const constructorData = await scrapeConstructorStandings();
    console.log('Constructor data:', constructorData);

    console.log('\nScraping driver standings...');
    const driverData = await scrapeDriverStandings();
    console.log('Driver data:', driverData);

    console.log('\nScraping F1 calendar...');
    const calendarData = await scrapeF1Calendar();
    console.log('Calendar data:', calendarData);

  } catch (error) {
    console.error('Error running scrapers:', error);
  }
}

runScrapers(); 
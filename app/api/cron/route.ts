import { 
  scrapeConstructorStandings, 
  writeConstructorsFile, 
  scrapeDriverStandings, 
  writeDriversFile, 
  scrapeF1Calendar, 
  writeRacesFile, 
  scrapeScheduleData, 
  writeRaceLockInFile,
  closeBrowser 
} from '@/lib/utils/scraping';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    console.log('Starting cron job for all scrapers...');
    
    // Run all scrapers in sequence
    console.log('Scraping constructor standings...');
    const constructorData = await scrapeConstructorStandings();
    await writeConstructorsFile(constructorData);

    console.log('Scraping driver standings...');
    const driverData = await scrapeDriverStandings();
    await writeDriversFile(driverData);

    console.log('Scraping F1 calendar...');
    const calendarData = await scrapeF1Calendar();
    await writeRacesFile(calendarData);

    console.log('Scraping race schedule...');
    const scheduleData = await scrapeScheduleData();
    const raceLockInData = await writeRaceLockInFile(scheduleData);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'All data updated successfully',
      data: {
        constructors: constructorData,
        drivers: driverData,
        calendar: calendarData,
        raceLockIn: raceLockInData
      }
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await closeBrowser();
  }
} 
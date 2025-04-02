import { scrapeConstructorStandings, writeConstructorsFile, scrapeDriverStandings, writeDriversFile, scrapeF1Calendar, writeRacesFile } from '@/lib/utils/scraping';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    console.log('Starting cron job for F1 Fantasy data updates...');

    // Run scraping operations one at a time to avoid memory issues
    console.log('Scraping constructor standings...');
    const constructorData = await scrapeConstructorStandings();
    await writeConstructorsFile(constructorData);

    console.log('Scraping driver standings...');
    const driverData = await scrapeDriverStandings();
    await writeDriversFile(driverData);

    console.log('Scraping F1 calendar...');
    const calendarData = await scrapeF1Calendar();
    await writeRacesFile(calendarData);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'All data updated successfully',
      data: {
        constructors: constructorData,
        drivers: driverData,
        calendar: calendarData
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
  }
} 
import { scrapeF1Calendar, writeToRacesFile } from '../race-calendar-scraper/route';
import { scrapeF1FantasyStandings, writeToStandingsFile } from '../driver-standings-scraper/route';

export async function GET(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Run both scrapers
    const [calendarData, standingsData] = await Promise.all([
      scrapeF1Calendar(),
      scrapeF1FantasyStandings()
    ]);

    // Write both data sets
    await Promise.all([
      writeToRacesFile(calendarData),
      writeToStandingsFile(standingsData)
    ]);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Calendar and standings updated successfully' 
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    console.error('Cron job error:', error);
    
    // Type guard to check if error is an Error object
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 
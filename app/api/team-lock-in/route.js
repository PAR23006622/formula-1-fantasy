import { scrapeScheduleData, writeRaceLockInFile } from '@/lib/utils/scraping';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Starting team-lock-in API request...');
    const scheduleData = await scrapeScheduleData();
    console.log('Schedule data:', scheduleData);
    
    const raceLockInData = await writeRaceLockInFile(scheduleData);
    console.log('Race lock-in data:', raceLockInData);
    
    const upcomingRace = raceLockInData.upcomingRace;

    return new Response(JSON.stringify({
      success: true,
      message: 'Data successfully written to race-lock-in.ts',
      raceLockInData,
      upcomingRace
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    // Return fallback data if API fails
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      raceLockInData: {
        // Add your fallback data here
        qualifyingDate: '2025-04-05T07:00:00.000Z',
        lockTime: '2025-04-05T06:00:00.000Z',
        isLocked: false,
        lastUpdated: new Date().toISOString(),
        upcomingRace: {
          title: 'FORMULA 1 LENOVO JAPANESE GRAND PRIX 2025',
          isUpcoming: true,
          isOpen: false,
          sessions: [
            {
              type: 'RACE',
              dateTime: '2025-04-06T06:00:00.000Z'
            },
            {
              type: 'QU',
              dateTime: '2025-04-05T07:00:00.000Z'
            }
          ]
        }
      }
    }), {
      status: 200, // Return 200 even on error to use fallback data
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

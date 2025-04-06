import { scrapeDriverStandings, writeDriversFile } from '@/lib/utils/scraping';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const driverData = await scrapeDriverStandings();
    await writeDriversFile(driverData);

    return new Response(JSON.stringify({
      success: true,
      data: driverData
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 
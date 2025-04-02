import { Race } from "@/lib/types/race";
import { races } from "../data/races";

export function getNextRace(): Race | null {
  const now = new Date();
  const upcomingRaces = races.filter(race => {
    const [startDay, endDay, month] = race.date.split(/[-\s]+/);
    const year = 2025;
    const dateStr = `${endDay} ${month} ${year}`;
    const raceDate = new Date(dateStr);
    return raceDate > now;
  });

  return upcomingRaces[0] || null;
} 
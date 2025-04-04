export interface Session {
  type: string;
  dateTime: string;
}

export interface UpcomingRace {
  title: string;
  isUpcoming: boolean;
  isOpen: boolean;
  sessions: Session[];
}

export interface RaceLockIn {
  qualifyingDate: string;
  lockTime: string;
  isLocked: boolean;
  timeUntilLock: number;
  lastUpdated: string;
  upcomingRace: UpcomingRace;
}

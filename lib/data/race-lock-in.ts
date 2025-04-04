import { RaceLockIn } from '../types/team-lock-in';

export const raceLockIn: RaceLockIn = {
  "qualifyingDate": "2025-04-05T06:00:00.000Z",
  "lockTime": "2025-04-05T05:00:00.000Z",
  "isLocked": false,
  "lastUpdated": "2025-04-04T14:58:56.146Z",
  "upcomingRace": {
    "title": "Japanese GP",
    "isUpcoming": true,
    "isOpen": true,
    "sessions": [
      {
        "type": "Japanese GP",
        "dateTime": "2025-04-06T13:00:00.000Z"
      },
      {
        "type": "News",
        "dateTime": "2025-03-05T15:00:00.000Z"
      },
      {
        "type": "FP1",
        "dateTime": "2025-04-04T02:30:00.000Z"
      },
      {
        "type": "FP2",
        "dateTime": "2025-04-04T06:00:00.000Z"
      },
      {
        "type": "FP3",
        "dateTime": "2025-04-05T02:30:00.000Z"
      },
      {
        "type": "QU",
        "dateTime": "2025-04-05T06:00:00.000Z"
      },
      {
        "type": "RACE",
        "dateTime": "2025-04-06T05:00:00.000Z"
      }
    ]
  }
};

export function updateRaceLockIn(data: RaceLockIn) {
  Object.assign(raceLockIn, data);
}

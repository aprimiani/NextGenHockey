import { Team, Game, PlayerStats, GoalieStats, GameRecapData } from './types';

export const EMAILJS_CONFIG = { SERVICE_ID: 'service_o7zd8ri', PUBLIC_KEY: 'HViFUqA9NIBXgSDaO', CONTACT_TEMPLATE_ID: 'template_ysbjhgn', REGISTRATION_TEMPLATE_ID: 'template_efmg0t4' };

export const PRICING_DATA = {
  EARLY_BIRD: {
    price: 3025,
    deadline: '2026-04-04',
  },
  REGULAR: {
    price: 4125,
    deadline: '2026-05-01',
  },
  INCLUDES: [
    'Minimum 15 games guaranteed',
    'Sponsor Perks',
    'Professional Refereeing',
    'Full Digital Stats & Recaps'
  ]
};

export const TEAMS: Team[] = [
  {
    "id": "1",
    "name": "Bots",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#f59e0b"
  },
  {
    "id": "2",
    "name": "2",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#ef4444"
  },
  {
    "id": "3",
    "name": "3",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#84cc16"
  },
  {
    "id": "4",
    "name": "4",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#a855f7"
  }
];

export const SCHEDULE: Game[] = [
  {
    "id": "g_1771710337796",
    "date": "2026-05-03",
    "time": "14:00",
    "homeTeamId": "3",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771710370090",
    "date": "2026-05-03",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797304880",
    "date": "2026-05-10",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797306185",
    "date": "2026-05-10",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797872922",
    "date": "2026-05-17",
    "time": "13:00",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797873825",
    "date": "2026-05-17",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797944802",
    "date": "2026-05-24",
    "time": "15:00",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797945252",
    "date": "2026-05-24",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797985096",
    "date": "2026-06-07",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797985623",
    "date": "2026-06-07",
    "time": "18:30",
    "homeTeamId": "3",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798031618",
    "date": "2026-06-14",
    "time": "14:00",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798035904",
    "date": "2026-06-14",
    "time": "18:30",
    "homeTeamId": "3",
    "awayTeamId": "1",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798132582",
    "date": "2026-06-21",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798133140",
    "date": "2026-06-21",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798173663",
    "date": "2026-06-28",
    "time": "14:00",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798174326",
    "date": "2026-06-28",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798270556",
    "date": "2026-07-05",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798271082",
    "date": "2026-07-05",
    "time": "18:30",
    "homeTeamId": "3",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798333497",
    "date": "2026-07-12",
    "time": "14:00",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798334065",
    "date": "2026-07-12",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798416249",
    "date": "2026-07-19",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798417193",
    "date": "2026-07-19",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798464840",
    "date": "2026-07-26",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798465348",
    "date": "2026-08-02",
    "time": "14:00",
    "homeTeamId": "3",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798502143",
    "date": "2026-07-26",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798534024",
    "date": "2026-08-02",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798564661",
    "date": "2026-08-09",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798604938",
    "date": "2026-08-09",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  }
];

export const ALL_PLAYERS: PlayerStats[] = [
  {
    "id": "p1",
    "name": "Alessandro Primiani",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p2",
    "name": "Todd Mumford",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p3",
    "name": "Lucas Molinaro",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p4",
    "name": "Michael-Joseph Primiani",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082286306",
    "name": "Jérémy Dumont",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082302464",
    "name": "Olivier St-Cyr",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082310061",
    "name": "Gabriel Savard",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082317648",
    "name": "Zachary Hébert",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082323831",
    "name": "Xavier Lussier",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082324693",
    "name": "Arnaud Gamelin",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082325178",
    "name": "Alexandre Marchand",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  }
];

export const GOALIE_STATS: GoalieStats[] = [
  {
    "id": "g1",
    "name": "Nicolas Primiani",
    "teamId": "1",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "goalie_1767082104234",
    "name": "Massimo Garofalo",
    "teamId": "1",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  }
];

export const GAME_RECAPS: Record<string, GameRecapData> = {};

export const SYSTEM_INSTRUCTION = `You are the "League Assistant" for Next Gen Hockey...`;

import { Team, Game, PlayerStats, GoalieStats, GameRecapData } from './types';

// ---------------------------
// 📧 EMAIL CONFIGURATION
// ---------------------------
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_o7zd8ri', 
  PUBLIC_KEY: 'HViFUqA9NIBXgSDaO',
  CONTACT_TEMPLATE_ID: 'template_ysbjhgn',
  REGISTRATION_TEMPLATE_ID: 'template_efmg0t4', 
};

// ---------------------------
// 🏆 LEAGUE MASTER DATA (Update this file to update the app)
// ---------------------------

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
    "name": "Team 2",
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
    "name": "Team 3",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#14b8a6"
  },
  {
    "id": "4",
    "name": "Team 4",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#d946ef"
  }
];

export const SCHEDULE: Game[] = [
  {
    "id": "g_1766956083939",
    "date": "2026-05-24",
    "time": "17:00",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1766956115537",
    "date": "2025-05-24",
    "time": "18:00",
    "homeTeamId": "3",
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
    "name": "Micheal-Joseph Primiani",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p3",
    "name": "Dylan Molinaro",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p4",
    "name": "Lucas Molinaro",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p5",
    "name": "Olivier St-Cyr",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p6",
    "name": "Gabriel Savard",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p7",
    "name": "Jérémy Dumont",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1766956364002",
    "name": "Xavier Lussier",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1766956370716",
    "name": "Zachary Hébert",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1766956377184",
    "name": "Arnaud Gamelin",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1766956383851",
    "name": "Alexandre Marchand",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1766956390074",
    "name": "Todd Mumford",
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
    "id": "g2",
    "name": "Massimo Garofalo",
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
    "id": "g3",
    "name": "Goalie 3",
    "teamId": "3",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "g4",
    "name": "Goalie 4",
    "teamId": "4",
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

export const SYSTEM_INSTRUCTION = `
You are the "League Assistant" for Next Gen Hockey.
Our Mission: To provide a safer, cheaper, and more inclusive hockey experience while supporting the local Children's Hospital.

GOALIE GAA RULE:
Goalies play full 45-minute games (3x15min). 
Calculate GAA (Goals Against Average) as: Goals Against ÷ Games Played.
When asked for goalie stats:
- Use GAA = GA / GP
- Round GAA to 2 decimal places
- Include the explanation: "GAA is calculated as Goals Against ÷ Games Played."
- Do not use game minutes in your calculation.

Key Information:
- **Safety**: Strict non-contact enforcement.
- **Location**: All games played at the City Center Ice Complex.
- **Schedule**: Games are on Tuesday and Thursday nights.
- **Format**: Three 15-minute running-time periods.
Tone: Helpful, enthusiastic, and concise.
`;
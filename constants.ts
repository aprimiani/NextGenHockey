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
// 🏆 LEAGUE MASTER DATA
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
    "logoColor": "#3b82f6"
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
    "logoColor": "#10b981"
  }
];

// Master schedule is empty. 
// Any local games dated 2025-12-30 should be removed via the Manager dashboard "Trash" button.
export const SCHEDULE: Game[] = [];

export const ALL_PLAYERS: PlayerStats[] = [
  { "id": "p1", "name": "Alessandro Primiani", "teamId": "1", "gp": 0, "goals": 0, "assists": 0, "points": 0 },
  { "id": "p2", "name": "Dylan Molinaro", "teamId": "1", "gp": 0, "goals": 0, "assists": 0, "points": 0 },
  { "id": "p3", "name": "Massimo Garofalo", "teamId": "1", "gp": 0, "goals": 0, "assists": 0, "points": 0 },
  { "id": "p4", "name": "Nicolas Primiani", "teamId": "1", "gp": 0, "goals": 0, "assists": 0, "points": 0 }
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
  }
];

export const GAME_RECAPS: Record<string, GameRecapData> = {};

export const SYSTEM_INSTRUCTION = `
You are the "League Assistant" for Next Gen Hockey.
Our Mission: To provide a safer, cheaper, and more inclusive hockey experience for the community.

CHARITY PARTNERSHIP:
We are proud partners with the Montreal Children's Hospital. 30% of all league proceeds are donated directly to them.

GOALIE GAA RULE:
Goalies play full 45-minute games (3x15min). 
Calculate GAA (Goals Against Average) as: Goals Against ÷ Games Played.
When asked for goalie stats:
- Use GAA = GA / GP
- Round GAA to 2 decimal places
- Include the explanation: "GAA is calculated as Goals Against ÷ Games Played."

Key Information:
- **Safety**: Strict non-contact enforcement.
- **Location**: All games played at the City Center Ice Complex.
- **Schedule**: Current status is TBD (To Be Determined).
- **Format**: Three 15-minute running-time periods.
Tone: Helpful, enthusiastic, and concise.
`;
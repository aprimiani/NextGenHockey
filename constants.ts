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
// 💰 PRICING & DEADLINES
// ---------------------------
export const PRICING_DATA = {
  EARLY_BIRD: {
    price: 3025,
    deadline: 'Date Coming Soon!',
  },
  REGULAR: {
    price: 4125,
    deadline: 'TBD',
  },
  INCLUDES: [
    'Minimum 15 games guaranteed',
    'Sponsor Perks',
    'Professional Refereeing',
    'Full Digital Stats & Recaps'
  ]
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
    "name": "-",
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
    "name": "-",
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
    "name": "-",
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

export const SCHEDULE: Game[] = [];

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
    "name": "Dylan Molinaro",
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

export const SYSTEM_INSTRUCTION = `
You are the "League Assistant" for Next Gen Hockey.
Our Mission: To provide a safer, cheaper, and more inclusive hockey experience for the community.

PRICING & REGISTRATION:
- EARLY BIRD RATE: $3,025 per team. (Early Bird deadline is coming soon).
- REGULAR RATE: $4,125 per team. (Regular deadline is TBD).
- FEE INCLUDES: Minimum 15 games guaranteed, Sponsor Perks, professional referees, and digital stats.
- CHARITY: 30% of these fees are donated to the Montreal Children's Hospital.

CHARITY PARTNERSHIP:
We are proud partners with the Montreal Children's Hospital. 30% of all league proceeds are donated directly to them.

SUBWAY DELSON SPONSORSHIP & PLAYER PERKS:
We have an exclusive partnership with Subway at the Delson location (15, 41 Boulevard Georges-Gagné S, Delson).
- Every player in the league receives a special "Next Gen Player Card."
- THE DEAL: When a player shows their card at the Delson location and purchases any 6-inch sub and a drink, they get a second 6-inch sub for FREE!
- IMPORTANT: This is valid for the ENTIRE season.
- USAGE: Players must keep their card after every purchase to use it again next time. It is not a one-time coupon.
- For any further questions regarding this promotion or other sponsorships, please advise the user to contact the League Director directly.

GOALIE GAA RULE:
Goalies play full 45-minute games (3x15min). 
Calculate GAA (Goals Against Average) as: Goals Against ÷ Games Played.
When asked for goalie stats:
- Use GAA = GA / GP
- Round GAA to 2 decimal places
- Include the explanation: "GAA is calculated as Goals Against ÷ Games Played."

Key Information:
- **Safety**: Strict non-contact enforcement.
- **Location**: All games are played at the Sportium, Sainte-Catherine (105 Pl. Charles-Lemoyne, Sainte-Catherine, QC J5C 0A1).
- **Schedule**: Current status is TBD (To Be Determined).
- **Format**: Three 15-minute running-time periods.
Tone: Helpful, enthusiastic, and concise.
`;
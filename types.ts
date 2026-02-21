export interface Team {
  id: string;
  name: string;
  gp: number; // Manual Games Played
  wins: number;
  losses: number;
  ties: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  logoColor: string;
}

export interface Game {
  id: string;
  date: string;
  time: string;
  homeTeamId: string;
  awayTeamId: string;
  location: string;
  status: 'played' | 'scheduled';
  homeScore?: number;
  awayScore?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PlayerStats {
  id: string;
  name: string;
  teamId: string;
  gp: number; // Added manual GP
  goals: number;
  assists: number;
  points: number;
}

export interface GoalieStats {
  id: string;
  name: string;
  teamId: string;
  gp: number; // Added manual GP
  wins: number;
  losses: number;
  draws: number;
  saves: number; // Calculated: shotsAgainst - goalsAgainst
  shotsAgainst: number;
  goalsAgainst: number;
}

export interface GameEvent {
  id: string;
  type: 'goal' | 'penalty';
  period: number;
  time: string; // e.g., "12:30"
  teamId: string;
  player: string;
  assist?: string; 
  assist2?: string; // Second assist slot
  details?: string; // For penalties (e.g., "Tripping")
}

export interface GameRecapData {
  gameId: string;
  events: GameEvent[];
  goalieStats: {
    homeGoalie: { name: string; shotsFaced: number; saves: number; goalsAgainst: number };
    awayGoalie: { name: string; shotsFaced: number; saves: number; goalsAgainst: number };
  }
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

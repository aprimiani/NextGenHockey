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
  logoUrl?: string;
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
  isPlayoff?: boolean;
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
  player: string; // Player ID
  assist?: string; // Player ID
  assist2?: string; // Player ID
  details?: string; // For penalties (e.g., "Tripping")
  penaltyMinutes?: number;
}

export interface GameRecapData {
  gameId: string;
  events: GameEvent[];
  goalieStats: {
    homeGoalie: { 
      playerId: string; 
      shotsFaced: number; 
      goalsAgainst: number;
      saves: number; // Calculated
    };
    awayGoalie: { 
      playerId: string; 
      shotsFaced: number; 
      goalsAgainst: number;
      saves: number; // Calculated
    };
  }
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

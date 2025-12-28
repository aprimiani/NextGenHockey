import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  TEAMS, 
  SCHEDULE, 
  ALL_PLAYERS, 
  GOALIE_STATS,
  GAME_RECAPS
} from '../constants';
import { Team, Game, PlayerStats, GoalieStats, GameRecapData } from '../types';

interface LeagueDataContextType {
  teams: Team[];
  schedule: Game[];
  players: PlayerStats[];
  goalies: GoalieStats[];
  gameRecaps: Record<string, GameRecapData>;
  loading: boolean;
  setTeams: (teams: Team[]) => void;
  setSchedule: (schedule: Game[]) => void;
  setPlayers: (players: PlayerStats[]) => void;
  setGoalies: (goalies: GoalieStats[]) => void;
  setGameRecaps: (recaps: Record<string, GameRecapData>) => void;
  resetData: () => void;
}

const LeagueDataContext = createContext<LeagueDataContextType | undefined>(undefined);

export const LeagueDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeamsState] = useState<Team[]>(TEAMS);
  const [schedule, setScheduleState] = useState<Game[]>(SCHEDULE);
  const [players, setPlayersState] = useState<PlayerStats[]>(ALL_PLAYERS);
  const [goalies, setGoaliesState] = useState<GoalieStats[]>(GOALIE_STATS);
  const [gameRecaps, setGameRecapsState] = useState<Record<string, GameRecapData>>(GAME_RECAPS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTeams = localStorage.getItem('ng_teams');
    const savedSchedule = localStorage.getItem('ng_schedule');
    const savedPlayers = localStorage.getItem('ng_players');
    const savedGoalies = localStorage.getItem('ng_goalies');
    const savedRecaps = localStorage.getItem('ng_recaps');

    if (savedTeams) setTeamsState(JSON.parse(savedTeams));
    if (savedSchedule) setScheduleState(JSON.parse(savedSchedule));
    if (savedPlayers) setPlayersState(JSON.parse(savedPlayers));
    if (savedGoalies) setGoaliesState(JSON.parse(savedGoalies));
    if (savedRecaps) setGameRecapsState(JSON.parse(savedRecaps));
    
    setLoading(false);
  }, []);

  const setTeams = (data: Team[]) => {
    setTeamsState(data);
    localStorage.setItem('ng_teams', JSON.stringify(data));
  };

  const setSchedule = (data: Game[]) => {
    setScheduleState(data);
    localStorage.setItem('ng_schedule', JSON.stringify(data));
  };

  const setPlayers = (data: PlayerStats[]) => {
    setPlayersState(data);
    localStorage.setItem('ng_players', JSON.stringify(data));
  };

  const setGoalies = (data: GoalieStats[]) => {
    setGoaliesState(data);
    localStorage.setItem('ng_goalies', JSON.stringify(data));
  };

  const setGameRecaps = (data: Record<string, GameRecapData>) => {
    setGameRecapsState({...data});
    localStorage.setItem('ng_recaps', JSON.stringify(data));
  };

  const resetData = () => {
    localStorage.clear();
    setTeamsState(TEAMS);
    setScheduleState(SCHEDULE);
    setPlayersState(ALL_PLAYERS);
    setGoaliesState(GOALIE_STATS);
    setGameRecapsState(GAME_RECAPS);
  };

  return (
    <LeagueDataContext.Provider value={{ 
      teams, 
      schedule, 
      players, 
      goalies, 
      gameRecaps,
      loading,
      setTeams,
      setSchedule,
      setPlayers,
      setGoalies,
      setGameRecaps,
      resetData
    }}>
      {children}
    </LeagueDataContext.Provider>
  );
};

export const useLeagueData = () => {
  const context = useContext(LeagueDataContext);
  if (context === undefined) {
    throw new Error('useLeagueData must be used within a LeagueDataProvider');
  }
  return context;
};
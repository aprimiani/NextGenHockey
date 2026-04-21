import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  TEAMS, 
  SCHEDULE, 
  ALL_PLAYERS, 
  GOALIE_STATS,
  GAME_RECAPS,
  PLAYER_OF_THE_MONTH
} from '../constants';
import { Team, Game, PlayerStats, GoalieStats, GameRecapData, GalleryImage, PlayerOfMonth } from '../types';

type Setter<T> = (data: T | ((prev: T) => T)) => void;

interface LeagueDataContextType {
  teams: Team[];
  schedule: Game[];
  players: PlayerStats[];
  goalies: GoalieStats[];
  gameRecaps: Record<string, GameRecapData>;
  gallery: GalleryImage[];
  playerOfMonth: PlayerOfMonth;
  loading: boolean;
  setTeams: Setter<Team[]>;
  setSchedule: Setter<Game[]>;
  setPlayers: Setter<PlayerStats[]>;
  setGoalies: Setter<GoalieStats[]>;
  setGameRecaps: Setter<Record<string, GameRecapData>>;
  setGallery: Setter<GalleryImage[]>;
  setPlayerOfMonth: Setter<PlayerOfMonth>;
  resetData: () => void;
}

const LeagueDataContext = createContext<LeagueDataContextType | undefined>(undefined);

export const LeagueDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeamsState] = useState<Team[]>(TEAMS);
  const [schedule, setScheduleState] = useState<Game[]>(SCHEDULE);
  const [players, setPlayersState] = useState<PlayerStats[]>(ALL_PLAYERS);
  const [goalies, setGoaliesState] = useState<GoalieStats[]>(GOALIE_STATS);
  const [gameRecaps, setGameRecapsState] = useState<Record<string, GameRecapData>>(GAME_RECAPS);
  const [gallery, setGalleryState] = useState<GalleryImage[]>([]);
  const [playerOfMonth, setPlayerOfMonthState] = useState<PlayerOfMonth>(PLAYER_OF_THE_MONTH);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force a one-time reset to clear the old schedule data
    const hasReset = localStorage.getItem('ng_force_reset_v9');
    if (!hasReset) {
      localStorage.clear();
      localStorage.setItem('ng_force_reset_v9', 'true');
      setTeamsState(TEAMS);
      setScheduleState(SCHEDULE);
      setPlayersState(ALL_PLAYERS);
      setGoaliesState(GOALIE_STATS);
      setGameRecapsState(GAME_RECAPS);
      setGalleryState([]);
      setPlayerOfMonthState(PLAYER_OF_THE_MONTH);
      setLoading(false);
      return;
    }

    const savedTeams = localStorage.getItem('ng_teams');
    const savedSchedule = localStorage.getItem('ng_schedule');
    const savedPlayers = localStorage.getItem('ng_players');
    const savedGoalies = localStorage.getItem('ng_goalies');
    const savedRecaps = localStorage.getItem('ng_recaps');
    const savedGallery = localStorage.getItem('ng_gallery');
    const savedPOM = localStorage.getItem('ng_pom');

    if (savedTeams) {
      const parsed = JSON.parse(savedTeams);
      setTeamsState(parsed);
    }
    
    if (savedSchedule) setScheduleState(JSON.parse(savedSchedule));

    if (savedPlayers) setPlayersState(JSON.parse(savedPlayers));
    if (savedGoalies) setGoaliesState(JSON.parse(savedGoalies));
    if (savedRecaps) setGameRecapsState(JSON.parse(savedRecaps));
    if (savedGallery) setGalleryState(JSON.parse(savedGallery));
    if (savedPOM) setPlayerOfMonthState(JSON.parse(savedPOM));
    
    setLoading(false);
  }, []);

  const createSetter = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>, 
    storageKey: string
  ): Setter<T> => (data) => {
    setter(prev => {
      const next = typeof data === 'function' ? (data as (p: T) => T)(prev) : data;
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const setTeams = createSetter(setTeamsState, 'ng_teams');
  const setSchedule = createSetter(setScheduleState, 'ng_schedule');
  const setPlayers = createSetter(setPlayersState, 'ng_players');
  const setGoalies = createSetter(setGoaliesState, 'ng_goalies');
  const setGameRecaps = createSetter(setGameRecapsState, 'ng_recaps');
  const setGallery = createSetter(setGalleryState, 'ng_gallery');
  const setPlayerOfMonth = createSetter(setPlayerOfMonthState, 'ng_pom');

  const resetData = () => {
    localStorage.clear();
    setTeamsState(TEAMS);
    setScheduleState(SCHEDULE);
    setPlayersState(ALL_PLAYERS);
    setGoaliesState(GOALIE_STATS);
    setGameRecapsState(GAME_RECAPS);
    setGalleryState([]);
    setPlayerOfMonthState(PLAYER_OF_THE_MONTH);
  };

  return (
    <LeagueDataContext.Provider value={{ 
      teams, 
      schedule, 
      players, 
      goalies, 
      gameRecaps,
      gallery,
      playerOfMonth,
      loading,
      setTeams,
      setSchedule,
      setPlayers,
      setGoalies,
      setGameRecaps,
      setGallery,
      setPlayerOfMonth,
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
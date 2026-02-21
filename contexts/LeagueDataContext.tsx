import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  TEAMS, 
  SCHEDULE, 
  ALL_PLAYERS, 
  GOALIE_STATS,
  GAME_RECAPS
} from '../constants';
import { Team, Game, PlayerStats, GoalieStats, GameRecapData, GalleryImage } from '../types';

type Setter<T> = (data: T | ((prev: T) => T)) => void;

interface LeagueDataContextType {
  teams: Team[];
  schedule: Game[];
  players: PlayerStats[];
  goalies: GoalieStats[];
  gameRecaps: Record<string, GameRecapData>;
  gallery: GalleryImage[];
  loading: boolean;
  setTeams: Setter<Team[]>;
  setSchedule: Setter<Game[]>;
  setPlayers: Setter<PlayerStats[]>;
  setGoalies: Setter<GoalieStats[]>;
  setGameRecaps: Setter<Record<string, GameRecapData>>;
  setGallery: Setter<GalleryImage[]>;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force a one-time reset to clear the old schedule data
    const hasReset = localStorage.getItem('ng_force_reset_v3');
    if (!hasReset) {
      localStorage.clear();
      localStorage.setItem('ng_force_reset_v3', 'true');
      setTeamsState(TEAMS);
      setScheduleState(SCHEDULE);
      setPlayersState(ALL_PLAYERS);
      setGoaliesState(GOALIE_STATS);
      setGameRecapsState(GAME_RECAPS);
      setGalleryState([]);
      setLoading(false);
      return;
    }

    const savedTeams = localStorage.getItem('ng_teams');
    const savedSchedule = localStorage.getItem('ng_schedule');
    const savedPlayers = localStorage.getItem('ng_players');
    const savedGoalies = localStorage.getItem('ng_goalies');
    const savedRecaps = localStorage.getItem('ng_recaps');
    const savedGallery = localStorage.getItem('ng_gallery');

    if (savedTeams) {
      const parsed = JSON.parse(savedTeams);
      setTeamsState(parsed);
    }
    
    if (savedSchedule) setScheduleState(JSON.parse(savedSchedule));

    if (savedPlayers) setPlayersState(JSON.parse(savedPlayers));
    if (savedGoalies) setGoaliesState(JSON.parse(savedGoalies));
    if (savedRecaps) setGameRecapsState(JSON.parse(savedRecaps));
    if (savedGallery) setGalleryState(JSON.parse(savedGallery));
    
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

  const resetData = () => {
    localStorage.clear();
    setTeamsState(TEAMS);
    setScheduleState(SCHEDULE);
    setPlayersState(ALL_PLAYERS);
    setGoaliesState(GOALIE_STATS);
    setGameRecapsState(GAME_RECAPS);
    setGalleryState([]);
  };

  return (
    <LeagueDataContext.Provider value={{ 
      teams, 
      schedule, 
      players, 
      goalies, 
      gameRecaps,
      gallery,
      loading,
      setTeams,
      setSchedule,
      setPlayers,
      setGoalies,
      setGameRecaps,
      setGallery,
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
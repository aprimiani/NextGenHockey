import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Calendar, User, Trophy, LayoutList, Shield, ChevronUp, ChevronDown, Layers } from 'lucide-react';
import { Team, PlayerStats, GoalieStats } from '../types';
import { PLAYER_OF_THE_MONTH } from '../constants';

const Standings: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { teams, players, goalies, schedule, gameRecaps, playerOfMonth, loading } = useLeagueData();
  const [activeTab, setActiveTab] = useState<'players' | 'goalies'>('players');
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);
  const [selectedGoalie, setSelectedGoalie] = useState<GoalieStats | null>(null);
  const [modalRole, setModalRole] = useState<'skater' | 'goalie'>('skater');
  const [modalProfileTab, setModalProfileTab] = useState<'recent' | 'career'>('career');

  const openPlayerProfile = (p: PlayerStats) => {
    setSelectedPlayer(p);
    setSelectedGoalie(null);
    setModalRole('skater');
  };

  const openGoalieProfile = (g: GoalieStats) => {
    setSelectedGoalie(g);
    setSelectedPlayer(null);
    setModalRole('goalie');
  };

  // Lock background body scroll when player/goalie modal is active
  useEffect(() => {
    if (selectedPlayer || selectedGoalie) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [selectedPlayer, selectedGoalie]);

  const [selectedSeason, setSelectedSeason] = useState<'summer_2026_reg' | 'summer_2026_playoffs' | 'winter_2026_2027'>('summer_2026_playoffs');

  const seasonsList = [
    { id: 'summer_2026_reg', label: language === 'fr' ? 'Saison Régulière Été 2026' : 'Summer Regular Season 2026' },
    { id: 'summer_2026_playoffs', label: language === 'fr' ? 'Séries Éliminatoires Été 2026' : 'Summer Playoffs 2026' },
    { id: 'winter_2026_2027', label: language === 'fr' ? "Saison d'Hiver 2026-2027" : 'Winter Season 2026-2027' },
  ] as const;

  const playoffStats = useMemo(() => {
    const playoffTeamsMap: Record<string, Team> = {};
    teams.filter(t => !t.id.startsWith('w_')).forEach(t => {
      playoffTeamsMap[t.id] = {
        ...t,
        gp: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0
      };
    });

    const playoffPlayersMap: Record<string, PlayerStats> = {};
    players.filter(p => !p.teamId.startsWith('w_')).forEach(p => {
      playoffPlayersMap[p.id] = {
        ...p,
        gp: 0,
        goals: 0,
        assists: 0,
        points: 0
      };
    });

    const playoffGoaliesMap: Record<string, GoalieStats> = {};
    goalies.filter(g => !g.teamId.startsWith('w_')).forEach(g => {
      playoffGoaliesMap[g.id] = {
        ...g,
        gp: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        saves: 0,
        shotsAgainst: 0,
        goalsAgainst: 0,
        shutouts: 0,
        goals: 0,
        assists: 0,
        points: 0
      };
    });

    const playedPlayoffGames = schedule.filter(g => g.isPlayoff && g.status === 'played');

    playedPlayoffGames.forEach(game => {
      const homeId = game.homeTeamId;
      const awayId = game.awayTeamId;
      const homeScore = game.homeScore || 0;
      const awayScore = game.awayScore || 0;

      if (playoffTeamsMap[homeId]) {
        const t = playoffTeamsMap[homeId];
        t.gp++;
        t.goalsFor += homeScore;
        t.goalsAgainst += awayScore;
        if (homeScore > awayScore) {
          t.wins++;
          t.points += 2;
        } else if (awayScore > homeScore) {
          t.losses++;
        } else {
          t.ties++;
          t.points += 1;
        }
      }

      if (playoffTeamsMap[awayId]) {
        const t = playoffTeamsMap[awayId];
        t.gp++;
        t.goalsFor += awayScore;
        t.goalsAgainst += homeScore;
        if (awayScore > homeScore) {
          t.wins++;
          t.points += 2;
        } else if (homeScore > awayScore) {
          t.losses++;
        } else {
          t.ties++;
          t.points += 1;
        }
      }

      const recap = gameRecaps[game.id];
      if (recap?.roster) {
        const homeAttendees = recap.roster.homePlayers || [];
        const awayAttendees = recap.roster.awayPlayers || [];
        homeAttendees.forEach(pid => {
          if (playoffPlayersMap[pid]) {
            playoffPlayersMap[pid].gp++;
          }
        });
        awayAttendees.forEach(pid => {
          if (playoffPlayersMap[pid]) {
            playoffPlayersMap[pid].gp++;
          }
        });
      } else {
        players.forEach(p => {
          if (p.teamId === homeId) {
            if (playoffPlayersMap[p.id]) {
              playoffPlayersMap[p.id].gp++;
            }
          }
          if (p.teamId === awayId) {
            if (playoffPlayersMap[p.id]) {
              playoffPlayersMap[p.id].gp++;
            }
          }
        });
      }
      if (recap?.events) {
        recap.events.forEach(e => {
          if (e.type === 'goal') {
            if (e.player && playoffPlayersMap[e.player]) {
              playoffPlayersMap[e.player].goals++;
              playoffPlayersMap[e.player].points++;
            }
            if (e.assist && playoffPlayersMap[e.assist]) {
              playoffPlayersMap[e.assist].assists++;
              playoffPlayersMap[e.assist].points++;
            }
            if (e.assist2 && playoffPlayersMap[e.assist2]) {
              playoffPlayersMap[e.assist2].assists++;
              playoffPlayersMap[e.assist2].points++;
            }
          }
        });
      }

      if (recap?.goalieStats) {
        const { homeGoalie, awayGoalie } = recap.goalieStats;
        if (homeGoalie && playoffGoaliesMap[homeGoalie.playerId]) {
          const g = playoffGoaliesMap[homeGoalie.playerId];
          g.gp++;
          g.shotsAgainst += homeGoalie.shotsFaced || 0;
          g.goalsAgainst += homeGoalie.goalsAgainst || 0;
          g.saves += homeGoalie.saves || 0;
          if (homeScore > awayScore) {
            g.wins++;
          } else if (awayScore > homeScore) {
            g.losses++;
          } else {
            g.draws++;
          }
          if ((homeGoalie.goalsAgainst || 0) === 0) {
            g.shutouts = (g.shutouts || 0) + 1;
          }
        }

        if (awayGoalie && playoffGoaliesMap[awayGoalie.playerId]) {
          const g = playoffGoaliesMap[awayGoalie.playerId];
          g.gp++;
          g.shotsAgainst += awayGoalie.shotsFaced || 0;
          g.goalsAgainst += awayGoalie.goalsAgainst || 0;
          g.saves += awayGoalie.saves || 0;
          if (awayScore > homeScore) {
            g.wins++;
          } else if (homeScore > awayScore) {
            g.losses++;
          } else {
            g.draws++;
          }
          if ((awayGoalie.goalsAgainst || 0) === 0) {
            g.shutouts = (g.shutouts || 0) + 1;
          }
        }
      }
    });

    return {
      teams: Object.values(playoffTeamsMap),
      players: Object.values(playoffPlayersMap).filter(p => p.gp > 0 || p.points > 0),
      goalies: Object.values(playoffGoaliesMap).filter(g => g.gp > 0)
    };
  }, [teams, players, goalies, schedule, gameRecaps]);

  const winterStats = useMemo(() => {
    const winterTeamsList = teams.filter(t => t.id.startsWith('w_')).map(t => {
      const wGames = schedule.filter(g => g.status === 'played' && (g.homeTeamId === t.id || g.awayTeamId === t.id));
      let gp = 0, wins = 0, losses = 0, ties = 0, points = 0, goalsFor = 0, goalsAgainst = 0;
      wGames.forEach(g => {
        gp++;
        const isHome = g.homeTeamId === t.id;
        const myScore = isHome ? (g.homeScore || 0) : (g.awayScore || 0);
        const oppScore = isHome ? (g.awayScore || 0) : (g.homeScore || 0);
        goalsFor += myScore;
        goalsAgainst += oppScore;
        if (myScore > oppScore) { wins++; points += 2; }
        else if (myScore < oppScore) { losses++; }
        else { ties++; points += 1; }
      });
      return {
        ...t,
        gp,
        wins,
        losses,
        ties,
        points,
        goalsFor,
        goalsAgainst
      };
    });

    const winterPlayersList = players
      .filter(p => p.seasonTeamIds?.['winter_2026_2027'] || p.teamId.startsWith('w_'))
      .map(p => {
        const winterTeam = p.seasonTeamIds?.['winter_2026_2027'] || p.teamId;
        const winterSecondary = p.seasonSecondaryTeamIds?.['winter_2026_2027'] || [];
        
        let gp = 0, goals = 0, assists = 0, points = 0;
        const playedWinterGames = schedule.filter(g => g.status === 'played' && (g.homeTeamId.startsWith('w_') || g.awayTeamId.startsWith('w_')));
        playedWinterGames.forEach(g => {
          const recap = gameRecaps[g.id];
          let playedThisGame = false;
          if (recap?.events) {
            recap.events.forEach(e => {
              if (e.type === 'goal') {
                if (e.player === p.id) { goals++; points++; playedThisGame = true; }
                if (e.assist === p.id || e.assist2 === p.id) { assists++; points++; playedThisGame = true; }
              }
            });
          }
          if (playedThisGame) gp++;
        });

        return {
          ...p,
          teamId: winterTeam,
          secondaryTeamIds: winterSecondary,
          gp,
          goals,
          assists,
          points
        };
      });

    const winterGoaliesList = goalies
      .filter(g => g.seasonTeamIds?.['winter_2026_2027'] || g.teamId.startsWith('w_'))
      .map(g => {
        const winterTeam = g.seasonTeamIds?.['winter_2026_2027'] || g.teamId;
        const winterSecondary = g.seasonSecondaryTeamIds?.['winter_2026_2027'] || [];

        let gp = 0, wins = 0, losses = 0, draws = 0, saves = 0, shotsAgainst = 0, goalsAgainst = 0, shutouts = 0;
        const playedWinterGames = schedule.filter(gm => gm.status === 'played' && (gm.homeTeamId.startsWith('w_') || gm.awayTeamId.startsWith('w_')));
        playedWinterGames.forEach(gm => {
          const recap = gameRecaps[gm.id];
          if (recap?.goalieStats) {
            const isHomeG = recap.goalieStats.homeGoalie?.playerId === g.id;
            const isAwayG = recap.goalieStats.awayGoalie?.playerId === g.id;
            if (isHomeG || isAwayG) {
              gp++;
              const stats = isHomeG ? recap.goalieStats.homeGoalie : recap.goalieStats.awayGoalie;
              shotsAgainst += stats.shotsFaced || 0;
              goalsAgainst += stats.goalsAgainst || 0;
              saves += stats.saves || 0;
              const myScore = isHomeG ? gm.homeScore : gm.awayScore;
              const oppScore = isHomeG ? gm.awayScore : gm.homeScore;
              if (myScore !== undefined && oppScore !== undefined) {
                if (myScore > oppScore) wins++;
                else if (myScore < oppScore) losses++;
                else draws++;
              }
              if ((stats.goalsAgainst || 0) === 0) shutouts++;
            }
          }
        });

        return {
          ...g,
          teamId: winterTeam,
          secondaryTeamIds: winterSecondary,
          gp,
          wins,
          losses,
          draws,
          saves,
          shotsAgainst,
          goalsAgainst,
          shutouts,
          goals: 0,
          assists: 0,
          points: 0
        };
      });

    return {
      teams: winterTeamsList,
      players: winterPlayersList,
      goalies: winterGoaliesList
    };
  }, [teams, players, goalies, schedule, gameRecaps]);

  const activeTeamsList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') return teams.filter(t => !t.id.startsWith('w_'));
    if (selectedSeason === 'summer_2026_playoffs') return playoffStats.teams.filter(t => !t.id.startsWith('w_'));
    return winterStats.teams;
  }, [selectedSeason, teams, playoffStats, winterStats]);

  const activePlayersList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') return players.filter(p => !p.teamId.startsWith('w_'));
    if (selectedSeason === 'summer_2026_playoffs') return playoffStats.players.filter(p => !p.teamId.startsWith('w_'));
    return winterStats.players;
  }, [selectedSeason, players, playoffStats, winterStats]);

  const activeGoaliesList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') return goalies.filter(g => !g.teamId.startsWith('w_'));
    if (selectedSeason === 'summer_2026_playoffs') return playoffStats.goalies.filter(g => !g.teamId.startsWith('w_'));
    return winterStats.goalies;
  }, [selectedSeason, goalies, playoffStats, winterStats]);

  const activeScheduleList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') {
      return schedule.filter(g => !g.isPlayoff && !g.homeTeamId.startsWith('w_'));
    }
    if (selectedSeason === 'summer_2026_playoffs') {
      return schedule.filter(g => g.isPlayoff && !g.homeTeamId.startsWith('w_'));
    }
    return schedule.filter(g => g.homeTeamId.startsWith('w_') || g.awayTeamId.startsWith('w_'));
  }, [selectedSeason, schedule]);

  // Sorting State
  type PoolSortKey = 'seed' | 'name' | 'regWinPct' | 'gp' | 'wins' | 'losses' | 'ties' | 'points' | 'winPct' | 'goalsFor' | 'goalsAgainst' | 'diff';

  const [teamSort, setTeamSort] = useState<{ key: keyof Team | 'rank' | 'winPct' | 'diff'; dir: 'asc' | 'desc' }>({ key: 'winPct', dir: 'desc' });
  const [playerSort, setPlayerSort] = useState<{ key: keyof PlayerStats | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [goalieSort, setGoalieSort] = useState<{ key: keyof GoalieStats | 'gaa' | 'svPct' | 'rank'; dir: 'asc' | 'desc' }>({ key: 'svPct', dir: 'desc' });

  // Playoff Pools Sorting State
  const [pool1Sort, setPool1Sort] = useState<{ key: PoolSortKey; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [pool2Sort, setPool2Sort] = useState<{ key: PoolSortKey; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });

  // Playoff View Mode ('pools' or 'overall')
  const [playoffViewMode, setPlayoffViewMode] = useState<'pools' | 'overall'>('pools');

  // Team Profile Sorting State
  const [teamPlayerSort, setTeamPlayerSort] = useState<{ key: keyof PlayerStats | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [teamGoalieSort, setTeamGoalieSort] = useState<{ key: keyof GoalieStats | 'gaa' | 'svPct' | 'rank'; dir: 'asc' | 'desc' }>({ key: 'svPct', dir: 'desc' });

  const handleSort = <T,>(
    currentSort: { key: keyof T | any; dir: 'asc' | 'desc' },
    setSort: React.Dispatch<React.SetStateAction<{ key: keyof T | any; dir: 'asc' | 'desc' }>>,
    key: keyof T | any
  ) => {
    if (currentSort.key === key) {
      setSort({ key, dir: currentSort.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, dir: 'desc' });
    }
  };

  const SortIcon = ({ sort, column }: { sort: { key: any; dir: 'asc' | 'desc' }; column: any }) => {
    if (sort.key !== column) return <div className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-20 transition-opacity"><ChevronUp size={14} /></div>;
    return sort.dir === 'asc' ? <ChevronUp size={14} className="ml-1 text-ng-light-blue" /> : <ChevronDown size={14} className="ml-1 text-ng-light-blue" />;
  };

  // Process and Sort Teams
  const sortedTeams = [...activeTeamsList].sort((a, b) => {
    if (teamSort.key === 'rank') return 0;
    
    let valA: number | string;
    let valB: number | string;

    if (teamSort.key === 'winPct') {
      valA = a.gp > 0 ? (a.wins / a.gp) : 0;
      valB = b.gp > 0 ? (b.wins / b.gp) : 0;
    } else if (teamSort.key === 'diff') {
      valA = a.goalsFor - a.goalsAgainst;
      valB = b.goalsFor - b.goalsAgainst;
    } else {
      const key = teamSort.key as keyof Team;
      valA = a[key] ?? 0;
      valB = b[key] ?? 0;
    }

    if (typeof valA === 'string') {
      return teamSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }

    if (teamSort.dir === 'asc') {
      return (valA as number) - (valB as number);
    } else {
      return (valB as number) - (valA as number);
    }
  });

  // Secondary sort for teams if primary sort is points or winPct
  if (teamSort.key === 'points') {
    sortedTeams.sort((a, b) => {
      if (b.points !== a.points) return teamSort.dir === 'asc' ? a.points - b.points : b.points - a.points;
      return teamSort.dir === 'asc' ? a.wins - b.wins : b.wins - a.wins;
    });
  } else if (teamSort.key === 'winPct') {
    sortedTeams.sort((a, b) => {
      const winPctA = a.gp > 0 ? a.wins / a.gp : 0;
      const winPctB = b.gp > 0 ? b.wins / b.gp : 0;
      if (winPctA !== winPctB) return teamSort.dir === 'asc' ? winPctA - winPctB : winPctB - winPctA;
      if (b.points !== a.points) return teamSort.dir === 'asc' ? a.points - b.points : b.points - a.points;
      return teamSort.dir === 'asc' ? a.wins - b.wins : b.wins - a.wins;
    });
  }

  // Regular Season Ranked Teams by Win Percentage for Playoff Seeding (Summer 2026 only)
  const regSeasonRankedTeams = useMemo(() => {
    const summerTeams = teams.filter(t => !t.id.startsWith('w_'));
    return [...summerTeams].sort((a, b) => {
      const winPctA = a.gp > 0 ? a.wins / a.gp : 0;
      const winPctB = b.gp > 0 ? b.wins / b.gp : 0;
      if (winPctB !== winPctA) return winPctB - winPctA;
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      const diffA = a.goalsFor - a.goalsAgainst;
      const diffB = b.goalsFor - b.goalsAgainst;
      if (diffB !== diffA) return diffB - diffA;
      return b.goalsFor - a.goalsFor;
    });
  }, [teams]);

  // Pool 1: Seeds #1, #4, #5, #8 (Indices 0, 3, 4, 7)
  const pool1Seeded = useMemo(() => {
    const indices = [0, 3, 4, 7];
    return indices.map(idx => {
      const regTeam = regSeasonRankedTeams[idx];
      if (!regTeam) return null;
      const playoffTeam = playoffStats.teams.find(t => t.id === regTeam.id) || {
        ...regTeam,
        gp: 0, wins: 0, losses: 0, ties: 0, points: 0, goalsFor: 0, goalsAgainst: 0
      };
      const regWinPct = regTeam.gp > 0 ? regTeam.wins / regTeam.gp : 0;
      return { regTeam, playoffTeam, seed: idx + 1, regWinPct };
    }).filter(Boolean) as { regTeam: Team; playoffTeam: Team; seed: number; regWinPct: number }[];
  }, [regSeasonRankedTeams, playoffStats.teams]);

  // Pool 2: Seeds #2, #3, #6, #7 (Indices 1, 2, 5, 6)
  const pool2Seeded = useMemo(() => {
    const indices = [1, 2, 5, 6];
    return indices.map(idx => {
      const regTeam = regSeasonRankedTeams[idx];
      if (!regTeam) return null;
      const playoffTeam = playoffStats.teams.find(t => t.id === regTeam.id) || {
        ...regTeam,
        gp: 0, wins: 0, losses: 0, ties: 0, points: 0, goalsFor: 0, goalsAgainst: 0
      };
      const regWinPct = regTeam.gp > 0 ? regTeam.wins / regTeam.gp : 0;
      return { regTeam, playoffTeam, seed: idx + 1, regWinPct };
    }).filter(Boolean) as { regTeam: Team; playoffTeam: Team; seed: number; regWinPct: number }[];
  }, [regSeasonRankedTeams, playoffStats.teams]);

  const sortPoolTeams = useCallback((
    items: { regTeam: Team; playoffTeam: Team; seed: number; regWinPct: number }[],
    sort: { key: PoolSortKey; dir: 'asc' | 'desc' }
  ): { regTeam: Team; playoffTeam: Team; seed: number; regWinPct: number }[] => {
    return [...items].sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sort.key) {
        case 'seed':
          valA = a.seed;
          valB = b.seed;
          break;
        case 'name':
          valA = a.regTeam.name;
          valB = b.regTeam.name;
          break;
        case 'regWinPct':
          valA = a.regWinPct;
          valB = b.regWinPct;
          break;
        case 'gp':
          valA = a.playoffTeam.gp;
          valB = b.playoffTeam.gp;
          break;
        case 'wins':
          valA = a.playoffTeam.wins;
          valB = b.playoffTeam.wins;
          break;
        case 'losses':
          valA = a.playoffTeam.losses;
          valB = b.playoffTeam.losses;
          break;
        case 'ties':
          valA = a.playoffTeam.ties;
          valB = b.playoffTeam.ties;
          break;
        case 'points':
          valA = a.playoffTeam.points;
          valB = b.playoffTeam.points;
          break;
        case 'winPct':
          valA = a.playoffTeam.gp > 0 ? a.playoffTeam.wins / a.playoffTeam.gp : 0;
          valB = b.playoffTeam.gp > 0 ? b.playoffTeam.wins / b.playoffTeam.gp : 0;
          break;
        case 'goalsFor':
          valA = a.playoffTeam.goalsFor;
          valB = b.playoffTeam.goalsFor;
          break;
        case 'goalsAgainst':
          valA = a.playoffTeam.goalsAgainst;
          valB = b.playoffTeam.goalsAgainst;
          break;
        case 'diff':
          valA = a.playoffTeam.goalsFor - a.playoffTeam.goalsAgainst;
          valB = b.playoffTeam.goalsFor - b.playoffTeam.goalsAgainst;
          break;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sort.dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (valA === valB) {
        if (b.playoffTeam.points !== a.playoffTeam.points) {
          return b.playoffTeam.points - a.playoffTeam.points;
        }
        return a.seed - b.seed;
      }

      return sort.dir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, []);

  const sortedPool1 = useMemo(() => sortPoolTeams(pool1Seeded, pool1Sort), [pool1Seeded, pool1Sort, sortPoolTeams]);
  const sortedPool2 = useMemo(() => sortPoolTeams(pool2Seeded, pool2Sort), [pool2Seeded, pool2Sort, sortPoolTeams]);

  const sortedPlayers = [...activePlayersList].sort((a, b) => {
    if (playerSort.key === 'rank') return 0;
    const key = playerSort.key as keyof PlayerStats;
    let valA = a[key];
    let valB = b[key];

    if (typeof valA === 'string') {
      return playerSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }

    if (playerSort.dir === 'asc') {
      return (valA as number) - (valB as number);
    } else {
      return (valB as number) - (valA as number);
    }
  });

  const sortedGoalies = [...activeGoaliesList].sort((a, b) => {
    if (goalieSort.key === 'rank') return 0;
    let valA: number, valB: number;

    if (goalieSort.key === 'gaa') {
      valA = a.gp > 0 ? a.goalsAgainst / a.gp : 99;
      valB = b.gp > 0 ? b.goalsAgainst / b.gp : 99;
    } else if (goalieSort.key === 'svPct') {
      valA = a.shotsAgainst > 0 ? (a.shotsAgainst - a.goalsAgainst) / a.shotsAgainst : 0;
      valB = b.shotsAgainst > 0 ? (b.shotsAgainst - b.goalsAgainst) / b.shotsAgainst : 0;
    } else if (typeof a[goalieSort.key as keyof GoalieStats] === 'string') {
      const sA = a[goalieSort.key as keyof GoalieStats] as string;
      const sB = b[goalieSort.key as keyof GoalieStats] as string;
      return goalieSort.dir === 'asc' ? sA.localeCompare(sB) : sB.localeCompare(sA);
    } else {
      valA = (a[goalieSort.key as keyof GoalieStats] as number) || 0;
      valB = (b[goalieSort.key as keyof GoalieStats] as number) || 0;
    }

    if (valA === valB) {
      return b.gp - a.gp;
    }

    return goalieSort.dir === 'asc' ? valA - valB : valB - valA;
  });

  const displayedPlayers = showAllPlayers ? sortedPlayers : sortedPlayers.slice(0, 5);
  const displayedGoalies = sortedGoalies;

  const getTeamName = (id: string) => {
    if (!id) return '';
    if (id === 'sub') return 'League Sub';
    if (id.toLowerCase() === 'tbd') {
      return language === 'fr' ? 'À déterminer' : 'TBD';
    }
    if (id === 'pool_a_1st' || id.toLowerCase() === 'pool a 1st') {
      return language === 'fr' ? 'Pool A 1er' : 'Pool A 1st';
    }
    if (id === 'pool_a_2nd' || id.toLowerCase() === 'pool a 2nd') {
      return language === 'fr' ? 'Pool A 2e' : 'Pool A 2nd';
    }
    if (id === 'pool_b_1st' || id.toLowerCase() === 'pool b 1st') {
      return language === 'fr' ? 'Pool B 1er' : 'Pool B 1st';
    }
    if (id === 'pool_b_2nd' || id.toLowerCase() === 'pool b 2nd') {
      return language === 'fr' ? 'Pool B 2e' : 'Pool B 2nd';
    }
    if (id === 'winner_semi_1' || id === 'winner_semi_2' || id === 'winner' || id.toLowerCase() === 'winner') {
      return language === 'fr' ? 'Gagnant' : 'Winner';
    }
    return teams.find(t => t.id === id)?.name || 'Unknown';
  };
  const renderTeamName = (id: string) => {
    const name = getTeamName(id);
    if (name.toLowerCase() === '86ers') {
      return (
        <span>
          86<span className="normal-case">ers</span>
        </span>
      );
    }
    return name;
  };
  const getTeamColor = (id: string) => {
    if (!id || id.toLowerCase() === 'tbd') return '#6b7280';
    if (id.startsWith('pool_') || id.startsWith('winner') || id.toLowerCase().includes('pool') || id.toLowerCase().includes('winner')) {
      return '#f59e0b';
    }
    return teams.find(t => t.id === id)?.logoColor || '#ccc';
  };
  const getTeamInitial = (id: string) => {
    if (!id || id.toLowerCase() === 'tbd') return '?';
    if (id === 'pool_a_1st' || id.toLowerCase() === 'pool a 1st') return '1A';
    if (id === 'pool_a_2nd' || id.toLowerCase() === 'pool a 2nd') return '2A';
    if (id === 'pool_b_1st' || id.toLowerCase() === 'pool b 1st') return '1B';
    if (id === 'pool_b_2nd' || id.toLowerCase() === 'pool b 2nd') return '2B';
    if (id === 'winner_semi_1' || id === 'winner_semi_2' || id === 'winner' || id.toLowerCase() === 'winner') return '🏆';
    if (id === 'w_timbits') return 'T';
    if (id === 'w_seamen') return 'S';
    if (id === 'w_kraken') return 'K';
    const name = getTeamName(id);
    const lower = name.toLowerCase().trim();
    if (lower === 'les timbits' || lower.startsWith('les timbit')) return 'T';
    if (lower === 'the seamen' || lower.startsWith('the seamen')) return 'S';
    if (lower.includes('kraken')) return 'K';
    if (lower === 'team l') return 'L';
    if (lower === '86ers' || lower === 'the 86ers') return '86';
    return name.substring(0, 1).toUpperCase();
  };

  const getTeamLetterStyle = (id: string, baseColor?: string) => {
    const color = baseColor || getTeamColor(id);
    const isDark = id === 'w_kraken' || 
                   color === '#111827' || 
                   color === '#000000' || 
                   color === '#0f172a' || 
                   color.toLowerCase() === '#111827' ||
                   getTeamName(id).toLowerCase().includes('kraken');
    
    if (isDark) {
      return {
        color: '#000000',
        textShadow: '-1px 0 0 #ffffff, 1px 0 0 #ffffff, 0 -1px 0 #ffffff, 0 1px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff',
      };
    }
    return { color };
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T12:00:00');
      return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) { return dateString; }
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ng-light-blue"></div>
          </div>
      )
  }

  const scrollbarHideStyle = {
    msOverflowStyle: 'none' as const,
    scrollbarWidth: 'none' as const,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .fade-right::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, transparent, rgba(15, 23, 42, 0.4));
          pointer-events: none;
        }
      `}</style>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
            {t.standings.title}
          </h2>
        </div>

        {/* Season Selector */}
        <div className="relative self-start md:self-auto min-w-[240px]">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value as any)}
            className="appearance-none bg-ng-blue/80 text-white font-black uppercase tracking-widest text-xs sm:text-sm pl-4 pr-10 py-3 rounded-2xl border-2 border-gray-700 hover:border-ng-light-blue/50 focus:outline-none focus:border-ng-light-blue cursor-pointer transition-all shadow-xl w-full"
          >
            {seasonsList.map((s) => (
              <option key={s.id} value={s.id} className="bg-ng-navy text-white text-xs sm:text-sm font-sans uppercase">
                {s.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ng-light-blue">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {selectedSeason === 'summer_2026_playoffs' && playoffViewMode === 'pools' ? (
        <>
          {/* Playoff Mode View Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-ng-blue/30 p-4 rounded-2xl border border-gray-700/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-ng-light-blue/10 p-2.5 rounded-xl border border-ng-light-blue/20">
                <Layers size={20} className="text-ng-light-blue" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase text-white tracking-wide">
                  {t.standings.playoffPoolsTitle || 'Playoff Pools Seeding'}
                </h3>
                <p className="text-xs text-gray-400">
                  {t.standings.playoffPoolsSub || 'Seeding determined by Regular Season Win % (Pool 1: Seeds #1, #4, #5, #8 | Pool 2: Seeds #2, #3, #6, #7)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-ng-navy p-1 rounded-xl border border-gray-700/80 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setPlayoffViewMode('pools')}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  playoffViewMode === 'pools' ? 'bg-ng-light-blue text-ng-navy shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.standings.poolView || 'Playoff Pools'}
              </button>
              <button
                onClick={() => setPlayoffViewMode('overall')}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  (playoffViewMode as string) === 'overall' ? 'bg-ng-light-blue text-ng-navy shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.standings.combinedView || 'Overall Standings'}
              </button>
            </div>
          </div>

          {/* Pool A Table */}
          <div className="bg-ng-blue/30 rounded-2xl border border-blue-500/30 shadow-xl overflow-hidden mb-8 relative">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-900/40 via-ng-navy to-ng-blue/40 border-b border-gray-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white uppercase italic tracking-wider">
                  {t.standings.pool1Title || 'Pool A (Seeds #1, #4, #5, #8)'}
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Pool A
              </span>
            </div>
            <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
              <table className="w-full divide-y divide-gray-700 min-w-full">
                <thead className="bg-ng-navy/80">
                  <tr>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'seed')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.seed || 'Seed'}
                        <SortIcon sort={pool1Sort} column="seed" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'name')}
                    >
                      <div className="flex items-center">
                        {t.standings.team}
                        <SortIcon sort={pool1Sort} column="name" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'gp')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.gp}
                        <SortIcon sort={pool1Sort} column="gp" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'wins')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.w}
                        <SortIcon sort={pool1Sort} column="wins" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'losses')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.l}
                        <SortIcon sort={pool1Sort} column="losses" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'ties')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.t}
                        <SortIcon sort={pool1Sort} column="ties" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-black text-ng-light-blue uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'points')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.pts}
                        <SortIcon sort={pool1Sort} column="points" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'winPct')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.winPct}
                        <SortIcon sort={pool1Sort} column="winPct" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'goalsFor')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.gf}
                        <SortIcon sort={pool1Sort} column="goalsFor" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'goalsAgainst')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.ga}
                        <SortIcon sort={pool1Sort} column="goalsAgainst" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool1Sort, setPool1Sort, 'diff')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.diff}
                        <SortIcon sort={pool1Sort} column="diff" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {sortedPool1.map(({ regTeam, playoffTeam, seed }) => {
                    const diff = playoffTeam.goalsFor - playoffTeam.goalsAgainst;
                    const playWinPct = playoffTeam.gp > 0 ? (playoffTeam.wins / playoffTeam.gp) * 100 : 0;
                    return (
                      <tr key={regTeam.id} className="hover:bg-ng-blue/50 transition-colors group">
                        <td className="px-3 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black border border-blue-500/30">
                            #{seed}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button 
                            onClick={() => setSelectedTeam(regTeam)}
                            className="flex items-center text-left hover:text-ng-light-blue transition-colors outline-none"
                          >
                            <span className="mr-2 text-xs font-black italic shrink-0" style={getTeamLetterStyle(regTeam.id, regTeam.logoColor)}>{getTeamInitial(regTeam.id)}</span>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-ng-light-blue leading-tight">{renderTeamName(regTeam.id)}</div>
                          </button>
                        </td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300 font-bold">{playoffTeam.gp}</td>
                        <td className="px-3 py-3 text-center text-xs text-green-400 font-semibold">{playoffTeam.wins}</td>
                        <td className="px-3 py-3 text-center text-xs text-red-400">{playoffTeam.losses}</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-400">{playoffTeam.ties}</td>
                        <td className="px-3 py-3 text-center text-xs text-white font-black bg-ng-light-blue/10">{playoffTeam.points}</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300">{playWinPct.toFixed(1)}%</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300">{playoffTeam.goalsFor}</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300">{playoffTeam.goalsAgainst}</td>
                        <td className={`px-3 py-3 text-center text-xs font-black ${
                          diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {diff > 0 ? `+${diff}` : diff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pool B Table */}
          <div className="bg-ng-blue/30 rounded-2xl border border-purple-500/30 shadow-xl overflow-hidden mb-12 relative">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-900/40 via-ng-navy to-ng-blue/40 border-b border-gray-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white uppercase italic tracking-wider">
                  {t.standings.pool2Title || 'Pool B (Seeds #2, #3, #6, #7)'}
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Pool B
              </span>
            </div>
            <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
              <table className="w-full divide-y divide-gray-700 min-w-full">
                <thead className="bg-ng-navy/80">
                  <tr>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'seed')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.seed || 'Seed'}
                        <SortIcon sort={pool2Sort} column="seed" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'name')}
                    >
                      <div className="flex items-center">
                        {t.standings.team}
                        <SortIcon sort={pool2Sort} column="name" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'gp')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.gp}
                        <SortIcon sort={pool2Sort} column="gp" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'wins')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.w}
                        <SortIcon sort={pool2Sort} column="wins" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'losses')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.l}
                        <SortIcon sort={pool2Sort} column="losses" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'ties')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.t}
                        <SortIcon sort={pool2Sort} column="ties" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-black text-ng-light-blue uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'points')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.pts}
                        <SortIcon sort={pool2Sort} column="points" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'winPct')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.winPct}
                        <SortIcon sort={pool2Sort} column="winPct" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'goalsFor')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.gf}
                        <SortIcon sort={pool2Sort} column="goalsFor" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'goalsAgainst')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.ga}
                        <SortIcon sort={pool2Sort} column="goalsAgainst" />
                      </div>
                    </th>
                    <th 
                      className="px-3 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-tight cursor-pointer group hover:text-white"
                      onClick={() => handleSort(pool2Sort, setPool2Sort, 'diff')}
                    >
                      <div className="flex items-center justify-center">
                        {t.standings.diff}
                        <SortIcon sort={pool2Sort} column="diff" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {sortedPool2.map(({ regTeam, playoffTeam, seed }) => {
                    const diff = playoffTeam.goalsFor - playoffTeam.goalsAgainst;
                    const playWinPct = playoffTeam.gp > 0 ? (playoffTeam.wins / playoffTeam.gp) * 100 : 0;
                    return (
                      <tr key={regTeam.id} className="hover:bg-ng-blue/50 transition-colors group">
                        <td className="px-3 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-black border border-purple-500/30">
                            #{seed}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button 
                            onClick={() => setSelectedTeam(regTeam)}
                            className="flex items-center text-left hover:text-ng-light-blue transition-colors outline-none"
                          >
                            <span className="mr-2 text-xs font-black italic shrink-0" style={getTeamLetterStyle(regTeam.id, regTeam.logoColor)}>{getTeamInitial(regTeam.id)}</span>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-ng-light-blue leading-tight">{renderTeamName(regTeam.id)}</div>
                          </button>
                        </td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300 font-bold">{playoffTeam.gp}</td>
                        <td className="px-3 py-3 text-center text-xs text-green-400 font-semibold">{playoffTeam.wins}</td>
                        <td className="px-3 py-3 text-center text-xs text-red-400">{playoffTeam.losses}</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-400">{playoffTeam.ties}</td>
                        <td className="px-3 py-3 text-center text-xs text-white font-black bg-ng-light-blue/10">{playoffTeam.points}</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300">{playWinPct.toFixed(1)}%</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300">{playoffTeam.goalsFor}</td>
                        <td className="px-3 py-3 text-center text-xs text-gray-300">{playoffTeam.goalsAgainst}</td>
                        <td className={`px-3 py-3 text-center text-xs font-black ${
                          diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {diff > 0 ? `+${diff}` : diff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
        {selectedSeason === 'summer_2026_playoffs' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-ng-blue/30 p-4 rounded-2xl border border-gray-700/80 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-ng-light-blue/10 p-2.5 rounded-xl border border-ng-light-blue/20">
                <Layers size={20} className="text-ng-light-blue" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase text-white tracking-wide">
                  {t.standings.playoffPoolsTitle || 'Playoff Pools Seeding'}
                </h3>
                <p className="text-xs text-gray-400">
                  {t.standings.playoffPoolsSub || 'Seeding determined by Regular Season Win % (Pool 1: Seeds #1, #4, #5, #8 | Pool 2: Seeds #2, #3, #6, #7)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-ng-navy p-1 rounded-xl border border-gray-700/80 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setPlayoffViewMode('pools')}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  playoffViewMode === 'pools' ? 'bg-ng-light-blue text-ng-navy shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.standings.poolView || 'Playoff Pools'}
              </button>
              <button
                onClick={() => setPlayoffViewMode('overall')}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  playoffViewMode === 'overall' ? 'bg-ng-light-blue text-ng-navy shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.standings.combinedView || 'Overall Standings'}
              </button>
            </div>
          </div>
        )}
      <div className="bg-ng-blue/30 rounded-lg border border-gray-700 shadow-xl mb-8 relative overflow-hidden">
        <div 
          className="overflow-x-auto hide-scrollbar" 
          style={scrollbarHideStyle}
        >
          <table className="w-full divide-y divide-gray-700 min-w-full">
            <thead className="bg-ng-blue">
              <tr>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center md:text-left text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'rank')}
                >
                  <div className="flex items-center justify-center md:justify-start">
                    {t.standings.rank}
                    <SortIcon sort={teamSort} column="rank" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-2 md:px-6 py-2.5 md:py-3 text-left text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'name')}
                >
                  <div className="flex items-center">
                    {t.standings.team}
                    <SortIcon sort={teamSort} column="name" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'gp')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.gp}
                    <SortIcon sort={teamSort} column="gp" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'wins')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.w}
                    <SortIcon sort={teamSort} column="wins" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'losses')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.l}
                    <SortIcon sort={teamSort} column="losses" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'ties')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.t}
                    <SortIcon sort={teamSort} column="ties" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-black text-ng-light-blue uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'points')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.pts}
                    <SortIcon sort={teamSort} column="points" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'winPct')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.winPct}
                    <SortIcon sort={teamSort} column="winPct" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'goalsFor')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.gf}
                    <SortIcon sort={teamSort} column="goalsFor" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'goalsAgainst')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.ga}
                    <SortIcon sort={teamSort} column="goalsAgainst" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-1.5 md:px-6 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'diff')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.diff}
                    <SortIcon sort={teamSort} column="diff" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedTeams.map((team, index) => {
                const diff = team.goalsFor - team.goalsAgainst;
                return (
                  <tr key={team.id} className="hover:bg-ng-blue/50 transition-colors group">
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-gray-400 text-center md:text-left">{index + 1}</td>
                    <td className="px-2 md:px-6 py-3 whitespace-nowrap">
                       <button 
                         onClick={() => setSelectedTeam(team)}
                         className="flex items-center text-left hover:text-ng-light-blue transition-colors outline-none"
                       >
                         <span className="mr-1 md:mr-2 text-[11px] md:text-xs font-black italic shrink-0" style={getTeamLetterStyle(team.id, team.logoColor)}>{getTeamInitial(team.id)}</span>
                         <div className="text-xs sm:text-[13px] md:text-sm font-bold text-white group-hover:text-ng-light-blue leading-tight truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[150px] md:max-w-none">{renderTeamName(team.id)}</div>
                       </button>
                    </td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-gray-300 font-bold">{team.gp}</td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-green-400 font-semibold">{team.wins}</td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-red-400">{team.losses}</td>
                    <td className="px-1 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-gray-400">{team.ties}</td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-white font-black bg-ng-light-blue/10">{team.points}</td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-gray-300">
                      {team.gp > 0 ? ((team.wins / team.gp) * 100).toFixed(1) + '%' : '0.0%'}
                    </td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-gray-300">{team.goalsFor}</td>
                    <td className="px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center text-gray-300">{team.goalsAgainst}</td>
                    <td className={`px-1.5 md:px-6 py-3 whitespace-nowrap text-xs md:text-[15px] text-center font-black ${
                      diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {diff > 0 ? `+${diff}` : diff}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Playoff Pools Seeding Alignment Preview Cards (Regular Season Mode) */}
      {selectedSeason === 'summer_2026_reg' && (
        <div className="mb-12 bg-ng-blue/20 rounded-2xl border border-gray-700/80 p-6 shadow-xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-gray-700/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-ng-light-blue mb-1">
                <Trophy size={18} />
                <span className="text-xs font-black uppercase tracking-widest">{t.standings.playoffPoolsTitle || 'Playoff Pools Seeding'}</span>
              </div>
              <p className="text-xs text-gray-400">
                {t.standings.playoffPoolsSub || 'Seeding determined by Regular Season Win % (Pool 1: Seeds #1, #4, #5, #8 | Pool 2: Seeds #2, #3, #6, #7)'}
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-black text-ng-light-blue bg-ng-light-blue/10 px-3 py-1.5 rounded-lg border border-ng-light-blue/20 self-start sm:self-auto shrink-0">
              <span className="w-2 h-2 rounded-full bg-ng-light-blue animate-pulse" />
              <span>8 Teams Qualified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pool 1 Card */}
            <div className="bg-gradient-to-br from-ng-navy via-ng-blue/40 to-ng-navy rounded-xl border border-blue-500/30 p-5 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-4 border-b border-gray-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  <h4 className="text-sm font-black text-white uppercase italic tracking-wider">
                    {t.standings.pool1Title || 'Pool 1 (Seeds #1, #4, #5, #8)'}
                  </h4>
                </div>
                <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  Pool A
                </span>
              </div>
              <div className="space-y-2.5">
                {pool1Seeded.map(({ regTeam, seed, regWinPct }) => (
                  <button
                    key={regTeam.id}
                    onClick={() => setSelectedTeam(regTeam)}
                    className="w-full flex items-center justify-between bg-ng-navy/60 hover:bg-ng-blue/60 p-2.5 rounded-lg border border-gray-700/50 hover:border-ng-light-blue/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black flex items-center justify-center shrink-0 border border-blue-500/30">
                        #{seed}
                      </span>
                      <span className="text-xs font-black italic shrink-0" style={getTeamLetterStyle(regTeam.id, regTeam.logoColor)}>
                        {getTeamInitial(regTeam.id)}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-ng-light-blue truncate">
                        {renderTeamName(regTeam.id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      <span className="text-[11px] font-medium text-gray-400">
                        {regTeam.wins}-{regTeam.losses}-{regTeam.ties}
                      </span>
                      <span className="text-xs font-black text-ng-light-blue bg-ng-light-blue/10 px-2 py-0.5 rounded border border-ng-light-blue/20">
                        {(regWinPct * 100).toFixed(1)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pool 2 Card */}
            <div className="bg-gradient-to-br from-ng-navy via-ng-blue/40 to-ng-navy rounded-xl border border-purple-500/30 p-5 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-4 border-b border-gray-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                  <h4 className="text-sm font-black text-white uppercase italic tracking-wider">
                    {t.standings.pool2Title || 'Pool 2 (Seeds #2, #3, #6, #7)'}
                  </h4>
                </div>
                <span className="text-[10px] font-black uppercase text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                  Pool B
                </span>
              </div>
              <div className="space-y-2.5">
                {pool2Seeded.map(({ regTeam, seed, regWinPct }) => (
                  <button
                    key={regTeam.id}
                    onClick={() => setSelectedTeam(regTeam)}
                    className="w-full flex items-center justify-between bg-ng-navy/60 hover:bg-ng-blue/60 p-2.5 rounded-lg border border-gray-700/50 hover:border-ng-light-blue/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-black flex items-center justify-center shrink-0 border border-purple-500/30">
                        #{seed}
                      </span>
                      <span className="text-xs font-black italic shrink-0" style={getTeamLetterStyle(regTeam.id, regTeam.logoColor)}>
                        {getTeamInitial(regTeam.id)}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-ng-light-blue truncate">
                        {renderTeamName(regTeam.id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      <span className="text-[11px] font-medium text-gray-400">
                        {regTeam.wins}-{regTeam.losses}-{regTeam.ties}
                      </span>
                      <span className="text-xs font-black text-ng-light-blue bg-ng-light-blue/10 px-2 py-0.5 rounded border border-ng-light-blue/20">
                        {(regWinPct * 100).toFixed(1)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </>
      )}

      {/* Player of the Month Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-ng-navy/80 to-ng-blue/40 rounded-2xl border border-ng-light-blue/30 p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ng-light-blue/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-ng-light-blue/20 transition-all duration-500"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Header/Title & Player Info */}
            <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-start gap-4 sm:gap-6 lg:gap-3 text-center sm:text-left">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-ng-light-blue mb-1">
                  <Trophy size={18} className="animate-bounce" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.standings.playerOfMonth}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                  {t.standings.months?.[playerOfMonth.month] || 'Month'} {playerOfMonth.year}
                </h3>
              </div>

              {/* Divider on Tablet Viewports only */}
              <div className="hidden sm:block lg:hidden w-px h-12 bg-gray-700"></div>

              {/* Player name and Team */}
              <div className="flex-1 flex flex-col items-center sm:items-start">
                {playerOfMonth.playerId ? (
                  (() => {
                    const p = players.find(x => x.id === playerOfMonth.playerId);
                    const g = goalies.find(x => x.id === playerOfMonth.playerId);
                    const name = p ? p.name : (g ? g.name : 'N/A');
                    const teamId = p ? p.teamId : (g ? g.teamId : '');
                    return (
                      <>
                        <button 
                          onClick={() => {
                            if (p) openPlayerProfile(p);
                            else if (g) openGoalieProfile(g);
                          }}
                          className="text-xl sm:text-2xl font-black text-white uppercase italic hover:text-ng-light-blue transition-colors text-center sm:text-left outline-none leading-tight"
                        >
                          {name}
                        </button>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left mt-0.5">
                          {renderTeamName(teamId)}{p?.secondaryTeamIds && p.secondaryTeamIds.length > 0 ? ` & ${p.secondaryTeamIds.map(tid => renderTeamName(tid)).join(' & ')}` : (g?.secondaryTeamIds && g.secondaryTeamIds.length > 0 ? ` & ${g.secondaryTeamIds.map(tid => renderTeamName(tid)).join(' & ')}` : '')}
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <div className="text-xl sm:text-2xl font-black text-gray-600 uppercase italic text-center sm:text-left">
                    TBD
                  </div>
                )}
              </div>
            </div>

            {/* Stats Line */}
            <div className="col-span-12 lg:col-span-4 w-full">
              {(() => {
                const isGoalie = playerOfMonth.isGoalie || goalies.some(g => g.id === playerOfMonth.playerId);
                const pomGoalie = isGoalie ? goalies.find(g => g.id === playerOfMonth.playerId) : null;
                const stats = isGoalie ? [
                  { label: 'GP', val: playerOfMonth.gp },
                  { 
                    label: 'REC', 
                    val: `${playerOfMonth.wins !== undefined ? playerOfMonth.wins : (pomGoalie?.wins ?? 0)}-${playerOfMonth.losses !== undefined ? playerOfMonth.losses : (pomGoalie?.losses ?? 0)}-${playerOfMonth.draws !== undefined ? playerOfMonth.draws : (pomGoalie?.draws ?? 0)}` 
                  },
                  { 
                    label: 'SV%', 
                    val: playerOfMonth.savePct !== undefined 
                      ? playerOfMonth.savePct.toFixed(3) 
                      : (pomGoalie && pomGoalie.shotsAgainst > 0 
                        ? ((pomGoalie.shotsAgainst - pomGoalie.goalsAgainst) / pomGoalie.shotsAgainst).toFixed(3) 
                        : '.000') 
                  },
                  { 
                    label: 'GAA', 
                    val: playerOfMonth.gaa !== undefined 
                      ? playerOfMonth.gaa.toFixed(2) 
                      : (pomGoalie && pomGoalie.gp > 0 
                        ? (pomGoalie.goalsAgainst / pomGoalie.gp).toFixed(2) 
                        : '0.00') 
                  },
                ] : [
                  { label: 'GP', val: playerOfMonth.gp },
                  { label: 'G', val: playerOfMonth.goals },
                  { label: 'A', val: playerOfMonth.assists },
                  { label: 'PTS', val: playerOfMonth.points },
                ];

                return (
                  <div className="grid grid-cols-4 gap-2 bg-ng-navy/40 p-3 sm:p-4 rounded-xl border border-gray-700/50 w-full justify-items-center">
                    {stats.map(s => (
                      <div key={s.label} className="text-center px-1">
                        <div className="text-sm sm:text-lg xl:text-xl font-black text-white leading-none tracking-tighter whitespace-nowrap">{s.val}</div>
                        <div className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-tighter mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Prize Box */}
            <div className="col-span-12 lg:col-span-4 w-full bg-green-950/30 border border-green-500/30 p-4 rounded-xl flex items-center gap-4 justify-center lg:justify-start">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-green-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-0.5">{t.standings.prizeLabel}</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-200 leading-tight">
                  {language === 'en' ? playerOfMonth.prizeEn : playerOfMonth.prizeFr}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ng-blue/30 rounded-lg border border-gray-700 shadow-xl overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'players' ? 'bg-ng-light-blue text-ng-navy' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            onClick={() => setActiveTab('players')}
          >
            {t.standings.playersTab}
          </button>
          <button
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'goalies' ? 'bg-ng-light-blue text-ng-navy' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            onClick={() => setActiveTab('goalies')}
          >
            {t.standings.goaliesTab}
          </button>
        </div>

        <div className="p-2 sm:p-6">
           {activeTab === 'players' ? (
              <div className="relative overflow-hidden">
                <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
                  <table className="w-full divide-y divide-gray-700 min-w-full table-fixed sm:table-auto">
                    <thead>
                      <tr>
                        <th 
                          className="px-1 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap w-8 md:w-16 cursor-pointer group"
                          onClick={() => handleSort(playerSort, setPlayerSort, 'rank')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.rank}
                            <SortIcon sort={playerSort} column="rank" />
                          </div>
                        </th>
                        <th 
                          className="px-1.5 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group w-28 xs:w-36 sm:w-auto"
                          onClick={() => handleSort(playerSort, setPlayerSort, 'name')}
                        >
                          <div className="flex items-center">
                            {t.standings.player}
                            <SortIcon sort={playerSort} column="name" />
                          </div>
                        </th>
                        <th className="hidden sm:table-cell px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                        <th 
                          className="px-1 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group w-10 md:w-auto"
                          onClick={() => handleSort(playerSort, setPlayerSort, 'gp')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gp}
                            <SortIcon sort={playerSort} column="gp" />
                          </div>
                        </th>
                        <th 
                          className="px-1 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group w-10 md:w-auto"
                          onClick={() => handleSort(playerSort, setPlayerSort, 'goals')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.goals}
                            <SortIcon sort={playerSort} column="goals" />
                          </div>
                        </th>
                        <th 
                          className="px-1 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group w-10 md:w-auto"
                          onClick={() => handleSort(playerSort, setPlayerSort, 'assists')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.assists}
                            <SortIcon sort={playerSort} column="assists" />
                          </div>
                        </th>
                        <th 
                          className="px-1 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-black text-ng-light-blue uppercase whitespace-nowrap cursor-pointer group w-12 md:w-auto"
                          onClick={() => handleSort(playerSort, setPlayerSort, 'points')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.points}
                            <SortIcon sort={playerSort} column="points" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {displayedPlayers.map((player, idx) => (
                        <tr key={player.id} className="hover:bg-ng-navy transition-colors">
                          <td className="px-1 md:px-4 py-2 text-xs md:text-[15px] text-gray-500 whitespace-nowrap text-center">{idx + 1}</td>
                          <td className="px-1.5 md:px-4 py-2 text-xs sm:text-[13px] md:text-[15px] font-bold text-white whitespace-nowrap text-left truncate">
                             <div className="flex flex-col items-start min-w-0">
                               <button onClick={() => openPlayerProfile(player)} className="hover:text-ng-light-blue transition-colors outline-none text-left truncate w-full">
                                 <span>{player.name}</span>
                               </button>
                               <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                 <span className="text-[8px] font-black italic px-1 py-0.25 rounded bg-white/5 border border-white/10" style={getTeamLetterStyle(player.teamId)}>
                                   {getTeamInitial(player.teamId)}
                                 </span>
                                 {player.secondaryTeamIds && player.secondaryTeamIds.length > 0 && (
                                   <span className="text-[8px] text-gray-500 font-bold">+{player.secondaryTeamIds.length}</span>
                                 )}
                               </div>
                             </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 md:px-4 py-2 text-xs md:text-[15px] text-gray-300 flex items-center gap-2 whitespace-nowrap">
                             <span className="text-[11px] font-black italic mr-2" style={getTeamLetterStyle(player.teamId)}>{getTeamInitial(player.teamId)}</span>
                             {renderTeamName(player.teamId)}{player.secondaryTeamIds && player.secondaryTeamIds.length > 0 ? ` + ${player.secondaryTeamIds.length}` : ''}
                          </td>
                          <td className="px-1 md:px-4 py-2 text-xs md:text-[15px] text-center text-gray-400 whitespace-nowrap">{player.gp}</td>
                          <td className="px-1 md:px-4 py-2 text-xs md:text-[15px] text-center text-gray-300 whitespace-nowrap">{player.goals}</td>
                          <td className="px-1 md:px-4 py-2 text-xs md:text-[15px] text-center text-gray-300 whitespace-nowrap">{player.assists}</td>
                          <td className="px-1 md:px-4 py-2 text-xs md:text-[15px] text-center font-bold text-ng-light-blue bg-ng-light-blue/10 whitespace-nowrap">{player.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
               {sortedPlayers.length > 5 && (
                 <div className="mt-4 text-center">
                   <button onClick={() => setShowAllPlayers(!showAllPlayers)} className="text-ng-light-blue hover:text-white text-sm font-medium transition-colors">
                     {showAllPlayers ? t.standings.showLess : t.standings.showMore}
                   </button>
                 </div>
               )}
             </div>
           ) : (
              <div className="relative fade-right overflow-hidden">
                <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
                  <table className="w-full divide-y divide-gray-700 min-w-full">
                    <thead>
                      <tr>
                        <th 
                          className="px-1.5 md:px-4 py-2.5 md:py-3 text-left text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'rank')}
                        >
                          <div className="flex items-center">
                            {t.standings.rank}
                            <SortIcon sort={goalieSort} column="rank" />
                          </div>
                        </th>
                        <th 
                          className="px-2 md:px-4 py-2.5 md:py-3 text-left text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'name')}
                        >
                          <div className="flex items-center">
                            {t.standings.player}
                            <SortIcon sort={goalieSort} column="name" />
                          </div>
                        </th>

                        <th className="hidden sm:table-cell px-3 md:px-4 py-2.5 md:py-3 text-left text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                        <th 
                          className="px-1.5 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'gp')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gp}
                            <SortIcon sort={goalieSort} column="gp" />
                          </div>
                        </th>

                        <th 
                          className="px-1.5 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'wins')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.record}
                            <SortIcon sort={goalieSort} column="wins" />
                          </div>
                        </th>

                        <th 
                          className="px-1.5 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'gaa')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gaa}
                            <SortIcon sort={goalieSort} column="gaa" />
                          </div>
                        </th>

                        <th 
                          className="px-1.5 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-black text-ng-light-blue uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'svPct')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.svPct}
                            <SortIcon sort={goalieSort} column="svPct" />
                          </div>
                        </th>
                        <th 
                          className="px-1.5 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'shutouts')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.shutouts}
                            <SortIcon sort={goalieSort} column="shutouts" />
                          </div>
                        </th>
                        <th style={{ display: "none" }}><div className="hidden"></div></th>

                        <th 
                          className="hidden lg:table-cell px-3 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-505 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'shotsAgainst')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.shotsAgainst}
                            <SortIcon sort={goalieSort} column="shotsAgainst" />
                          </div>
                        </th>

                        <th 
                          className="hidden lg:table-cell px-3 md:px-4 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-gray-505 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'goalsAgainst')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.goalsAgainstShort}
                            <SortIcon sort={goalieSort} column="goalsAgainst" />
                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {displayedGoalies.map((goalie, idx) => {
                        const gaa = goalie.gp > 0 ? (goalie.goalsAgainst / goalie.gp).toFixed(2) : '0.00';
                        const svPct = goalie.shotsAgainst > 0 ? ((goalie.shotsAgainst - goalie.goalsAgainst) / goalie.shotsAgainst).toFixed(3) : '.000';
                        return (
                         <tr key={goalie.id} className="hover:bg-ng-navy transition-colors">
                           <td className="px-1.5 md:px-4 py-2.5 text-xs md:text-[15px] text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                           <td className="px-2 md:px-4 py-2.5 text-xs md:text-[15px] font-bold text-white whitespace-nowrap text-left">
                             <div className="flex flex-col items-start">
                               <button onClick={() => openGoalieProfile(goalie)} className="hover:text-ng-light-blue transition-colors outline-none text-left"><span>{goalie.name}</span></button>
                               <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                 <span className="text-[9px] font-black italic mr-1.5" style={getTeamLetterStyle(goalie.teamId)}>{getTeamInitial(goalie.teamId)}</span>
                                 <span className="text-[10px] text-gray-500 font-medium uppercase">{renderTeamName(goalie.teamId)}{goalie.secondaryTeamIds && goalie.secondaryTeamIds.length > 0 ? ` + ${goalie.secondaryTeamIds.length}` : ''}</span>
                               </div>
                             </div>
                           </td>
                           <td className="hidden sm:table-cell px-3 md:px-4 py-2.5 text-xs md:text-[15px] text-gray-300 flex items-center gap-2 whitespace-nowrap">
                               <span className="text-[11px] font-black italic mr-2" style={getTeamLetterStyle(goalie.teamId)}>{getTeamInitial(goalie.teamId)}</span>
                               <span>{renderTeamName(goalie.teamId)}{goalie.secondaryTeamIds && goalie.secondaryTeamIds.length > 0 ? ` + ${goalie.secondaryTeamIds.length}` : ''}</span>
                           </td>
                           <td className="px-1.5 md:px-4 py-2.5 text-xs md:text-[15px] text-center text-gray-400 whitespace-nowrap">{goalie.gp}</td>
                           <td className="px-1.5 md:px-4 py-2.5 text-xs md:text-[15px] text-center text-gray-300 font-mono whitespace-nowrap">{goalie.wins}-{goalie.losses}-{goalie.draws}</td>
                           <td className="px-1.5 md:px-4 py-2.5 text-xs md:text-[15px] text-center text-gray-300 font-mono whitespace-nowrap">{gaa}</td>
                           <td className="px-1.5 md:px-4 py-2.5 text-xs md:text-[15px] text-center font-bold text-ng-light-blue bg-ng-light-blue/10 whitespace-nowrap">{svPct}</td>
                           <td className="px-1.5 md:px-4 py-2.5 text-xs md:text-[15px] text-center text-gray-300 font-mono whitespace-nowrap">{goalie.shutouts || 0}</td>
                           <td className="hidden lg:table-cell px-3 md:px-4 py-2.5 text-xs md:text-[15px] text-center text-gray-550 whitespace-nowrap">{goalie.shotsAgainst}</td>
                           <td className="hidden lg:table-cell px-3 md:px-4 py-2.5 text-xs md:text-[15px] text-center text-gray-550 whitespace-nowrap">{goalie.goalsAgainst}</td>
                         </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
               <div className="mt-6 flex items-center gap-2 text-gray-500 text-[10px] italic">
                 <Shield size={12} />
                 <span>{t.standings.gaaExplanation}</span>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Team Modal */}
      {selectedTeam && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedTeam(null)}
        >
           <div 
             className="bg-ng-navy border border-gray-700 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300"
             onClick={(e) => e.stopPropagation()}
           >
              <div 
                className="p-6 relative overflow-hidden flex items-center justify-between"
                style={{ backgroundColor: `${selectedTeam.logoColor}20`, borderBottom: `2px solid ${selectedTeam.logoColor}` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-4xl font-black italic shrink-0" style={getTeamLetterStyle(selectedTeam.id, selectedTeam.logoColor)}>
                    {getTeamInitial(selectedTeam.id)}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-tight">{renderTeamName(selectedTeam.id)}</h2>
                    <div className="flex gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                      <span>{selectedTeam.wins}W - {selectedTeam.losses}L - {selectedTeam.ties}D</span>
                      <span className="text-ng-light-blue">{selectedTeam.points} {t.standings.pts}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedTeam(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white shrink-0">
                  <X size={28} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 md:p-10 space-y-12 text-gray-300 hide-scrollbar" style={scrollbarHideStyle}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: t.standings.gp, val: selectedTeam.gp, icon: <LayoutList size={14} className="sm:w-4 sm:h-4" /> },
                    { label: t.standings.record, val: `${selectedTeam.wins}-${selectedTeam.losses}-${selectedTeam.ties}`, icon: <Trophy size={14} className="sm:w-4 sm:h-4" /> },
                    { label: t.standings.pts, val: selectedTeam.points, icon: <LayoutList size={14} className="sm:w-4 sm:h-4" /> },
                    { label: t.standings.diff, val: (selectedTeam.goalsFor - selectedTeam.goalsAgainst > 0 ? '+' : '') + (selectedTeam.goalsFor - selectedTeam.goalsAgainst), icon: <LayoutList size={14} className="sm:w-4 sm:h-4" /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-ng-blue/30 border border-gray-700 p-3 sm:p-4 rounded-xl text-center">
                      <div className="flex justify-center text-gray-500 mb-1">{stat.icon}</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-black text-white">{stat.val}</div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="space-y-6 xl:col-span-8">
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Shield size={18} className="text-ng-light-blue" />
                        {t.standings.goalies}
                      </h3>
                       <div className="bg-ng-navy/50 rounded-xl border border-gray-700 relative fade-right overflow-hidden">
                        <div 
                          className="overflow-x-auto hide-scrollbar" 
                          style={scrollbarHideStyle}
                        >
                          <table className="w-full text-left">
                            <thead className="bg-gray-800/50">
                              <tr className="text-[10px] uppercase text-gray-500 font-bold border-b border-gray-700">
                                <th 
                                  className="px-3 md:px-4 py-2 whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'name')}
                                >
                                  <div className="flex items-center">
                                    Name
                                    <SortIcon sort={teamGoalieSort} column="name" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'gp')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.gp}
                                    <SortIcon sort={teamGoalieSort} column="gp" />
                                  </div>
                                </th>
                                <th className="hidden sm:table-cell px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.record}</th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'gaa')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.gaa}
                                    <SortIcon sort={teamGoalieSort} column="gaa" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center text-ng-light-blue whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'svPct')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.svPct}
                                    <SortIcon sort={teamGoalieSort} column="svPct" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'shutouts')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.shutouts}
                                    <SortIcon sort={teamGoalieSort} column="shutouts" />
                                  </div>
                                </th>
                                <th style={{ display: "none" }}><div className="hidden"></div></th>
                                <th className="hidden md:table-cell px-3 md:px-4 py-2 text-center text-gray-500 whitespace-nowrap">{t.standings.shotsAgainst}</th>
                                <th className="hidden md:table-cell px-3 md:px-4 py-2 text-center text-gray-500 whitespace-nowrap">{t.standings.goalsAgainstShort}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {activeGoaliesList.filter(g => g.teamId === selectedTeam.id || (g.secondaryTeamIds || []).includes(selectedTeam.id)).length > 0 ? (
                                [...activeGoaliesList]
                                  .filter(g => g.teamId === selectedTeam.id || (g.secondaryTeamIds || []).includes(selectedTeam.id))
                                  .sort((a, b) => {
                                    let valA: number, valB: number;
                                    if (teamGoalieSort.key === 'gaa') {
                                      valA = a.gp > 0 ? a.goalsAgainst / a.gp : 99;
                                      valB = b.gp > 0 ? b.goalsAgainst / b.gp : 99;
                                    } else if (teamGoalieSort.key === 'svPct') {
                                      valA = a.shotsAgainst > 0 ? (a.shotsAgainst - a.goalsAgainst) / a.shotsAgainst : 0;
                                      valB = b.shotsAgainst > 0 ? (b.shotsAgainst - b.goalsAgainst) / b.shotsAgainst : 0;
                                    } else if (typeof a[teamGoalieSort.key as keyof GoalieStats] === 'string') {
                                      const sA = a[teamGoalieSort.key as keyof GoalieStats] as string;
                                      const sB = b[teamGoalieSort.key as keyof GoalieStats] as string;
                                      return teamGoalieSort.dir === 'asc' ? sA.localeCompare(sB) : sB.localeCompare(sA);
                                    } else {
                                      valA = (a[teamGoalieSort.key as keyof GoalieStats] as number) || 0;
                                      valB = (b[teamGoalieSort.key as keyof GoalieStats] as number) || 0;
                                    }
                                    if (valA === valB) {
                                      return b.gp - a.gp;
                                    }
                                    return teamGoalieSort.dir === 'asc' ? valA - valB : valB - valA;
                                  })
                                  .map(g => {
                                  const gaa = g.gp > 0 ? (g.goalsAgainst / g.gp).toFixed(2) : '0.00';
                                  const svPct = g.shotsAgainst > 0 ? ((g.shotsAgainst - g.goalsAgainst) / g.shotsAgainst).toFixed(3) : '.000';
                                  return (
                                    <tr key={g.id} className="bg-ng-light-blue/5 hover:bg-ng-light-blue/10 transition-colors">
                                      <td className="px-3 md:px-4 py-3 text-sm font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                        <button 
                                          onClick={() => openGoalieProfile(g)}
                                          className="flex items-center gap-2 hover:text-ng-light-blue transition-colors outline-none"
                                        >
                                          <span className="text-[8px] bg-ng-light-blue text-ng-navy px-1.5 py-0.5 rounded-sm font-black uppercase">G</span>
                                          <span className="flex items-center gap-1.5">
                                            <span>{g.name}</span>
                                            {g.teamId !== selectedTeam.id && (
                                              <span className="text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded font-black uppercase">Sub</span>
                                            )}
                                          </span>
                                        </button>
                                      </td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{g.gp}</td>
                                      <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono text-[10px] whitespace-nowrap">{g.wins}-{g.losses}-{g.draws}</td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono italic whitespace-nowrap">{gaa}</td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center font-black text-ng-light-blue whitespace-nowrap">{svPct}</td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono whitespace-nowrap">{g.shutouts || 0}</td>
                                      <td className="hidden md:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{g.shotsAgainst}</td>
                                      <td className="hidden md:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{g.goalsAgainst}</td>
                                    </tr>
                                  )
                                })
                              ) : (
                                <tr><td colSpan={8} className="p-4 text-center text-gray-500 italic text-xs">No goalies assigned.</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User size={18} className="text-ng-light-blue" />
                        {t.standings.skaters}
                      </h3>
                       <div className="bg-ng-navy/50 rounded-xl border border-gray-700 relative fade-right overflow-hidden">
                        <div 
                          className="overflow-x-auto hide-scrollbar" 
                          style={scrollbarHideStyle}
                        >
                          <table className="w-full text-left">
                            <thead className="bg-gray-800/50">
                              <tr className="text-[10px] uppercase text-gray-500 font-bold border-b border-gray-700">
                                <th 
                                  className="px-3 md:px-4 py-2 whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'name')}
                                >
                                  <div className="flex items-center">
                                    {t.standings.player}
                                    <SortIcon sort={teamPlayerSort} column="name" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'gp')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.gp}
                                    <SortIcon sort={teamPlayerSort} column="gp" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'goals')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.goals}
                                    <SortIcon sort={teamPlayerSort} column="goals" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'assists')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.assists}
                                    <SortIcon sort={teamPlayerSort} column="assists" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center text-ng-light-blue whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'points')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.pts}
                                    <SortIcon sort={teamPlayerSort} column="points" />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {activePlayersList.filter(p => p.teamId === selectedTeam.id || (p.secondaryTeamIds || []).includes(selectedTeam.id)).length > 0 ? (
                                [...activePlayersList]
                                  .filter(p => p.teamId === selectedTeam.id || (p.secondaryTeamIds || []).includes(selectedTeam.id))
                                  .sort((a, b) => {
                                    const key = teamPlayerSort.key as keyof PlayerStats;
                                    let valA = a[key];
                                    let valB = b[key];
                                    if (typeof valA === 'string') {
                                      return teamPlayerSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
                                    }
                                    return teamPlayerSort.dir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
                                  })
                                  .map(p => (
                                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-3 md:px-4 py-3 text-sm font-semibold text-white whitespace-nowrap">
                                      <button 
                                        onClick={() => openPlayerProfile(p)}
                                        className="hover:text-ng-light-blue transition-colors outline-none flex items-center gap-2"
                                      >
                                        <span>{p.name}</span>
                                        {p.teamId !== selectedTeam.id && p.name !== 'Lucas Molinaro' && p.name !== 'Michael-Joseph Primiani' && (
                                          <span className="text-[8px] bg-amber-500/10 text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded font-black uppercase">Sub</span>
                                        )}
                                      </button>
                                    </td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{p.gp}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{p.goals}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{p.assists}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center font-black text-ng-light-blue whitespace-nowrap">{p.points}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic text-sm">{t.standings.noPlayers}</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="xl:col-span-4">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar size={18} className="text-ng-light-blue" />
                      {t.standings.teamSchedule}
                    </h3>
                    <div className="space-y-3">
                      {activeScheduleList.filter(g => g.homeTeamId === selectedTeam.id || g.awayTeamId === selectedTeam.id).length > 0 ? (
                        [...activeScheduleList]
                          .filter(g => g.homeTeamId === selectedTeam.id || g.awayTeamId === selectedTeam.id)
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map(g => {
                          const isHome = g.homeTeamId === selectedTeam.id;
                          const opponentId = isHome ? g.awayTeamId : g.homeTeamId;
                          const opponentName = getTeamName(opponentId);
                          const result = g.status === 'played' 
                            ? (isHome ? (g.homeScore! > g.awayScore! ? 'W' : (g.homeScore! === g.awayScore! ? 'D' : 'L')) : (g.awayScore! > g.homeScore! ? 'W' : (g.awayScore! === g.homeScore! ? 'D' : 'L')))
                            : null;

                          return (
                            <button 
                              key={g.id} 
                              onClick={() => {
                                setSelectedTeam(null);
                                navigate('/schedule', { state: { selectedGameId: g.id } });
                              }}
                              className="w-full text-left bg-ng-navy/50 p-3 sm:p-4 rounded-xl border border-gray-700 flex items-center justify-between relative overflow-hidden hover:border-ng-light-blue transition-all group"
                            >
                              {g.isPlayoff && (
                                <div className="absolute top-0 right-0">
                                  <div className="bg-ng-light-blue text-ng-navy text-[7px] sm:text-[8px] font-black px-1.5 sm:px-2 py-0.5 uppercase italic transform rotate-0">Playoffs</div>
                                </div>
                              )}
                              <div className="flex items-center gap-2 sm:gap-4">
                                <div className="text-center w-10 sm:w-12 border-r border-gray-700 pr-2 sm:pr-4">
                                  <div className="text-[10px] sm:text-xs font-black text-white">{formatDate(g.date).split(',')[0]}</div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase">{formatDate(g.date).split(',')[1]}</div>
                                </div>
                                <div>
                                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold">{isHome ? 'VS' : '@'} {opponentName}</div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-600 font-medium">{g.time} - {g.location}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                {g.status === 'played' ? (
                                  <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className={`text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded ${result === 'W' ? 'bg-green-500/20 text-green-400' : (result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400')}`}>{result}</span>
                                    <span className="text-xs sm:text-sm font-mono font-bold text-white whitespace-nowrap">{isHome ? `${g.homeScore}-${g.awayScore}` : `${g.awayScore}-${g.homeScore}`}</span>
                                  </div>
                                ) : (
                                  <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold">{t.schedule.scheduled}</span>
                                )}
                              </div>
                            </button>
                          )
                        })
                      ) : (
                        <p className="p-8 text-center text-gray-500 italic text-sm">No games scheduled for this team.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}
      {/* Unified Player & Goalie Profile Modal */}
      {(selectedPlayer || selectedGoalie) && (() => {
        const rawPerson = selectedPlayer || selectedGoalie;
        if (!rawPerson) return null;

        const normalizedName = rawPerson.name.toLowerCase().trim();
        const matchedPlayer = activePlayersList.find(p => p.id === rawPerson.id || p.name.toLowerCase().trim() === normalizedName) || (selectedPlayer || null);
        const matchedGoalie = activeGoaliesList.find(g => g.id === rawPerson.id || g.name.toLowerCase().trim() === normalizedName) || (selectedGoalie || null);

        const hasBothRoles = Boolean(matchedPlayer && matchedGoalie);
        const activeView = hasBothRoles ? modalRole : (matchedGoalie && !matchedPlayer ? "goalie" : "skater");

        const activeTeamId = (activeView === "goalie" ? matchedGoalie?.teamId : matchedPlayer?.teamId) || rawPerson.teamId;
        const allSecondaryTeamIds = Array.from(new Set([
          ...(matchedPlayer?.secondaryTeamIds || []),
          ...(matchedGoalie?.secondaryTeamIds || [])
        ]));

        const playerIdList = Array.from(new Set([
          rawPerson.id,
          matchedPlayer?.id,
          matchedGoalie?.id
        ].filter(Boolean) as string[]));

        // Primary team games for suspension tracking
        const primaryTeamGames = activeScheduleList
          .filter(g => g.status === "played" && (g.homeTeamId === activeTeamId || g.awayTeamId === activeTeamId))
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
            const dateB = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
            return dateA - dateB;
          });

        const getSuspensionLength = (details?: string): number => {
          if (!details) return 0;
          if (/remainder\s*of\s*(?:the\s*)?season|reste\s*de\s*(?:la\s*)?saison/i.test(details)) {
            return 10;
          }
          const match = details.match(/(\d+)\s*(?:game|match|matchs|jeux)\s*(?:de\s*)?suspension/i) || 
                        details.match(/suspension\s*(?:de\s*)?(\d+)/i) ||
                        details.match(/major\s*\((\d+)\s*(?:game|match)/i);
          return match ? parseInt(match[1]) : 0;
        };

        // Track active suspensions chronologically
        let remainingSuspension = 0;
        let totalSuspension = 0;
        let isRemainderSuspension = false;
        const suspensionMap = new Map<string, { current: number; total: number; isRemainder?: boolean }>();

        primaryTeamGames.forEach(g => {
          if (remainingSuspension > 0) {
            const currentSuspIndex = totalSuspension - remainingSuspension + 1;
            suspensionMap.set(g.id, { 
              current: currentSuspIndex, 
              total: totalSuspension,
              isRemainder: isRemainderSuspension
            });
            remainingSuspension--;
          }

          const recap = gameRecaps[g.id];
          if (recap?.events) {
            recap.events.forEach(e => {
              if (e.type === "penalty" && playerIdList.includes(e.player)) {
                const length = getSuspensionLength(e.details);
                if (length > 0) {
                  remainingSuspension = length;
                  totalSuspension = length;
                  isRemainderSuspension = /remainder\s*of\s*(?:the\s*)?season|reste\s*de\s*(?:la\s*)?saison/i.test(e.details || "");
                }
              }
            });
          }
        });

        // 1. Skater game logs
        const playerGames = activeScheduleList.filter(g => {
          if (g.status !== "played") return false;
          const isOnHomeTeam = g.homeTeamId === activeTeamId || allSecondaryTeamIds.includes(g.homeTeamId);
          const isOnAwayTeam = g.awayTeamId === activeTeamId || allSecondaryTeamIds.includes(g.awayTeamId);
          if (isOnHomeTeam || isOnAwayTeam) return true;
          const recap = gameRecaps[g.id];
          if (recap?.events) {
            return recap.events.some(e => 
              playerIdList.includes(e.player) || 
              (e.assist && playerIdList.includes(e.assist)) || 
              (e.assist2 && playerIdList.includes(e.assist2))
            );
          }
          return false;
        });

        const skaterLogs = playerGames.map(g => {
          const recap = gameRecaps[g.id];
          let goals = 0;
          let assists = 0;
          let penalties = 0;
          
          if (recap?.events) {
            recap.events.forEach(e => {
              if (e.type === "goal") {
                if (playerIdList.includes(e.player)) {
                  goals++;
                }
                if ((e.assist && playerIdList.includes(e.assist)) || (e.assist2 && playerIdList.includes(e.assist2))) {
                  assists++;
                }
              } else if (e.type === "penalty") {
                if (playerIdList.includes(e.player)) {
                  penalties += e.penaltyMinutes || 2;
                }
              }
            });
          }
          
          const isHome = g.homeTeamId === activeTeamId || allSecondaryTeamIds.includes(g.homeTeamId);
          const opponentTeamId = isHome ? g.awayTeamId : g.homeTeamId;
          const suspInfo = suspensionMap.get(g.id);
          
          return {
            game: g,
            goals,
            assists,
            points: goals + assists,
            penalties,
            opponentTeamId,
            isSuspended: !!suspInfo,
            suspInfo
          };
        }).sort((a, b) => new Date(b.game.date).getTime() - new Date(a.game.date).getTime());

        // 2. Goalie game logs
        const goalieGames = activeScheduleList.filter(g => {
          if (g.status !== "played") return false;
          const recap = gameRecaps[g.id];
          if (!recap) return false;
          return (
            (recap.goalieStats?.homeGoalie?.playerId && playerIdList.includes(recap.goalieStats.homeGoalie.playerId)) ||
            (recap.goalieStats?.awayGoalie?.playerId && playerIdList.includes(recap.goalieStats.awayGoalie.playerId))
          );
        });

        const goalieLogs = goalieGames.map(g => {
          const recap = gameRecaps[g.id];
          const isHome = recap.goalieStats?.homeGoalie?.playerId && playerIdList.includes(recap.goalieStats.homeGoalie.playerId);
          const stats = isHome ? recap.goalieStats.homeGoalie : recap.goalieStats.awayGoalie;
          
          const opponentTeamId = isHome ? g.awayTeamId : g.homeTeamId;
          const myTeamId = isHome ? g.homeTeamId : g.awayTeamId;
          
          const myScore = isHome ? g.homeScore : g.awayScore;
          const oppScore = isHome ? g.awayScore : g.homeScore;
          
          let result = "D";
          if (myScore !== undefined && oppScore !== undefined) {
            if (myScore > oppScore) result = "W";
            else if (myScore < oppScore) result = "L";
          }
          
          const shotsAgainst = stats?.shotsFaced || 0;
          const goalsAgainst = stats?.goalsAgainst || 0;
          const saves = stats?.saves || 0;
          const savePct = shotsAgainst > 0 ? ((shotsAgainst - goalsAgainst) / shotsAgainst).toFixed(3) : ".000";
          
          return {
            game: g,
            opponentTeamId,
            myTeamId,
            result,
            score: `${myScore}-${oppScore}`,
            shotsAgainst,
            goalsAgainst,
            saves,
            savePct
          };
        }).sort((a, b) => new Date(b.game.date).getTime() - new Date(a.game.date).getTime());

        const closeModal = () => {
          setSelectedPlayer(null);
          setSelectedGoalie(null);
        };

        const resolvedPlayerObj = matchedPlayer || {
          id: rawPerson.id,
          name: rawPerson.name,
          teamId: activeTeamId,
          gp: 0,
          goals: 0,
          assists: 0,
          points: 0
        };

        const resolvedGoalieObj = matchedGoalie || {
          id: rawPerson.id,
          name: rawPerson.name,
          teamId: activeTeamId,
          gp: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          shotsAgainst: 0,
          goalsAgainst: 0,
          saves: 0
        };

        const gaa = resolvedGoalieObj.gp > 0 ? (resolvedGoalieObj.goalsAgainst / resolvedGoalieObj.gp).toFixed(2) : "0.00";
        const goalieSvPct = resolvedGoalieObj.shotsAgainst > 0 ? ((resolvedGoalieObj.shotsAgainst - resolvedGoalieObj.goalsAgainst) / resolvedGoalieObj.shotsAgainst).toFixed(3) : ".000";

        return (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={closeModal}
          >
             <div 
               className="bg-[#181a1d] border border-gray-700/80 w-full max-w-md sm:max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl relative animate-in zoom-in duration-300 max-h-[85vh] my-auto flex flex-col overflow-hidden"
               onClick={(e) => e.stopPropagation()}
             >
                  {/* Top Header Section */}
                  <div 
                    className="p-3.5 sm:p-5 relative overflow-hidden flex flex-col items-center text-center flex-shrink-0"
                    style={{ backgroundColor: `${getTeamColor(activeTeamId)}20`, borderBottom: `2px solid ${getTeamColor(activeTeamId)}` }}
                  >
                    <button onClick={closeModal} className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-full transition-colors text-white z-10" aria-label="Close">
                      <X size={18} />
                    </button>

                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-1.5 sm:mb-2 border-2 sm:border-4 shadow-lg" style={{ borderColor: getTeamColor(activeTeamId) === '#111827' || getTeamColor(activeTeamId) === '#000000' ? '#ffffff' : getTeamColor(activeTeamId), backgroundColor: getTeamColor(activeTeamId) }}>
                      <span className="text-xl sm:text-3xl font-black text-white italic pr-0.5" style={getTeamColor(activeTeamId) === '#111827' || getTeamColor(activeTeamId) === '#000000' ? { textShadow: '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff' } : undefined}>
                        {getTeamInitial(activeTeamId)}
                      </span>
                    </div>
                    
                    <h2 className="text-lg sm:text-2xl font-black text-white uppercase italic leading-tight mb-1">{rawPerson.name}</h2>
                    <div className="flex flex-col items-center gap-1 mb-1">
                      <div className="flex items-center gap-2 flex-wrap justify-center">
                        {hasBothRoles ? (
                          <>
                            <span className="bg-white/10 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.player}</span>
                            <span className="bg-ng-light-blue text-ng-navy text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.goalie}</span>
                          </>
                        ) : activeView === "goalie" ? (
                          <span className="bg-ng-light-blue text-ng-navy text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.goalie}</span>
                        ) : (
                          <span className="bg-white/10 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.player}</span>
                        )}
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{renderTeamName(activeTeamId)}</span>
                      </div>
                      {allSecondaryTeamIds.length > 0 && (
                        <div className="flex flex-wrap justify-center items-center gap-1 mt-0.5">
                          <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest mr-1">Subs:</span>
                          {allSecondaryTeamIds.map((tid: string) => (
                            <span key={tid} className="bg-ng-light-blue/20 text-ng-light-blue text-[9px] font-black px-1.5 py-0.5 rounded border border-ng-light-blue/30 uppercase tracking-wider">{renderTeamName(tid)}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Role Switcher Tabs for Dual-Role Players */}
                    {hasBothRoles && (
                      <div className="flex items-center justify-center p-1 bg-black/40 rounded-xl border border-gray-700/60 w-full max-w-xs my-1">
                        <button
                          type="button"
                          onClick={() => setModalRole("skater")}
                          className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            activeView === "skater"
                              ? "bg-white/20 text-white shadow-md font-black"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          <span>🏒</span>
                          <span>{language === "fr" ? "Stats Joueur" : "Skater Stats"}</span>
                          {resolvedPlayerObj.gp > 0 && <span className="text-[10px] text-gray-300">({resolvedPlayerObj.gp} GP)</span>}
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalRole("goalie")}
                          className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            activeView === "goalie"
                              ? "bg-ng-light-blue text-ng-navy shadow-md font-black"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          <span>🥅</span>
                          <span>{language === "fr" ? "Stats Gardien" : "Goalie Stats"}</span>
                          {resolvedGoalieObj.gp > 0 && <span className="text-[10px] font-bold">({resolvedGoalieObj.gp} GP)</span>}
                        </button>
                      </div>
                    )}

                    {/* Top Summary Cards */}
                    {activeView === "skater" ? (
                      <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs mx-auto mt-2">
                        <div className="bg-ng-navy/60 p-2 sm:p-2.5 rounded-xl border border-gray-700/80 shadow-md">
                          <div className="text-xl sm:text-2xl font-black text-ng-light-blue">{resolvedPlayerObj.points}</div>
                          <div className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.standings.points}</div>
                        </div>
                        <div className="bg-ng-navy/60 p-2 sm:p-2.5 rounded-xl border border-gray-700/80 shadow-md">
                          <div className="text-xl sm:text-2xl font-black text-white">
                            {sortedPlayers.findIndex(p => p.id === resolvedPlayerObj.id || p.name.toLowerCase().trim() === normalizedName) >= 0
                              ? `#${sortedPlayers.findIndex(p => p.id === resolvedPlayerObj.id || p.name.toLowerCase().trim() === normalizedName) + 1}`
                              : "-"}
                          </div>
                          <div className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.standings.leagueRank}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs mx-auto mt-2">
                        <div className="bg-ng-navy/60 p-2 sm:p-2.5 rounded-xl border border-gray-700/80 shadow-md">
                          <div className="text-xl sm:text-2xl font-black text-ng-light-blue">{gaa}</div>
                          <div className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.standings.gaa}</div>
                        </div>
                        <div className="bg-ng-navy/60 p-2 sm:p-2.5 rounded-xl border border-gray-700/80 shadow-md">
                          <div className="text-xl sm:text-2xl font-black text-white">
                            {sortedGoalies.findIndex(g => g.id === resolvedGoalieObj.id || g.name.toLowerCase().trim() === normalizedName) >= 0
                              ? `#${sortedGoalies.findIndex(g => g.id === resolvedGoalieObj.id || g.name.toLowerCase().trim() === normalizedName) + 1}`
                              : "-"}
                          </div>
                          <div className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.standings.leagueRank}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Main Navigation Tabs: "Dernières parties" / "En carrière" */}
                  <div className="grid grid-cols-2 border-b border-gray-800 bg-gray-950 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setModalProfileTab("recent")}
                      className={`py-2.5 px-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all text-center border-r border-gray-800 ${
                        modalProfileTab === "recent"
                          ? "bg-[#f97316] text-white shadow-lg border-b-2 border-orange-400"
                          : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800/80"
                      }`}
                    >
                      {language === "fr" ? "Dernières parties" : "Last 5 Games"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalProfileTab("career")}
                      className={`py-2.5 px-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all text-center ${
                        modalProfileTab === "career"
                          ? "bg-[#f97316] text-white shadow-lg border-b-2 border-orange-400"
                          : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800/80"
                      }`}
                    >
                      {language === "fr" ? "En carrière" : "Career Stats"}
                    </button>
                  </div>

                  {/* Tab Content Body */}
                  <div className="p-3 sm:p-4 flex-1 overflow-y-auto overflow-x-auto min-h-0">
                    {modalProfileTab === "recent" ? (
                      /* TAB 1: Last 5 Games ("Dernières parties") */
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Calendar size={14} className="text-orange-500" />
                          {language === "fr" ? "Dernières 5 parties" : "Last 5 Played Games"}
                        </h3>
                        
                        {activeView === "skater" ? (
                          skaterLogs.length === 0 ? (
                            <p className="text-xs text-gray-500 italic text-center py-6">
                              {language === "fr" ? "Aucun match joué." : "No games played yet."}
                            </p>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="border-b border-gray-800 text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-gray-900/60">
                                    <th className="py-2 px-2">{language === "fr" ? "Date" : "Date"}</th>
                                    <th className="py-2 px-2">{t.standings.opponent}</th>
                                    <th className="py-2 px-2 text-center">{t.standings.goals}</th>
                                    <th className="py-2 px-2 text-center">{t.standings.assists}</th>
                                    <th className="py-2 px-2 text-center">{t.standings.points}</th>
                                    <th className="py-2 px-2 text-center">{t.standings.pim}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/40">
                                  {skaterLogs.slice(0, 5).map(({ game, goals, assists, points, penalties, opponentTeamId, isSuspended, suspInfo }) => {
                                    const [y, m, d] = game.date.split("-");
                                    const monthName = t.standings.months[parseInt(m) - 1] || m;
                                    const formattedDate = language === "fr" 
                                      ? `${parseInt(d)} ${monthName}` 
                                      : `${monthName} ${parseInt(d)}`;
                                    
                                    return (
                                      <tr key={game.id} className="text-xs hover:bg-white/5 transition-colors">
                                        <td className="py-2.5 px-2 font-medium text-gray-300 whitespace-nowrap">{formattedDate}</td>
                                        <td className="py-2.5 px-2 flex items-center gap-2">
                                          <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: getTeamColor(opponentTeamId) }} />
                                          <span className="text-white font-bold">{getTeamName(opponentTeamId)}</span>
                                        </td>
                                        <td className="py-2.5 px-2 text-center text-gray-200 font-mono font-semibold">{isSuspended ? "-" : goals}</td>
                                        <td className="py-2.5 px-2 text-center text-gray-200 font-mono font-semibold">{isSuspended ? "-" : assists}</td>
                                        <td className="py-2.5 px-2 text-center text-orange-400 font-mono font-black">{isSuspended ? "-" : points}</td>
                                        <td className="py-2.5 px-2 text-center text-gray-400 font-mono">
                                          {isSuspended && suspInfo ? (
                                            <span className="text-red-400 font-black bg-red-950/40 border border-red-800/30 px-1.5 py-0.5 rounded text-[9px] tracking-wide inline-block">
                                              {suspInfo.isRemainder ? (
                                                language === "fr" ? "Reste" : "Remainder"
                                              ) : (
                                                `${suspInfo.current}/${suspInfo.total}`
                                              )}
                                            </span>
                                          ) : (
                                            penalties > 0 ? `${penalties}:00` : "0:00"
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )
                        ) : (
                          goalieLogs.length === 0 ? (
                            <p className="text-xs text-gray-500 italic text-center py-6">
                              {language === "fr" ? "Aucun match joué." : "No games played yet."}
                            </p>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="border-b border-gray-800 text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-gray-900/60">
                                    <th className="py-2 px-2">{language === "fr" ? "Date" : "Date"}</th>
                                    <th className="py-2 px-2">{t.standings.opponent}</th>
                                    <th className="py-2 px-2 text-center">{language === "fr" ? "Rés." : "Res."}</th>
                                    <th className="py-2 px-2 text-center">{t.standings.shotsAgainst}</th>
                                    <th className="py-2 px-2 text-center">{t.standings.goalsAgainstShort}</th>
                                    <th className="py-2 px-2 text-center">SVS</th>
                                    <th className="py-2 px-2 text-center">{t.standings.svPct}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/40">
                                  {goalieLogs.slice(0, 5).map(({ game, opponentTeamId, result, score, shotsAgainst, goalsAgainst, saves, savePct }) => {
                                    const [y, m, d] = game.date.split("-");
                                    const monthName = t.standings.months[parseInt(m) - 1] || m;
                                    const formattedDate = language === "fr" 
                                      ? `${parseInt(d)} ${monthName}` 
                                      : `${monthName} ${parseInt(d)}`;
                                    
                                    return (
                                      <tr key={game.id} className="text-xs hover:bg-white/5 transition-colors">
                                        <td className="py-2.5 px-2 font-medium text-gray-300 whitespace-nowrap">{formattedDate}</td>
                                        <td className="py-2.5 px-2 flex items-center gap-2">
                                          <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: getTeamColor(opponentTeamId) }} />
                                          <span className="text-white font-bold">{getTeamName(opponentTeamId)}</span>
                                        </td>
                                        <td className="py-2.5 px-2 text-center">
                                          <div className="flex flex-col items-center">
                                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${result === "W" ? "bg-green-500/20 text-green-400" : (result === "L" ? "bg-red-500/20 text-red-400" : "bg-gray-500/20 text-gray-400")}`}>{result}</span>
                                            <span className="text-[9px] text-gray-500 font-mono font-semibold mt-0.5">{score}</span>
                                          </div>
                                        </td>
                                        <td className="py-2.5 px-2 text-center text-gray-300 font-mono">{shotsAgainst}</td>
                                        <td className="py-2.5 px-2 text-center text-red-400 font-mono">{goalsAgainst}</td>
                                        <td className="py-2.5 px-2 text-center text-green-400 font-mono">{saves}</td>
                                        <td className="py-2.5 px-2 text-center text-orange-400 font-mono font-black">{savePct}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      /* TAB 2: Career Stats ("En carrière") */
                      <div>
                        {activeView === "skater" ? (
                          <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-md">
                            <table className="w-full text-left border-collapse bg-gray-900/40">
                              <thead>
                                <tr className="bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-wider border-b border-gray-800">
                                  <th className="py-3 px-3.5">{language === "fr" ? "Année  Saison" : "Year  Season"}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.gp}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.goals}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.assists}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.points}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.pim}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-800/60 text-xs">
                                {/* Season 1: Regular Season Summer 2026 */}
                                {(() => {
                                  const summerP = players.find(x => (x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName) && !x.teamId.startsWith('w_'));
                                  const summerTeamName = summerP ? getTeamName(summerP.teamId) : '-';
                                  return (
                                    <tr className="hover:bg-white/5 transition-colors">
                                      <td className="py-3 px-3.5">
                                        <div className="font-bold text-white text-xs sm:text-sm">
                                          {language === "fr" ? "Été 2026" : "Summer 2026"}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                          {summerTeamName} - {language === "fr" ? "SAISON RÉGULIÈRE" : "REGULAR SEASON"}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center font-mono font-bold text-gray-200">{summerP ? summerP.gp : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{summerP ? summerP.goals : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{summerP ? summerP.assists : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono font-black text-orange-400">{summerP ? summerP.points : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-400">0:00</td>
                                    </tr>
                                  );
                                })()}

                                {/* Season 2: Summer Playoffs 2026 */}
                                {(() => {
                                  const playoffP = playoffStats.players.find(x => x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName);
                                  const summerP = players.find(x => (x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName) && !x.teamId.startsWith('w_'));
                                  const summerTeamName = summerP ? getTeamName(summerP.teamId) : '-';
                                  return (
                                    <tr className="hover:bg-white/5 transition-colors bg-gray-900/20">
                                      <td className="py-3 px-3.5">
                                        <div className="font-bold text-white text-xs sm:text-sm">
                                          {language === "fr" ? "Séries Été 2026" : "Summer Playoffs 2026"}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                          {summerTeamName} - {language === "fr" ? "SÉRIES ÉLIMINATOIRES" : "PLAYOFFS"}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center font-mono font-bold text-gray-200">{playoffP ? playoffP.gp : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{playoffP ? playoffP.goals : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{playoffP ? playoffP.assists : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono font-black text-orange-400">{playoffP ? playoffP.points : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-400">0:00</td>
                                    </tr>
                                  );
                                })()}

                                {/* Season 3: Winter 2026-2027 */}
                                {(() => {
                                  const winterP = winterStats.players.find(x => x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName);
                                  const winterTeamId = winterP ? winterP.teamId : (rawPerson.seasonTeamIds?.['winter_2026_2027'] || (rawPerson.teamId.startsWith('w_') ? rawPerson.teamId : undefined));
                                  const winterTeamName = winterTeamId ? getTeamName(winterTeamId) : '-';
                                  return (
                                    <tr className="hover:bg-white/5 transition-colors">
                                      <td className="py-3 px-3.5">
                                        <div className="font-bold text-gray-300 text-xs sm:text-sm">
                                          {language === "fr" ? "Hiver 2026-2027" : "Winter 2026-2027"}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                          {winterTeamName} - {language === "fr" ? "SAISON RÉGULIÈRE" : "REGULAR SEASON"}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{winterP ? winterP.gp : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{winterP ? winterP.goals : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{winterP ? winterP.assists : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono font-black text-orange-400">{winterP ? winterP.points : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-400">0:00</td>
                                    </tr>
                                  );
                                })()}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          /* Goalie Career Stats */
                          <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-md">
                            <table className="w-full text-left border-collapse bg-gray-900/40">
                              <thead>
                                <tr className="bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-wider border-b border-gray-800">
                                  <th className="py-3 px-3.5">{language === "fr" ? "Année  Saison" : "Year  Season"}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.gp}</th>
                                  <th className="py-3 px-2 text-center">{language === "fr" ? "Fiche (V-D-N)" : "Record (W-L-T)"}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.shotsAgainst}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.goalsAgainstShort}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.svPct}</th>
                                  <th className="py-3 px-2 text-center">{t.standings.gaa}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-800/60 text-xs">
                                {/* Season 1: Regular Season Summer 2026 */}
                                {(() => {
                                  const summerG = goalies.find(x => (x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName) && !x.teamId.startsWith('w_'));
                                  const summerTeamName = summerG ? getTeamName(summerG.teamId) : '-';
                                  const gSv = summerG && summerG.shotsAgainst > 0 ? ((summerG.saves / summerG.shotsAgainst)).toFixed(3).replace(/^0+/, '') : '.000';
                                  const gGaa = summerG && summerG.gp > 0 ? (summerG.goalsAgainst / summerG.gp).toFixed(2) : '0.00';
                                  return (
                                    <tr className="hover:bg-white/5 transition-colors">
                                      <td className="py-3 px-3.5">
                                        <div className="font-bold text-white text-xs sm:text-sm">
                                          {language === "fr" ? "Été 2026" : "Summer 2026"}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                          {summerTeamName} - {language === "fr" ? "SAISON RÉGULIÈRE" : "REGULAR SEASON"}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center font-mono font-bold text-gray-200">{summerG ? summerG.gp : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{summerG ? `${summerG.wins}-${summerG.losses}-${summerG.draws}` : '0-0-0'}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{summerG ? summerG.shotsAgainst : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-red-400">{summerG ? summerG.goalsAgainst : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono font-black text-orange-400">{gSv}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{gGaa}</td>
                                    </tr>
                                  );
                                })()}

                                {/* Season 2: Summer Playoffs 2026 */}
                                {(() => {
                                  const playoffG = playoffStats.goalies.find(x => x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName);
                                  const summerG = goalies.find(x => (x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName) && !x.teamId.startsWith('w_'));
                                  const summerTeamName = summerG ? getTeamName(summerG.teamId) : '-';
                                  return (
                                    <tr className="hover:bg-white/5 transition-colors bg-gray-900/20">
                                      <td className="py-3 px-3.5">
                                        <div className="font-bold text-white text-xs sm:text-sm">
                                          {language === "fr" ? "Séries Été 2026" : "Summer Playoffs 2026"}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                          {summerTeamName} - {language === "fr" ? "SÉRIES ÉLIMINATOIRES" : "PLAYOFFS"}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center font-mono font-bold text-gray-200">{playoffG ? playoffG.gp : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{playoffG ? `${playoffG.wins}-${playoffG.losses}-${playoffG.draws}` : '0-0-0'}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{playoffG ? playoffG.shotsAgainst : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-red-400">{playoffG ? playoffG.goalsAgainst : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono font-black text-orange-400">.000</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">0.00</td>
                                    </tr>
                                  );
                                })()}

                                {/* Season 3: Winter 2026-2027 */}
                                {(() => {
                                  const winterG = winterStats.goalies.find(x => x.id === rawPerson.id || x.name.toLowerCase().trim() === normalizedName);
                                  const winterTeamId = winterG ? winterG.teamId : (rawPerson.seasonTeamIds?.['winter_2026_2027'] || (rawPerson.teamId.startsWith('w_') ? rawPerson.teamId : undefined));
                                  const winterTeamName = winterTeamId ? getTeamName(winterTeamId) : '-';
                                  return (
                                    <tr className="hover:bg-white/5 transition-colors">
                                      <td className="py-3 px-3.5">
                                        <div className="font-bold text-gray-300 text-xs sm:text-sm">
                                          {language === "fr" ? "Hiver 2026-2027" : "Winter 2026-2027"}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                          {winterTeamName} - {language === "fr" ? "SAISON RÉGULIÈRE" : "REGULAR SEASON"}
                                        </div>
                                      </td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{winterG ? winterG.gp : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{winterG ? `${winterG.wins}-${winterG.losses}-${winterG.draws}` : '0-0-0'}</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">{winterG ? winterG.shotsAgainst : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono text-red-400">{winterG ? winterG.goalsAgainst : 0}</td>
                                      <td className="py-3 px-2 text-center font-mono font-black text-orange-400">.000</td>
                                      <td className="py-3 px-2 text-center font-mono text-gray-200">0.00</td>
                                    </tr>
                                  );
                                })()}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
             </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Standings;
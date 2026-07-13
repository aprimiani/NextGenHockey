import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Calendar, User, Trophy, LayoutList, Shield, ChevronUp, ChevronDown } from 'lucide-react';
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

  const [selectedSeason, setSelectedSeason] = useState<'summer_2026_reg' | 'summer_2026_playoffs' | 'winter_2026_2027'>('summer_2026_reg');

  const seasonsList = [
    { id: 'summer_2026_reg', label: language === 'fr' ? 'Saison Régulière Été 2026' : 'Summer Regular Season 2026' },
    { id: 'summer_2026_playoffs', label: language === 'fr' ? 'Séries Éliminatoires Été 2026' : 'Summer Playoffs 2026' },
    { id: 'winter_2026_2027', label: language === 'fr' ? "Saison d'Hiver 2026-2027" : 'Winter Season 2026-2027' },
  ] as const;

  const playoffStats = useMemo(() => {
    const playoffTeamsMap: Record<string, Team> = {};
    teams.forEach(t => {
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
    players.forEach(p => {
      playoffPlayersMap[p.id] = {
        ...p,
        gp: 0,
        goals: 0,
        assists: 0,
        points: 0
      };
    });

    const playoffGoaliesMap: Record<string, GoalieStats> = {};
    goalies.forEach(g => {
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

      players.forEach(p => {
        if (p.teamId === homeId || p.secondaryTeamIds?.includes(homeId)) {
          if (playoffPlayersMap[p.id]) {
            playoffPlayersMap[p.id].gp++;
          }
        }
        if (p.teamId === awayId || p.secondaryTeamIds?.includes(awayId)) {
          if (playoffPlayersMap[p.id]) {
            playoffPlayersMap[p.id].gp++;
          }
        }
      });

      const recap = gameRecaps[game.id];
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
    return {
      teams: teams.map(t => ({
        ...t,
        gp: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0
      })),
      players: players.map(p => ({
        ...p,
        gp: 0,
        goals: 0,
        assists: 0,
        points: 0
      })),
      goalies: goalies.map(g => ({
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
      }))
    };
  }, [teams, players, goalies]);

  const activeTeamsList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') return teams;
    if (selectedSeason === 'summer_2026_playoffs') return playoffStats.teams;
    return winterStats.teams;
  }, [selectedSeason, teams, playoffStats, winterStats]);

  const activePlayersList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') return players;
    if (selectedSeason === 'summer_2026_playoffs') return playoffStats.players;
    return winterStats.players;
  }, [selectedSeason, players, playoffStats, winterStats]);

  const activeGoaliesList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') return goalies;
    if (selectedSeason === 'summer_2026_playoffs') return playoffStats.goalies;
    return winterStats.goalies;
  }, [selectedSeason, goalies, playoffStats, winterStats]);

  const activeScheduleList = useMemo(() => {
    if (selectedSeason === 'summer_2026_reg') {
      return schedule.filter(g => !g.isPlayoff);
    }
    if (selectedSeason === 'summer_2026_playoffs') {
      return schedule.filter(g => g.isPlayoff);
    }
    return [];
  }, [selectedSeason, schedule]);

  // Sorting State
  const [teamSort, setTeamSort] = useState<{ key: keyof Team | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [playerSort, setPlayerSort] = useState<{ key: keyof PlayerStats | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [goalieSort, setGoalieSort] = useState<{ key: keyof GoalieStats | 'gaa' | 'svPct' | 'rank'; dir: 'asc' | 'desc' }>({ key: 'svPct', dir: 'desc' });

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
    const key = teamSort.key as keyof Team;

    let valA = a[key];
    let valB = b[key];

    if (typeof valA === 'string') {
      return teamSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }

    if (teamSort.dir === 'asc') {
      return (valA as number) - (valB as number);
    } else {
      return (valB as number) - (valA as number);
    }
  });

  // Secondary sort for teams if primary sort is points
  if (teamSort.key === 'points') {
    sortedTeams.sort((a, b) => {
      if (b.points !== a.points) return teamSort.dir === 'asc' ? a.points - b.points : b.points - a.points;
      return teamSort.dir === 'asc' ? a.wins - b.wins : b.wins - a.wins;
    });
  }

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
    if (id === 'sub') return 'League Sub';
    if (id.toLowerCase() === 'tbd') {
      return language === 'fr' ? 'À déterminer' : 'TBD';
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
    if (id.toLowerCase() === 'tbd') return '#6b7280';
    return teams.find(t => t.id === id)?.logoColor || '#ccc';
  };
  const getTeamInitial = (id: string) => {
    if (id.toLowerCase() === 'tbd') return '?';
    const name = getTeamName(id);
    if (name.toLowerCase() === 'team l') return 'L';
    if (name.toLowerCase() === '86ers') return '86';
    return name.substring(0, 1);
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

      {selectedSeason === 'winter_2026_2027' ? (
        <div className="text-center py-20 px-6 bg-ng-blue/20 rounded-3xl border border-dashed border-gray-700 shadow-xl relative overflow-hidden">
          <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
            <Trophy className="text-amber-400" size={28} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight mb-2">
            {language === 'fr' ? "Saison d'Hiver 2026-2027 - À venir" : "Winter Season 2026-2027 - Coming Soon"}
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
            {language === 'fr' 
              ? "Les statistiques pour la saison d'hiver 2026-2027 seront disponibles dès le coup d'envoi du premier match officiel de la ligue!" 
              : "Statistics for the Winter 2026-2027 season will be available as soon as the first official league game kicks off!"}
          </p>
          <div className="inline-flex items-center gap-2 bg-ng-light-blue/10 text-ng-light-blue text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-ng-light-blue/20">
            <span className="w-2 h-2 rounded-full bg-ng-light-blue animate-ping" />
            {language === 'fr' ? "Aucune donnée enregistrée" : "No data recorded yet"}
          </div>
        </div>
      ) : (
        <>
      <div className="bg-ng-blue/30 rounded-lg border border-gray-700 shadow-xl mb-12 relative fade-right overflow-hidden">
        <div 
          className="overflow-x-auto hide-scrollbar" 
          style={scrollbarHideStyle}
        >
          <table className="w-full divide-y divide-gray-700">
            <thead className="bg-ng-blue">
              <tr>
                <th 
                  scope="col" 
                  className="px-1 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'rank')}
                >
                  <div className="flex items-center">
                    {t.standings.rank}
                    <SortIcon sort={teamSort} column="rank" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'name')}
                >
                  <div className="flex items-center">
                    {t.standings.team}
                    <SortIcon sort={teamSort} column="name" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'gp')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.gp}
                    <SortIcon sort={teamSort} column="gp" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'wins')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.w}
                    <SortIcon sort={teamSort} column="wins" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'losses')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.l}
                    <SortIcon sort={teamSort} column="losses" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-2 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'ties')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.t}
                    <SortIcon sort={teamSort} column="ties" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'points')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.pts}
                    <SortIcon sort={teamSort} column="points" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden lg:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'goalsFor')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.gf}
                    <SortIcon sort={teamSort} column="goalsFor" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden lg:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'goalsAgainst')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.ga}
                    <SortIcon sort={teamSort} column="goalsAgainst" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedTeams.map((team, index) => (
                <tr key={team.id} className="hover:bg-ng-blue/50 transition-colors group">
                  <td className="px-1 md:px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center md:text-left">{index + 1}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => setSelectedTeam(team)}
                      className="flex items-center text-left hover:text-ng-light-blue transition-colors outline-none"
                    >
                      <span className="mr-2 text-[11px] font-black italic shrink-0" style={{ color: team.logoColor }}>{getTeamInitial(team.id)}</span>
                      <div className="text-sm font-bold text-white group-hover:text-ng-light-blue leading-tight">{renderTeamName(team.id)}</div>
                    </button>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300 font-bold">{team.gp}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-green-400 font-semibold">{team.wins}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-red-400">{team.losses}</td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-400">{team.ties}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-white font-bold bg-ng-light-blue/10">{team.points}</td>
                  <td className="hidden lg:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">{team.goalsFor}</td>
                  <td className="hidden lg:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">{team.goalsAgainst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                            if (p) setSelectedPlayer(p);
                            else if (g) setSelectedGoalie(g);
                          }}
                          className="text-xl sm:text-2xl font-black text-white uppercase italic hover:text-ng-light-blue transition-colors text-center sm:text-left outline-none leading-tight"
                        >
                          {name}
                        </button>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left mt-0.5">
                          {renderTeamName(teamId)}
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

        <div className="p-6">
           {activeTab === 'players' ? (
             <div className="relative fade-right overflow-hidden">
               <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
                 <table className="w-full divide-y divide-gray-700">
                   <thead>
                     <tr>
                       <th 
                         className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'rank')}
                       >
                         <div className="flex items-center">
                           {t.standings.rank}
                           <SortIcon sort={playerSort} column="rank" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'name')}
                       >
                         <div className="flex items-center">
                           {t.standings.player}
                           <SortIcon sort={playerSort} column="name" />
                         </div>
                       </th>
                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                       <th 
                         className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'gp')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.gp}
                           <SortIcon sort={playerSort} column="gp" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'goals')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.goals}
                           <SortIcon sort={playerSort} column="goals" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'assists')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.assists}
                           <SortIcon sort={playerSort} column="assists" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-center text-xs font-medium text-ng-light-blue uppercase whitespace-nowrap cursor-pointer group"
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
                         <td className="px-1 md:px-4 py-3 text-sm text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                         <td className="px-3 md:px-4 py-3 text-sm font-bold text-white whitespace-nowrap text-left">
                            <div className="flex flex-col items-start">
                              <button onClick={() => setSelectedPlayer(player)} className="hover:text-ng-light-blue transition-colors outline-none text-left"><span>{player.name}</span></button>
                              <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(player.teamId) }}>{getTeamInitial(player.teamId)}</span>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">{renderTeamName(player.teamId)}{player.secondaryTeamIds && player.secondaryTeamIds.length > 0 ? ` + ${player.secondaryTeamIds.length}` : ''}</span>
                              </div>
                            </div>
                         </td>
                         <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-gray-300 flex items-center gap-2 whitespace-nowrap">
                            <span className="text-[11px] font-black italic mr-2" style={{ color: getTeamColor(player.teamId) }}>{getTeamInitial(player.teamId)}</span>
                            {renderTeamName(player.teamId)}{player.secondaryTeamIds && player.secondaryTeamIds.length > 0 ? ` + ${player.secondaryTeamIds.length}` : ''}
                         </td>
                         <td className="px-2 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{player.gp}</td>
                         <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{player.goals}</td>
                         <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{player.assists}</td>
                         <td className="px-3 md:px-4 py-3 text-sm text-center font-bold text-ng-light-blue whitespace-nowrap">{player.points}</td>
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
                 <table className="w-full divide-y divide-gray-700">
                   <thead>
                     <tr>
                       <th 
                         className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                         onClick={() => handleSort(goalieSort, setGoalieSort, 'rank')}
                       >
                         <div className="flex items-center">
                           {t.standings.rank}
                           <SortIcon sort={goalieSort} column="rank" />
                         </div>
                       </th>
                                               <th 
                          className="px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'name')}
                        >
                          <div className="flex items-center">
                            {t.standings.player}
                            <SortIcon sort={goalieSort} column="name" />
                          </div>
                        </th>

                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                                               <th 
                          className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'gp')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gp}
                            <SortIcon sort={goalieSort} column="gp" />
                          </div>
                        </th>

                                               <th 
                          className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'wins')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.record}
                            <SortIcon sort={goalieSort} column="wins" />
                          </div>
                        </th>

                                               <th 
                          className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'gaa')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gaa}
                            <SortIcon sort={goalieSort} column="gaa" />
                          </div>
                        </th>

                                               <th 
                          className="px-3 md:px-4 py-3 text-center text-xs font-medium text-ng-light-blue uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'svPct')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.svPct}
                            <SortIcon sort={goalieSort} column="svPct" />
                           </div>
                         </th>
                         <th 
                           className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                           onClick={() => handleSort(goalieSort, setGoalieSort, 'shutouts')}
                         >
                           <div className="flex items-center justify-center">
                             {t.standings.shutouts}
                             <SortIcon sort={goalieSort} column="shutouts" />
                           </div>
                         </th>
                         <th style={{ display: "none" }}><div className="hidden"></div></th>

                                               <th 
                          className="hidden lg:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'shotsAgainst')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.shotsAgainst}
                            <SortIcon sort={goalieSort} column="shotsAgainst" />
                          </div>
                        </th>

                                               <th 
                          className="hidden lg:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap cursor-pointer group"
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
                          <td className="px-1 md:px-4 py-3 text-sm text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                          <td className="px-3 md:px-4 py-3 text-sm font-bold text-white whitespace-nowrap text-left">
                            <div className="flex flex-col items-start">
                              <button onClick={() => setSelectedGoalie(goalie)} className="hover:text-ng-light-blue transition-colors outline-none text-left"><span>{goalie.name}</span></button>
                              <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(goalie.teamId) }}>{getTeamInitial(goalie.teamId)}</span>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">{renderTeamName(goalie.teamId)}{goalie.secondaryTeamIds && goalie.secondaryTeamIds.length > 0 ? ` + ${goalie.secondaryTeamIds.length}` : ''}</span>
                              </div>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-gray-300 flex items-center gap-2 whitespace-nowrap">
                              <span className="text-[11px] font-black italic mr-2" style={{ color: getTeamColor(goalie.teamId) }}>{getTeamInitial(goalie.teamId)}</span>
                              <span>{renderTeamName(goalie.teamId)}{goalie.secondaryTeamIds && goalie.secondaryTeamIds.length > 0 ? ` + ${goalie.secondaryTeamIds.length}` : ''}</span>
                          </td>
                          <td className="px-2 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{goalie.gp}</td>
                          <td className="px-2 md:px-4 py-3 text-sm text-center text-gray-300 font-mono text-[10px] whitespace-nowrap">{goalie.wins}-{goalie.losses}-{goalie.draws}</td>
                          <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono whitespace-nowrap">{gaa}</td>
                          <td className="px-3 md:px-4 py-3 text-sm text-center font-bold text-ng-light-blue whitespace-nowrap">{svPct}</td>
                          <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono whitespace-nowrap">{goalie.shutouts || 0}</td>
                          <td className="hidden lg:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{goalie.shotsAgainst}</td>
                          <td className="hidden lg:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{goalie.goalsAgainst}</td>
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

        </>
      )}

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
                  <span className="text-3xl md:text-4xl font-black italic shrink-0" style={{ color: selectedTeam.logoColor }}>
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
                                          onClick={() => setSelectedGoalie(g)}
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
                                        onClick={() => setSelectedPlayer(p)}
                                        className="hover:text-ng-light-blue transition-colors outline-none flex items-center gap-2"
                                      >
                                        <span>{p.name}</span>
                                        {p.teamId !== selectedTeam.id && p.name !== 'Lucas Molinaro' && (
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
      {/* Player Profile Modal */}
      {selectedPlayer && (() => {
        const outerPlayer = selectedPlayer;
        const playerFromList = activePlayersList.find(p => p.id === outerPlayer.id);
        const resolvedPlayer = playerFromList ? { ...playerFromList, secondaryTeamIds: playerFromList.secondaryTeamIds || outerPlayer.secondaryTeamIds } : outerPlayer;
        
        return ((selectedPlayer: any) => {

        // First, get all played games for this player's PRIMARY team chronologically
        const primaryTeamGames = activeScheduleList
          .filter(g => g.status === 'played' && (g.homeTeamId === selectedPlayer.teamId || g.awayTeamId === selectedPlayer.teamId))
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
            const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
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
          // 1. If suspended, assign suspension details first
          if (remainingSuspension > 0) {
            const currentSuspIndex = totalSuspension - remainingSuspension + 1;
            suspensionMap.set(g.id, { 
              current: currentSuspIndex, 
              total: totalSuspension,
              isRemainder: isRemainderSuspension
            });
            remainingSuspension--;
          }

          // 2. Then check if a new suspension is triggered in this game
          const recap = gameRecaps[g.id];
          if (recap?.events) {
            recap.events.forEach(e => {
              if (e.type === 'penalty' && e.player === selectedPlayer.id) {
                const length = getSuspensionLength(e.details);
                if (length > 0) {
                  remainingSuspension = length;
                  totalSuspension = length;
                  isRemainderSuspension = /remainder\s*of\s*(?:the\s*)?season|reste\s*de\s*(?:la\s*)?saison/i.test(e.details || '');
                }
              }
            });
          }
        });

        const playerGames = activeScheduleList.filter(g => {
          if (g.status !== 'played') return false;
          const isOnHomeTeam = g.homeTeamId === selectedPlayer.teamId || selectedPlayer.secondaryTeamIds?.includes(g.homeTeamId);
          const isOnAwayTeam = g.awayTeamId === selectedPlayer.teamId || selectedPlayer.secondaryTeamIds?.includes(g.awayTeamId);
          if (isOnHomeTeam || isOnAwayTeam) return true;
          const recap = gameRecaps[g.id];
          if (recap?.events) {
            return recap.events.some(e => 
              e.player === selectedPlayer.id || 
              e.assist === selectedPlayer.id || 
              e.assist2 === selectedPlayer.id
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
              if (e.type === 'goal') {
                if (e.player === selectedPlayer.id) {
                  goals++;
                }
                if (e.assist === selectedPlayer.id || e.assist2 === selectedPlayer.id) {
                  assists++;
                }
              } else if (e.type === 'penalty') {
                if (e.player === selectedPlayer.id) {
                  penalties += e.penaltyMinutes || 2;
                }
              }
            });
          }
          
          const isHome = g.homeTeamId === selectedPlayer.teamId || selectedPlayer.secondaryTeamIds?.includes(g.homeTeamId);
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

        return (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedPlayer(null)}
          >
             <div 
               className="bg-ng-navy border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto scrollbar-thin"
               onClick={(e) => e.stopPropagation()}
             >
                  <div 
                    className="p-5 relative overflow-hidden flex flex-col items-center text-center"
                    style={{ backgroundColor: `${getTeamColor(selectedPlayer.teamId)}20`, borderBottom: `2px solid ${getTeamColor(selectedPlayer.teamId)}` }}
                  >
                    <button onClick={() => setSelectedPlayer(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white z-10">
                      <X size={20} />
                    </button>
                    
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-4" style={{ borderColor: getTeamColor(selectedPlayer.teamId), backgroundColor: getTeamColor(selectedPlayer.teamId) }}>
                      <span className="text-3xl font-black text-white italic pr-1">
                        {getTeamName(selectedPlayer.teamId).charAt(0)}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white uppercase italic leading-tight mb-1">{selectedPlayer.name}</h2>
                    <div className="flex flex-col items-center gap-1 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-white/10 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.player}</span>
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{renderTeamName(selectedPlayer.teamId)}</span>
                      </div>
                      {selectedPlayer.secondaryTeamIds && selectedPlayer.secondaryTeamIds.length > 0 && (
                        <div className="flex flex-wrap justify-center items-center gap-1 mt-1">
                          <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest mr-1">Subs:</span>
                          {selectedPlayer.secondaryTeamIds.map((tid: string) => (
                            <span key={tid} className="bg-ng-light-blue/20 text-ng-light-blue text-[9px] font-black px-1.5 py-0.5 rounded border border-ng-light-blue/30 uppercase tracking-wider">{renderTeamName(tid)}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                      <div className="bg-ng-navy/50 p-3 rounded-xl border border-gray-700">
                        <div className="text-2xl font-black text-ng-light-blue">{selectedPlayer.points}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.points}</div>
                      </div>
                      <div className="bg-ng-navy/50 p-3 rounded-xl border border-gray-700">
                        <div className="text-2xl font-black text-white">#{sortedPlayers.findIndex(p => p.id === selectedPlayer.id) + 1}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.leagueRank}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedPlayer.gp}</div>
                      <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.gp}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedPlayer.goals}</div>
                      <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.goals}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{selectedPlayer.assists}</div>
                      <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.assists}</div>
                    </div>
                  </div>

                  {/* Skater Game Logs Section */}
                  <div className="border-t border-gray-700/50 p-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Calendar size={14} className="text-ng-light-blue" />
                      {t.standings.gameLogs}
                    </h3>
                    
                    {skaterLogs.length === 0 ? (
                      <p className="text-xs text-gray-500 italic text-center py-2">
                        {language === 'fr' ? 'Aucun match joué.' : 'No games played yet.'}
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-gray-800 text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                              <th className="py-1.5">{language === 'fr' ? 'Date' : 'Date'}</th>
                              <th className="py-1.5">{t.standings.opponent}</th>
                              <th className="py-1.5 text-center">{t.standings.goals}</th>
                              <th className="py-1.5 text-center">{t.standings.assists}</th>
                              <th className="py-1.5 text-center">{t.standings.points}</th>
                              <th className="py-1.5 text-center">{t.standings.pim}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800/30">
                            {skaterLogs.map(({ game, goals, assists, points, penalties, opponentTeamId, isSuspended, suspInfo }) => {
                              const [y, m, d] = game.date.split('-');
                              const monthName = t.standings.months[parseInt(m) - 1] || m;
                              const formattedDate = language === 'fr' 
                                ? `${parseInt(d)} ${monthName}` 
                                : `${monthName} ${parseInt(d)}`;
                              
                              return (
                                <tr key={game.id} className="text-xs hover:bg-white/5 transition-colors">
                                  <td className="py-2 font-medium text-gray-300">{formattedDate}</td>
                                  <td className="py-2 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: getTeamColor(opponentTeamId) }} />
                                    <span className="text-white font-bold">{getTeamName(opponentTeamId)}</span>
                                  </td>
                                  <td className="py-2 text-center text-gray-300 font-mono font-semibold">{isSuspended ? '-' : goals}</td>
                                  <td className="py-2 text-center text-gray-300 font-mono font-semibold">{isSuspended ? '-' : assists}</td>
                                  <td className="py-2 text-center text-ng-light-blue font-mono font-black">{isSuspended ? '-' : points}</td>
                                  <td className="py-2 text-center text-gray-400 font-mono">
                                    {isSuspended && suspInfo ? (
                                      <span className="text-red-400 font-black bg-red-950/40 border border-red-800/30 px-1.5 py-0.5 rounded text-[9px] tracking-wide inline-block">
                                        {suspInfo.isRemainder ? (
                                          language === 'fr' ? 'Reste' : 'Remainder'
                                        ) : (
                                          `${suspInfo.current}/${suspInfo.total}`
                                        )}
                                      </span>
                                    ) : (
                                      penalties > 0 ? `${penalties}m` : '-'
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
             </div>
          </div>
        );
      })(resolvedPlayer);
    })()}

      {/* Goalie Profile Modal */}
      {selectedGoalie && (() => {
        const resolvedGoalie = activeGoaliesList.find(g => g.id === selectedGoalie.id) || selectedGoalie;
        const goalieGames = activeScheduleList.filter(g => {
          if (g.status !== 'played') return false;
          const recap = gameRecaps[g.id];
          if (!recap) return false;
          return (
            recap.goalieStats?.homeGoalie?.playerId === resolvedGoalie.id ||
            recap.goalieStats?.awayGoalie?.playerId === resolvedGoalie.id
          );
        });

        const goalieLogs = goalieGames.map(g => {
          const recap = gameRecaps[g.id];
          const isHome = recap.goalieStats.homeGoalie.playerId === resolvedGoalie.id;
          const stats = isHome ? recap.goalieStats.homeGoalie : recap.goalieStats.awayGoalie;
          
          const opponentTeamId = isHome ? g.awayTeamId : g.homeTeamId;
          const myTeamId = isHome ? g.homeTeamId : g.awayTeamId;
          
          const myScore = isHome ? g.homeScore : g.awayScore;
          const oppScore = isHome ? g.awayScore : g.homeScore;
          
          let result = 'D'; // Default Tie
          if (myScore !== undefined && oppScore !== undefined) {
            if (myScore > oppScore) result = 'W';
            else if (myScore < oppScore) result = 'L';
          }
          
          const shotsAgainst = stats.shotsFaced;
          const goalsAgainst = stats.goalsAgainst;
          const saves = stats.saves;
          const savePct = shotsAgainst > 0 ? ((shotsAgainst - goalsAgainst) / shotsAgainst).toFixed(3) : '.000';
          
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

        return (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedGoalie(null)}
          >
             <div 
               className="bg-ng-navy border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto scrollbar-thin"
               onClick={(e) => e.stopPropagation()}
             >
                  <div 
                    className="p-5 relative overflow-hidden flex flex-col items-center text-center"
                    style={{ backgroundColor: `${getTeamColor(resolvedGoalie.teamId)}20`, borderBottom: `2px solid ${getTeamColor(resolvedGoalie.teamId)}` }}
                  >
                    <button onClick={() => setSelectedGoalie(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white z-10">
                      <X size={20} />
                    </button>
                    
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-4" style={{ borderColor: getTeamColor(resolvedGoalie.teamId), backgroundColor: getTeamColor(resolvedGoalie.teamId) }}>
                      <span className="text-3xl font-black text-white italic pr-1">
                        {getTeamName(resolvedGoalie.teamId).charAt(0)}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white uppercase italic leading-tight mb-1">{resolvedGoalie.name}</h2>
                    <div className="flex flex-col items-center gap-1 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-ng-light-blue text-ng-navy text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.goalie}</span>
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{renderTeamName(resolvedGoalie.teamId)}</span>
                      </div>
                      {resolvedGoalie.secondaryTeamIds && resolvedGoalie.secondaryTeamIds.length > 0 && (
                        <div className="flex flex-wrap justify-center items-center gap-1 mt-1">
                          <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest mr-1">Subs:</span>
                          {resolvedGoalie.secondaryTeamIds.map((tid: string) => (
                            <span key={tid} className="bg-ng-light-blue/20 text-ng-light-blue text-[9px] font-black px-1.5 py-0.5 rounded border border-ng-light-blue/30 uppercase tracking-wider">{renderTeamName(tid)}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                      <div className="bg-ng-navy/50 p-3 rounded-xl border border-gray-700">
                        <div className="text-2xl font-black text-ng-light-blue">
                          {resolvedGoalie.gp > 0 ? (resolvedGoalie.goalsAgainst / resolvedGoalie.gp).toFixed(2) : '0.00'}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.gaa}</div>
                      </div>
                      <div className="bg-ng-navy/50 p-3 rounded-xl border border-gray-700">
                        <div className="text-2xl font-black text-white">#{sortedGoalies.findIndex(g => g.id === resolvedGoalie.id) + 1}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.leagueRank}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{resolvedGoalie.gp}</div>
                      <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.gp}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{resolvedGoalie.wins}-{resolvedGoalie.losses}-{resolvedGoalie.draws}</div>
                      <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.record}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {resolvedGoalie.shotsAgainst > 0 ? ((resolvedGoalie.shotsAgainst - resolvedGoalie.goalsAgainst) / resolvedGoalie.shotsAgainst).toFixed(3) : '.000'}
                      </div>
                      <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.svPct}</div>
                    </div>
                  </div>

                  {/* Goalie Game Logs Section */}
                  <div className="border-t border-gray-700/50 p-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Calendar size={14} className="text-ng-light-blue" />
                      {t.standings.gameLogs}
                    </h3>
                    
                    {goalieLogs.length === 0 ? (
                      <p className="text-xs text-gray-500 italic text-center py-2">
                        {language === 'fr' ? 'Aucun match joué.' : 'No games played yet.'}
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-gray-800 text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                              <th className="py-1.5">{language === 'fr' ? 'Date' : 'Date'}</th>
                              <th className="py-1.5">{t.standings.opponent}</th>
                              <th className="py-1.5 text-center">{language === 'fr' ? 'Rés.' : 'Res.'}</th>
                              <th className="py-1.5 text-center">{t.standings.shotsAgainst}</th>
                              <th className="py-1.5 text-center">{t.standings.goalsAgainstShort}</th>
                              <th className="py-1.5 text-center">SVS</th>
                              <th className="py-1.5 text-center">{t.standings.svPct}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800/30">
                            {goalieLogs.map(({ game, opponentTeamId, result, score, shotsAgainst, goalsAgainst, saves, savePct }) => {
                              const [y, m, d] = game.date.split('-');
                              const monthName = t.standings.months[parseInt(m) - 1] || m;
                              const formattedDate = language === 'fr' 
                                ? `${parseInt(d)} ${monthName}` 
                                : `${monthName} ${parseInt(d)}`;
                              
                              return (
                                <tr key={game.id} className="text-xs hover:bg-white/5 transition-colors">
                                  <td className="py-2 font-medium text-gray-300">{formattedDate}</td>
                                  <td className="py-2 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: getTeamColor(opponentTeamId) }} />
                                    <span className="text-white font-bold">{getTeamName(opponentTeamId)}</span>
                                  </td>
                                  <td className="py-2 text-center">
                                    <div className="flex flex-col items-center">
                                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${result === 'W' ? 'bg-green-500/20 text-green-400' : (result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400')}`}>{result}</span>
                                      <span className="text-[9px] text-gray-500 font-mono font-semibold mt-0.5">{score}</span>
                                    </div>
                                  </td>
                                  <td className="py-2 text-center text-gray-300 font-mono">{shotsAgainst}</td>
                                  <td className="py-2 text-center text-red-400 font-mono">{goalsAgainst}</td>
                                  <td className="py-2 text-center text-green-400 font-mono">{saves}</td>
                                  <td className="py-2 text-center text-ng-light-blue font-mono font-black">{savePct}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
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
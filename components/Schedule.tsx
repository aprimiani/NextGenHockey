import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { Calendar, MapPin, Clock, ArrowLeft, Trophy, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translatePenalty } from '../translations';

const Schedule: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { schedule, teams, players, goalies, gameRecaps, loading } = useLeagueData();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'scheduled' | 'played'>('scheduled');
  const [selectedSeason, setSelectedSeason] = useState<'summer_2026_reg' | 'summer_2026_playoffs' | 'winter_2026_2027'>('summer_2026_reg');

  const seasonsList = [
    { id: 'summer_2026_reg', label: language === 'fr' ? 'Saison Régulière Été 2026' : 'Summer Regular Season 2026' },
    { id: 'summer_2026_playoffs', label: language === 'fr' ? 'Séries Éliminatoires Été 2026' : 'Summer Playoffs 2026' },
    { id: 'winter_2026_2027', label: language === 'fr' ? "Saison d'Hiver 2026-2027" : 'Winter Season 2026-2027' },
  ] as const;

  useEffect(() => {
    if (location.state?.selectedGameId) {
      const gameId = location.state.selectedGameId;
      setSelectedGameId(gameId);
      
      const game = schedule.find(g => g.id === gameId);
      if (game?.status === 'played') {
        setFilter('played');
      } else if (game?.status === 'scheduled') {
        setFilter('scheduled');
      }
    }
  }, [location.state, schedule]);

  const getTeamName = (id: string) => {
    if (id === 'sub') return 'League Sub';
    if (id.toLowerCase() === 'tbd') {
      return language === 'fr' ? 'À déterminer' : 'TBD';
    }
    return teams.find(t => t.id === id)?.name || t.schedule.unknown;
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
  const getTeamLogo = (id: string) => teams.find(t => t.id === id)?.logoUrl;
  const getTeamInitial = (id: string) => {
    if (id.toLowerCase() === 'tbd') return '?';
    const name = getTeamName(id);
    if (name.toLowerCase() === 'team l') return 'L';
    if (name.toLowerCase() === '86ers') return '86';
    return name.substring(0, 1);
  };

  const filteredGames = useMemo(() => {
    let games = schedule;
    
    if (selectedSeason === 'summer_2026_reg') {
      games = schedule.filter(g => !g.isPlayoff);
    } else if (selectedSeason === 'summer_2026_playoffs') {
      games = schedule.filter(g => g.isPlayoff);
    } else if (selectedSeason === 'winter_2026_2027') {
      return [];
    }

    return games.filter(g => g.status === filter).sort((a, b) => {
      // For upcoming: show nearest first
      if (filter === 'scheduled') return new Date(a.date).getTime() - new Date(b.date).getTime();
      // For results: show most recent first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [schedule, filter, selectedSeason]);

  const selectedRecap = selectedGameId ? gameRecaps[selectedGameId] : null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T12:00:00');
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-US', options);
    } catch (e) { return dateString; }
  };

  // If initial load and no upcoming games, default to results
  React.useEffect(() => {
    if (schedule.length > 0 && schedule.filter(g => g.status === 'scheduled').length === 0) {
      setFilter('played');
    }
  }, [schedule]);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ng-light-blue"></div></div>;

  // Handle TBD / Empty State
  if (schedule.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-ng-blue/30 rounded-3xl border border-gray-700 p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-ng-light-blue animate-pulse"></div>
          <div className="bg-ng-light-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
             <Calendar className="text-ng-light-blue" size={40} />
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">{t.schedule.tbdTitle}</h2>
          <p className="text-ng-light-blue font-black uppercase tracking-widest mb-6">
            {t.schedule.seasonStart}
          </p>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-2">
            {t.schedule.tbdMessage}
          </p>
          <p className="text-gray-500 font-medium">
            {t.schedule.tbdSubtitle}
          </p>
          <div className="mt-12 flex justify-center gap-2">
             <div className="h-1 w-8 bg-gray-700 rounded-full"></div>
             <div className="h-1 w-16 bg-ng-light-blue rounded-full"></div>
             <div className="h-1 w-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedGameId && selectedRecap) {
    const game = schedule.find(g => g.id === selectedGameId);
    if (!game) return null;

    const getPlayerName = (id: string) => {
      if (id.toLowerCase() === 'bench' || id.toLowerCase() === 'banc') {
        return language === 'fr' ? 'Banc' : 'Bench';
      }
      return players.find(p => p.id === id)?.name || id;
    };
    const getGoalieName = (id: string) => goalies.find(g => g.id === id)?.name || id;

    const parseTimeToSeconds = (tStr: string | undefined): number => {
      if (!tStr) return 0;
      const parts = tStr.split(':');
      if (parts.length !== 2) return 0;
      const mins = parseInt(parts[0], 10) || 0;
      const secs = parseInt(parts[1], 10) || 0;
      return mins * 60 + secs;
    };

    const compareEvents = (a: any, b: any) => {
      const aPeriod = typeof a.period === 'number' ? a.period : parseInt(a.period, 10) || 0;
      const bPeriod = typeof b.period === 'number' ? b.period : parseInt(b.period, 10) || 0;
      if (aPeriod !== bPeriod) {
        return aPeriod - bPeriod;
      }
      return parseTimeToSeconds(a.time) - parseTimeToSeconds(b.time);
    };

    // Precompute running score states in chronological order of goals
    const sortedGoals = [...selectedRecap.events]
      .filter(e => e.type === 'goal')
      .sort(compareEvents);

    let homeScoreCurrent = 0;
    let awayScoreCurrent = 0;
    const goalRunningScores: Record<string, {
      homeScore: number;
      awayScore: number;
    }> = {};

    const homeInitial = getTeamInitial(game.homeTeamId);
    const awayInitial = getTeamInitial(game.awayTeamId);

    sortedGoals.forEach(g => {
      if (g.teamId === game.homeTeamId) {
        homeScoreCurrent++;
      } else if (g.teamId === game.awayTeamId) {
        awayScoreCurrent++;
      }
      
      goalRunningScores[g.id] = {
        homeScore: homeScoreCurrent,
        awayScore: awayScoreCurrent,
      };
    });

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setSelectedGameId(null)} className="flex items-center text-ng-light-blue hover:text-white mb-6 transition-colors font-bold uppercase tracking-widest text-xs"><ArrowLeft className="mr-2" size={20} />{t.schedule.backToSchedule}</button>
        <div className="bg-ng-blue/30 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
            <div className="bg-ng-navy p-6 border-b border-gray-700 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{t.schedule.gameRecap}</h2>
                <div className="flex items-center justify-center space-x-8">
                     <div className="text-center">
                        <div className="text-3xl font-bold text-white">{game.homeScore}</div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(game.homeTeamId) }}>{getTeamInitial(game.homeTeamId)}</span>
                          <div className="text-gray-400 text-sm font-bold uppercase">{renderTeamName(game.homeTeamId)}</div>
                        </div>
                     </div>
                     <div className="text-gray-500 font-bold">VS</div>
                     <div className="text-center">
                        <div className="text-3xl font-bold text-white">{game.awayScore}</div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(game.awayTeamId) }}>{getTeamInitial(game.awayTeamId)}</span>
                          <div className="text-gray-400 text-sm font-bold uppercase">{renderTeamName(game.awayTeamId)}</div>
                        </div>
                     </div>
                </div>
            </div>
            <div className="p-6 space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-ng-light-blue"></div> {t.schedule.scoringSummary}</h3>
                    <div className="space-y-4">
                        {sortedGoals.length > 0 ? sortedGoals.map(event => (
                            <div key={event.id} className="bg-ng-navy/50 p-4 rounded-xl border border-gray-700/50 shadow-inner">
                                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr_140px] gap-4 items-center">
                                    <div className="flex items-center space-x-3 border-r border-gray-700/50 pr-4">
                                        <span className="text-ng-light-blue font-mono font-bold text-lg">{event.time}</span>
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{t.schedule.period}</span>
                                            <span className="text-white font-bold text-sm">{event.period}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                                            <span className="text-xs font-black italic" style={{ color: getTeamColor(event.teamId) }}>
                                                {getTeamInitial(event.teamId)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{t.schedule.scorer}</span>
                                            <span className="text-white font-bold text-base md:text-lg">{getPlayerName(event.player)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:border-l md:border-gray-700/50 md:pl-6">
                                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{t.schedule.assist}</span>
                                        <div className="text-gray-300 font-medium text-sm">
                                            {event.assist ? (
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <span>{getPlayerName(event.assist)}</span>
                                                    {event.assist2 && <span className="text-gray-600">,</span>}
                                                    {event.assist2 && <span>{getPlayerName(event.assist2)}</span>}
                                                </div>
                                            ) : (
                                                <span className="text-gray-600 font-normal italic">None</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:border-l md:border-gray-700/50 md:pl-6 md:items-end md:text-right">
                                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">{language === 'fr' ? 'SCORE' : 'RUNNING SCORE'}</span>
                                        <div className="bg-gray-950/50 border border-gray-800/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-mono select-none">
                                            <span 
                                                className={event.teamId === game.homeTeamId ? "font-black text-[11px] tracking-wide" : "text-gray-500 font-medium text-[10px]"}
                                                style={event.teamId === game.homeTeamId ? { color: getTeamColor(game.homeTeamId), textShadow: `0 0 6px ${getTeamColor(game.homeTeamId)}` } : undefined}
                                            >
                                                {homeInitial}
                                            </span>
                                            <span className={event.teamId === game.homeTeamId ? "text-white font-black text-sm md:text-base transition-all" : "text-gray-500 font-medium text-xs md:text-sm"}>
                                                {goalRunningScores[event.id]?.homeScore ?? 0}
                                            </span>
                                            <span className="text-gray-800 font-bold text-xs px-0.5">-</span>
                                            <span className={event.teamId === game.awayTeamId ? "text-white font-black text-sm md:text-base transition-all" : "text-gray-500 font-medium text-xs md:text-sm"}>
                                                {goalRunningScores[event.id]?.awayScore ?? 0}
                                            </span>
                                            <span 
                                                className={event.teamId === game.awayTeamId ? "font-black text-[11px] tracking-wide" : "text-gray-500 font-medium text-[10px]"}
                                                style={event.teamId === game.awayTeamId ? { color: getTeamColor(game.awayTeamId), textShadow: `0 0 6px ${getTeamColor(game.awayTeamId)}` } : undefined}
                                            >
                                                {awayInitial}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <p className="text-gray-500 italic text-center py-4">{t.schedule.noEvents}</p>}
                    </div>
                </div>

                {selectedRecap.events.filter(e => e.type === 'penalty').length > 0 && (
                  <div>
                      <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-red-500"></div> {t.schedule.penaltySummary}</h3>
                      <div className="space-y-4">
                          {selectedRecap.events.filter(e => e.type === 'penalty').sort(compareEvents).map(event => (
                              <div key={event.id} className="bg-red-900/5 p-4 rounded-xl border border-red-900/10">
                                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 items-center">
                                      <div className="flex items-center space-x-3 border-r border-red-900/10 pr-4">
                                          <span className="text-red-400 font-mono font-bold text-lg">{event.time}</span>
                                          <div className="flex flex-col">
                                              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{t.schedule.period}</span>
                                              <span className="text-white font-bold text-sm">{event.period}</span>
                                          </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-3">
                                          <div className="w-8 h-8 rounded-full bg-red-900/20 flex items-center justify-center shrink-0 border border-red-900/30">
                                              <span className="text-xs font-black italic" style={{ color: getTeamColor(event.teamId) }}>
                                                  {getTeamInitial(event.teamId)}
                                              </span>
                                          </div>
                                          <div className="flex flex-col">
                                              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{t.schedule.player || 'Player'}</span>
                                              <span className="text-white font-bold text-base md:text-lg">{getPlayerName(event.player)}</span>
                                          </div>
                                      </div>

                                      <div className="flex flex-col md:border-l md:border-red-900/10 md:pl-6">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-red-500/50 text-[10px] font-black uppercase tracking-widest leading-none">{t.schedule.details || 'Details'}</span>
                                            <span className="bg-red-900/30 px-2 py-0.5 rounded text-[10px] text-red-400 font-black tracking-widest">{event.penaltyMinutes} MIN</span>
                                          </div>
                                          <span className="text-red-200 font-semibold text-sm">{translatePenalty(event.details, language)}</span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                )}

                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-ng-light-blue"></div> {t.schedule.goalieStats}</h3>
                    <div className="space-y-4">
                        {/* Mobile view: Cards */}
                        <div className="md:hidden space-y-3">
                            {[
                                { side: 'homeGoalie', teamId: game.homeTeamId },
                                { side: 'awayGoalie', teamId: game.awayTeamId }
                            ].map(({ side, teamId }) => {
                                const stats = (selectedRecap.goalieStats as any)[side];
                                const svPct = stats.shotsFaced > 0 
                                    ? (stats.saves / stats.shotsFaced).toFixed(3) 
                                    : '.000';
                                return (
                                    <div key={side} className="bg-ng-navy/30 rounded-xl border border-gray-700 p-4 shadow-inner">
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                                                    <span className="text-[10px] font-black italic" style={{ color: getTeamColor(teamId) }}>
                                                        {getTeamInitial(teamId)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-300 truncate max-w-[120px]">{renderTeamName(teamId)}</span>
                                            </div>
                                            <span className="text-sm font-bold text-white">{getGoalieName(stats.playerId)}</span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 text-center">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{t.standings.shotsAgainst}</span>
                                                <span className="text-gray-300 font-mono text-sm">{stats.shotsFaced}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{t.standings.goalsAgainstShort}</span>
                                                <span className="text-gray-300 font-mono text-sm">{stats.goalsAgainst}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{t.schedule.saves.substring(0, 3)}</span>
                                                <span className="text-ng-light-blue font-mono text-sm font-bold">{stats.saves}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{t.standings.svPct}</span>
                                                <span className="text-yellow-500 font-mono text-sm font-bold">{svPct}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop view: Table */}
                        <div className="hidden md:block bg-ng-navy/30 rounded-xl border border-gray-700 overflow-hidden shadow-inner font-sans">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                    <tr className="bg-gray-800/50">
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.schedule.team}</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.goalie}</th>
                                        <th className="px-4 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.shotsAgainst}</th>
                                        <th className="px-4 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.goalsAgainstShort}</th>
                                        <th className="px-4 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.schedule.saves || 'Saves'}</th>
                                        <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.svPct}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700/50">
                                    {[
                                        { side: 'homeGoalie', teamId: game.homeTeamId },
                                        { side: 'awayGoalie', teamId: game.awayTeamId }
                                    ].map(({ side, teamId }) => {
                                        const stats = (selectedRecap.goalieStats as any)[side];
                                        return (
                                            <tr key={side} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black italic" style={{ color: getTeamColor(teamId) }}>{getTeamInitial(teamId)}</span>
                                                        <span className="text-sm font-bold text-gray-300">{renderTeamName(teamId)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">{getGoalieName(stats.playerId)}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300 font-mono">{stats.shotsFaced}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300 font-mono">{stats.goalsAgainst}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-ng-light-blue font-mono font-bold">{stats.saves}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-yellow-500 font-mono font-bold">
                                                    {stats.shotsFaced > 0 
                                                        ? (stats.saves / stats.shotsFaced).toFixed(3) 
                                                        : '.000'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
            {t.schedule.title}
          </h2>
          <p className="text-ng-light-blue font-bold uppercase tracking-widest text-sm mt-3 pl-8">
            {selectedSeason === 'winter_2026_2027' 
              ? (language === 'fr' ? "PROCHAINE SAISON" : "UPCOMING SEASON") 
              : t.schedule.seasonStart}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Season Selector */}
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(e.target.value as any);
                if (e.target.value === 'winter_2026_2027') {
                  setFilter('scheduled');
                }
              }}
              className="appearance-none bg-ng-blue/80 text-white font-black uppercase tracking-widest text-xs sm:text-sm pl-4 pr-10 py-3 sm:py-3.5 rounded-2xl border-2 border-gray-700 hover:border-ng-light-blue/50 focus:outline-none focus:border-ng-light-blue cursor-pointer transition-all shadow-xl w-full"
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

          {/* Filter Tabs */}
          {selectedSeason !== 'winter_2026_2027' && (
            <div className="flex bg-ng-blue/50 p-1 rounded-2xl border border-gray-700 shadow-xl overflow-x-auto max-w-full">
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${filter === 'scheduled' ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20' : 'text-gray-400 hover:text-white'}`}
              >
                {t.schedule.filterUpcoming}
              </button>
              <button
                onClick={() => setFilter('played')}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${filter === 'played' ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20' : 'text-gray-400 hover:text-white'}`}
              >
                {t.schedule.filterResults}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom duration-500">
        {selectedSeason === 'winter_2026_2027' ? (
          <div className="text-center py-16 px-6 bg-ng-blue/20 rounded-3xl border border-dashed border-gray-700 shadow-xl relative overflow-hidden">
            <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
              <Trophy className="text-amber-400" size={28} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight mb-2">
              {language === 'fr' ? "Saison d'Hiver 2026-2027 - À venir" : "Winter Season 2026-2027 - Coming Soon"}
            </h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
              {language === 'fr' 
                ? "L'horaire de la saison d'hiver est en cours de finalisation par l'administration de la ligue. Restez à l'affût pour le dévoilement officiel du calendrier de la saison!" 
                : "The Winter season schedule is currently being finalized by the league administration. Stay tuned for the official calendar release!"}
            </p>
            <div className="inline-flex items-center gap-2 bg-ng-light-blue/10 text-ng-light-blue text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-ng-light-blue/20">
              <span className="w-2 h-2 rounded-full bg-ng-light-blue animate-ping" />
              {language === 'fr' ? "Inscriptions Ouvertes" : "Registration Open"}
            </div>
          </div>
        ) : filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            const isSemiOrFinal = game.isPlayoff && (
              game.playoffRoundEn?.toLowerCase().includes('semi') || 
              game.playoffRoundEn?.toLowerCase().includes('final')
            );
            
            return (
              <div 
                key={game.id} 
                className={
                  isSemiOrFinal 
                    ? "group bg-gradient-to-r from-amber-500/5 via-ng-blue/30 to-amber-500/5 rounded-2xl border-2 border-amber-500/50 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between hover:border-amber-400 hover:bg-ng-blue/40 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden"
                    : "group bg-ng-blue/30 rounded-2xl border border-gray-700 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between hover:border-ng-light-blue/50 hover:bg-ng-blue/50 transition-all duration-300 shadow-lg"
                }
              >
                {isSemiOrFinal && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 animate-pulse" />
                )}
                
                <div className="flex flex-col md:w-1/4 mb-4 md:mb-0 space-y-1 sm:space-y-2 w-full md:w-auto">
                  <div className="flex items-center text-white font-black text-base sm:text-lg uppercase italic">
                    <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 ${isSemiOrFinal ? 'text-amber-400' : 'text-ng-light-blue'}`} />
                    <span>{formatDate(game.date)}</span>
                  </div>
                  {game.isPlayoff && (
                    <div className="flex items-center pl-6 sm:pl-8">
                      <span className={`flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-widest italic ${
                        isSemiOrFinal 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse' 
                          : 'bg-ng-light-blue/20 text-ng-light-blue border-ng-light-blue/30'
                      }`}>
                        {isSemiOrFinal && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                        {game.playoffRoundEn ? (language === 'fr' ? `Séries - ${game.playoffRoundFr || game.playoffRoundEn}` : `Playoffs - ${game.playoffRoundEn}`) : (language === 'fr' ? 'Séries' : 'Playoffs')}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest pl-6 sm:pl-8"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />{game.time}</div>
                  <div className="flex items-center text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest pl-6 sm:pl-8"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />{game.location}</div>
                </div>
                
                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center w-full px-0 sm:px-4 my-4 md:my-0">
                  {/* Home Team */}
                  <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
                    <span className="text-white font-black text-right text-xs sm:text-base md:text-2xl uppercase italic leading-tight truncate sm:whitespace-normal">
                      {renderTeamName(game.homeTeamId)}
                    </span>
                    <span className="text-sm sm:text-lg md:text-xl font-black italic shrink-0" style={{ color: getTeamColor(game.homeTeamId) }}>
                      {getTeamInitial(game.homeTeamId)}
                    </span>
                  </div>
                  
                  {/* VS / Score */}
                  <div className="px-2 sm:px-6 flex flex-col items-center shrink-0">
                    {game.status === 'played' ? (
                      <div className={`px-2 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-xl text-lg sm:text-3xl font-black tracking-widest shadow-2xl group-hover:scale-110 transition-transform ${
                        isSemiOrFinal 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-ng-navy border border-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                          : 'bg-ng-navy text-white border border-ng-light-blue/30'
                      }`}>
                        {game.homeScore}-{game.awayScore}
                      </div>
                    ) : (
                      <div className={`px-3 sm:px-6 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[8px] sm:text-sm font-black uppercase tracking-widest ${
                        isSemiOrFinal 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-ng-navy border border-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse' 
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        VS
                      </div>
                    )}
                  </div>
                  
                  {/* Away Team */}
                  <div className="flex items-center justify-start gap-2 sm:gap-3 min-w-0">
                    <span className="text-sm sm:text-lg md:text-xl font-black italic shrink-0" style={{ color: getTeamColor(game.awayTeamId) }}>
                      {getTeamInitial(game.awayTeamId)}
                    </span>
                    <span className="text-white font-black text-left text-xs sm:text-base md:text-2xl uppercase italic leading-tight truncate sm:whitespace-normal">
                      {renderTeamName(game.awayTeamId)}
                    </span>
                  </div>
                </div>

                <div className="md:w-1/6 flex justify-end mt-2 md:mt-0 w-full md:w-auto">
                    {game.status === 'played' && gameRecaps[game.id] ? (
                      <button 
                        onClick={() => setSelectedGameId(game.id)} 
                        className={`text-[10px] sm:text-xs font-black uppercase tracking-widest border-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 w-full md:w-auto shadow-lg ${
                          isSemiOrFinal 
                            ? 'text-amber-400 border-amber-500/30 hover:bg-amber-500 hover:text-ng-navy hover:border-amber-500' 
                            : 'text-ng-light-blue border-ng-light-blue/30 hover:bg-ng-light-blue hover:text-ng-navy hover:border-ng-light-blue'
                        }`}
                      >
                        {t.schedule.viewRecap}
                      </button>
                    ) : game.status === 'played' ? (
                      <div className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-800 rounded-lg italic w-full md:w-auto text-center">Final Score Only</div>
                    ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-24 bg-ng-blue/10 rounded-3xl border border-dashed border-gray-700">
            <p className="text-gray-500 font-bold uppercase tracking-widest">No games found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
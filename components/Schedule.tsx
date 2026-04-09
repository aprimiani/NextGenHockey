import React, { useState, useMemo } from 'react';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Schedule: React.FC = () => {
  const { t, language } = useLanguage();
  const { schedule, teams, players, goalies, gameRecaps, loading } = useLeagueData();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'scheduled' | 'played'>('scheduled');

  const getTeamName = (id: string) => teams.find(t => t.id === id)?.name || t.schedule.unknown;
  const getTeamColor = (id: string) => teams.find(t => t.id === id)?.logoColor || '#ccc';
  const getTeamLogo = (id: string) => teams.find(t => t.id === id)?.logoUrl;

  const filteredGames = useMemo(() => {
    return schedule.filter(g => g.status === filter).sort((a, b) => {
      // For upcoming: show nearest first
      if (filter === 'scheduled') return new Date(a.date).getTime() - new Date(b.date).getTime();
      // For results: show most recent first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [schedule, filter]);

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

    const getPlayerName = (id: string) => players.find(p => p.id === id)?.name || id;
    const getGoalieName = (id: string) => goalies.find(g => g.id === id)?.name || id;

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
                          <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(game.homeTeamId) }}>{getTeamName(game.homeTeamId).substring(0, 1)}</span>
                          <div className="text-gray-400 text-sm font-bold uppercase">{getTeamName(game.homeTeamId)}</div>
                        </div>
                     </div>
                     <div className="text-gray-500 font-bold">VS</div>
                     <div className="text-center">
                        <div className="text-3xl font-bold text-white">{game.awayScore}</div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(game.awayTeamId) }}>{getTeamName(game.awayTeamId).substring(0, 1)}</span>
                          <div className="text-gray-400 text-sm font-bold uppercase">{getTeamName(game.awayTeamId)}</div>
                        </div>
                     </div>
                </div>
            </div>
            <div className="p-6 space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-ng-light-blue"></div> {t.schedule.scoringSummary}</h3>
                    <div className="space-y-3">
                        {selectedRecap.events.filter(e => e.type === 'goal').length > 0 ? selectedRecap.events.filter(e => e.type === 'goal').map(event => (
                            <div key={event.id} className="flex items-center justify-between bg-ng-navy/50 p-3 rounded border border-gray-700/50">
                                <div className="flex items-center space-x-3">
                                    <span className="text-ng-light-blue font-mono font-bold">{event.time}</span>
                                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{t.schedule.period} {event.period}</span>
                                    <span className="text-[9px] font-black italic shrink-0 mr-1.5" style={{ color: getTeamColor(event.teamId) }}>
                                        {getTeamName(event.teamId).substring(0, 1)}
                                    </span>
                                    <span className="text-white font-bold">{getPlayerName(event.player)}</span>
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                  <span className="text-gray-500 uppercase tracking-tighter text-[10px]">{t.schedule.assist}:</span> {event.assist ? getPlayerName(event.assist) : '-'}
                                  {event.assist2 && <span className="text-gray-600 mx-1">,</span>}
                                  {event.assist2 && getPlayerName(event.assist2)}
                                </div>
                            </div>
                        )) : <p className="text-gray-500 italic text-center py-4">{t.schedule.noEvents}</p>}
                    </div>
                </div>

                {selectedRecap.events.filter(e => e.type === 'penalty').length > 0 && (
                  <div>
                      <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-red-500"></div> {t.schedule.penaltySummary}</h3>
                      <div className="space-y-3">
                          {selectedRecap.events.filter(e => e.type === 'penalty').map(event => (
                              <div key={event.id} className="flex items-center justify-between bg-red-900/10 p-3 rounded border border-red-900/20">
                                  <div className="flex items-center space-x-3">
                                      <span className="text-red-400 font-mono font-bold">{event.time}</span>
                                      <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{t.schedule.period} {event.period}</span>
                                      <span className="text-[9px] font-black italic shrink-0 mr-1.5" style={{ color: getTeamColor(event.teamId) }}>
                                          {getTeamName(event.teamId).substring(0, 1)}
                                      </span>
                                      <span className="text-white font-bold">{getPlayerName(event.player)}</span>
                                  </div>
                                  <div className="text-xs text-gray-400 font-medium">
                                    <span className="text-red-500/50 uppercase tracking-tighter text-[10px] mr-2">{event.details}</span>
                                    <span className="bg-red-900/30 px-1.5 py-0.5 rounded text-[10px] text-red-400 font-bold">{event.penaltyMinutes} MIN</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                )}

                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-ng-light-blue"></div> {t.schedule.goalieStats}</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead><tr className="bg-ng-navy/30"><th className="px-4 py-2 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.schedule.team}</th><th className="px-4 py-2 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Goalie</th><th className="px-4 py-2 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.shotsAgainst}</th><th className="px-4 py-2 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.goalsAgainstShort}</th><th className="px-4 py-2 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Saves</th></tr></thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr className="hover:bg-white/5"><td className="px-4 py-3 text-sm font-bold text-gray-300">{getTeamName(game.homeTeamId)}</td><td className="px-4 py-3 text-sm font-bold text-white">{getGoalieName(selectedRecap.goalieStats.homeGoalie.playerId)}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.homeGoalie.shotsFaced}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.homeGoalie.goalsAgainst}</td><td className="px-4 py-3 text-sm text-center text-ng-light-blue font-mono font-bold">{selectedRecap.goalieStats.homeGoalie.saves}</td></tr>
                                <tr className="hover:bg-white/5"><td className="px-4 py-3 text-sm font-bold text-gray-300">{getTeamName(game.awayTeamId)}</td><td className="px-4 py-3 text-sm font-bold text-white">{getGoalieName(selectedRecap.goalieStats.awayGoalie.playerId)}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.awayGoalie.shotsFaced}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.awayGoalie.goalsAgainst}</td><td className="px-4 py-3 text-sm text-center text-ng-light-blue font-mono font-bold">{selectedRecap.goalieStats.awayGoalie.saves}</td></tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
            {t.schedule.title}
          </h2>
          <p className="text-ng-light-blue font-bold uppercase tracking-widest text-sm mt-3 pl-8">
            {t.schedule.seasonStart}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-ng-blue/50 p-1 rounded-2xl border border-gray-700 shadow-xl self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${filter === 'scheduled' ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            {t.schedule.filterUpcoming}
          </button>
          <button
            onClick={() => setFilter('played')}
            className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${filter === 'played' ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            {t.schedule.filterResults}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom duration-500">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.id} className="group bg-ng-blue/30 rounded-2xl border border-gray-700 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between hover:border-ng-light-blue/50 hover:bg-ng-blue/50 transition-all duration-300 shadow-lg">
              <div className="flex flex-col md:w-1/4 mb-4 md:mb-0 space-y-1 sm:space-y-2 w-full md:w-auto">
                <div className="flex items-center text-white font-black text-base sm:text-lg uppercase italic">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-ng-light-blue flex-shrink-0" />
                  <span>{formatDate(game.date)}</span>
                </div>
                {game.isPlayoff && (
                  <div className="flex items-center pl-6 sm:pl-8">
                    <span className="bg-ng-light-blue/20 text-ng-light-blue text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded border border-ng-light-blue/30 uppercase tracking-widest italic">Playoffs</span>
                  </div>
                )}
                <div className="flex items-center text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest pl-6 sm:pl-8"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />{game.time}</div>
                <div className="flex items-center text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest pl-6 sm:pl-8"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />{game.location}</div>
              </div>
              
              <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center w-full px-0 sm:px-4 my-4 md:my-0">
                {/* Home Team */}
                <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
                  <span className="text-white font-black text-right text-xs sm:text-base md:text-2xl uppercase italic leading-tight truncate sm:whitespace-normal">
                    {getTeamName(game.homeTeamId)}
                  </span>
                  <span className="text-sm sm:text-lg md:text-xl font-black italic shrink-0" style={{ color: getTeamColor(game.homeTeamId) }}>
                    {getTeamName(game.homeTeamId).substring(0, 1)}
                  </span>
                </div>
                
                {/* VS / Score */}
                <div className="px-2 sm:px-6 flex flex-col items-center shrink-0">
                  {game.status === 'played' ? (
                    <div className="bg-ng-navy px-2 sm:px-5 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-ng-light-blue/30 text-lg sm:text-3xl font-black text-white tracking-widest shadow-2xl group-hover:scale-110 transition-transform">
                      {game.homeScore}-{game.awayScore}
                    </div>
                  ) : (
                    <div className="bg-gray-800 px-3 sm:px-6 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-gray-700 text-[8px] sm:text-sm font-black text-gray-400 uppercase tracking-widest">
                      VS
                    </div>
                  )}
                </div>
                
                {/* Away Team */}
                <div className="flex items-center justify-start gap-2 sm:gap-3 min-w-0">
                  <span className="text-sm sm:text-lg md:text-xl font-black italic shrink-0" style={{ color: getTeamColor(game.awayTeamId) }}>
                    {getTeamName(game.awayTeamId).substring(0, 1)}
                  </span>
                  <span className="text-white font-black text-left text-xs sm:text-base md:text-2xl uppercase italic leading-tight truncate sm:whitespace-normal">
                    {getTeamName(game.awayTeamId)}
                  </span>
                </div>
              </div>

              <div className="md:w-1/6 flex justify-end mt-2 md:mt-0 w-full md:w-auto">
                  {game.status === 'played' && gameRecaps[game.id] ? (
                    <button onClick={() => setSelectedGameId(game.id)} className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-ng-light-blue border-2 border-ng-light-blue/30 hover:bg-ng-light-blue hover:text-ng-navy hover:border-ng-light-blue px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 w-full md:w-auto shadow-lg shadow-ng-light-blue/5">
                      {t.schedule.viewRecap}
                    </button>
                  ) : game.status === 'played' ? (
                    <div className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-800 rounded-lg italic w-full md:w-auto text-center">Final Score Only</div>
                  ) : null}
              </div>
            </div>
          ))
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
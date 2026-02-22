import React, { useState, useMemo } from 'react';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Schedule: React.FC = () => {
  const { t, language } = useLanguage();
  const { schedule, teams, gameRecaps, loading } = useLeagueData();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'scheduled' | 'played'>('scheduled');

  const getTeamName = (id: string) => teams.find(t => t.id === id)?.name || t.schedule.unknown;
  const getTeamColor = (id: string) => teams.find(t => t.id === id)?.logoColor || '#ccc';

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

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setSelectedGameId(null)} className="flex items-center text-ng-light-blue hover:text-white mb-6 transition-colors font-bold uppercase tracking-widest text-xs"><ArrowLeft className="mr-2" size={20} />{t.schedule.backToSchedule}</button>
        <div className="bg-ng-blue/30 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
            <div className="bg-ng-navy p-6 border-b border-gray-700 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{t.schedule.gameRecap}</h2>
                <div className="flex items-center justify-center space-x-8">
                     <div className="text-center"><div className="text-3xl font-bold text-white">{game.homeScore}</div><div className="text-gray-400 text-sm font-bold uppercase">{getTeamName(game.homeTeamId)}</div></div>
                     <div className="text-gray-500 font-bold">VS</div>
                     <div className="text-center"><div className="text-3xl font-bold text-white">{game.awayScore}</div><div className="text-gray-400 text-sm font-bold uppercase">{getTeamName(game.awayTeamId)}</div></div>
                </div>
            </div>
            <div className="p-6 space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-ng-light-blue"></div> {t.schedule.scoringSummary}</h3>
                    <div className="space-y-3">
                        {selectedRecap.events.length > 0 ? selectedRecap.events.map(event => (
                            <div key={event.id} className="flex items-center justify-between bg-ng-navy/50 p-3 rounded border border-gray-700/50">
                                <div className="flex items-center space-x-3"><span className="text-ng-light-blue font-mono font-bold">{event.time}</span><span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{t.schedule.period} {event.period}</span><div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: getTeamColor(event.teamId) }}></div><span className="text-white font-bold">{event.player}</span></div>
                                <div className="text-xs text-gray-400 font-medium"><span className="text-gray-500 uppercase tracking-tighter text-[10px]">{t.schedule.assist}:</span> {event.assist || '-'}</div>
                            </div>
                        )) : <p className="text-gray-500 italic text-center py-4">{t.schedule.noEvents}</p>}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 flex items-center gap-2"><div className="w-1.5 h-6 bg-ng-light-blue"></div> {t.schedule.goalieStats}</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead><tr className="bg-ng-navy/30"><th className="px-4 py-2 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.schedule.team}</th><th className="px-4 py-2 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Goalie</th><th className="px-4 py-2 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.shotsAgainst}</th><th className="px-4 py-2 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.standings.goalsAgainstShort}</th></tr></thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr className="hover:bg-white/5"><td className="px-4 py-3 text-sm font-bold text-gray-300">{getTeamName(game.homeTeamId)}</td><td className="px-4 py-3 text-sm font-bold text-white">{selectedRecap.goalieStats.homeGoalie.name}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.homeGoalie.shotsFaced}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.homeGoalie.goalsAgainst}</td></tr>
                                <tr className="hover:bg-white/5"><td className="px-4 py-3 text-sm font-bold text-gray-300">{getTeamName(game.awayTeamId)}</td><td className="px-4 py-3 text-sm font-bold text-white">{selectedRecap.goalieStats.awayGoalie.name}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.awayGoalie.shotsFaced}</td><td className="px-4 py-3 text-sm text-center text-gray-300 font-mono">{selectedRecap.goalieStats.awayGoalie.goalsAgainst}</td></tr>
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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter border-l-8 border-ng-light-blue pl-6">
            {t.schedule.title}
          </h2>
          <p className="text-ng-light-blue font-bold uppercase tracking-widest text-sm mt-2 pl-6">
            {t.schedule.seasonStart}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-ng-blue/50 p-1.5 rounded-2xl border border-gray-700 shadow-xl self-start md:self-auto">
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === 'scheduled' ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            {t.schedule.filterUpcoming}
          </button>
          <button
            onClick={() => setFilter('played')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === 'played' ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            {t.schedule.filterResults}
          </button>
        </div>
      </div>

      <div className="grid gap-6 animate-in fade-in slide-in-from-bottom duration-500">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.id} className="group bg-ng-blue/30 rounded-2xl border border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between hover:border-ng-light-blue/50 hover:bg-ng-blue/50 transition-all duration-300 shadow-lg">
              <div className="flex flex-col md:w-1/4 mb-4 md:mb-0 space-y-2">
                <div className="flex items-center text-white font-black text-lg uppercase italic">
                  <Calendar className="w-5 h-5 mr-3 text-ng-light-blue flex-shrink-0" />
                  <span>{formatDate(game.date)}</span>
                </div>
                {game.isPlayoff && (
                  <div className="flex items-center pl-8">
                    <span className="bg-ng-light-blue/20 text-ng-light-blue text-[10px] font-black px-2 py-0.5 rounded border border-ng-light-blue/30 uppercase tracking-widest italic">Playoffs</span>
                  </div>
                )}
                <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-widest pl-8"><Clock className="w-4 h-4 mr-2" />{game.time}</div>
                <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-widest pl-8"><MapPin className="w-4 h-4 mr-2" />{game.location}</div>
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full px-4">
                <div className="flex items-center justify-end w-2/5 space-x-3">
                  <span className="text-white font-black text-right md:text-2xl uppercase italic tracking-tighter truncate max-w-[120px] md:max-w-none">
                    {getTeamName(game.homeTeamId)}
                  </span>
                  <div className="w-4 h-4 rounded-full shadow-lg ring-1 ring-white/10 shrink-0" style={{ backgroundColor: getTeamColor(game.homeTeamId) }}></div>
                </div>
                
                <div className="px-6 flex flex-col items-center">
                  {game.status === 'played' ? (
                    <div className="bg-ng-navy px-5 py-2 rounded-xl border border-ng-light-blue/30 text-3xl font-black text-white tracking-widest shadow-2xl group-hover:scale-110 transition-transform">
                      {game.homeScore}-{game.awayScore}
                    </div>
                  ) : (
                    <div className="bg-gray-800 px-6 py-2 rounded-xl border border-gray-700 text-sm font-black text-gray-400 uppercase tracking-widest">
                      VS
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-start w-2/5 space-x-3">
                  <div className="w-4 h-4 rounded-full shadow-lg ring-1 ring-white/10 shrink-0" style={{ backgroundColor: getTeamColor(game.awayTeamId) }}></div>
                  <span className="text-white font-black text-left md:text-2xl uppercase italic tracking-tighter truncate max-w-[120px] md:max-w-none">
                    {getTeamName(game.awayTeamId)}
                  </span>
                </div>
              </div>

              <div className="md:w-1/6 flex justify-end mt-6 md:mt-0">
                  {game.status === 'played' && gameRecaps[game.id] ? (
                    <button onClick={() => setSelectedGameId(game.id)} className="text-xs font-black uppercase tracking-widest text-ng-light-blue border-2 border-ng-light-blue/30 hover:bg-ng-light-blue hover:text-ng-navy hover:border-ng-light-blue px-6 py-3 rounded-xl transition-all duration-300 w-full md:w-auto shadow-lg shadow-ng-light-blue/5">
                      {t.schedule.viewRecap}
                    </button>
                  ) : game.status === 'played' ? (
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 py-2 border border-gray-800 rounded-lg italic">Final Score Only</div>
                  ) : (
                    <div className="text-[10px] font-black text-ng-light-blue uppercase tracking-widest px-4 py-2 bg-ng-light-blue/10 border border-ng-light-blue/20 rounded-lg italic">Registration Open</div>
                  )}
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
import React, { useState } from 'react';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Schedule: React.FC = () => {
  const { t, language } = useLanguage();
  const { schedule, teams, gameRecaps, loading } = useLeagueData();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const getTeamName = (id: string) => teams.find(t => t.id === id)?.name || t.schedule.unknown;
  const getTeamColor = (id: string) => teams.find(t => t.id === id)?.logoColor || '#ccc';

  const selectedRecap = selectedGameId ? gameRecaps[selectedGameId] : null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T12:00:00');
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-US', options);
    } catch (e) { return dateString; }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ng-light-blue"></div></div>;

  if (selectedGameId && selectedRecap) {
    const game = schedule.find(g => g.id === selectedGameId);
    if (!game) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setSelectedGameId(null)} className="flex items-center text-ng-light-blue hover:text-white mb-6 transition-colors"><ArrowLeft className="mr-2" size={20} />{t.schedule.backToSchedule}</button>
        <div className="bg-ng-blue/30 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
            <div className="bg-ng-navy p-6 border-b border-gray-700 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{t.schedule.gameRecap}</h2>
                <div className="flex items-center justify-center space-x-8">
                     <div className="text-center"><div className="text-3xl font-bold text-white">{game.homeScore}</div><div className="text-gray-400 text-sm">{getTeamName(game.homeTeamId)}</div></div>
                     <div className="text-gray-500 font-bold">VS</div>
                     <div className="text-center"><div className="text-3xl font-bold text-white">{game.awayScore}</div><div className="text-gray-400 text-sm">{getTeamName(game.awayTeamId)}</div></div>
                </div>
            </div>
            <div className="p-6 space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">{t.schedule.scoringSummary}</h3>
                    <div className="space-y-3">
                        {selectedRecap.events.length > 0 ? selectedRecap.events.map(event => (
                            <div key={event.id} className="flex items-center justify-between bg-ng-navy/50 p-3 rounded">
                                <div className="flex items-center space-x-3"><span className="text-ng-light-blue font-mono font-bold">{event.time}</span><span className="text-gray-500 text-xs uppercase">{t.schedule.period} {event.period}</span><div className="w-2 h-2 rounded-full" style={{ backgroundColor: getTeamColor(event.teamId) }}></div><span className="text-white font-medium">{event.player}</span></div>
                                <div className="text-sm text-gray-400"><span className="text-gray-500">{t.schedule.assist}:</span> {event.assist}</div>
                            </div>
                        )) : <p className="text-gray-500 italic">{t.schedule.noEvents}</p>}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">{t.schedule.goalieStats}</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">{t.schedule.team}</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Goalie</th><th className="px-4 py-2 text-center text-xs font-medium text-gray-400 uppercase">{t.standings.shotsAgainst}</th><th className="px-4 py-2 text-center text-xs font-medium text-gray-400 uppercase">{t.standings.goalsAgainstShort}</th></tr></thead>
                            <tbody className="divide-y divide-gray-700">
                                <tr><td className="px-4 py-3 text-sm text-gray-300">{getTeamName(game.homeTeamId)}</td><td className="px-4 py-3 text-sm font-bold text-white">{selectedRecap.goalieStats.homeGoalie.name}</td><td className="px-4 py-3 text-sm text-center text-gray-300">{selectedRecap.goalieStats.homeGoalie.shotsFaced}</td><td className="px-4 py-3 text-sm text-center text-gray-300">{selectedRecap.goalieStats.homeGoalie.goalsAgainst}</td></tr>
                                <tr><td className="px-4 py-3 text-sm text-gray-300">{getTeamName(game.awayTeamId)}</td><td className="px-4 py-3 text-sm font-bold text-white">{selectedRecap.goalieStats.awayGoalie.name}</td><td className="px-4 py-3 text-sm text-center text-gray-300">{selectedRecap.goalieStats.awayGoalie.shotsFaced}</td><td className="px-4 py-3 text-sm text-center text-gray-300">{selectedRecap.goalieStats.awayGoalie.goalsAgainst}</td></tr>
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
      <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-extrabold text-white border-l-4 border-ng-light-blue pl-4">{t.schedule.title}</h2></div>
      <div className="grid gap-6">
        {schedule.map((game) => (
          <div key={game.id} className="bg-ng-blue/30 rounded-lg border border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between hover:border-ng-light-blue/50 transition-colors">
            <div className="flex flex-col md:w-1/4 mb-4 md:mb-0 space-y-2">
              <div className="flex items-center text-white font-bold text-lg"><Calendar className="w-5 h-5 mr-2 text-ng-light-blue flex-shrink-0" /><span className="capitalize">{formatDate(game.date)}</span></div>
              <div className="flex items-center text-gray-400 text-sm"><Clock className="w-4 h-4 mr-2" />{game.time}</div>
              <div className="flex items-center text-gray-400 text-sm"><MapPin className="w-4 h-4 mr-2" />{game.location}</div>
            </div>
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="flex items-center justify-end w-2/5 space-x-3"><span className="text-white font-bold text-right md:text-xl">{getTeamName(game.homeTeamId)}</span><div className="w-4 h-4 rounded-full" style={{ backgroundColor: getTeamColor(game.homeTeamId) }}></div></div>
              <div className="px-6 flex flex-col items-center">
                {game.status === 'played' ? <div className="bg-ng-navy px-4 py-2 rounded border border-gray-700 text-2xl font-mono text-white tracking-widest">{game.homeScore}-{game.awayScore}</div> : <span className="text-gray-500 font-bold uppercase tracking-wider text-sm bg-gray-800 px-3 py-1 rounded-full">VS</span>}
                <span className="text-xs text-gray-500 mt-1 uppercase">{game.status === 'played' ? t.schedule.played : t.schedule.scheduled}</span>
              </div>
              <div className="flex items-center justify-start w-2/5 space-x-3"><div className="w-4 h-4 rounded-full" style={{ backgroundColor: getTeamColor(game.awayTeamId) }}></div><span className="text-white font-bold text-left md:text-xl">{getTeamName(game.awayTeamId)}</span></div>
            </div>
            <div className="md:w-1/6 flex justify-end mt-4 md:mt-0">
                {game.status === 'played' && gameRecaps[game.id] && (
                 <button onClick={() => setSelectedGameId(game.id)} className="text-sm text-ng-light-blue border border-ng-light-blue hover:bg-ng-light-blue hover:text-ng-navy px-4 py-2 rounded transition-colors w-full md:w-auto">{t.schedule.viewRecap}</button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Filter, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_SCHEDULE, SOCCER_CURRENT_SEASON } from '../../soccerData';

export const SoccerSchedule: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  const filteredMatches = React.useMemo(() => {
    return SOCCER_SCHEDULE.filter(m => {
      const matchTab = activeTab === 'upcoming' ? m.status === 'upcoming' : m.status === 'completed';
      const matchWeek = selectedWeek === 'all' || m.week === selectedWeek;
      return matchTab && matchWeek;
    });
  }, [activeTab, selectedWeek]);

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-3">
            {isFr ? 'Calendrier Officiel' : 'Official Schedule'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight font-display mb-3">
            {isFr ? 'HORAIRES & RENCONTRES' : 'FIXTURES & SCHEDULE'}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            {isFr
              ? `Consultez les dates et heures de tous les matchs disputés sur le terrain synthétique au ${SOCCER_CURRENT_SEASON.location}.`
              : `View dates and kickoff times for all matches played on the synthetic turf at ${SOCCER_CURRENT_SEASON.location}.`}
          </p>
        </div>

        {SOCCER_SCHEDULE.length === 0 ? (
          /* Empty / Unconfirmed Schedule State */
          <div className="space-y-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
                  <AlertCircle size={14} />
                  <span>{isFr ? 'En attente de confirmation' : 'Pending Confirmation'}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black uppercase italic font-display text-white mb-4">
                  {isFr
                    ? 'Aucun horaire confirmé pour le moment'
                    : 'No schedule confirmed yet'}
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  {isFr
                    ? 'Les dates de matchs, les heures de coup d’envoi et les affiches des équipes ne sont pas encore confirmées. La programmation officielle sera annoncée et publiée une fois les inscriptions complétées et les divisions établies.'
                    : 'Match dates, kickoff times, and team fixtures are not yet confirmed. The official schedule will be announced and published once registration closes and divisions are finalized.'}
                </p>

                {/* Confirmed Venue Card */}
                <div className="p-6 rounded-2xl bg-black/60 border border-lime-500/30 mb-8 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-lime-400 mb-2">
                    <MapPin size={16} />
                    <span>{isFr ? 'Lieu officiel confirmé' : 'Confirmed Official Venue'}</span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase italic">
                    {SOCCER_CURRENT_SEASON.location}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {SOCCER_CURRENT_SEASON.address}
                  </p>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider mt-2">
                    {isFr ? SOCCER_CURRENT_SEASON.formatFr : SOCCER_CURRENT_SEASON.formatEn}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    to="/register?sport=soccer"
                    className="px-8 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-all text-center"
                  >
                    <span>{isFr ? 'Inscrire une équipe ou joueur' : 'Register a team or player'}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to="/soccer/reglements"
                    className="px-8 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <ShieldCheck size={16} className="text-lime-400" />
                    <span>{isFr ? 'Règlements de la ligue' : 'League Rules'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Controls: Tabs & Week filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
              {/* Upcoming vs Completed */}
              <div className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'upcoming'
                      ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isFr ? 'Matchs à Venir' : 'Upcoming Matches'}
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'completed'
                      ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isFr ? 'Matchs Complétés' : 'Completed Matches'}
                </button>
              </div>

              {/* Week Filter */}
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-lime-400" />
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  aria-label={isFr ? 'Filtrer par semaine' : 'Filter by week'}
                  className="bg-zinc-900 border border-zinc-700 text-gray-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-lime-400"
                >
                  <option value="all">{isFr ? 'Toutes les semaines' : 'All Weeks'}</option>
                  <option value={1}>{isFr ? 'Semaine 1' : 'Week 1'}</option>
                  <option value={2}>{isFr ? 'Semaine 2' : 'Week 2'}</option>
                </select>
              </div>
            </div>

            {/* Schedule List */}
            {filteredMatches.length > 0 ? (
              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-lime-500/40 transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-md"
                  >
                    {/* Date / Time */}
                    <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 md:pr-6 min-w-[200px]">
                      <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
                        <Calendar size={22} />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-lime-400">
                          {isFr ? `Semaine ${match.week}` : `Week ${match.week}`}
                        </div>
                        <div className="text-base font-black text-white">{match.date}</div>
                        <div className="text-xs font-semibold text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock size={12} />
                          <span>{match.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Matchup */}
                    <div className="flex-grow grid grid-cols-5 items-center text-center">
                      <div className="col-span-2 text-left md:text-right">
                        <span className="text-base sm:text-lg font-black uppercase italic text-white block">
                          {match.homeTeamName}
                        </span>
                        <span className="text-[11px] text-zinc-500 uppercase tracking-widest block">
                          {isFr ? 'Domicile' : 'Home'}
                        </span>
                      </div>

                      <div className="col-span-1 flex flex-col items-center justify-center">
                        {match.status === 'completed' ? (
                          <span className="text-lg font-mono font-black text-lime-400">
                            {match.homeScore} - {match.awayScore}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-zinc-800 text-zinc-400">
                            VS
                          </span>
                        )}
                      </div>

                      <div className="col-span-2 text-right md:text-left">
                        <span className="text-base sm:text-lg font-black uppercase italic text-white block">
                          {match.awayTeamName}
                        </span>
                        <span className="text-[11px] text-zinc-500 uppercase tracking-widest block">
                          {isFr ? 'Visiteur' : 'Away'}
                        </span>
                      </div>
                    </div>

                    {/* Pitch info & Status */}
                    <div className="border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6 flex items-center justify-between md:flex-col md:items-end gap-2 text-xs min-w-[180px]">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <MapPin size={13} className="text-lime-400" />
                        <span>{match.pitch}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-gray-300">
                        {match.status === 'completed'
                          ? (isFr ? 'Terminé' : 'Final')
                          : (isFr ? 'Programmé' : 'Scheduled')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 text-gray-400">
                <p className="text-base font-bold text-gray-300 mb-2">
                  {isFr ? 'Aucun match trouvé pour ce filtre.' : 'No matches found for this filter.'}
                </p>
                <p className="text-xs">
                  {isFr
                    ? 'Les résultats apparaîtront ici une fois les parties complétées.'
                    : 'Match results will appear here once games have concluded.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

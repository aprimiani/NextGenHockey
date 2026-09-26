import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Filter, ArrowRight, ShieldCheck, AlertCircle, Users, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_SCHEDULE, SOCCER_CURRENT_SEASON, SOCCER_TEAMS } from '../../soccerData';
import { SEO } from '../SEO';

export const SoccerSchedule: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  const teamColors = React.useMemo(() => {
    return SOCCER_TEAMS.reduce((acc, t) => {
      acc[t.id] = t.color;
      return acc;
    }, {} as Record<string, string>);
  }, []);

  const availableWeeks = React.useMemo(() => {
    return Array.from(new Set(SOCCER_SCHEDULE.map(m => m.week))).sort((a, b) => a - b);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(isFr ? 'fr-CA' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const filteredMatches = React.useMemo(() => {
    return SOCCER_SCHEDULE.filter(m => {
      const matchTab = activeTab === 'upcoming' ? m.status === 'upcoming' : m.status === 'completed';
      const matchTeam = selectedTeam === 'all' || m.homeTeamId === selectedTeam || m.awayTeamId === selectedTeam;
      const matchWeek = selectedWeek === 'all' || m.week === selectedWeek;
      return matchTab && matchTeam && matchWeek;
    });
  }, [activeTab, selectedTeam, selectedWeek]);

  const activeTeamObj = React.useMemo(() => {
    return SOCCER_TEAMS.find(t => t.id === selectedTeam);
  }, [selectedTeam]);

  const renderTeamName = (name: string, isHighlighted: boolean, align: 'left' | 'right') => {
    const words = name.split(' ');
    return (
      <div
        className={`font-black uppercase italic tracking-tight leading-[1.05] sm:leading-tight flex flex-col ${
          align === 'left' ? 'items-start md:items-end text-left md:text-right' : 'items-end md:items-start text-right md:text-left'
        } ${
          isHighlighted
            ? 'text-lime-300 underline decoration-lime-400 decoration-2 underline-offset-4'
            : 'text-white'
        }`}
      >
        {/* Mobile: bold prominent stacked words */}
        <div className={`md:hidden flex flex-col ${align === 'left' ? 'items-start text-left' : 'items-end text-right'}`}>
          {words.map((word, idx) => (
            <span key={idx} className="block text-base sm:text-lg leading-[1.1] font-black">
              {word}
            </span>
          ))}
        </div>

        {/* Tablet & Desktop: large single line display */}
        <span className="hidden md:inline text-base lg:text-lg font-black whitespace-nowrap">
          {name}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-12">
      <SEO
        title={isFr ? 'Calendrier des rencontres | Next Gen Soccer Montréal' : 'Match Schedule & Results | Next Gen Soccer Montreal'}
        description={isFr ? 'Consultez l\'horaire officiel des matchs de soccer 7v7, terrains et résultats au Complexe Sportif Delson | Sainte-Catherine pour Next Gen Soccer.' : 'Follow the 7v7 soccer match schedule, pitch assignments, and live results at Complexe Sportif Delson | Sainte-Catherine for Next Gen Soccer.'}
        canonical="https://nxtgnsports.ca/soccer/calendrier"
        ogType="website"
      />
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
            {/* Controls: Tabs, Team Filter & Week filter */}
            <div className="space-y-4 mb-8">
              {/* Quick Team Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5 mr-1">
                  <Users size={14} className="text-lime-400" />
                  <span>{isFr ? 'Filtrer par équipe :' : 'Filter by team:'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTeam('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    selectedTeam === 'all'
                      ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/20'
                      : 'bg-zinc-900 text-gray-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {isFr ? 'Toutes les équipes' : 'All Teams'}
                </button>
                {SOCCER_TEAMS.map((team) => {
                  const isSelected = selectedTeam === team.id;
                  return (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => setSelectedTeam(team.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-zinc-950 font-black shadow-lg ring-2 ring-lime-400 scale-[1.02]'
                          : 'bg-zinc-900 text-gray-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: team.color }}
                      />
                      <span>{team.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Controls Row */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800/80">
                {/* Upcoming vs Completed */}
                <div className="flex items-center gap-2 bg-zinc-950/80 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'upcoming'
                        ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isFr ? 'Matchs à Venir' : 'Upcoming Matches'}
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'completed'
                        ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isFr ? 'Matchs Complétés' : 'Completed Matches'}
                  </button>
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Team Dropdown */}
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-lime-400 shrink-0" />
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      aria-label={isFr ? 'Filtrer par équipe' : 'Filter by team'}
                      className="bg-zinc-950 border border-zinc-700 text-gray-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-lime-400 cursor-pointer"
                    >
                      <option value="all">{isFr ? 'Toutes les équipes' : 'All Teams'}</option>
                      {SOCCER_TEAMS.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Week Filter */}
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-lime-400 shrink-0" />
                    <select
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                      aria-label={isFr ? 'Filtrer par semaine' : 'Filter by week'}
                      className="bg-zinc-950 border border-zinc-700 text-gray-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-lime-400 cursor-pointer"
                    >
                      <option value="all">{isFr ? 'Toutes les semaines' : 'All Weeks'}</option>
                      {availableWeeks.map((w) => (
                        <option key={w} value={w}>
                          {isFr ? `Semaine ${w}` : `Week ${w}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reset Filters button */}
                  {(selectedTeam !== 'all' || selectedWeek !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTeam('all');
                        setSelectedWeek('all');
                      }}
                      className="px-3 py-2 text-xs font-bold text-gray-300 hover:text-white rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer"
                      title={isFr ? 'Réinitialiser les filtres' : 'Reset filters'}
                    >
                      <RotateCcw size={12} className="text-lime-400" />
                      <span>{isFr ? 'Effacer filtres' : 'Reset'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filter Notice */}
              {activeTeamObj && (
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-lime-500/10 border border-lime-500/20 text-xs text-lime-300">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: activeTeamObj.color }}
                    />
                    <span>
                      {isFr
                        ? `Affichage des matchs pour : `
                        : `Showing matches for: `}
                      <strong className="text-white font-black">{activeTeamObj.name}</strong>
                      <span className="text-lime-400/80 ml-2">
                        ({filteredMatches.length} {isFr ? (filteredMatches.length > 1 ? 'matchs trouvés' : 'match trouvé') : (filteredMatches.length > 1 ? 'matches found' : 'match found')})
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTeam('all')}
                    className="text-xs text-lime-400 hover:text-white underline cursor-pointer font-bold ml-4"
                  >
                    {isFr ? 'Voir toutes les équipes' : 'Show all teams'}
                  </button>
                </div>
              )}
            </div>

            {/* Schedule List */}
            {filteredMatches.length > 0 ? (
              <div className="space-y-4">
                {filteredMatches.map((match) => {
                  const isHomeMatch = selectedTeam === match.homeTeamId;
                  const isAwayMatch = selectedTeam === match.awayTeamId;

                  return (
                    <div
                      key={match.id}
                      className={`p-4 sm:p-6 rounded-2xl bg-zinc-900/70 border transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 shadow-md ${
                        selectedTeam !== 'all' && (isHomeMatch || isAwayMatch)
                          ? 'border-lime-500/60 ring-1 ring-lime-500/30 bg-zinc-900/90'
                          : 'border-zinc-800 hover:border-lime-500/40'
                      }`}
                    >
                      {/* Date / Time */}
                      <div className="flex items-center gap-3 sm:gap-4 border-b md:border-b-0 md:border-r border-zinc-800 pb-3 md:pb-0 md:pr-6 min-w-[190px]">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
                          <Calendar size={20} className="sm:hidden" />
                          <Calendar size={22} className="hidden sm:block" />
                        </div>
                        <div>
                          <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-lime-400">
                            {isFr ? `Semaine ${match.week}` : `Week ${match.week}`}
                          </div>
                          <div className="text-sm sm:text-base font-black text-white">{formatDate(match.date)}</div>
                          <div className="text-xs font-semibold text-gray-400 flex items-center gap-1 mt-0.5">
                            <Clock size={12} />
                            <span>{match.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Matchup */}
                      <div className="flex-grow grid grid-cols-[1fr_auto_1fr] sm:grid-cols-5 items-center gap-2 sm:gap-4 text-center">
                        <div className="col-span-1 sm:col-span-2 text-left md:text-right min-w-0">
                          <div className="flex items-start gap-1.5 sm:gap-2 md:justify-end">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shrink-0 mt-1 md:hidden"
                              style={{ backgroundColor: teamColors[match.homeTeamId] || '#0284c7' }}
                            />
                            {renderTeamName(match.homeTeamName, isHomeMatch, 'left')}
                            <span
                              className="w-2.5 h-2.5 rounded-full hidden md:inline-block shrink-0 md:mt-1.5"
                              style={{ backgroundColor: teamColors[match.homeTeamId] || '#0284c7' }}
                            />
                          </div>
                          <span className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest block mt-1">
                            {isFr ? 'Domicile' : 'Home'}
                          </span>
                        </div>

                        <div className="col-span-1 flex flex-col items-center justify-center shrink-0 px-1 sm:px-2">
                          {match.status === 'completed' ? (
                            <span className="text-base sm:text-lg font-mono font-black text-lime-400">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-widest bg-zinc-800 text-zinc-400">
                              VS
                            </span>
                          )}
                        </div>

                        <div className="col-span-1 sm:col-span-2 text-right md:text-left min-w-0">
                          <div className="flex items-start gap-1.5 sm:gap-2 justify-end md:justify-start">
                            <span
                              className="w-2.5 h-2.5 rounded-full hidden md:inline-block shrink-0 md:mt-1.5"
                              style={{ backgroundColor: teamColors[match.awayTeamId] || '#8b5cf6' }}
                            />
                            {renderTeamName(match.awayTeamName, isAwayMatch, 'right')}
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shrink-0 mt-1 md:hidden"
                              style={{ backgroundColor: teamColors[match.awayTeamId] || '#8b5cf6' }}
                            />
                          </div>
                          <span className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest block mt-1">
                            {isFr ? 'Visiteur' : 'Away'}
                          </span>
                        </div>
                      </div>

                      {/* Pitch info & Status */}
                      <div className="border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-6 flex items-center justify-between md:flex-col md:items-end gap-2 text-xs min-w-[170px]">
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
                  );
                })}
              </div>
            ) : (
              <div className="p-16 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 text-gray-400">
                <p className="text-base font-bold text-gray-300 mb-2">
                  {selectedTeam !== 'all'
                    ? (isFr
                        ? `Aucun match trouvé pour ${activeTeamObj?.name || 'cette équipe'}.`
                        : `No matches found for ${activeTeamObj?.name || 'this team'}.`)
                    : (isFr ? 'Aucun match trouvé pour ce filtre.' : 'No matches found for this filter.')}
                </p>
                <p className="text-xs mb-4">
                  {isFr
                    ? 'Essayez de changer les filtres ou de réinitialiser la sélection.'
                    : 'Try changing your filters or resetting the selection.'}
                </p>
                {(selectedTeam !== 'all' || selectedWeek !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTeam('all');
                      setSelectedWeek('all');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-lime-400 text-zinc-950 hover:bg-lime-300 transition-all cursor-pointer shadow-md"
                  >
                    <RotateCcw size={12} />
                    <span>{isFr ? 'Afficher tous les matchs' : 'Show all matches'}</span>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

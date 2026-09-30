import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, User, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_TEAMS, SOCCER_ROSTERS } from '../../soccerData';
import { SEO } from '../SEO';

export const SoccerLineups: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('all');
  const [playerSearch, setPlayerSearch] = useState<string>('');

  const getTeamDotStyle = (teamId: string): React.CSSProperties => {
    const team = SOCCER_TEAMS.find(t => t.id === teamId);
    if (!team) return { backgroundColor: '#22c55e' };
    if (team.secondaryColor) {
      return {
        background: `linear-gradient(135deg, ${team.color} 50%, ${team.secondaryColor} 50%)`,
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3)'
      };
    }
    return {
      backgroundColor: team.color,
      boxShadow: team.color.toLowerCase() === '#ffffff'
        ? '0 0 0 1px rgba(161, 161, 170, 0.8)'
        : '0 0 0 1px rgba(255, 255, 255, 0.2)'
    };
  };

  const displayedTeams = React.useMemo(() => {
    if (selectedTeamFilter === 'all') {
      return SOCCER_TEAMS;
    }
    return SOCCER_TEAMS.filter(t => t.id === selectedTeamFilter);
  }, [selectedTeamFilter]);

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-10 sm:py-12 overflow-x-hidden max-w-full w-full">
      <SEO
        title={isFr ? 'Alignements des Équipes | Next Gen Soccer Rive-Sud' : 'Team Lineups | Next Gen Soccer South Shore'}
        description={isFr ? 'Consultez la composition officielle des équipes et la liste complète des joueurs inscrits pour la saison de soccer 7v7 au Complexe Sportif Delson.' : 'View official team squads and complete registered player rosters for the 7v7 soccer league at Complexe Sportif Delson.'}
        canonical="https://nxtgnsports.ca/soccer/alignements"
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-3">
            {isFr ? 'Effectifs Officiels' : 'Official Rosters'}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight font-display mb-3">
            {isFr ? 'ALIGNEMENTS DES ÉQUIPES' : 'TEAM LINEUPS'}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            {isFr
              ? 'Consultez la composition officielle de chaque équipe pour la saison 7v7 au Complexe Sportif Delson.'
              : 'Browse the official squad lineups and registered player lists for the 7v7 season at Complexe Sportif Delson.'}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-900/70 p-3 sm:p-4 rounded-2xl border border-zinc-800 mb-8 max-w-full overflow-hidden">
          {/* Team Filter Pills (NO PLAYER COUNTS) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <button
              type="button"
              onClick={() => setSelectedTeamFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedTeamFilter === 'all'
                  ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/20'
                  : 'bg-zinc-950 text-gray-300 hover:text-white border border-zinc-800'
              }`}
            >
              {isFr ? 'Toutes les équipes' : 'All Teams'}
            </button>
            {SOCCER_TEAMS.map((team) => {
              const isSelected = selectedTeamFilter === team.id;
              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setSelectedTeamFilter(team.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-zinc-950 font-black shadow-lg ring-2 ring-lime-400'
                      : 'bg-zinc-950 text-gray-300 hover:text-white border border-zinc-800'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={getTeamDotStyle(team.id)} />
                  <span>{team.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Player Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={playerSearch}
              onChange={(e) => setPlayerSearch(e.target.value)}
              placeholder={isFr ? 'Rechercher un joueur...' : 'Search a player...'}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-lime-400"
            />
          </div>
        </div>

        {/* Team Rosters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-full">
          {displayedTeams.map((team) => {
            const roster = SOCCER_ROSTERS[team.id] || [];
            const filteredRoster = roster.filter(player =>
              player.name.toLowerCase().includes(playerSearch.toLowerCase())
            );

            return (
              <div
                key={team.id}
                className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:border-lime-500/30 transition-all w-full max-w-full"
              >
                {/* Team Header (NO PLAYER COUNT) */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-zinc-950 to-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0"
                      style={getTeamDotStyle(team.id)}
                    />
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase italic tracking-tight text-white leading-tight break-words">
                        {team.name}
                      </h2>
                      <span className="text-[10px] sm:text-[11px] font-bold text-lime-400 uppercase tracking-wider block mt-0.5">
                        {team.division}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Player List (NO NUMBERS, FULL NAMES READABLE & NEVER TRUNCATED) */}
                <div className="p-4 sm:p-5 flex-grow">
                  {filteredRoster.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredRoster.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-lime-500/40 hover:bg-zinc-800/50 transition-all group min-w-0"
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:text-lime-400 transition-colors shrink-0">
                            <User size={14} className="sm:hidden" />
                            <User size={15} className="hidden sm:block" />
                          </div>
                          <div className="min-w-0 flex-grow">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-lime-300 transition-colors leading-snug break-words">
                                {player.name}
                              </span>
                              {(player.name === 'Alessandro Primiani' || player.name === 'Meagan Boutler') && (
                                <span className="inline-block text-lime-400 font-bold px-1.5 py-0.2 rounded bg-lime-500/10 border border-lime-500/20 text-[8px] sm:text-[9px] uppercase tracking-wider">
                                  {isFr ? '2 Équipes' : 'Dual Team'}
                                </span>
                              )}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-zinc-500 font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle2 size={10} className="text-lime-400 shrink-0" />
                              <span className="truncate">
                                {(player.name === 'Alessandro Primiani' || player.name === 'Meagan Boutler')
                                  ? (isFr ? 'Inscrit officiel • Faah & Blackjacks' : 'Official Roster • Faah & Blackjacks')
                                  : (isFr ? 'Inscrit officiel' : 'Official Roster')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-400">
                      <p className="text-xs">
                        {playerSearch
                          ? (isFr ? 'Aucun joueur trouvé pour cette recherche.' : 'No players found matching your search.')
                          : (isFr ? 'Alignement en cours de finalisation.' : 'Lineup being finalized.')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Team 4 note if roster incomplete */}
                {team.id === 's_team_4' && roster.length < 7 && (
                  <div className="px-4 py-2.5 bg-lime-500/5 border-t border-zinc-800/80 text-[11px] text-lime-400/90 flex items-center justify-between">
                    <span>{isFr ? 'Places disponibles pour compléter l’alignement' : 'Additional roster spots available'}</span>
                    <Link to="/register?sport=soccer" className="font-bold underline hover:text-white shrink-0 ml-2">
                      {isFr ? 'S’inscrire' : 'Join team'}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Link to Standings & Player Stats */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase italic text-white">
                {isFr ? 'Classements & Statistiques des Joueurs' : 'Standings & Player Statistics'}
              </h3>
              <p className="text-xs text-gray-400">
                {isFr
                  ? 'Consultez les résultats, fiches d’équipes et le classement individuel des marqueurs.'
                  : 'Check team standings, win-loss records, and player scoring leaderboards.'}
              </p>
            </div>
          </div>

          <Link
            to="/soccer/statistiques"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-md shadow-lime-500/20 transition-all shrink-0"
          >
            <span>{isFr ? 'Voir le Classement & Stats' : 'View Standings & Stats'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

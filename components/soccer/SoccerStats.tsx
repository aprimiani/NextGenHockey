import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, Search, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_STANDINGS, SOCCER_PLAYER_STATS, SOCCER_TEAMS } from '../../soccerData';
import { SEO } from '../SEO';

export const SoccerStats: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Exactly ONE tab control for Standings & Player Statistics
  const [activeTab, setActiveTab] = useState<'standings' | 'players'>('standings');
  const [playerSearch, setPlayerSearch] = useState<string>('');

  // Sorted Standings
  const sortedStandings = React.useMemo(() => {
    return [...SOCCER_STANDINGS].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });
  }, []);

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

  // Filtered player stats
  const filteredPlayers = React.useMemo(() => {
    if (!playerSearch) return SOCCER_PLAYER_STATS;
    const q = playerSearch.toLowerCase();
    return SOCCER_PLAYER_STATS.filter(p =>
      p.name.toLowerCase().includes(q) || p.teamName.toLowerCase().includes(q)
    );
  }, [playerSearch]);

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-10 sm:py-12 overflow-x-hidden max-w-full w-full">
      <SEO
        title={isFr ? 'Classement & Statistiques des Joueurs | Next Gen Soccer Rive-Sud' : 'Standings & Player Statistics | Next Gen Soccer South Shore'}
        description={isFr ? 'Classement officiel de la ligue de soccer 7v7, fiche des équipes et statistiques individuelles des joueurs au Complexe Sportif Delson.' : 'Official 7v7 soccer league standings, team records, and individual player statistics leaderboards at Complexe Sportif Delson.'}
        canonical="https://nxtgnsports.ca/soccer/statistiques"
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-3">
            {isFr ? 'Ligue 7v7 Synthétique' : '7v7 Turf League'}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight font-display mb-3">
            {isFr ? 'CLASSEMENT & STATISTIQUES' : 'STANDINGS & PLAYER STATISTICS'}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            {isFr
              ? 'Consultez le classement général des équipes et les statistiques individuelles officielles des joueurs pour la saison 2026.'
              : 'Browse official team standings and individual player statistics leaderboards for the 2026 season.'}
          </p>
        </div>

        {/* SINGLE TAB / NAVIGATION CONTROL (STANDINGS <-> PLAYER STATISTICS) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('standings')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'standings'
                  ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy size={15} />
              <span>{isFr ? 'Classement' : 'Standings'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('players')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'players'
                  ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Award size={15} />
              <span>{isFr ? 'Statistiques des Joueurs' : 'Player Statistics'}</span>
            </button>
          </div>

          {/* Quick Notice / Search */}
          {activeTab === 'players' && (
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={playerSearch}
                onChange={(e) => setPlayerSearch(e.target.value)}
                placeholder={isFr ? 'Rechercher un joueur...' : 'Search player or team...'}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-lime-400"
              />
            </div>
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: STANDINGS                                   */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'standings' && (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl w-full max-w-full">
            <div className="overflow-x-auto w-full max-w-full scrollbar-thin">
              <table className="w-full text-left border-collapse min-w-[320px] sm:min-w-[560px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#090f0a] text-[11px] font-black uppercase tracking-wider text-lime-400">
                    <th className="py-3 sm:py-4 px-2.5 sm:px-4 text-center w-10">#</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6">{isFr ? 'Équipe' : 'Team'}</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center">PJ</th>
                    {/* Full columns on tablet/desktop */}
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center hidden sm:table-cell">V</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center hidden sm:table-cell">N</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center hidden sm:table-cell">D</th>
                    {/* Compact W-D-L on mobile */}
                    <th className="py-3 sm:py-4 px-2 text-center sm:hidden">V-N-D</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center hidden md:table-cell">BP</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center hidden md:table-cell">BC</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-3 text-center">DIFF</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-5 text-center font-black text-white bg-lime-500/10">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm">
                  {sortedStandings.map((team, idx) => (
                    <tr
                      key={team.teamId}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-3 sm:py-4 px-2.5 sm:px-4 text-center font-mono font-bold text-gray-400">
                        {idx + 1}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
                            style={getTeamDotStyle(team.teamId)}
                          />
                          <span className="font-black uppercase italic text-white group-hover:text-lime-300 transition-colors break-words leading-tight">
                            {team.teamName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300">{team.gp}</td>
                      {/* Full columns on tablet/desktop */}
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300 hidden sm:table-cell">{team.wins}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300 hidden sm:table-cell">{team.draws}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300 hidden sm:table-cell">{team.losses}</td>
                      {/* Compact V-N-D on mobile */}
                      <td className="py-3 sm:py-4 px-2 text-center font-mono text-gray-300 sm:hidden">
                        {team.wins}-{team.draws}-{team.losses}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300 hidden md:table-cell">{team.gf}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300 hidden md:table-cell">{team.ga}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center font-mono text-gray-300">
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-5 text-center font-mono font-black text-lime-400 bg-lime-500/5 text-sm sm:text-base">
                        {team.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="p-3 sm:p-4 bg-zinc-950/60 border-t border-zinc-800/80 text-[10px] sm:text-[11px] text-gray-400 flex flex-wrap gap-3 sm:gap-6 justify-center">
              <span>PJ: Parties Jouées</span>
              <span>V: Victoires (3 pts)</span>
              <span>N: Matchs Nuls (1 pt)</span>
              <span>D: Défaites (0 pt)</span>
              <span>DIFF: Différence de Buts</span>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: PLAYER STATISTICS                           */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'players' && (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl w-full max-w-full">
            <div className="overflow-x-auto w-full max-w-full scrollbar-thin">
              <table className="w-full text-left border-collapse min-w-[320px] sm:min-w-[520px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#090f0a] text-[11px] font-black uppercase tracking-wider text-lime-400">
                    <th className="py-3 sm:py-4 px-3 sm:px-6">{isFr ? 'Joueur' : 'Player'}</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6">{isFr ? 'Équipe' : 'Team'}</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center">PJ</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center">B</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center">P</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-5 text-center font-black text-white bg-lime-500/10">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <tr key={player.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-white leading-snug break-words whitespace-normal">
                          {player.name}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-300">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="w-2 h-2 rounded-full shrink-0" style={getTeamDotStyle(player.teamId)} />
                            <span className="break-words leading-snug">{player.teamName}</span>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-center font-mono text-gray-400">{player.gp}</td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-center font-mono text-gray-400">{player.goals}</td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-center font-mono text-gray-400">{player.assists}</td>
                        <td className="py-3 sm:py-4 px-3 sm:px-5 text-center font-mono font-black text-lime-400 bg-lime-500/5 text-sm sm:text-base">
                          {player.points}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-gray-400">
                        {isFr ? 'Aucun joueur trouvé.' : 'No players found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Notice */}
            <div className="p-3 sm:p-4 bg-zinc-950/60 border-t border-zinc-800/80 text-[10px] sm:text-[11px] text-gray-400 flex flex-wrap gap-3 sm:gap-6 justify-between items-center">
              <span>PJ: Parties Jouées • B: Buts • P: Passes Décisives • PTS: Points</span>
              <span className="text-lime-400 font-bold">{isFr ? 'Coup d’envoi : 4 octobre 2026' : 'Season kickoff: October 4, 2026'}</span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Link to Team Lineups */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase italic text-white">
                {isFr ? 'Alignements Officiels des Équipes' : 'Official Team Lineups'}
              </h3>
              <p className="text-xs text-gray-400">
                {isFr
                  ? 'Consultez la composition complète des effectifs de chaque équipe pour la saison 7v7.'
                  : 'Check the complete registered player rosters for each team in the 7v7 league.'}
              </p>
            </div>
          </div>

          <Link
            to="/soccer/alignements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-md shadow-lime-500/20 transition-all shrink-0"
          >
            <span>{isFr ? 'Voir les Alignements' : 'View Team Lineups'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

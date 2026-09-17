import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, ShieldAlert, Award, Search, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_STANDINGS, SOCCER_PLAYER_STATS, SOCCER_TEAMS } from '../../soccerData';
import { SEO } from '../SEO';

export const SoccerStats: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [activeTab, setActiveTab] = useState<'standings' | 'players'>('standings');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorted Standings
  const sortedStandings = React.useMemo(() => {
    return [...SOCCER_STANDINGS].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-12">
      <SEO
        title={isFr ? 'Classements & Meneurs | Next Gen Soccer Rive-Sud' : 'Soccer Standings & Stats | Next Gen Soccer South Shore'}
        description={isFr ? 'Classements officiels de la ligue 7v7, meilleurs buteurs, passes décisives et fiches de discipline de Next Gen Soccer sur la Rive-Sud de Montréal.' : 'Explore official 7v7 soccer league standings, top goal scorers, assists, clean sheets, and disciplinary records for Next Gen Soccer on Montreal\'s South Shore.'}
        canonical="https://nxtgnsports.ca/soccer/statistiques"
        ogType="website"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-3">
            {isFr ? 'Statistiques Officielles' : 'Official Statistics'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight font-display mb-3">
            {isFr ? 'CLASSEMENTS & MENEURS' : 'STANDINGS & LEADERS'}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            {isFr
              ? 'Consultez les résultats de la ligue de soccer 7v7, la fiche des équipes et le classement individuel des marqueurs.'
              : 'View 7v7 soccer league standings, team records, and individual player scoring leaderboards.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('standings')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'standings'
                  ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy size={15} />
              <span>{isFr ? 'Classement des Équipes' : 'Team Standings'}</span>
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'players'
                  ? 'bg-lime-400 text-zinc-950 shadow-md shadow-lime-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={15} />
              <span>{isFr ? 'Meneurs des Joueurs' : 'Player Leaders'}</span>
            </button>
          </div>

          {/* Quick Notice */}
          <div className="flex items-center gap-2 text-xs text-lime-400 bg-lime-500/10 border border-lime-500/20 px-3.5 py-2 rounded-xl">
            <Info size={14} className="shrink-0" />
            <span>
              {isFr
                ? 'Saison 2026 : Enregistrement des équipes en cours'
                : '2026 Season: Team registration in progress'}
            </span>
          </div>
        </div>

        {/* TAB 1: TEAM STANDINGS */}
        {activeTab === 'standings' && (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            {sortedStandings.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-[#090f0a] text-[11px] font-black uppercase tracking-wider text-lime-400">
                        <th className="py-4 px-4 w-12 text-center">#</th>
                        <th className="py-4 px-6">{isFr ? 'Équipe' : 'Team'}</th>
                        <th className="py-4 px-3 text-center">PJ / GP</th>
                        <th className="py-4 px-3 text-center">V / W</th>
                        <th className="py-4 px-3 text-center">N / D</th>
                        <th className="py-4 px-3 text-center">D / L</th>
                        <th className="py-4 px-3 text-center">BP / GF</th>
                        <th className="py-4 px-3 text-center">BC / GA</th>
                        <th className="py-4 px-3 text-center">DIFF</th>
                        <th className="py-4 px-5 text-center font-extrabold text-white bg-lime-500/10">PTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 text-sm">
                      {sortedStandings.map((team, idx) => (
                        <tr
                          key={team.teamId}
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td className="py-4 px-4 text-center font-mono font-bold text-gray-400">
                            {idx + 1}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                              <span className="font-black uppercase italic text-white group-hover:text-lime-300 transition-colors">
                                {team.teamName}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-center font-mono text-gray-300">{team.gp}</td>
                          <td className="py-4 px-3 text-center font-mono text-gray-300">{team.wins}</td>
                          <td className="py-4 px-3 text-center font-mono text-gray-300">{team.draws}</td>
                          <td className="py-4 px-3 text-center font-mono text-gray-300">{team.losses}</td>
                          <td className="py-4 px-3 text-center font-mono text-gray-400">{team.gf}</td>
                          <td className="py-4 px-3 text-center font-mono text-gray-400">{team.ga}</td>
                          <td className="py-4 px-3 text-center font-mono text-gray-400">
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </td>
                          <td className="py-4 px-5 text-center font-mono font-black text-lime-400 bg-lime-500/5 text-base">
                            {team.pts}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footnote */}
                <div className="p-4 bg-black/40 border-t border-zinc-800 text-xs text-gray-500 flex flex-wrap gap-4">
                  <span>PJ: Matchs Joués</span>
                  <span>V: Victoires (3 pts)</span>
                  <span>N: Matchs Nuls (1 pt)</span>
                  <span>D: Défaites (0 pt)</span>
                  <span>DIFF: Différence de Buts</span>
                </div>
              </>
            ) : (
              <div className="p-8 sm:p-14 text-center">
                <div className="w-16 h-16 rounded-2xl bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center mx-auto mb-4">
                  <Trophy size={32} />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3">
                  <span>{isFr ? 'Statistiques en attente' : 'Stats Pending'}</span>
                </div>
                <h3 className="text-2xl font-black uppercase italic font-display text-white mb-3">
                  {isFr ? 'Classements et Statistiques d’Équipes à Venir' : 'Team Standings & Stats Coming Soon'}
                </h3>
                <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed mb-6">
                  {isFr
                    ? 'Aucune équipe ni statistique d’équipe n’est confirmée pour le moment. Les inscriptions sont présentement ouvertes. Le tableau officiel des points, victoires, buts et fiches complètes sera actualisé en direct dès les premières parties de la saison au Complexe Sportif Delson | Sainte-Catherine.'
                    : 'No teams or team statistics are confirmed yet. Team registrations are currently open. Official standings, points, wins, and goal differentials will update live once matches begin at Complexe Sportif Delson | Sainte-Catherine.'}
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-gray-400 max-w-md mx-auto mb-8">
                  <p className="font-bold text-white uppercase tracking-wider">Complexe Sportif Delson | Sainte-Catherine</p>
                  <p className="mt-0.5">75 Bd Georges Gagné N, Delson, QC J5B 2E5</p>
                </div>

                <Link
                  to="/register?sport=soccer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-lg shadow-lime-500/20 transition-all"
                >
                  <span>{isFr ? 'Inscrire une Équipe' : 'Register a Team'}</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PLAYER LEADERS */}
        {activeTab === 'players' && (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl p-6 sm:p-10">
            {SOCCER_PLAYER_STATS.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-[#090f0a] text-[11px] font-black uppercase tracking-wider text-lime-400">
                      <th className="py-4 px-4 w-12 text-center">#</th>
                      <th className="py-4 px-6">{isFr ? 'Joueur' : 'Player'}</th>
                      <th className="py-4 px-6">{isFr ? 'Équipe' : 'Team'}</th>
                      <th className="py-4 px-3 text-center">PJ</th>
                      <th className="py-4 px-3 text-center">B</th>
                      <th className="py-4 px-3 text-center">P</th>
                      <th className="py-4 px-4 text-center font-bold text-white bg-lime-500/10">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 text-sm">
                    {SOCCER_PLAYER_STATS.map((player, idx) => (
                      <tr key={player.id} className="hover:bg-white/5">
                        <td className="py-4 px-4 text-center font-mono font-bold text-gray-400">
                          {idx + 1}
                        </td>
                        <td className="py-4 px-6 font-bold text-white">{player.name}</td>
                        <td className="py-4 px-6 text-gray-300">{player.teamName}</td>
                        <td className="py-4 px-3 text-center font-mono text-gray-300">{player.gp}</td>
                        <td className="py-4 px-3 text-center font-mono text-gray-300">{player.goals}</td>
                        <td className="py-4 px-3 text-center font-mono text-gray-300">{player.assists}</td>
                        <td className="py-4 px-4 text-center font-mono font-bold text-lime-400 bg-lime-500/5">
                          {player.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center mx-auto mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-black uppercase italic font-display text-white mb-2">
                  {isFr ? 'Statistiques Individuelles à Venir' : 'Individual Player Statistics Coming Soon'}
                </h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-4">
                  {isFr
                    ? 'Les statistiques individuelles des joueurs (buteurs, passeurs et discipline) seront compilées en direct par nos marqueurs officiels lors des matchs au Complexe Sportif Delson | Sainte-Catherine.'
                    : 'Individual player stats (goals, assists, and discipline cards) will be officially tracked and updated live starting from the first match day at Complexe Sportif Delson | Sainte-Catherine.'}
                </p>
                <div className="inline-block text-xs text-lime-400 font-bold">
                  <span>Complexe Sportif Delson | Sainte-Catherine • 75 Bd Georges Gagné N, Delson, QC J5B 2E5</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

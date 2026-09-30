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
  const [playerSortBy, setPlayerSortBy] = useState<'points' | 'goals' | 'assists'>('points');

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

  // Ranked player stats according to active sort criteria
  const rankedPlayers = React.useMemo(() => {
    const list = [...SOCCER_PLAYER_STATS].sort((a, b) => {
      if (playerSortBy === 'goals') {
        if (b.goals !== a.goals) return b.goals - a.goals;
        if (b.points !== a.points) return b.points - a.points;
        if (b.assists !== a.assists) return b.assists - a.assists;
      } else if (playerSortBy === 'assists') {
        if (b.assists !== a.assists) return b.assists - a.assists;
        if (b.points !== a.points) return b.points - a.points;
        if (b.goals !== a.goals) return b.goals - a.goals;
      } else {
        // default: points
        if (b.points !== a.points) return b.points - a.points;
        if (b.goals !== a.goals) return b.goals - a.goals;
        if (b.assists !== a.assists) return b.assists - a.assists;
      }
      if (a.gp !== b.gp) return a.gp - b.gp;
      return a.name.localeCompare(b.name);
    });

    return list.map((p, idx) => ({
      ...p,
      rank: idx + 1
    }));
  }, [playerSortBy]);

  // Filtered player stats
  const filteredPlayers = React.useMemo(() => {
    if (!playerSearch) return rankedPlayers;
    const q = playerSearch.toLowerCase().trim();
    return rankedPlayers.filter(p =>
      p.name.toLowerCase().includes(q) || p.teamName.toLowerCase().includes(q)
    );
  }, [rankedPlayers, playerSearch]);

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

          {/* Quick Notice / Search & Sort Controls */}
          {activeTab === 'players' && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              <div className="inline-flex items-center gap-1 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800 text-xs">
                <span className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-wider">
                  {isFr ? 'Trier par :' : 'Rank by:'}
                </span>
                <button
                  type="button"
                  onClick={() => setPlayerSortBy('points')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    playerSortBy === 'points'
                      ? 'bg-lime-400 text-zinc-950 font-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  PTS
                </button>
                <button
                  type="button"
                  onClick={() => setPlayerSortBy('goals')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    playerSortBy === 'goals'
                      ? 'bg-lime-400 text-zinc-950 font-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isFr ? 'Buteurs (B)' : 'Goals (G)'}
                </button>
                <button
                  type="button"
                  onClick={() => setPlayerSortBy('assists')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    playerSortBy === 'assists'
                      ? 'bg-lime-400 text-zinc-950 font-black shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isFr ? 'Passes (P)' : 'Assists (A)'}
                </button>
              </div>

              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={playerSearch}
                  onChange={(e) => setPlayerSearch(e.target.value)}
                  placeholder={isFr ? 'Rechercher un joueur...' : 'Search player or team...'}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-lime-400"
                />
              </div>
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
              <table className="w-full text-left border-collapse min-w-[340px] sm:min-w-[560px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#090f0a] text-[11px] font-black uppercase tracking-wider text-lime-400">
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center w-12 sm:w-16">#</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6">{isFr ? 'Joueur' : 'Player'}</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6">{isFr ? 'Équipe' : 'Team'}</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-center">PJ</th>
                    <th 
                      onClick={() => setPlayerSortBy('goals')}
                      className={`py-3 sm:py-4 px-2 sm:px-4 text-center cursor-pointer transition-colors select-none ${
                        playerSortBy === 'goals' ? 'text-white bg-lime-500/15' : 'hover:text-white'
                      }`}
                      title={isFr ? 'Trier par Buts' : 'Sort by Goals'}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>B</span>
                        {playerSortBy === 'goals' && <span className="text-[9px] text-lime-400">▼</span>}
                      </div>
                    </th>
                    <th 
                      onClick={() => setPlayerSortBy('assists')}
                      className={`py-3 sm:py-4 px-2 sm:px-4 text-center cursor-pointer transition-colors select-none ${
                        playerSortBy === 'assists' ? 'text-white bg-lime-500/15' : 'hover:text-white'
                      }`}
                      title={isFr ? 'Trier par Passes Décisives' : 'Sort by Assists'}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>P</span>
                        {playerSortBy === 'assists' && <span className="text-[9px] text-lime-400">▼</span>}
                      </div>
                    </th>
                    <th 
                      onClick={() => setPlayerSortBy('points')}
                      className={`py-3 sm:py-4 px-3 sm:px-5 text-center font-black cursor-pointer transition-colors select-none ${
                        playerSortBy === 'points' ? 'text-white bg-lime-500/25' : 'text-white bg-lime-500/10 hover:bg-lime-500/20'
                      }`}
                      title={isFr ? 'Trier par Points' : 'Sort by Points'}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>PTS</span>
                        {playerSortBy === 'points' && <span className="text-[9px] text-lime-400">▼</span>}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <tr key={player.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-center font-mono font-bold text-xs sm:text-sm">
                          {player.rank === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black shadow-[0_0_8px_rgba(251,191,36,0.25)]">
                              1
                            </span>
                          ) : player.rank === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 text-xs font-bold">
                              2
                            </span>
                          ) : player.rank === 3 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600/20 text-amber-500 border border-amber-600/40 text-xs font-bold">
                              3
                            </span>
                          ) : (
                            <span className="text-gray-400">{player.rank}</span>
                          )}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-white leading-snug break-words whitespace-normal">
                          {player.name}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-300">
                          {player.teamIds && player.teamIds.length > 1 ? (
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              {player.teamIds.map((tid, tIdx) => {
                                const tName = player.teamNames?.[tIdx] || SOCCER_TEAMS.find(t => t.id === tid)?.name || tid;
                                return (
                                  <div key={tid} className="flex items-center gap-1.5 shrink-0">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={getTeamDotStyle(tid)} />
                                    <span className="break-words leading-snug">{tName}</span>
                                    {tIdx < (player.teamIds?.length || 0) - 1 && (
                                      <span className="text-gray-500 font-bold text-xs ml-0.5">/</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="w-2 h-2 rounded-full shrink-0" style={getTeamDotStyle(player.teamId)} />
                              <span className="break-words leading-snug">{player.teamName}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-center font-mono text-gray-400">{player.gp}</td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-4 text-center font-mono ${playerSortBy === 'goals' ? 'font-bold text-white bg-lime-500/5' : 'text-gray-400'}`}>
                          {player.goals}
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-4 text-center font-mono ${playerSortBy === 'assists' ? 'font-bold text-white bg-lime-500/5' : 'text-gray-400'}`}>
                          {player.assists}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-5 text-center font-mono font-black text-lime-400 bg-lime-500/5 text-sm sm:text-base">
                          {player.points}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-gray-400">
                        {isFr ? 'Aucun joueur trouvé.' : 'No players found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Notice */}
            <div className="p-3 sm:p-4 bg-zinc-950/60 border-t border-zinc-800/80 text-[10px] sm:text-[11px] text-gray-400 flex flex-wrap gap-3 sm:gap-6 justify-between items-center">
              <span>{isFr ? '#: Rang • PJ: Parties Jouées • B: Buts • P: Passes Décisives • PTS: Points' : '#: Rank • PJ: Games Played • B: Goals • P: Assists • PTS: Points'}</span>
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

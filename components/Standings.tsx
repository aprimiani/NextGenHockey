import React, { useState } from 'react';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Calendar, User, Trophy, LayoutList, Shield } from 'lucide-react';
import { Team } from '../types';

const Standings: React.FC = () => {
  const { t, language } = useLanguage();
  const { teams, players, goalies, schedule, loading } = useLeagueData();
  const [activeTab, setActiveTab] = useState<'players' | 'goalies'>('players');
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Process and Sort Teams
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.wins - a.wins;
  });

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  const sortedGoalies = [...goalies].sort((a, b) => {
    const gaaA = a.gp > 0 ? a.goalsAgainst / a.gp : 99;
    const gaaB = b.gp > 0 ? b.goalsAgainst / b.gp : 99;
    return gaaA - gaaB; // Sort by lowest GAA
  });

  const displayedPlayers = showAllPlayers ? sortedPlayers : sortedPlayers.slice(0, 5);
  const displayedGoalies = sortedGoalies;

  const getTeamName = (id: string) => teams.find(t => t.id === id)?.name || 'Unknown';
  const getTeamColor = (id: string) => teams.find(t => t.id === id)?.logoColor || '#ccc';

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T12:00:00');
      return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) { return dateString; }
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ng-light-blue"></div>
          </div>
      )
  }

  const scrollbarHideStyle = {
    msOverflowStyle: 'none' as const,
    scrollbarWidth: 'none' as const,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .fade-right::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, transparent, rgba(15, 23, 42, 0.4));
          pointer-events: none;
        }
      `}</style>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-white border-l-4 border-ng-light-blue pl-4">
          {t.standings.title}
        </h2>
      </div>
      
      {/* Standings Table */}
      <div className="bg-ng-blue/30 rounded-lg border border-gray-700 shadow-xl mb-12 relative fade-right overflow-hidden">
        <div 
          className="overflow-x-auto hide-scrollbar" 
          style={scrollbarHideStyle}
        >
          <table className="w-full divide-y divide-gray-700">
            <thead className="bg-ng-blue">
              <tr>
                <th scope="col" className="px-1 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap w-8 md:w-auto">{t.standings.rank}</th>
                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.team}</th>
                <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.gp}</th>
                <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.w}</th>
                <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.l}</th>
                <th scope="col" className="hidden sm:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.t}</th>
                <th scope="col" className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.pts}</th>
                <th scope="col" className="hidden lg:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.gf}</th>
                <th scope="col" className="hidden lg:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{t.standings.ga}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedTeams.map((team, index) => (
                <tr key={team.id} className="hover:bg-ng-blue/50 transition-colors group">
                  <td className="px-1 md:px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center md:text-left">{index + 1}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => setSelectedTeam(team)}
                      className="flex items-center text-left hover:text-ng-light-blue transition-colors outline-none"
                    >
                      <div className="h-3 w-3 rounded-full mr-2 md:mr-3 shadow-sm shadow-black/50" style={{ backgroundColor: team.logoColor }}></div>
                      <div className="text-sm font-bold text-white group-hover:text-ng-light-blue truncate max-w-[80px] sm:max-w-none">{team.name}</div>
                    </button>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300 font-bold">{team.gp}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-green-400 font-semibold">{team.wins}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-red-400">{team.losses}</td>
                  <td className="hidden sm:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-400">{team.ties}</td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-white font-bold bg-ng-light-blue/10">{team.points}</td>
                  <td className="hidden lg:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">{team.goalsFor}</td>
                  <td className="hidden lg:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">{team.goalsAgainst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-ng-blue/30 rounded-lg border border-gray-700 shadow-xl overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'players' ? 'bg-ng-light-blue text-ng-navy' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            onClick={() => setActiveTab('players')}
          >
            {t.standings.playersTab}
          </button>
          <button
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === 'goalies' ? 'bg-ng-light-blue text-ng-navy' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            onClick={() => setActiveTab('goalies')}
          >
            {t.standings.goaliesTab}
          </button>
        </div>

        <div className="p-6">
           {activeTab === 'players' ? (
             <div className="relative fade-right overflow-hidden">
               <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
                 <table className="w-full divide-y divide-gray-700">
                   <thead>
                     <tr>
                       <th className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto">{t.standings.rank}</th>
                       <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.player}</th>
                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.gp}</th>
                       <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.goals}</th>
                       <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.assists}</th>
                       <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-ng-light-blue uppercase whitespace-nowrap">{t.standings.points}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-700">
                     {displayedPlayers.map((player, idx) => (
                       <tr key={player.id} className="hover:bg-ng-navy transition-colors">
                         <td className="px-1 md:px-4 py-3 text-sm text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                         <td className="px-3 md:px-4 py-3 text-sm font-bold text-white whitespace-nowrap">
                            <div className="flex flex-col">
                              <span>{player.name}</span>
                              <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getTeamColor(player.teamId) }}></div>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">{getTeamName(player.teamId)}</span>
                              </div>
                            </div>
                         </td>
                         <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-gray-300 flex items-center gap-2 whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getTeamColor(player.teamId) }}></div>
                            {getTeamName(player.teamId)}
                         </td>
                         <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{player.gp}</td>
                         <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{player.goals}</td>
                         <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{player.assists}</td>
                         <td className="px-3 md:px-4 py-3 text-sm text-center font-bold text-ng-light-blue whitespace-nowrap">{player.points}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               {sortedPlayers.length > 5 && (
                 <div className="mt-4 text-center">
                   <button onClick={() => setShowAllPlayers(!showAllPlayers)} className="text-ng-light-blue hover:text-white text-sm font-medium transition-colors">
                     {showAllPlayers ? t.standings.showLess : t.standings.showMore}
                   </button>
                 </div>
               )}
             </div>
           ) : (
             <div className="relative fade-right overflow-hidden">
                <div className="overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
                 <table className="w-full divide-y divide-gray-700">
                   <thead>
                     <tr>
                       <th className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto">{t.standings.rank}</th>
                       <th className="px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.player}</th>
                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.gp}</th>
                       <th className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.record}</th>
                       <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.gaa}</th>
                       <th className="px-3 md:px-4 py-3 text-center text-xs font-medium text-ng-light-blue uppercase whitespace-nowrap">{t.standings.svPct}</th>
                       <th className="hidden lg:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{t.standings.shotsAgainst}</th>
                       <th className="hidden lg:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{t.standings.goalsAgainstShort}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-700">
                     {displayedGoalies.map((goalie, idx) => {
                       const gaa = goalie.gp > 0 ? (goalie.goalsAgainst / goalie.gp).toFixed(2) : '0.00';
                       const svPct = goalie.shotsAgainst > 0 ? ((goalie.shotsAgainst - goalie.goalsAgainst) / goalie.shotsAgainst).toFixed(3) : '.000';
                       return (
                        <tr key={goalie.id} className="hover:bg-ng-navy transition-colors">
                          <td className="px-1 md:px-4 py-3 text-sm text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                          <td className="px-3 md:px-4 py-3 text-sm font-bold text-white whitespace-nowrap">
                            <div className="flex flex-col">
                              <span>{goalie.name}</span>
                              <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getTeamColor(goalie.teamId) }}></div>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">{getTeamName(goalie.teamId)}</span>
                              </div>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-gray-300 flex items-center gap-2 whitespace-nowrap">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getTeamColor(goalie.teamId) }}></div>
                              {getTeamName(goalie.teamId)}
                          </td>
                          <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{goalie.gp}</td>
                          <td className="px-2 md:px-4 py-3 text-sm text-center text-gray-300 font-mono text-[10px] whitespace-nowrap">{goalie.wins}-{goalie.losses}-{goalie.draws}</td>
                          <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono whitespace-nowrap">{gaa}</td>
                          <td className="px-3 md:px-4 py-3 text-sm text-center font-bold text-ng-light-blue whitespace-nowrap">{svPct}</td>
                          <td className="hidden lg:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{goalie.shotsAgainst}</td>
                          <td className="hidden lg:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{goalie.goalsAgainst}</td>
                        </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
               <div className="mt-6 flex items-center gap-2 text-gray-500 text-[10px] italic">
                 <Shield size={12} />
                 <span>{t.standings.gaaExplanation}</span>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Team Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-ng-navy border border-gray-700 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300">
              <div 
                className="p-6 relative overflow-hidden flex items-center justify-between"
                style={{ backgroundColor: `${selectedTeam.logoColor}20`, borderBottom: `2px solid ${selectedTeam.logoColor}` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0" style={{ backgroundColor: selectedTeam.logoColor }}>
                    <span className="text-white font-black text-xl md:text-2xl uppercase italic">{selectedTeam.name.substring(0, 1)}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none">{selectedTeam.name}</h2>
                    <div className="flex gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                      <span>{selectedTeam.wins}W - {selectedTeam.losses}L - {selectedTeam.ties}D</span>
                      <span className="text-ng-light-blue">{selectedTeam.points} {t.standings.pts}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedTeam(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white shrink-0">
                  <X size={28} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 md:p-10 space-y-12 text-gray-300 hide-scrollbar" style={scrollbarHideStyle}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: t.standings.gp, val: selectedTeam.gp, icon: <LayoutList size={16} /> },
                    { label: t.standings.record, val: `${selectedTeam.wins}-${selectedTeam.losses}-${selectedTeam.ties}`, icon: <Trophy size={16} /> },
                    { label: t.standings.pts, val: selectedTeam.points, icon: <LayoutList size={16} /> },
                    { label: t.standings.diff, val: (selectedTeam.goalsFor - selectedTeam.goalsAgainst > 0 ? '+' : '') + (selectedTeam.goalsFor - selectedTeam.goalsAgainst), icon: <LayoutList size={16} /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-ng-blue/30 border border-gray-700 p-4 rounded-xl text-center">
                      <div className="flex justify-center text-gray-500 mb-1">{stat.icon}</div>
                      <div className="text-xl md:text-2xl font-black text-white">{stat.val}</div>
                      <div className="text-[9px] md:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="space-y-6 xl:col-span-8">
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Shield size={18} className="text-ng-light-blue" />
                        {t.standings.goalies}
                      </h3>
                       <div className="bg-ng-navy/50 rounded-xl border border-gray-700 relative fade-right overflow-hidden">
                        <div 
                          className="overflow-x-auto hide-scrollbar" 
                          style={scrollbarHideStyle}
                        >
                          <table className="w-full text-left">
                            <thead className="bg-gray-800/50">
                              <tr className="text-[10px] uppercase text-gray-500 font-bold border-b border-gray-700">
                                <th className="px-3 md:px-4 py-2 whitespace-nowrap">Name</th>
                                <th className="px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.gp}</th>
                                <th className="hidden sm:table-cell px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.record}</th>
                                <th className="px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.gaa}</th>
                                <th className="px-3 md:px-4 py-2 text-center text-ng-light-blue whitespace-nowrap">{t.standings.svPct}</th>
                                <th className="hidden md:table-cell px-3 md:px-4 py-2 text-center text-gray-500 whitespace-nowrap">{t.standings.shotsAgainst}</th>
                                <th className="hidden md:table-cell px-3 md:px-4 py-2 text-center text-gray-500 whitespace-nowrap">{t.standings.goalsAgainstShort}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {goalies.filter(g => g.teamId === selectedTeam.id).length > 0 ? (
                                goalies.filter(g => g.teamId === selectedTeam.id).map(g => {
                                  const gaa = g.gp > 0 ? (g.goalsAgainst / g.gp).toFixed(2) : '0.00';
                                  const svPct = g.shotsAgainst > 0 ? ((g.shotsAgainst - g.goalsAgainst) / g.shotsAgainst).toFixed(3) : '.000';
                                  return (
                                    <tr key={g.id} className="bg-ng-light-blue/5 hover:bg-ng-light-blue/10 transition-colors">
                                      <td className="px-3 md:px-4 py-3 text-sm font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                        <span className="text-[8px] bg-ng-light-blue text-ng-navy px-1.5 py-0.5 rounded-sm font-black uppercase">G</span>
                                        {g.name}
                                      </td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{g.gp}</td>
                                      <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono text-[10px] whitespace-nowrap">{g.wins}-{g.losses}-{g.draws}</td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 font-mono italic whitespace-nowrap">{gaa}</td>
                                      <td className="px-3 md:px-4 py-3 text-sm text-center font-black text-ng-light-blue whitespace-nowrap">{svPct}</td>
                                      <td className="hidden md:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{g.shotsAgainst}</td>
                                      <td className="hidden md:table-cell px-3 md:px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">{g.goalsAgainst}</td>
                                    </tr>
                                  )
                                })
                              ) : (
                                <tr><td colSpan={7} className="p-4 text-center text-gray-500 italic text-xs">No goalies assigned.</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User size={18} className="text-ng-light-blue" />
                        {t.standings.skaters}
                      </h3>
                       <div className="bg-ng-navy/50 rounded-xl border border-gray-700 relative fade-right overflow-hidden">
                        <div 
                          className="overflow-x-auto hide-scrollbar" 
                          style={scrollbarHideStyle}
                        >
                          <table className="w-full text-left">
                            <thead className="bg-gray-800/50">
                              <tr className="text-[10px] uppercase text-gray-500 font-bold border-b border-gray-700">
                                <th className="px-3 md:px-4 py-2 whitespace-nowrap">{t.standings.player}</th>
                                <th className="px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.gp}</th>
                                <th className="px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.goals}</th>
                                <th className="px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.assists}</th>
                                <th className="px-3 md:px-4 py-2 text-center text-ng-light-blue whitespace-nowrap">{t.standings.pts}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {players.filter(p => p.teamId === selectedTeam.id).length > 0 ? (
                                players.filter(p => p.teamId === selectedTeam.id).map(p => (
                                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-3 md:px-4 py-3 text-sm font-semibold text-white whitespace-nowrap">{p.name}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-400 whitespace-nowrap">{p.gp}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{p.goals}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center text-gray-300 whitespace-nowrap">{p.assists}</td>
                                    <td className="px-3 md:px-4 py-3 text-sm text-center font-black text-ng-light-blue whitespace-nowrap">{p.points}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic text-sm">{t.standings.noPlayers}</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="xl:col-span-4">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar size={18} className="text-ng-light-blue" />
                      {t.standings.teamSchedule}
                    </h3>
                    <div className="space-y-3">
                      {schedule.filter(g => g.homeTeamId === selectedTeam.id || g.awayTeamId === selectedTeam.id).length > 0 ? (
                        [...schedule]
                          .filter(g => g.homeTeamId === selectedTeam.id || g.awayTeamId === selectedTeam.id)
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map(g => {
                          const isHome = g.homeTeamId === selectedTeam.id;
                          const opponentId = isHome ? g.awayTeamId : g.homeTeamId;
                          const opponentName = getTeamName(opponentId);
                          const result = g.status === 'played' 
                            ? (isHome ? (g.homeScore! > g.awayScore! ? 'W' : (g.homeScore! === g.awayScore! ? 'D' : 'L')) : (g.awayScore! > g.homeScore! ? 'W' : (g.awayScore! === g.homeScore! ? 'D' : 'L')))
                            : null;

                          return (
                            <div key={g.id} className="bg-ng-navy/50 p-4 rounded-xl border border-gray-700 flex items-center justify-between relative overflow-hidden">
                              {g.isPlayoff && (
                                <div className="absolute top-0 right-0">
                                  <div className="bg-ng-light-blue text-ng-navy text-[8px] font-black px-2 py-0.5 uppercase italic transform rotate-0">Playoffs</div>
                                </div>
                              )}
                              <div className="flex items-center gap-4">
                                <div className="text-center w-12 border-r border-gray-700 pr-4">
                                  <div className="text-xs font-black text-white">{formatDate(g.date).split(',')[0]}</div>
                                  <div className="text-[10px] text-gray-500 uppercase">{formatDate(g.date).split(',')[1]}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 uppercase font-bold">{isHome ? 'VS' : '@'} {opponentName}</div>
                                  <div className="text-[10px] text-gray-600 font-medium">{g.time} - {g.location}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                {g.status === 'played' ? (
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-black px-2 py-0.5 rounded ${result === 'W' ? 'bg-green-500/20 text-green-400' : (result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400')}`}>{result}</span>
                                    <span className="text-sm font-mono font-bold text-white whitespace-nowrap">{isHome ? `${g.homeScore}-${g.awayScore}` : `${g.awayScore}-${g.homeScore}`}</span>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-gray-500 uppercase font-bold">{t.schedule.scheduled}</span>
                                )}
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <p className="p-8 text-center text-gray-500 italic text-sm">No games scheduled for this team.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Standings;
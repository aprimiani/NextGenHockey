import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Calendar, User, Trophy, LayoutList, Shield, ChevronUp, ChevronDown } from 'lucide-react';
import { Team, PlayerStats, GoalieStats } from '../types';

const Standings: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { teams, players, goalies, schedule, loading } = useLeagueData();
  const [activeTab, setActiveTab] = useState<'players' | 'goalies'>('players');
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);
  const [selectedGoalie, setSelectedGoalie] = useState<GoalieStats | null>(null);

  // Sorting State
  const [teamSort, setTeamSort] = useState<{ key: keyof Team | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [playerSort, setPlayerSort] = useState<{ key: keyof PlayerStats | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [goalieSort, setGoalieSort] = useState<{ key: keyof GoalieStats | 'gaa' | 'svPct' | 'rank'; dir: 'asc' | 'desc' }>({ key: 'gaa', dir: 'asc' });

  // Team Profile Sorting State
  const [teamPlayerSort, setTeamPlayerSort] = useState<{ key: keyof PlayerStats | 'rank'; dir: 'asc' | 'desc' }>({ key: 'points', dir: 'desc' });
  const [teamGoalieSort, setTeamGoalieSort] = useState<{ key: keyof GoalieStats | 'gaa' | 'svPct' | 'rank'; dir: 'asc' | 'desc' }>({ key: 'gaa', dir: 'asc' });

  const handleSort = <T,>(
    currentSort: { key: keyof T | any; dir: 'asc' | 'desc' },
    setSort: React.Dispatch<React.SetStateAction<{ key: keyof T | any; dir: 'asc' | 'desc' }>>,
    key: keyof T | any
  ) => {
    if (currentSort.key === key) {
      setSort({ key, dir: currentSort.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, dir: 'desc' });
    }
  };

  const SortIcon = ({ sort, column }: { sort: { key: any; dir: 'asc' | 'desc' }; column: any }) => {
    if (sort.key !== column) return <div className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-20 transition-opacity"><ChevronUp size={14} /></div>;
    return sort.dir === 'asc' ? <ChevronUp size={14} className="ml-1 text-ng-light-blue" /> : <ChevronDown size={14} className="ml-1 text-ng-light-blue" />;
  };

  // Process and Sort Teams
  const sortedTeams = [...teams].sort((a, b) => {
    if (teamSort.key === 'rank') return 0;
    const key = teamSort.key as keyof Team;

    let valA = a[key];
    let valB = b[key];

    if (typeof valA === 'string') {
      return teamSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }

    if (teamSort.dir === 'asc') {
      return (valA as number) - (valB as number);
    } else {
      return (valB as number) - (valA as number);
    }
  });

  // Secondary sort for teams if primary sort is points
  if (teamSort.key === 'points') {
    sortedTeams.sort((a, b) => {
      if (b.points !== a.points) return teamSort.dir === 'asc' ? a.points - b.points : b.points - a.points;
      return teamSort.dir === 'asc' ? a.wins - b.wins : b.wins - a.wins;
    });
  }

  const sortedPlayers = [...players].sort((a, b) => {
    if (playerSort.key === 'rank') return 0;
    const key = playerSort.key as keyof PlayerStats;
    let valA = a[key];
    let valB = b[key];

    if (typeof valA === 'string') {
      return playerSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
    }

    if (playerSort.dir === 'asc') {
      return (valA as number) - (valB as number);
    } else {
      return (valB as number) - (valA as number);
    }
  });

  const sortedGoalies = [...goalies].sort((a, b) => {
    if (goalieSort.key === 'rank') return 0;
    let valA: number, valB: number;

    if (goalieSort.key === 'gaa') {
      valA = a.gp > 0 ? a.goalsAgainst / a.gp : 99;
      valB = b.gp > 0 ? b.goalsAgainst / b.gp : 99;
    } else if (goalieSort.key === 'svPct') {
      valA = a.shotsAgainst > 0 ? (a.shotsAgainst - a.goalsAgainst) / a.shotsAgainst : 0;
      valB = b.shotsAgainst > 0 ? (b.shotsAgainst - b.goalsAgainst) / b.shotsAgainst : 0;
    } else if (typeof a[goalieSort.key as keyof GoalieStats] === 'string') {
      const sA = a[goalieSort.key as keyof GoalieStats] as string;
      const sB = b[goalieSort.key as keyof GoalieStats] as string;
      return goalieSort.dir === 'asc' ? sA.localeCompare(sB) : sB.localeCompare(sA);
    } else {
      valA = a[goalieSort.key as keyof GoalieStats] as number;
      valB = b[goalieSort.key as keyof GoalieStats] as number;
    }

    return goalieSort.dir === 'asc' ? valA - valB : valB - valA;
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
      
      <div className="mb-12">
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
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
                <th 
                  scope="col" 
                  className="px-1 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'rank')}
                >
                  <div className="flex items-center">
                    {t.standings.rank}
                    <SortIcon sort={teamSort} column="rank" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'name')}
                >
                  <div className="flex items-center">
                    {t.standings.team}
                    <SortIcon sort={teamSort} column="name" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'gp')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.gp}
                    <SortIcon sort={teamSort} column="gp" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'wins')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.w}
                    <SortIcon sort={teamSort} column="wins" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'losses')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.l}
                    <SortIcon sort={teamSort} column="losses" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden sm:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'ties')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.t}
                    <SortIcon sort={teamSort} column="ties" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'points')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.pts}
                    <SortIcon sort={teamSort} column="points" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden lg:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'goalsFor')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.gf}
                    <SortIcon sort={teamSort} column="goalsFor" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden lg:table-cell px-3 md:px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer group"
                  onClick={() => handleSort(teamSort, setTeamSort, 'goalsAgainst')}
                >
                  <div className="flex items-center justify-center">
                    {t.standings.ga}
                    <SortIcon sort={teamSort} column="goalsAgainst" />
                  </div>
                </th>
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
                      <span className="mr-2 text-[11px] font-black italic shrink-0" style={{ color: team.logoColor }}>{team.name.substring(0, 1)}</span>
                      <div className="text-sm font-bold text-white group-hover:text-ng-light-blue leading-tight">{team.name}</div>
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
                       <th 
                         className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'rank')}
                       >
                         <div className="flex items-center">
                           {t.standings.rank}
                           <SortIcon sort={playerSort} column="rank" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'name')}
                       >
                         <div className="flex items-center">
                           {t.standings.player}
                           <SortIcon sort={playerSort} column="name" />
                         </div>
                       </th>
                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                       <th 
                         className="hidden sm:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'gp')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.gp}
                           <SortIcon sort={playerSort} column="gp" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'goals')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.goals}
                           <SortIcon sort={playerSort} column="goals" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'assists')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.assists}
                           <SortIcon sort={playerSort} column="assists" />
                         </div>
                       </th>
                       <th 
                         className="px-3 md:px-4 py-3 text-center text-xs font-medium text-ng-light-blue uppercase whitespace-nowrap cursor-pointer group"
                         onClick={() => handleSort(playerSort, setPlayerSort, 'points')}
                       >
                         <div className="flex items-center justify-center">
                           {t.standings.points}
                           <SortIcon sort={playerSort} column="points" />
                         </div>
                       </th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-700">
                     {displayedPlayers.map((player, idx) => (
                       <tr key={player.id} className="hover:bg-ng-navy transition-colors">
                         <td className="px-1 md:px-4 py-3 text-sm text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                         <td className="px-3 md:px-4 py-3 text-sm font-bold text-white whitespace-nowrap text-left">
                            <div className="flex flex-col items-start">
                              <button onClick={() => setSelectedPlayer(player)} className="hover:text-ng-light-blue transition-colors outline-none text-left"><span>{player.name}</span></button>
                              <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(player.teamId) }}>{getTeamName(player.teamId).substring(0, 1)}</span>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">{getTeamName(player.teamId)}</span>
                              </div>
                            </div>
                         </td>
                         <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-gray-300 flex items-center gap-2 whitespace-nowrap">
                            <span className="text-[11px] font-black italic mr-2" style={{ color: getTeamColor(player.teamId) }}>{getTeamName(player.teamId).substring(0, 1)}</span>
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
                       <th 
                         className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap w-8 md:w-auto cursor-pointer group"
                         onClick={() => handleSort(goalieSort, setGoalieSort, 'rank')}
                       >
                         <div className="flex items-center">
                           {t.standings.rank}
                           <SortIcon sort={goalieSort} column="rank" />
                         </div>
                       </th>
                                               <th 
                          className="px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'name')}
                        >
                          <div className="flex items-center">
                            {t.standings.player}
                            <SortIcon sort={goalieSort} column="name" />
                          </div>
                        </th>

                       <th className="hidden sm:table-cell px-3 md:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{t.standings.team}</th>
                                               <th 
                          className="hidden sm:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'gp')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gp}
                            <SortIcon sort={goalieSort} column="gp" />
                          </div>
                        </th>

                                               <th 
                          className="px-2 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'wins')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.record}
                            <SortIcon sort={goalieSort} column="wins" />
                          </div>
                        </th>

                                               <th 
                          className="px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'gaa')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.gaa}
                            <SortIcon sort={goalieSort} column="gaa" />
                          </div>
                        </th>

                                               <th 
                          className="px-3 md:px-4 py-3 text-center text-xs font-medium text-ng-light-blue uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'svPct')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.svPct}
                            <SortIcon sort={goalieSort} column="svPct" />
                          </div>
                        </th>

                                               <th 
                          className="hidden lg:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'shotsAgainst')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.shotsAgainst}
                            <SortIcon sort={goalieSort} column="shotsAgainst" />
                          </div>
                        </th>

                                               <th 
                          className="hidden lg:table-cell px-3 md:px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap cursor-pointer group"
                          onClick={() => handleSort(goalieSort, setGoalieSort, 'goalsAgainst')}
                        >
                          <div className="flex items-center justify-center">
                            {t.standings.goalsAgainstShort}
                            <SortIcon sort={goalieSort} column="goalsAgainst" />
                          </div>
                        </th>

                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-700">
                     {displayedGoalies.map((goalie, idx) => {
                       const gaa = goalie.gp > 0 ? (goalie.goalsAgainst / goalie.gp).toFixed(2) : '0.00';
                       const svPct = goalie.shotsAgainst > 0 ? ((goalie.shotsAgainst - goalie.goalsAgainst) / goalie.shotsAgainst).toFixed(3) : '.000';
                       return (
                        <tr key={goalie.id} className="hover:bg-ng-navy transition-colors">
                          <td className="px-1 md:px-4 py-3 text-sm text-gray-500 whitespace-nowrap text-center md:text-left">{idx + 1}</td>
                          <td className="px-3 md:px-4 py-3 text-sm font-bold text-white whitespace-nowrap text-left">
                            <div className="flex flex-col items-start">
                              <button onClick={() => setSelectedGoalie(goalie)} className="hover:text-ng-light-blue transition-colors outline-none text-left"><span>{goalie.name}</span></button>
                              <div className="sm:hidden flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] font-black italic mr-1.5" style={{ color: getTeamColor(goalie.teamId) }}>{getTeamName(goalie.teamId).substring(0, 1)}</span>
                                <span className="text-[10px] text-gray-500 font-medium uppercase">{getTeamName(goalie.teamId)}</span>
                              </div>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 md:px-4 py-3 text-sm text-gray-300 flex items-center gap-2 whitespace-nowrap">
                              <span className="text-[11px] font-black italic mr-2" style={{ color: getTeamColor(goalie.teamId) }}>{getTeamName(goalie.teamId).substring(0, 1)}</span>
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
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedTeam(null)}
        >
           <div 
             className="bg-ng-navy border border-gray-700 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300"
             onClick={(e) => e.stopPropagation()}
           >
              <div 
                className="p-6 relative overflow-hidden flex items-center justify-between"
                style={{ backgroundColor: `${selectedTeam.logoColor}20`, borderBottom: `2px solid ${selectedTeam.logoColor}` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-4xl font-black italic shrink-0" style={{ color: selectedTeam.logoColor }}>
                    {selectedTeam.name.substring(0, 1)}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-tight">{selectedTeam.name}</h2>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: t.standings.gp, val: selectedTeam.gp, icon: <LayoutList size={14} className="sm:w-4 sm:h-4" /> },
                    { label: t.standings.record, val: `${selectedTeam.wins}-${selectedTeam.losses}-${selectedTeam.ties}`, icon: <Trophy size={14} className="sm:w-4 sm:h-4" /> },
                    { label: t.standings.pts, val: selectedTeam.points, icon: <LayoutList size={14} className="sm:w-4 sm:h-4" /> },
                    { label: t.standings.diff, val: (selectedTeam.goalsFor - selectedTeam.goalsAgainst > 0 ? '+' : '') + (selectedTeam.goalsFor - selectedTeam.goalsAgainst), icon: <LayoutList size={14} className="sm:w-4 sm:h-4" /> },
                  ].map((stat, i) => (
                    <div key={i} className="bg-ng-blue/30 border border-gray-700 p-3 sm:p-4 rounded-xl text-center">
                      <div className="flex justify-center text-gray-500 mb-1">{stat.icon}</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-black text-white">{stat.val}</div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold text-gray-400 tracking-wider">{stat.label}</div>
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
                                <th 
                                  className="px-3 md:px-4 py-2 whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'name')}
                                >
                                  <div className="flex items-center">
                                    Name
                                    <SortIcon sort={teamGoalieSort} column="name" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'gp')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.gp}
                                    <SortIcon sort={teamGoalieSort} column="gp" />
                                  </div>
                                </th>
                                <th className="hidden sm:table-cell px-3 md:px-4 py-2 text-center whitespace-nowrap">{t.standings.record}</th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'gaa')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.gaa}
                                    <SortIcon sort={teamGoalieSort} column="gaa" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center text-ng-light-blue whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamGoalieSort, setTeamGoalieSort, 'svPct')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.svPct}
                                    <SortIcon sort={teamGoalieSort} column="svPct" />
                                  </div>
                                </th>
                                <th className="hidden md:table-cell px-3 md:px-4 py-2 text-center text-gray-500 whitespace-nowrap">{t.standings.shotsAgainst}</th>
                                <th className="hidden md:table-cell px-3 md:px-4 py-2 text-center text-gray-500 whitespace-nowrap">{t.standings.goalsAgainstShort}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {goalies.filter(g => g.teamId === selectedTeam.id).length > 0 ? (
                                [...goalies]
                                  .filter(g => g.teamId === selectedTeam.id)
                                  .sort((a, b) => {
                                    let valA: number, valB: number;
                                    if (teamGoalieSort.key === 'gaa') {
                                      valA = a.gp > 0 ? a.goalsAgainst / a.gp : 99;
                                      valB = b.gp > 0 ? b.goalsAgainst / b.gp : 99;
                                    } else if (teamGoalieSort.key === 'svPct') {
                                      valA = a.shotsAgainst > 0 ? (a.shotsAgainst - a.goalsAgainst) / a.shotsAgainst : 0;
                                      valB = b.shotsAgainst > 0 ? (b.shotsAgainst - b.goalsAgainst) / b.shotsAgainst : 0;
                                    } else if (typeof a[teamGoalieSort.key as keyof GoalieStats] === 'string') {
                                      const sA = a[teamGoalieSort.key as keyof GoalieStats] as string;
                                      const sB = b[teamGoalieSort.key as keyof GoalieStats] as string;
                                      return teamGoalieSort.dir === 'asc' ? sA.localeCompare(sB) : sB.localeCompare(sA);
                                    } else {
                                      valA = a[teamGoalieSort.key as keyof GoalieStats] as number;
                                      valB = b[teamGoalieSort.key as keyof GoalieStats] as number;
                                    }
                                    return teamGoalieSort.dir === 'asc' ? valA - valB : valB - valA;
                                  })
                                  .map(g => {
                                  const gaa = g.gp > 0 ? (g.goalsAgainst / g.gp).toFixed(2) : '0.00';
                                  const svPct = g.shotsAgainst > 0 ? ((g.shotsAgainst - g.goalsAgainst) / g.shotsAgainst).toFixed(3) : '.000';
                                  return (
                                    <tr key={g.id} className="bg-ng-light-blue/5 hover:bg-ng-light-blue/10 transition-colors">
                                      <td className="px-3 md:px-4 py-3 text-sm font-bold text-white flex items-center gap-2 whitespace-nowrap">
                                        <button 
                                          onClick={() => setSelectedGoalie(g)}
                                          className="flex items-center gap-2 hover:text-ng-light-blue transition-colors outline-none"
                                        >
                                          <span className="text-[8px] bg-ng-light-blue text-ng-navy px-1.5 py-0.5 rounded-sm font-black uppercase">G</span>
                                          {g.name}
                                        </button>
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
                                <th 
                                  className="px-3 md:px-4 py-2 whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'name')}
                                >
                                  <div className="flex items-center">
                                    {t.standings.player}
                                    <SortIcon sort={teamPlayerSort} column="name" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'gp')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.gp}
                                    <SortIcon sort={teamPlayerSort} column="gp" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'goals')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.goals}
                                    <SortIcon sort={teamPlayerSort} column="goals" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'assists')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.assists}
                                    <SortIcon sort={teamPlayerSort} column="assists" />
                                  </div>
                                </th>
                                <th 
                                  className="px-3 md:px-4 py-2 text-center text-ng-light-blue whitespace-nowrap cursor-pointer group"
                                  onClick={() => handleSort(teamPlayerSort, setTeamPlayerSort, 'points')}
                                >
                                  <div className="flex items-center justify-center">
                                    {t.standings.pts}
                                    <SortIcon sort={teamPlayerSort} column="points" />
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {players.filter(p => p.teamId === selectedTeam.id).length > 0 ? (
                                [...players]
                                  .filter(p => p.teamId === selectedTeam.id)
                                  .sort((a, b) => {
                                    const key = teamPlayerSort.key as keyof PlayerStats;
                                    let valA = a[key];
                                    let valB = b[key];
                                    if (typeof valA === 'string') {
                                      return teamPlayerSort.dir === 'asc' ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
                                    }
                                    return teamPlayerSort.dir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
                                  })
                                  .map(p => (
                                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-3 md:px-4 py-3 text-sm font-semibold text-white whitespace-nowrap">
                                      <button 
                                        onClick={() => setSelectedPlayer(p)}
                                        className="hover:text-ng-light-blue transition-colors outline-none"
                                      >
                                        {p.name}
                                      </button>
                                    </td>
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
                            <button 
                              key={g.id} 
                              onClick={() => {
                                setSelectedTeam(null);
                                navigate('/schedule', { state: { selectedGameId: g.id } });
                              }}
                              className="w-full text-left bg-ng-navy/50 p-3 sm:p-4 rounded-xl border border-gray-700 flex items-center justify-between relative overflow-hidden hover:border-ng-light-blue transition-all group"
                            >
                              {g.isPlayoff && (
                                <div className="absolute top-0 right-0">
                                  <div className="bg-ng-light-blue text-ng-navy text-[7px] sm:text-[8px] font-black px-1.5 sm:px-2 py-0.5 uppercase italic transform rotate-0">Playoffs</div>
                                </div>
                              )}
                              <div className="flex items-center gap-2 sm:gap-4">
                                <div className="text-center w-10 sm:w-12 border-r border-gray-700 pr-2 sm:pr-4">
                                  <div className="text-[10px] sm:text-xs font-black text-white">{formatDate(g.date).split(',')[0]}</div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase">{formatDate(g.date).split(',')[1]}</div>
                                </div>
                                <div>
                                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold">{isHome ? 'VS' : '@'} {opponentName}</div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-600 font-medium">{g.time} - {g.location}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                {g.status === 'played' ? (
                                  <div className="flex items-center gap-1.5 sm:gap-2">
                                    <span className={`text-[10px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded ${result === 'W' ? 'bg-green-500/20 text-green-400' : (result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400')}`}>{result}</span>
                                    <span className="text-xs sm:text-sm font-mono font-bold text-white whitespace-nowrap">{isHome ? `${g.homeScore}-${g.awayScore}` : `${g.awayScore}-${g.homeScore}`}</span>
                                  </div>
                                ) : (
                                  <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold">{t.schedule.scheduled}</span>
                                )}
                              </div>
                            </button>
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
      {/* Player Profile Modal */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPlayer(null)}
        >
           <div 
             className="bg-ng-navy border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300"
             onClick={(e) => e.stopPropagation()}
           >
              <div 
                className="p-8 relative overflow-hidden flex flex-col items-center text-center"
                style={{ backgroundColor: `${getTeamColor(selectedPlayer.teamId)}20`, borderBottom: `2px solid ${getTeamColor(selectedPlayer.teamId)}` }}
              >
                <button onClick={() => setSelectedPlayer(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                  <X size={24} />
                </button>
                
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-4" style={{ borderColor: getTeamColor(selectedPlayer.teamId), backgroundColor: getTeamColor(selectedPlayer.teamId) }}>
                  <span className="text-4xl font-black text-white italic pr-1">
                    {getTeamName(selectedPlayer.teamId).charAt(0)}
                  </span>
                </div>
                
                <h2 className="text-3xl font-black text-white uppercase italic leading-tight mb-1">{selectedPlayer.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white/10 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.player}</span>
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{getTeamName(selectedPlayer.teamId)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-ng-navy/50 p-4 rounded-xl border border-gray-700">
                    <div className="text-3xl font-black text-ng-light-blue">{selectedPlayer.points}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.points}</div>
                  </div>
                  <div className="bg-ng-navy/50 p-4 rounded-xl border border-gray-700">
                    <div className="text-3xl font-black text-white">#{sortedPlayers.findIndex(p => p.id === selectedPlayer.id) + 1}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.leagueRank}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{selectedPlayer.gp}</div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.gp}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{selectedPlayer.goals}</div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.goals}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{selectedPlayer.assists}</div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.assists}</div>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* Goalie Profile Modal */}
      {selectedGoalie && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedGoalie(null)}
        >
           <div 
             className="bg-ng-navy border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300"
             onClick={(e) => e.stopPropagation()}
           >
              <div 
                className="p-8 relative overflow-hidden flex flex-col items-center text-center"
                style={{ backgroundColor: `${getTeamColor(selectedGoalie.teamId)}20`, borderBottom: `2px solid ${getTeamColor(selectedGoalie.teamId)}` }}
              >
                <button onClick={() => setSelectedGoalie(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                  <X size={24} />
                </button>
                
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-4" style={{ borderColor: getTeamColor(selectedGoalie.teamId), backgroundColor: getTeamColor(selectedGoalie.teamId) }}>
                  <span className="text-4xl font-black text-white italic pr-1">
                    {getTeamName(selectedGoalie.teamId).charAt(0)}
                  </span>
                </div>
                
                <h2 className="text-3xl font-black text-white uppercase italic leading-tight mb-1">{selectedGoalie.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-ng-light-blue text-ng-navy text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{t.standings.goalie}</span>
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{getTeamName(selectedGoalie.teamId)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-ng-navy/50 p-4 rounded-xl border border-gray-700">
                    <div className="text-2xl font-black text-ng-light-blue">
                      {selectedGoalie.gp > 0 ? (selectedGoalie.goalsAgainst / selectedGoalie.gp).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.gaa}</div>
                  </div>
                  <div className="bg-ng-navy/50 p-4 rounded-xl border border-gray-700">
                    <div className="text-3xl font-black text-white">#{sortedGoalies.findIndex(g => g.id === selectedGoalie.id) + 1}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.leagueRank}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{selectedGoalie.gp}</div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.gp}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{selectedGoalie.wins}-{selectedGoalie.losses}-{selectedGoalie.draws}</div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.record}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {selectedGoalie.shotsAgainst > 0 ? ((selectedGoalie.shotsAgainst - selectedGoalie.goalsAgainst) / selectedGoalie.shotsAgainst).toFixed(3) : '.000'}
                  </div>
                  <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">{t.standings.svPct}</div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Standings;
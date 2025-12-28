import React, { useState, useMemo } from 'react';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { 
  RefreshCcw, 
  Trophy, 
  Calendar, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Lock, 
  ShieldCheck, 
  UserPlus, 
  Zap,
  Shield,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Search,
  Calculator,
  Download,
  Upload,
  AlertCircle,
  Database,
  Globe,
  ExternalLink,
  Save,
  Palette
} from 'lucide-react';
import { GameRecapData, Team, GameEvent } from '../types';

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', 
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', 
  '#f43f5e', '#64748b', '#ffffff', '#000000'
];

const Manager: React.FC = () => {
  const { 
    teams, 
    schedule, 
    players, 
    goalies,
    gameRecaps,
    setTeams, 
    setSchedule, 
    setPlayers, 
    setGoalies,
    setGameRecaps,
    resetData 
  } = useLeagueData();
  
  const [activeTab, setActiveTab] = useState<'schedule' | 'teams' | 'players' | 'goalies' | 'deployment'>('schedule');
  const [editingRecapId, setEditingRecapId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importValue, setImportValue] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '2505') setIsAuthorized(true);
    else alert('Incorrect passcode');
  };

  const filteredPlayers = useMemo(() => {
    return players.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [players, searchTerm]);

  const filteredGoalies = useMemo(() => {
    return goalies.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [goalies, searchTerm]);

  const isUsingLocalData = localStorage.getItem('ng_teams') !== null;

  if (!isAuthorized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-ng-blue/30 border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-ng-light-blue animate-pulse"></div>
          <div className="bg-ng-light-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-ng-light-blue" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">League Portal</h2>
          <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)} 
              placeholder="••••" 
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-4 text-center text-3xl tracking-[1em] text-white focus:ring-2 focus:ring-ng-light-blue focus:border-transparent outline-none" 
              autoFocus 
            />
            <button type="submit" className="w-full bg-ng-light-blue hover:bg-ng-accent text-ng-navy font-black py-4 rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-ng-light-blue/20 italic">
              <ShieldCheck size={20} /> Access Control
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ACTIONS ---
  const handleImport = () => {
    try {
      const cleanJson = importValue.replace('Please update constants.ts with:', '').trim();
      const data = JSON.parse(cleanJson);
      if (data.TEAMS) setTeams(data.TEAMS);
      if (data.SCHEDULE) setSchedule(data.SCHEDULE);
      if (data.ALL_PLAYERS) setPlayers(data.ALL_PLAYERS);
      if (data.GOALIE_STATS) setGoalies(data.GOALIE_STATS);
      if (data.GAME_RECAPS) setGameRecaps(data.GAME_RECAPS);
      alert('League Data Imported Successfully!');
      setShowImportModal(false);
      setImportValue('');
    } catch (e) {
      alert('Invalid Data Format.');
    }
  };

  const addGame = () => {
    const newGame = { id: `g_${Date.now()}`, date: new Date().toISOString().split('T')[0], time: '19:00', homeTeamId: teams[0]?.id || '1', awayTeamId: teams[1]?.id || '2', location: 'Sportium', status: 'scheduled' as const };
    setSchedule([...schedule, newGame]);
  };

  const removeGame = (id: string) => { if (window.confirm('Remove this game fixture?')) setSchedule(schedule.filter(g => g.id !== id)); };

  const addPlayer = () => {
    const newPlayer = { id: `p_${Date.now()}`, name: 'New Skater', teamId: teams[0]?.id || '1', goals: 0, assists: 0, points: 0 };
    setPlayers([...players, newPlayer]);
  };

  const addGoalie = () => {
    const newGoalie = { id: `goalie_${Date.now()}`, name: 'New Netminder', teamId: teams[0]?.id || '1', wins: 0, losses: 0, draws: 0, saves: 0, shotsAgainst: 0, goalsAgainst: 0 };
    setGoalies([...goalies, newGoalie]);
  };

  const startEditingRecap = (gameId: string) => {
    if (!gameRecaps[gameId]) {
      const newRecap: GameRecapData = { 
        gameId, 
        events: [], 
        goalieStats: { 
          homeGoalie: { name: '', shotsFaced: 0, saves: 0, goalsAgainst: 0 }, 
          awayGoalie: { name: '', shotsFaced: 0, saves: 0, goalsAgainst: 0 } 
        } 
      };
      setGameRecaps({ ...gameRecaps, [gameId]: newRecap });
    }
    setEditingRecapId(gameId);
  };

  const syncStandingsFromGames = () => {
    if (!window.confirm('Recalculate all standings from scratch?')) return;
    const newTeams = teams.map(team => ({ ...team, gp: 0, wins: 0, losses: 0, ties: 0, points: 0, goalsFor: 0, goalsAgainst: 0 }));
    schedule.filter(game => game.status === 'played' && game.homeScore !== undefined && game.awayScore !== undefined).forEach(game => {
      const homeTeam = newTeams.find(t => t.id === game.homeTeamId);
      const awayTeam = newTeams.find(t => t.id === game.awayTeamId);
      if (homeTeam && awayTeam) {
        homeTeam.gp++; awayTeam.gp++;
        homeTeam.goalsFor += Number(game.homeScore) || 0; homeTeam.goalsAgainst += Number(game.awayScore) || 0;
        awayTeam.goalsFor += Number(game.awayScore) || 0; awayTeam.goalsAgainst += Number(game.homeScore) || 0;
        if (game.homeScore! > game.awayScore!) { homeTeam.wins++; homeTeam.points += 2; awayTeam.losses++; }
        else if (game.homeScore! < game.awayScore!) { awayTeam.wins++; awayTeam.points += 2; homeTeam.losses++; }
        else { homeTeam.ties++; homeTeam.points += 1; awayTeam.ties++; awayTeam.points += 1; }
      }
    });
    setTeams(newTeams);
    alert('Standings Synchronized.');
  };

  const handleGameUpdate = (gameId: string, field: string, value: any) => { setSchedule(schedule.map(g => g.id === gameId ? { ...g, [field]: value } : g)); };
  const handleTeamUpdate = (teamId: string, field: string, value: any) => { setTeams(teams.map(t => t.id === teamId ? { ...t, [field]: value } : t)); };
  const handlePlayerUpdate = (playerId: string, field: string, value: any) => { 
    setPlayers(players.map(p => {
      if (p.id === playerId) {
        const updated = { ...p, [field]: value };
        updated.points = (Number(updated.goals) || 0) + (Number(updated.assists) || 0);
        return updated;
      }
      return p;
    }));
  };
  const handleGoalieUpdate = (goalieId: string, field: string, value: any) => { 
    setGoalies(goalies.map(g => {
      if (g.id === goalieId) {
        const updated = { ...g, [field]: value };
        updated.saves = (Number(updated.shotsAgainst) || 0) - (Number(updated.goalsAgainst) || 0);
        return updated;
      }
      return g;
    }));
  };

  const generateExport = () => {
    const data = { TEAMS: teams, SCHEDULE: schedule, ALL_PLAYERS: players, GOALIE_STATS: goalies, GAME_RECAPS: gameRecaps };
    navigator.clipboard.writeText(`import { Team, Game, PlayerStats, GoalieStats, GameRecapData } from './types';\n\nexport const EMAILJS_CONFIG = { SERVICE_ID: 'service_o7zd8ri', PUBLIC_KEY: 'HViFUqA9NIBXgSDaO', CONTACT_TEMPLATE_ID: 'template_ysbjhgn', REGISTRATION_TEMPLATE_ID: 'template_efmg0t4' };\n\nexport const TEAMS: Team[] = ${JSON.stringify(teams, null, 2)};\n\nexport const SCHEDULE: Game[] = ${JSON.stringify(schedule, null, 2)};\n\nexport const ALL_PLAYERS: PlayerStats[] = ${JSON.stringify(players, null, 2)};\n\nexport const GOALIE_STATS: GoalieStats[] = ${JSON.stringify(goalies, null, 2)};\n\nexport const GAME_RECAPS: Record<string, GameRecapData> = ${JSON.stringify(gameRecaps, null, 2)};\n\nexport const SYSTEM_INSTRUCTION = \`You are the "League Assistant" for Next Gen Hockey...\`;`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const updateRecap = (field: string, subField: string, value: any) => {
    if (!editingRecapId) return;
    const current = gameRecaps[editingRecapId];
    const updated = { ...current };
    if (field === 'goalieStats') {
        // @ts-ignore
        updated.goalieStats[subField] = { ...updated.goalieStats[subField], ...value };
    }
    setGameRecaps({ ...gameRecaps, [editingRecapId]: updated });
  };

  const addEvent = () => {
    if (!editingRecapId) return;
    const current = gameRecaps[editingRecapId];
    const newEvent: GameEvent = { id: `e_${Date.now()}`, type: 'goal', period: 1, time: '0:00', teamId: teams[0].id, player: '', assist: '' };
    setGameRecaps({ ...gameRecaps, [editingRecapId]: { ...current, events: [...current.events, newEvent] } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Global Status Bar */}
      <div className={`mb-8 p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${isUsingLocalData ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-green-500/10 border-green-500/50'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isUsingLocalData ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
             {isUsingLocalData ? <AlertCircle className="text-yellow-500" size={20} /> : <Database className="text-green-500" size={20} />}
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-tight">
              Status: {isUsingLocalData ? 'Working on Local Draft' : 'Viewing Production Data'}
            </p>
            <p className="text-xs text-gray-500">
              {isUsingLocalData 
                ? 'Your changes are saved locally. Export and update constants.ts to publish.' 
                : 'Any changes you make now will be saved to your local draft.'}
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={() => setShowImportModal(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2 px-4 rounded-lg border border-gray-600 transition-all uppercase tracking-widest"><Upload size={14} /> Import State</button>
          <button onClick={generateExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-ng-light-blue hover:bg-ng-accent text-ng-navy text-xs font-black py-2 px-6 rounded-lg transition-all uppercase tracking-widest shadow-lg italic">
            {copied ? <Check size={14} /> : <Download size={14} />} {copied ? 'Copied' : 'Export & Publish'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">League Control Center</h1>
          <p className="text-gray-400">Manage fixtures, teams, and player metrics for the Next Gen Hockey League.</p>
        </div>
        <button onClick={() => { if(window.confirm('Discard local draft and sync with project defaults?')) resetData(); }} className="flex items-center bg-gray-900 hover:bg-red-900/20 text-gray-500 hover:text-red-400 py-2 px-4 rounded-lg transition-all border border-gray-800 text-xs font-bold uppercase tracking-widest"><RefreshCcw size={14} className="mr-2" /> Reset Local Draft</button>
      </div>

      {editingRecapId ? (
        <div className="bg-ng-blue/30 rounded-xl border border-ng-light-blue p-6 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setEditingRecapId(null)} className="flex items-center text-ng-light-blue hover:text-white font-bold uppercase tracking-widest text-xs transition-colors"><ArrowLeft size={18} className="mr-2" /> Exit Recap Editor</button>
            <h2 className="text-white font-black italic uppercase">Game Recap Details</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Scoring Events */}
             <div className="bg-ng-navy/50 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold uppercase text-sm tracking-widest">Scoring Summary</h3>
                    <button onClick={addEvent} className="bg-ng-light-blue text-ng-navy p-1 px-3 rounded text-[10px] font-black">+ ADD GOAL</button>
                </div>
                <div className="space-y-3">
                    {gameRecaps[editingRecapId]?.events.map((event, idx) => (
                        <div key={event.id} className="grid grid-cols-4 gap-2 bg-gray-800 p-2 rounded items-center">
                            <input type="text" placeholder="Time" value={event.time} onChange={(e) => {
                                const evs = [...gameRecaps[editingRecapId].events];
                                evs[idx].time = e.target.value;
                                setGameRecaps({...gameRecaps, [editingRecapId]: {...gameRecaps[editingRecapId], events: evs}});
                            }} className="bg-gray-900 text-white text-xs p-1 rounded" />
                            <select value={event.teamId} onChange={(e) => {
                                const evs = [...gameRecaps[editingRecapId].events];
                                evs[idx].teamId = e.target.value;
                                setGameRecaps({...gameRecaps, [editingRecapId]: {...gameRecaps[editingRecapId], events: evs}});
                            }} className="bg-gray-900 text-white text-xs p-1 rounded">
                                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                            <input type="text" placeholder="Scorer" value={event.player} onChange={(e) => {
                                const evs = [...gameRecaps[editingRecapId].events];
                                evs[idx].player = e.target.value;
                                setGameRecaps({...gameRecaps, [editingRecapId]: {...gameRecaps[editingRecapId], events: evs}});
                            }} className="bg-gray-900 text-white text-xs p-1 rounded" />
                            <button onClick={() => {
                                const evs = gameRecaps[editingRecapId].events.filter((_, i) => i !== idx);
                                setGameRecaps({...gameRecaps, [editingRecapId]: {...gameRecaps[editingRecapId], events: evs}});
                            }} className="text-red-500 text-xs">DEL</button>
                        </div>
                    ))}
                </div>
             </div>

             {/* Goalie Stats for Recap */}
             <div className="bg-ng-navy/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-white font-bold uppercase text-sm tracking-widest mb-4 text-center">Goalie Performances</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['homeGoalie', 'awayGoalie'].map((side) => (
                        <div key={side} className="space-y-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <p className="text-[10px] font-black text-gray-500 uppercase">{side === 'homeGoalie' ? 'Home Netminder' : 'Away Netminder'}</p>
                            <input type="text" placeholder="Name" value={(gameRecaps[editingRecapId].goalieStats as any)[side].name} onChange={(e) => updateRecap('goalieStats', side, { name: e.target.value })} className="w-full bg-gray-900 text-white text-xs p-2 rounded" />
                            <div className="grid grid-cols-2 gap-2">
                                <div><label className="text-[8px] text-gray-500 uppercase">Shots</label><input type="number" value={(gameRecaps[editingRecapId].goalieStats as any)[side].shotsFaced} onChange={(e) => updateRecap('goalieStats', side, { shotsFaced: parseInt(e.target.value) || 0 })} className="w-full bg-gray-900 text-white text-xs p-2 rounded" /></div>
                                <div><label className="text-[8px] text-gray-500 uppercase">Saves</label><input type="number" value={(gameRecaps[editingRecapId].goalieStats as any)[side].saves} onChange={(e) => updateRecap('goalieStats', side, { saves: parseInt(e.target.value) || 0 })} className="w-full bg-gray-900 text-white text-xs p-2 rounded" /></div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-ng-blue/30 rounded-xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
          <div className="flex border-b border-gray-700 bg-ng-navy/50">
            {['schedule', 'teams', 'players', 'goalies', 'deployment'].map((tab: any) => (
              <button key={tab} onClick={() => { setActiveTab(tab); setSearchTerm(''); }} className={`flex-1 py-5 font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === tab ? 'text-ng-light-blue bg-ng-light-blue/10 border-b-4 border-ng-light-blue' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>{tab}</button>
            ))}
          </div>
          <div className="p-8 flex-1">
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-ng-navy/40 p-4 rounded-xl border border-gray-700">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Season Fixtures</span>
                  <button onClick={addGame} className="bg-green-600 hover:bg-green-500 text-white font-black py-2.5 px-6 rounded-lg text-xs flex items-center gap-2 transition-all shadow-lg active:scale-95"><Plus size={18} /> Schedule Match</button>
                </div>
                <div className="grid gap-4">
                  {schedule.map(game => (
                    <div key={game.id} className="bg-ng-navy/50 border border-gray-700 p-5 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center hover:border-gray-500 transition-colors">
                      <div className="space-y-2">
                         <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Date & Time</label>
                         <div className="flex gap-2"><input type="date" value={game.date} onChange={(e) => handleGameUpdate(game.id, 'date', e.target.value)} className="bg-gray-800 border-gray-700 rounded-lg p-2 text-xs text-white flex-1" /><input type="time" value={game.time} onChange={(e) => handleGameUpdate(game.id, 'time', e.target.value)} className="bg-gray-800 border-gray-700 rounded-lg p-2 text-xs text-white flex-1" /></div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Scoreboard</label>
                         <div className="flex items-center gap-2"><select value={game.homeTeamId} onChange={(e) => handleGameUpdate(game.id, 'homeTeamId', e.target.value)} className="flex-1 bg-gray-800 border-gray-700 rounded-lg p-2 text-xs text-white">{teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select><input type="number" placeholder="0" value={game.homeScore ?? ''} onChange={(e) => handleGameUpdate(game.id, 'homeScore', e.target.value === '' ? undefined : parseInt(e.target.value))} className="w-12 bg-gray-900 border-gray-700 rounded-lg p-2 text-center text-xs" /></div>
                         <div className="flex items-center gap-2"><select value={game.awayTeamId} onChange={(e) => handleGameUpdate(game.id, 'awayTeamId', e.target.value)} className="flex-1 bg-gray-800 border-gray-700 rounded-lg p-2 text-xs text-white">{teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select><input type="number" placeholder="0" value={game.awayScore ?? ''} onChange={(e) => handleGameUpdate(game.id, 'awayScore', e.target.value === '' ? undefined : parseInt(e.target.value))} className="w-12 bg-gray-900 border-gray-700 rounded-lg p-2 text-center text-xs" /></div>
                      </div>
                      <div className="flex flex-col gap-3 md:items-end">
                         <div className="flex items-center gap-2">
                           <button onClick={() => handleGameUpdate(game.id, 'status', game.status === 'played' ? 'scheduled' : 'played')} className={`flex items-center gap-2 px-5 py-2 rounded-lg border text-[10px] font-black uppercase transition-all ${game.status === 'played' ? 'bg-green-600 text-white border-green-500' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>{game.status === 'played' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />} {game.status === 'played' ? 'Played' : 'Draft'}</button>
                           <button onClick={() => removeGame(game.id)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                         </div>
                         {game.status === 'played' && <button onClick={() => startEditingRecap(game.id)} className="bg-ng-light-blue hover:bg-ng-accent text-ng-navy font-black px-4 py-2 rounded-lg text-[10px] uppercase italic">Scoring Details</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'teams' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-ng-navy/40 p-4 rounded-xl border border-gray-700">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">Standings Logic</span>
                  <button onClick={syncStandingsFromGames} className="bg-ng-light-blue text-ng-navy font-black py-2 px-6 rounded-lg text-xs flex items-center gap-2 transition-all active:scale-95"><RefreshCcw size={16} /> Auto-Sync Results</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase text-gray-500 border-b border-gray-700">
                                <th className="p-3">Team Name</th>
                                <th className="p-3">Color</th>
                                <th className="p-3 text-center">W</th>
                                <th className="p-3 text-center">L</th>
                                <th className="p-3 text-center">T</th>
                                <th className="p-3 text-center">PTS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {teams.map(team => (
                                <tr key={team.id} className="hover:bg-white/5">
                                    <td className="p-3"><input type="text" value={team.name} onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value)} className="bg-transparent border-none text-white text-xs focus:ring-1 focus:ring-ng-light-blue rounded p-1" /></td>
                                    <td className="p-3">
                                        <div className="flex gap-1 flex-wrap w-24">
                                            {COLORS.slice(0, 8).map(c => (
                                                <button key={c} onClick={() => handleTeamUpdate(team.id, 'logoColor', c)} className={`w-4 h-4 rounded-full border border-black ${team.logoColor === c ? 'ring-2 ring-white' : ''}`} style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-3 text-center"><input type="number" value={team.wins} onChange={(e) => handleTeamUpdate(team.id, 'wins', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                    <td className="p-3 text-center"><input type="number" value={team.losses} onChange={(e) => handleTeamUpdate(team.id, 'losses', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                    <td className="p-3 text-center"><input type="number" value={team.ties} onChange={(e) => handleTeamUpdate(team.id, 'ties', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                    <td className="p-3 text-center"><input type="number" value={team.points} onChange={(e) => handleTeamUpdate(team.id, 'points', parseInt(e.target.value))} className="w-10 bg-ng-light-blue/20 border-none text-ng-light-blue font-bold text-xs text-center rounded" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            )}
            {activeTab === 'players' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-ng-navy/40 p-4 rounded-xl border border-gray-700">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search players..." className="w-full bg-gray-900 border-gray-700 rounded-lg pl-10 pr-4 py-2 text-xs text-white" />
                  </div>
                  <button onClick={addPlayer} className="bg-ng-light-blue text-ng-navy font-black py-2 px-6 rounded-lg text-xs flex items-center gap-2 uppercase italic"><UserPlus size={16} /> New Player</button>
                </div>
                <div className="overflow-x-auto max-h-[600px]">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-ng-navy z-10">
                            <tr className="text-[10px] font-black uppercase text-gray-500 border-b border-gray-700">
                                <th className="p-3">Player Name</th>
                                <th className="p-3">Team</th>
                                <th className="p-3 text-center">G</th>
                                <th className="p-3 text-center">A</th>
                                <th className="p-3 text-center">PTS</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredPlayers.map(p => (
                                <tr key={p.id} className="hover:bg-white/5">
                                    <td className="p-3"><input type="text" value={p.name} onChange={(e) => handlePlayerUpdate(p.id, 'name', e.target.value)} className="bg-transparent border-none text-white text-xs p-1 rounded" /></td>
                                    <td className="p-3">
                                        <select value={p.teamId} onChange={(e) => handlePlayerUpdate(p.id, 'teamId', e.target.value)} className="bg-gray-900 border-none text-gray-300 text-[10px] rounded p-1">
                                            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-3 text-center"><input type="number" value={p.goals} onChange={(e) => handlePlayerUpdate(p.id, 'goals', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                    <td className="p-3 text-center"><input type="number" value={p.assists} onChange={(e) => handlePlayerUpdate(p.id, 'assists', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                    <td className="p-3 text-center text-ng-light-blue font-bold text-xs">{p.points}</td>
                                    <td className="p-3 text-right">
                                        <button onClick={() => setPlayers(players.filter(x => x.id !== p.id))} className="text-gray-700 hover:text-red-500"><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            )}
            {activeTab === 'goalies' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-ng-navy/40 p-4 rounded-xl border border-gray-700">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest italic">Goalie Matrix</span>
                  <button onClick={addGoalie} className="bg-ng-light-blue text-ng-navy font-black py-2 px-6 rounded-lg text-xs flex items-center gap-2 uppercase italic"><Shield size={16} /> New Goalie</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase text-gray-500 border-b border-gray-700">
                                <th className="p-3">Name</th>
                                <th className="p-3">Team</th>
                                <th className="p-3 text-center">W</th>
                                <th className="p-3 text-center">SA</th>
                                <th className="p-3 text-center">GA</th>
                                <th className="p-3 text-center">SV%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredGoalies.map(g => {
                                const svPct = g.shotsAgainst > 0 ? ((g.shotsAgainst - g.goalsAgainst) / g.shotsAgainst).toFixed(3) : '.000';
                                return (
                                    <tr key={g.id} className="hover:bg-white/5">
                                        <td className="p-3"><input type="text" value={g.name} onChange={(e) => handleGoalieUpdate(g.id, 'name', e.target.value)} className="bg-transparent border-none text-white text-xs p-1 rounded" /></td>
                                        <td className="p-3">
                                            <select value={g.teamId} onChange={(e) => handleGoalieUpdate(g.id, 'teamId', e.target.value)} className="bg-gray-900 border-none text-gray-300 text-[10px] rounded p-1">
                                                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="p-3 text-center"><input type="number" value={g.wins} onChange={(e) => handleGoalieUpdate(g.id, 'wins', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                        <td className="p-3 text-center"><input type="number" value={g.shotsAgainst} onChange={(e) => handleGoalieUpdate(g.id, 'shotsAgainst', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                        <td className="p-3 text-center"><input type="number" value={g.goalsAgainst} onChange={(e) => handleGoalieUpdate(g.id, 'goalsAgainst', parseInt(e.target.value))} className="w-10 bg-gray-900 border-none text-white text-xs text-center rounded" /></td>
                                        <td className="p-3 text-center text-ng-light-blue font-bold text-xs">{svPct}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
              </div>
            )}
            {activeTab === 'deployment' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="bg-ng-navy/50 p-8 rounded-2xl border border-gray-700 shadow-xl">
                  <h3 className="text-2xl font-black text-white uppercase italic mb-6 flex items-center gap-3">
                    <Globe className="text-ng-light-blue" /> Hosting & Deployment Guide
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="bg-ng-light-blue/20 w-10 h-10 rounded-xl flex items-center justify-center font-black text-ng-light-blue shrink-0">1</div>
                        <div>
                          <h4 className="text-white font-bold mb-1">Upload Code to GitHub</h4>
                          <p className="text-gray-400 text-sm">Download your project folder and push it to a private or public GitHub repository. This is the "Source of Truth" for your website.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="bg-ng-light-blue/20 w-10 h-10 rounded-xl flex items-center justify-center font-black text-ng-light-blue shrink-0">2</div>
                        <div>
                          <h4 className="text-white font-bold mb-1">Connect to Vercel</h4>
                          <p className="text-gray-400 text-sm">Go to <a href="https://vercel.com" target="_blank" className="text-ng-light-blue underline">Vercel</a>, create an account, and connect your GitHub repo. It will build automatically.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="bg-ng-light-blue/20 w-10 h-10 rounded-xl flex items-center justify-center font-black text-ng-light-blue shrink-0">3</div>
                        <div>
                          <h4 className="text-white font-bold mb-1">Add AI API Key</h4>
                          <p className="text-gray-400 text-sm">In Vercel Settings, add <span className="text-white font-mono bg-gray-800 px-1">API_KEY</span> as an Environment Variable for the Gemini Assistant.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-ng-blue/30 p-6 rounded-xl border border-ng-light-blue/20">
                       <h4 className="text-ng-light-blue font-black uppercase text-xs mb-4 flex items-center gap-2"><Save size={14} /> Publication Workflow</h4>
                       <ul className="space-y-4">
                         <li className="flex items-start gap-3">
                           <Check className="text-green-500 shrink-0 mt-1" size={16} />
                           <p className="text-xs text-gray-300">Open this Manager on your live URL.</p>
                         </li>
                         <li className="flex items-start gap-3">
                           <Check className="text-green-500 shrink-0 mt-1" size={16} />
                           <p className="text-xs text-gray-300">Update scores and click <span className="text-white font-bold">Auto-Sync Results</span>.</p>
                         </li>
                         <li className="flex items-start gap-3">
                           <Check className="text-green-500 shrink-0 mt-1" size={16} />
                           <p className="text-xs text-gray-300">Click <span className="text-white font-bold">Export & Publish</span>.</p>
                         </li>
                         <li className="flex items-start gap-3">
                           <Check className="text-green-500 shrink-0 mt-1" size={16} />
                           <p className="text-xs text-gray-300">Paste the copied code into your <span className="text-white font-mono italic">constants.ts</span> file and push to GitHub.</p>
                         </li>
                       </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <div className="bg-ng-navy border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl p-8 flex flex-col relative animate-in zoom-in duration-300">
              <h2 className="text-2xl font-black text-white uppercase italic mb-4 flex items-center gap-2"><Upload className="text-ng-light-blue" /> Import League State</h2>
              <textarea 
                value={importValue}
                onChange={(e) => setImportValue(e.target.value)}
                placeholder="Paste code from constants.ts or a previous export..."
                className="w-full h-64 bg-gray-800 border border-gray-600 rounded-xl p-4 text-xs font-mono text-gray-300 outline-none resize-none mb-6"
              />
              <div className="flex gap-4">
                <button onClick={() => setShowImportModal(false)} className="flex-1 py-4 bg-gray-700 text-white font-bold rounded-xl text-xs">Cancel</button>
                <button onClick={handleImport} className="flex-1 py-4 bg-ng-light-blue text-ng-navy font-black rounded-xl text-xs">Apply Import</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
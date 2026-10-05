export interface SoccerTeam {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  color: string;
  secondaryColor?: string;
  division: string;
}

export interface SoccerGoalEvent {
  teamId: string;
  scorer: string;
  number?: number;
  assists?: string[];
}

export interface SoccerCardEvent {
  teamId: string;
  player: string;
  number?: number;
  type: 'yellow' | 'red';
}

export interface SoccerMatchRecap {
  summaryEn: string;
  summaryFr: string;
  goals: SoccerGoalEvent[];
  cards: SoccerCardEvent[];
  homeRoster: { number?: number; name: string; isGoalie?: boolean; isSub?: boolean }[];
  awayRoster: { number?: number; name: string; isGoalie?: boolean; isSub?: boolean }[];
}

export interface SoccerMatch {
  id: string;
  date: string;
  time: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  pitch: string;
  location: string;
  status: 'upcoming' | 'completed' | 'live';
  homeScore?: number;
  awayScore?: number;
  division: string;
  week: number;
  recap?: SoccerMatchRecap;
}

export interface SoccerRosterPlayer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  teamId: string;
}

export interface SoccerPlayerStat {
  id: string;
  name: string;
  teamName: string;
  teamId: string;
  teamIds?: string[];
  teamNames?: string[];
  secondaryTeamId?: string;
  secondaryTeamName?: string;
  number?: number;
  gp: number;
  goals: number;
  assists: number;
  points: number;
  yellowCards: number;
  redCards: number;
}

export interface SoccerTeamStanding {
  teamId: string;
  teamName: string;
  gp: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

export interface SoccerRuleItem {
  en: string;
  fr: string;
  detailEn?: string;
  detailFr?: string;
  subheadingEn?: string;
  subheadingFr?: string;
  badgeEn?: string;
  badgeFr?: string;
  badgeType?: 'yellow' | 'red' | 'orange' | 'lime' | 'blue' | 'zinc';
}

export interface SoccerRuleCategory {
  id: string;
  titleEn: string;
  titleFr: string;
  icon: string;
  rules: SoccerRuleItem[];
}

export const SOCCER_CURRENT_SEASON = {
  id: 'fall_2026',
  nameEn: 'Fall 2026',
  nameFr: 'Automne 2026',
  startDate: '2026-10-04',
  location: 'Complexe Sportif Delson | Sainte-Catherine',
  address: '75 Bd Georges Gagné N, Delson, QC J5B 2E5',
  registrationOpen: true,
  formatEn: '7 vs 7 Turf League (6 Outfield + 1 Goalkeeper)',
  formatFr: 'Ligue Synthétique 7 c 7 (6 Joueurs + 1 Gardien)',
};

export const SOCCER_TEAMS: SoccerTeam[] = [
  {
    id: 's_faahh_united',
    name: 'Faah United',
    shortName: 'FU',
    color: '#6b7280',
    secondaryColor: '#22c55e',
    division: '7v7 Open'
  },
  {
    id: 's_turf_terrors',
    name: 'Turf Terrors',
    shortName: 'TT',
    color: '#16a34a',
    division: '7v7 Open'
  },
  {
    id: 's_blackjacks',
    name: 'BlackJacks',
    shortName: 'BJ',
    color: '#0a0a0a',
    secondaryColor: '#22c55e',
    division: '7v7 Open'
  },
  {
    id: 's_team_4',
    name: 'Mumford & Sons',
    shortName: 'M&S',
    color: '#ffffff',
    division: '7v7 Open'
  }
];

export const SOCCER_STANDINGS: SoccerTeamStanding[] = [
  { teamId: 's_team_4', teamName: 'Mumford & Sons', gp: 1, wins: 1, draws: 0, losses: 0, gf: 12, ga: 3, gd: 9, pts: 3 },
  { teamId: 's_faahh_united', teamName: 'Faah United', gp: 1, wins: 1, draws: 0, losses: 0, gf: 7, ga: 2, gd: 5, pts: 3 },
  { teamId: 's_turf_terrors', teamName: 'Turf Terrors', gp: 1, wins: 0, draws: 0, losses: 1, gf: 2, ga: 7, gd: -5, pts: 0 },
  { teamId: 's_blackjacks', teamName: 'BlackJacks', gp: 1, wins: 0, draws: 0, losses: 1, gf: 3, ga: 12, gd: -9, pts: 0 }
];

export const SOCCER_ROSTERS: Record<string, SoccerRosterPlayer[]> = {
  s_faahh_united: [
    { id: 'fu_1', firstName: 'Michael-Joseph', lastName: 'Primiani', name: 'Michael-Joseph Primiani', teamId: 's_faahh_united' },
    { id: 'fu_2', firstName: 'Gabriel', lastName: 'Savard', name: 'Gabriel Savard', teamId: 's_faahh_united' },
    { id: 'fu_3', firstName: 'Éliane', lastName: 'Martel', name: 'Éliane Martel', teamId: 's_faahh_united' },
    { id: 'fu_4', firstName: 'Benjamin', lastName: 'St-Cyr', name: 'Benjamin St-Cyr', teamId: 's_faahh_united' },
    { id: 'fu_5', firstName: 'Todd', lastName: 'Mumford', name: 'Todd Mumford', teamId: 's_faahh_united' },
    { id: 'fu_6', firstName: 'Simon', lastName: 'Yelle', name: 'Simon Yelle', teamId: 's_faahh_united' },
    { id: 'fu_7', firstName: 'Meagan', lastName: 'St-Cyr', name: 'Meagan St-Cyr', teamId: 's_faahh_united' },
    { id: 'fu_8', firstName: 'Thomas', lastName: 'Yelle', name: 'Thomas Yelle', teamId: 's_faahh_united' },
    { id: 'fu_9', firstName: 'Simon', lastName: 'Berthiaume', name: 'Simon Berthiaume', teamId: 's_faahh_united' },
    { id: 'fu_10', firstName: 'Alessandro', lastName: 'Primiani', name: 'Alessandro Primiani', teamId: 's_faahh_united' },
    { id: 'fu_11', firstName: 'Meagan', lastName: 'Boutler', name: 'Meagan Boutler', teamId: 's_faahh_united' },
    { id: 'fu_12', firstName: 'Ismaele', lastName: 'Rusconi', name: 'Ismaele Rusconi', teamId: 's_faahh_united' },
  ],
  s_blackjacks: [
    { id: 'bj_1', firstName: 'Nicolas', lastName: 'Primiani', name: 'Nicolas Primiani', teamId: 's_blackjacks' },
    { id: 'bj_2', firstName: 'Moustapha', lastName: 'Amar', name: 'Moustapha Amar', teamId: 's_blackjacks' },
    { id: 'bj_3', firstName: 'Nathan', lastName: 'Essono', name: 'Nathan Essono', teamId: 's_blackjacks' },
    { id: 'bj_4', firstName: 'Amelia', lastName: 'Benabid', name: 'Amelia Benabid', teamId: 's_blackjacks' },
    { id: 'bj_5', firstName: 'Émy', lastName: 'Larivière', name: 'Émy Larivière', teamId: 's_blackjacks' },
    { id: 'bj_6', firstName: 'Alessandro', lastName: 'Primiani', name: 'Alessandro Primiani', teamId: 's_blackjacks' },
    { id: 'bj_7', firstName: 'Meagan', lastName: 'Boutler', name: 'Meagan Boutler', teamId: 's_blackjacks' },
    { id: 'bj_8', firstName: 'Brandon', lastName: 'De Sousa', name: 'Brandon De Sousa', teamId: 's_blackjacks' },
    { id: 'bj_9', firstName: 'Charlotte', lastName: 'Soucy', name: 'Charlotte Soucy', teamId: 's_blackjacks' },
    { id: 'bj_10', firstName: 'Brenden', lastName: 'Thomas-Bynoe', name: 'Brenden Thomas-Bynoe', teamId: 's_blackjacks' },
  ],
  s_turf_terrors: [
    { id: 'tt_1', firstName: 'Evan', lastName: 'Sinclair', name: 'Evan Sinclair', teamId: 's_turf_terrors' },
    { id: 'tt_2', firstName: 'Zachary', lastName: 'Bailey', name: 'Zachary Bailey', teamId: 's_turf_terrors' },
    { id: 'tt_3', firstName: 'Joshua', lastName: 'Bubis', name: 'Joshua Bubis', teamId: 's_turf_terrors' },
    { id: 'tt_4', firstName: 'Benjamin', lastName: 'Morton', name: 'Benjamin Morton', teamId: 's_turf_terrors' },
    { id: 'tt_5', firstName: 'Timothy', lastName: 'Gilmore', name: 'Timothy Gilmore', teamId: 's_turf_terrors' },
    { id: 'tt_6', firstName: 'Jean Luc', lastName: 'Feliciano', name: 'Jean Luc Feliciano', teamId: 's_turf_terrors' },
    { id: 'tt_7', firstName: 'Phenix', lastName: 'Mangerpan', name: 'Phenix Mangerpan', teamId: 's_turf_terrors' },
    { id: 'tt_8', firstName: 'Tristan', lastName: 'Snowden', name: 'Tristan Snowden', teamId: 's_turf_terrors' },
    { id: 'tt_9', firstName: 'Abigael', lastName: 'O\'Rourke', name: 'Abigael O\'Rourke', teamId: 's_turf_terrors' },
    { id: 'tt_10', firstName: 'Ciera', lastName: 'MacDavid', name: 'Ciera MacDavid', teamId: 's_turf_terrors' },
    { id: 'tt_11', firstName: 'Shawn', lastName: 'Chiniah', name: 'Shawn Chiniah', teamId: 's_turf_terrors' },
    { id: 'tt_12', firstName: 'Lydia', lastName: 'Côté', name: 'Lydia Côté', teamId: 's_turf_terrors' },
  ],
  s_team_4: [
    { id: 't4_1', firstName: 'Alexandre', lastName: 'Stefanson', name: 'Alexandre Stefanson', teamId: 's_team_4' },
    { id: 't4_2', firstName: 'Calvin', lastName: 'Watt', name: 'Calvin Watt', teamId: 's_team_4' },
    { id: 't4_3', firstName: 'Todd', lastName: 'Mumford', name: 'Todd Mumford', teamId: 's_team_4' },
    { id: 't4_4', firstName: 'Simon', lastName: 'Yelle', name: 'Simon Yelle', teamId: 's_team_4' },
    { id: 't4_5', firstName: 'Michael-Joseph', lastName: 'Primiani', name: 'Michael-Joseph Primiani', teamId: 's_team_4' },
    { id: 't4_6', firstName: 'Alexis', lastName: 'Watt', name: 'Alexis Watt', teamId: 's_team_4' },
    { id: 't4_7', firstName: 'Pierre-Luc', lastName: 'Tremblay', name: 'Pierre-Luc Tremblay', teamId: 's_team_4' },
    { id: 't4_8', firstName: 'Gabriel', lastName: 'Savard', name: 'Gabriel Savard', teamId: 's_team_4' },
    { id: 't4_9', firstName: 'Éliane', lastName: 'Martel', name: 'Éliane Martel', teamId: 's_team_4' },
    { id: 't4_10', firstName: 'Ismaele', lastName: 'Rusconi', name: 'Ismaele Rusconi', teamId: 's_team_4' },
    { id: 't4_11', firstName: 'Nolan', lastName: 'Snowman', name: 'Nolan Snowman', teamId: 's_team_4' },
  ]
};

export const ALL_SOCCER_PLAYERS: SoccerRosterPlayer[] = Object.values(SOCCER_ROSTERS).flat();

const RECORDED_PLAYER_STATS: Record<string, { gp: number; goals: number; assists: number; yellowCards?: number; redCards?: number }> = {
  // Game 1 (Oct 4, 8:00 PM: Turf Terrors 2 - 7 Faah United) & Game 2 (Oct 4, 9:00 PM: Mumford & Sons 12 - 3 BlackJacks)
  'ismaele rusconi': { gp: 2, goals: 5, assists: 0 },
  'alexandre stefanson': { gp: 1, goals: 4, assists: 0 },
  'nolan snowman': { gp: 1, goals: 4, assists: 0 },
  'michael-joseph primiani': { gp: 2, goals: 3, assists: 0 },
  'moustapha amar': { gp: 1, goals: 1, assists: 2 },
  'meagan boutler': { gp: 2, goals: 1, assists: 2 },
  'simon berthiaume': { gp: 1, goals: 2, assists: 0 },
  'simon yelle': { gp: 2, goals: 1, assists: 0 },
  'benjamin morton': { gp: 1, goals: 1, assists: 0 },
  'timothy gilmore': { gp: 1, goals: 1, assists: 0 },
  'brenden thomas-bynoe': { gp: 1, goals: 1, assists: 0 },
  'nathan essono': { gp: 1, goals: 1, assists: 0 },
  'nicolas primiani': { gp: 1, goals: 0, assists: 1 },
  // 2 GP players with 0 points
  'gabriel savard': { gp: 2, goals: 0, assists: 0 },
  'éliane martel': { gp: 2, goals: 0, assists: 0 },
  'todd mumford': { gp: 2, goals: 0, assists: 0 },
  'alessandro primiani': { gp: 2, goals: 0, assists: 0 },
  // 1 GP players with 0 points
  'benjamin st-cyr': { gp: 1, goals: 0, assists: 0 },
  'meagan st-cyr': { gp: 1, goals: 0, assists: 0 },
  'thomas yelle': { gp: 1, goals: 0, assists: 0 },
  'evan sinclair': { gp: 1, goals: 0, assists: 0 },
  'zachary bailey': { gp: 1, goals: 0, assists: 0 },
  'joshua bubis': { gp: 1, goals: 0, assists: 0, yellowCards: 1 },
  'jean luc feliciano': { gp: 1, goals: 0, assists: 0 },
  'phenix mangerpan': { gp: 1, goals: 0, assists: 0 },
  'tristan snowden': { gp: 1, goals: 0, assists: 0 },
  'abigael o\'rourke': { gp: 1, goals: 0, assists: 0 },
  'ciera macdavid': { gp: 1, goals: 0, assists: 0 },
  'shawn chiniah': { gp: 1, goals: 0, assists: 0 },
  'lydia côté': { gp: 1, goals: 0, assists: 0 },
  'calvin watt': { gp: 1, goals: 0, assists: 0 },
  'alexis watt': { gp: 1, goals: 0, assists: 0 },
  'pierre-luc tremblay': { gp: 1, goals: 0, assists: 0 },
  'amelia benabid': { gp: 1, goals: 0, assists: 0 },
  'émy larivière': { gp: 1, goals: 0, assists: 0 },
  'brandon de sousa': { gp: 1, goals: 0, assists: 0 },
  'charlotte soucy': { gp: 1, goals: 0, assists: 0 },
};

export const SOCCER_PLAYER_STATS: SoccerPlayerStat[] = (() => {
  const map = new Map<string, SoccerPlayerStat>();

  ALL_SOCCER_PLAYERS.forEach(p => {
    const key = p.name.trim().toLowerCase();
    const team = SOCCER_TEAMS.find(t => t.id === p.teamId);
    const teamName = team?.name || '';
    const stats = RECORDED_PLAYER_STATS[key] || { gp: 0, goals: 0, assists: 0 };

    if (!map.has(key)) {
      map.set(key, {
        id: p.id,
        name: p.name,
        teamId: p.teamId,
        teamName: teamName,
        teamIds: [p.teamId],
        teamNames: [teamName],
        gp: stats.gp,
        goals: stats.goals,
        assists: stats.assists,
        points: stats.goals + stats.assists,
        yellowCards: stats.yellowCards || 0,
        redCards: stats.redCards || 0
      });
    } else {
      const existing = map.get(key)!;
      if (!existing.teamIds) {
        existing.teamIds = [existing.teamId];
        existing.teamNames = [existing.teamName];
      }
      if (!existing.teamIds.includes(p.teamId)) {
        existing.teamIds.push(p.teamId);
        if (teamName && !existing.teamNames?.includes(teamName)) {
          existing.teamNames?.push(teamName);
        }
        existing.secondaryTeamId = p.teamId;
        existing.secondaryTeamName = teamName;
        existing.teamName = existing.teamNames?.join(' / ') || `${existing.teamName} / ${teamName}`;
      }
    }
  });

  return Array.from(map.values());
})();

export const SOCCER_SCHEDULE: SoccerMatch[] = [
  // Week 1 - Sunday, October 4, 2026
  {
    id: 's_m_w1_1',
    week: 1,
    date: '2026-10-04',
    time: '20:00',
    homeTeamId: 's_faahh_united',
    awayTeamId: 's_turf_terrors',
    homeTeamName: 'Faah United',
    awayTeamName: 'Turf Terrors',
    pitch: 'Terrain Synthétique',
    location: 'Complexe Sportif Delson',
    status: 'completed',
    homeScore: 7,
    awayScore: 2,
    division: '7v7 Open',
    recap: {
      summaryEn: 'Faah United opened the Fall 2026 season with a decisive 7–2 victory over Turf Terrors. Simon Berthiaume and Ismaele Rusconi each netted a brace (2 goals), while Simon Yelle, Michael-Joseph Primiani, and Meagan Boutler added single tallies. Timothy Gilmore and Benjamin Morton scored for Turf Terrors.',
      summaryFr: 'Faah United a lancé la saison Automne 2026 avec une victoire convaincante de 7–2 contre Turf Terrors. Simon Berthiaume et Ismaele Rusconi ont chacun inscrit un doublé (2 buts), tandis que Simon Yelle, Michael-Joseph Primiani et Meagan Boutler ont ajouté un but chacun. Timothy Gilmore et Benjamin Morton ont marqué pour Turf Terrors.',
      goals: [
        { teamId: 's_faahh_united', scorer: 'Simon Yelle', number: 9 },
        { teamId: 's_faahh_united', scorer: 'Simon Berthiaume', number: 12 },
        { teamId: 's_faahh_united', scorer: 'Michael-Joseph Primiani', number: 6 },
        { teamId: 's_faahh_united', scorer: 'Ismaele Rusconi', number: 11 },
        { teamId: 's_faahh_united', scorer: 'Ismaele Rusconi', number: 11 },
        { teamId: 's_faahh_united', scorer: 'Meagan Boutler', number: 4 },
        { teamId: 's_faahh_united', scorer: 'Simon Berthiaume', number: 12 },
        { teamId: 's_turf_terrors', scorer: 'Timothy Gilmore', number: 5 },
        { teamId: 's_turf_terrors', scorer: 'Benjamin Morton', number: 4 },
      ],
      cards: [
        { teamId: 's_turf_terrors', player: 'Joshua Bubis', number: 3, type: 'yellow' }
      ],
      homeRoster: [
        { number: 6, name: 'Michael-Joseph Primiani' },
        { number: 8, name: 'Gabriel Savard' },
        { number: 3, name: 'Éliane Martel' },
        { number: 2, name: 'Benjamin St-Cyr' },
        { number: 73, name: 'Todd Mumford', isGoalie: true },
        { number: 9, name: 'Simon Yelle' },
        { number: 10, name: 'Meagan St-Cyr' },
        { number: 7, name: 'Thomas Yelle' },
        { number: 12, name: 'Simon Berthiaume' },
        { number: 5, name: 'Alessandro Primiani' },
        { number: 4, name: 'Meagan Boutler' },
        { number: 11, name: 'Ismaele Rusconi', isSub: true },
      ],
      awayRoster: [
        { number: 1, name: 'Evan Sinclair' },
        { number: 2, name: 'Zachary Bailey' },
        { number: 3, name: 'Joshua Bubis' },
        { number: 4, name: 'Benjamin Morton' },
        { number: 5, name: 'Timothy Gilmore' },
        { number: 6, name: 'Jean Luc Feliciano' },
        { number: 7, name: 'Phenix Mangerpan' },
        { number: 8, name: 'Tristan Snowden' },
        { number: 9, name: 'Abigael O\'Rourke' },
        { number: 10, name: 'Ciera MacDavid' },
        { number: 11, name: 'Shawn Chiniah' },
        { number: 12, name: 'Lydia Côté' },
      ]
    }
  },
  {
    id: 's_m_w1_2',
    week: 1,
    date: '2026-10-04',
    time: '21:00',
    homeTeamId: 's_blackjacks',
    awayTeamId: 's_team_4',
    homeTeamName: 'BlackJacks',
    awayTeamName: 'Mumford & Sons',
    pitch: 'Terrain Synthétique',
    location: 'Complexe Sportif Delson',
    status: 'completed',
    homeScore: 3,
    awayScore: 12,
    division: '7v7 Open',
    recap: {
      summaryEn: 'Mumford & Sons powered past BlackJacks 12–3 in a high-scoring Week 1 showdown. Alexandre Stefanson (4 goals) and Nolan Snowman (4 goals) led the offensive surge alongside a hat trick from Ismaele Rusconi (3 goals) and a brace from Michael-Joseph Primiani (2 goals). For BlackJacks, Brenden Thomas-Bynoe, Moustapha Amar, and Nathan Essono found the back of the net, with Amar and Meagan Boutler each recording 2 assists.',
      summaryFr: 'Mumford & Sons s\'est imposé 12–3 face aux BlackJacks lors d\'un duel offensif de la Semaine 1. Alexandre Stefanson (4 buts) et Nolan Snowman (4 buts) ont mené l\'attaque, appuyés par un tour du chapeau d\'Ismaele Rusconi (3 buts) et un doublé de Michael-Joseph Primiani (2 buts). Du côté des BlackJacks, Brenden Thomas-Bynoe, Moustapha Amar et Nathan Essono ont trouvé le fond du filet, avec 2 passes décisives chacun pour Amar et Meagan Boutler.',
      goals: [
        { teamId: 's_team_4', scorer: 'Alexandre Stefanson', number: 37 },
        { teamId: 's_team_4', scorer: 'Alexandre Stefanson', number: 37 },
        { teamId: 's_team_4', scorer: 'Alexandre Stefanson', number: 37 },
        { teamId: 's_team_4', scorer: 'Alexandre Stefanson', number: 37 },
        { teamId: 's_team_4', scorer: 'Ismaele Rusconi', number: 17 },
        { teamId: 's_team_4', scorer: 'Michael-Joseph Primiani', number: 13 },
        { teamId: 's_team_4', scorer: 'Michael-Joseph Primiani', number: 13 },
        { teamId: 's_team_4', scorer: 'Ismaele Rusconi', number: 17 },
        { teamId: 's_team_4', scorer: 'Ismaele Rusconi', number: 17 },
        { teamId: 's_team_4', scorer: 'Nolan Snowman', number: 32 },
        { teamId: 's_team_4', scorer: 'Nolan Snowman', number: 32 },
        { teamId: 's_team_4', scorer: 'Nolan Snowman', number: 32 },
        { teamId: 's_team_4', scorer: 'Nolan Snowman', number: 32 },
        { teamId: 's_blackjacks', scorer: 'Brenden Thomas-Bynoe', number: 9, assists: ['Moustapha Amar', 'Meagan Boutler'] },
        { teamId: 's_blackjacks', scorer: 'Moustapha Amar', number: 2, assists: ['Nicolas Primiani'] },
        { teamId: 's_blackjacks', scorer: 'Nathan Essono', number: 3, assists: ['Moustapha Amar', 'Meagan Boutler'] },
      ],
      cards: [],
      homeRoster: [
        { number: 1, name: 'Nicolas Primiani' },
        { number: 2, name: 'Moustapha Amar' },
        { number: 3, name: 'Nathan Essono' },
        { number: 4, name: 'Amelia Benabid' },
        { number: 5, name: 'Émy Larivière' },
        { number: 6, name: 'Meagan Boutler' },
        { number: 7, name: 'Brandon De Sousa' },
        { number: 8, name: 'Charlotte Soucy' },
        { number: 9, name: 'Brenden Thomas-Bynoe' },
        { number: 10, name: 'Alessandro Primiani' },
      ],
      awayRoster: [
        { number: 37, name: 'Alexandre Stefanson' },
        { number: 2, name: 'Calvin Watt' },
        { number: 3, name: 'Todd Mumford' },
        { number: 4, name: 'Simon Yelle' },
        { number: 13, name: 'Michael-Joseph Primiani' },
        { number: 6, name: 'Alexis Watt' },
        { number: 7, name: 'Pierre-Luc Tremblay' },
        { number: 8, name: 'Gabriel Savard' },
        { number: 9, name: 'Éliane Martel' },
        { number: 17, name: 'Ismaele Rusconi' },
        { number: 32, name: 'Nolan Snowman' },
      ]
    }
  },
  // Week 2 - Sunday, October 11, 2026
  {
    id: 's_m_w2_1',
    week: 2,
    date: '2026-10-11',
    time: '20:00',
    homeTeamId: 's_faahh_united',
    awayTeamId: 's_team_4',
    homeTeamName: 'Faah United',
    awayTeamName: 'Mumford & Sons',
    pitch: 'Terrain Synthétique',
    location: 'Complexe Sportif Delson',
    status: 'upcoming',
    division: '7v7 Open'
  },
  {
    id: 's_m_w2_2',
    week: 2,
    date: '2026-10-11',
    time: '21:00',
    homeTeamId: 's_blackjacks',
    awayTeamId: 's_turf_terrors',
    homeTeamName: 'BlackJacks',
    awayTeamName: 'Turf Terrors',
    pitch: 'Terrain Synthétique',
    location: 'Complexe Sportif Delson',
    status: 'upcoming',
    division: '7v7 Open'
  }
];

export const SOCCER_RULES: SoccerRuleCategory[] = [
  {
    id: 'format',
    titleEn: '1. Format & Playing Surface',
    titleFr: '1. Format et Surface de Jeu',
    icon: 'Shield',
    rules: [
      {
        en: 'The league is played in a **7 vs 7 format (6 outfield players + 1 goalkeeper)**.',
        fr: 'La ligue se dispute en formule **7 contre 7 (6 joueurs de champ + 1 gardien de but)**.',
        detailEn: 'Official **size 5** match balls are provided for all league games.',
        detailFr: 'Le ballon officiel de **grandeur 5** est fourni pour tous les matchs de la ligue.'
      },
      {
        en: 'Matches take place on the synthetic turf field at **Complexe Sportif Delson | Sainte-Catherine** (75 Bd Georges Gagné N, Delson, QC J5B 2E5).',
        fr: 'Les rencontres ont lieu sur le terrain synthétique du **Complexe Sportif Delson | Sainte-Catherine** (75 Bd Georges Gagné N, Delson, QC J5B 2E5).'
      }
    ]
  },
  {
    id: 'duration',
    titleEn: '2. Game Duration & Timing',
    titleFr: '2. Durée du Match & Chronométrage',
    icon: 'Clock',
    rules: [
      {
        en: 'Each match consists of **two 25-minute running halves** with a **3-minute halftime break**.',
        fr: 'Chaque match comprend **deux demies de 25 minutes** à temps continu avec une **pause de 3 minutes** entre les deux demies.'
      },
      {
        en: 'A **5-minute warm-up period** is scheduled on the pitch before each match.',
        fr: 'Une période de **5 minutes est prévue pour l\'échauffement** avant chaque match.',
        detailEn: 'Teams must be **ready on the pitch 5 minutes before the official kickoff time**.',
        detailFr: 'Les équipes doivent être **prêtes sur le terrain 5 minutes avant l\'heure officielle du coup d\'envoi**.'
      },
      {
        en: 'The clock runs continuously and only stops at the referee\'s sole discretion, particularly in the event of injury or a situation requiring intervention.',
        fr: 'Le chronomètre est continu et ne s\'arrête qu\'à la discrétion exclusive de l\'arbitre, notamment en cas de blessure ou de situation nécessitant une intervention.'
      }
    ]
  },
  {
    id: 'composition',
    titleEn: '3. Team Composition & Roster',
    titleFr: '3. Composition de l’Équipe & Alignement',
    icon: 'Users',
    rules: [
      {
        en: 'A minimum of **5 players, including the goalkeeper**, is required to start an official match.',
        fr: 'Un minimum de **5 joueurs, incluant le gardien de but**, est obligatoire pour débuter un match officiel.',
        detailEn: 'A **10-minute grace period** is granted before a forfeit (default loss **3-0**) is recorded.',
        detailFr: 'Un délai de grâce de **10 minutes** est accordé avant qu\'un forfait (défaite par défaut **3-0**) ne soit enregistré.'
      }
    ]
  },
  {
    id: 'substitutions',
    titleEn: '4. Substitutions',
    titleFr: '4. Remplacements',
    icon: 'RefreshCw',
    rules: [
      {
        en: 'Substitutions may only be made **during a stoppage of play**, with the referee\'s permission.',
        fr: 'Les remplacements peuvent uniquement être effectués **lors d\'un arrêt de jeu**, avec l\'autorisation de l\'arbitre.'
      },
      {
        en: 'The departing player must have **completely left the field of play** before the substitute can enter the pitch.',
        fr: 'Le joueur sortant doit avoir **complètement quitté la surface de jeu** avant que le joueur entrant ne puisse entrer sur le terrain.',
        detailEn: 'A player entering the pitch before their teammate has fully exited the field may be sanctioned by the referee.',
        detailFr: 'Un joueur qui entre sur le terrain avant que son coéquipier ait complètement quitté la surface de jeu peut être sanctionné par l\'arbitre.'
      }
    ]
  },
  {
    id: 'equipment',
    titleEn: '5. Equipment & Player Attire',
    titleFr: '5. Équipement & Tenue des Joueurs',
    icon: 'Shirt',
    rules: [
      {
        en: '**Shin guards are mandatory** for all players on the pitch.',
        fr: 'Les **protège-tibias sont obligatoires** pour tous les joueurs sur le terrain.'
      },
      {
        en: 'Turf shoes (**TF**) or molded cleats (**FG**) are required. **Metal studs are strictly prohibited**.',
        fr: 'Les souliers pour gazon synthétique (**TF**) ou les crampons moulés (**FG**) sont requis. Les **crampons métalliques sont strictement interdits**.'
      },
      {
        en: 'All team members must wear a **matching colored jersey with an individual number**.',
        fr: 'Tous les membres de l\'équipe doivent porter un **maillot de couleur identique avec numéro individuel**.',
        detailEn: 'The goalkeeper must wear a **distinctive color** from that of their team and the opposing team.',
        detailFr: 'Le gardien doit porter une **couleur distinctive** de celle de son équipe et de l\'équipe adverse.'
      }
    ]
  },
  {
    id: 'fouls',
    titleEn: '6. Fouls, Offside & Conduct',
    titleFr: '6. Fautes, Hors-jeu & Conduite',
    icon: 'AlertTriangle',
    rules: [
      {
        subheadingEn: 'Fouls & Conduct',
        subheadingFr: 'Fautes & Conduite',
        en: 'Standard soccer foul rules apply.',
        fr: 'Les règles de fautes standard s\'appliquent.',
        detailEn: 'Any contact deemed **careless, reckless, or excessively forceful** can result in a free kick or disciplinary sanction at the referee\'s discretion.',
        detailFr: 'Tout contact **imprudent, téméraire ou jugé excessif** peut donner lieu à un coup franc ou à une sanction disciplinaire selon la décision de l\'arbitre.'
      },
      {
        subheadingEn: 'Slide Tackling (Zero Tolerance)',
        subheadingFr: 'Tacles glissés (Tolérance zéro)',
        badgeEn: 'Strictly Prohibited — Immediate Ejection',
        badgeFr: 'Strictement interdit — Expulsion immédiate',
        badgeType: 'red',
        en: '**Slide tackling is strictly prohibited.** Any player who performs a slide tackle will be **immediately ejected (expulsed)** from the match.',
        fr: '**Les tacles glissés sont strictement interdits.** Tout joueur qui effectue un tacle glissé sera **immédiatement expulsé** du match.',
        detailEn: 'The league enforces a **zero-tolerance policy for intentional slide tackles** to protect player safety on the synthetic turf. Any intentional slide tackle results in an **automatic ejection (red card)** and may lead to further disciplinary suspension.',
        detailFr: 'La ligue applique une politique de **tolérance zéro pour les tacles glissés intentionnels** afin de protéger la sécurité des joueurs sur le gazon synthétique. Tout tacle glissé intentionnel entraîne une **expulsion automatique (carton rouge)** et peut mener à des suspensions supplémentaires.'
      },
      {
        subheadingEn: 'Offside',
        subheadingFr: 'Hors-jeu',
        badgeEn: 'No Offside',
        badgeFr: 'Aucun hors-jeu',
        badgeType: 'lime',
        en: '**There is no offside rule** in 7 vs 7 play.',
        fr: '**Il n\'y a aucune règle de hors-jeu** en formule 7 contre 7.'
      },
      {
        subheadingEn: 'Throw-ins & Restarts',
        subheadingFr: 'Remises en jeu',
        badgeEn: 'Two-handed throw-in',
        badgeFr: 'Lancer à deux mains',
        badgeType: 'zinc',
        en: 'Throw-ins are taken with a **two-handed throw from behind the head**, conforming to standard soccer rules.',
        fr: 'Les touches sont effectuées par **lancer à deux mains derrière la tête**, conformément aux règles standard du soccer.',
        detailEn: 'The player taking the throw-in must keep **both feet on the ground** and execute the throw with both hands.',
        detailFr: 'Le joueur effectuant la touche doit avoir **les deux pieds au sol** et effectuer le lancer avec les deux mains.'
      }
    ]
  },
  {
    id: 'discipline',
    titleEn: '7. Cards & Discipline',
    titleFr: '7. Cartons & Discipline',
    icon: 'Award',
    rules: [
      {
        subheadingEn: 'Yellow Card',
        subheadingFr: 'Carton Jaune',
        badgeEn: '2 Min Penalty',
        badgeFr: 'Pénalité 2 min',
        badgeType: 'yellow',
        en: 'The yellow card serves as an **official warning**.',
        fr: 'Le carton jaune sert d\'**avertissement officiel**.',
        detailEn: 'A yellow card imposes a temporary **2-minute penalty** on the offending player. The team plays in **numerical inferiority for 2 minutes**, or until the opponent scores. The player may return to play at the end of their penalty with referee approval.',
        detailFr: 'Un carton jaune impose une pénalité temporaire de **2 minutes** au joueur fautif. L\'équipe évolue en **infériorité numérique durant les 2 minutes**, ou jusqu\'à ce que l\'équipe adverse marque. Le joueur peut réintégrer le jeu à la fin de sa pénalité, avec l\'autorisation de l\'arbitre.'
      },
      {
        subheadingEn: 'Unsportsmanlike Conduct',
        subheadingFr: 'Conduite antisportive',
        badgeEn: '4 Min Penalty',
        badgeFr: 'Pénalité 4 min',
        badgeType: 'orange',
        en: 'NextGen Soccer is a recreational league centered on **fun, respect, and fair play**.',
        fr: 'NextGen Soccer est une ligue récréative axée sur le **plaisir, le respect et le fair-play**.',
        detailEn: 'Any unsportsmanlike conduct—including insults, provocations, disputes, repeated dissent toward the referee, aggressive behavior, or disrespectful language—may result in a **4-minute penalty** in numerical inferiority. The referee may also issue a yellow or red card depending on severity. The league reserves the right to impose additional sanctions for repeated or severe conduct.',
        detailFr: 'Tout comportement antisportif, incluant notamment les **insultes, les provocations, les disputes, les contestations répétées envers l\'arbitre, les comportements agressifs ou tout langage irrespectueux**, peut entraîner une pénalité de **4 minutes**. Durant cette pénalité, l\'équipe joue en **infériorité numérique**. L\'arbitre peut également imposer un carton jaune ou rouge selon la gravité de la situation. La ligue se réserve le droit d\'imposer des sanctions supplémentaires en cas de comportement répété ou particulièrement grave.'
      },
      {
        subheadingEn: 'Red Card',
        subheadingFr: 'Carton Rouge',
        badgeEn: 'Ejection & Suspension',
        badgeFr: 'Expulsion & Suspension',
        badgeType: 'red',
        en: 'A red card results in **immediate ejection from the match**.',
        fr: 'Le carton rouge entraîne une **expulsion immédiate du match**.',
        detailEn: 'The ejected player must leave the field of play and cannot return during the game. A red card automatically carries a **suspension of at least one subsequent game**. The league may impose further suspensions depending on incident severity.',
        detailFr: 'Le joueur expulsé doit quitter la surface de jeu et ne peut pas revenir durant le match. Un carton rouge entraîne automatiquement une **suspension d\'au moins un match subséquent**. La ligue peut imposer une suspension supplémentaire selon la gravité de l\'incident.'
      }
    ]
  },
  {
    id: 'goalkeeper',
    titleEn: '8. Goalkeeper Regulations',
    titleFr: '8. Règlements du Gardien de But',
    icon: 'HandMetal',
    rules: [
      {
        subheadingEn: 'Back-pass rule',
        subheadingFr: 'Passe en retrait',
        en: 'The goalkeeper cannot handle the ball with their hands following a **deliberate kick from a teammate**.',
        fr: 'Le gardien ne peut pas saisir le ballon des mains à la suite d\'une **passe volontaire du pied d\'un coéquipier**.',
        detailEn: 'An infraction results in an **indirect free kick** for the opposing team.',
        detailFr: 'Une infraction entraîne un **coup franc indirect** pour l\'équipe adverse.'
      },
      {
        subheadingEn: 'Goal clearance',
        subheadingFr: 'Dégagement',
        en: 'When a goal clearance is awarded to the goalkeeper from their penalty box, the ball may be restarted **by hand or by foot from inside the area**.',
        fr: 'Lorsqu\'un dégagement est accordé au gardien depuis sa surface de réparation, le ballon peut être relancé **à la main ou au pied depuis l\'intérieur de la surface**.'
      }
    ]
  },
  {
    id: 'playoffs',
    titleEn: '9. Playoffs & Tiebreakers',
    titleFr: '9. Séries Éliminatoires & Égalités',
    icon: 'Trophy',
    rules: [
      {
        subheadingEn: 'Regular season points',
        subheadingFr: 'Saison régulière',
        badgeEn: 'Win 3 pts | Draw 1 pt | Loss 0 pt',
        badgeFr: 'Victoire 3 pts | Nul 1 pt | Défaite 0 pt',
        badgeType: 'lime',
        en: '**Win = 3 points** | **Draw = 1 point** | **Loss = 0 points**',
        fr: '**Victoire = 3 points** | **Nul = 1 point** | **Défaite = 0 point**'
      },
      {
        subheadingEn: 'Playoff tiebreakers',
        subheadingFr: 'Séries éliminatoires',
        badgeEn: '3-Kick Shootout + Sudden Death',
        badgeFr: '3 Tirs de barrage + Mort subite',
        badgeType: 'zinc',
        en: 'In playoffs, any game tied at the end of regulation ends with a **3-kick shootout**, followed by **sudden death if needed**.',
        fr: 'En séries éliminatoires, tout match nul à la fin du temps réglementaire se conclut par une **séance de 3 tirs de barrage**, suivie de la **mort subite au besoin**.'
      }
    ]
  },
  {
    id: 'eligibility',
    titleEn: '10. Player Eligibility & Registration',
    titleFr: '10. Éligibilité des Joueurs & Inscriptions',
    icon: 'UserCheck',
    rules: [
      {
        subheadingEn: 'Official roster',
        subheadingFr: 'Alignement officiel',
        en: 'All players must be **registered on their team\'s official roster** prior to participating in a match.',
        fr: 'Tous les joueurs doivent être **inscrits sur la liste officielle de leur équipe** avant de participer à un match.',
        detailEn: 'Any player not registered on the official roster cannot participate in a league match.',
        detailFr: 'Un joueur non inscrit sur la liste officielle ne peut pas participer à un match de la ligue.'
      },
      {
        subheadingEn: 'Playoff eligibility',
        subheadingFr: 'Éligibilité en séries',
        badgeEn: 'Minimum 3 games',
        badgeFr: 'Au moins 3 matchs',
        badgeType: 'lime',
        en: 'Players must have played in **at least 3 regular season games** to participate in the playoffs.',
        fr: 'Les joueurs doivent avoir disputé **au moins 3 matchs de saison régulière** pour participer aux séries éliminatoires.',
        detailEn: 'The league reserves the right to verify player eligibility before or during the playoffs.',
        detailFr: 'La ligue se réserve le droit de vérifier l\'admissibilité de tout joueur avant ou pendant les séries éliminatoires.'
      }
    ]
  },
  {
    id: 'complex',
    titleEn: '11. Sports Complex Regulations',
    titleFr: '11. Règlements du Complexe Sportif',
    icon: 'Building2',
    rules: [
      {
        subheadingEn: 'Footwear on the pitch',
        subheadingFr: 'Chaussures sur le terrain',
        badgeEn: 'Mandatory',
        badgeFr: 'Obligatoire',
        badgeType: 'lime',
        en: 'Appropriate athletic footwear is mandatory on the pitch. Outdoor shoes, boots, and **metal cleats are strictly prohibited**.',
        fr: 'Les **chaussures de sport appropriées sont obligatoires** sur le terrain. Les chaussures d\'extérieur, bottes et **crampons métalliques sont interdits**.'
      },
      {
        subheadingEn: 'Food & Chewing Gum',
        subheadingFr: 'Nourriture & Gomme',
        badgeEn: 'Prohibited',
        badgeFr: 'Interdit',
        badgeType: 'red',
        en: 'Food and **chewing gum are strictly prohibited** on the pitch.',
        fr: 'La nourriture et la **gomme à mâcher sont interdites** sur le terrain.'
      },
      {
        subheadingEn: 'Jewelry & Accessories',
        subheadingFr: 'Bijoux & Accessoires',
        badgeEn: 'Must be removed',
        badgeFr: 'À retirer',
        badgeType: 'orange',
        en: '**All jewelry must be removed** before participating in a match.',
        fr: 'Les **bijoux doivent être retirés** avant de participer à un match.'
      },
      {
        subheadingEn: 'Facility & Staff Respect',
        subheadingFr: 'Installations & Personnel',
        en: 'Players must **respect the facility and staff** of the Complexe Sportif Delson–Sainte-Catherine at all times.',
        fr: 'Les joueurs doivent **respecter les installations et le personnel** du Complexe Sportif Delson–Sainte-Catherine en tout temps.'
      },
      {
        subheadingEn: 'Premises Cleanliness',
        subheadingFr: 'Propreté des lieux',
        en: 'Each team is **responsible for leaving the premises clean** after their activity.',
        fr: 'Chaque équipe est responsable de **laisser les lieux propres** après son activité.'
      },
      {
        subheadingEn: 'Prohibited Items & Materials',
        subheadingFr: 'Objets & Matières interdits',
        badgeEn: 'Prohibited',
        badgeFr: 'Interdit',
        badgeType: 'red',
        en: 'Confetti, metallic sparkles, smoke bombs, and **helium balloons are prohibited**.',
        fr: 'Les confettis, brillants métalliques, fumigènes et **ballons gonflés à l\'hélium sont interdits**.'
      },
      {
        subheadingEn: 'Intoxicating Substances',
        subheadingFr: 'Substances intoxicantes',
        badgeEn: 'Strictly Prohibited',
        badgeFr: 'Strictement interdit',
        badgeType: 'red',
        en: 'The use of **drugs or intoxicating substances is strictly prohibited** on the premises.',
        fr: 'L\'utilisation de **drogues ou de substances intoxicantes est strictement interdite** sur le site.'
      },
      {
        subheadingEn: 'Personal Belongings',
        subheadingFr: 'Effets personnels',
        en: 'Players are **responsible for their personal belongings**. The complex is not responsible for any theft or damage.',
        fr: 'Les joueurs sont **responsables de leurs effets personnels**. Le complexe n\'est pas responsable des vols ou dommages.'
      }
    ]
  }
];

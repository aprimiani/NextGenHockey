export interface SoccerTeam {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  color: string;
  division: string;
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
}

export interface SoccerPlayerStat {
  id: string;
  name: string;
  teamName: string;
  teamId: string;
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

export interface SoccerRuleCategory {
  id: string;
  titleEn: string;
  titleFr: string;
  icon: string;
  rules: {
    en: string;
    fr: string;
    detailEn?: string;
    detailFr?: string;
  }[];
}

export const SOCCER_CURRENT_SEASON = {
  id: 'spring_summer_2026',
  nameEn: 'Spring / Summer 2026',
  nameFr: 'Printemps / Été 2026',
  startDate: '2026',
  location: 'Complexe Sportif Delson | Sainte-Catherine',
  address: '75 Bd Georges Gagné N, Delson, QC J5B 2E5',
  registrationOpen: true,
  formatEn: '7 vs 7 Turf League (6 Outfield + 1 Goalkeeper)',
  formatFr: 'Ligue Synthétique 7 c 7 (6 Joueurs + 1 Gardien)',
};

export const SOCCER_TEAMS: SoccerTeam[] = [];

export const SOCCER_STANDINGS: SoccerTeamStanding[] = [];

export const SOCCER_PLAYER_STATS: SoccerPlayerStat[] = [];

export const SOCCER_SCHEDULE: SoccerMatch[] = [];

export const SOCCER_RULES: SoccerRuleCategory[] = [
  {
    id: 'format',
    titleEn: '1. Format & Playing Surface',
    titleFr: '1. Format et Surface de Jeu',
    icon: 'Shield',
    rules: [
      {
        en: 'The league is played in a 7 vs 7 format (6 field players + 1 goalkeeper).',
        fr: 'La ligue se dispute en formule 7 contre 7 (6 joueurs de champ + 1 gardien de but).',
        detailEn: 'Standard size 5 soccer ball is provided for all league matches.',
        detailFr: 'Le ballon officiel de grandeur 5 est fourni pour tous les matchs de la ligue.'
      },
      {
        en: 'Matches take place on the synthetic turf field at Complexe Sportif Delson | Sainte-Catherine (75 Bd Georges Gagné N, Delson, QC J5B 2E5).',
        fr: 'Les rencontres ont lieu sur le terrain synthétique au Complexe Sportif Delson | Sainte-Catherine (75 Bd Georges Gagné N, Delson, QC J5B 2E5).'
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
        en: 'Games consist of two 25-minute running halves with a brief 3-minute halftime break.',
        fr: 'Chaque match comprend deux demies de 25 minutes à temps continu avec une mi-temps de 3 minutes.',
        detailEn: 'The clock runs continuously and only stops at the referee’s sole discretion for serious injuries.',
        detailFr: 'Le chronomètre est continu et ne s\'arrête qu\'à la discrétion exclusive de l\'arbitre pour blessure grave.'
      },
      {
        en: 'Teams must be ready on the pitch 5 minutes prior to scheduled kickoff.',
        fr: 'Les équipes doivent être prêtes sur le terrain 5 minutes avant le coup d\'envoi officiel.'
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
        en: 'A minimum of 5 players (including the goalkeeper) is required to start an official game.',
        fr: 'Un minimum de 5 joueurs (incluant le gardien de but) est obligatoire pour débuter un match officiel.',
        detailEn: 'A 10-minute grace period is granted before a forfeit (3-0 default victory) is registered.',
        detailFr: 'Un délai de grâce de 10 minutes est accordé avant que le forfait (défaite par défaut 3-0) ne soit enregistré.'
      },
      {
        en: 'Roster size: Maximum of 14 registered players per team per match sheet.',
        fr: 'Alignement : Maximum de 14 joueurs inscrits par équipe sur la feuille de match.'
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
        en: 'Substitutions are unlimited and on-the-fly ("rolling") at the midfield line.',
        fr: 'Les remplacements sont illimités et volants à la hauteur de la ligne médiane.',
        detailEn: 'The departing player must completely leave the field before the substitute may enter.',
        detailFr: 'Le joueur sortant doit avoir quitté complètement la surface de jeu avant que le joueur entrant ne puisse embarquer.'
      }
    ]
  },
  {
    id: 'equipment',
    titleEn: '5. Equipment & Attire',
    titleFr: '5. Équipement & Tenue des Joueurs',
    icon: 'Shirt',
    rules: [
      {
        en: 'Shin guards are mandatory for all field players.',
        fr: 'Les protège-tibias sont obligatoires pour tous les joueurs sur le terrain.'
      },
      {
        en: 'Turf shoes (TF) or molded cleats (FG) are required. Metal studs are strictly forbidden.',
        fr: 'Souliers pour gazon synthétique (TF) ou crampons moulés (FG) sont requis. Les crampons métalliques sont strictement interdits.'
      },
      {
        en: 'All team members must wear matching jersey colors with individual numbers. Goalkeeper must wear a distinct color.',
        fr: 'Tous les membres de l\'équipe doivent porter un maillot de couleur identique avec numéro individuel. Le gardien doit porter une couleur distinctive.'
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
        en: 'Fouls & Misconduct: Standard foul rules apply. Careless, reckless, or excessively physical contact results in a direct or indirect free kick.',
        fr: 'Fautes & Conduite : Les règles de fautes standard s\'appliquent. Tout contact imprudent, téméraire ou jugé excessif donne lieu à un coup franc direct ou indirect.'
      },
      {
        en: 'No offside rule: In 7v7 play, there is no offside infraction.',
        fr: 'Pas de hors-jeu : En formule 7 c 7, il n\'y a aucune règle de hors-jeu.'
      },
      {
        en: 'Kick-ins replace throw-ins when the ball exits along the touchlines.',
        fr: 'Les touches se font au pied (kick-in) avec la balle arrêtée sur la ligne de touche.'
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
        en: 'Yellow Card: Serves as a caution and results in a mandatory 2-minute temporary cooling penalty for the player.',
        fr: 'Carton Jaune : Sert d\'avertissement et impose une pénalité temporaire de 2 minutes au joueur fautif.',
        detailEn: 'The team plays shorthanded for the duration of the 2 minutes or until the opposing team scores.',
        detailFr: 'L\'équipe évolue en infériorité numérique durant 2 minutes ou jusqu\'à ce que l\'équipe adverse marque.'
      },
      {
        en: 'Red Card: Immediate ejection from the match plus an automatic minimum 1-game suspension.',
        fr: 'Carton Rouge : Expulsion immédiate du match et suspension automatique d\'au moins un match subséquent.'
      }
    ]
  },
  {
    id: 'goalkeeper',
    titleEn: '8. Goalkeeper Specific Rules',
    titleFr: '8. Règlements du Gardien de But',
    icon: 'HandMetal',
    rules: [
      {
        en: 'Back-pass rule: The goalkeeper cannot handle the ball with their hands if deliberately kicked back by a teammate.',
        fr: 'Passe en retrait : Le gardien ne peut pas saisir le ballon des mains suite à une passe volontaire du pied d\'un coéquipier.'
      },
      {
        en: 'Goal clearance: Must be thrown or kicked into play from within the penalty box.',
        fr: 'Dégagement aux six mètres : Doit être relancé à la main ou au pied depuis l\'intérieur de la zone de réparation.'
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
        en: 'Regular season points: Win = 3 pts, Draw = 1 pt, Loss = 0 pts.',
        fr: 'Points en saison régulière : Victoire = 3 pts, Nul = 1 pt, Défaite = 0 pt.'
      },
      {
        en: 'Playoff games tied at the end of regulation go directly to a 3-kick penalty shootout, followed by sudden death if needed.',
        fr: 'En séries éliminatoires, tout match nul à la fin du temps réglementaire se conclut par une séance de 3 tirs de barrage, suivie de la mort subite au besoin.'
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
        en: 'All players must be registered on the official team roster and have signed the online liability waiver prior to taking the pitch.',
        fr: 'Tous les joueurs doivent être inscrits sur la liste officielle de l\'équipe et avoir signé la décharge de responsabilité en ligne avant d\'entrer en jeu.'
      },
      {
        en: 'Playoff eligibility: Players must have played in at least 3 regular season games to be eligible for playoff competition.',
        fr: 'Éligibilité en séries : Les joueurs doivent avoir disputé au moins 3 matchs de saison régulière pour participer aux séries éliminatoires.'
      }
    ]
  }
];

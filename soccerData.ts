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
  }
];

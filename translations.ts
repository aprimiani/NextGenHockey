export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      standings: 'Statistics',
      schedule: 'Schedule',
      rules: 'Rules',
      sponsors: 'Sponsors',
      contact: 'Contact Us',
      register: 'REGISTER TEAM',
    },
    hero: {
      seasonMsg: 'Summer Season Registration Open',
      futureOf: 'The Next Generation',
      recHockey: 'of Hockey',
      description: "Join a recreational league that prioritizes safety, affordability, and community-driven play.",
      registerNow: 'Register Now',
      principlesTitle: 'Our Core Principles',
      saferPlay: 'Protected Play',
      saferPlayDesc: 'Strict non-contact enforcement & mandatory safety gear.',
      lowerCost: 'Lower Cost',
      lowerCostDesc: 'Affordable fees so everyone can enjoy the game.',
      community: 'Community First',
      communityDesc: "Proud partners with the Montreal Children's Hospital.",
      missionTitle: 'Our Charity Mission',
      missionText: '30% of all league profits are donated directly to the Montreal Children\'s Hospital. Your play helps kids in our community.',
      earlyBird: 'Follow us on Instagram for updates!'
    },
    sponsors: {
      title: 'Our League Partners',
      subtitle: 'Exclusive perks and discounts for Next Gen Hockey players.',
      perkTitle: 'Player Perk',
      prizeTitle: 'League Prize',
      viewAddress: 'Get Directions',
      becomePartner: 'Become a Partner',
      ctaTitle: 'Want to reach our local community?',
      ctaSubtitle: "Join us in supporting the Montreal Children's Hospital while growing your business. Become a Next Gen Hockey partner today.",
      partners: [
        {
          name: 'Subway Delson',
          description: 'Proud local partner of Next Gen Hockey. Fuel up with fresh ingredients before or after your game at the Delson location.',
          perk: 'Exclusive Season Discount Card: Get 20% off your order! Plus, visit with a friend and present a second card to get 6 cookies for only $1.',
          category: 'Food & Drink',
          address: '15, 41 Boulevard Georges-Gagné S Space 35-013, Delson, QC J5B 2E5'
        },
        {
          name: 'Popeyes Delson',
          description: 'Popeyes is a supplements store with the goal of helping athletes be their best physically. They offer a wide range of vitamins, proteins, and performance supplements.',
          perk: '10% discount on every purchase in store + an extra 4% if you create an account (Total of 14% off). Valid starting now!',
          category: 'Health & Supplements',
          address: '66 QC-132, Delson, Quebec J5B 0A1'
        },
        {
          name: 'Pasquier Delson',
          description: 'A premier local grocery store supporting our league champions with quality food and service.',
          perk: '$15 gift card for every member of the Championship team!',
          category: 'Championship Prize',
          address: '31 Boulevard Georges-Gagné S, Delson, QC J5B 2E4',
          isPrize: true,
          prizeType: 'gold'
        },
        {
          name: 'Royal Amusement',
          description: 'The ultimate arcade and entertainment destination in Delson for teams and families.',
          perk: '300 credits for the Finalist team to enjoy at the arcade!',
          category: 'Finalist Prize',
          address: '66 QC-132, Delson, Quebec J5B 0A1',
          isPrize: true,
          prizeType: 'silver'
        },
        {
          name: 'Subway Delson (Prizes)',
          description: 'Subway supports our top teams with fresh catering for their post-season celebrations.',
          perk: '2 sandwich trays for the Champions and 2 sandwich trays for the Finalists!',
          category: 'Championship/Finalist Prize',
          address: '15, 41 Boulevard Georges-Gagné S Space 35-013, Delson, QC J5B 2E5',
          isPrize: true
        }
      ]
    },
    standings: {
      title: 'Statistics',
      rank: 'Rank',
      team: 'Team',
      gp: 'GP',
      w: 'W',
      l: 'L',
      t: 'D',
      pts: 'PTS',
      gf: 'GF',
      ga: 'GA',
      diff: 'DIFF',
      offenseDefense: 'Team Offense vs Defense',
      goalsFor: 'Goals For',
      goalsAgainst: 'Goals Against',
      playerOfMonth: 'Player of the Month',
      prizeLabel: 'Winner Prize',
      topPerformers: 'League Player Stats',
      goalieStats: 'League Goalie Stats',
      playersTab: 'Players',
      goaliesTab: 'Goalies',
      skaters: 'Skaters',
      goalies: 'Goalies',
      goalie: 'Goalie',
      showMore: 'Show More',
      showLess: 'Show Less',
      player: 'Player',
      goals: 'G',
      assists: 'A',
      points: 'PTS',
      record: 'Record',
      gaa: 'GAA',
      svPct: 'Sv%',
      shotsAgainst: 'SA',
      goalsAgainstShort: 'GA',
      teamDetails: 'Team Details',
      roster: 'Roster',
      teamSchedule: 'Team Schedule',
      noPlayers: 'No players registered for this team yet.',
      gaaExplanation: 'GAA (Goals Against Average) = Total Goals Against ÷ Games Played.',
      leagueRank: 'League Rank',
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    },
    schedule: {
      title: 'Schedule',
      filterUpcoming: 'Upcoming',
      filterResults: 'Results',
      tbdTitle: 'Schedule TBD',
      tbdMessage: 'The Summer 2026 season schedule is currently being finalized.',
      tbdSubtitle: 'Check back soon for confirmed game times and locations.',
      buyTickets: 'Buy Tickets',
      viewRecap: 'View Recap',
      unknown: 'Unknown',
      scheduled: 'Scheduled',
      played: 'Played',
      backToSchedule: 'Back to Schedule',
      gameRecap: 'Game Recap',
      scoringSummary: 'Scoring Summary',
      penaltySummary: 'Penalty Summary',
      goalieStats: 'Goalie Statistics',
      period: 'Period',
      time: 'Time',
      team: 'Team',
      scorer: 'Buteur',
      assist: 'Passe',
      penalty: 'Penalty',
      shotsFaced: 'Shots Faced',
      saves: 'Saves',
      goalsAgainst: 'GA',
      noEvents: 'No events recorded.',
      seasonStart: 'Season starts May 10th!',
    },
    gallery: {
      title: 'League Gallery',
      subtitle: 'Capturing the best moments of the season.',
      noImages: 'No images in the gallery yet.',
    },
    register: {
      title: 'Team Registration',
      subtitle: 'Join the Summer 2026 season. Spots are limited.',
      seasonStart: 'Season starts May 10th, 2026',
      pricingTitle: 'Registration Fee',
      pricingSubtitle: 'Transparent pricing with a community mission.',
      formTitle: 'Registration Form',
      earlyBird: 'Early Bird',
      regularRate: 'Regular Rate',
      perTeam: 'per team',
      endsOn: 'Ends on',
      deadline: 'Final Deadline',
      paymentPlan: 'Payment Plan Available',
      installment1: 'First installment: $2,475 by May 1st, 2026',
      installment2: 'Second installment: $1,650 by June 1st, 2026',
      whatsIncluded: 'What is included?',
      includedFeatures: [
        'Minimum 15 games guaranteed',
        'Sponsor Perks',
        'Professional Refereeing',
        'Full Digital Stats & Recaps'
      ],
      teamName: 'Team Name',
      captainName: 'Captain\'s Name',
      rosterSize: 'Estimated Roster Size',
      email: 'Email Address',
      phone: 'Phone Number',
      skillLevel: 'Last Level Played',
      preferredLanguage: 'Preferred Language',
      langEnglish: 'English',
      langFrench: 'French',
      depositInfo: '30% of your registration profits go directly to the Montreal Children\'s Hospital.',
      submit: 'Submit Registration',
      successTitle: 'Registration Received!',
      successTextPart1: 'Thanks for registering',
      successTextPart2: 'We have received your application. Someone will contact you shortly at',
      successTextPart3: 'regarding next steps.',
      registerAnother: 'Register another team',
      placeholders: {
         teamName: 'e.g. The Mighty Pucks',
         skillLevel: 'e.g. High School, Junior B, Beer League Div C'
      }
    },
    rules: {
      pageTitle: 'League Rules & Regulations',
      safetyTitle: 'Safety Guidelines',
      safetyText: 'Play clean, play fair. Respect teammates, opponents, and officials. Zero tolerance for abusive or dangerous behaviour. Safety comes first. While we don’t mandate specific equipment, players are strongly encouraged to wear gear appropriate to the game.',
      contactTitle: 'Non-Contact Policy',
      contactText: "Next Gen Hockey is a strict non-contact league. Intentional body checking is not permitted and will result in penalties. Roughing, fighting, or intent to injure will result in immediate ejection and league review.",
      formatTitle: 'Game Format',
      formatText: 'Each game begins with a 3-minute warmup, with a buzzer sounding at the 1-minute mark to collect pucks. Games consist of three 15-minute running-time periods. All regular-season games that are tied at the final buzzer end in a draw.',
      regsTitle: 'Rulebook',
      regsText: 'Detailed overview of league governance, equipment standards, and code of conduct. Click to view the full rulebook.',
    },
    rulebook: {
      modalTitle: 'Next Gen Hockey Rulebook',
      sections: [
        {
          title: '1. League Overview',
          text: 'Next Gen Hockey is a recreational 5-on-5 hockey league designed to provide a competitive, safe, and enjoyable environment for players of all skill levels. All participants are expected to demonstrate sportsmanship, respect, and fair play at all times.'
        },
        {
          title: '2. League Governance',
          subsections: [
            {
              title: '2.1 League Officials',
              items: [
                'The league is managed by the League Director and Game Operations Team.',
                'Referees have full authority over gameplay, penalties, discipline decisions, and maintaining the safety of all players and staff.'
              ]
            },
            {
              title: '2.2 Communication',
              items: [
                'All schedules, league updates, and announcements will be posted on the official league website and/or sent by email.',
                'Players are responsible for checking updates regularly.'
              ]
            }
          ]
        },
        {
          title: '3. Player Eligibility & Registration',
          subsections: [
            {
              title: '3.1 Eligibility',
              items: ['Participants must be 18 years of age or older.']
            },
            {
              title: '3.2 Waivers',
              items: [
                'All players must sign the official Player Waiver & Liability Release at the start of the season to participate.',
                'The team captain is responsible for ensuring all players have signed their waivers before the first game.'
              ]
            }
          ]
        },
        {
          title: '4. Equipment & Safety',
          subsections: [
            {
              title: '4.1 Equipment Guidelines',
              items: [
                'Players may choose their equipment freely but must wear typical game equipment.',
                'No harmful equipment is permitted.',
                'Players are responsible for wearing appropriate hockey protective equipment and for their own personal safety during participation. Arena and provincial safety regulations may recommend or require equipment such as helmets, facial protection, or neck guards. Players accept full responsibility for their equipment choices and any risks associated.'
              ]
            },
            {
              title: '4.2 Safety Expectations',
              items: [
                'The league is not responsible for injuries, lost equipment, or any damages that occur during gameplay or while in the arena.',
                'Dangerous or reckless behaviour is not tolerated.',
                'Referees and the league reserve the right to remove any player whose actions compromise the safety or integrity of the game.',
                'If damages occur to the arena, the league may require the responsible player(s) to cover the costs.',
                'Alcohol is strictly prohibited on the ice, benches, and in locker rooms. Any violation may result in ejection from the league and/or cancellation of ice time by arena staff and costs may be given out to player(s) responsible.'
              ]
            }
          ]
        },
        {
          title: '5. Ice Time & Game Format',
          subsections: [
            {
              title: '5.0 Ice Rental Limitations',
              items: [
                'The league only rents the ice for the scheduled 1-hour game slot.',
                'Due to limited rental time, games must run on schedule and cannot pause for delays, disputes, or extended stoppages.',
                'Referees and staff will ensure games proceed efficiently to stay within allotted ice time.'
              ]
            },
            {
              title: '5.1 Warmup',
              items: [
                'A 3-minute warmup begins at the scheduled start time.',
                'A buzzer sounds at the 1-minute mark to collect all pucks.'
              ]
            },
            {
              title: '5.2 Period Structure',
              items: [
                'Games consist of three (3) 15-minute periods, all running time.',
                'The clock does not stop unless the referee determines otherwise for safety reasons.'
              ]
            },
            {
              title: '5.3 Tie Games',
              items: [
                'Regular-season games ending in a tie are recorded as a draw.'
              ]
            }
          ]
        },
        {
          title: '6. Game Play Rules',
          subsections: [
            {
              title: '6.1 Format',
              items: [
                'All games are played 5-on-5 with goalies.',
                'Standard penalties, icings, and offsides are in effect.'
              ]
            }
          ]
        },
        {
          title: '7. Penalties & Discipline',
          subsections: [
            {
              title: '7.1 Minor Penalties',
              items: ['Minor infractions result in a 2-minute stop-time penalty.']
            },
            {
              title: '7.2 Major Penalties',
              items: [
                'Major penalties may be issued for dangerous or reckless actions.',
                'Major penalties may also lead to game ejection.'
              ]
            },
            {
              title: '7.3 Misconduct',
              items: [
                'Abusive or disrespectful behaviour toward officials, players, or staff may result in a misconduct penalty or immediate removal.'
              ]
            },
            {
              title: '7.4 Fighting',
              items: [
                'Fighting results in automatic ejection and potential suspension.'
              ]
            },
            {
              title: '7.5 Authority of Referee',
              items: [
                'The referee has full authority to make decisions in the interest of player and staff safety.',
                'The referee may remove any player at their discretion if behaviour becomes unsafe, aggressive, or harmful to the flow of the game.'
              ]
            },
            {
              title: '7.6 League Implementation',
              items: [
                'The league reserves the right to review plays and impose additional disciplinary actions as necessary.'
              ]
            }
          ]
        },
        {
          title: '8. Sportsmanship Policy',
          items: [
            'The league enforces a strict zero-tolerance policy for harassment, discrimination, violence, or intimidation.',
            'Respect for teammates, opponents, staff, and officials is mandatory.',
            'Violations may result in suspension or removal.'
          ]
        },
        {
          title: '9. League Operations',
          subsections: [
            {
              title: '9.1 Schedule',
              items: [
                'Game schedules are posted before the season begins.',
                'Rescheduling is not guaranteed due to limited ice availability.'
              ]
            },
            {
              title: '9.2 Attendance & Forfeits',
              items: [
                'Teams must be ready to begin the game at the scheduled time.',
                'A team unable to field enough players within 5 minutes of start time forfeits the game.',
                'A $300 fee will be charged to any team that cannot play without providing at least one week’s notice.',
                'Teams have official access to locker rooms 30 minutes before and after scheduled ice time. If rooms are free earlier, teams may use them; if not, they must wait until the official access window. Players are responsible for keeping locker rooms tidy.'
              ]
            },
            {
              title: '9.3 Standings',
              items: [
                'Win: 2 points',
                'Draw: 1 point',
                'Loss: 0 points'
              ]
            }
          ]
        },
        {
          title: '10. Playoffs (If Applicable)',
          subsections: [
            {
              title: '10.1 Qualification',
              items: [
                'Playoff format depends on the number of teams and season structure.'
              ]
            },
            {
              title: '10.2 Overtime',
              items: [
                'If a playoff game ends tied:',
                '1. 5-minute sudden-death overtime (running time)',
                '2. If still tied → 3-player shootout',
                '3. If still tied → sudden-death shootout'
              ]
            }
          ]
        },
        {
          title: '11. Refund & Cancellation Policy',
          items: [
            'No refunds are provided once the season begins unless the league cancels multiple games with no rescheduling.',
            'Arena-related cancellations (equipment failure, weather, etc.) are handled by rink policy, not the league.'
          ]
        },
        {
          title: '12. Payments & Registration',
          items: [
            'All teams must complete the Next Gen Hockey Registration & Payment Agreement before the first game.',
            'Registration fees, early payment discounts, installment plans, and deadlines are outlined in the agreement.',
            'Teams failing to pay on time may be removed from the league without refund.'
          ]
        },
        {
          title: '13. Code of Conduct',
          items: [
            'Demonstrate respect toward officials, players, and staff',
            'Avoid dangerous or reckless play',
            'Follow on-ice rules and referee instructions',
            'Maintain a positive environment for all participants'
          ],
          footer: 'Violation of the Code of Conduct may result in removal from the league without refund.'
        },
        {
          title: '14. Amendments',
          text: 'The league reserves the right to modify rules and policies at any time to improve fairness, safety, and league operations. All changes will be communicated to participants.'
        }
      ]
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have questions or concerns? Reach out to the league director directly.',
      formTitle: 'Send a Message',
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Email',
      successTitle: 'Message Sent',
      successText: 'Thanks for reaching out! The league director will get back to you shortly.',
      sendAnother: 'Send another message',
      directInfo: 'Direct Contact Info',
      directorRole: 'League Director',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location'
    },
    footer: {
      rights: '© 2026 Next Gen Hockey League. All rights reserved.',
      followUs: 'Follow us!',
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      standings: 'Statistiques',
      schedule: 'Calendrier',
      rules: 'Règlements',
      sponsors: 'Partenaires',
      contact: 'Nous Contacter',
      register: 'INSCRIRE ÉQUIPE',
    },
    hero: {
      seasonMsg: 'Inscriptions Saison Été Ouvertes',
      futureOf: 'La Prochaine Génération',
      recHockey: 'du Hockey',
      description: "Joignez-vous à une ligue récréative qui met l’accent sur la sécurité, l’accessibilité et le jeu axé sur la communauté.",
      registerNow: "S'inscrire",
      principlesTitle: 'Nos Principes Fondamentaux',
      saferPlay: 'Jeu Protégé',
      saferPlayDesc: 'Application stricte du sans-contact & équipement obligatoire.',
      lowerCost: 'Moindre Coût',
      lowerCostDesc: 'Frais abordables pour que tout le monde puisse jouer.',
      community: 'Communauté',
      communityDesc: "Fiers partenaires de l'Hôpital de Montréal pour enfants.",
      missionTitle: 'Notre Mission Caritative',
      missionText: '30 % de tous les profits de la ligue sont versés directement à l\'Hôpital de Montréal pour enfants. Votre jeu aide les enfants de notre communauté.',
      earlyBird: 'Suivez-nous sur Instagram pour les nouvelles !'
    },
    sponsors: {
      title: 'Nos Partenaires',
      subtitle: 'Avantages exclusifs et rabais pour les joueurs de Next Gen Hockey.',
      perkTitle: 'Avantage Joueur',
      prizeTitle: 'Prix de la Ligue',
      viewAddress: 'Directions',
      becomePartner: 'Devenir partenaire',
      ctaTitle: 'Vous voulez rejoindre notre communauté locale ?',
      ctaSubtitle: "Joignez-vous à nous pour soutenir l'Hôpital de Montréal pour enfants tout en développant votre entreprise. Devenez partenaire de Next Gen Hockey dès aujourd'hui.",
      partners: [
        {
          name: 'Subway Delson',
          description: 'Fier partenaire local de Next Gen Hockey. Faites le plein d\'énergie avec des ingrédients frais avant ou après votre match à la succursale de Delson.',
          perk: 'Carte de rabais exclusive pour la saison : Obtenez 20 % de rabais sur votre commande ! De plus, visitez avec un ami et présentez une deuxième carte pour obtenir 6 biscuits pour seulement 1 $.',
          category: 'Restauration',
          address: '15, 41 Boulevard Georges-Gagné S Space 35-013, Delson, QC J5B 2E5'
        },
        {
          name: 'Popeyes Delson',
          description: 'Popeyes est un magasin de suppléments dont l\'objectif est d\'aider les athlètes à donner le meilleur d\'eux-mêmes physiquement. Ils offrent une vaste gamme de vitamines, protéines et suppléments de performance.',
          perk: 'Rabais de 10 % sur chaque achat en magasin + 4 % supplémentaire si vous créez un compte (Total de 14 % de rabais). Valide dès maintenant !',
          category: 'Santé et Suppléments',
          address: '66 QC-132, Delson, Quebec J5B 0A1'
        },
        {
          name: 'Pasquier Delson',
          description: 'Une épicerie locale de premier plan soutenant nos champions de ligue avec des produits et un service de qualité.',
          perk: 'Une carte-cadeau de 15 $ pour chaque membre de l\'équipe championne des séries !',
          category: 'Prix Championnat',
          address: '31 Boulevard Georges-Gagné S, Delson, QC J5B 2E4',
          isPrize: true,
          prizeType: 'gold'
        },
        {
          name: 'Royal Amusement',
          description: 'La destination ultime d\'arcade et de divertissement à Delson pour les équipes et les familles.',
          perk: '300 crédits pour l\'équipe finaliste à utiliser à l\'arcade !',
          category: 'Prix Finaliste',
          address: '66 QC-132, Delson, Quebec J5B 0A1',
          isPrize: true,
          prizeType: 'silver'
        },
        {
          name: 'Subway Delson (Prix)',
          description: 'Subway soutient nos meilleures équipes avec un service de traiteur frais pour leurs célébrations de fin de saison.',
          perk: '2 plateaux de sous-marins pour les champions et 2 plateaux pour les finalistes !',
          category: 'Prix Championnat/Finaliste',
          address: '15, 41 Boulevard Georges-Gagné S Space 35-013, Delson, QC J5B 2E5',
          isPrize: true
        }
      ]
    },
    standings: {
      title: 'Statistiques',
      rank: 'Rang',
      team: 'Équipe',
      gp: 'PJ',
      w: 'V',
      l: 'D',
      t: 'N',
      pts: 'PTS',
      gf: 'BP',
      ga: 'BC',
      diff: 'DIFF',
      offenseDefense: "Offensive vs Défensive d'Équipe",
      goalsFor: 'Buts Pour',
      goalsAgainst: 'Buts Contre',
      playerOfMonth: 'Joueur du mois',
      prizeLabel: 'Prix du gagnant',
      topPerformers: 'Stats des Joueurs',
      goalieStats: 'Stats des Gardiens',
      playersTab: 'Joueurs',
      goaliesTab: 'Gardiens',
      skaters: 'Joueurs',
      goalies: 'Gardiens',
      goalie: 'Gardien',
      showMore: 'Voir Plus',
      showLess: 'Voir Moins',
      player: 'Joueur',
      goals: 'B',
      assists: 'P',
      points: 'PTS',
      record: 'Fiche',
      gaa: 'Moy.',
      svPct: '% Arr',
      shotsAgainst: 'TC',
      goalsAgainstShort: 'BA',
      teamDetails: "Détails de l'Équipe",
      roster: 'Alignement',
      teamSchedule: "Calendrier de l'Équipe",
      noPlayers: 'Aucun joueur inscrit pour cette équipe.',
      gaaExplanation: 'Moy. (Moyenne de buts alloués) = Total des buts alloués ÷ Parties jouées.',
      leagueRank: 'Rang de la Ligue',
      months: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ]
    },
    schedule: {
      title: 'Calendrier',
      filterUpcoming: 'À venir',
      filterResults: 'Résultats',
      tbdTitle: 'Calendrier à venir',
      tbdMessage: 'Le calendrier de la saison été 2026 est en cours de finalisation.',
      tbdSubtitle: 'Revenez bientôt pour les heures et lieux de match confirmés.',
      buyTickets: 'Acheter Billets',
      viewRecap: 'Voir Résumé',
      unknown: 'Inconnu',
      scheduled: 'Prévu',
      played: 'Joué',
      backToSchedule: 'Retour au Calendrier',
      gameRecap: 'Résumé du Match',
      scoringSummary: 'Sommaire du Pointage',
      penaltySummary: 'Sommaire des Pénalités',
      goalieStats: 'Stats des Gardiens',
      period: 'Période',
      time: 'Temps',
      team: 'Équipe',
      scorer: 'Buteur',
      assist: 'Passe',
      penalty: 'Pénalité',
      shotsFaced: 'Tirs Reçus',
      saves: 'Arrêts',
      goalsAgainst: 'BC',
      noEvents: 'Aucun événement enregistré.',
      seasonStart: 'La saison débute le 10 mai !',
    },
    gallery: {
      title: 'Galerie de la Ligue',
      subtitle: 'Capturer les meilleurs moments de la saison.',
      noImages: 'Aucune image dans la galerie pour le moment.',
    },
    register: {
      title: 'Inscription d\'Équipe',
      subtitle: 'Rejoignez la saison Été 2026. Places limitées.',
      seasonStart: 'La saison débute le 10 mai 2026',
      pricingTitle: "Frais d'inscription",
      pricingSubtitle: 'Des prix transparents avec une mission caritative.',
      formTitle: "Formulaire d'inscription",
      earlyBird: 'Paiement anticipé',
      regularRate: 'Tarif Régulier',
      perTeam: 'par équipe',
      endsOn: 'Se termine le',
      deadline: 'Date Limite Finale',
      paymentPlan: 'Plan de paiement disponible',
      installment1: 'Premier versement : 2 475 $ d\'ici le 1er mai 2026',
      installment2: 'Deuxième versement : 1 650 $ d\'ici le 1er juin 2026',
      whatsIncluded: 'Ce qui est inclus ?',
      includedFeatures: [
        'Minimum de 15 matchs garantis',
        'Avantages partenaires',
        'Arbitrage professionnel',
        'Statistiques et résumés numériques'
      ],
      teamName: 'Nom de l\'Équipe',
      captainName: 'Nom du Capitaine',
      rosterSize: 'Taille Estimée de l\'Alignement',
      email: 'Courriel',
      phone: 'Numéro de Téléphone',
      skillLevel: 'Dernier Niveau Joué',
      preferredLanguage: 'Langue Préférée',
      langEnglish: 'Anglais',
      langFrench: 'Français',
      deadlineSoon: 'Date à venir bientôt !',
      tbd: 'À déterminer',
      depositInfo: '30 % des profits de votre inscription sont reversés directement à l\'Hôpital de Montréal pour enfants.',
      submit: 'Soumettre Inscription',
      successTitle: 'Inscription Reçue!',
      successTextPart1: 'Merci d\'avoir inscrit',
      successTextPart2: 'Nous avons bien reçu votre candidature. Quelqu\'un vous contactera sous peu à',
      successTextPart3: 'concernant les prochaines étapes.',
      registerAnother: 'Inscrire une autre équipe',
      placeholders: {
         teamName: 'ex: Les Puissants Pucks',
         skillLevel: 'ex: Secondaire, Junior B, Ligue de Garage C'
      }
    },
    rules: {
      pageTitle: 'Règlements de la Ligue',
      safetyTitle: 'Directives de Sécurité',
      safetyText: 'Jouez propre, jouez juste. Respectez vos coéquipiers, adversaires et officiels. Tolérance zéro pour les comportements abusifs ou dangereux. La sécurité avant tout. Bien que nous n\'imposions pas d\'équipement spécifique, les joueurs sont fortement encouragés à porter un équipement adapté au jeu.',
      contactTitle: 'Politique Sans Contact',
      contactText: "Next Gen Hockey est une ligue strictement sans contact. La mise en échec intentionnelle est interdite. La rudesse, les bagarres ou l'intention de blesser entraîneront une expulsion immédiate.",
      formatTitle: 'Format des Matchs',
      formatText: 'Chaque match commence par un échauffement de 3 minutes, avec une sonnerie à 1 minute pour ramasser les rondelles. Les matchs se composent de trois périodes de 15 minutes à temps continu. Tous les matchs de saison régulière qui sont à égalité à la sonnerie finale se terminent par un match nul.',
      regsTitle: 'Règlements',
      regsText: 'Aperçu détaillé de la gouvernance, de l\'équipement et du code de conduite. Cliquez pour voir le règlement complet.',
    },
    rulebook: {
      modalTitle: 'Règlements de la Ligue Next Gen Hockey',
      sections: [
        {
          title: '1. Aperçu de la ligue',
          text: 'Next Gen Hockey est une ligue de hockey récréative à 5 contre 5 conçue pour offrir un environnement compétitif, sécuritaire et agréable aux joueurs de tous les niveaux. Tous les participants sont tenus de faire preuve d\'esprit sportif, de respect et de fair-play en tout temps.'
        },
        {
          title: '2. Gouvernance de la ligue',
          subsections: [
            {
              title: '2.1 Officiels de la ligue',
              items: [
                'La ligue est gérée par le directeur de la ligue et l\'équipe des opérations de match.',
                'Les arbitres ont toute autorité sur le déroulement du jeu, les pénalités, les décisions disciplinaires et le maintien de la sécurité de tous les joueurs et du personnel.'
              ]
            },
            {
              title: '2.2 Communication',
              items: [
                'Tous les horaires, mises à jour et annonces seront publiés sur le site web officiel de la ligue et/ou envoyés par courriel.',
                'Les joueurs sont responsables de vérifier régulièrement les mises à jour.'
              ]
            }
          ]
        },
        {
          title: '3. Éligibilité et inscription des joueurs',
          subsections: [
            {
              title: '3.1 Éligibilité',
              items: ['Les participants doivent être âgés de 18 ans ou plus.']
            },
            {
              title: '3.2 Décharges',
              items: [
                'Tous les joueurs doivent signer la décharge officielle de responsabilité au début de la saison pour participer.',
                'Le capitaine de l\'équipe est responsable de s\'assurer que tous les joueurs ont signé leur décharge avant le premier match.'
              ]
            }
          ]
        },
        {
          title: '4. Équipement et sécurité',
          subsections: [
            {
              title: '4.1 Directives sur l\'équipement',
              items: [
                'Les joueurs peuvent choisir leur équipement librement mais doivent porter l\'équipement de jeu typique.',
                'Aucun équipement dangereux n\'est autorisé.',
                'Les joueurs sont responsables de porter l\'équipement de protection de hockey approprié et de leur propre sécurité personnelle pendant la participation. Les règlements de l\'aréna et de la province peuvent recommander ou exiger des équipements tels que des casques, une protection faciale ou des protège-cous. Les joueurs acceptent l\'entière responsabilité de leurs choix d\'équipement et de tout risque associé.'
              ]
            },
            {
              title: '4.2 Attentes en matière de sécurité',
              items: [
                'La ligue n\'est pas responsable des blessures, de la perte d\'équipement ou de tout dommage survenant pendant le jeu ou à l\'intérieur de l\'aréna.',
                'Les comportements dangereux ou téméraires ne sont pas tolérés.',
                'Les arbitres et la ligue se réservent le droit d\'expulser tout joueur dont les actions compromettent la sécurité ou l\'intégrité du jeu.',
                'En cas de dommages à l\'aréna, la ligue peut exiger que le(s) joueur(s) responsable(s) couvre(nt) les frais.',
                'L\'alcool est strictement interdit sur la glace, les bancs et dans les vestiaires. Toute violation peut entraîner l\'expulsion de la ligue et/ou l\'annulation du temps de glace par le personnel de l\'aréna et des frais peuvent être facturés au(x) joueur(s) responsable(s).'
              ]
            }
          ]
        },
        {
          title: '5. Temps de glace et format des matchs',
          subsections: [
            {
              title: '5.0 Limitations de location de glace',
              items: [
                'La ligue ne loue la glace que pour la période de match prévue de 1 heure.',
                'En raison du temps de location limité, les matchs doivent se dérouler selon l\'horaire et ne peuvent être interrompus pour des retards, des litiges ou des arrêts prolongés.',
                'Les arbitres et le personnel veilleront à ce que les matchs se déroulent efficacement pour respecter le temps de glace alloué.'
              ]
            },
            {
              title: '5.1 Échauffement',
              items: [
                'Un échauffement de 3 minutes commence à l\'heure de début prévue.',
                'Une sonnerie retentit à la marque de 1 minute pour ramasser toutes les rondelles.'
              ]
            },
            {
              title: '5.2 Structure des périodes',
              items: [
                'Les matchs se composent de trois (3) périodes de 15 minutes, toutes à temps continu.',
                'Le chrono ne s\'arrête pas, sauf décision de l\'arbitre pour des raisons de sécurité.'
              ]
            },
            {
              title: '5.3 Matchs nuls',
              items: [
                'Les matchs de saison régulière se terminant par une égalité sont enregistrés comme nuls.'
              ]
            }
          ]
        },
        {
          title: '6. Règles de jeu',
          subsections: [
            {
              title: '6.1 Format',
              items: [
                'Tous les matchs se jouent à 5 contre 5 avec gardiens.',
                'Les pénalités standard, les dégagements interdits (icings) et les hors-jeux sont en vigueur.'
              ]
            }
          ]
        },
        {
          title: '7. Pénalités et discipline',
          subsections: [
            {
              title: '7.1 Pénalités mineures',
              items: ['Les infractions mineures entraînent une pénalité de 2 minutes à temps arrêté.']
            },
            {
              title: '7.2 Pénalités majeures',
              items: [
                'Des pénalités majeures peuvent être imposées pour des actions dangereuses ou téméraires.',
                'Les pénalités majeures peuvent également entraîner l\'expulsion du match.'
              ]
            },
            {
              title: '7.3 Inconduite',
              items: [
                'Un comportement abusif ou irrespectueux envers les officiels, les joueurs ou le personnel peut entraîner une pénalité d\'inconduite ou une expulsion immédiate.'
              ]
            },
            {
              title: '7.4 Bagarres',
              items: [
                'Les bagarres entraînent une expulsion automatique et une suspension potentielle.'
              ]
            },
            {
              title: '7.5 Autorité de l\'arbitre',
              items: [
                'L\'arbitre a toute autorité pour prendre des décisions dans l\'intérêt de la sécurité des joueurs et du personnel.',
                'L\'arbitre peut expulser tout joueur à sa discrétion si le comportement devient dangereux, agressif ou nuisible au déroulement du match.'
              ]
            },
            {
              title: '7.6 Mise en œuvre de la ligue',
              items: [
                'La ligue se réserve le droit de réviser les jeux et d\'imposer des mesures disciplinaires supplémentaires si nécessaire.'
              ]
            }
          ]
        },
        {
          title: '8. Politique d\'esprit sportif',
          items: [
            'La ligue applique une politique de tolérance zéro pour le harcèlement, la discrimination, la violence ou l\'intimidation.',
            'Le respect des coéquipiers, des adversaires, du personnel et des officiels est obligatoire.',
            'Les violations peuvent entraîner une suspension ou une expulsion.'
          ]
        },
        {
          title: '9. Opérations de la ligue',
          subsections: [
            {
              title: '9.1 Horaire',
              items: [
                'Les horaires des matchs sont publiés avant le début de la saison.',
                'Le report de match n\'est pas garanti en raison de la disponibilité limitée de la glace.'
              ]
            },
            {
              title: '9.2 Présence et forfaits',
              items: [
                'Les équipes doivent être prêtes à commencer le match à l\'heure prévue.',
                'Une équipe incapable d\'aligner suffisamment de joueurs dans les 5 minutes suivant l\'heure de début perd le match par forfait.',
                'Des frais de 300 $ seront facturés à toute équipe qui ne peut pas jouer sans donner un préavis d\'au moins une semaine.',
                'Les équipes ont un accès officiel aux vestiaires 30 minutes avant et après le temps de glace prévu. Si les vestiaires sont libres plus tôt, les équipes peuvent les utiliser ; sinon, elles doivent attendre l\'ouverture officielle. Les joueurs sont responsables de garder les vestiaires propres.'
              ]
            },
            {
              title: '9.3 Classement',
              items: [
                'Victoire : 2 points',
                'Nul : 1 point',
                'Défaite : 0 point'
              ]
            }
          ]
        },
        {
          title: '10. Séries éliminatoires (si applicable)',
          subsections: [
            {
              title: '10.1 Qualification',
              items: [
                'Le format des séries éliminatoires dépend du nombre d\'équipes et de la structure de la saison.'
              ]
            },
            {
              title: '10.2 Prolongation',
              items: [
                'Si un match de séries se termine par une égalité :',
                '1. Prolongation de 5 minutes à mort subite (temps continu)',
                '2. Si toujours l\'égalité → tirs de barrage à 3 joueurs',
                '3. Si toujours l\'égalité → tirs de barrage à mort subite'
              ]
            }
          ]
        },
        {
          title: '11. Politique de remboursement et d\'annulation',
          items: [
            'Aucun remboursement n\'est accordé une fois la saison commencée, sauf si la ligue annule plusieurs matchs sans reprogrammation.',
            'Les annulations liées à l\'aréna (défaillance de l\'équipement, météo, etc.) sont gérées par la politique de la patinoire, et non par la ligue.'
          ]
        },
        {
          title: '12. Paiements et inscription',
          items: [
            'Toutes les équipes doivent remplir l\'accord d\'inscription et de paiement de Next Gen Hockey avant le premier match.',
            'Les frais d\'inscription, les rabais pour paiement anticipé, les plans de versement et les dates limites sont détaillés dans l\'accord.',
            'Les équipes ne payant pas à temps peuvent être retirées de la ligue sans remboursement.'
          ]
        },
        {
          title: '13. Code de conduite',
          items: [
            'Faire preuve de respect envers les officiels, les joueurs et le personnel',
            'Éviter les jeux dangereux ou téméraires',
            'Suivre les règles sur glace et les instructions des arbitres',
            'Maintenir un environnement positif pour tous les participants'
          ],
          footer: 'La violation du code de conduite peut entraîner l\'expulsion de la ligue sans remboursement.'
        },
        {
          title: '14. Amendements',
          text: 'La ligue se réserve le droit de modifier les règles et les politiques à tout moment pour améliorer l\'équité, la sécurité et les opérations de la ligue. Tous les changements seront communiqués aux participants.'
        }
      ]
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Des questions ou des préoccupations? Contactez directement le directeur de la ligue.',
      formTitle: 'Envoyer un message',
      name: 'Votre Nom',
      email: 'Votre Courriel',
      subject: 'Sujet',
      message: 'Message',
      submit: 'Envoyer',
      successTitle: 'Message Envoyé',
      successText: 'Merci de nous avoir contactés! Le directeur de la ligue vous répondra sous peu.',
      sendAnother: 'Envoyer un autre message',
      directInfo: 'Info de Contact Direct',
      directorRole: 'Directeur de la Ligue',
      emailLabel: 'Courriel',
      phoneLabel: 'Téléphone',
      locationLabel: 'Lieu'
    },
    footer: {
      rights: '© 2026 Ligue de Hockey Next Gen. Tous droits réservés.',
      followUs: 'Suivez-nous !',
    }
  }
};
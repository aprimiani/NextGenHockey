export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      standings: 'Statistics',
      schedule: 'Schedule',
      rules: 'Rules',
      sponsors: 'Sponsors',
      assistant: 'AI Assistant',
      contact: 'Contact Us',
      register: 'REGISTER TEAM',
    },
    hero: {
      seasonMsg: 'Summer Season Registration Open',
      futureOf: 'The Next Generation',
      recHockey: 'of Hockey',
      description: "Join a recreational league that prioritizes safety, affordability, and community-driven play.",
      registerNow: 'Register Now',
      askAssistant: 'Ask Assistant',
      principlesTitle: 'Our Core Principles',
      saferPlay: 'Protected Play',
      saferPlayDesc: 'Strict non-contact enforcement & mandatory safety gear.',
      lowerCost: 'Lower Cost',
      lowerCostDesc: 'Affordable fees so everyone can enjoy the game.',
      community: 'Community First',
      communityDesc: "Proud partners with the Montreal Children's Hospital.",
      missionTitle: 'Our Charity Mission',
      missionText: '30% of all league proceeds are donated directly to the Montreal Children\'s Hospital. Your play helps kids in our community.',
    },
    sponsors: {
      title: 'Our League Partners',
      subtitle: 'Exclusive perks and discounts for Next Gen Hockey players.',
      perkTitle: 'Player Perk',
      viewAddress: 'Get Directions',
      becomePartner: 'Become a Partner',
      ctaTitle: 'Want to reach our local community?',
      ctaSubtitle: "Join us in supporting the Montreal Children's Hospital while growing your business. Become a Next Gen Hockey partner today.",
      partners: [
        {
          name: 'Subway Delson',
          description: 'Proud local partner of Next Gen Hockey. Fuel up with fresh ingredients before or after your game at the Delson location.',
          perk: 'Exclusive Season Discount Card: Buy any 6-inch sub and a drink, get a second 6-inch sub for FREE! (Valid all season)',
          category: 'Food & Drink',
          address: '15, 41 Boulevard Georges-Gagné S Space 35-013, Delson, QC J5B 2E5'
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
      topPerformers: 'League Player Stats',
      goalieStats: 'League Goalie Stats',
      playersTab: 'Players',
      goaliesTab: 'Goalies',
      skaters: 'Skaters',
      goalies: 'Goalies',
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
      gaaExplanation: 'GAA (Goals Against Average) = Total Goals Against ÷ Games Played.'
    },
    schedule: {
      title: 'Game Schedule',
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
    },
    assistant: {
      title: 'AI Assistant',
      subtitle: 'Powered by AI to help you get in the game faster.',
      placeholder: 'Ask about schedule, rules, or fees...',
      thinking: 'Thinking...',
      initialMessage: 'Hi! I am the Next Gen Hockey AI Assistant. Ask me about league rules, schedule, registration, or our partnership with the Montreal Children\'s Hospital!',
    },
    register: {
      title: 'Team Registration',
      subtitle: 'Join the Summer 2026 season. Spots are limited.',
      teamName: 'Team Name',
      captainName: 'Captain\'s Name',
      rosterSize: 'Estimated Roster Size',
      email: 'Email Address',
      phone: 'Phone Number',
      skillLevel: 'Last Level Played',
      preferredLanguage: 'Preferred Language',
      langEnglish: 'English',
      langFrench: 'French',
      depositInfo: '30% of your registration proceeds go directly to the Montreal Children\'s Hospital.',
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
            },
            {
              title: '3.3 Substitute Players',
              items: [
                'Substitute players are permitted during the regular season.',
                'To be eligible to participate in playoff games, a substitute player must have played in a minimum of four (4) regular-season games with the same team.',
                'Any player who has not met this minimum requirement will be ineligible for playoffs, regardless of waiver status.',
                'The league reserves the right to verify player participation and enforce eligibility rules at its discretion.'
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
                'Players are strongly encouraged to wear full cages and neck guards.'
              ]
            },
            {
              title: '4.2 Safety Expectations',
              items: [
                'The league is not responsible for injuries, lost equipment, or any damages that occur during gameplay.',
                'Dangerous or reckless behaviour is not tolerated.',
                'Referees reserve the right to remove any player whose actions compromise safety.',
                'If damages occur to the arena, responsible players may be required to cover the costs.'
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
                'Games must run on schedule and cannot pause for extended stoppages.'
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
                'The clock does not stop unless determined by the referee for safety reasons.'
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
                'Major penalties result in potential game ejection.',
                'Fighting results in automatic ejection and potential suspension.'
              ]
            },
            {
              title: '7.3 Authority of Referee',
              items: [
                'Referees have full authority to remove any player at their discretion if behaviour becomes unsafe.'
              ]
            }
          ]
        },
        {
          title: '8. Sportsmanship Policy',
          text: 'The league enforces a strict zero-tolerance policy for harassment, discrimination, violence, or intimidation. Respect for teammates, opponents, staff, and officials is mandatory.'
        },
        {
          title: '9. League Operations',
          subsections: [
            {
              title: '9.2 Attendance & Forfeits',
              items: [
                'Teams must be ready to begin at the scheduled time.',
                'A team unable to field players within 5 minutes forfeits the game.',
                'A $300 fee will be charged to any team failing to show without one week notice.'
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
          title: '10. Playoffs',
          subsections: [
            {
              title: '10.2 Overtime',
              items: [
                '5-minute sudden-death overtime (running time)',
                '3-player shootout',
                'Sudden-death shootout'
              ]
            }
          ]
        },
        {
          title: '11. Refund Policy',
          text: 'No refunds are provided once the season begins unless the league cancels multiple games with no rescheduling.'
        },
        {
          title: '12. Payments & Registration',
          text: 'All teams must complete the Next Gen Hockey Registration & Payment Agreement before the first game. Failure to pay on time may lead to removal from the league.'
        },
        {
          title: '13. Code of Conduct',
          items: [
            'Demonstrate respect toward officials, players, and staff',
            'Avoid dangerous or reckless play',
            'Follow on-ice rules and referee instructions'
          ],
          footer: 'Violation of the Code of Conduct may result in removal from the league without refund.'
        },
        {
          title: '14. Amendments',
          text: 'The league reserves the right to modify rules at any time to improve fairness and safety.'
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
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      standings: 'Statistiques',
      schedule: 'Calendrier',
      rules: 'Règlements',
      sponsors: 'Partenaires',
      assistant: 'Assistant IA',
      contact: 'Nous Contacter',
      register: 'INSCRIRE ÉQUIPE',
    },
    hero: {
      seasonMsg: 'Inscriptions Saison Été Ouvertes',
      futureOf: 'La Prochaine Génération',
      recHockey: 'du Hockey',
      description: "Joignez-vous à une ligue récréative qui met l’accent sur la sécurité, l’accessibilité et le jeu axé sur la communauté.",
      registerNow: "S'inscrire",
      askAssistant: 'Assistant',
      principlesTitle: 'Nos Principes Fondamentaux',
      saferPlay: 'Jeu Protégé',
      saferPlayDesc: 'Application stricte du sans-contact & équipement obligatoire.',
      lowerCost: 'Moindre Coût',
      lowerCostDesc: 'Frais abordables pour que tout le monde puisse jouer.',
      community: 'Communauté',
      communityDesc: "Fiers partenaires de l'Hôpital de Montréal pour enfants.",
      missionTitle: 'Notre Mission Caritative',
      missionText: '30 % de tous les revenus de la ligue sont versés directement à l\'Hôpital de Montréal pour enfants. Votre jeu aide les enfants de notre communauté.',
    },
    sponsors: {
      title: 'Nos Partenaires',
      subtitle: 'Avantages exclusifs et rabais pour les joueurs de Next Gen Hockey.',
      perkTitle: 'Avantage Joueur',
      viewAddress: 'Directions',
      becomePartner: 'Devenir partenaire',
      ctaTitle: 'Vous voulez rejoindre notre communauté locale ?',
      ctaSubtitle: "Joignez-vous à nous pour soutenir l'Hôpital de Montréal pour enfants tout en développant votre entreprise. Devenez partenaire de Next Gen Hockey dès aujourd'hui.",
      partners: [
        {
          name: 'Subway Delson',
          description: 'Fier partenaire local de Next Gen Hockey. Faites le plein d\'énergie avec des ingrédients frais avant ou après votre match à la succursale de Delson.',
          perk: 'Carte de rabais exclusive pour la saison : Achetez un sous-marin de 6 pouces et une boisson, obtenez un deuxième sous-marin de 6 pouces GRATUITEMENT ! (Valide toute la saison)',
          category: 'Restauration',
          address: '15, 41 Boulevard Georges-Gagné S Space 35-013, Delson, QC J5B 2E5'
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
      topPerformers: 'Stats des Joueurs',
      goalieStats: 'Stats des Gardiens',
      playersTab: 'Joueurs',
      goaliesTab: 'Gardiens',
      skaters: 'Joueurs',
      goalies: 'Gardiens',
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
      gaaExplanation: 'Moy. (Moyenne de buts alloués) = Total des buts alloués ÷ Parties jouées.'
    },
    schedule: {
      title: 'Calendrier des Matchs',
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
    },
    assistant: {
      title: 'Assistant IA',
      subtitle: "Propulsé par l'IA pour vous aider à jouer plus rapidement.",
      placeholder: "Demandez sur l'horaire, les règles ou les frais...",
      thinking: 'Réflexion...',
      initialMessage: 'Bonjour! Je suis l\'Assistant IA Next Gen Hockey. Posez-moi des questions sur les règlements, l\'horaire, l\'inscription ou notre partenariat avec l\'Hôpital de Montréal pour enfants!',
    },
    register: {
      title: 'Inscription d\'Équipe',
      subtitle: 'Rejoignez la saison Été 2026. Places limitées.',
      teamName: 'Nom de l\'Équipe',
      captainName: 'Nom du Capitaine',
      rosterSize: 'Taille Estimée de l\'Alignement',
      email: 'Courriel',
      phone: 'Numéro de Téléphone',
      skillLevel: 'Dernier Niveau Joué',
      preferredLanguage: 'Langue Préférée',
      langEnglish: 'Anglais',
      langFrench: 'Français',
      depositInfo: '30 % de vos frais d\'inscription sont reversés directement à l\'Hôpital de Montréal pour enfants.',
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
            },
            {
              title: '3.3 Joueurs remplaçants',
              items: [
                'Les joueurs remplaçants sont autorisés pendant la saison régulière.',
                'Pour être éligible à participer aux matchs de séries éliminatoires, un joueur remplaçant doit avoir disputé un minimum de quatre (4) matchs de saison régulière avec la même équipe.',
                "Tout joueur n'ayant pas satisfait à cette exigence minimale sera inéligible pour les séries éliminatoires, quel que soit son statut de décharge.",
                "La ligue se réserve le droit de vérifier la participation des joueurs et d'appliquer les règles d'éligibilité à sa discrétion."
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
                'Les joueurs sont fortement encouragés à porter une grille complète et un protège-cou.'
              ]
            },
            {
              title: '4.2 Attentes en matière de sécurité',
              items: [
                'La ligue n\'est pas responsable des blessures, de la perte d\'équipement ou de tout dommage survenant pendant le jeu.',
                'Les comportements dangereux ou téméraires ne sont pas tolérés.',
                'Les arbitres se réservent le droit d\'expulser tout joueur dont les actions compromettent la sécurité.',
                'En cas de dommages à l\'aréna, les joueurs responsables peuvent être tenus de couvrir les frais.'
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
                'Les matchs doivent se dérouler selon l\'horaire et ne peuvent être interrompus pour des arrêts prolongés.'
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
                'Les pénalités majeures peuvent entraîner l\'expulsion du match.',
                'Les bagarres entraînent une expulsion automatique et une suspension potentielle.'
              ]
            },
            {
              title: '7.3 Autorité de l\'arbitre',
              items: [
                'Les arbitres ont toute autorité pour expulser tout joueur à leur discrétion si le comportement devient dangereux.'
              ]
            }
          ]
        },
        {
          title: '8. Politique d\'esprit sportif',
          text: 'La ligue applique une politique de tolérance zéro pour le harcèlement, la discrimination, la violence ou l\'intimidation. Le respect des coéquipiers, des adversaires, du personnel et des officiels est obligatoire.'
        },
        {
          title: '9. Opérations de la ligue',
          subsections: [
            {
              title: '9.2 Présence et forfaits',
              items: [
                'Les équipes doivent être prêtes à commencer à l\'heure prévue.',
                'Une équipe incapable d\'aligner des joueurs dans les 5 minutes perd le match par forfait.',
                'Des frais de 300 $ seront facturés à toute équipe ne se présentant pas sans préavis d\'une semaine.'
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
          title: '10. Séries éliminatoires',
          subsections: [
            {
              title: '10.2 Prolongation',
              items: [
                'Prolongation de 5 minutes à mort subite (temps continu)',
                'Tirs de barrage à 3 joueurs',
                'Tirs de barrage à mort subite'
              ]
            }
          ]
        },
        {
          title: '11. Politique de remboursement',
          text: 'Aucun remboursement n\'est accordé une fois la saison commencée, sauf si la ligue annule plusieurs matchs sans reprogrammation.'
        },
        {
          title: '12. Paiements et inscription',
          text: 'Toutes les équipes doivent remplir l\'accord d\'inscription et de paiement avant le premier match. Le défaut de paiement à temps peut entraîner le retrait de la ligue.'
        },
        {
          title: '13. Code de conduite',
          items: [
            'Faire preuve de respect envers les officiels, les joueurs et le personnel',
            'Éviter les jeux dangereux ou téméraires',
            'Suivre les règles sur glace et les instructions des arbitres'
          ],
          footer: 'La violation du code de conduite peut entraîner l\'expulsion de la ligue sans remboursement.'
        },
        {
          title: '14. Amendments',
          text: 'The league reserves the right to modify rules at any time to improve fairness and safety.'
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
    }
  }
};
import { Team, Game, PlayerStats, GoalieStats, GameRecapData, PlayerOfMonth } from './types';

export const EMAILJS_CONFIG = { SERVICE_ID: 'service_o7zd8ri', PUBLIC_KEY: 'HViFUqA9NIBXgSDaO', CONTACT_TEMPLATE_ID: 'template_ysbjhgn', REGISTRATION_TEMPLATE_ID: 'template_efmg0t4' };

export const PLAYER_OF_THE_MONTH: PlayerOfMonth = {
  "playerId": "",
  "month": 4,
  "gp": 0,
  "goals": 0,
  "assists": 0,
  "points": 0,
  "prize": "Free 6\" Trio Sandwich from Subway (Sandwich + Combo Meal)",
  "year": 2026,
  "prizeEn": "Free 6 inch trio from Subway Delson!",
  "prizeFr": "Trio sandwich 6 pouces de Subway Delson!"
};

export const PRICING_DATA = {
  EARLY_BIRD: {
    price: 3025,
    deadline: '2026-04-04',
  },
  REGULAR: {
    price: 4125,
    deadline: '2026-05-01',
  },
  INCLUDES: [
    'Minimum 15 games guaranteed',
    'Sponsor Perks',
    'Professional Refereeing',
    'Full Digital Stats & Recaps'
  ]
};

export const TEAMS: Team[] = [
  {
    "id": "1",
    "name": "Bots",
    "gp": 3,
    "wins": 2,
    "losses": 1,
    "ties": 0,
    "points": 4,
    "goalsFor": 15,
    "goalsAgainst": 16,
    "logoColor": "#f59e0b"
  },
  {
    "id": "2",
    "name": "Jets",
    "gp": 3,
    "wins": 1,
    "losses": 0,
    "ties": 2,
    "points": 4,
    "goalsFor": 14,
    "goalsAgainst": 9,
    "logoColor": "#14b8a6"
  },
  {
    "id": "3",
    "name": "Milf Hunters",
    "gp": 3,
    "wins": 0,
    "losses": 2,
    "ties": 1,
    "points": 1,
    "goalsFor": 8,
    "goalsAgainst": 14,
    "logoColor": "#8b5cf6"
  },
  {
    "id": "4",
    "name": "Redlight",
    "gp": 3,
    "wins": 3,
    "losses": 0,
    "ties": 0,
    "points": 6,
    "goalsFor": 15,
    "goalsAgainst": 7,
    "logoColor": "#ef4444"
  },
  {
    "id": "t_1775579370484",
    "name": "Wise Guys",
    "gp": 3,
    "wins": 1,
    "losses": 2,
    "ties": 0,
    "points": 2,
    "goalsFor": 13,
    "goalsAgainst": 15,
    "logoColor": "#3b82f6"
  },
  {
    "id": "t_1775579415800",
    "name": "Frozen Furries",
    "gp": 3,
    "wins": 0,
    "losses": 2,
    "ties": 1,
    "points": 1,
    "goalsFor": 13,
    "goalsAgainst": 17,
    "logoColor": "#84cc16"
  }
];

export const SCHEDULE: Game[] = [
  {
    "id": "g_1771797304880",
    "date": "2026-05-10",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "played",
    "homeScore": 8,
    "awayScore": 5
  },
  {
    "id": "g_1771797306185",
    "date": "2026-05-10",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "played",
    "homeScore": 4,
    "awayScore": 4
  },
  {
    "id": "g_1771797872922",
    "date": "2026-05-17",
    "time": "13:00",
    "homeTeamId": "2",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "played",
    "homeScore": 4,
    "awayScore": 4
  },
  {
    "id": "g_1771797873825",
    "date": "2026-05-17",
    "time": "18:30",
    "homeTeamId": "3",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "played",
    "homeScore": 3,
    "awayScore": 8
  },
  {
    "id": "g_1771797944802",
    "date": "2026-05-24",
    "time": "15:00",
    "homeTeamId": "4",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "played",
    "homeScore": 2,
    "awayScore": 1
  },
  {
    "id": "g_1771797945252",
    "date": "2026-05-24",
    "time": "18:30",
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "played",
    "homeScore": 4,
    "awayScore": 5
  },
  {
    "id": "g_1771797985096",
    "date": "2026-06-07",
    "time": "14:00",
    "homeTeamId": "3",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797985623",
    "date": "2026-06-07",
    "time": "18:30",
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798031618",
    "date": "2026-06-14",
    "time": "14:00",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798035904",
    "date": "2026-06-14",
    "time": "18:30",
    "homeTeamId": "4",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798132582",
    "date": "2026-06-21",
    "time": "14:00",
    "homeTeamId": "t_1775579370484",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798133140",
    "date": "2026-06-21",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798173663",
    "date": "2026-06-28",
    "time": "14:00",
    "homeTeamId": "2",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798174326",
    "date": "2026-06-28",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798270556",
    "date": "2026-07-05",
    "time": "14:00",
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798271082",
    "date": "2026-07-05",
    "time": "18:30",
    "homeTeamId": "4",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798333497",
    "date": "2026-07-12",
    "time": "14:00",
    "homeTeamId": "4",
    "awayTeamId": "1",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798334065",
    "date": "2026-07-12",
    "time": "18:30",
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798416249",
    "date": "2026-07-19",
    "time": "14:00",
    "homeTeamId": "2",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798417193",
    "date": "2026-07-19",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798464840",
    "date": "2026-07-26",
    "time": "14:00",
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798465348",
    "date": "2026-08-02",
    "time": "14:00",
    "homeTeamId": "4",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798502143",
    "date": "2026-07-26",
    "time": "18:30",
    "homeTeamId": "4",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798534024",
    "date": "2026-08-02",
    "time": "18:30",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771798564661",
    "date": "2026-05-10",
    "time": "19:30",
    "homeTeamId": "4",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "played",
    "homeScore": 5,
    "awayScore": 3
  },
  {
    "id": "g_1771798604938",
    "date": "2026-05-17",
    "time": "19:30",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "played",
    "homeScore": 6,
    "awayScore": 5
  },
  {
    "id": "g_1776044151164",
    "date": "2026-05-24",
    "time": "19:30",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "played",
    "homeScore": 1,
    "awayScore": 6
  },
  {
    "id": "g_1776044151738",
    "date": "2026-06-07",
    "time": "19:30",
    "homeTeamId": "4",
    "awayTeamId": "1",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044152353",
    "date": "2026-06-14",
    "time": "19:30",
    "homeTeamId": "2",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044153503",
    "date": "2026-06-21",
    "time": "19:30",
    "homeTeamId": "2",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044375120",
    "date": "2026-06-28",
    "time": "19:30",
    "homeTeamId": "4",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044376146",
    "date": "2026-07-05",
    "time": "19:30",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044439898",
    "date": "2026-08-02",
    "time": "19:30",
    "homeTeamId": "3",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044440781",
    "date": "2026-07-26",
    "time": "19:30",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044442188",
    "date": "2026-07-19",
    "time": "19:30",
    "homeTeamId": "4",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044443034",
    "date": "2026-07-12",
    "time": "19:30",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  }
];

export const ALL_PLAYERS: PlayerStats[] = [
  {
    "id": "p1",
    "name": "Alessandro Primiani",
    "teamId": "1",
    "gp": 1,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_1775579858742",
    "name": "Alexandre Boisjoly",
    "teamId": "t_1775579370484",
    "gp": 3,
    "goals": 1,
    "assists": 2,
    "points": 3
  },
  {
    "id": "p_1767082325178",
    "name": "Alexandre Marchand",
    "teamId": "2",
    "gp": 2,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_alexandre_marquis_177914",
    "name": "Alexandre Marquis",
    "teamId": "4",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591101444",
    "name": "Alexei Larose",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962869757",
    "name": "Alexis Belleau",
    "teamId": "2",
    "gp": 3,
    "goals": 3,
    "assists": 4,
    "points": 7
  },
  {
    "id": "p_1773774313607",
    "name": "Alexis De Almeida",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774485424",
    "name": "Alexis Janvier-Jetté",
    "teamId": "4",
    "gp": 3,
    "goals": 1,
    "assists": 2,
    "points": 3
  },
  {
    "id": "p_1772917065337",
    "name": "Alexis Levesque",
    "teamId": "3",
    "gp": 3,
    "goals": 1,
    "assists": 1,
    "points": 2
  },
  {
    "id": "p_1773774486160",
    "name": "Alexis Poirier",
    "teamId": "4",
    "gp": 1,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_1771962942416",
    "name": "Antoine Roy",
    "teamId": "2",
    "gp": 3,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1767082324693",
    "name": "Arnaud Gamelin",
    "teamId": "1",
    "gp": 2,
    "goals": 2,
    "assists": 2,
    "points": 4
  },
  {
    "id": "p_1775591152854",
    "name": "Caleb Laurie",
    "teamId": "t_1775579415800",
    "gp": 2,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_1775582149892",
    "name": "Cédric Auger",
    "teamId": "t_1775579370484",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_christopher_hebert",
    "name": "Christopher Hebert",
    "teamId": "t_1775579370484",
    "gp": 1,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1773774610888",
    "name": "Danick Aubert-Larose",
    "teamId": "4",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917091771",
    "name": "Danick Boissonneault",
    "teamId": "3",
    "gp": 3,
    "goals": 1,
    "assists": 1,
    "points": 2
  },
  {
    "id": "p_1775591028719",
    "name": "Dylan Caplan-Boutet",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 2,
    "assists": 2,
    "points": 4
  },
  {
    "id": "p_1772917089971",
    "name": "Eric Brunelle",
    "teamId": "3",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774487631",
    "name": "Ethan Lebeau",
    "teamId": "4",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962944635",
    "name": "Félix Belleau",
    "teamId": "2",
    "gp": 3,
    "goals": 1,
    "assists": 1,
    "points": 2
  },
  {
    "id": "p_1771962890109",
    "name": "Félix Dupuis",
    "teamId": "2",
    "gp": 1,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_1772917094310",
    "name": "Félix Girard",
    "teamId": "3",
    "gp": 3,
    "goals": 2,
    "assists": 1,
    "points": 3
  },
  {
    "id": "p_1772917205487",
    "name": "Frederic Brodeur",
    "teamId": "3",
    "gp": 1,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1767082310061",
    "name": "Gabriel Savard",
    "teamId": "1",
    "gp": 3,
    "goals": 0,
    "assists": 2,
    "points": 2
  },
  {
    "id": "p_1775591027631",
    "name": "Isaac Huberman",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 5,
    "assists": 2,
    "points": 7
  },
  {
    "id": "p_1775579857302",
    "name": "Jacob Riel",
    "teamId": "t_1775579370484",
    "gp": 3,
    "goals": 3,
    "assists": 3,
    "points": 6
  },
  {
    "id": "p_1775591027128",
    "name": "Jake Thompson",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082286306",
    "name": "Jérémy Dumont",
    "teamId": "1",
    "gp": 3,
    "goals": 3,
    "assists": 2,
    "points": 5
  },
  {
    "id": "p_1772917089084",
    "name": "Justin Gerin lajoie",
    "teamId": "3",
    "gp": 3,
    "goals": 3,
    "assists": 0,
    "points": 3
  },
  {
    "id": "p_1771962941457",
    "name": "Kevin Croteau",
    "teamId": "2",
    "gp": 2,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_kevin_croteau_wiseguys",
    "name": "Kevin Croteau",
    "teamId": "t_1775579370484",
    "gp": 1,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_kyle_noseworthy",
    "name": "Kyle Noseworthy",
    "teamId": "t_1775579415800",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591141404",
    "name": "Liam Chysyk",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 2,
    "assists": 2,
    "points": 4
  },
  {
    "id": "p_1771962876661",
    "name": "Liam Notebeart",
    "teamId": "2",
    "gp": 3,
    "goals": 3,
    "assists": 1,
    "points": 4
  },
  {
    "id": "p_1773774484701",
    "name": "Loik Lemieux-Roy",
    "teamId": "4",
    "gp": 3,
    "goals": 1,
    "assists": 5,
    "points": 6
  },
  {
    "id": "p3",
    "name": "Lucas Molinaro",
    "teamId": "1",
    "gp": 2,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1775591029324",
    "name": "Mackenzie Newman",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774488345",
    "name": "Maël Godbout",
    "teamId": "4",
    "gp": 3,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1775579856558",
    "name": "Malix Garceau",
    "teamId": "t_1775579370484",
    "gp": 3,
    "goals": 0,
    "assists": 3,
    "points": 3
  },
  {
    "id": "p_1775162084185",
    "name": "Marc Poirier",
    "teamId": "2",
    "gp": 3,
    "goals": 1,
    "assists": 2,
    "points": 3
  },
  {
    "id": "p_1773774483853",
    "name": "Marc-Antoine Gamelin",
    "teamId": "4",
    "gp": 3,
    "goals": 5,
    "assists": 5,
    "points": 10
  },
  {
    "id": "p_1772917090874",
    "name": "Mathis Aubin",
    "teamId": "3",
    "gp": 3,
    "goals": 0,
    "assists": 2,
    "points": 2
  },
  {
    "id": "p_1775580097968",
    "name": "Mathis Lecourtois",
    "teamId": "t_1775579370484",
    "gp": 2,
    "goals": 1,
    "assists": 1,
    "points": 2
  },
  {
    "id": "p_1775579857978",
    "name": "Mathis Pelletier",
    "teamId": "t_1775579370484",
    "gp": 2,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1772917092637",
    "name": "Mathis Sylvain",
    "teamId": "3",
    "gp": 3,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1775579861062",
    "name": "Maxim Garceau",
    "teamId": "t_1775579370484",
    "gp": 2,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1773774486881",
    "name": "Maxime Gagné",
    "teamId": "4",
    "gp": 3,
    "goals": 1,
    "assists": 4,
    "points": 5
  },
  {
    "id": "p4",
    "name": "Michael-Joseph Primiani",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962945887",
    "name": "Micky Dunberry",
    "teamId": "2",
    "gp": 2,
    "goals": 4,
    "assists": 2,
    "points": 6
  },
  {
    "id": "p_1775591101053",
    "name": "Nathan Godin",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 1,
    "assists": 1,
    "points": 2
  },
  {
    "id": "p_olivier_bellerose",
    "name": "Olivier Bellerose",
    "teamId": "t_1775579415800",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082302464",
    "name": "Olivier St-Cyr",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579861768",
    "name": "Samuel Jette",
    "teamId": "t_1775579370484",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917093420",
    "name": "Simon Fleury",
    "teamId": "3",
    "gp": 3,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_1771962943297",
    "name": "Simon Roy",
    "teamId": "2",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579860292",
    "name": "Thierry Charbonneau",
    "teamId": "t_1775579370484",
    "gp": 3,
    "goals": 4,
    "assists": 2,
    "points": 6
  },
  {
    "id": "p_1772917204934",
    "name": "Thomas Asselin",
    "teamId": "3",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591101854",
    "name": "Thomas Sousa Moniz",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 2,
    "assists": 2,
    "points": 4
  },
  {
    "id": "p2",
    "name": "Todd Mumford",
    "teamId": "1",
    "gp": 2,
    "goals": 2,
    "assists": 0,
    "points": 2
  },
  {
    "id": "p_1773774610374",
    "name": "Vincent Gagnon",
    "teamId": "4",
    "gp": 3,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579859505",
    "name": "Vincent Gagnon",
    "teamId": "t_1775579370484",
    "gp": 3,
    "goals": 3,
    "assists": 0,
    "points": 3
  },
  {
    "id": "p_1772917204341",
    "name": "Vincent Legros",
    "teamId": "3",
    "gp": 3,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1773774609841",
    "name": "William Gauthier",
    "teamId": "4",
    "gp": 3,
    "goals": 2,
    "assists": 3,
    "points": 5
  },
  {
    "id": "p_1775591028160",
    "name": "William Taylor",
    "teamId": "t_1775579415800",
    "gp": 3,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082323831",
    "name": "Jérémy Quenneville",
    "teamId": "1",
    "gp": 2,
    "goals": 4,
    "assists": 2,
    "points": 6
  },
  {
    "id": "p_1767082317648",
    "name": "Zachary Hébert",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774489039",
    "name": "Zachary Marchand",
    "teamId": "4",
    "gp": 2,
    "goals": 1,
    "assists": 0,
    "points": 1
  },
  {
    "id": "p_1778425131558",
    "name": "Ryan Turcotte",
    "teamId": "1",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1778425132617",
    "name": "Anthony Roy",
    "teamId": "1",
    "gp": 1,
    "goals": 2,
    "assists": 1,
    "points": 3
  },
  {
    "id": "p_1778425149518",
    "name": "Nathan Riendeau",
    "teamId": "1",
    "gp": 2,
    "goals": 1,
    "assists": 5,
    "points": 6
  },
  {
    "id": "p_1778475164469",
    "name": "Aiden Kirkwood",
    "teamId": "t_1775579415800",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1778475181683",
    "name": "Félix Gamache",
    "teamId": "2",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1778475185005",
    "name": "Theo Lemieux",
    "teamId": "2",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1778475186778",
    "name": "Bryan Zhechev",
    "teamId": "3",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1778475187253",
    "name": "Emile Hovington",
    "teamId": "3",
    "gp": 3,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1778475248942",
    "name": "Vincent Brunet",
    "teamId": "4",
    "gp": 3,
    "goals": 3,
    "assists": 3,
    "points": 6
  },
  {
    "id": "p_1778475249644",
    "name": "Alec Isabelle",
    "teamId": "4",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1779046254383",
    "name": "Logan Anderson",
    "teamId": "t_1775579415800",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1779046255069",
    "name": "Alexis Beaulieu",
    "teamId": "t_1775579415800",
    "gp": 2,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1779046291797",
    "name": "Éric Legaré",
    "teamId": "2",
    "gp": 1,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1779046292592",
    "name": "Alexis Boulerice",
    "teamId": "2",
    "gp": 1,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1779046293465",
    "name": "Marc-Olivier Côté",
    "teamId": "2",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1779144310000",
    "name": "Philippe Labrie",
    "teamId": "4",
    "gp": 1,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1779144311000",
    "name": "Andrew Taylor",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1779144312000",
    "name": "Justin Vaillant",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 1,
    "points": 1
  },
  {
    "id": "p_1779144313000",
    "name": "Justin Grenier",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 2,
    "points": 2
  },
  {
    "id": "p_vincent_boulerice",
    "name": "Vincent Boulerice",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_xavier_lussier",
    "name": "Xavier Lussier",
    "teamId": "1",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0
  }
];

export const GOALIE_STATS: GoalieStats[] = [
  {
    "id": "g1",
    "name": "Nicolas Primiani",
    "teamId": "t_1775579415800",
    "gp": 3,
    "wins": 0,
    "losses": 2,
    "draws": 1,
    "saves": 74,
    "shotsAgainst": 91,
    "goalsAgainst": 17
  },
  {
    "id": "goalie_1767082104234",
    "name": "William Thibodeau",
    "teamId": "1",
    "gp": 2,
    "wins": 2,
    "losses": 0,
    "draws": 0,
    "saves": 54,
    "shotsAgainst": 64,
    "goalsAgainst": 10
  },
  {
    "id": "goalie_1771963002603",
    "name": "William Dumont",
    "teamId": "2",
    "gp": 3,
    "wins": 1,
    "losses": 0,
    "draws": 2,
    "saves": 65,
    "shotsAgainst": 74,
    "goalsAgainst": 9
  },
  {
    "id": "goalie_1773774693729",
    "name": "Alexandre Langlais",
    "teamId": "4",
    "gp": 3,
    "wins": 3,
    "losses": 0,
    "draws": 0,
    "saves": 67,
    "shotsAgainst": 74,
    "goalsAgainst": 7
  },
  {
    "id": "goalie_ephram_labonville_177914",
    "name": "Ephram Labonville",
    "teamId": "3",
    "gp": 1,
    "wins": 0,
    "losses": 1,
    "draws": 0,
    "saves": 14,
    "shotsAgainst": 16,
    "goalsAgainst": 2
  },
  {
    "id": "goalie_1775582169664",
    "name": "Guillaume Auger",
    "teamId": "t_1775579370484",
    "gp": 3,
    "goals": 0,
    "assists": 0,
    "points": 0,
    "wins": 1,
    "losses": 2,
    "draws": 0,
    "saves": 69,
    "shotsAgainst": 84,
    "goalsAgainst": 15
  },
  {
    "id": "p_1778475186257",
    "name": "Thomas Tetreault",
    "teamId": "3",
    "gp": 1,
    "wins": 0,
    "losses": 1,
    "draws": 0,
    "saves": 20,
    "shotsAgainst": 28,
    "goalsAgainst": 8
  },
  {
    "id": "goalie_1776783555439",
    "name": "Dave Fortin",
    "teamId": "3",
    "gp": 1,
    "goals": 0,
    "assists": 0,
    "points": 0,
    "wins": 0,
    "losses": 0,
    "draws": 1,
    "saves": 28,
    "shotsAgainst": 32,
    "goalsAgainst": 4
  },
  {
    "id": "goalie_adam_rizk",
    "name": "Adam Rizk",
    "teamId": "1",
    "gp": 1,
    "wins": 0,
    "losses": 1,
    "draws": 0,
    "saves": 20,
    "shotsAgainst": 26,
    "goalsAgainst": 6
  }
];

export const GAME_RECAPS: Record<string, GameRecapData> = {
  "g_1771797304880": {
    "gameId": "g_1771797304880",
    "events": [
      {
        "id": "e_1778444300781",
        "type": "goal",
        "period": 1,
        "time": "3:02",
        "teamId": "1",
        "player": "p_1767082324693",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444354117",
        "type": "goal",
        "period": 1,
        "time": "6:30",
        "teamId": "1",
        "player": "p_1767082286306",
        "assist": "p_1767082324693",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444368939",
        "type": "goal",
        "period": 1,
        "time": "9:55",
        "teamId": "1",
        "player": "p_1767082323831",
        "assist": "p_1767082286306",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444370318",
        "type": "goal",
        "period": 2,
        "time": "5:30",
        "teamId": "t_1775579415800",
        "player": "p_1775591027631",
        "assist": "p_1775591101053",
        "assist2": "p_1775591101854",
        "details": ""
      },
      {
        "id": "e_1778444370758",
        "type": "goal",
        "period": 2,
        "time": "8:04",
        "teamId": "1",
        "player": "p_1767082286306",
        "assist": "p_1767082323831",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444371223",
        "type": "goal",
        "period": 2,
        "time": "10:05",
        "teamId": "t_1775579415800",
        "player": "p_1775591027631",
        "assist": "p_1775591101854",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444371663",
        "type": "goal",
        "period": 3,
        "time": "5:22",
        "teamId": "t_1775579415800",
        "player": "p_1775591028719",
        "assist": "p_1775591141404",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444372027",
        "type": "goal",
        "period": 3,
        "time": "8:25",
        "teamId": "1",
        "player": "p_1778425132617",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444612375",
        "type": "goal",
        "period": 3,
        "time": "9:35",
        "teamId": "t_1775579415800",
        "player": "p_1775591027631",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444613163",
        "type": "goal",
        "period": 3,
        "time": "10:18",
        "teamId": "1",
        "player": "p_1767082324693",
        "assist": "p_1767082286306",
        "assist2": "p_1767082323831",
        "details": ""
      },
      {
        "id": "e_1778444613807",
        "type": "goal",
        "period": 3,
        "time": "11:25",
        "teamId": "t_1775579415800",
        "player": "p_1775591141404",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444711860",
        "type": "goal",
        "period": 3,
        "time": "12:35",
        "teamId": "1",
        "player": "p_1778425132617",
        "assist": "p_1778425149518",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778444712330",
        "type": "goal",
        "period": 3,
        "time": "13:45",
        "teamId": "1",
        "player": "p1",
        "assist": "p_1778425132617",
        "assist2": "p_1778425149518",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_1767082104234",
        "shotsFaced": 31,
        "goalsAgainst": 5,
        "saves": 26
      },
      "awayGoalie": {
        "playerId": "g1",
        "shotsFaced": 28,
        "goalsAgainst": 8,
        "saves": 20
      }
    }
  },
  "g_1771797306185": {
    "gameId": "g_1771797306185",
    "events": [
      {
        "id": "e_1778463811776",
        "type": "goal",
        "period": 1,
        "time": "9:15",
        "teamId": "3",
        "player": "p_1772917089084",
        "assist": "p_1772917065337",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778463812310",
        "type": "goal",
        "period": 1,
        "time": "9:40",
        "teamId": "2",
        "player": "p_1771962945887",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778463812827",
        "type": "goal",
        "period": 1,
        "time": "12:00",
        "teamId": "3",
        "player": "p_1772917094310",
        "assist": "p_1772917092637",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778463813338",
        "type": "goal",
        "period": 1,
        "time": "14:50",
        "teamId": "2",
        "player": "p_1771962945887",
        "assist": "p_1775162084185",
        "assist2": "p_1771962869757",
        "details": ""
      },
      {
        "id": "e_1778463813910",
        "type": "goal",
        "period": 2,
        "time": "3:22",
        "teamId": "2",
        "player": "p_1771962869757",
        "assist": "p_1771962945887",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778463814441",
        "type": "goal",
        "period": 2,
        "time": "14:57",
        "teamId": "3",
        "player": "p_1772917091771",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778463815012",
        "type": "goal",
        "period": 3,
        "time": "12:20",
        "teamId": "3",
        "player": "p_1772917093420",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778463815466",
        "type": "goal",
        "period": 3,
        "time": "14:50",
        "teamId": "2",
        "player": "p_1771962869757",
        "assist": "",
        "assist2": "",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_1771963002603",
        "shotsFaced": 26,
        "goalsAgainst": 4,
        "saves": 22
      },
      "awayGoalie": {
        "playerId": "goalie_1776783555439",
        "shotsFaced": 32,
        "goalsAgainst": 4,
        "saves": 28
      }
    }
  },
  "g_1771798564661": {
    "gameId": "g_1771798564661",
    "events": [
      {
        "id": "e_1778464342466",
        "type": "goal",
        "period": 1,
        "time": "13:00",
        "teamId": "4",
        "player": "p_1773774486881",
        "assist": "p_1773774483853",
        "assist2": "p_1773774485424",
        "details": ""
      },
      {
        "id": "e_1778464343595",
        "type": "goal",
        "period": 2,
        "time": "03:00",
        "teamId": "4",
        "player": "p_1773774485424",
        "assist": "p_1773774488345",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778464344144",
        "type": "goal",
        "period": 2,
        "time": "04:30",
        "teamId": "t_1775579370484",
        "player": "p_1775579860292",
        "assist": "p_1775579858742",
        "assist2": "p_1775579857302",
        "details": ""
      },
      {
        "id": "e_1778464348874",
        "type": "goal",
        "period": 2,
        "time": "05:10",
        "teamId": "4",
        "player": "p_1773774483853",
        "assist": "p_1773774486881",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778464349289",
        "type": "goal",
        "period": 2,
        "time": "08:30",
        "teamId": "t_1775579370484",
        "player": "p_1775579859505",
        "assist": "p_1775579856558",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778464349919",
        "type": "goal",
        "period": 3,
        "time": "02:55",
        "teamId": "4",
        "player": "p_1778475248942",
        "assist": "p_1773774483853",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1778464350462",
        "type": "goal",
        "period": 3,
        "time": "06:00",
        "teamId": "4",
        "player": "p_1778475248942",
        "assist": "p_1773774483853",
        "assist2": "p_1773774485424",
        "details": ""
      },
      {
        "id": "e_1778464351004",
        "type": "goal",
        "period": 3,
        "time": "14:59",
        "teamId": "t_1775579370484",
        "player": "p_1775579860292",
        "assist": "p_1775579857302",
        "assist2": "",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_1773774693729",
        "shotsFaced": 24,
        "goalsAgainst": 3,
        "saves": 21
      },
      "awayGoalie": {
        "playerId": "goalie_1775582169664",
        "shotsFaced": 28,
        "goalsAgainst": 5,
        "saves": 23
      }
    }
  },
  "g_1771797872922": {
    "gameId": "g_1771797872922",
    "events": [
      {
        "id": "e_1779046211981",
        "type": "penalty",
        "period": 3,
        "time": "07:45",
        "teamId": "t_1775579415800",
        "player": "p_1779046254383",
        "assist": "",
        "assist2": "",
        "details": "Minor",
        "penaltyMinutes": 2
      },
      {
        "id": "e_1779046367963",
        "type": "goal",
        "period": 1,
        "time": "07:00",
        "teamId": "2",
        "player": "p_1775162084185",
        "assist": "p_1771962869757",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779046403030",
        "type": "goal",
        "period": 2,
        "time": "13:30",
        "teamId": "t_1775579415800",
        "player": "p_1775591141404",
        "assist": "p_1775591028719",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779046437455",
        "type": "goal",
        "period": 2,
        "time": "15:45",
        "teamId": "t_1775579415800",
        "player": "p_1775591027631",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779046475579",
        "type": "goal",
        "period": 3,
        "time": "03:30",
        "teamId": "2",
        "player": "p_1771962869757",
        "assist": "p_1775162084185",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779046496036",
        "type": "goal",
        "period": 3,
        "time": "05:45",
        "teamId": "2",
        "player": "p_1771962876661",
        "assist": "p_1771962941457",
        "assist2": "p_1771962944635",
        "details": ""
      },
      {
        "id": "e_1779046524446",
        "type": "goal",
        "period": 3,
        "time": "08:15",
        "teamId": "t_1775579415800",
        "player": "p_1775591027631",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779046545193",
        "type": "goal",
        "period": 3,
        "time": "09:45",
        "teamId": "t_1775579415800",
        "player": "p_1775591028719",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779046572055",
        "type": "goal",
        "period": 3,
        "time": "14:25",
        "teamId": "2",
        "player": "p_1771962944635",
        "assist": "p_1779046292592",
        "assist2": "p_1779046291797",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_1771963002603",
        "shotsFaced": 20,
        "goalsAgainst": 4,
        "saves": 16
      },
      "awayGoalie": {
        "playerId": "g1",
        "shotsFaced": 27,
        "goalsAgainst": 4,
        "saves": 23
      }
    }
  },
  "g_1771797873825": {
    "gameId": "g_1771797873825",
    "events": [
      {
        "id": "e_1779078270866",
        "type": "penalty",
        "period": 2,
        "time": "10:42",
        "teamId": "3",
        "player": "p_1772917204341",
        "assist": "",
        "assist2": "",
        "details": "Mise en échec illégale",
        "penaltyMinutes": 2
      },
      {
        "id": "e_1779078364662",
        "type": "penalty",
        "period": 3,
        "time": "03:39",
        "teamId": "3",
        "player": "p_1772917091771",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_1779078419320",
        "type": "penalty",
        "period": 3,
        "time": "05:07",
        "teamId": "3",
        "player": "p_1772917204934",
        "assist": "",
        "assist2": "",
        "details": "Rudess",
        "penaltyMinutes": 2
      },
      {
        "id": "e_1779078484265",
        "type": "goal",
        "period": 1,
        "time": "02:14",
        "teamId": "4",
        "player": "p_1773774609841",
        "assist": "p_1773774484701",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779078506363",
        "type": "goal",
        "period": 1,
        "time": "08:48",
        "teamId": "4",
        "player": "p_1773774486160",
        "assist": "p_1773774486881",
        "assist2": "p_1779144310000",
        "details": ""
      },
      {
        "id": "e_1779078554939",
        "type": "goal",
        "period": 1,
        "time": "10:12",
        "teamId": "3",
        "player": "p_1772917065337",
        "assist": "p_1772917205487",
        "assist2": "p_1772917090874",
        "details": ""
      },
      {
        "id": "e_1779078586639",
        "type": "goal",
        "period": 1,
        "time": "12:41",
        "teamId": "4",
        "player": "p_1773774484701",
        "assist": "p_1778475248942",
        "assist2": "p_1773774483853",
        "details": ""
      },
      {
        "id": "e_1779078626937",
        "type": "goal",
        "period": 1,
        "time": "12:58",
        "teamId": "3",
        "player": "p_1772917089084",
        "assist": "p_1772917094310",
        "assist2": "p_1772917091771",
        "details": ""
      },
      {
        "id": "e_1779078661243",
        "type": "goal",
        "period": 2,
        "time": "03:50",
        "teamId": "3",
        "player": "p_1772917089084",
        "assist": "p_1772917204341",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779078686990",
        "type": "goal",
        "period": 2,
        "time": "14:58",
        "teamId": "4",
        "player": "p_1773774483853",
        "assist": "p_1773774484701",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779078724447",
        "type": "goal",
        "period": 3,
        "time": "05:07",
        "teamId": "4",
        "player": "p_1773774489039",
        "assist": "p_1773774609841",
        "assist2": "p_1773774486881",
        "details": ""
      },
      {
        "id": "e_1779078725232",
        "type": "goal",
        "period": 3,
        "time": "09:38",
        "teamId": "4",
        "player": "p_1773774483853",
        "assist": "p_1773774486881",
        "assist2": "p_1773774484701",
        "details": ""
      },
      {
        "id": "e_1779078726075",
        "type": "goal",
        "period": 3,
        "time": "14:28",
        "teamId": "4",
        "player": "p_1773774483853",
        "assist": "p_1778475248942",
        "assist2": "p_1773774609841",
        "details": ""
      },
      {
        "id": "e_1779078727113",
        "type": "goal",
        "period": 3,
        "time": "14:42",
        "teamId": "4",
        "player": "p_1778475248942",
        "assist": "p_1773774609841",
        "assist2": "p_1773774483853",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "p_1778475186257",
        "shotsFaced": 28,
        "goalsAgainst": 8,
        "saves": 20
      },
      "awayGoalie": {
        "playerId": "goalie_1773774693729",
        "shotsFaced": 24,
        "goalsAgainst": 3,
        "saves": 21
      }
    }
  },
  "g_1771798604938": {
    "gameId": "g_1771798604938",
    "events": [
      {
        "id": "e_1779082302327",
        "type": "penalty",
        "period": 1,
        "time": "03:00",
        "teamId": "1",
        "player": "p_1778425149518",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_1779082304901",
        "type": "penalty",
        "period": 3,
        "time": "14:30",
        "teamId": "1",
        "player": "p_1778425131558",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_1779082338080",
        "type": "goal",
        "period": 1,
        "time": "04:00",
        "teamId": "1",
        "player": "p2",
        "assist": "p_1779144313000",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779082338985",
        "type": "goal",
        "period": 1,
        "time": "09:00",
        "teamId": "t_1775579370484",
        "player": "p_1775579859505",
        "assist": "p_1775579856558",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779082339575",
        "type": "goal",
        "period": 1,
        "time": "09:40",
        "teamId": "1",
        "player": "p_1767082323831",
        "assist": "p_1778425149518",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779082340184",
        "type": "goal",
        "period": 1,
        "time": "10:15",
        "teamId": "1",
        "player": "p_1767082323831",
        "assist": "p_1778425149518",
        "assist2": "p3",
        "details": ""
      },
      {
        "id": "e_1779082340734",
        "type": "goal",
        "period": 1,
        "time": "11:20",
        "teamId": "t_1775579370484",
        "player": "p_1775579860292",
        "assist": "p_1775579857302",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779082341260",
        "type": "goal",
        "period": 1,
        "time": "12:30",
        "teamId": "1",
        "player": "p_1767082323831",
        "assist": "p_1767082310061",
        "assist2": "p_1778425149518",
        "details": ""
      },
      {
        "id": "e_1779082341853",
        "type": "goal",
        "period": 1,
        "time": "14:53",
        "teamId": "t_1775579370484",
        "player": "p_1775579857302",
        "assist": "p_1775579858742",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779082342369",
        "type": "goal",
        "period": 2,
        "time": "09:40",
        "teamId": "1",
        "player": "p2",
        "assist": "p_1779144313000",
        "assist2": "p_1779144312000",
        "details": ""
      },
      {
        "id": "e_1779082343001",
        "type": "goal",
        "period": 2,
        "time": "10:30",
        "teamId": "t_1775579370484",
        "player": "p_1775579857302",
        "assist": "p_1775579860292",
        "assist2": "p_1775579857978",
        "details": ""
      },
      {
        "id": "e_1779082343546",
        "type": "goal",
        "period": 3,
        "time": "05:00",
        "teamId": "1",
        "player": "p_1778425149518",
        "assist": "p_1767082310061",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779082344019",
        "type": "goal",
        "period": 3,
        "time": "06:00",
        "teamId": "t_1775579370484",
        "player": "p_1775579859505",
        "assist": "p_1775579856558",
        "assist2": "p_1775579861062",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_1767082104234",
        "shotsFaced": 33,
        "goalsAgainst": 5,
        "saves": 28
      },
      "awayGoalie": {
        "playerId": "goalie_1775582169664",
        "shotsFaced": 30,
        "goalsAgainst": 6,
        "saves": 24
      }
    }
  },
  "g_1771797944802": {
    "gameId": "g_1771797944802",
    "events": [
      {
        "id": "e_1779679822232",
        "type": "goal",
        "period": 2,
        "time": "11:58",
        "teamId": "4",
        "player": "p_1773774609841",
        "assist": "p_1778475248942",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779679841879",
        "type": "goal",
        "period": 3,
        "time": "9:48",
        "teamId": "3",
        "player": "p_1772917094310",
        "assist": "p_1772917090874",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_1779679842479",
        "type": "goal",
        "period": 3,
        "time": "12:11",
        "teamId": "4",
        "player": "p_1773774483853",
        "assist": "p_1773774484701",
        "assist2": "",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_1773774693729",
        "shotsFaced": 26,
        "goalsAgainst": 1,
        "saves": 25
      },
      "awayGoalie": {
        "playerId": "goalie_ephram_labonville_177914",
        "shotsFaced": 16,
        "goalsAgainst": 2,
        "saves": 14
      }
    }
  },
  "g_1771797945252": {
    "gameId": "g_1771797945252",
    "events": [
      {
        "id": "e_wgff_1",
        "type": "goal",
        "period": 1,
        "time": "03:31",
        "teamId": "t_1775579415800",
        "player": "p_1775591101053",
        "assist": "p_1775591027631",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_wgff_2",
        "type": "penalty",
        "period": 1,
        "time": "03:33",
        "teamId": "t_1775579370484",
        "player": "p_1775579857978",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_wgff_3",
        "type": "goal",
        "period": 1,
        "time": "04:33",
        "teamId": "t_1775579370484",
        "player": "p_1775579857302",
        "assist": "p_christopher_hebert",
        "assist2": "",
        "details": "Powerplay"
      },
      {
        "id": "e_wgff_4",
        "type": "goal",
        "period": 2,
        "time": "05:25",
        "teamId": "t_1775579415800",
        "player": "p_1775591152854",
        "assist": "p_1775591141404",
        "assist2": "",
        "details": "Powerplay"
      },
      {
        "id": "e_wgff_5",
        "type": "penalty",
        "period": 2,
        "time": "10:38",
        "teamId": "t_1775579370484",
        "player": "p_kevin_croteau_wiseguys",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_wgff_6",
        "type": "goal",
        "period": 2,
        "time": "10:51",
        "teamId": "t_1775579415800",
        "player": "p_1775591101854",
        "assist": "p_1775591028719",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_wgff_7",
        "type": "goal",
        "period": 2,
        "time": "11:29",
        "teamId": "t_1775579415800",
        "player": "p_1775591101854",
        "assist": "p_1775591027631",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_wgff_8",
        "type": "goal",
        "period": 2,
        "time": "14:27",
        "teamId": "t_1775579370484",
        "player": "p_1775579858742",
        "assist": "p_1775579860292",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_wgff_9",
        "type": "goal",
        "period": 3,
        "time": "01:28",
        "teamId": "t_1775579370484",
        "player": "p_1775579860292",
        "assist": "p_1775580097968",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_wgff_10",
        "type": "goal",
        "period": 3,
        "time": "07:12",
        "teamId": "t_1775579370484",
        "player": "p_1775580097968",
        "assist": "",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_wgff_11",
        "type": "penalty",
        "period": 3,
        "time": "12:45",
        "teamId": "t_1775579370484",
        "player": "p_1775579861062",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_wgff_12",
        "type": "goal",
        "period": 3,
        "time": "14:59",
        "teamId": "t_1775579370484",
        "player": "p_kevin_croteau_wiseguys",
        "assist": "",
        "assist2": "",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "g1",
        "shotsFaced": 36,
        "goalsAgainst": 5,
        "saves": 31
      },
      "awayGoalie": {
        "playerId": "goalie_1775582169664",
        "shotsFaced": 26,
        "goalsAgainst": 4,
        "saves": 22
      }
    }
  },
  "g_1776044151164": {
    "gameId": "g_1776044151164",
    "events": [
      {
        "id": "e_bj_1",
        "type": "goal",
        "period": 1,
        "time": "08:12",
        "teamId": "1",
        "player": "p_1767082286306",
        "assist": "p_1767082324693",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_bj_2",
        "type": "penalty",
        "period": 1,
        "time": "14:30",
        "teamId": "1",
        "player": "p2",
        "assist": "",
        "assist2": "",
        "details": "Faire trébucher",
        "penaltyMinutes": 2
      },
      {
        "id": "e_bj_3",
        "type": "goal",
        "period": 3,
        "time": "00:28",
        "teamId": "2",
        "player": "p_1771962945887",
        "assist": "p_1771962876661",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_bj_4",
        "type": "goal",
        "period": 3,
        "time": "03:12",
        "teamId": "2",
        "player": "p_1771962876661",
        "assist": "p_1767082325178",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_bj_5",
        "type": "goal",
        "period": 3,
        "time": "07:26",
        "teamId": "2",
        "player": "p_1767082325178",
        "assist": "p_1771962890109",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_bj_6",
        "type": "goal",
        "period": 3,
        "time": "09:50",
        "teamId": "2",
        "player": "p_1771962890109",
        "assist": "p_1771962869757",
        "assist2": "p_1771962945887",
        "details": ""
      },
      {
        "id": "e_bj_7",
        "type": "goal",
        "period": 3,
        "time": "10:37",
        "teamId": "2",
        "player": "p_1771962876661",
        "assist": "p_1771962942416",
        "assist2": "",
        "details": ""
      },
      {
        "id": "e_bj_8",
        "type": "goal",
        "period": 3,
        "time": "11:53",
        "teamId": "2",
        "player": "p_1771962945887",
        "assist": "p_1771962869757",
        "assist2": "",
        "details": ""
      }
    ],
    "goalieStats": {
      "homeGoalie": {
        "playerId": "goalie_adam_rizk",
        "shotsFaced": 26,
        "goalsAgainst": 6,
        "saves": 20
      },
      "awayGoalie": {
        "playerId": "goalie_1771963002603",
        "shotsFaced": 28,
        "goalsAgainst": 1,
        "saves": 27
      }
    }
  }
};

export const SYSTEM_INSTRUCTION = `You are the "League Assistant" for Next Gen Hockey. You provide information about the league, teams, players, schedule, and standings. You can also help with registration and rules.

Current League Data:
- Teams: Bots, Jets, Milf Hunters, Redlight, Wise Guys, Frozen Furries
- Location: Sportium
- Season: Summer 2026 (Starts May 10th)

When asked about specific stats or games, refer to the provided constants. Always be professional, encouraging, and helpful. If you don't know something, suggest contacting the league organizers.`;

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
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#f59e0b"
  },
  {
    "id": "2",
    "name": "Jets",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#14b8a6"
  },
  {
    "id": "3",
    "name": "Milf Hunters",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#8b5cf6"
  },
  {
    "id": "4",
    "name": "Redlight",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#ef4444"
  },
  {
    "id": "t_1775579370484",
    "name": "Wise Guys",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#3b82f6"
  },
  {
    "id": "t_1775579415800",
    "name": "Frozen Furries",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "points": 0,
    "goalsFor": 0,
    "goalsAgainst": 0,
    "logoColor": "#000000"
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
    "status": "scheduled"
  },
  {
    "id": "g_1771797306185",
    "date": "2026-05-10",
    "time": "18:30",
    "homeTeamId": "2",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797872922",
    "date": "2026-05-17",
    "time": "13:00",
    "homeTeamId": "2",
    "awayTeamId": "t_1775579415800",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797873825",
    "date": "2026-05-17",
    "time": "18:30",
    "homeTeamId": "3",
    "awayTeamId": "4",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797944802",
    "date": "2026-05-24",
    "time": "15:00",
    "homeTeamId": "4",
    "awayTeamId": "3",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1771797945252",
    "date": "2026-05-24",
    "time": "18:30",
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
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
    "homeTeamId": "2",
    "awayTeamId": "3",
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
    "homeTeamId": "1",
    "awayTeamId": "t_1775579370484",
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
    "status": "scheduled"
  },
  {
    "id": "g_1771798604938",
    "date": "2026-05-17",
    "time": "19:30",
    "homeTeamId": "1",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  },
  {
    "id": "g_1776044151164",
    "date": "2026-05-24",
    "time": "19:30",
    "homeTeamId": "1",
    "awayTeamId": "2",
    "location": "Sportium",
    "status": "scheduled"
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
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "3",
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
    "homeTeamId": "t_1775579415800",
    "awayTeamId": "t_1775579370484",
    "location": "Sportium",
    "status": "scheduled"
  }
];

export const ALL_PLAYERS: PlayerStats[] = [
  {
    "id": "p1",
    "name": "Alessandro Primiani",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579858742",
    "name": "Alexandre Boisjoly",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082325178",
    "name": "Alexandre Marchand",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591101444",
    "name": "Alexei Larose",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962869757",
    "name": "Alexis Belleau",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
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
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917065337",
    "name": "Alexis Levesque",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774486160",
    "name": "Alexis Poirier",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962942416",
    "name": "Antoine Roy",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082324693",
    "name": "Arnaud Gamelin",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591152854",
    "name": "Caleb Laurie",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775582149892",
    "name": "Cédric Auger",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774610888",
    "name": "Danick Aubert-Larose",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917091771",
    "name": "Danick Boissonneault",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591028719",
    "name": "Dylan Caplan-Boutet",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917089971",
    "name": "Eric Brunelle",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774487631",
    "name": "Ethan Lebeau",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962944635",
    "name": "Félix Belleau",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962890109",
    "name": "Félix Dupuis",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917094310",
    "name": "Félix Girard",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917205487",
    "name": "Frederic Brodeur",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082310061",
    "name": "Gabriel Savard",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591027631",
    "name": "Isaac Huberman",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579857302",
    "name": "Jacob Riel",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
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
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917089084",
    "name": "Justin Gerin lajoie",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962941457",
    "name": "Kevin Croteau",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591141404",
    "name": "Liam Chysyk",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962876661",
    "name": "Liam Notebeart",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774484701",
    "name": "Loik Lemieux-Roy",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p3",
    "name": "Lucas Molinaro",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591029324",
    "name": "Mackenzie Newman",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774488345",
    "name": "Maël Godbout",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579856558",
    "name": "Malix Garceau",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775162084185",
    "name": "Marc Poirier",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774483853",
    "name": "Marc-Antoine Gamelin",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917090874",
    "name": "Mathis Aubin",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775580097968",
    "name": "Mathis Lecourtois",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579857978",
    "name": "Mathis Pelletier",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917092637",
    "name": "Mathis Sylvain",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579861062",
    "name": "Maxim Garceau",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774486881",
    "name": "Maxime Gagné",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p4",
    "name": "Michael-Joseph Primiani",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962945887",
    "name": "Micky Dunberry",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591101053",
    "name": "Nathan Godin",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082302464",
    "name": "Olivier St-Cyr",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579861768",
    "name": "Samuel Jette",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917093420",
    "name": "Simon Fleury",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1771962943297",
    "name": "Simon Roy",
    "teamId": "2",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579860292",
    "name": "Thierry Charbonneau",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917204934",
    "name": "Thomas Asselin",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591101854",
    "name": "Thomas Sousa Moniz",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p2",
    "name": "Todd Mumford",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774610374",
    "name": "Vincent Gagnon",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775579859505",
    "name": "Vincent Gagnon",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1772917204341",
    "name": "Vincent Legros",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774609841",
    "name": "William Gauthier",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1775591028160",
    "name": "William Taylor",
    "teamId": "t_1775579415800",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082323831",
    "name": "Xavier Lussier",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1767082317648",
    "name": "Zachary Hébert",
    "teamId": "1",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0
  },
  {
    "id": "p_1773774489039",
    "name": "Zachary Marchand",
    "teamId": "4",
    "gp": 0,
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
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "goalie_1767082104234",
    "name": "Michael-Joseph Primiani",
    "teamId": "1",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "goalie_1771963002603",
    "name": "William Dumont",
    "teamId": "2",
    "gp": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "goalie_1773774693729",
    "name": "Alexandre Langlais",
    "teamId": "4",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "goalie_1775582169664",
    "name": "Guillaume Auger",
    "teamId": "t_1775579370484",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  },
  {
    "id": "goalie_1776783555439",
    "name": "Dave Fortin",
    "teamId": "3",
    "gp": 0,
    "goals": 0,
    "assists": 0,
    "points": 0,
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "saves": 0,
    "shotsAgainst": 0,
    "goalsAgainst": 0
  }
];

export const GAME_RECAPS: Record<string, GameRecapData> = {};

export const SYSTEM_INSTRUCTION = `You are the "League Assistant" for Next Gen Hockey. You provide information about the league, teams, players, schedule, and standings. You can also help with registration and rules.

Current League Data:
- Teams: Bots, Jets, Milf Hunters, Redlight, Wise Guys, Frozen Furries
- Location: Sportium
- Season: Summer 2026 (Starts May 10th)

When asked about specific stats or games, refer to the provided constants. Always be professional, encouraging, and helpful. If you don't know something, suggest contacting the league organizers.`;

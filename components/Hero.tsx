import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Shield, 
  Trophy, 
  ArrowRight, 
  ChevronRight,
  Star,
  Heart
} from 'lucide-react';
import { NextGenHockeyLogo } from './logos/NextGenHockeyLogo';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeagueData } from '../contexts/LeagueDataContext';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';
  const { teams, players, playerOfMonth } = useLeagueData();

  // Player of the Month details
  const pomPlayer = players.find(p => p.id === playerOfMonth.playerId);
  const pomTeam = teams.find(t => t.id === pomPlayer?.teamId);

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      {/* -------------------------------------------------- */}
      {/* 1. HERO SECTION                                    */}
      {/* -------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-zinc-800">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {/* Season Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-[11px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-sky-400 max-w-full truncate">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0" />
                <span>{isFr ? "Saison d'Hiver 2026-2027" : 'Winter Season 2026-2027'}</span>
                <span className="text-zinc-600 hidden xs:inline">•</span>
                <span className="text-gray-300 hidden xs:inline">{isFr ? 'Inscriptions Ouvertes' : 'Registration Open'}</span>
              </div>

              {/* Summer 2026 Champions Pill */}
              <Link
                to="/hockey/schedule"
                state={{ selectedGameId: 'g_20260906_3' }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-amber-400 hover:bg-amber-500/20 transition-all group max-w-full"
              >
                <Trophy size={13} className="text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">{isFr ? '🏆 Champions Séries Été 2026 : Milf Hunters' : '🏆 Summer 2026 Champions: Milf Hunters'}</span>
              </Link>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <NextGenHockeyLogo className="h-24 sm:h-36 md:h-40 w-auto drop-shadow-[0_10px_25px_rgba(56,189,248,0.25)]" />
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase italic font-display leading-tight mb-4 sm:mb-6">
              <span>{t.hero.futureOf}</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300">
                {t.hero.recHockey}
              </span>
            </h1>

            <p className="text-sm sm:text-xl md:text-2xl font-bold text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              {isFr
                ? 'Ligue de hockey récréative adulte au Centre Sportif de Delson. Échauffement de 3 min, 3 périodes de 16 min, 2 arbitres certifiés, statistiques en direct et esprit sportif.'
                : 'Greater Montreal adult recreational hockey league at Centre Sportif de Delson. 3-min warmup, 3x 16-min periods, 2 certified referees, live stats, and true camaraderie.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-2 sm:px-0">
              <Link
                to="/register?sport=hockey"
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-sky-400 hover:bg-sky-300 text-zinc-950 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>{isFr ? 'Inscrire une Équipe ou Joueur' : 'Register a Team or Player'}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/hockey/schedule"
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-sky-500/40 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Calendar size={16} className="text-sky-400" />
                <span>{isFr ? 'Voir le Calendrier' : 'View Schedule'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 2. QUICK NAVIGATION TILES                          */}
      {/* -------------------------------------------------- */}
      <section className="py-12 sm:py-16 bg-[#090d14] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Tile 1: Stats */}
            <Link
              to="/hockey/standings"
              className="p-5 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Trophy size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase italic font-display text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {isFr ? 'Statistiques & Classement' : 'Stats & Standings'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {isFr
                    ? 'Consultez les résultats, le classement général des équipes par saison et le tableau complet des meilleurs buteurs, passeurs et gardiens.'
                    : 'Check match results, season team rankings, and the full leaderboard for top scorers, playmakers, and goaltenders.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-400">
                <span>{isFr ? 'Accéder aux stats' : 'Access statistics'}</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Tile 2: Calendar */}
            <Link
              to="/hockey/schedule"
              className="p-5 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Calendar size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase italic font-display text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {isFr ? 'Calendrier des Matchs' : 'Match Schedule'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {isFr
                    ? 'Horaires des rencontres de la saison régulière et des séries éliminatoires sur la glace de l’aréna de Delson.'
                    : 'Fixture dates and game times for regular season and playoff rounds at the Delson arena ice rink.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-400">
                <span>{isFr ? 'Voir les horaires' : 'View match times'}</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Tile 3: Rules */}
            <Link
              to="/hockey/rules"
              className="p-5 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase italic font-display text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {isFr ? 'Règlements Officiels' : 'Official Rules'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {isFr
                    ? 'Échauffement de 3 minutes, 3 périodes de 16 minutes, aucun contact corporel toléré, 2 arbitres certifiés et respect du jeu.'
                    : '3-minute warmup, 3x 16-minute periods, strictly non-contact play, 2 certified referees, and sportsmanship.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-400">
                <span>{isFr ? 'Lire les règlements' : 'Read league rules'}</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 3. VENUE SPOTLIGHT                                 */}
      {/* -------------------------------------------------- */}
      <section className="py-12 sm:py-20 bg-[#07090e] border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-zinc-900 to-[#070d18] border border-sky-500/30 shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 text-sky-400 mb-3 sm:mb-4">
              <MapPin size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest">
                {isFr ? 'Aréna Officielle' : 'Official Arena'}
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black uppercase italic font-display text-white mb-3">
              Centre Sportif de Delson
            </h3>

            <p className="text-gray-300 text-xs sm:text-base leading-relaxed mb-6">
              {isFr
                ? 'Disputez vos matchs sur une glace de qualité supérieure avec vestiaires complets avec douches, tableau indicateur électronique, stationnement gratuit et bar-resto sur place.'
                : 'Play your matches on pristine arena ice with spacious locker rooms, electronic scoreboard, free on-site parking, and concession resto-bar.'}
            </p>

            <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-gray-400 space-y-1 mb-6">
              <p className="font-bold text-white">Centre Sportif de Delson</p>
              <p>100 Rue de la Rivière, Delson, QC J5B 1X8</p>
            </div>

            <Link
              to="/register?sport=hockey"
              className="w-full sm:w-auto inline-flex px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-sky-400 hover:bg-sky-300 text-zinc-950 items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all min-h-[44px]"
            >
              <span>{isFr ? 'Réserver la place de votre équipe' : 'Secure your team spot'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 4. PLAYER OF THE MONTH SPOTLIGHT                   */}
      {/* -------------------------------------------------- */}
      {pomPlayer && (
        <section className="py-12 sm:py-16 bg-[#090d14] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl sm:rounded-3xl bg-zinc-900/60 border border-amber-500/30 p-5 sm:p-10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
              <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Star size={28} className="sm:w-8 sm:h-8 fill-amber-400/30" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="inline-block px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-1">
                    {isFr ? 'Joueur du Mois Officiel' : 'Official Player of the Month'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic font-display text-white truncate">
                    {pomPlayer.name}
                  </h3>
                  <div className="text-xs text-gray-300 flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                    <span className="text-amber-300 font-bold">{pomTeam?.name}</span>
                    <span>•</span>
                    <span>{playerOfMonth.goals} {isFr ? 'Buts' : 'Goals'}</span>
                    <span>•</span>
                    <span>{playerOfMonth.assists} {isFr ? 'Passes' : 'Assists'}</span>
                    <span>•</span>
                    <strong className="text-white">{playerOfMonth.points} PTS ({playerOfMonth.gp} GP)</strong>
                  </div>
                </div>
              </div>

              <div className="text-left md:text-right w-full md:max-w-md pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                  {isFr ? 'Prix Offerts par les Partenaires' : 'Official Partner Prize Package'}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {isFr ? playerOfMonth.prizeFr : playerOfMonth.prizeEn}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------- */}
      {/* 5. CHARITY MISSION & COMMUNITY SPONSORS            */}
      {/* -------------------------------------------------- */}
      <section className="py-12 sm:py-20 bg-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Children's Hospital Feature Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-red-950/20 border border-red-500/30 p-5 sm:p-10 mb-10 sm:mb-12 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 w-full md:w-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-1 sm:mt-0">
                <Heart size={24} className="sm:w-8 sm:h-8 text-red-400 fill-red-400/30" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-block px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/40 mb-1.5 sm:mb-2">
                  {isFr ? 'Partenaire Caritatif Officiel' : 'Official Charity Partner'}
                </div>
                <h3 className="text-lg sm:text-2xl font-black uppercase italic text-white font-display leading-tight">
                  {isFr ? "Fondation de l'Hôpital de Montréal pour enfants" : "Montreal Children's Hospital Foundation"}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
                  {isFr
                    ? "NextGen Hockey verse 30 % de ses bénéfices de ligue directement à la Fondation de l'Hôpital de Montréal pour enfants pour soutenir les soins de santé pédiatriques de pointe."
                    : "NextGen Hockey donates 30% of its league profits directly to the Montreal Children's Hospital Foundation to support cutting-edge pediatric care."}
                </p>
              </div>
            </div>

            <Link
              to="/partners"
              className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>{isFr ? 'Notre Engagement' : 'Our Commitment'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Official Community Sponsors Grid */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-sky-400 mb-2">
              {isFr ? 'Commanditaires Officiels' : 'Official Sponsors'}
            </h4>
            <p className="text-xl font-black uppercase italic font-display text-white">
              {isFr ? 'Partenaires de la Saison' : 'Season Partners'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-4xl mx-auto">
            {[
              {
                name: 'Subway Delson',
                category: isFr ? 'Restauration & Partenaire Saisonnier' : 'Dining & Season Partner',
                perk: isFr ? '20% de rabais athlètes' : '20% athlete discount',
              },
              {
                name: 'Popeyes Suppléments Delson',
                category: isFr ? 'Nutrition & Suppléments' : 'Sports Supplements & Nutrition',
                perk: isFr ? 'Cartes-cadeaux & performance' : 'Gift cards & performance support',
              },
              {
                name: 'Pasquier Delson',
                category: isFr ? 'Alimentation & Épicerie Fraîche' : 'Fresh Grocery & Community',
                perk: isFr ? 'Prix officiels Joueur du Mois' : 'Official Player of the Month awards',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-sky-500/40 transition-colors flex flex-col justify-center items-center"
              >
                <span className="text-sm font-black uppercase tracking-wider text-white">
                  {p.name}
                </span>
                <span className="text-[10px] text-sky-400 uppercase tracking-widest mt-1 font-semibold">
                  {p.category}
                </span>
                <span className="text-xs text-zinc-400 mt-2 font-medium">
                  {p.perk}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>{isFr ? 'Voir tous les détails partenaires' : 'View all partner details'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

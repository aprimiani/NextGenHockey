import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Shield, 
  Trophy, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { NextGenSoccerLogo } from '../logos/NextGenSoccerLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { sportsTranslations } from '../../sportsTranslations';
import { SOCCER_CURRENT_SEASON, SOCCER_SCHEDULE } from '../../soccerData';
import { SEO } from '../SEO';

export const SoccerHome: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const t = sportsTranslations[language].soccerHome;

  return (
    <div className="min-h-screen bg-[#070b08] text-white">
      <SEO
        title={isFr ? 'Next Gen Soccer | Ligue de soccer 7v7 à Montréal' : 'Next Gen Soccer | Soccer League in Montreal'}
        description={isFr ? 'Rejoignez Next Gen Soccer, ligue compétitive de soccer 7v7 sur gazon synthétique au Complexe Sportif Delson sur la Rive-Sud de Montréal. Arbitres certifiés.' : 'Join Next Gen Soccer, the premier 7v7 adult synthetic turf soccer league in Delson on Montreal\'s South Shore. Certified referees and full season stats tracking.'}
        canonical="https://nxtgnsports.ca/soccer"
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "SportsClub",
          "name": "Next Gen Soccer",
          "parentOrganization": {
            "@type": "SportsOrganization",
            "name": "Next Gen Sports",
            "url": "https://nxtgnsports.ca/"
          },
          "url": "https://nxtgnsports.ca/soccer",
          "sport": "Soccer",
          "location": {
            "@type": "Place",
            "name": "Complexe Sportif Delson | Sainte-Catherine",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "75 Bd Georges Gagné N",
              "addressLocality": "Delson",
              "addressRegion": "QC",
              "postalCode": "J5B 2E5",
              "addressCountry": "CA"
            }
          }
        }}
      />
      {/* -------------------------------------------------- */}
      {/* 1. HERO SECTION                                     */}
      {/* -------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-zinc-800">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-xs font-black uppercase tracking-widest text-lime-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span>{isFr ? SOCCER_CURRENT_SEASON.nameFr : SOCCER_CURRENT_SEASON.nameEn}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-gray-300">{isFr ? 'Inscriptions Ouvertes' : 'Registration Open'}</span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <NextGenSoccerLogo className="h-28 sm:h-36 md:h-40 w-auto drop-shadow-[0_10px_25px_rgba(132,204,22,0.25)]" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase italic font-display leading-tight mb-6">
              {t.title}
            </h1>

            <p className="text-lg sm:text-2xl font-bold text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register?sport=soccer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-xl shadow-lime-500/25 hover:shadow-lime-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>{isFr ? 'Inscrire une Équipe ou Joueur' : 'Register a Team or Player'}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/soccer/calendrier"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-lime-500/40 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Calendar size={16} className="text-lime-400" />
                <span>{isFr ? 'Voir le Calendrier' : 'View Schedule'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 2. QUICK NAVIGATION TILES                          */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#090e0b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tile 1: Stats */}
            <Link
              to="/soccer/statistiques"
              className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-lime-500/50 hover:shadow-xl hover:shadow-lime-500/10 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-black uppercase italic font-display text-white mb-2 group-hover:text-lime-300 transition-colors">
                  {isFr ? 'Statistiques & Classement' : 'Stats & Standings'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {isFr
                    ? 'Consultez les résultats, le classement général des équipes et le tableau des meilleurs buteurs et passeurs.'
                    : 'Check match outcomes, team rankings, and the leaderboard for top goalscorers and playmakers.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-lime-400">
                <span>{isFr ? 'Accéder aux stats' : 'Access statistics'}</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Tile 2: Calendar */}
            <Link
              to="/soccer/calendrier"
              className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-lime-500/50 hover:shadow-xl hover:shadow-lime-500/10 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-black uppercase italic font-display text-white mb-2 group-hover:text-lime-300 transition-colors">
                  {isFr ? 'Calendrier des Matchs' : 'Match Schedule'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {isFr
                    ? 'Horaires des rencontres de la saison régulière et des séries éliminatoires sur le terrain synthétique.'
                    : 'Fixture dates and kickoff times for regular season and playoff rounds on the turf pitch.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-lime-400">
                <span>{isFr ? 'Voir les horaires' : 'View match times'}</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Tile 3: Rules */}
            <Link
              to="/soccer/reglements"
              className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-lime-500/50 hover:shadow-xl hover:shadow-lime-500/10 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-black uppercase italic font-display text-white mb-2 group-hover:text-lime-300 transition-colors">
                  {isFr ? 'Règlements Officiels' : 'Official Rules'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {isFr
                    ? 'Format 7v7, durée des périodes, fautes & cartons, et critères d\'éligibilité.'
                    : '7v7 match format, period length, fouls & cards, and player eligibility.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-lime-400">
                <span>{isFr ? 'Lire les règlements' : 'Read league rules'}</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 3. LEAGUE HIGHLIGHTS & VENUE                       */}
      {/* -------------------------------------------------- */}
      <section className="py-20 bg-[#070b08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: League specs */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-4">
                {isFr ? 'Standards Professionnels' : 'Professional Standards'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase italic tracking-tight font-display mb-6">
                {t.quickFactsTitle}
              </h2>

              <div className="space-y-4 text-sm sm:text-base">
                {[
                  t.factFormat,
                  t.factSurface,
                  t.factReferees,
                  t.factStats,
                  t.factPrizes
                ].map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <CheckCircle2 size={18} className="text-lime-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200 font-medium">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Venue Spotlight */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-900 to-[#090f0a] border border-lime-500/30 shadow-2xl">
              <div className="flex items-center gap-3 text-lime-400 mb-4">
                <MapPin size={24} />
                <span className="text-xs font-black uppercase tracking-widest">
                  {isFr ? 'Terrain Officiel' : 'Official Pitch'}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase italic font-display text-white mb-3">
                Complexe Sportif Delson | Sainte-Catherine
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {isFr
                  ? 'Disputez vos matchs sur une surface synthétique extérieure éclairée de qualité supérieure, avec vestiaires, stationnement gratuit et bar-resto sur place.'
                  : 'Play your matches on illuminated, pro-grade outdoor synthetic turf, complete with locker rooms, free parking, and on-site resto-bar.'}
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-gray-400 space-y-1 mb-6">
                <p className="font-bold text-white">{SOCCER_CURRENT_SEASON.location}</p>
                <p>{SOCCER_CURRENT_SEASON.address}</p>
              </div>

              <Link
                to="/register?sport=soccer"
                className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-all"
              >
                <span>{isFr ? 'Réserver la place de votre équipe' : 'Secure your team spot'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 4. UPCOMING FIXTURES PREVIEW                       */}
      {/* -------------------------------------------------- */}
      <section className="py-20 bg-[#090e0b] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-lime-400 mb-1">
                {isFr ? 'Saison 2026 • En Préparation' : '2026 Season • In Preparation'}
              </h2>
              <p className="text-2xl font-black uppercase italic font-display text-white">
                {isFr ? 'Calendrier des Matchs' : 'Match Schedule'}
              </p>
            </div>

            <Link
              to="/soccer/calendrier"
              className="text-xs font-black uppercase tracking-wider text-lime-400 hover:text-lime-300 flex items-center gap-1"
            >
              <span>{isFr ? 'Détails du calendrier' : 'Schedule details'}</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {SOCCER_SCHEDULE.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SOCCER_SCHEDULE.slice(0, 3).map((match) => (
                <div
                  key={match.id}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-lime-500/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-3 border-b border-zinc-800">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-lime-400" />
                        <span>{match.date}</span>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-white">
                        <Clock size={13} className="text-lime-400" />
                        <span>{match.time}</span>
                      </span>
                    </div>

                    <div className="space-y-2.5 py-2">
                      <div className="flex items-center justify-between font-black text-sm text-white uppercase italic">
                        <span className="truncate">{match.homeTeamName}</span>
                        <span className="text-zinc-600 text-xs">DOM</span>
                      </div>
                      <div className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        VS
                      </div>
                      <div className="flex items-center justify-between font-black text-sm text-white uppercase italic">
                        <span className="truncate">{match.awayTeamName}</span>
                        <span className="text-zinc-600 text-xs">EXT</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 mt-4 text-[11px] text-gray-400 flex items-center justify-between">
                    <span className="truncate">{match.pitch}</span>
                    <span className="text-lime-400 font-bold uppercase">{match.division}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-lime-500/10 text-lime-400 border border-lime-500/30">
                  <Calendar size={12} />
                  <span>{isFr ? 'Horaire à venir' : 'Schedule Pending'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase italic font-display text-white">
                  {isFr
                    ? 'Calendrier des rencontres en cours de finalisation'
                    : 'Match schedule currently in preparation'}
                </h3>
                <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                  {isFr
                    ? 'Aucun match ni horaire n’est confirmé pour le moment. L’horaire officiel des affrontements sera dévoilé avant le coup d’envoi de la saison au Complexe Sportif Delson | Sainte-Catherine.'
                    : 'No matches or kickoff times are confirmed yet. The official fixture schedule will be announced prior to season kickoff at Complexe Sportif Delson | Sainte-Catherine.'}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-1 justify-center md:justify-start">
                  <MapPin size={14} className="text-lime-400 shrink-0" />
                  <span>Complexe Sportif Delson | Sainte-Catherine • 75 Bd Georges Gagné N, Delson, QC J5B 2E5</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  to="/register?sport=soccer"
                  className="px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-all text-center"
                >
                  <span>{isFr ? 'Inscrire une équipe' : 'Register a team'}</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/soccer/reglements"
                  className="px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 flex items-center justify-center gap-2 transition-all text-center"
                >
                  <span>{isFr ? 'Consulter les règlements' : 'View rules'}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

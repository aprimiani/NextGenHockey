import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Shield, 
  Trophy, 
  Users, 
  Heart, 
  Flame, 
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { NextGenSportsLogo } from '../logos/NextGenSportsLogo';
import { NextGenHockeyLogo } from '../logos/NextGenHockeyLogo';
import { NextGenSoccerLogo } from '../logos/NextGenSoccerLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { sportsTranslations } from '../../sportsTranslations';
import { SCHEDULE, TEAMS } from '../../constants';
import { SOCCER_SCHEDULE, SOCCER_TEAMS } from '../../soccerData';

export const SportsHome: React.FC = () => {
  const { language } = useLanguage();
  const t = sportsTranslations[language];
  const [sportFilter, setSportFilter] = useState<'all' | 'hockey' | 'soccer'>('all');

  // Format teams lookup
  const hockeyTeamsMap = React.useMemo(() => {
    return TEAMS.reduce((acc, t) => {
      acc[t.id] = t;
      return acc;
    }, {} as Record<string, typeof TEAMS[0]>);
  }, []);

  const soccerTeamsMap = React.useMemo(() => {
    return SOCCER_TEAMS.reduce((acc, t) => {
      acc[t.id] = t;
      return acc;
    }, {} as Record<string, typeof SOCCER_TEAMS[0]>);
  }, []);

  // Upcoming Hockey games from constants.ts
  const upcomingHockey = React.useMemo(() => {
    return SCHEDULE
      .filter(g => g.status === 'scheduled')
      .slice(0, 4)
      .map(g => ({
        id: g.id,
        sport: 'hockey' as const,
        date: g.date,
        time: g.time,
        homeTeam: hockeyTeamsMap[g.homeTeamId]?.name || g.homeTeamId,
        awayTeam: hockeyTeamsMap[g.awayTeamId]?.name || g.awayTeamId,
        homeColor: hockeyTeamsMap[g.homeTeamId]?.logoColor || '#0284c7',
        awayColor: hockeyTeamsMap[g.awayTeamId]?.logoColor || '#38bdf8',
        location: g.location || 'Centre Sportif Delson',
        link: '/hockey/schedule'
      }));
  }, [hockeyTeamsMap]);

  // Upcoming Soccer games from soccerData.ts
  const upcomingSoccer = React.useMemo(() => {
    return SOCCER_SCHEDULE
      .filter(m => m.status === 'upcoming')
      .slice(0, 4)
      .map(m => ({
        id: m.id,
        sport: 'soccer' as const,
        date: m.date,
        time: m.time,
        homeTeam: m.homeTeamName,
        awayTeam: m.awayTeamName,
        homeColor: soccerTeamsMap[m.homeTeamId]?.color || '#16a34a',
        awayColor: soccerTeamsMap[m.awayTeamId]?.color || '#84cc16',
        location: `${m.location} (${m.pitch})`,
        link: '/soccer/calendrier'
      }));
  }, [soccerTeamsMap]);

  // Combined and sorted upcoming events
  const combinedEvents = React.useMemo(() => {
    let list = [];
    if (sportFilter === 'all') {
      list = [...upcomingHockey, ...upcomingSoccer];
    } else if (sportFilter === 'hockey') {
      list = [...upcomingHockey];
    } else {
      list = [...upcomingSoccer];
    }
    return list.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [upcomingHockey, upcomingSoccer, sportFilter]);

  return (
    <div className="min-h-screen bg-[#07080b] text-white selection:bg-amber-500 selection:text-black">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION: DUAL SPORT SYNERGY                   */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-zinc-800">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Geometric subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b0a_1px,transparent_1px),linear-gradient(to_bottom,#18181b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Organization Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs font-black uppercase tracking-widest text-amber-400 mb-8 shadow-lg shadow-black/60">
              <Sparkles size={14} className="text-amber-400" />
              <span>{t.sportsHero.badge}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-gray-300">Hockey & Soccer</span>
            </div>

            {/* Central Official NextGen Sports Logo */}
            <div className="flex justify-center mb-8">
              <NextGenSportsLogo className="h-16 sm:h-24 md:h-28 w-auto drop-shadow-2xl" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase italic font-display leading-tight mb-6">
              {t.sportsHero.headline}
            </h1>

            {/* Sub-tagline */}
            <div className="space-y-3 mb-10 max-w-2xl mx-auto">
              <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-200 to-lime-400 italic">
                "{t.sportsHero.tagline}"
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {t.sportsHero.taglineSub}
              </p>
            </div>

            {/* Dual Primary Exploration Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
              {/* Explore Hockey (Blue Accent) */}
              <Link
                to="/hockey"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3 border border-sky-400/40 group"
              >
                <span>🏒</span>
                <span>{t.sportsHero.exploreHockey}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Explore Soccer (Green Accent) */}
              <Link
                to="/soccer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-lime-500 to-emerald-600 text-zinc-950 shadow-xl shadow-lime-500/25 hover:shadow-lime-500/40 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3 border border-lime-300/40 group"
              >
                <span>⚽</span>
                <span>{t.sportsHero.exploreSoccer}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. SPORT SELECTION CARDS: HOCKEY & SOCCER             */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#07080b] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-2">
              {t.sportsCards.title}
            </h2>
            <p className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white font-display">
              {t.sportsCards.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* CARD 1: NEXTGEN HOCKEY */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-[#0e1726] to-[#080d16] border border-sky-500/30 overflow-hidden shadow-2xl transition-all duration-300 hover:border-sky-400 hover:shadow-sky-500/20 hover:-translate-y-1.5 flex flex-col justify-between">
              {/* Blue accent top bar */}
              <div className="h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400" />

              <div className="p-8 sm:p-10 relative z-10 flex flex-col h-full">
                {/* Header with sport crest */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <NextGenHockeyLogo className="h-20 sm:h-24 w-auto transition-transform duration-300 group-hover:scale-105" />
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    Glace • Arena
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase italic text-white font-display mb-3 group-hover:text-sky-300 transition-colors">
                  {t.sportsCards.hockeyTitle}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
                  {t.sportsCards.hockeyDesc}
                </p>

                {/* Feature checklist */}
                <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-semibold text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{language === 'fr' ? 'Stats & feuilles en direct' : 'Live digital boxscores'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{language === 'fr' ? 'Arbitres certifiés' : 'Certified refereeing'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{language === 'fr' ? 'Centre Sportif Delson' : 'Centre Sportif Delson'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{language === 'fr' ? 'Prix champions & bourses' : 'Championship awards'}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/hockey"
                  className="w-full py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-colors"
                >
                  <span>{t.sportsCards.hockeyCta}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* CARD 2: NEXTGEN SOCCER */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-[#111c13] to-[#090f0a] border border-lime-500/30 overflow-hidden shadow-2xl transition-all duration-300 hover:border-lime-400 hover:shadow-lime-500/20 hover:-translate-y-1.5 flex flex-col justify-between">
              {/* Green accent top bar */}
              <div className="h-2 bg-gradient-to-r from-lime-400 via-emerald-500 to-green-400" />

              <div className="p-8 sm:p-10 relative z-10 flex flex-col h-full">
                {/* Header with sport crest */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <NextGenSoccerLogo className="h-20 sm:h-24 w-auto transition-transform duration-300 group-hover:scale-105" />
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30">
                    Synthétique 7v7
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase italic text-white font-display mb-3 group-hover:text-lime-300 transition-colors">
                  {t.sportsCards.soccerTitle}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
                  {t.sportsCards.soccerDesc}
                </p>

                {/* Feature checklist */}
                <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-semibold text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>{language === 'fr' ? 'Format dynamique 7 contre 7' : 'Dynamic 7 vs 7 format'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>{language === 'fr' ? 'Gazon synthétique pro' : 'Pro synthetic turf'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>{language === 'fr' ? 'Classements & buteurs' : 'Live standings & scorers'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span>{language === 'fr' ? 'Inscriptions équipes/individuels' : 'Team & solo registration'}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/soccer"
                  className="w-full py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-colors"
                >
                  <span>{t.sportsCards.soccerCta}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. CORE VALUES / ABOUT NEXTGEN                       */}
      {/* ---------------------------------------------------- */}
      <section id="about" className="py-20 bg-zinc-950 border-y border-zinc-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-2">
              {t.sportsValues.sectionTitle}
            </h2>
            <p className="text-2xl sm:text-4xl font-black uppercase italic tracking-tight text-white font-display">
              {t.sportsValues.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Community */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
                {t.sportsValues.communityTitle}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t.sportsValues.communityDesc}
              </p>
            </div>

            {/* 2. Competition */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Trophy size={24} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
                {t.sportsValues.competitionTitle}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t.sportsValues.competitionDesc}
              </p>
            </div>

            {/* 3. The Next Generation */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Flame size={24} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
                {t.sportsValues.nextGenTitle}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t.sportsValues.nextGenDesc}
              </p>
            </div>

            {/* 4. Positive Impact */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-red-500/30 hover:border-red-500/60 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Heart size={24} className="fill-red-400/20" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
                {t.sportsValues.impactTitle}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t.sportsValues.impactDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. UPCOMING GAMES / EVENTS (REAL DATA ONLY)          */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#07080b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-2">
                {t.sportsEvents.title}
              </h2>
              <p className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white font-display">
                {t.sportsEvents.subtitle}
              </p>
            </div>

            {/* Sport Filter Controls */}
            <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
              <button
                onClick={() => setSportFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  sportFilter === 'all'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.sportsEvents.allSports}
              </button>
              <button
                onClick={() => setSportFilter('hockey')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  sportFilter === 'hockey'
                    ? 'bg-sky-500 text-black shadow'
                    : 'text-gray-400 hover:text-sky-400'
                }`}
              >
                <span>🏒</span>
                <span>{t.sportsEvents.hockeyOnly}</span>
              </button>
              <button
                onClick={() => setSportFilter('soccer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  sportFilter === 'soccer'
                    ? 'bg-lime-400 text-black shadow'
                    : 'text-gray-400 hover:text-lime-400'
                }`}
              >
                <span>⚽</span>
                <span>{t.sportsEvents.soccerOnly}</span>
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {combinedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {combinedEvents.map((evt) => {
                const isHockey = evt.sport === 'hockey';
                return (
                  <div
                    key={evt.id}
                    className={`rounded-2xl border bg-zinc-900/70 p-6 flex flex-col justify-between transition-all hover:-translate-y-0.5 ${
                      isHockey
                        ? 'border-sky-500/30 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10'
                        : 'border-lime-500/30 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-500/10'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Sport Tag & Time */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                              isHockey
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : 'bg-lime-500/20 text-lime-400 border border-lime-500/30'
                            }`}
                          >
                            {isHockey ? '🏒 Hockey' : '⚽ Soccer 7v7'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-zinc-500" />
                            <span>{evt.date}</span>
                          </span>
                          <span className="flex items-center gap-1 font-bold text-gray-300">
                            <Clock size={13} className="text-zinc-500" />
                            <span>{evt.time}</span>
                          </span>
                        </div>
                      </div>

                      {/* Teams Matchup */}
                      <div className="grid grid-cols-5 items-center py-3 my-2 text-center">
                        <div className="col-span-2 text-left">
                          <span className="font-black text-sm sm:text-base text-white uppercase italic truncate block">
                            {evt.homeTeam}
                          </span>
                        </div>
                        <div className="col-span-1">
                          <span className="px-2 py-0.5 rounded text-[11px] font-black bg-zinc-800 text-zinc-400">
                            VS
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="font-black text-sm sm:text-base text-white uppercase italic truncate block">
                            {evt.awayTeam}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Venue & Link */}
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-2 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-400 truncate max-w-[65%]">
                        <MapPin size={13} className="text-zinc-500 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <Link
                        to={evt.link}
                        className={`font-black uppercase tracking-wider transition-colors flex items-center gap-1 ${
                          isHockey ? 'text-sky-400 hover:text-sky-300' : 'text-lime-400 hover:text-lime-300'
                        }`}
                      >
                        <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center border border-zinc-800 rounded-2xl bg-zinc-900/40 text-gray-400">
              <p>{t.sportsEvents.noEvents}</p>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. OFFICIAL PARTNERS SECTION                         */}
      {/* ---------------------------------------------------- */}
      <section id="partners" className="py-20 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-2">
              {t.sportsPartners.title}
            </h2>
            <p className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white font-display">
              {t.sportsPartners.subtitle}
            </p>
          </div>

          {/* Montreal Children's Hospital Foundation Featured Card */}
          <div className="rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-red-950/20 border border-red-500/30 p-8 sm:p-10 mb-10 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                  <Heart size={32} className="text-red-400 fill-red-400/30" />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/40 mb-2">
                    {language === 'fr' ? 'Partenaire Caritatif Officiel' : 'Official Charity Partner'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic text-white font-display">
                    {t.sportsPartners.childrenHospitalTitle}
                  </h3>
                  <p className="text-gray-300 text-sm max-w-2xl mt-1 leading-relaxed">
                    {t.sportsPartners.childrenHospitalDesc}
                  </p>
                </div>
              </div>

              <Link
                to="/partners"
                className="shrink-0 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
              >
                <span>{language === 'fr' ? 'Notre Engagement' : 'Our Commitment'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Local Community Sponsors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-4xl mx-auto">
            {[
              {
                name: 'Subway Delson',
                category: language === 'fr' ? 'Restauration & Partenaire Saisonnier' : 'Dining & Season Partner',
                perk: language === 'fr' ? '20% de rabais athlètes' : '20% athlete discount',
              },
              {
                name: 'Popeyes Suppléments Delson',
                category: language === 'fr' ? 'Nutrition & Suppléments' : 'Sports Supplements & Nutrition',
                perk: language === 'fr' ? 'Cartes-cadeaux & performance' : 'Gift cards & performance support',
              },
              {
                name: 'Pasquier Delson',
                category: language === 'fr' ? 'Alimentation & Épicerie Fraîche' : 'Fresh Grocery & Community',
                perk: language === 'fr' ? 'Prix officiels Joueur du Mois' : 'Official Player of the Month awards',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-colors flex flex-col justify-center items-center"
              >
                <span className="text-sm font-black uppercase tracking-wider text-white">
                  {p.name}
                </span>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest mt-1 font-semibold">
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
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>{t.sportsPartners.viewAllPartners}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. FINAL CALL TO ACTION (LE SPORT RAPPROCHE LES GENS) */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 bg-black relative border-t border-zinc-800 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tight text-white font-display leading-tight mb-4">
            {t.sportsFinalCta.headline}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
            {t.sportsFinalCta.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>{t.sportsFinalCta.button}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

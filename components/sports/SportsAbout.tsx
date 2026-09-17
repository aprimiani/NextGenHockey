import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Users, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { NextGenSportsLogo } from '../logos/NextGenSportsLogo';
import { NextGenHockeyLogo } from '../logos/NextGenHockeyLogo';
import { NextGenSoccerLogo } from '../logos/NextGenSoccerLogo';
import { useLanguage } from '../../contexts/LanguageContext';

export const SportsAbout: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <div className="min-h-screen bg-[#07080b] text-white py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
            {isFr ? 'À Propos de NextGen Sports' : 'About NextGen Sports'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight font-display mb-4">
            {isFr ? 'DEUX SPORTS. UNE MÊME MISSION.' : 'TWO SPORTS. ONE MISSION.'}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {isFr
              ? 'NextGen Sports est née d\'une conviction simple : le sport réunit les gens, forge le caractère et dynamise nos communautés locales.'
              : 'NextGen Sports was founded on a simple conviction: sports bring people together, build character, and empower our local communities.'}
          </p>
        </div>

        {/* Story & Vision */}
        <div className="space-y-12">
          {/* Card 1: Our Origin */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800">
            <h2 className="text-2xl font-black uppercase italic font-display text-amber-400 mb-4">
              {isFr ? 'Notre Évolution' : 'Our Evolution'}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              {isFr
                ? 'Fondée initialement sur les patinoires de la Rive-Sud de Montréal avec la ligue NextGen Hockey, notre organisation s\'est rapidement imposée comme une référence grâce à son arbitrage professionnel, son suivi des statistiques en temps réel et son esprit de saine compétition.'
                : 'Initially founded on the ice arenas of Montreal\'s South Shore with NextGen Hockey, our organization quickly established itself as a benchmark through certified officiating, live real-time statistics, and a spirit of sportsmanship.'}
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {isFr
                ? 'Aujourd\'hui, nous unissons le hockey sur glace et le soccer sous la bannière parent NextGen Sports, créant une véritable maison multisport pour tous les passionnés d\'activité physique et de dépassement de soi.'
                : 'Today, we unite ice hockey and turf soccer under the parent brand NextGen Sports, creating a genuine multisport home for passionate athletes and competitive teams.'}
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider mb-2">
                {isFr ? 'Excellence Compétitive' : 'Competitive Standard'}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {isFr
                  ? 'Des installations sportives de premier plan, des horaires fiables et un calibre équilibré pour chaque division.'
                  : 'Premier venues, consistent schedules, and balanced competition across all league tiers.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-lime-500/10 text-lime-400 flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider mb-2">
                {isFr ? 'Sécurité & Respect' : 'Safety & Fair Play'}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {isFr
                  ? 'Tolérance zéro pour les comportements dangereux. Des règlements clairs pour assurer la sécurité de chaque joueur.'
                  : 'Zero tolerance for dangerous play. Clear rules to protect the safety and enjoyment of every player.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Heart size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider mb-2">
                {isFr ? 'Engagement Communautaire' : 'Community Care'}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {isFr
                  ? 'Soutien direct et continu à la Fondation de l\'Hôpital de Montréal pour enfants à chaque saison.'
                  : 'Direct and continuous support to the Montreal Children\'s Hospital Foundation every season.'}
              </p>
            </div>
          </div>

          {/* Quick links to both sports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <Link
              to="/hockey"
              className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 to-zinc-900 border border-sky-500/30 hover:border-sky-400 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <NextGenHockeyLogo className="h-12 w-auto" />
                <div>
                  <h4 className="text-lg font-black uppercase text-white group-hover:text-sky-400 transition-colors">
                    NextGen Hockey
                  </h4>
                  <p className="text-xs text-gray-400">
                    {isFr ? 'En savoir plus sur la ligue de hockey' : 'Explore hockey leagues'}
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-sky-400 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/soccer"
              className="p-6 rounded-2xl bg-gradient-to-r from-lime-950/40 to-zinc-900 border border-lime-500/30 hover:border-lime-400 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <NextGenSoccerLogo className="h-12 w-auto" />
                <div>
                  <h4 className="text-lg font-black uppercase text-white group-hover:text-lime-400 transition-colors">
                    NextGen Soccer
                  </h4>
                  <p className="text-xs text-gray-400">
                    {isFr ? 'En savoir plus sur la ligue de soccer' : 'Explore soccer leagues'}
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-lime-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

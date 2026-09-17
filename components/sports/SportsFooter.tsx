import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Mail, MapPin, ExternalLink } from 'lucide-react';
import { NextGenSportsLogo } from '../logos/NextGenSportsLogo';
import { NextGenHockeyLogo } from '../logos/NextGenHockeyLogo';
import { NextGenSoccerLogo } from '../logos/NextGenSoccerLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { sportsTranslations } from '../../sportsTranslations';

export const SportsFooter: React.FC = () => {
  const { language } = useLanguage();
  const t = sportsTranslations[language];

  return (
    <footer className="bg-[#050608] border-t border-zinc-800 text-gray-400">
      {/* Top Banner - Montreal Children's Hospital Foundation Highlight */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/40 border-b border-zinc-800/80 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-red-400 fill-red-400/30" />
            </div>
            <div>
              <p className="text-white font-black text-xs uppercase tracking-wider">
                {t.sportsPartners.childrenHospitalTitle}
              </p>
              <p className="text-gray-400 text-xs">
                {language === 'fr'
                  ? 'Fier partenaire officiel. Le sport au service des jeunes et des familles.'
                  : 'Proud official partner. Sport empowering young athletes and families.'}
              </p>
            </div>
          </div>
          <Link
            to="/partners"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{language === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <NextGenSportsLogo className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {language === 'fr'
                ? 'Organisation sportive moderne sur la Rive-Sud de Montréal. Nous propulsons la nouvelle génération d\'athlètes à travers des ligues compétitives de hockey sur glace et de soccer synthétique.'
                : 'Premier modern athletic organization on Montreal\'s South Shore. Empowering the next generation of athletes across competitive ice hockey and turf soccer leagues.'}
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-400 shrink-0" />
                <span><strong className="text-gray-300">Hockey:</strong> Centre Sportif de Delson, 100 Rue de la Rivière, Delson, QC</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-lime-400 shrink-0" />
                <span><strong className="text-gray-300">Soccer:</strong> Complexe Sportif Delson | Sainte-Catherine, 75 Bd Georges Gagné N, Delson, QC</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <a href="mailto:info@nxtgnsports.ca" className="hover:text-amber-400 transition-colors">
                  <strong className="text-gray-300">{language === 'fr' ? 'Courriel demandes sportives :' : 'Sports Inquiries:'}</strong>{' '}
                  <span className="text-amber-300 font-bold">info@nxtgnsports.ca</span>
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/nextgenhockeyleague/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:info@nxtgnsports.ca"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Sports Inquiries Email (info@nxtgnsports.ca)"
                title="info@nxtgnsports.ca"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 3: NextGen Hockey */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <NextGenHockeyLogo className="h-6 w-auto" />
              <h4 className="text-white font-black text-xs uppercase tracking-widest text-sky-400">
                NextGen Hockey
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/hockey" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Accueil Hockey' : 'Hockey Home'}
                </Link>
              </li>
              <li>
                <Link to="/hockey/schedule" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Calendrier & Matchs' : 'Schedule & Games'}
                </Link>
              </li>
              <li>
                <Link to="/hockey/standings" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Classements & Statistiques' : 'Standings & Stats'}
                </Link>
              </li>
              <li>
                <Link to="/hockey/rules" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Règlements de la ligue' : 'League Rules'}
                </Link>
              </li>
              <li>
                <Link to="/register?sport=hockey" className="text-sky-400 font-bold hover:underline">
                  {language === 'fr' ? 'Inscription Hockey →' : 'Hockey Registration →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: NextGen Soccer */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <NextGenSoccerLogo className="h-6 w-auto" />
              <h4 className="text-white font-black text-xs uppercase tracking-widest text-lime-400">
                NextGen Soccer
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/soccer" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Accueil Soccer' : 'Soccer Home'}
                </Link>
              </li>
              <li>
                <Link to="/soccer/calendrier" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Calendrier des rencontres' : 'Match Schedule'}
                </Link>
              </li>
              <li>
                <Link to="/soccer/statistiques" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Statistiques & Buteurs' : 'Statistics & Leaders'}
                </Link>
              </li>
              <li>
                <Link to="/soccer/reglements" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Règlements officiels 7v7' : 'Official 7v7 Rules'}
                </Link>
              </li>
              <li>
                <Link to="/register?sport=soccer" className="text-lime-400 font-bold hover:underline">
                  {language === 'fr' ? 'Inscription Soccer →' : 'Soccer Registration →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Organisation */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest text-amber-400 mb-4">
              NextGen Sports
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'À propos de nous' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Nos partenaires' : 'Our Partners'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {language === 'fr' ? 'Nous contacter' : 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link to="/hockey/manager" className="text-zinc-500 hover:text-gray-300 transition-colors">
                  {language === 'fr' ? 'Accès gestionnaire' : 'Manager Portal'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} NextGen Sports. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-6">
            <span>🏒 NextGen Hockey</span>
            <span>⚽ NextGen Soccer</span>
            <span className="text-amber-400/80 font-bold">⚡ NextGen Sports</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

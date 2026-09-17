import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, ArrowRight } from 'lucide-react';
import { NextGenSoccerLogo } from '../logos/NextGenSoccerLogo';
import { useLanguage } from '../../contexts/LanguageContext';

export const SoccerFooter: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <footer className="bg-[#050806] border-t border-zinc-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/soccer" className="inline-block">
              <NextGenSoccerLogo className="h-14 w-auto" />
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              {isFr
                ? 'Ligue compétitive de soccer 7 contre 7 sur gazon synthétique au Complexe Sportif Delson | Sainte-Catherine. Arbitrage certifié, suivi des statistiques et passion du jeu.'
                : 'Competitive 7v7 synthetic turf soccer league at Complexe Sportif Delson | Sainte-Catherine. Certified refereeing, live statistics, and athletic excellence.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin size={14} className="text-lime-400 shrink-0" />
              <span>Complexe Sportif Delson | Sainte-Catherine, 75 Bd Georges Gagné N, Delson, QC J5B 2E5</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest text-lime-400 mb-4">
              {isFr ? 'Ligue de Soccer' : 'Soccer League'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/soccer" className="hover:text-white transition-colors">
                  {isFr ? 'Accueil Soccer' : 'Soccer Home'}
                </Link>
              </li>
              <li>
                <Link to="/soccer/statistiques" className="hover:text-white transition-colors">
                  {isFr ? 'Statistiques & Classements' : 'Stats & Standings'}
                </Link>
              </li>
              <li>
                <Link to="/soccer/calendrier" className="hover:text-white transition-colors">
                  {isFr ? 'Calendrier des rencontres' : 'Match Calendar'}
                </Link>
              </li>
              <li>
                <Link to="/soccer/reglements" className="hover:text-white transition-colors">
                  {isFr ? 'Règlements officiels 7v7' : 'Official 7v7 Rules'}
                </Link>
              </li>
              <li>
                <Link to="/register?sport=soccer" className="text-lime-400 font-bold hover:underline">
                  {isFr ? 'Inscription équipes & joueurs →' : 'Team & player registration →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Multisport Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest text-amber-400 mb-4">
              NextGen Sports
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {isFr ? 'Portail NextGen Sports' : 'NextGen Sports Portal'}
                </Link>
              </li>
              <li>
                <Link to="/hockey" className="hover:text-white transition-colors">
                  🏒 {isFr ? 'Ligue NextGen Hockey' : 'NextGen Hockey League'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {isFr ? 'À propos de l\'organisation' : 'About Organization'}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">
                  {isFr ? 'Partenaires & Hôpital de Montréal' : 'Partners & Children\'s Hospital'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {isFr ? 'Nous contacter' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Registration */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs uppercase tracking-widest text-lime-400 mb-4">
              {isFr ? 'Rejoindre la Ligue' : 'Join the League'}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {isFr
                ? 'Les inscriptions pour la saison Printemps / Été 2026 sont présentement ouvertes pour équipes complètes et joueurs autonomes.'
                : 'Registration for the Spring / Summer 2026 season is currently open for complete teams and solo free agents.'}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <Link
                to="/register?sport=soccer"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-lime-400 hover:text-lime-300"
              >
                <span>{isFr ? 'Formulaire d\'inscription' : 'Registration form'}</span>
                <ArrowRight size={13} />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1">
                <Mail size={13} className="text-lime-400 shrink-0" />
                <a href="mailto:info@nxtgnsports.ca" className="hover:text-lime-300 transition-colors font-medium">
                  info@nxtgnsports.ca
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} NextGen Soccer • Une division de NextGen Sports.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-gray-400">NextGen Sports</Link>
            <span>•</span>
            <Link to="/hockey" className="hover:text-gray-400">NextGen Hockey</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

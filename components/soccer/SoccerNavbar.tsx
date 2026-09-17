import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight, ArrowLeft } from 'lucide-react';
import { NextGenSoccerLogo } from '../logos/NextGenSoccerLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { sportsTranslations } from '../../sportsTranslations';

export const SoccerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const tSoccer = sportsTranslations[language].soccerNav;
  const isFr = language === 'fr';

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navLinks = [
    { label: tSoccer.home, path: '/soccer' },
    { label: tSoccer.stats, path: '/soccer/statistiques' },
    { label: tSoccer.calendar, path: '/soccer/calendrier' },
    { label: tSoccer.rules, path: '/soccer/reglements' },
    { label: isFr ? 'Contact' : 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090e0b]/95 backdrop-blur-md border-b border-lime-500/20 text-white shadow-xl shadow-black/50">
      {/* Top Sport Switcher Bar */}
      <div className="bg-[#050806] border-b border-lime-500/10 px-3 sm:px-4 py-1.5 sm:py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors font-bold uppercase tracking-wider text-[10px] sm:text-[11px]"
          >
            <ArrowLeft size={12} />
            <span>{isFr ? 'Portail NextGen Sports' : 'NextGen Sports Portal'}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-zinc-600">|</span>
            <Link
              to="/hockey"
              className="text-zinc-400 hover:text-sky-400 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center gap-1 transition-colors"
            >
              <span>🏒</span>
              <span>{isFr ? 'Aller au Hockey' : 'Switch to Hockey'}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Soccer Logo & Brand Title */}
          <Link to="/soccer" className="flex items-center gap-2 sm:gap-3 group">
            <NextGenSoccerLogo className="h-10 sm:h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="hidden sm:block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-400 block">
                Ligue 7v7 Synthétique
              </span>
              <span className="text-sm font-black uppercase italic tracking-wider text-white font-display">
                NextGen Soccer
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-xs lg:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-lime-400 bg-lime-500/10 border border-lime-500/30'
                      : 'text-gray-300 hover:text-lime-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Cluster: Language & Register */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-gray-300 hover:text-lime-400 hover:border-lime-500/40 transition-colors"
              title="Changer de langue / Switch language"
            >
              <Globe size={14} className="text-lime-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            <Link
              to="/register?sport=soccer"
              className="px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 transition-all duration-200 flex items-center gap-1.5 group"
            >
              <span>{tSoccer.register}</span>
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded text-xs font-black bg-zinc-900 border border-zinc-700 text-gray-300"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#090e0b] border-b border-lime-500/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-black uppercase tracking-wider text-gray-300 hover:text-lime-400 hover:bg-white/5"
            >
              <span>{link.label}</span>
              <ChevronRight size={16} className="text-zinc-600" />
            </Link>
          ))}

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              to="/register?sport=soccer"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-lg text-xs font-black uppercase tracking-widest bg-lime-400 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20"
            >
              {tSoccer.register}
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center text-zinc-400 hover:text-amber-400"
            >
              ← {isFr ? 'Retour au portail NextGen Sports' : 'Back to NextGen Sports Portal'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

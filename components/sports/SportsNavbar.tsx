import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { NextGenSportsLogo } from '../logos/NextGenSportsLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { sportsTranslations } from '../../sportsTranslations';

export const SportsNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const tSports = sportsTranslations[language].sportsNav;

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navLinks = [
    { label: tSports.home, path: '/' },
    { label: tSports.hockey, path: '/hockey', badge: '🏒', color: 'hover:text-sky-400' },
    { label: tSports.soccer, path: '/soccer', badge: '⚽', color: 'hover:text-lime-400' },
    { label: tSports.about, path: '/about' },
    { label: tSports.partners, path: '/partners' },
    { label: tSports.contact, path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#07080b]/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-xl shadow-black/40">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-amber-600/30 via-[#0a0c10] to-amber-600/30 border-b border-amber-500/10 px-3 sm:px-4 py-1.5 sm:py-1 text-center text-[10px] sm:text-xs font-semibold tracking-wider text-amber-300 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span>{language === 'fr' ? 'Organisation Multisport Officielle • Rive-Sud de Montréal' : 'Official Multisport Organization • Montreal South Shore'}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <NextGenSportsLogo className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                      : `text-gray-300 hover:bg-white/5 ${link.color || 'hover:text-amber-400'}`
                  }`}
                >
                  {link.badge && <span className="text-xs">{link.badge}</span>}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Cluster: Language Switcher & Register CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-gray-300 hover:text-white hover:border-amber-500/40 transition-colors"
              title="Changer de langue / Switch language"
            >
              <Globe size={14} className="text-amber-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Registration CTA */}
            <Link
              to="/register"
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {tSports.register}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="min-h-[40px] px-3 py-2 rounded-lg text-xs font-black bg-zinc-900 border border-zinc-700 text-gray-300 cursor-pointer"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#07080b] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-black uppercase tracking-wider text-gray-300 hover:text-amber-400 hover:bg-white/5 border border-transparent hover:border-zinc-800 min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                {link.badge && <span>{link.badge}</span>}
                <span>{link.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </Link>
          ))}

          <div className="pt-4 border-t border-zinc-800">
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/20 min-h-[48px]"
            >
              {tSports.register}
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

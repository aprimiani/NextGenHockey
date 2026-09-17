import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const isFr = language === 'fr';

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const navItems = [
    { name: t.nav.home, path: '/hockey', legacyPath: '/hockey' },
    { name: t.nav.standings, path: '/hockey/standings', legacyPath: '/standings' },
    { name: t.nav.schedule, path: '/hockey/schedule', legacyPath: '/schedule' },
    { name: t.nav.rules, path: '/hockey/rules', legacyPath: '/rules' },
    { name: t.nav.contact, path: '/contact', legacyPath: '/hockey/contact' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      {/* Sport Switcher Top Micro-bar */}
      <div className="bg-[#070d18] border-b border-sky-500/20 px-3 sm:px-4 py-1.5 sm:py-1 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors font-bold uppercase tracking-wider text-[10px] sm:text-[11px]"
          >
            <ArrowLeft size={12} />
            <span>{isFr ? 'Portail NextGen Sports' : 'NextGen Sports Portal'}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-zinc-700">|</span>
            <Link
              to="/soccer"
              className="text-zinc-400 hover:text-lime-400 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center gap-1 transition-colors"
            >
              <span>⚽</span>
              <span>{isFr ? 'Aller au Soccer' : 'Switch to Soccer'}</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-ng-navy/85 backdrop-blur-xl border-b border-gray-800/80 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <NavLink to="/hockey" className="flex-shrink-0 group transition-transform duration-200 hover:scale-[1.02]">
               <div className="flex items-center">
                 <Logo className="h-14 sm:h-20 w-auto filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.15)]" />
               </div>
            </NavLink>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || location.pathname === item.legacyPath;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={
                      `px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 tracking-wide ${
                        isActive
                          ? 'bg-gradient-to-r from-ng-light-blue to-ng-accent text-ng-navy shadow-md shadow-ng-light-blue/25 font-black'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
              
              {/* Desktop Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 rounded-xl text-xs font-black text-gray-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 hover:border-ng-light-blue/50 transition-all border border-gray-700/80 ml-1.5 tracking-wider uppercase shadow-sm"
                title="Toggle Language"
              >
                <Globe size={14} className="mr-1.5 text-ng-light-blue" />
                {language === 'en' ? 'EN' : 'FR'}
              </button>

              <NavLink
                to="/register?sport=hockey"
                className="bg-gradient-to-r from-ng-light-blue via-sky-400 to-ng-accent hover:brightness-110 text-ng-navy font-black py-2.5 px-5 rounded-xl transition-all duration-200 shadow-md shadow-ng-light-blue/25 hover:shadow-lg hover:shadow-ng-light-blue/35 hover:scale-[1.02] active:scale-[0.98] ml-2 font-display uppercase tracking-widest text-sm inline-flex items-center justify-center border border-white/20"
              >
                {t.nav.register}
              </NavLink>
            </div>

            {/* Mobile Actions (Language Toggle + Menu) */}
            <div className="flex items-center md:hidden gap-1.5">
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center min-h-[40px] px-3 py-2 rounded-xl text-xs font-black text-gray-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 transition-colors border border-zinc-700 uppercase tracking-wider cursor-pointer"
                title="Toggle Language"
              >
                <Globe size={13} className="mr-1.5 text-sky-400" />
                {language === 'en' ? 'EN' : 'FR'}
              </button>

              <button
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-xl text-gray-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-all focus:outline-none cursor-pointer"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-3.5 pt-3 pb-5 space-y-1.5 sm:px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname === item.legacyPath;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={
                    `flex items-center px-4 py-3 rounded-xl text-sm font-bold min-h-[44px] transition-all ${
                      isActive
                        ? 'bg-sky-400 text-zinc-950 shadow-md shadow-sky-500/20 font-black'
                        : 'text-gray-300 hover:text-white hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
             <NavLink
                to="/register?sport=hockey"
                onClick={() => setIsOpen(false)}
                className="w-full text-center mt-3 bg-sky-400 hover:bg-sky-300 text-zinc-950 font-black py-3 px-4 rounded-xl font-display uppercase tracking-widest text-sm shadow-lg shadow-sky-500/25 transition-all active:scale-[0.98] min-h-[48px] flex items-center justify-center"
              >
                {t.nav.register}
              </NavLink>

              <div className="pt-3 border-t border-zinc-800/80">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-400 min-h-[44px] flex items-center justify-center transition-colors"
                >
                  ← {isFr ? 'Portail NextGen Sports' : 'NextGen Sports Portal'}
                </Link>
              </div>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;

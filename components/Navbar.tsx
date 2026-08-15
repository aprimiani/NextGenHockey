import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.standings, path: '/standings' },
    { name: t.nav.schedule, path: '/schedule' },
    { name: t.nav.rules, path: '/rules' },
    { name: t.nav.sponsors, path: '/sponsors' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      <nav className="bg-ng-navy/85 backdrop-blur-xl border-b border-gray-800/80 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 group transition-transform duration-200 hover:scale-[1.02]">
               <div className="flex items-center">
                 <Logo className="h-20 w-auto filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.15)]" />
               </div>
            </NavLink>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 tracking-wide ${
                      isActive
                        ? 'bg-gradient-to-r from-ng-light-blue to-ng-accent text-ng-navy shadow-md shadow-ng-light-blue/25 font-black'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
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
                to="/register"
                className="bg-gradient-to-r from-ng-light-blue via-sky-400 to-ng-accent hover:brightness-110 text-ng-navy font-black py-2.5 px-5 rounded-xl transition-all duration-200 shadow-md shadow-ng-light-blue/25 hover:shadow-lg hover:shadow-ng-light-blue/35 hover:scale-[1.02] active:scale-[0.98] ml-2 font-display uppercase tracking-widest text-sm inline-flex items-center justify-center border border-white/20"
              >
                {t.nav.register}
              </NavLink>
            </div>

            {/* Mobile Actions (Language Toggle + Menu) */}
            <div className="flex items-center md:hidden gap-1">
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center px-2.5 py-1.5 rounded-lg text-xs font-black text-gray-300 hover:text-white hover:bg-ng-blue transition-colors border border-gray-700 mr-1 uppercase tracking-wider"
              >
                <Globe size={13} className="mr-1 text-ng-light-blue" />
                {language === 'en' ? 'EN' : 'FR'}
              </button>

              <button
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-ng-blue/80 border border-transparent hover:border-gray-700 transition-all focus:outline-none"
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
        <div className="md:hidden bg-ng-navy/95 backdrop-blur-xl border-b border-ng-blue shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? 'bg-ng-light-blue text-ng-navy shadow-md font-black'
                      : 'text-gray-300 hover:text-white hover:bg-ng-blue/60'
                  }`
                }
              >
                 <div className="flex items-center">
                    {item.name}
                 </div>
              </NavLink>
            ))}
             <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 bg-ng-light-blue hover:bg-ng-accent text-ng-navy font-black py-3.5 px-4 rounded-xl font-display uppercase tracking-widest text-base shadow-lg shadow-ng-light-blue/20 transition-all active:scale-[0.98]"
              >
                {t.nav.register}
              </NavLink>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;
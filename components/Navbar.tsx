import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
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
    { name: t.nav.assistant, path: '/assistant', icon: <Sparkles size={16} className="mr-1 inline" /> },
  ];

  return (
    <nav className="bg-ng-navy/90 backdrop-blur-md border-b border-ng-blue sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
               <div className="flex items-center">
                 <Logo className="h-20 w-auto" />
               </div>
            </NavLink>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-ng-light-blue text-ng-navy shadow-lg shadow-ng-light-blue/20'
                        : 'text-gray-300 hover:text-white hover:bg-ng-blue'
                    }`
                  }
                >
                  {item.icon}{item.name}
                </NavLink>
              ))}
              
              {/* Desktop Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-ng-blue transition-colors border border-gray-600 ml-2"
              >
                <Globe size={16} className="mr-2" />
                {language === 'en' ? 'EN' : 'FR'}
              </button>

              <NavLink
                to="/register"
                className="bg-ng-light-blue hover:bg-ng-accent text-ng-navy font-bold py-2 px-4 rounded-md transition-colors shadow-lg shadow-ng-light-blue/30 ml-2"
              >
                {t.nav.register}
              </NavLink>
            </div>

            {/* Mobile Actions (Language Toggle + Menu) */}
            <div className="flex items-center md:hidden">
              {/* Mobile Language Toggle - Visible next to hamburger */}
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 rounded-md text-xs font-bold text-gray-300 hover:text-white hover:bg-ng-blue transition-colors border border-gray-600 mr-2"
              >
                <Globe size={14} className="mr-1.5" />
                {language === 'en' ? 'EN' : 'FR'}
              </button>

              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-ng-navy border-b border-ng-blue">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-ng-light-blue text-ng-navy'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                 <div className="flex items-center">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.name}
                 </div>
              </NavLink>
            ))}
             <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 bg-ng-light-blue hover:bg-ng-accent text-ng-navy font-bold py-3 px-4 rounded-md"
              >
                {t.nav.register}
              </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
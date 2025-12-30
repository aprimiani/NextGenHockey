import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, DollarSign, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ng-navy via-ng-navy/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:justify-center lg:justify-start">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-ng-light-blue/20 text-ng-light-blue border border-ng-light-blue/30 uppercase tracking-widest">
                {t.hero.seasonMsg}
              </span>
            </div>
            
            <h1>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-white">{t.hero.futureOf}</span>
                <span className="block text-ng-light-blue">{t.hero.recHockey}</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              {t.hero.description}
            </p>

            <div className="mt-10 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <NavLink
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-ng-navy bg-ng-light-blue hover:bg-ng-accent md:py-4 md:text-lg transition-transform transform hover:scale-105"
                    >
                        {t.hero.registerNow}
                    </NavLink>
                     <NavLink
                        to="/assistant"
                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-500 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-800 md:py-4 md:text-lg"
                    >
                        {t.hero.askAssistant}
                    </NavLink>
                </div>
            </div>

            {/* Charity Mission Banner */}
            <div className="mt-8 p-4 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left duration-700">
               <div className="bg-pink-500 p-2 rounded-lg text-white shadow-lg shadow-pink-500/20 shrink-0">
                 <Heart size={20} fill="currentColor" />
               </div>
               <div>
                 <h4 className="text-pink-500 font-black uppercase text-[10px] tracking-[0.2em] mb-1 italic">
                   {t.hero.missionTitle}
                 </h4>
                 <p className="text-gray-400 text-sm leading-snug">
                   {t.hero.missionText}
                 </p>
               </div>
            </div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <h3 className="text-center text-ng-light-blue font-bold text-lg uppercase tracking-wider mb-6">
                  {t.hero.principlesTitle}
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-ng-blue/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-ng-light-blue/50 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="bg-ng-light-blue/20 p-3 rounded-lg">
                                <Shield className="text-ng-light-blue w-8 h-8"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{t.hero.saferPlay}</h3>
                                <p className="text-gray-400 text-sm">{t.hero.saferPlayDesc}</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-ng-blue/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-500/20 p-3 rounded-lg">
                                <DollarSign className="text-green-400 w-8 h-8"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{t.hero.lowerCost}</h3>
                                <p className="text-gray-400 text-sm">{t.hero.lowerCostDesc}</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-ng-blue/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-500/50 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="bg-pink-500/20 p-3 rounded-lg">
                                <Heart className="text-pink-500 w-8 h-8"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{t.hero.community}</h3>
                                <p className="text-gray-400 text-sm">{t.hero.communityDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
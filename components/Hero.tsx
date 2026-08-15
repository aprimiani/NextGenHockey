import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, DollarSign, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ng-navy via-ng-navy/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-32">
        
        {/* Social Media Promo Ribbon */}
        <div className="flex justify-center lg:justify-start mb-8 animate-in fade-in slide-in-from-top duration-1000">
           <a 
             href="https://www.instagram.com/nxtgenhky/#" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-ng-light-blue to-ng-accent text-ng-navy font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-ng-light-blue/20 hover:scale-105 transition-transform group italic border border-white/30"
           >
             <Sparkles size={12} className="group-hover:animate-pulse" />
             {t.hero.earlyBird}
           </a>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            
            <h1>
              <span className="mt-1 block text-2xl tracking-normal font-black sm:text-4xl xl:text-5xl font-display uppercase leading-[1.1]">
                <span className="block text-white mb-1 sm:mb-2">{t.hero.futureOf} </span>
                <span className="block text-ng-light-blue drop-shadow-[0_2px_12px_rgba(56,189,248,0.25)]">{t.hero.recHockey}</span>
              </span>
            </h1>
            <p className="mt-6 text-base text-gray-300 sm:mt-8 sm:text-xl lg:text-lg xl:text-xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="mt-10 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                     <NavLink
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3.5 border border-white/20 text-lg font-black rounded-2xl text-ng-navy bg-gradient-to-r from-ng-light-blue via-sky-400 to-ng-accent hover:brightness-110 md:py-4 md:text-xl transition-all duration-200 hover:shadow-xl hover:shadow-ng-light-blue/30 hover:scale-[1.02] active:scale-[0.98] font-display uppercase tracking-widest"
                    >
                        {t.hero.registerNow}
                    </NavLink>
                </div>
            </div>

            {/* Charity Mission Banner */}
            <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-pink-500/15 to-pink-600/5 border border-pink-500/30 hover:border-pink-500/60 rounded-2xl flex items-start gap-4 transition-all duration-300 shadow-lg shadow-pink-500/5 backdrop-blur-sm">
               <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2.5 rounded-xl text-white shadow-lg shadow-pink-500/30 shrink-0 border border-pink-400/30">
                 <Heart size={20} fill="currentColor" />
               </div>
               <div>
                 <h4 className="text-pink-300 font-black uppercase text-xs tracking-widest mb-1 italic font-display">
                   {t.hero.missionTitle}
                 </h4>
                 <p className="text-gray-300 text-sm leading-relaxed">
                   {t.hero.missionText}
                 </p>
               </div>
            </div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-2xl lg:max-w-md">
                <h3 className="text-center text-ng-light-blue font-bold text-xl sm:text-2xl uppercase tracking-widest mb-6 font-display drop-shadow-[0_2px_8px_rgba(56,189,248,0.2)]">
                  {t.hero.principlesTitle}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:gap-5">
                    <div className="bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-700/70 hover:border-ng-light-blue/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ng-light-blue/10 transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                            <div className="bg-ng-light-blue/15 p-3.5 rounded-xl border border-ng-light-blue/30 group-hover:border-ng-light-blue/60 group-hover:bg-ng-light-blue/20 transition-colors shrink-0 shadow-inner">
                                <Shield className="text-ng-light-blue w-7 h-7"/>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-ng-light-blue transition-colors">{t.hero.saferPlay}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t.hero.saferPlayDesc}</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-700/70 hover:border-green-500/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-500/15 p-3.5 rounded-xl border border-green-500/30 group-hover:border-green-500/60 group-hover:bg-green-500/20 transition-colors shrink-0 shadow-inner">
                                <DollarSign className="text-green-400 w-7 h-7"/>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{t.hero.lowerCost}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t.hero.lowerCostDesc}</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-700/70 hover:border-pink-500/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                            <div className="bg-pink-500/15 p-3.5 rounded-xl border border-pink-500/30 group-hover:border-pink-500/60 group-hover:bg-pink-500/20 transition-colors shrink-0 shadow-inner">
                                <Heart className="text-pink-400 w-7 h-7"/>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">{t.hero.community}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t.hero.communityDesc}</p>
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
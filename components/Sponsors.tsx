import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Star, Gift, ArrowRight, Trophy } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sponsors: React.FC = () => {
  const { t } = useLanguage();

  const handleAddressClick = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
          {t.sponsors.title}
        </h2>
        <p className="mt-6 text-xl text-gray-300 pl-8 border-l-8 border-transparent">
          {t.sponsors.subtitle}
        </p>
      </div>

      {/* Opening Day Special Banner */}
      <div className="mb-12 bg-ng-light-blue/10 border border-ng-light-blue/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-ng-light-blue/40 transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ng-light-blue/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-ng-light-blue/10 transition-all duration-500"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-6 sm:gap-10">
          <div className="flex-shrink-0 bg-ng-light-blue text-ng-navy p-4 rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-ng-light-blue/20">
            <Gift size={32} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-ng-light-blue mb-2">
              <Star size={14} className="fill-ng-light-blue animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.sponsors.openingDaySpecialTitle}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter mb-2 leading-tight text-center md:text-left transition-colors group-hover:text-ng-light-blue">
              {t.sponsors.openingDaySpecialTitle}
            </h3>
            <p className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed max-w-3xl text-center md:text-left">
              {t.sponsors.openingDaySpecialText}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {t.sponsors.partners.map((partner: any, idx: number) => {
          const isSilver = partner.prizeType === 'silver';
          const prizeColorClass = isSilver ? 'slate-400' : 'yellow-500';
          const prizeTextClass = isSilver ? 'text-slate-300' : 'text-yellow-500';
          const prizeBorderClass = isSilver ? 'border-slate-400/50 hover:border-slate-300 hover:shadow-slate-400/10' : 'border-yellow-500/50 hover:border-yellow-500 hover:shadow-yellow-500/10';
          const prizeHeaderBgClass = isSilver ? 'bg-slate-400/10 border-slate-400/20' : 'bg-yellow-500/10 border-yellow-500/20';
          const prizeIconClass = isSilver ? 'text-slate-300 fill-slate-300' : 'text-yellow-500 fill-yellow-500';
          const prizePerkBgClass = isSilver ? 'bg-slate-400/5 border-slate-400/20 group-hover:bg-slate-400/10' : 'bg-yellow-500/5 border-yellow-500/20 group-hover:bg-yellow-500/10';
          const prizePerkLabelClass = isSilver ? 'bg-slate-400' : 'bg-yellow-500';

          return (
            <div 
              key={idx} 
              className={`group bg-ng-blue/30 rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl ${partner.isPrize ? prizeBorderClass : 'border-gray-700 hover:border-ng-light-blue hover:shadow-ng-light-blue/10'}`}
            >
              {/* Header / Category */}
              <div className={`p-4 flex justify-between items-center border-b ${partner.isPrize ? prizeHeaderBgClass : 'bg-ng-navy border-gray-700'}`}>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${partner.isPrize ? prizeTextClass : 'text-ng-light-blue'}`}>
                  {partner.category}
                </span>
                {partner.isPrize ? (
                  <Trophy size={14} className={prizeIconClass} />
                ) : (
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                )}
              </div>

              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {partner.description}
                </p>

                {/* Perk Box */}
                <div className={`border rounded-xl p-5 relative transition-colors mb-6 ${partner.isPrize ? prizePerkBgClass : 'bg-ng-light-blue/10 border-ng-light-blue/20 group-hover:bg-ng-light-blue/20'}`}>
                  <div className={`absolute -top-3 left-4 text-ng-navy text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 ${partner.isPrize ? prizePerkLabelClass : 'bg-ng-light-blue'}`}>
                    {partner.isPrize ? <Trophy size={10} /> : <Gift size={10} />} 
                    {partner.isPrize ? t.sponsors.prizeTitle : t.sponsors.perkTitle}
                  </div>
                  <p className="text-white font-bold text-sm">
                    {partner.perk}
                  </p>
                </div>

                {/* Address Display */}
                {partner.address && (
                  <div className="flex items-start gap-2 text-gray-400 text-xs mt-auto">
                     <MapPin size={14} className={`${partner.isPrize ? prizeTextClass : 'text-ng-light-blue'} shrink-0 mt-0.5`} />
                     <span className="italic">{partner.address}</span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-ng-navy/50 border-t border-gray-700 mt-auto">
                 <button 
                   onClick={() => handleAddressClick(partner.address)}
                   className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                  >
                   {t.sponsors.viewAddress} <MapPin size={14} />
                 </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-ng-blue/50 to-ng-navy p-8 md:p-12 rounded-3xl border border-gray-700 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ng-light-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <h3 className="text-3xl font-black text-white uppercase italic mb-4 relative z-10">
          {t.sponsors.ctaTitle}
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">
          {t.sponsors.ctaSubtitle}
        </p>
        <NavLink 
          to="/contact" 
          className="inline-flex items-center gap-2 bg-ng-light-blue text-ng-navy font-black px-8 py-4 rounded-xl uppercase tracking-widest italic hover:bg-ng-accent transition-colors relative z-10"
        >
          {t.sponsors.becomePartner} <ArrowRight size={18} />
        </NavLink>
      </div>
    </div>
  );
};

export default Sponsors;
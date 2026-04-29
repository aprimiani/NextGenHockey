import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Star, Gift, ArrowRight, Trophy, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sponsors: React.FC = () => {
  const { t } = useLanguage();

  const handleAddressClick = (address: string) => {
    if (!address) return;
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const renderPartnerCard = (partner: any, idx: number) => {
    const isSilver = partner.prizeType === 'silver';
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

        <div className="p-8 flex-grow flex flex-col">
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
          <div className="mt-auto">
            {partner.address ? (
              <div className="flex items-start gap-2 text-gray-400 text-xs">
                 <MapPin size={14} className={`${partner.isPrize ? prizeTextClass : 'text-ng-light-blue'} shrink-0 mt-0.5`} />
                 <span className="italic">{partner.address}</span>
              </div>
            ) : partner.website && (
              <div className="flex items-start gap-2 text-gray-400 text-xs">
                 <ExternalLink size={14} className="text-ng-light-blue shrink-0 mt-0.5" />
                 <span className="italic">{t.nav.home} Official Partner</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-ng-navy/50 border-t border-gray-700 mt-auto">
           {partner.website ? (
             <a 
               href={partner.website}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
             >
               {t.sponsors.viewWebsite} <ExternalLink size={14} />
             </a>
           ) : (
             <button 
               onClick={() => handleAddressClick(partner.address)}
               className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
               {t.sponsors.viewAddress} <MapPin size={14} />
             </button>
           )}
        </div>
      </div>
    );
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
      <div className="mb-8 bg-ng-light-blue/10 border border-ng-light-blue/20 rounded-lg p-2.5 sm:p-3.5 relative overflow-hidden group hover:border-ng-light-blue/40 transition-all duration-500 max-w-2xl mx-auto shadow-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-ng-light-blue/5 rounded-full -mr-12 -mt-12 blur-xl group-hover:bg-ng-light-blue/10 transition-all duration-500"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-3 md:gap-5">
          <div className="flex-shrink-0 bg-ng-light-blue text-ng-navy p-2 rounded-md rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-sm shadow-ng-light-blue/20">
            <Gift size={16} className="animate-pulse" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-ng-light-blue mb-0.5">
              <Star size={10} className="fill-ng-light-blue animate-spin-slow" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">{t.sponsors.openingDaySpecialTitle}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase italic tracking-tighter mb-0.5 leading-tight transition-colors group-hover:text-ng-light-blue">
              {t.sponsors.openingDaySpecialTitle}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-medium leading-tight max-w-xl">
              {t.sponsors.openingDaySpecialText}
            </p>
          </div>
        </div>
      </div>

      {/* Partners Groups */}
      <div className="space-y-16">
        {/* General Perks */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Gift className="text-ng-light-blue" size={24} />
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-wider">
              {t.sponsors.perksGroupTitle}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sponsors.partners
              .filter((p: any) => !p.isPrize)
              .map((partner: any, idx: number) => renderPartnerCard(partner, idx))}
          </div>
        </div>

        {/* Finalist Prizes */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="text-slate-400" size={24} />
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-wider">
              {t.sponsors.finalistGroupTitle}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sponsors.partners
              .filter((p: any) => p.isPrize && p.prizeType === 'silver')
              .map((partner: any, idx: number) => renderPartnerCard(partner, idx))}
          </div>
        </div>

        {/* Championship Prizes */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="text-yellow-500" size={24} />
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-wider">
              {t.sponsors.championshipGroupTitle}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sponsors.partners
              .filter((p: any) => p.isPrize && p.prizeType === 'gold')
              .map((partner: any, idx: number) => renderPartnerCard(partner, idx))}
          </div>
        </div>
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
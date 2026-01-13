import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Star, Gift, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sponsors: React.FC = () => {
  const { t } = useLanguage();

  const handleAddressClick = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white sm:text-5xl uppercase italic tracking-tighter">
          {t.sponsors.title}
        </h2>
        <div className="mt-4 max-w-2xl mx-auto h-1 bg-ng-light-blue rounded"></div>
        <p className="mt-6 text-xl text-gray-300">
          {t.sponsors.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {t.sponsors.partners.map((partner: any, idx: number) => (
          <div 
            key={idx} 
            className="group bg-ng-blue/30 rounded-2xl border border-gray-700 flex flex-col overflow-hidden hover:border-ng-light-blue transition-all duration-300 hover:shadow-2xl hover:shadow-ng-light-blue/10"
          >
            {/* Header / Category */}
            <div className="bg-ng-navy p-4 flex justify-between items-center border-b border-gray-700">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ng-light-blue">
                {partner.category}
              </span>
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
            </div>

            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-black text-white uppercase italic mb-4">
                {partner.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {partner.description}
              </p>

              {/* Perk Box */}
              <div className="bg-ng-light-blue/10 border border-ng-light-blue/20 rounded-xl p-5 relative group-hover:bg-ng-light-blue/20 transition-colors mb-6">
                <div className="absolute -top-3 left-4 bg-ng-light-blue text-ng-navy text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                  <Gift size={10} /> {t.sponsors.perkTitle}
                </div>
                <p className="text-white font-bold text-sm">
                  {partner.perk}
                </p>
              </div>

              {/* Address Display */}
              {partner.address && (
                <div className="flex items-start gap-2 text-gray-400 text-xs mt-auto">
                   <MapPin size={14} className="text-ng-light-blue shrink-0 mt-0.5" />
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
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-ng-blue/50 to-ng-navy p-8 md:p-12 rounded-3xl border border-gray-700 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ng-light-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <h3 className="text-3xl font-black text-white uppercase italic mb-4 relative z-10">
          Want to reach our local community?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">
          Join us in supporting the Montreal Children's Hospital while growing your business. Become a Next Gen Hockey partner today.
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
import React, { useState } from 'react';
import { 
  Shield, 
  Clock, 
  Users, 
  RefreshCw, 
  Shirt, 
  AlertTriangle, 
  Award, 
  HandMetal, 
  Trophy, 
  UserCheck, 
  Check, 
  Search 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_RULES } from '../../soccerData';

export const SoccerRules: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [searchTerm, setSearchTerm] = useState('');

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock size={22} className="text-lime-400" />;
      case 'Users': return <Users size={22} className="text-lime-400" />;
      case 'RefreshCw': return <RefreshCw size={22} className="text-lime-400" />;
      case 'Shirt': return <Shirt size={22} className="text-lime-400" />;
      case 'AlertTriangle': return <AlertTriangle size={22} className="text-amber-400" />;
      case 'Award': return <Award size={22} className="text-red-400" />;
      case 'HandMetal': return <HandMetal size={22} className="text-lime-400" />;
      case 'Trophy': return <Trophy size={22} className="text-yellow-400" />;
      case 'UserCheck': return <UserCheck size={22} className="text-lime-400" />;
      default: return <Shield size={22} className="text-lime-400" />;
    }
  };

  const filteredRules = SOCCER_RULES.filter(cat => {
    const title = isFr ? cat.titleFr : cat.titleEn;
    const ruleTexts = cat.rules.map(r => (isFr ? r.fr : r.en)).join(' ');
    const combined = `${title} ${ruleTexts}`.toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-3">
            {isFr ? 'Livre des Règlements Officiels' : 'Official League Rulebook'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight font-display mb-4">
            {isFr ? 'RÈGLEMENTS DE LA LIGUE 7V7' : '7V7 LEAGUE REGULATIONS'}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'L\'ensemble des règlements officiels assurant l\'intégrité, le fair-play et la sécurité sur le terrain synthétique.'
              : 'Official league regulations ensuring sportsmanship, safety, and competitive balance on the turf pitch.'}
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isFr ? 'Rechercher un règlement (ex: carton, gardien, équipement)...' : 'Search rules (e.g., card, goalkeeper, equipment)...'}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>
        </div>

        {/* Rule Categories */}
        <div className="space-y-6">
          {filteredRules.map((category) => (
            <div
              key={category.id}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-lime-500/30 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-4 mb-5 pb-4 border-b border-zinc-800">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                  {getIcon(category.icon)}
                </div>
                <h2 className="text-xl font-black uppercase italic font-display text-white">
                  {isFr ? category.titleFr : category.titleEn}
                </h2>
              </div>

              <div className="space-y-4">
                {category.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-lime-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-200 font-semibold leading-relaxed">
                        {isFr ? rule.fr : rule.en}
                      </p>
                      {(rule.detailFr || rule.detailEn) && (
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                          {isFr ? rule.detailFr : rule.detailEn}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

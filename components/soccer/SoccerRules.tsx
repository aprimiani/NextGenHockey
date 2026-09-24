import React from 'react';
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
  Building2 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SOCCER_RULES } from '../../soccerData';
import { SEO } from '../SEO';

export const SoccerRules: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock size={20} className="text-lime-400" />;
      case 'Users': return <Users size={20} className="text-lime-400" />;
      case 'RefreshCw': return <RefreshCw size={20} className="text-lime-400" />;
      case 'Shirt': return <Shirt size={20} className="text-lime-400" />;
      case 'AlertTriangle': return <AlertTriangle size={20} className="text-amber-400" />;
      case 'Award': return <Award size={20} className="text-red-400" />;
      case 'HandMetal': return <HandMetal size={20} className="text-lime-400" />;
      case 'Trophy': return <Trophy size={20} className="text-yellow-400" />;
      case 'UserCheck': return <UserCheck size={20} className="text-lime-400" />;
      case 'Building2': return <Building2 size={20} className="text-lime-400" />;
      default: return <Shield size={20} className="text-lime-400" />;
    }
  };

  // Badge styling helper
  const getBadgeStyle = (badgeType?: 'yellow' | 'red' | 'orange' | 'lime' | 'blue' | 'zinc') => {
    switch (badgeType) {
      case 'yellow':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm';
      case 'red':
        return 'bg-red-500/15 text-red-300 border-red-500/40 shadow-sm';
      case 'orange':
        return 'bg-orange-500/15 text-orange-300 border-orange-500/40 shadow-sm';
      case 'lime':
        return 'bg-lime-500/15 text-lime-300 border-lime-500/40 shadow-sm';
      case 'blue':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-sm';
      case 'zinc':
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  // Helper to render bold markdown text (**text**)
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-white font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#070b08] text-white py-12 sm:py-16">
      <SEO
        title={isFr ? 'Règlements officiels 7v7 | Next Gen Soccer Rive-Sud' : 'Official 7v7 Rules | Next Gen Soccer South Shore'}
        description={isFr ? 'Consultez les règlements officiels de soccer 7v7 sur gazon synthétique, durées de match et code de conduite sportive de Next Gen Soccer à Delson, QC.' : 'Consult the official 7v7 turf soccer regulations, fair play guidelines, match durations, and code of conduct for Next Gen Soccer in Delson, Quebec.'}
        canonical="https://nxtgnsports.ca/soccer/reglements"
        ogType="article"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-lime-500/10 text-lime-400 border border-lime-500/30 mb-3">
            {isFr ? 'Livre des Règlements Officiels' : 'Official League Rulebook'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight font-display mb-4">
            {isFr ? 'RÈGLEMENTS DE LA LIGUE 7V7' : '7V7 LEAGUE REGULATIONS'}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {isFr
              ? "L'ensemble des règlements officiels assurant l'intégrité, le fair-play et la sécurité sur le terrain synthétique."
              : 'Official league regulations ensuring sportsmanship, safety, and competitive balance on the turf pitch.'}
          </p>
        </div>

        {/* Rule Categories */}
        <div className="space-y-6">
          {SOCCER_RULES.map((category) => (
            <div
              key={category.id}
              id={`rule-category-${category.id}`}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-lime-500/40 transition-all shadow-xl backdrop-blur-sm"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-800">
                <div className="w-11 h-11 rounded-xl bg-zinc-800/90 border border-zinc-700/50 flex items-center justify-center shrink-0 shadow-sm">
                  {getIcon(category.icon)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase italic font-display text-white tracking-wide">
                    {isFr ? category.titleFr : category.titleEn}
                  </h2>
                </div>
              </div>

              {/* Category Rules List */}
              <div className="space-y-4">
                {category.rules.map((rule, idx) => {
                  const subheading = isFr ? rule.subheadingFr : rule.subheadingEn;
                  const badge = isFr ? rule.badgeFr : rule.badgeEn;
                  const mainText = isFr ? rule.fr : rule.en;
                  const detailText = isFr ? rule.detailFr : rule.detailEn;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors ${
                        subheading ? 'mt-3' : ''
                      }`}
                    >
                      {/* Subheading + Badge */}
                      {(subheading || badge) && (
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-zinc-800/60">
                          {subheading && (
                            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block" />
                              {subheading}
                            </h3>
                          )}
                          {badge && (
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider border ${getBadgeStyle(
                                rule.badgeType
                              )}`}
                            >
                              {badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Rule Content */}
                      <div className="flex items-start gap-3 text-sm">
                        <Check size={16} className="text-lime-400 shrink-0 mt-1" />
                        <div className="space-y-1.5 flex-1">
                          <p className="text-zinc-200 font-medium leading-relaxed">
                            {renderFormattedText(mainText)}
                          </p>
                          {detailText && (
                            <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed pl-0.5">
                              {renderFormattedText(detailText)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

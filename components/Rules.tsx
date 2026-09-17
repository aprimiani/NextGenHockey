import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Ban, Clock, FileText, X } from 'lucide-react';
import { SEO } from './SEO';

const Rules: React.FC = () => {
  const { t, language } = useLanguage();
  const [showRulebook, setShowRulebook] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SEO
        title={language === 'fr' ? 'Règlements officiels | Ligue Next Gen Hockey Montréal' : 'Official League Rules | Next Gen Hockey Montreal'}
        description={language === 'fr' ? 'Consultez les règlements officiels de la ligue Next Gen Hockey. Priorité au jeu sans contact, sécurité des joueurs et saine compétition à Delson, QC.' : 'Read the official regulations and governance for Next Gen Hockey. Prioritizing non-contact play, player safety, and fair competition in Montreal, Quebec.'}
        canonical="https://nxtgnsports.ca/hockey/rules"
        ogType="article"
      />
      {/* Header aligned with the rest of the site */}
      <div className="mb-8 sm:mb-12">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/30 mb-3">
          {language === 'fr' ? 'Règlements & Gouvernance' : 'Official Regulations'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-display mb-3">
          {t.rules.pageTitle}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {language === 'fr' 
            ? "Consultez les règlements officiels de la ligue, le code d'éthique, les politiques de sécurité et le format des parties."
            : "Review official league bylaws, player safety policies, sportsmanship standards, and recreational game format guidelines."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* General Regulations - Clickable */}
        <div 
          onClick={() => setShowRulebook(true)}
          className="bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 sm:p-8 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/10 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-emerald-500/15 border border-emerald-500/30 p-3 sm:p-3.5 rounded-xl group-hover:bg-emerald-500/25 group-hover:border-emerald-500/50 transition-colors shrink-0 shadow-inner">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-2xl font-black text-white group-hover:text-emerald-400 transition-colors font-display uppercase tracking-wide">{t.rules.regsTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-base">
              {t.rules.regsText}
            </p>
          </div>
          <div className="mt-5 sm:mt-6 pt-4 border-t border-zinc-800 flex items-center text-xs font-black uppercase tracking-widest text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>{t.rulebook.modalTitle} &rarr;</span>
          </div>
        </div>

        {/* Safety */}
        <div className="bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 sm:p-8 hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-sky-500/15 border border-sky-500/30 p-3 sm:p-3.5 rounded-xl group-hover:bg-sky-500/25 group-hover:border-sky-500/50 transition-colors shrink-0 shadow-inner">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400" />
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-2xl font-black text-white group-hover:text-sky-400 transition-colors font-display uppercase tracking-wide">{t.rules.safetyTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-base">
              {t.rules.safetyText}
            </p>
          </div>
        </div>

        {/* Non-Contact */}
        <div className="bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 sm:p-8 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-red-500/15 border border-red-500/30 p-3 sm:p-3.5 rounded-xl group-hover:bg-red-500/25 group-hover:border-red-500/50 transition-colors shrink-0 shadow-inner">
                <Ban className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors font-display uppercase tracking-wide">{t.rules.contactTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-base">
              {t.rules.contactText}
            </p>
          </div>
        </div>

        {/* Game Format */}
        <div className="bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 sm:p-8 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="bg-amber-500/15 border border-amber-500/30 p-3 sm:p-3.5 rounded-xl group-hover:bg-amber-500/25 group-hover:border-amber-500/50 transition-colors shrink-0 shadow-inner">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </div>
              <h3 className="ml-3 sm:ml-4 text-lg sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors font-display uppercase tracking-wide">{t.rules.formatTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-base">
              {t.rules.formatText}
            </p>
          </div>
        </div>
      </div>

      {/* Rulebook Modal */}
      {showRulebook && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowRulebook(false)}
        >
          <div 
            className="bg-[#090d14] border border-zinc-800 w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-zinc-900 sticky top-0 z-10">
              <h2 className="text-lg sm:text-2xl font-black text-white font-display uppercase tracking-wide">{t.rulebook.modalTitle}</h2>
              <button 
                onClick={() => setShowRulebook(false)}
                aria-label="Close rulebook"
                className="text-gray-400 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6 text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                {t.rulebook.sections.map((section: any, idx: number) => (
                  <section key={idx}>
                    <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                    {section.text && <p className="mb-2">{section.text}</p>}
                    
                    {section.subsections && section.subsections.map((sub: any, subIdx: number) => (
                      <div key={subIdx} className="mt-3">
                        <h4 className="font-bold text-sky-400 mb-1">{sub.title}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {sub.items.map((item: string, itemIdx: number) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {section.items && (
                      <ul className="list-disc pl-5 space-y-1 mt-2">
                        {section.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {section.footer && (
                      <p className="mt-3 font-bold text-red-400">{section.footer}</p>
                    )}
                  </section>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rules;
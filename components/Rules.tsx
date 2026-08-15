import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Ban, Clock, FileText, X } from 'lucide-react';

const Rules: React.FC = () => {
  const { t } = useLanguage();
  const [showRulebook, setShowRulebook] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-normal border-l-8 border-ng-light-blue pl-6 font-display">
          {t.rules.pageTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* General Regulations - Clickable */}
        <div 
          onClick={() => setShowRulebook(true)}
          className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 sm:p-8 hover:border-green-500/60 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-green-500/10 group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-green-500/15 border border-green-500/30 p-3.5 rounded-xl group-hover:bg-green-500/25 group-hover:border-green-500/50 transition-colors shrink-0 shadow-inner">
                <FileText className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="ml-4 text-xl sm:text-2xl font-black text-white group-hover:text-green-400 transition-colors font-display uppercase tracking-wide">{t.rules.regsTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {t.rules.regsText}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center text-xs font-black uppercase tracking-widest text-green-400 group-hover:translate-x-1 transition-transform">
            <span>{t.rulebook.modalTitle} &rarr;</span>
          </div>
        </div>

        {/* Safety */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 sm:p-8 hover:border-ng-light-blue/60 hover:shadow-2xl hover:shadow-ng-light-blue/10 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-ng-light-blue/15 border border-ng-light-blue/30 p-3.5 rounded-xl group-hover:bg-ng-light-blue/25 group-hover:border-ng-light-blue/50 transition-colors shrink-0 shadow-inner">
                <Shield className="w-7 h-7 text-ng-light-blue" />
              </div>
              <h3 className="ml-4 text-xl sm:text-2xl font-black text-white group-hover:text-ng-light-blue transition-colors font-display uppercase tracking-wide">{t.rules.safetyTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {t.rules.safetyText}
            </p>
          </div>
        </div>

        {/* Non-Contact */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 sm:p-8 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-red-500/15 border border-red-500/30 p-3.5 rounded-xl group-hover:bg-red-500/25 group-hover:border-red-500/50 transition-colors shrink-0 shadow-inner">
                <Ban className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="ml-4 text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors font-display uppercase tracking-wide">{t.rules.contactTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {t.rules.contactText}
            </p>
          </div>
        </div>

        {/* Game Format */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 sm:p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-yellow-500/15 border border-yellow-500/30 p-3.5 rounded-xl group-hover:bg-yellow-500/25 group-hover:border-yellow-500/50 transition-colors shrink-0 shadow-inner">
                <Clock className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="ml-4 text-xl sm:text-2xl font-black text-white group-hover:text-yellow-400 transition-colors font-display uppercase tracking-wide">{t.rules.formatTitle}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {t.rules.formatText}
            </p>
          </div>
        </div>
      </div>

      {/* Rulebook Modal */}
      {showRulebook && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowRulebook(false)}
        >
          <div 
            className="bg-ng-navy border border-gray-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-ng-blue/90 sticky top-0 z-10">
              <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wide">{t.rulebook.modalTitle}</h2>
              <button 
                onClick={() => setShowRulebook(false)}
                aria-label="Close rulebook"
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6 text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {t.rulebook.sections.map((section: any, idx: number) => (
                  <section key={idx}>
                    <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                    {section.text && <p className="mb-2">{section.text}</p>}
                    
                    {section.subsections && section.subsections.map((sub: any, subIdx: number) => (
                      <div key={subIdx} className="mt-3">
                        <h4 className="font-bold text-ng-light-blue mb-1">{sub.title}</h4>
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
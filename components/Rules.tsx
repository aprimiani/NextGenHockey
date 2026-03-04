import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Ban, Clock, FileText, X } from 'lucide-react';

const Rules: React.FC = () => {
  const { t } = useLanguage();
  const [showRulebook, setShowRulebook] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          {t.rules.pageTitle}
        </h2>
        <div className="mt-4 max-w-2xl mx-auto h-1 bg-ng-light-blue rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Safety */}
        <div className="bg-ng-blue/30 rounded-xl border border-gray-700 p-8 hover:border-ng-light-blue/50 transition-colors">
          <div className="flex items-center mb-6">
            <div className="bg-ng-light-blue/20 p-3 rounded-lg">
              <Shield className="w-8 h-8 text-ng-light-blue" />
            </div>
            <h3 className="ml-4 text-2xl font-bold text-white">{t.rules.safetyTitle}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            {t.rules.safetyText}
          </p>
        </div>

        {/* Non-Contact */}
        <div className="bg-ng-blue/30 rounded-xl border border-gray-700 p-8 hover:border-ng-light-blue/50 transition-colors">
          <div className="flex items-center mb-6">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <Ban className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="ml-4 text-2xl font-bold text-white">{t.rules.contactTitle}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            {t.rules.contactText}
          </p>
        </div>

        {/* Game Format */}
        <div className="bg-ng-blue/30 rounded-xl border border-gray-700 p-8 hover:border-ng-light-blue/50 transition-colors">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="ml-4 text-2xl font-bold text-white">{t.rules.formatTitle}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            {t.rules.formatText}
          </p>
        </div>

        {/* General Regulations - Clickable */}
        <div 
          onClick={() => setShowRulebook(true)}
          className="bg-ng-blue/30 rounded-xl border border-gray-700 p-8 hover:border-ng-light-blue transition-all cursor-pointer hover:shadow-lg hover:shadow-ng-light-blue/10 group"
        >
          <div className="flex items-center mb-6">
            <div className="bg-green-500/20 p-3 rounded-lg group-hover:bg-green-500/30 transition-colors">
              <FileText className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="ml-4 text-2xl font-bold text-white group-hover:text-ng-light-blue transition-colors">{t.rules.regsTitle}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg">
            {t.rules.regsText}
          </p>
        </div>
      </div>

      {/* Rulebook Modal */}
      {showRulebook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-ng-navy border border-gray-700 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-ng-blue sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-white">{t.rulebook.modalTitle}</h2>
              <button 
                onClick={() => setShowRulebook(false)}
                className="text-gray-400 hover:text-white transition-colors"
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
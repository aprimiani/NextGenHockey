import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, PRICING_DATA } from '../constants';
import { Heart, Sparkles, CheckCircle2, Calendar, DollarSign, Info } from 'lucide-react';

const Registration: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    team_name: '',
    captain_name: '',
    email_address: '',
    phone_number: '',
    last_level_played: '',
    estimated_roster_size: '10',
    preferred_language: language
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getEarlyBirdDateLabel = () => {
    return language === 'fr' ? 'Date à venir bientôt !' : 'Date Coming Soon!';
  };

  const getTBDLabel = () => {
    return language === 'fr' ? 'À déterminer' : 'TBD';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (EMAILJS_CONFIG.SERVICE_ID.includes('YOUR_')) {
        alert("Registration email functionality is not configured yet. Please update constants.ts with your EmailJS keys.");
        setIsSubmitting(false);
        return;
    }

    try {
        const templateParams = {
            ...formData,
            submitted_at: new Date().toLocaleString(),
            to_name: "Alessandro Primiani"
        };

        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.REGISTRATION_TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        );
        setSubmitted(true);
    } catch (error: any) {
        console.error('Email error object:', error);
        const errorMessage = error?.text || error?.message || 'An unknown error occurred';
        alert(`Sorry, we couldn't submit your registration. Error details: ${errorMessage}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-ng-blue/30 border border-green-500/50 p-8 rounded-2xl">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{t.register.successTitle}</h2>
          <p className="text-gray-300 text-lg mb-6">
            {t.register.successTextPart1} <strong>{formData.team_name}</strong>. {t.register.successTextPart2} <strong>{formData.email_address}</strong> {t.register.successTextPart3}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-ng-light-blue hover:text-white underline"
          >
            {t.register.registerAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{t.register.title}</h2>
        <p className="mt-2 text-gray-400 font-medium">{t.register.subtitle}</p>
      </div>

      {/* Pricing and Deadlines Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
             <DollarSign className="text-ng-light-blue" size={24} />
             {t.register.pricingTitle}
           </h3>
           <span className="hidden sm:block text-[10px] text-gray-500 uppercase font-black tracking-widest italic">{t.register.pricingSubtitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Early Bird Card */}
          <div className="bg-ng-light-blue/10 border-2 border-ng-light-blue/40 rounded-2xl p-6 relative overflow-hidden group hover:border-ng-light-blue transition-colors">
            <div className="absolute top-0 right-0 bg-ng-light-blue text-ng-navy font-black text-[10px] uppercase px-4 py-1 italic shadow-lg">
               {t.register.earlyBird}
            </div>
            <div className="text-4xl font-black text-white mb-1">
              ${PRICING_DATA.EARLY_BIRD.price.toLocaleString()}<span className="text-xs font-normal text-gray-400 ml-1">/{t.register.perTeam}</span>
            </div>
            <div className="flex items-center gap-2 text-ng-light-blue text-xs font-bold uppercase tracking-widest mb-4">
              <Calendar size={14} />
              {getEarlyBirdDateLabel()}
            </div>
            <div className="pt-4 border-t border-ng-light-blue/20">
               <ul className="space-y-2">
                  {t.register.includedFeatures.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase">
                      <CheckCircle2 size={12} className="text-ng-light-blue" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Regular Rate Card */}
          <div className="bg-ng-blue/30 border border-gray-700 rounded-2xl p-6 hover:border-gray-500 transition-colors">
            <div className="text-4xl font-black text-white mb-1">
              ${PRICING_DATA.REGULAR.price.toLocaleString()}<span className="text-xs font-normal text-gray-500 ml-1">/{t.register.perTeam}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
              <Calendar size={14} />
              {t.register.deadline}: {getTBDLabel()}
            </div>
            <div className="pt-4 border-t border-gray-700/50">
               <ul className="space-y-2">
                  {t.register.includedFeatures.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                      <CheckCircle2 size={12} className="text-gray-600" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
              <Sparkles className="text-ng-light-blue" size={24} />
              {t.register.formTitle}
          </h3>
          <div className="w-12 h-1 bg-ng-light-blue mt-1"></div>
      </div>

      <div className="bg-ng-blue/30 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-700 overflow-hidden">
        {/* Charity Badge Header */}
        <div className="bg-pink-500/10 p-4 border-b border-pink-500/20 flex items-center justify-center gap-3">
           <Heart className="text-pink-500" size={18} fill="currentColor" />
           <span className="text-pink-500 text-xs font-black uppercase tracking-widest italic text-center leading-tight">{t.register.depositInfo}</span>
           <Sparkles className="text-pink-400 hidden sm:block" size={14} />
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="team_name" className="block text-sm font-medium text-gray-300">
                  {t.register.teamName}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="team_name"
                    id="team_name"
                    required
                    value={formData.team_name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                    placeholder={t.register.placeholders.teamName}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="captain_name" className="block text-sm font-medium text-gray-300">
                  {t.register.captainName}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="captain_name"
                    id="captain_name"
                    required
                    value={formData.captain_name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="estimated_roster_size" className="block text-sm font-medium text-gray-300">
                  {t.register.rosterSize}
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="estimated_roster_size"
                    id="estimated_roster_size"
                    min="5"
                    max="20"
                    value={formData.estimated_roster_size}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-300">
                  {t.register.email}
                </label>
                <div className="mt-1">
                  <input
                    id="email_address"
                    name="email_address"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email_address}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                  />
                </div>
              </div>

               <div className="sm:col-span-3">
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300">
                  {t.register.phone}
                </label>
                <div className="mt-1">
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="last_level_played" className="block text-sm font-medium text-gray-300">
                  {t.register.skillLevel}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="last_level_played"
                    name="last_level_played"
                    required
                    value={formData.last_level_played}
                    onChange={handleChange}
                    placeholder={t.register.placeholders.skillLevel}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                  />
                </div>
              </div>

               <div className="sm:col-span-6">
                <label htmlFor="preferred_language" className="block text-sm font-medium text-gray-300">
                  {t.register.preferredLanguage}
                </label>
                <div className="mt-1">
                  <select
                    id="preferred_language"
                    name="preferred_language"
                    value={formData.preferred_language}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-ng-light-blue focus:border-ng-light-blue block w-full sm:text-sm border-gray-600 bg-gray-800 text-white rounded-md p-2.5"
                  >
                    <option value="en">{t.register.langEnglish}</option>
                    <option value="fr">{t.register.langFrench}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex justify-center py-4 px-10 border border-transparent shadow-lg text-base font-black rounded-xl text-ng-navy bg-ng-light-blue hover:bg-ng-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ng-light-blue transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed italic uppercase tracking-widest"
                >
                  {isSubmitting ? 'Submitting...' : t.register.submit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
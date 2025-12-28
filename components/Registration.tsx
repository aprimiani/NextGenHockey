import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../constants';

const Registration: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    team_name: '',
    captain_name: '',
    email_address: '',
    phone_number: '',
    last_level_played: '',
    estimated_roster_size: '10',
    preferred_language: 'en'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h2 className="text-3xl font-extrabold text-white">{t.register.title}</h2>
        <p className="mt-2 text-gray-400">{t.register.subtitle}</p>
      </div>

      <div className="bg-ng-blue/30 backdrop-blur-sm shadow-xl rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
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
                  className="ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-bold rounded-md text-ng-navy bg-ng-light-blue hover:bg-ng-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ng-light-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Phone, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../constants';
import { SEO } from './SEO';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sport: 'Next Gen Hockey',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if EmailJS is configured properly
    if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID.includes('YOUR_')) {
        // Fallback to mailto link if API isn't ready
        const bodyContent = `${formData.message}\n\n---\n${isFr ? 'De' : 'From'}: ${formData.name} (${formData.email})\n${isFr ? 'Téléphone' : 'Phone'}: ${formData.phone}\n${isFr ? 'Sport / Ligue' : 'Sport / League'}: ${formData.sport}`;
        window.location.href = `mailto:info@nxtgnsports.ca?subject=${encodeURIComponent(`[${formData.sport}] ${formData.subject}`)}&body=${encodeURIComponent(bodyContent)}`;
        setIsSubmitting(false);
        return;
    }

    try {
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CONTACT_TEMPLATE_ID, {
            from_name: formData.name, 
            from_email: formData.email,
            phone_number: formData.phone,
            sport: formData.sport,
            subject: `[${formData.sport}] ${formData.subject}`, 
            message: formData.message, 
            to_name: "Alessandro Primiani",
            to_email: "info@nxtgnsports.ca"
        }, EMAILJS_CONFIG.PUBLIC_KEY);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          sport: 'Next Gen Hockey',
          subject: '',
          message: ''
        });
    } catch {
        // Ultimate fallback
        const bodyContent = `${formData.message}\n\n---\nFrom: ${formData.name} (${formData.email})\nPhone: ${formData.phone}\nSport: ${formData.sport}`;
        window.location.href = `mailto:info@nxtgnsports.ca?subject=${encodeURIComponent(`[${formData.sport}] ${formData.subject}`)}&body=${encodeURIComponent(bodyContent)}`;
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SEO
        title={isFr ? 'Contactez Next Gen Sports | Ligues Montréal & Rive-Sud' : 'Contact Next Gen Sports | Montreal & South Shore Leagues'}
        description={isFr ? 'Des questions sur nos ligues de hockey ou soccer sur la Rive-Sud de Montréal? Contactez l\'équipe de direction Next Gen Sports pour tout renseignement.' : 'Have questions about our Montreal adult hockey or soccer leagues? Contact Next Gen Sports for league inquiries, team registrations, and player support.'}
        canonical="https://nxtgnsports.ca/contact"
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": isFr ? "Contactez Next Gen Sports" : "Contact Next Gen Sports",
          "url": "https://nxtgnsports.ca/contact",
          "mainEntity": {
            "@type": "SportsOrganization",
            "name": "Next Gen Sports",
            "email": "info@nxtgnsports.ca",
            "url": "https://nxtgnsports.ca/"
          }
        }}
      />
      {/* Central Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
          <Mail size={13} className="text-amber-400" />
          <span>{isFr ? 'NextGen Sports • Contact Central' : 'NextGen Sports • Central Contact'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight italic mb-4">
          {isFr ? 'Contactez NextGen Sports' : 'Contact NextGen Sports'}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {isFr
            ? 'Pour toute question concernant la Ligue de Hockey NextGen, la Ligue de Soccer NextGen 7v7, les partenariats ou les inscriptions, communiquez directement avec notre direction.'
            : 'For inquiries regarding NextGen Hockey, NextGen Soccer 7v7, league partnerships, or player registrations, reach out directly to our administration.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                {isFr ? 'Message Envoyé' : 'Message Sent Successfully'}
              </h3>
              <p className="text-gray-300 mb-8 max-w-sm text-sm">
                {isFr
                  ? 'Merci de nous avoir contactés! Le directeur de l’organisation vous répondra dans les plus brefs délais.'
                  : 'Thank you for reaching out! A league director will review your message and reply promptly.'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-amber-400 hover:text-white font-bold text-sm underline underline-offset-4 transition-colors cursor-pointer"
              >
                {isFr ? 'Envoyer un autre message' : 'Send another message'}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <h2 className="text-lg sm:text-xl font-black text-white flex items-center font-display uppercase tracking-wide">
                  <Mail className="mr-2.5 text-amber-400" size={20} />
                  {isFr ? 'Formulaire de Contact Officiel' : 'Official Contact Form'}
                </h2>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {isFr ? 'Organisation Centrale' : 'Central Organization'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Sport / League Selection */}
                <div>
                  <label htmlFor="contact-sport" className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                    {isFr ? 'Sport / Ligue concerné(e) *' : 'Sport / League of Interest *'}
                  </label>
                  <select
                    id="contact-sport"
                    name="sport"
                    required
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Next Gen Hockey">🏒 Next Gen Hockey</option>
                    <option value="Next Gen Soccer">⚽ Next Gen Soccer</option>
                    <option value="General Inquiry">{isFr ? '📋 Demande Générale' : '📋 General Inquiry'}</option>
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      {isFr ? 'Nom Complet *' : 'Full Name *'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isFr ? 'Ex: Jean Dupont' : 'e.g. John Doe'}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      {isFr ? 'Numéro de Téléphone *' : 'Phone Number *'}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(514) 000-0000"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Email & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      {isFr ? 'Courriel *' : 'Email Address *'}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nom@exemple.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      {isFr ? 'Sujet *' : 'Subject *'}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={isFr ? 'Ex: Question sur la saison' : 'e.g. Question regarding season'}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    {isFr ? 'Message *' : 'Message *'}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={isFr ? 'Écrivez votre message ici...' : 'Type your message here...'}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 focus:outline-none resize-none transition-all text-sm"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-black font-black py-4 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 uppercase tracking-widest font-display shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.99] text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? (isFr ? 'Envoi en cours...' : 'Sending...') : (isFr ? 'Envoyer le Message' : 'Send Message')}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Sidebar Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Contact */}
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-zinc-800 shadow-2xl">
            <h3 className="text-lg font-black text-white mb-5 border-b border-zinc-800 pb-3 flex items-center gap-2 font-display uppercase tracking-wide">
              <Mail size={18} className="text-amber-400" />
              {isFr ? 'Direction Générale' : 'General Administration'}
            </h3>
            <div className="flex items-start">
              <div className="bg-amber-500/10 p-3.5 rounded-xl mr-4 border border-amber-500/20 text-amber-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.2em] mb-1">
                  {isFr ? 'Courriel Officiel' : 'Official Email'}
                </p>
                <a 
                  href="mailto:info@nxtgnsports.ca" 
                  className="text-white text-lg sm:text-xl font-black hover:text-amber-400 transition-colors break-all block leading-tight font-display"
                >
                  info@nxtgnsports.ca
                </a>
                <p className="text-sm text-gray-300 mt-2 uppercase font-bold tracking-tight">Alessandro Primiani</p>
                <p className="text-xs text-amber-400/90 font-semibold tracking-wider">
                  {isFr ? 'Directeur de l’organisation • NextGen Sports' : 'League Director • NextGen Sports'}
                </p>
              </div>
            </div>
          </div>

          {/* Division Portals overview */}
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-zinc-800 shadow-2xl space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy size={16} className="text-amber-400" />
              {isFr ? 'Nos Divisions Sportives' : 'Our Sports Divisions'}
            </h3>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-sky-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">🏒</span>
                <p className="text-xs font-black uppercase text-sky-400 tracking-wider">NextGen Hockey</p>
              </div>
              <p className="text-xs text-gray-300">
                {isFr ? 'Centre Sportif de Delson • 100 Rue de la Rivière, Delson, QC' : 'Centre Sportif de Delson • 100 Rue de la Rivière, Delson, QC'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-lime-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">⚽</span>
                <p className="text-xs font-black uppercase text-lime-400 tracking-wider">NextGen Soccer 7v7</p>
              </div>
              <p className="text-xs text-gray-300">
                {isFr ? 'Complexe Sportif Delson | Sainte-Catherine • 75 Bd Georges Gagné N, Delson, QC' : 'Complexe Sportif Delson | Sainte-Catherine • 75 Bd Georges Gagné N, Delson, QC'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

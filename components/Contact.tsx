import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../constants';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if EmailJS is configured properly
    if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID.includes('YOUR_')) {
        // Fallback to mailto link if API isn't ready
        window.location.href = `mailto:nextgenhky@outlook.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
        setIsSubmitting(false);
        return;
    }

    try {
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CONTACT_TEMPLATE_ID, {
            from_name: formData.name, 
            from_email: formData.email, 
            subject: formData.subject, 
            message: formData.message, 
            to_name: "Alessandro Primiani"
        }, EMAILJS_CONFIG.PUBLIC_KEY);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
        // Ultimate fallback
        window.location.href = `mailto:nextgenhky@outlook.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h2 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-normal italic border-l-8 border-ng-light-blue pl-6">
          {t.contact.title}
        </h2>
        <p className="mt-4 text-xl text-gray-300 pl-8 border-l-8 border-transparent">
          {t.contact.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 border border-green-500/40 shadow-lg shadow-green-500/20"><CheckCircle className="w-8 h-8 text-green-400" /></div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">{t.contact.successTitle}</h3>
              <p className="text-gray-300 mb-8 max-w-sm">{t.contact.successText}</p>
              <button onClick={() => setSubmitted(false)} className="text-ng-light-blue hover:text-white font-bold text-sm underline underline-offset-4 transition-colors">{t.contact.sendAnother}</button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-black text-white mb-6 flex items-center font-display uppercase tracking-wide"><Mail className="mr-2.5 text-ng-light-blue" size={22} />{t.contact.formTitle}</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">{t.contact.name}</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-ng-light-blue/40 focus:border-ng-light-blue focus:outline-none transition-all text-sm shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">{t.contact.email}</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-ng-light-blue/40 focus:border-ng-light-blue focus:outline-none transition-all text-sm shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">{t.contact.subject}</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-ng-light-blue/40 focus:border-ng-light-blue focus:outline-none transition-all text-sm shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">{t.contact.message}</label>
                  <textarea name="message" rows={4} required value={formData.message} onChange={handleChange} className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-ng-light-blue/40 focus:border-ng-light-blue focus:outline-none resize-none transition-all text-sm shadow-inner"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-ng-light-blue via-sky-400 to-ng-accent hover:brightness-110 text-ng-navy font-black py-4 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 uppercase tracking-widest font-display shadow-lg shadow-ng-light-blue/25 hover:shadow-xl hover:shadow-ng-light-blue/35 active:scale-[0.99] text-base border border-white/20">
                  <Send className="w-5 h-5 mr-2" /> {isSubmitting ? t.contact.sending : t.contact.submit}
                </button>
              </form>
            </>
          )}
        </div>
        
        <div className="bg-slate-900/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl self-start overflow-hidden">
          <h3 className="text-xl font-black text-white mb-6 border-b border-gray-700/80 pb-4 flex items-center gap-2 font-display uppercase tracking-wide"><Mail size={20} className="text-ng-light-blue" />{t.contact.directInfo}</h3>
          <div className="flex items-start">
            <div className="bg-ng-light-blue/15 p-4 rounded-xl mr-4 sm:mr-5 border border-ng-light-blue/25 shadow-inner shrink-0"><Mail className="w-6 h-6 sm:w-7 sm:h-7 text-ng-light-blue" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-ng-light-blue font-black uppercase tracking-[0.2em] mb-1">{t.contact.directOutreach}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{t.contact.emailLabel}</p>
              <a 
                href="mailto:nextgenhky@outlook.com" 
                className="text-white text-lg sm:text-xl md:text-2xl font-black hover:text-ng-light-blue transition-colors break-all block leading-tight font-display"
              >
                nextgenhky@outlook.com
              </a>
              <p className="text-sm text-gray-300 mt-3 uppercase font-bold tracking-tight">Alessandro Primiani</p>
              <p className="text-xs text-ng-light-blue/80 font-bold uppercase tracking-widest">{t.contact.directorRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
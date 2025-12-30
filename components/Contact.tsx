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
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.contact.title}</h2>
        <div className="mt-4 max-w-2xl mx-auto"><p className="text-xl text-gray-300">{t.contact.subtitle}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-ng-blue/30 rounded-xl border border-gray-700 p-8 shadow-xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"><CheckCircle className="w-8 h-8 text-green-500" /></div>
              <h3 className="text-2xl font-bold text-white mb-2">{t.contact.successTitle}</h3>
              <p className="text-gray-300 mb-8">{t.contact.successText}</p>
              <button onClick={() => setSubmitted(false)} className="text-ng-light-blue hover:text-white font-medium underline">{t.contact.sendAnother}</button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Mail className="mr-2 text-ng-light-blue" />{t.contact.formTitle}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><label className="block text-sm font-medium text-gray-300 mb-1">{t.contact.name}</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-ng-light-blue focus:outline-none transition-all" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1">{t.contact.email}</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-ng-light-blue focus:outline-none transition-all" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1">{t.contact.subject}</label><input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-ng-light-blue focus:outline-none transition-all" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-1">{t.contact.message}</label><textarea name="message" rows={4} required value={formData.message} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-ng-light-blue focus:outline-none resize-none transition-all"></textarea></div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-ng-light-blue hover:bg-ng-accent text-ng-navy font-black py-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 uppercase tracking-widest italic shadow-lg shadow-ng-light-blue/20">
                  <Send className="w-5 h-5 mr-2" /> {isSubmitting ? 'Sending...' : t.contact.submit}
                </button>
              </form>
            </>
          )}
        </div>
        
        <div className="bg-ng-blue/30 p-8 rounded-xl border border-gray-700 shadow-xl self-start">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4 flex items-center gap-2 italic uppercase tracking-tighter"><Mail size={20} className="text-ng-light-blue" />{t.contact.directInfo}</h3>
          <div className="flex items-start">
            <div className="bg-ng-light-blue/10 p-4 rounded-lg mr-5 border border-ng-light-blue/20 shadow-inner"><Mail className="w-7 h-7 text-ng-light-blue" /></div>
            <div>
              <p className="text-[10px] text-ng-light-blue font-black uppercase tracking-[0.2em] mb-1">Direct Outreach</p>
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">{t.contact.emailLabel}</p>
              <a href="mailto:nextgenhky@outlook.com" className="text-white text-xl md:text-2xl font-black hover:text-ng-light-blue transition-colors">nextgenhky@outlook.com</a>
              <p className="text-sm text-gray-400 mt-2 uppercase font-bold tracking-tight">Alessandro Primiani</p>
              <p className="text-xs text-ng-light-blue/70 font-bold uppercase tracking-widest">{t.contact.directorRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
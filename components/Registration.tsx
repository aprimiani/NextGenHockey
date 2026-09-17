import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trophy, CheckCircle, Send, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../constants';

export const Registration: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Read ?sport= query param ('hockey' | 'soccer')
  const initialSportParam = searchParams.get('sport')?.toLowerCase();
  const [selectedSport, setSelectedSport] = useState<'hockey' | 'soccer'>(
    initialSportParam === 'soccer' ? 'soccer' : 'hockey'
  );

  // Sync state if URL query param changes
  useEffect(() => {
    const param = searchParams.get('sport')?.toLowerCase();
    if (param === 'soccer' && selectedSport !== 'soccer') {
      setSelectedSport('soccer');
    } else if (param === 'hockey' && selectedSport !== 'hockey') {
      setSelectedSport('hockey');
    }
  }, [searchParams]);

  // Handle sport dropdown change
  const handleSportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as 'hockey' | 'soccer';
    setSelectedSport(val);
    setSearchParams({ sport: val });
  };

  // Form states - exclusively the requested fields
  const [formData, setFormData] = useState({
    team_name: '',
    captain_name: '',
    email_address: '',
    phone_number: '',
    estimated_roster_size: '',
    last_level_played: '',
    preferred_language: language === 'fr' ? 'fr' : 'en',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sportLabel = selectedSport === 'hockey' ? 'Next Gen Hockey' : 'Next Gen Soccer';
    const templateParams = {
      sport: sportLabel,
      team_name: formData.team_name,
      captain_name: formData.captain_name,
      email_address: formData.email_address,
      phone_number: formData.phone_number,
      estimated_roster_size: formData.estimated_roster_size,
      last_level_played: formData.last_level_played,
      preferred_language: formData.preferred_language === 'fr' ? 'Français' : 'English',
      submitted_at: new Date().toLocaleString(),
      to_name: "Alessandro Primiani",
      to_email: "info@nxtgnsports.ca"
    };

    // Fallback if EmailJS is not yet configured with production keys
    if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID.includes('YOUR_')) {
      const body = `NextGen Sports Registration:\n\nSport: ${sportLabel}\nTeam Name: ${formData.team_name}\nTeam Captain Name: ${formData.captain_name}\nEmail: ${formData.email_address}\nPhone Number: ${formData.phone_number}\nEstimated Team Size: ${formData.estimated_roster_size}\nLast Level Played: ${formData.last_level_played}\nPreferred Language: ${formData.preferred_language === 'fr' ? 'Français' : 'English'}`;
      window.location.href = `mailto:info@nxtgnsports.ca?subject=${encodeURIComponent(`[Registration] ${sportLabel} - ${formData.team_name}`)}&body=${encodeURIComponent(body)}`;
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.REGISTRATION_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setSubmitted(true);
      setFormData({
        team_name: '',
        captain_name: '',
        email_address: '',
        phone_number: '',
        estimated_roster_size: '',
        last_level_played: '',
        preferred_language: language === 'fr' ? 'fr' : 'en',
      });
    } catch {
      const body = `NextGen Sports Registration:\n\nSport: ${sportLabel}\nTeam Name: ${formData.team_name}\nTeam Captain Name: ${formData.captain_name}\nEmail: ${formData.email_address}\nPhone Number: ${formData.phone_number}\nEstimated Team Size: ${formData.estimated_roster_size}\nLast Level Played: ${formData.last_level_played}\nPreferred Language: ${formData.preferred_language === 'fr' ? 'Français' : 'English'}`;
      window.location.href = `mailto:info@nxtgnsports.ca?subject=${encodeURIComponent(`[Registration] ${sportLabel} - ${formData.team_name}`)}&body=${encodeURIComponent(body)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Central Title */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
          <Trophy size={13} className="text-amber-400" />
          <span>{isFr ? 'Inscription Officielle • NextGen Sports' : 'Official Registration • NextGen Sports'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight italic mb-3">
          {isFr ? 'Inscription d\'Équipe' : 'Team Registration'}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {isFr
            ? 'Remplissez les informations ci-dessous pour inscrire votre équipe à la ligue officielle NextGen Sports.'
            : 'Fill in the information below to register your team for the official NextGen Sports league.'}
        </p>
      </div>

      {/* Main Container */}
      {submitted ? (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 sm:p-12 text-center animate-in fade-in duration-500 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic font-display mb-3">
            {isFr ? 'Inscription Transmise !' : 'Registration Submitted!'}
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            {isFr
              ? `Merci ! Votre demande d'inscription pour ${selectedSport === 'hockey' ? 'Next Gen Hockey' : 'Next Gen Soccer'} a été reçue. Notre directeur d'organisation vous contactera sous peu.`
              : `Thank you! Your team registration for ${selectedSport === 'hockey' ? 'Next Gen Hockey' : 'Next Gen Soccer'} has been submitted. Our league director will be in touch shortly.`}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
          >
            <span>{isFr ? 'Soumettre une autre inscription' : 'Submit Another Registration'}</span>
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sport Dropdown Selection */}
            <div>
              <label htmlFor="reg-sport-select" className="block text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                {isFr ? 'Sport / Ligue *' : 'Sport / League *'}
              </label>
              <div className="relative">
                <select
                  id="reg-sport-select"
                  name="sport"
                  value={selectedSport}
                  onChange={handleSportSelect}
                  className="w-full appearance-none bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3.5 text-white text-sm font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all cursor-pointer pr-10"
                >
                  <option value="hockey">🏒 Next Gen Hockey</option>
                  <option value="soccer">⚽ Next Gen Soccer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Row 1: Team Name & Team Captain Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-team-name" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isFr ? 'Nom de l\'équipe *' : 'Team Name *'}
                </label>
                <input
                  id="reg-team-name"
                  type="text"
                  name="team_name"
                  required
                  value={formData.team_name}
                  onChange={handleChange}
                  placeholder={selectedSport === 'hockey' ? (isFr ? 'Ex: Les Gladiateurs' : 'e.g. The Titans') : (isFr ? 'Ex: FC Rive-Sud' : 'e.g. South Shore FC')}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="reg-captain-name" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isFr ? 'Nom du capitaine de l\'équipe *' : 'Team Captain Name *'}
                </label>
                <input
                  id="reg-captain-name"
                  type="text"
                  name="captain_name"
                  required
                  value={formData.captain_name}
                  onChange={handleChange}
                  placeholder={isFr ? 'Ex: Alessandro Primiani' : 'e.g. John Doe'}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-email" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isFr ? 'Courriel *' : 'Email *'}
                </label>
                <input
                  id="reg-email"
                  type="email"
                  name="email_address"
                  required
                  value={formData.email_address}
                  onChange={handleChange}
                  placeholder="nom@exemple.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="reg-phone" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isFr ? 'Numéro de téléphone *' : 'Phone Number *'}
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  name="phone_number"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="(514) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Estimated Team Size & Last Level Played */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reg-roster" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isFr ? 'Taille estimée de l\'équipe *' : 'Estimated Team Size *'}
                </label>
                <input
                  id="reg-roster"
                  type="number"
                  name="estimated_roster_size"
                  min="1"
                  max="30"
                  required
                  value={formData.estimated_roster_size}
                  onChange={handleChange}
                  placeholder={selectedSport === 'hockey' ? '12' : '10'}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="reg-level" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                  {isFr ? 'Dernier niveau joué *' : 'Last Level Played *'}
                </label>
                <input
                  id="reg-level"
                  type="text"
                  name="last_level_played"
                  required
                  value={formData.last_level_played}
                  onChange={handleChange}
                  placeholder={selectedSport === 'hockey' ? (isFr ? 'Ex: Midget BB, Junior, D, Récréatif' : 'e.g. Midget BB, Junior, D, Rec') : (isFr ? 'Ex: AAA, Senior AA, Récréatif, D1' : 'e.g. AAA, Senior AA, Rec, D1')}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Row 4: Language Preferred */}
            <div>
              <label htmlFor="reg-language" className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                {isFr ? 'Langue préférée *' : 'Language Preferred *'}
              </label>
              <div className="relative">
                <select
                  id="reg-language"
                  name="preferred_language"
                  value={formData.preferred_language}
                  onChange={handleChange}
                  className="w-full appearance-none bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all cursor-pointer pr-10"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="reg-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                selectedSport === 'hockey'
                  ? 'bg-sky-400 hover:bg-sky-300 text-zinc-950 shadow-sky-500/25'
                  : 'bg-lime-400 hover:bg-lime-300 text-zinc-950 shadow-lime-500/25'
              }`}
            >
              <span>
                {isSubmitting
                  ? (isFr ? 'Envoi en cours...' : 'Submitting...')
                  : (isFr
                      ? `Inscrire l'équipe • ${selectedSport === 'hockey' ? 'Next Gen Hockey' : 'Next Gen Soccer'}`
                      : `Register Team • ${selectedSport === 'hockey' ? 'Next Gen Hockey' : 'Next Gen Soccer'}`)}
              </span>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Registration;

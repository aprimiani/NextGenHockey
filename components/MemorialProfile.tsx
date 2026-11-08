import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowLeft, Heart, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SEO } from './SEO';

export const MemorialProfile: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <div className="min-h-screen bg-[#07090e] text-white py-10 sm:py-16">
      <SEO
        title={isFr ? "Hommage à Alexandre Marchand • Étoile Éternelle #1 | NextGen Hockey" : "In Memory of Alexandre Marchand • Forever Star #1 | NextGen Hockey"}
        description={isFr ? "Hommage commémoratif permanent à Alexandre Marchand. Étoile #1 honoraire permanente de NextGen Hockey." : "Permanent memorial tribute to Alexandre Marchand. Permanent Honorary #1 Star of NextGen Hockey."}
        canonical="https://nxtgnsports.ca/memorial/alexandre-marchand"
        ogType="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/hockey/standings"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{isFr ? 'Retour aux Étoiles & Classement' : 'Return to Player Stars & Standings'}</span>
          </Link>
        </div>

        {/* Memorial Hero Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0c1322] via-[#090e18] to-[#07090e] border border-sky-500/30 p-6 sm:p-12 shadow-2xl overflow-hidden">
          {/* Subtle ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Memorial Ribbon / Badge */}
          <div className="flex items-center justify-center sm:justify-start mb-8 pb-6 border-b border-gray-800/80">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-black uppercase tracking-widest shadow-sm">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span>{isFr ? 'HOMMAGE COMMÉMORATIF PERMANENT' : 'PERMANENT MEMORIAL TRIBUTE'}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
            {/* Photograph / Avatar Container */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-b from-slate-900 to-black border-2 border-sky-400/40 p-2 shadow-2xl shadow-sky-950/50 flex items-center justify-center group">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-800/90 via-slate-900 to-[#070d18] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-400/20 rounded-full blur-xl" />
                  
                  {/* Initials Avatar */}
                  <span className="text-5xl sm:text-6xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-sky-400">
                    AM
                  </span>
                  
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-300/80 mt-2">
                    #67 • JETS
                  </span>
                </div>

                {/* Star Accent Badge */}
                <div className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 flex items-center justify-center font-black shadow-lg border-2 border-slate-900">
                  <Star size={18} className="fill-zinc-950" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400/90 flex items-center justify-center gap-1">
                  <Sparkles size={12} />
                  <span>{isFr ? 'Éternellement dans nos cœurs' : 'Forever in our hearts'}</span>
                </span>
              </div>
            </div>

            {/* Profile Info & Core Tribute */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-widest mb-2">
                {isFr ? '#1 Honoraire Permanent' : 'Permanent Honorary #1'}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase italic font-display text-white tracking-tight mb-2">
                Alexandre Marchand
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20">
                  {isFr ? 'POUR TOUJOURS UNE ÉTOILE NEXTGEN' : 'FOREVER A NEXTGEN STAR'}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700">
                  {isFr ? 'Pour toujours dans nos mémoires' : 'Forever Remembered'}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-300 bg-sky-500/20 px-3 py-1 rounded-lg border border-sky-500/30">
                  Jets • #67
                </span>
              </div>

              {/* Dedicated Memorial Message */}
              <div className="my-6 p-6 sm:p-7 rounded-2xl bg-black/50 border-l-4 border-sky-400 border-y border-r border-slate-800 shadow-xl">
                <p className="text-sm sm:text-base italic text-gray-100 leading-relaxed font-medium">
                  {isFr
                    ? "« March, je n'oublierai jamais ta gentillesse et la façon dont tu savais toujours mettre les gens à l'aise. J'ai eu la chance de te connaître d'abord en te regardant jouer, puis en partageant la glace avec toi. Tu as marqué bien plus que notre ligue, tu as marqué les gens qui ont eu la chance de croiser ton chemin. Tu auras toujours une place parmi nous. »"
                    : "\"March, I will never forget your kindness and the way you always knew how to make people feel comfortable. I had the privilege of knowing you first by watching you play, and then by sharing the ice with you. You made an impact far beyond our league—you touched the lives of everyone fortunate enough to cross your path. You will always have a place among us.\""}
                </p>
                <div className="mt-4 text-right">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-sky-400">
                    — Alessandro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemorialProfile;

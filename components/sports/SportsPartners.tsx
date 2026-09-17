import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trophy, Gift, MapPin, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SportsPartners: React.FC = () => {
  const { language, t } = useLanguage();
  const isFr = language === 'fr';

  const partnerList = [
    {
      name: isFr ? "Fondation de l'Hôpital de Montréal pour enfants" : "Montreal Children's Hospital Foundation",
      category: isFr ? 'Partenaire Caritatif Majeur' : 'Major Charity Partner',
      description: isFr
        ? "NextGen Sports remet une portion de ses bénéfices et organise des collectes caritatives lors de ses tournois et événements pour appuyer les soins de pointe destinés aux enfants malades du Québec."
        : "NextGen Sports donates proceeds and organizes charity drives during league tournaments and showcases to fund cutting-edge pediatric care for children across Quebec.",
      highlight: isFr ? "Partenaire officiel de la ligue" : "Official League Charity",
      isCharity: true,
      website: "https://fondationduchildren.com"
    },
    {
      name: "Subway Delson",
      category: isFr ? "Restauration & Partenaire Saisonnier" : "Dining & Season Partner",
      description: isFr
        ? "Fier partenaire alimentaire pour les athlètes de la ligue. Offre exclusive de 20% de rabais avec la carte privilège NextGen."
        : "Proud nutrition partner for league athletes. Exclusive 20% discount card provided to registered players.",
      highlight: isFr ? "Rabais 20% sur commandes" : "20% off all player orders",
      address: "15, 41 Boulevard Georges-Gagné S, Delson"
    },
    {
      name: "Popeyes Suppléments Delson",
      category: isFr ? "Nutrition & Suppléments Sportifs" : "Sports Nutrition & Supplements",
      description: isFr
        ? "Conseils experts en performance et suppléments de qualité pour l'endurance, l'hydratation et la récupération des joueurs."
        : "Expert athletic performance advice and clean nutritional supplements for player endurance, hydration, and recovery.",
      highlight: isFr ? "Bouteilles & cartes-cadeaux aux joueurs" : "Free bottles & gift cards on opening day",
      address: "Delson, QC"
    },
    {
      name: "Pasquier Delson",
      category: isFr ? "Supermarché & Alimentation Fraîche" : "Fresh Grocery & Supermarket Partner",
      description: isFr
        ? "Supermarché d'alimentation de référence à Delson, réputé pour la fraîcheur de ses produits, son service traiteur exceptionnel et son soutien continu aux athlètes locaux."
        : "Premier supermarket in Delson renowned for farm-fresh produce, artisanal butcher meats, bakery items, and steadfast support of local athletes.",
      highlight: isFr ? "Prix Joueur du Mois & collations saines" : "Player of the Month awards & healthy snacks",
      address: "81-B Rue Saint-François-Xavier, Delson, QC"
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080b] text-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
            {isFr ? 'Réseau Partenaire' : 'Partner Network'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight font-display mb-4">
            {isFr ? 'NOS PARTENAIRES OFFICIELS' : 'OUR OFFICIAL PARTNERS'}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {isFr
              ? 'NextGen Sports est fier de collaborer avec des institutions et entreprises d\'exception pour offrir la meilleure expérience à nos athlètes.'
              : 'NextGen Sports is proud to collaborate with exceptional organizations and local businesses to deliver premier athletic experiences.'}
          </p>
        </div>

        {/* Major Partner: Montreal Children's Hospital */}
        <div className="rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/20 border border-red-500/40 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 fill-red-400/30" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/40 inline-block">
                  {isFr ? 'Partenaire Philanthropique Officiel' : 'Official Philanthropic Partner'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase italic text-white font-display">
                  {isFr ? "Fondation de l'Hôpital de Montréal pour enfants" : "Montreal Children's Hospital Foundation"}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {isFr
                    ? "Chaque saison sportive NextGen Sports est associée à une collecte de fonds directe pour soutenir les enfants malades et leurs familles. En participant à nos ligues, nos joueurs et partenaires contribuent activement à une cause qui change des vies."
                    : "Every NextGen Sports season is linked to direct fundraising initiatives supporting sick children and their families. By playing in our leagues, our athletes and partners actively support a life-changing cause."}
                </p>
              </div>
            </div>
            {partnerList[0].website && (
              <a
                href={partnerList[0].website}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest bg-red-600 hover:bg-red-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <span>{isFr ? 'Visiter la fondation' : 'Visit foundation'}</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {partnerList.slice(1).map((p, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    {p.category}
                  </span>
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                </div>
                <h3 className="text-xl font-black uppercase italic text-white font-display mb-3">
                  {p.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Gift size={14} />
                  <span>{p.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to become a partner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black uppercase italic text-white font-display mb-2">
            {isFr ? 'Vous désirez devenir partenaire ?' : 'Interested in becoming a partner?'}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-6">
            {isFr
              ? 'Rejoignez notre réseau dynamique de commanditaires et faites rayonner votre entreprise auprès de centaines d\'athlètes locaux.'
              : 'Join our dynamic sponsor network and connect your business with hundreds of passionate local athletes.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            <span>{isFr ? 'Contactez notre équipe' : 'Contact our team'}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

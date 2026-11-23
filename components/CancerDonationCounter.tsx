import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeagueData } from '../contexts/LeagueDataContext';
import { SOCCER_SCHEDULE } from '../soccerData';
import { PurpleRibbonIcon } from './icons/PurpleRibbonIcon';

const DONATION_PER_GOAL = 20;

interface CancerDonationCounterProps {
  className?: string;
}

export const CancerDonationCounter: React.FC<CancerDonationCounterProps> = ({ className = '' }) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const { schedule } = useLeagueData();

  const stats = useMemo(() => {
    const soccerCancerGames = SOCCER_SCHEDULE.filter(
      (m) => m.date === '2026-11-22' && m.status === 'completed'
    );
    const soccerGoals = soccerCancerGames.reduce(
      (sum, m) => sum + (m.homeScore || 0) + (m.awayScore || 0),
      0
    );

    const hockeyCancerGames = schedule.filter(
      (g) => (g.date === '2026-11-23' || g.date === '2026-11-24') && g.status === 'played'
    );
    const hockeyGoals = hockeyCancerGames.reduce(
      (sum, g) => sum + (g.homeScore || 0) + (g.awayScore || 0),
      0
    );

    const totalGoals = soccerGoals + hockeyGoals;
    const totalAmount = totalGoals * DONATION_PER_GOAL;

    return {
      soccerGoals,
      soccerAmount: soccerGoals * DONATION_PER_GOAL,
      hockeyGoals,
      hockeyAmount: hockeyGoals * DONATION_PER_GOAL,
      totalGoals,
      totalAmount,
    };
  }, [schedule]);

  const formatAmount = (amount: number) => (isFr ? `${amount} $` : `$${amount}`);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/45 via-zinc-900/95 to-purple-950/30 p-4 sm:p-6 shadow-xl shadow-purple-950/25 ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-400 to-purple-500/0" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        {/* Left: Badge, Title & Description */}
        <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-500/15 border border-purple-400/40 flex items-center justify-center shrink-0">
            <PurpleRibbonIcon className="w-6 h-6" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/35 text-purple-200 text-[10px] font-black uppercase tracking-widest">
                <Heart size={10} className="text-purple-300 fill-purple-300/40" />
                <span>
                  {isFr ? 'Matchs Sensibilisation au Cancer' : 'Cancer Awareness Games'}
                </span>
              </span>
              <span className="text-[11px] font-bold text-purple-300/90">
                {isFr ? '20 $ par but marqué' : '$20 per goal scored'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black uppercase italic tracking-tight text-white font-display">
              {isFr ? 'Compteur de Dons' : 'Goal Donation Counter'}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] sm:text-xs text-gray-300">
              <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-purple-500/25 font-semibold">
                ⚽ Soccer (22 Nov): <strong className="text-white">{stats.soccerGoals}</strong>{' '}
                {isFr ? 'buts' : 'goals'} ({formatAmount(stats.soccerAmount)})
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-purple-500/25 font-semibold">
                🏒 Hockey (23–24 Nov): <strong className="text-white">{stats.hockeyGoals}</strong>{' '}
                {isFr ? 'buts' : 'goals'} ({formatAmount(stats.hockeyAmount)})
              </span>
            </div>
          </div>
        </div>

        {/* Right: Counter Display */}
        <div className="flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-purple-500/20 shrink-0">
          <div className="text-left lg:text-right">
            <div className="text-[10px] font-black uppercase tracking-widest text-purple-300">
              {isFr
                ? `${stats.totalGoals} ${stats.totalGoals === 1 ? 'but' : 'buts'} × 20 $`
                : `${stats.totalGoals} ${stats.totalGoals === 1 ? 'goal' : 'goals'} × $20`}
            </div>
            <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white leading-none mt-0.5">
              {formatAmount(stats.totalAmount)}
            </div>
            <div className="text-[10px] font-semibold text-gray-400 mt-0.5">
              {isFr ? 'Amassés pour la cause' : 'Raised for the cause'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

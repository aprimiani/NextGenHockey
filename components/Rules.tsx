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
              <h2 className="text-2xl font-bold text-white">Next Gen Hockey Rulebook</h2>
              <button 
                onClick={() => setShowRulebook(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6 text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <section>
                    <h3 className="text-xl font-bold text-white mb-2">1. League Overview</h3>
                    <p>Next Gen Hockey is a recreational 5-on-5 hockey league designed to provide a competitive, safe, and enjoyable environment for players of all skill levels. All participants are expected to demonstrate sportsmanship, respect, and fair play at all times.</p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">2. League Governance</h3>
                    <h4 className="font-bold text-ng-light-blue mb-1">2.1 League Officials</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>The league is managed by the League Director and Game Operations Team.</li>
                        <li>Referees have full authority over gameplay, penalties, discipline decisions, and maintaining the safety of all players and staff.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">2.2 Communication</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>All schedules, league updates, and announcements will be posted on the official league website and/or sent by email.</li>
                        <li>Players are responsible for checking updates regularly.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">3. Player Eligibility & Registration</h3>
                    <h4 className="font-bold text-ng-light-blue mb-1">3.1 Eligibility</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Participants must be 18 years of age or older.</li>
                    </ul>
                     <h4 className="font-bold text-ng-light-blue mb-1">3.2 Waivers</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>All players must sign the official Player Waiver & Liability Release at the start of the season to participate.</li>
                        <li>The team captain is responsible for ensuring all players have signed their waivers before the first game.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">4. Equipment & Safety</h3>
                     <h4 className="font-bold text-ng-light-blue mb-1">4.1 Equipment Guidelines</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Players may choose their equipment freely but must wear typical game equipment.</li>
                        <li>No harmful equipment is permitted.</li>
                        <li>Players are strongly encouraged to wear:
                            <ul className="list-disc pl-5 mt-1">
                                <li>Full cages</li>
                                <li>Neck guards</li>
                            </ul>
                        </li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">4.2 Safety Expectations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>The league is not responsible for injuries, lost equipment, or any damages that occur during gameplay or while in the arena.</li>
                        <li>Dangerous or reckless behaviour is not tolerated.</li>
                        <li>Referees and the league reserve the right to remove any player whose actions compromise the safety or integrity of the game.</li>
                         <li>If damages occur to the arena, the league may require the responsible player(s) to cover the costs.</li>
                    </ul>
                </section>

                 <section>
                    <h3 className="text-xl font-bold text-white mb-2">5. Ice Time & Game Format</h3>
                     <h4 className="font-bold text-ng-light-blue mb-1">5.0 Ice Rental Limitations</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>The league only rents the ice for the scheduled 1-hour game slot.</li>
                        <li>Due to limited rental time, games must run on schedule and cannot pause for delays, disputes, or extended stoppages.</li>
                        <li>Referees and staff will ensure games proceed efficiently to stay within allotted ice time.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">5.1 Warmup</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>A 3-minute warmup begins at the scheduled start time.</li>
                        <li>A buzzer sounds at the 1-minute mark to collect all pucks.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">5.2 Period Structure</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Games consist of three (3) 15-minute periods, all running time.</li>
                        <li>The clock does not stop unless the referee determines otherwise for safety reasons.</li>
                    </ul>
                     <h4 className="font-bold text-ng-light-blue mb-1">5.3 Tie Games</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Regular-season games ending in a tie are recorded as a draw.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">6. Game Play Rules</h3>
                     <h4 className="font-bold text-ng-light-blue mb-1">6.1 Format</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>All games are played 5-on-5 with goalies.</li>
                        <li>Standard penalties, icings, and offsides are in effect.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">7. Penalties & Discipline</h3>
                    <h4 className="font-bold text-ng-light-blue mb-1">7.1 Minor Penalties</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Minor infractions result in a 2-minute stop-time penalty.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">7.2 Major Penalties</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Major penalties may be issued for dangerous or reckless actions.</li>
                        <li>Major penalties may also lead to game ejection.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">7.3 Misconduct</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Abusive or disrespectful behaviour toward officials, players, or staff may result in a misconduct penalty or immediate removal.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">7.4 Fighting</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Fighting results in automatic ejection and potential suspension.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">7.5 Authority of Referee</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>The referee has full authority to make decisions in the interest of player and staff safety.</li>
                        <li>The referee may remove any player at their discretion if behaviour becomes unsafe, aggressive, or harmful to the flow of the game.</li>
                    </ul>
                    <h4 className="font-bold text-ng-light-blue mb-1">7.6 League Implementation</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>The league reserves the right to review plays and impose additional disciplinary actions as necessary.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">8. Sportsmanship Policy</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>The league enforces a strict zero-tolerance policy for harassment, discrimination, violence, or intimidation.</li>
                        <li>Respect for teammates, opponents, staff, and officials is mandatory.</li>
                        <li>Violations may result in suspension or removal.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">9. League Operations</h3>
                     <h4 className="font-bold text-ng-light-blue mb-1">9.1 Schedule</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Game schedules are posted before the season begins.</li>
                        <li>Rescheduling is not guaranteed due to limited ice availability.</li>
                    </ul>
                     <h4 className="font-bold text-ng-light-blue mb-1">9.2 Attendance & Forfeits</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Teams must be ready to begin the game at the scheduled time.</li>
                        <li>A team unable to field enough players within 5 minutes of start time forfeits the game.</li>
                         <li>A $300 fee will be charged to any team that cannot play without providing at least one week’s notice.</li>
                    </ul>
                     <h4 className="font-bold text-ng-light-blue mb-1">9.3 Standings</h4>
                    <p className="mb-1">Teams earn:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>2 points for a win</li>
                        <li>1 point for a draw</li>
                        <li>0 points for a loss</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">10. Playoffs (If Applicable)</h3>
                     <h4 className="font-bold text-ng-light-blue mb-1">10.1 Qualification</h4>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                        <li>Playoff format depends on the number of teams and season structure.</li>
                    </ul>
                     <h4 className="font-bold text-ng-light-blue mb-1">10.2 Overtime</h4>
                    <p className="mb-2">If a playoff game ends tied:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>5-minute sudden-death overtime (running time)</li>
                        <li>If still tied → 3-player shootout</li>
                         <li>If still tied → sudden-death shootout</li>
                    </ol>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">11. Refund & Cancellation Policy</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>No refunds are provided once the season begins unless the league cancels multiple games with no rescheduling.</li>
                        <li>Arena-related cancellations (equipment failure, weather, etc.) are handled by rink policy, not the league.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">12. Payments & Registration</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>All teams must complete the Next Gen Hockey Registration & Payment Agreement before the first game.</li>
                        <li>Registration fees, early payment discounts, installment plans, and deadlines are outlined in the agreement.</li>
                        <li>Teams failing to pay on time may be removed from the league without refund.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">13. Code of Conduct</h3>
                    <p className="mb-2">All players must:</p>
                    <ul className="list-disc pl-5 space-y-1">
                         <li>Demonstrate respect toward officials, players, and staff</li>
                         <li>Avoid dangerous or reckless play</li>
                         <li>Follow on-ice rules and referee instructions</li>
                         <li>Maintain a positive environment for all participants</li>
                    </ul>
                     <p className="mt-2 font-bold text-red-400">Violation of the Code of Conduct may result in removal from the league without refund.</p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-white mb-2">14. Amendments</h3>
                    <p>The league reserves the right to modify rules and policies at any time to improve fairness, safety, and league operations. All changes will be communicated to participants.</p>
                </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rules;
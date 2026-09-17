import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Hockey Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import Registration from './components/Registration';
import Rules from './components/Rules';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Manager from './components/Manager';

// Sports Parent Components
import { SportsNavbar } from './components/sports/SportsNavbar';
import { SportsHome } from './components/sports/SportsHome';
import { SportsAbout } from './components/sports/SportsAbout';
import { SportsPartners } from './components/sports/SportsPartners';
import { SportsFooter } from './components/sports/SportsFooter';

// Soccer Components
import { SoccerNavbar } from './components/soccer/SoccerNavbar';
import { SoccerHome } from './components/soccer/SoccerHome';
import { SoccerStats } from './components/soccer/SoccerStats';
import { SoccerSchedule } from './components/soccer/SoccerSchedule';
import { SoccerRules } from './components/soccer/SoccerRules';
import { SoccerFooter } from './components/soccer/SoccerFooter';

import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';
import { LeagueDataProvider } from './contexts/LeagueDataContext';

// Layout Controller based on current route
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Check if current route is part of NextGen Soccer
  const isSoccer = path.startsWith('/soccer');

  // Check if current route is part of NextGen Sports parent portal or central forms
  const isSportsParent = path === '/' || path === '/about' || path === '/partners' || path === '/contact' || path === '/register';

  // Otherwise, it's Hockey (/hockey/* or legacy routes like /standings, /schedule, etc.)
  const isHockey = !isSoccer && !isSportsParent;

  if (isSoccer) {
    return (
      <div className="min-h-screen bg-[#070b08] flex flex-col font-sans">
        <SoccerNavbar />
        <main className="flex-grow">{children}</main>
        <SoccerFooter />
      </div>
    );
  }

  if (isSportsParent) {
    return (
      <div className="min-h-screen bg-[#07080b] flex flex-col font-sans">
        <SportsNavbar />
        <main className="flex-grow">{children}</main>
        <SportsFooter />
      </div>
    );
  }

  // Default: Hockey environment
  return (
    <div className="min-h-screen bg-ng-navy flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <LeagueDataProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <AppLayout>
            <Routes>
              {/* CENTRAL ORGANIZATION ROUTES (NEXTGEN SPORTS) */}
              <Route path="/" element={<SportsHome />} />
              <Route path="/about" element={<SportsAbout />} />
              <Route path="/partners" element={<SportsPartners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Registration />} />

              {/* NEXTGEN HOCKEY (Primary & Legacy Routes) */}
              <Route path="/hockey" element={<Hero />} />
              <Route path="/hockey/standings" element={<Standings />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/hockey/schedule" element={<Schedule />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/hockey/rules" element={<Rules />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/hockey/sponsors" element={<Sponsors />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/hockey/manager" element={<Manager />} />
              <Route path="/manager" element={<Manager />} />

              {/* Old Hockey Form Route Redirects to Central Pages */}
              <Route path="/hockey/contact" element={<Navigate to="/contact" replace />} />
              <Route path="/hockey/register" element={<Navigate to="/register?sport=hockey" replace />} />

              {/* NEXTGEN SOCCER */}
              <Route path="/soccer" element={<SoccerHome />} />
              <Route path="/soccer/statistiques" element={<SoccerStats />} />
              <Route path="/soccer/calendrier" element={<SoccerSchedule />} />
              <Route path="/soccer/reglements" element={<SoccerRules />} />

              {/* Old Soccer Register Route Redirect to Central Page */}
              <Route path="/soccer/register" element={<Navigate to="/register?sport=soccer" replace />} />
            </Routes>
          </AppLayout>
        </Router>
      </LeagueDataProvider>
    </LanguageProvider>
  );
}

export default App;

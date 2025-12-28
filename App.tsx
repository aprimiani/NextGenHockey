import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import LeagueAssistant from './components/LeagueAssistant';
import Registration from './components/Registration';
import Rules from './components/Rules';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Manager from './components/Manager';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';
import { LeagueDataProvider } from './contexts/LeagueDataContext';

function App() {
  return (
    <LanguageProvider>
      <LeagueDataProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-ng-navy flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/assistant" element={<LeagueAssistant />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/manager" element={<Manager />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LeagueDataProvider>
    </LanguageProvider>
  );
}

export default App;
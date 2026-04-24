import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Quiz from './pages/Quiz';
import Onboard from './pages/Onboard';
import Team from './pages/Team';
import Extension from './pages/Extension';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import AiCoach from './components/AiCoach';
import Bootloader from './components/Bootloader';
import { useState, useEffect } from 'react';
import './index.css';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="scanner-line" />
      <div className="noise-overlay" />
      <div className="ambient-fog" />
      <div className="hex-grid" />
      {!booted && <Bootloader onComplete={() => setBooted(true)} />}
      <div className="grid-bg" />
      <Navbar />
      <main style={{ minHeight: '100vh', opacity: booted ? 1 : 0, transition: 'opacity 1s ease-in' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/extension" element={<Extension />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {booted && <AiCoach />}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { User } from './types';
import { StorageService } from './services/storage';

// Components & Pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VerificationScreen } from './components/VerificationScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { PublicProfile } from './components/PublicProfile';

import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AuthPage } from './pages/AuthPage';

import { DashboardLayout } from './dashboard/DashboardLayout';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [publicUsername, setPublicUsername] = useState<string | null>(null);

  // Hash-based URL Routing Check (e.g. #/alexariver or #/bio/alexariver)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash && !['home', 'features', 'pricing', 'about', 'contact', 'terms', 'privacy', 'dashboard', 'auth'].includes(hash)) {
        const username = hash.startsWith('bio/') ? hash.replace('bio/', '') : hash;
        setPublicUsername(username);
      } else {
        setPublicUsername(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup' | 'forgot') => {
    setAuthMode(mode);
    setCurrentPage('auth');
    setPublicUsername(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setPublicUsername(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPublicProfile = (username: string) => {
    window.location.hash = `/${username}`;
    setPublicUsername(username);
  };

  const handleSignOut = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // 1. PUBLIC PROFILE VIEW
  if (publicUsername) {
    return (
      <PublicProfile
        username={publicUsername}
        onNavigateHome={() => {
          window.location.hash = '';
          setPublicUsername(null);
          setCurrentPage('home');
        }}
      />
    );
  }

  // 2. EMAIL VERIFICATION GATE (Section 7)
  if (currentUser && !currentUser.emailVerified && currentPage === 'dashboard') {
    return (
      <VerificationScreen
        user={currentUser}
        onVerified={(updated) => setCurrentUser(updated)}
        onSignOut={handleSignOut}
      />
    );
  }

  // 3. ONBOARDING MODAL GATE (Section 8)
  const needsOnboarding = currentUser && currentUser.emailVerified && !currentUser.username;

  // 4. CREATOR DASHBOARD VIEW (Section 9)
  if (currentUser && currentUser.emailVerified && currentPage === 'dashboard') {
    return (
      <>
        {needsOnboarding && (
          <OnboardingModal
            user={currentUser}
            onComplete={(updated) => setCurrentUser(updated)}
          />
        )}
        <DashboardLayout
          user={currentUser}
          onNavigateHome={() => handleNavigate('home')}
          onOpenPublicProfile={handleOpenPublicProfile}
          onSignOut={handleSignOut}
          onUpdateUser={(updated) => setCurrentUser(updated)}
        />
      </>
    );
  }

  // 5. AUTHENTICATION PAGES
  if (currentPage === 'auth') {
    return (
      <AuthPage
        initialMode={authMode}
        onSuccess={(user) => {
          setCurrentUser(user);
          setCurrentPage('dashboard');
        }}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

  // 6. PUBLIC MARKETING WEBSITE
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar
        user={currentUser}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <LandingPage onNavigate={handleNavigate} onOpenAuth={handleOpenAuth} />
        )}
        {currentPage === 'features' && (
          <FeaturesPage onOpenAuth={handleOpenAuth} />
        )}
        {currentPage === 'pricing' && (
          <PricingPage onOpenAuth={handleOpenAuth} />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

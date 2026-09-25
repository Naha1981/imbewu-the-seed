/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { UserProfile, LanguageCode, PlanTier } from './types';
import { Header } from './components/common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { MiniDemo } from './components/landing/MiniDemo';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import { ActivationPage } from './components/activation/ActivationPage';
import { AuthModal } from './components/auth/AuthModal';
import { PaywallModal } from './components/paywall/PaywallModal';
import { OfflineIndicator } from './components/common/OfflineIndicator';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState<'PARENT' | 'TEACHER'>('PARENT');
  const [isSuperAdminAuthOpen, setIsSuperAdminAuthOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<'pdf_download' | 'weekly_pack' | 'multi_child' | 'classroom_pack' | 'story_library' | 'screen_free_printables' | null>(null);

  // Deep linking state for WhatsApp printable activity kits
  const [deepLinkPrintableChild, setDeepLinkPrintableChild] = useState<string | undefined>(undefined);
  const [deepLinkKitType, setDeepLinkKitType] = useState<any>(undefined);

  // Activation token from URL (e.g. /activate/tok-soweto-8821 or #activate-tok-soweto-8821)
  const [activationToken, setActivationToken] = useState<string | null>(null);

  useEffect(() => {
    // Check path for /activate/:token or /admin or printable deep link
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;

    if (hash.includes('printable') || path.startsWith('/printable') || search.includes('kit=') || hash.includes('kit=') || search.includes('mode=printable')) {
      const queryString = search || (hash.includes('?') ? hash.substring(hash.indexOf('?')) : '');
      const params = new URLSearchParams(queryString);
      const childParam = params.get('child');
      const kitParam = params.get('kit');
      if (childParam) setDeepLinkPrintableChild(decodeURIComponent(childParam));
      if (kitParam) setDeepLinkKitType(kitParam);
      setCurrentView('parent');
      return;
    }

    if (path.startsWith('/activate/')) {
      const tok = path.replace('/activate/', '').trim();
      if (tok) {
        setActivationToken(tok);
        setCurrentView('activate');
      }
    } else if (hash.startsWith('#activate-')) {
      const tok = hash.replace('#activate-', '').trim();
      if (tok) {
        setActivationToken(tok);
        setCurrentView('activate');
      }
    } else if (path === '/admin' || hash === '#admin') {
      if (currentUser?.role === 'SUPER_ADMIN') {
        setCurrentView('admin');
      } else {
        setIsSuperAdminAuthOpen(true);
      }
    }
  }, [currentUser]);

  const handleOpenAuth = (role: string = 'PARENT') => {
    setAuthInitialRole(role as any);
    setIsAuthOpen(true);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleSimulateUpgrade = (newPlan: PlanTier) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, currentPlan: newPlan });
    } else {
      setCurrentUser({
        id: 'usr_sub_1',
        email: 'parent@imbewu.co.za',
        displayName: 'Subscribed Grower',
        role: 'PARENT',
        currentPlan: newPlan,
        preferredLanguage: language,
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col selection:bg-[#E07A5F] selection:text-white font-sans">
      
      {/* Global Header (hidden when inside full-screen Super Admin or Activation) */}
      {currentView !== 'admin' && currentView !== 'activate' && (
        <Header
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'admin' && currentUser?.role !== 'SUPER_ADMIN') {
              setIsSuperAdminAuthOpen(true);
            } else {
              setCurrentView(view);
            }
          }}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onOpenAuth={handleOpenAuth}
          onOpenSuperAdminModal={() => setIsSuperAdminAuthOpen(true)}
          language={language}
          onLanguageChange={setLanguage}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            language={language}
            onStartParent={() => {
              if (currentUser) setCurrentView('parent');
              else handleOpenAuth('PARENT');
            }}
            onStartTeacher={() => {
              if (currentUser) setCurrentView('teacher');
              else handleOpenAuth('TEACHER');
            }}
            onSelectPlan={(plan) => setPaywallFeature('weekly_pack')}
          />
        )}

        {currentView === 'mini_demo' && (
          <div className="py-8">
            <MiniDemo
              language={language}
              onSignUp={() => handleOpenAuth('PARENT')}
            />
          </div>
        )}

        {currentView === 'parent' && (
          <ParentDashboard
            language={language}
            userPlan={currentUser?.currentPlan || 'FREE'}
            onOpenPaywall={(feat) => setPaywallFeature(feat)}
            initialTab={deepLinkPrintableChild || deepLinkKitType ? 'worksheet' : undefined}
            initialChildName={deepLinkPrintableChild}
            initialKitType={deepLinkKitType}
          />
        )}

        {currentView === 'teacher' && (
          <TeacherDashboard
            language={language}
            userPlan={currentUser?.currentPlan || 'ECD'}
            onOpenPaywall={(feat) => setPaywallFeature(feat)}
          />
        )}

        {currentView === 'admin' && (
          <SuperAdminDashboard
            adminEmail={currentUser?.email || 'naha.thabiso@gmail.com'}
            onExit={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'activate' && activationToken && (
          <ActivationPage
            token={activationToken}
            onActivationSuccess={(centre) => {
              alert(`Congratulations! ${centre} is activated. Welcome to your teacher workspace.`);
              setCurrentView('teacher');
            }}
            onCancel={() => setCurrentView('landing')}
          />
        )}
      </main>

      {/* Standard User Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authInitialRole}
        language={language}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'TEACHER' || user.role === 'ECD_MANAGER') {
            setCurrentView('teacher');
          } else {
            setCurrentView('parent');
          }
        }}
      />

      {/* Secret Super Admin Auth Modal (Triggered by double-clicking Imbewu logo or /admin) */}
      <AuthModal
        isOpen={isSuperAdminAuthOpen}
        onClose={() => setIsSuperAdminAuthOpen(false)}
        isSuperAdminMode={true}
        language={language}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentView('admin');
        }}
      />

      {/* Paywall Modal (Enforces "FREE MUST NOT REPLACE PAID" with value proposal) */}
      <PaywallModal
        isOpen={paywallFeature !== null}
        onClose={() => setPaywallFeature(null)}
        feature={paywallFeature || 'pdf_download'}
        userEmail={currentUser?.email}
        userName={currentUser?.displayName}
        onSimulateUpgrade={handleSimulateUpgrade}
      />

      {/* Connectivity Banner for low-data / load-shedding South African contexts */}
      <OfflineIndicator />

    </div>
  );
}

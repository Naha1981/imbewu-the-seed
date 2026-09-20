import React, { useRef } from 'react';
import { Sparkles, Globe, User, Shield, LogOut, CheckCircle2, School, Heart } from 'lucide-react';
import type { UserProfile, LanguageCode } from '../../types';
import logoImg from '../../assets/images/imbewu_brand_logo_1789894767533.jpg';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: UserProfile | null;
  onSignOut: () => void;
  onOpenAuth: (role?: string) => void;
  onOpenSuperAdminModal: () => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onSignOut,
  onOpenAuth,
  onOpenSuperAdminModal,
  language,
  onLanguageChange
}) => {
  const lastClickRef = useRef<number>(0);

  // Hidden operator trigger: double-click the Imbewu logo opens Super Admin modal
  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current < 500) {
      lastClickRef.current = 0;
      onOpenSuperAdminModal();
    } else {
      lastClickRef.current = now;
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADFCF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Mark with Secret Double Click */}
        <div 
          onClick={handleLogoClick}
          onDoubleClick={onOpenSuperAdminModal}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
          title="Imbewu — The Seed | Powered by NahaLabs"
        >
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-[#E07A5F]/30 group-hover:scale-105 transition-transform duration-300">
            <img 
              src={logoImg} 
              alt="Imbewu Brand Mark" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#14213D]">
                IMBEWU
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F]">
                The Seed
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] font-medium tracking-tight">
              Powered by <span className="font-semibold text-[#14213D]">NahaLabs (PTY) Ltd</span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#F4EDE2] p-1.5 rounded-full border border-[#EADFCF]">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentView === 'landing' 
                ? 'bg-[#14213D] text-white shadow-sm' 
                : 'text-[#4B5563] hover:text-[#14213D]'
            }`}
          >
            {language === 'zu' ? 'Ikhaya' : 'Home'}
          </button>
          
          <button
            onClick={() => onNavigate('parent')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentView === 'parent' 
                ? 'bg-[#E07A5F] text-white shadow-sm' 
                : 'text-[#4B5563] hover:text-[#14213D]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            {language === 'zu' ? 'Abazali' : 'For Parents'}
          </button>

          <button
            onClick={() => onNavigate('teacher')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentView === 'teacher' 
                ? 'bg-[#2A9D8F] text-white shadow-sm' 
                : 'text-[#4B5563] hover:text-[#14213D]'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            {language === 'zu' ? 'Othisha base-ECD' : 'For ECD Teachers'}
          </button>

          <button
            onClick={() => onNavigate('mini_demo')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentView === 'mini_demo'
                ? 'bg-[#F4A261] text-[#14213D]'
                : 'text-[#8A6A3E] hover:bg-[#EADFCF]'
            }`}
          >
            🌱 {language === 'zu' ? 'Zama Idemo' : 'Try Mini Demo'}
          </button>

          {currentUser?.role === 'SUPER_ADMIN' && (
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#14213D] text-amber-300 transition-all ${
                currentView === 'admin' ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Control Tower
            </button>
          )}
        </nav>

        {/* Right action group: Language toggle, PWA Install & User profile / Login */}
        <div className="flex items-center gap-3">
          {/* In-app PWA Install Button */}
          <PWAInstallButton />

          {/* Bilingual Toggle */}
          <div className="flex items-center bg-[#F4EDE2] border border-[#EADFCF] rounded-lg p-1 text-xs font-medium">
            <Globe className="w-3.5 h-3.5 text-[#6B7280] ml-1.5 mr-1" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === 'en' ? 'bg-white font-bold text-[#14213D] shadow-xs' : 'text-[#6B7280]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('zu')}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === 'zu' ? 'bg-[#E07A5F] font-bold text-white shadow-xs' : 'text-[#6B7280]'
              }`}
            >
              isiZulu
            </button>
          </div>

          {/* User Account state */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-[#14213D] leading-tight">
                  {currentUser.displayName || currentUser.email.split('@')[0]}
                </p>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2A9D8F]">
                  {currentUser.currentPlan} Plan
                </span>
              </div>
              <button
                onClick={onSignOut}
                title="Sign out"
                className="p-2 rounded-xl text-[#6B7280] hover:text-[#E07A5F] hover:bg-[#F4EDE2] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('PARENT')}
                className="hidden sm:inline-flex text-xs font-semibold text-[#14213D] hover:text-[#E07A5F] px-3 py-2"
              >
                {language === 'zu' ? 'Ngena' : 'Log in'}
              </button>
              <button
                onClick={() => onOpenAuth('PARENT')}
                className="inline-flex items-center gap-1.5 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'zu' ? 'Qala Mahhala' : 'Start Free'}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

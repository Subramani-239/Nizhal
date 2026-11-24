import React from 'react';
import { Shield, Globe, Lock, Volume2, VolumeX, Building2, Radio, Smartphone, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../i18n/translations';
import { VoiceAssistant } from '../utils/speechHelper';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isDecoyMode: boolean;
  onOpenPinModal: () => void;
  onToggleAuthorityDashboard: () => void;
  isAuthorityView: boolean;
  onNavigateHome: () => void;
  isMeshActive: boolean;
  isSpeaking: boolean;
  setIsSpeaking: (val: boolean) => void;
  phoneFrameMode: boolean;
  setPhoneFrameMode: (val: boolean) => void;
  onOpenLogoModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  isDecoyMode,
  onOpenPinModal,
  onToggleAuthorityDashboard,
  isAuthorityView,
  onNavigateHome,
  isMeshActive,
  isSpeaking,
  setIsSpeaking,
  phoneFrameMode,
  setPhoneFrameMode,
  onOpenLogoModal,
}) => {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[currentLanguage];

  const handleToggleVoice = () => {
    if (isSpeaking) {
      VoiceAssistant.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      VoiceAssistant.speak(`${t.appName}. ${t.tagline}. ${t.emergencyHeader}`, currentLanguage, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-6 py-2.5 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={onNavigateHome}>
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-600 flex items-center justify-center shadow-md shadow-rose-900/30">
            <Shield className="w-5 h-5 text-white" />
            {isMeshActive && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-amber-200 via-rose-200 to-indigo-200 bg-clip-text text-transparent">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden xs:inline-block">
                Surakshit Bharat
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block truncate max-w-[280px]">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Center / Mesh indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60 text-xs">
          <Radio className={`w-3.5 h-3.5 ${isMeshActive ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
          <span className="text-slate-300 font-medium">Nearby Mesh: 5 Hops Online</span>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Decoy PIN indicator / trigger */}
          <button
            onClick={onOpenPinModal}
            title={isDecoyMode ? 'Decoy Mode Active (Tap to enter real PIN)' : 'Duraspin Fake PIN Shield'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isDecoyMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            {isDecoyMode ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">{isDecoyMode ? 'Decoy Mode' : 'PIN Shield'}</span>
          </button>

          {/* Voice Assistant Toggle */}
          <button
            onClick={handleToggleVoice}
            aria-label={isSpeaking ? t.stopVoice : t.readAloud}
            title={isSpeaking ? 'Stop voice reading' : 'Read aloud in current language'}
            className={`p-2 rounded-lg border transition ${
              isSpeaking
                ? 'bg-rose-500/30 text-rose-300 border-rose-500 animate-bounce'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{LANGUAGE_OPTIONS.find((l) => l.code === currentLanguage)?.native}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  {t.selectLanguage}
                </div>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      onLanguageChange(opt.code);
                      setLangMenuOpen(false);
                      VoiceAssistant.speak(`${opt.native} தேர்ந்தெடுக்கப்பட்டது`, opt.code);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-lg transition ${
                      currentLanguage === opt.code
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.native}</span>
                    <span className="text-[10px] opacity-70">({opt.label})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toggle Phone Frame Bezel / Full Screen View */}
          <button
            onClick={() => setPhoneFrameMode(!phoneFrameMode)}
            title={phoneFrameMode ? 'Switch to Fullscreen Canvas' : 'Switch to Mobile Phone Device Frame'}
            className="hidden md:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">{phoneFrameMode ? 'Mobile View' : 'Full View'}</span>
          </button>

          {/* Logo & Emblem Visualizer */}
          {onOpenLogoModal && (
            <button
              onClick={onOpenLogoModal}
              title="Brand Logo & Emblem Animator"
              className="hidden lg:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-1.5 rounded-lg border border-slate-700 text-xs text-amber-300"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px]">Emblem</span>
            </button>
          )}

          {/* Authority Portal Toggle */}
          <button
            onClick={onToggleAuthorityDashboard}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isAuthorityView
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border-indigo-700/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAuthorityView ? 'App View' : 'Authority Portal'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

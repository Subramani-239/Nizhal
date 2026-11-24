import React from 'react';
import { Shield, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../i18n/translations';
import { VoiceAssistant } from '../utils/speechHelper';

interface SplashViewProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({
  currentLanguage,
  onLanguageChange,
  onStart,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-6 text-center text-white max-w-lg mx-auto">
      {/* Top Hackathon & Nation Branding */}
      <div className="pt-4 flex flex-col items-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surakshit Bharat Hackathon 2026</span>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Tamil Nadu • Kerala • Karnataka • Andhra Pradesh • Telangana
        </p>
      </div>

      {/* Main Animated Emblem */}
      <div className="my-auto py-6 flex flex-col items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-900 border-2 border-slate-700/80 flex flex-col items-center justify-center shadow-2xl p-4">
            <Shield className="w-16 h-16 text-rose-500 stroke-[1.8] animate-bounce" />
            <div className="text-[10px] font-black tracking-widest text-amber-400 uppercase mt-1">
              SURAKSHA
            </div>
          </div>
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          {t.appName}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-sm font-medium leading-relaxed">
          {t.tagline}
        </p>

        {/* Listen button for elderly / illiterate accessibility */}
        <button
          onClick={() => {
            VoiceAssistant.speak(
              `${t.appName}. ${t.tagline}. உங்கள் பொதுப் பாதுகாப்பு மற்றும் அவசர உதவி செயலி. தொடர கீழே உள்ள பொத்தானை அழுத்தவும்.`,
              currentLanguage
            );
          }}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-xs text-amber-300 border border-amber-500/20"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>{t.listenToVoice}</span>
        </button>
      </div>

      {/* Multi-language selector grid */}
      <div className="w-full space-y-4 pb-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            {t.selectLanguage}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  onLanguageChange(opt.code);
                  VoiceAssistant.speak(`${opt.native} மொழி தேர்ந்தெடுக்கப்பட்டது`, opt.code);
                }}
                className={`py-2 px-1.5 rounded-xl border text-center transition ${
                  currentLanguage === opt.code
                    ? 'bg-rose-600 border-rose-500 text-white font-bold shadow-lg shadow-rose-900/40 ring-2 ring-rose-400/30'
                    : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                }`}
              >
                <div className="text-xs sm:text-sm font-semibold truncate">{opt.native}</div>
                <div className="text-[10px] opacity-75">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Enter App Button */}
        <button
          onClick={onStart}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-900/30 transition transform active:scale-98"
        >
          <span>Get Started • தொடங்கவும்</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

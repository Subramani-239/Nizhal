import React, { useState } from 'react';
import {
  ShieldAlert,
  Mic,
  MessageSquare,
  ShieldCheck,
  Landmark,
  Radio,
  FileWarning,
  Eye,
  HandMetal,
  Camera,
  PhoneCall,
  Volume2,
  Lock,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { VoiceAssistant } from '../utils/speechHelper';

interface HomeViewProps {
  currentLanguage: Language;
  onSelectFeature: (featureId: string) => void;
  isMeshActive: boolean;
  onTriggerSos: () => void;
  isAudioSosActive: boolean;
  onToggleAudioSos: () => void;
  isDecoyMode: boolean;
  onOpenPinModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLanguage,
  onSelectFeature,
  isMeshActive,
  onTriggerSos,
  isAudioSosActive,
  onToggleAudioSos,
  isDecoyMode,
  onOpenPinModal,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [sosConfirming, setSosConfirming] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);

  const startSosCountdown = () => {
    VoiceAssistant.playSiren();
    setSosConfirming(true);
    setSosCountdown(5);

    VoiceAssistant.speak('Emergency SOS initiated. Sending GPS to police and family in 5 seconds.', currentLanguage);

    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSosConfirming(false);
          onTriggerSos();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSosCountdown = () => {
    setSosConfirming(false);
    VoiceAssistant.stop();
  };

  const featureCards = [
    {
      id: 'whatsapp_verifier',
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: t.featWhatsAppVerifier,
      desc: t.featWhatsAppDesc,
      tag: 'Fact-Check AI',
      color: 'from-emerald-900/40 via-emerald-800/20 to-slate-900',
      border: 'border-emerald-700/40 hover:border-emerald-500',
    },
    {
      id: 'ai_guard',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: t.featAiGuard,
      desc: t.featAiGuardDesc,
      tag: 'Scam Audio Deterrent',
      color: 'from-indigo-900/40 via-indigo-800/20 to-slate-900',
      border: 'border-indigo-700/40 hover:border-indigo-500',
    },
    {
      id: 'schemes_hub',
      icon: <Landmark className="w-6 h-6 text-amber-400" />,
      title: t.featSchemes,
      desc: t.featSchemesDesc,
      tag: '5 South States + Central',
      color: 'from-amber-900/40 via-amber-800/20 to-slate-900',
      border: 'border-amber-700/40 hover:border-amber-500',
    },
    {
      id: 'sos_live',
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      title: t.featSos,
      desc: t.featSosDesc,
      tag: 'Live GPS & SMS Alert',
      color: 'from-rose-900/40 via-rose-800/20 to-slate-900',
      border: 'border-rose-700/40 hover:border-rose-500',
    },
    {
      id: 'mesh_network',
      icon: <Radio className="w-6 h-6 text-cyan-400" />,
      title: t.featMeshNet,
      desc: t.featMeshNetDesc,
      tag: 'Zero Internet Needed',
      color: 'from-cyan-900/40 via-cyan-800/20 to-slate-900',
      border: 'border-cyan-700/40 hover:border-cyan-500',
    },
    {
      id: 'sign_bridge',
      icon: <HandMetal className="w-6 h-6 text-purple-400" />,
      title: t.featSignLanguage,
      desc: t.featSignLanguageDesc,
      tag: 'ISL Camera Translator',
      color: 'from-purple-900/40 via-purple-800/20 to-slate-900',
      border: 'border-purple-700/40 hover:border-purple-500',
    },
    {
      id: 'decoy_pin',
      icon: <Lock className="w-6 h-6 text-yellow-400" />,
      title: t.featDecoyPin,
      desc: t.featDecoyPinDesc,
      tag: 'Duraspin Coercion Shield',
      color: 'from-yellow-900/40 via-yellow-800/20 to-slate-900',
      border: 'border-yellow-700/40 hover:border-yellow-500',
    },
    {
      id: 'community_bulletin',
      icon: <FileWarning className="w-6 h-6 text-sky-400" />,
      title: t.featBulletin,
      desc: t.featBulletinDesc,
      tag: 'Panchayat & Ward Alerts',
      color: 'from-sky-900/40 via-sky-800/20 to-slate-900',
      border: 'border-sky-700/40 hover:border-sky-500',
    },
    {
      id: 'civic_report',
      icon: <Camera className="w-6 h-6 text-teal-400" />,
      title: t.featCivicReport,
      desc: t.featCivicReportDesc,
      tag: 'Pothole & Drain Complaints',
      color: 'from-teal-900/40 via-teal-800/20 to-slate-900',
      border: 'border-teal-700/40 hover:border-teal-500',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Decoy Banner if Active */}
      {isDecoyMode && (
        <div className="bg-amber-950/80 border border-amber-600/50 p-3 rounded-2xl flex items-center justify-between text-amber-200 text-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t.fakePinAlert} - Sensitive vaults hidden.</span>
          </div>
          <button
            onClick={onOpenPinModal}
            className="px-2.5 py-1 bg-amber-600 text-black font-bold rounded-lg text-[11px]"
          >
            Unlock Real Vault
          </button>
        </div>
      )}

      {/* Hero SOS Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-rose-950/80 via-slate-900 to-slate-950 border border-rose-900/50 p-6 sm:p-8 text-center shadow-2xl">
        <div className="absolute top-3 left-4 flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>GPS Locked: 13.0827° N, 80.2707° E</span>
        </div>

        <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isMeshActive ? 'Mesh Relay On' : 'Cellular Only'}</span>
        </div>

        {/* Big Pulsing SOS Button */}
        <div className="my-4 flex flex-col items-center">
          {sosConfirming ? (
            <div className="flex flex-col items-center animate-in zoom-in-95">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-rose-600 border-4 border-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/60 animate-pulse">
                <span className="text-4xl sm:text-5xl font-black text-white">{sosCountdown}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-100 mt-1">
                  Seconds
                </span>
              </div>
              <p className="text-xs text-rose-300 font-medium mt-3">
                Sending Emergency GPS Broadcast to Police (112) & 4 Family Contacts...
              </p>
              <button
                onClick={cancelSosCountdown}
                className="mt-3 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-rose-500/50 shadow-md"
              >
                {t.audioSosCancel}
              </button>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-3 bg-rose-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 animate-pulse transition duration-500"></div>
              <button
                onClick={startSosCountdown}
                aria-label={t.sosButton}
                className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 hover:from-rose-600 hover:to-red-400 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-900/60 border-4 border-rose-400/40 active:scale-95 transition transform"
              >
                <ShieldAlert className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2] text-white animate-bounce" />
                <span className="font-black text-lg sm:text-xl tracking-wider uppercase mt-1">
                  {t.sosButton}
                </span>
                <span className="text-[10px] font-medium text-rose-100/90 tracking-tight">
                  1-Tap Broadcast
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Audio SOS & Distress Listener Toggle */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onToggleAudioSos}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
              isAudioSosActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md shadow-amber-950/40 animate-pulse'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Mic className={`w-4 h-4 ${isAudioSosActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>{isAudioSosActive ? t.audioSosActive : t.audioSos}</span>
          </button>

          <button
            onClick={() => {
              VoiceAssistant.speak(
                'அவசர உதவி பட்டனை அழுத்தினால் காவல்துறை மற்றும் குடும்பத்தினருக்கு உங்கள் இருப்பிடம் உடனடியாக அனுப்பப்படும்.',
                currentLanguage
              );
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t.listenToVoice}</span>
          </button>
        </div>

        {/* Direct Speed Dials */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs">
          <a
            href="tel:112"
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 flex flex-col items-center text-slate-200"
          >
            <PhoneCall className="w-4 h-4 text-rose-400 mb-0.5" />
            <span className="font-bold">112</span>
            <span className="text-[10px] text-slate-400">Police / SOS</span>
          </a>
          <a
            href="tel:108"
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 flex flex-col items-center text-slate-200"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="font-bold">108</span>
            <span className="text-[10px] text-slate-400">Ambulance</span>
          </a>
          <a
            href="tel:1091"
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 flex flex-col items-center text-slate-200"
          >
            <PhoneCall className="w-4 h-4 text-purple-400 mb-0.5" />
            <span className="font-bold">1091</span>
            <span className="text-[10px] text-slate-400">Women Helpline</span>
          </a>
        </div>
      </div>

      {/* 9 Feature Tiles Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
            Public Safety & Civic Assistance Suite
          </h2>
          <span className="text-xs text-amber-400 font-semibold">9 Shield Modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {featureCards.map((feat) => (
            <div
              key={feat.id}
              onClick={() => onSelectFeature(feat.id)}
              className={`p-4 rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} cursor-pointer transition transform hover:-translate-y-0.5 active:scale-98 shadow-lg shadow-black/30 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 group-hover:scale-110 transition">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-200 transition">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-400">
                <span className="group-hover:text-white transition">Open Tool</span>
                <span className="text-amber-400 font-bold group-hover:translate-x-1 transition">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  FileLock2,
  AlertTriangle,
  FolderLock,
  KeyRound,
} from 'lucide-react';
import { Language } from '../../types';
import {
  authenticatePin,
  DEFAULT_DECOY_PIN,
  DEFAULT_MASTER_PIN,
  DUMMY_DECOY_CHATS,
  DUMMY_DECOY_PHOTOS,
} from '../../utils/pinAuth';
import { TRANSLATIONS } from '../../i18n/translations';

interface DecoyPinShieldViewProps {
  currentLanguage: Language;
  onBack: () => void;
  isDecoyMode: boolean;
  setIsDecoyMode: (val: boolean) => void;
}

export const DecoyPinShieldView: React.FC<DecoyPinShieldViewProps> = ({
  currentLanguage,
  onBack,
  isDecoyMode,
  setIsDecoyMode,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState<'interactive_keypad' | 'decoy_vault' | 'real_vault'>(
    isDecoyMode ? 'decoy_vault' : 'interactive_keypad'
  );
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);

  const handleKeyClick = (digit: string) => {
    if (pinInput.length < 4) {
      setPinInput((prev) => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    const auth = authenticatePin(pinInput);
    if (!auth.isUnlocked) {
      setAuthFeedback('❌ Invalid PIN. Please try default "9999" (Real) or "1111" (Decoy).');
      return;
    }

    if (auth.isDecoyMode) {
      setIsDecoyMode(true);
      setActiveTab('decoy_vault');
      setAuthFeedback('🎭 Decoy Mode Activated! Realistic dummy shell loaded.');
    } else {
      setIsDecoyMode(false);
      setActiveTab('real_vault');
      setAuthFeedback('🔓 Real Safety Vault Unlocked! Private records accessible.');
    }
    setPinInput('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
            isDecoyMode
              ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          {isDecoyMode ? 'Decoy Duraspin Shield Active' : 'Master Security Mode'}
        </span>
      </div>

      {/* Explanatory Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            <FolderLock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featDecoyPin}</h2>
            <p className="text-xs text-slate-400">
              Coercion-resistant dual PIN system to protect citizens when forced to unlock their phones
            </p>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-yellow-700/40">
            <div className="flex items-center gap-1.5 font-bold text-yellow-300 mb-1">
              <Eye className="w-4 h-4" />
              <span>Decoy PIN: 1111 (Coercion)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Opens harmless family chats and photos. Conceals emergency logs, distress calls, and real contacts from stalkers or thieves.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-700/40">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
              <KeyRound className="w-4 h-4" />
              <span>Real Master PIN: 9999 (Private)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Unlocks the authentic safety vault, private emergency contacts, acoustic logs, and encrypted mesh packets.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('interactive_keypad')}
          className={`pb-2.5 px-4 border-b-2 transition ${
            activeTab === 'interactive_keypad'
              ? 'border-yellow-500 text-yellow-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          PIN Keypad Tester
        </button>
        <button
          onClick={() => setActiveTab('decoy_vault')}
          className={`pb-2.5 px-4 border-b-2 transition ${
            activeTab === 'decoy_vault'
              ? 'border-yellow-500 text-yellow-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Decoy Dummy Shell View
        </button>
        <button
          onClick={() => setActiveTab('real_vault')}
          className={`pb-2.5 px-4 border-b-2 transition ${
            activeTab === 'real_vault'
              ? 'border-yellow-500 text-yellow-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Real Sensitive Vault
        </button>
      </div>

      {/* Tab 1: Interactive Keypad */}
      {activeTab === 'interactive_keypad' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl max-w-sm mx-auto text-center">
          <h3 className="text-sm font-bold text-slate-200 mb-1">Enter Security PIN</h3>
          <p className="text-[11px] text-slate-400 mb-4">Try typing 1111 or 9999</p>

          {/* PIN dots */}
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition ${
                  pinInput.length > idx
                    ? 'bg-amber-400 border-amber-400 scale-110'
                    : 'bg-transparent border-slate-600'
                }`}
              ></div>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyClick(digit)}
                className="py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-lg font-bold text-slate-200 border border-slate-800 active:scale-95 transition"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className="py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-slate-800"
            >
              DEL
            </button>
            <button
              onClick={() => handleKeyClick('0')}
              className="py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-lg font-bold text-slate-200 border border-slate-800"
            >
              0
            </button>
            <button
              onClick={handlePinSubmit}
              disabled={pinInput.length !== 4}
              className="py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs border border-amber-400 shadow-md"
            >
              OK
            </button>
          </div>

          {authFeedback && (
            <div className="text-xs font-semibold p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 animate-in fade-in">
              {authFeedback}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Decoy Dummy Shell */}
      {activeTab === 'decoy_vault' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-yellow-950/60 border border-yellow-600/50 p-4 rounded-2xl flex items-center justify-between text-yellow-200 text-xs">
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-yellow-400" />
              <span>Decoy Mode is Active. Only simulated family chats & photos are visible.</span>
            </span>
            <button
              onClick={() => setIsDecoyMode(false)}
              className="px-2 py-1 bg-yellow-600 text-black font-bold rounded-lg text-[10px]"
            >
              Exit Decoy
            </button>
          </div>

          {/* Dummy Chats */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Harmless Recent Conversations
            </h4>
            <div className="divide-y divide-slate-800">
              {DUMMY_DECOY_CHATS.map((c) => (
                <div key={c.id} className="py-3 flex items-center gap-3">
                  <span className="text-2xl">{c.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-slate-200">{c.sender}</strong>
                      <span className="text-[10px] text-slate-500">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dummy Photos */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Harmless Photo Album (Coercion Mask)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DUMMY_DECOY_PHOTOS.map((p) => (
                <div
                  key={p.id}
                  className={`${p.color} h-24 rounded-2xl p-2.5 flex flex-col justify-end text-white shadow-md`}
                >
                  <span className="text-[11px] font-bold leading-tight">{p.title}</span>
                  <span className="text-[9px] opacity-75">{p.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Real Sensitive Vault */}
      {activeTab === 'real_vault' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-emerald-950/60 border border-emerald-600/50 p-4 rounded-2xl flex items-center justify-between text-emerald-200 text-xs">
            <span className="flex items-center gap-2">
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span>Authentic Security Vault Unlocked (Real PIN 9999).</span>
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <FileLock2 className="w-4 h-4 text-emerald-400" />
                <span>Encrypted Safety Journal & Audio Evidences</span>
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Protected with device-level AES-256 encryption. Only accessible via Master PIN.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block">Incident #4492: Suspicious Follower near Metro</strong>
                    <span className="text-slate-400 text-[11px]">Recorded 2026-11-05 • Audio Clip 42s stored</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px]">Vault Sealed</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block">Lawyer & Women Helpline Contact Log</strong>
                    <span className="text-slate-400 text-[11px]">Advocate S. Swaminathan (High Court)</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px]">Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

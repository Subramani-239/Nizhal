import React, { useState } from 'react';
import {
  Settings,
  Shield,
  KeyRound,
  Users,
  Radio,
  BatteryCharging,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { Language } from '../types';
import { DEFAULT_EMERGENCY_CONTACTS } from '../data/mockData';
import { TRANSLATIONS } from '../i18n/translations';
import { VoiceAssistant } from '../utils/speechHelper';

interface SettingsViewProps {
  currentLanguage: Language;
  onBack: () => void;
  isMeshActive: boolean;
  setIsMeshActive: (val: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLanguage,
  onBack,
  isMeshActive,
  setIsMeshActive,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [contacts, setContacts] = useState(DEFAULT_EMERGENCY_CONTACTS);
  const [lowBatteryMode, setLowBatteryMode] = useState(true);
  const [offlineMeshRelay, setOfflineMeshRelay] = useState(isMeshActive);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleMesh = (val: boolean) => {
    setOfflineMeshRelay(val);
    setIsMeshActive(val);
    showToast(`Offline Mesh Relay ${val ? 'Activated' : 'Paused'}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs text-slate-400">Security & Offline Preferences</span>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-bold animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.settings}</h2>
            <p className="text-xs text-slate-400">
              Configure offline mesh relay, emergency recipients, and Duraspin security
            </p>
          </div>
        </div>

        {/* Emergency Contacts Management */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Designated Emergency Contacts</span>
            </h3>
            <span className="text-[11px] text-slate-400">4 Contacts Configured</span>
          </div>

          <div className="space-y-2">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-white block">{c.name}</strong>
                  <span className="text-slate-400 font-mono text-[11px]">{c.phone}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {c.relation}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Radio / Low Power Toggles */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <strong className="text-sm text-white block">Nearby Bluetooth Mesh Relay</strong>
                <p className="text-xs text-slate-400">
                  Allows your device to forward encrypted emergency packets for nearby villagers without internet
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleMesh(!offlineMeshRelay)}
              className={`w-11 h-6 rounded-full transition relative p-0.5 ${
                offlineMeshRelay ? 'bg-cyan-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition transform ${
                  offlineMeshRelay ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <BatteryCharging className="w-5 h-5 text-emerald-400 mt-0.5" />
              <div>
                <strong className="text-sm text-white block">Low Battery & 2G Data Saver</strong>
                <p className="text-xs text-slate-400">
                  Optimizes background workers, minimizes CPU cycles, and enables dark contrast mode for low-end phones
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setLowBatteryMode(!lowBatteryMode);
                showToast(`Low Battery Mode ${!lowBatteryMode ? 'Enabled' : 'Disabled'}`);
              }}
              className={`w-11 h-6 rounded-full transition relative p-0.5 ${
                lowBatteryMode ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition transform ${
                  lowBatteryMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Security / Duraspin Keys info */}
        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>Configured Duraspin PIN Credentials</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Decoy Duress PIN</span>
              <strong className="text-amber-400 font-mono text-base">1111</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">Loads dummy family interface</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Master Vault PIN</span>
              <strong className="text-emerald-400 font-mono text-base">9999</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">Unlocks private sensitive records</span>
            </div>
          </div>
        </div>

        {/* Clear Cache */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => showToast('Local offline cache refreshed successfully.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Purge Temporary Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
};

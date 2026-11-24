import React, { useState } from 'react';
import {
  ShieldCheck,
  Play,
  Square,
  Radio,
  ArrowLeft,
  Volume2,
  AlertOctagon,
  Copy,
  Check,
  Search,
} from 'lucide-react';
import { Language, ScamThreat, VoiceDeterrent } from '../../types';
import { analyzeMessageThreat, PRE_RECORDED_VOICE_DETERRENTS } from '../../utils/scamDetector';
import { VoiceAssistant } from '../../utils/speechHelper';
import { TRANSLATIONS } from '../../i18n/translations';

interface AiGuardViewProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const AiGuardView: React.FC<AiGuardViewProps> = ({ currentLanguage, onBack }) => {
  const t = TRANSLATIONS[currentLanguage];
  const [threatInput, setThreatInput] = useState('');
  const [analyzedThreat, setAnalyzedThreat] = useState<ScamThreat | null>(null);
  const [activeDeterrentId, setActiveDeterrentId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleThreats = [
    {
      title: 'Digital Arrest Skype Call',
      text: 'Mumbai Customs and CBI Officer Sharma: Illegal drugs found in your parcel. Download Skype immediately for interrogation or police will arrive.',
    },
    {
      title: 'Remote APK AnyDesk Trap',
      text: 'Dear customer your SBI YONO account KYC expired. Download sbi-update.apk or install Quicksupport to prevent immediate account block.',
    },
    {
      title: 'Electricity Midnight Power Cut',
      text: 'Urgent notice from TANGEDCO/BESCOM: Power will be disconnected tonight. Call electricity officer at 9840199999 immediately.',
    },
    {
      title: 'Telegram High-Pay Task Scam',
      text: 'Work from home! Like YouTube videos and review hotels on Google to earn ₹3,000 to ₹8,000 daily. Join Telegram group now.',
    },
  ];

  const handleScanThreat = (text = threatInput) => {
    if (!text.trim()) return;
    const result = analyzeMessageThreat(text);
    setAnalyzedThreat(result);
  };

  const handlePlayDeterrent = (deterrent: VoiceDeterrent) => {
    if (activeDeterrentId === deterrent.id) {
      VoiceAssistant.stop();
      setActiveDeterrentId(null);
      return;
    }

    setActiveDeterrentId(deterrent.id);
    VoiceAssistant.playDeterrentTone(deterrent.audioTone);

    const speechText = deterrent.transcript[currentLanguage];
    VoiceAssistant.speak(speechText, currentLanguage, () => {
      setActiveDeterrentId(null);
    });
  };

  const copyTranscript = (deterrent: VoiceDeterrent) => {
    navigator.clipboard.writeText(deterrent.transcript[currentLanguage]);
    setCopiedId(deterrent.id);
    setTimeout(() => setCopiedId(null), 2000);
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
        <span className="text-xs text-indigo-400 font-bold bg-indigo-950/60 border border-indigo-700/40 px-2.5 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          AI Guard Defense Active
        </span>
      </div>

      {/* Intro Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featAiGuard}</h2>
            <p className="text-xs text-slate-400">
              Detect phishing links and scam calls, and play deterrence voices to stop cyber criminals
            </p>
          </div>
        </div>

        {/* Text Input Scanner */}
        <div className="mt-4">
          <textarea
            value={threatInput}
            onChange={(e) => setThreatInput(e.target.value)}
            placeholder="Paste suspicious SMS text, caller transcription, or URL here... (எ.கா: KYC காலாவதி, APK பதிவிறக்கம், பகுதிநேர வேலை)"
            rows={3}
            className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <button
            onClick={() => handleScanThreat()}
            disabled={!threatInput.trim()}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50 disabled:opacity-50 transition active:scale-98"
          >
            <Search className="w-4 h-4" />
            <span>Scan Threat Signature • அச்சுறுத்தலை பகுப்பாய்வு செய்</span>
          </button>
        </div>

        {/* Quick Samples */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Try Sample Phishing Traps:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sampleThreats.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setThreatInput(s.text);
                  handleScanThreat(s.text);
                }}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition text-left"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Scan Result */}
      {analyzedThreat && (
        <div
          className={`p-5 rounded-3xl border shadow-xl animate-in fade-in zoom-in-95 ${
            analyzedThreat.riskLevel === 'HIGH'
              ? 'bg-rose-950/80 border-rose-700 text-rose-100'
              : analyzedThreat.riskLevel === 'MEDIUM'
              ? 'bg-amber-950/80 border-amber-700 text-amber-100'
              : 'bg-emerald-950/80 border-emerald-700 text-emerald-100'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-black/40 border border-white/20">
                Risk Level: {analyzedThreat.riskLevel}
              </span>
              <h3 className="text-base font-bold text-white mt-1">{analyzedThreat.title}</h3>
              <p className="text-xs text-slate-300">{analyzedThreat.pattern}</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm mt-3 leading-relaxed bg-black/30 p-3 rounded-2xl border border-white/10">
            {analyzedThreat.explanation[currentLanguage]}
          </p>
        </div>
      )}

      {/* Pre-Recorded Voice Deterrent Arsenal */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-400" />
              <span>Scammer Voice Deterrent Arsenal (5 Pre-recorded Alerts)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Play these aloud on speaker during a fraudulent call to deter extortionists and preserve evidence
            </p>
          </div>
          <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
            Compliant IT Act
          </span>
        </div>

        <div className="space-y-3">
          {PRE_RECORDED_VOICE_DETERRENTS.map((det) => {
            const isPlaying = activeDeterrentId === det.id;
            return (
              <div
                key={det.id}
                className={`p-4 rounded-2xl border transition ${
                  isPlaying
                    ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/40'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {det.label[currentLanguage]}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyTranscript(det)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1"
                      title="Copy warning text to clipboard"
                    >
                      {copiedId === det.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span className="text-[10px] hidden sm:inline">Copy</span>
                    </button>

                    <button
                      onClick={() => handlePlayDeterrent(det)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition ${
                        isPlaying
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3.5 h-3.5" />
                          <span>Stop Tone</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Play Deterrent</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Animated frequency bar when playing */}
                {isPlaying && (
                  <div className="my-2 flex items-center gap-1 h-3 bg-black/40 px-2 rounded-md">
                    <div className="h-2 w-1 bg-rose-400 animate-ping"></div>
                    <div className="h-3 w-1 bg-amber-400 animate-bounce"></div>
                    <div className="h-2.5 w-1 bg-rose-400 animate-pulse"></div>
                    <div className="h-1.5 w-1 bg-amber-400 animate-bounce"></div>
                    <div className="h-3 w-1 bg-rose-500 animate-ping"></div>
                    <span className="text-[10px] text-rose-300 font-mono ml-2">
                      Broadcasting audio deterrent on speaker...
                    </span>
                  </div>
                )}

                <p className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
                  "{det.transcript[currentLanguage]}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

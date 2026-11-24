import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Share2,
  Volume2,
  VolumeX,
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';
import { FactCheckResult, Language } from '../../types';
import { verifyWhatsAppMessage } from '../../utils/factCheckEngine';
import { VoiceAssistant } from '../../utils/speechHelper';
import { TRANSLATIONS } from '../../i18n/translations';

interface WhatsAppVerifierProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const WhatsAppVerifierView: React.FC<WhatsAppVerifierProps> = ({ currentLanguage, onBack }) => {
  const t = TRANSLATIONS[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleRumors = [
    {
      label: 'Digital Arrest CBI Parcel Scam',
      text: 'Mumbai Crime Branch CBI seized your FedEx courier with passports and contraband. You are placed under digital arrest on Skype.',
    },
    {
      label: 'TANGEDCO Electricity Power Cut Warning',
      text: 'Dear consumer, power will be disconnected tonight at 9:30 PM due to unupdated bill. Call electricity officer now or install quicksupport apk.',
    },
    {
      label: 'Free Diwali 3-Month Recharge',
      text: 'Government & Telecom companies are gifting 3 months free unlimited 5G recharge for Diwali. Click link to activate immediately.',
    },
    {
      label: 'Urgent Rare O-Negative Blood Appeal',
      text: 'Urgent need 4 units O-Negative blood for child in ICU. Contact Dr. Ramesh immediately and forward to all WhatsApp groups.',
    },
    {
      label: 'IMD Red Alert Cyclone Holiday Notice',
      text: 'IMD Chennai issued Red Alert for heavy rains. District Collector declares holiday for all schools and colleges tomorrow.',
    },
  ];

  const handleVerify = (textToVerify = inputText) => {
    if (!textToVerify.trim()) return;
    const res = verifyWhatsAppMessage(textToVerify);
    setResult(res);
  };

  const handleReadAloud = () => {
    if (!result) return;
    if (isSpeaking) {
      VoiceAssistant.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const speechText = `${result.title}. ${result.explanation[currentLanguage]}. அறிவுரை: ${result.safeActionAdvised[currentLanguage]}`;
      VoiceAssistant.speak(speechText, currentLanguage, () => setIsSpeaking(false));
    }
  };

  const handleCopyExplanation = () => {
    if (!result) return;
    const textToShare = `🛡️ [Nizhal Safety Verification - நிழல்]\nVerdict: ${result.verdict}\n\n${result.explanation[currentLanguage]}\n\nSafe Action: ${result.safeActionAdvised[currentLanguage]}`;
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-700/40 px-2.5 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Fact-Check Engine v3.2
        </span>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featWhatsAppVerifier}</h2>
            <p className="text-xs text-slate-400">
              Paste any suspicious WhatsApp forward, link, or voice text to check authenticity
            </p>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="mt-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste forwarded message or web link here... (எ.கா: டிஜிட்டல் அரெஸ்ட், மின் கட்டண பாக்கி, இலவச ரீசார்ஜ்)"
            rows={4}
            className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
          />
        </div>

        {/* Verify Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <button
            onClick={() => handleVerify()}
            disabled={!inputText.trim()}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 disabled:opacity-50 transition active:scale-98"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Authenticity • சரிபார்க்கவும்</span>
          </button>
          {inputText && (
            <button
              onClick={() => {
                setInputText('');
                setResult(null);
                VoiceAssistant.stop();
              }}
              className="px-3 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Sample Rumors Carousel */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Simulate Common South Indian WhatsApp Forwards:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {sampleRumors.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(sample.text);
                  handleVerify(sample.text);
                }}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition text-left"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Result Card */}
      {result && (
        <div
          className={`rounded-3xl border p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 ${
            result.verdict === 'FAKE_SCAM'
              ? 'bg-rose-950/70 border-rose-700 text-rose-100 shadow-rose-950/50'
              : result.verdict === 'AUTHENTIC'
              ? 'bg-emerald-950/70 border-emerald-700 text-emerald-100 shadow-emerald-950/50'
              : 'bg-amber-950/70 border-amber-700 text-amber-100 shadow-amber-950/50'
          }`}
        >
          {/* Verdict Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {result.verdict === 'FAKE_SCAM' && (
                <div className="p-3 rounded-2xl bg-rose-600/30 text-rose-400 border border-rose-500">
                  <XCircle className="w-8 h-8" />
                </div>
              )}
              {result.verdict === 'AUTHENTIC' && (
                <div className="p-3 rounded-2xl bg-emerald-600/30 text-emerald-400 border border-emerald-500">
                  <CheckCircle className="w-8 h-8" />
                </div>
              )}
              {result.verdict === 'UNVERIFIED' && (
                <div className="p-3 rounded-2xl bg-amber-600/30 text-amber-400 border border-amber-500">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              )}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20">
                  Verdict: {result.verdict.replace('_', ' ')}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold mt-1 text-white">
                  {result.title}
                </h3>
              </div>
            </div>

            {/* Confidence Gauge */}
            <div className="text-right">
              <div className="text-xs text-slate-300 font-semibold">Confidence Rating</div>
              <div className="text-lg font-black text-white">
                {Math.round(result.confidence * 100)}%
              </div>
            </div>
          </div>

          {/* Regional Explanation */}
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Explanation in {currentLanguage.toUpperCase()}:
                </span>
                <button
                  onClick={handleReadAloud}
                  className="flex items-center gap-1 text-xs text-amber-300 bg-black/40 px-2.5 py-1 rounded-full border border-amber-500/30"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/10 text-white">
                {result.explanation[currentLanguage]}
              </p>
            </div>

            {/* Safe Action Advice */}
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block mb-1">
                🛡️ Recommended Safety Action:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                {result.safeActionAdvised[currentLanguage]}
              </p>
            </div>

            {/* Verified Source */}
            {result.verifiedSource && (
              <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Authority Source: {result.verifiedSource}</span>
                </span>
                <button
                  onClick={handleCopyExplanation}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 text-slate-200 hover:text-white border border-white/20"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share to WhatsApp'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

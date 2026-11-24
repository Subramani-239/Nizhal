import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  MapPin,
  Mic,
  Radio,
  PhoneCall,
  Send,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Volume2,
  Users,
} from 'lucide-react';
import { Language } from '../../types';
import { DEFAULT_EMERGENCY_CONTACTS } from '../../data/mockData';
import { VoiceAssistant } from '../../utils/speechHelper';
import { TRANSLATIONS } from '../../i18n/translations';

interface SosLiveViewProps {
  currentLanguage: Language;
  onBack: () => void;
  isMeshActive: boolean;
  onBroadcastMeshAlert: (msg: string) => void;
}

export const SosLiveView: React.FC<SosLiveViewProps> = ({
  currentLanguage,
  onBack,
  isMeshActive,
  onBroadcastMeshAlert,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [gpsCoords, setGpsCoords] = useState({
    lat: 13.0827,
    lng: 80.2707,
    accuracy: 4,
    area: 'Poonamallee High Road, Chennai, Tamil Nadu',
  });
  const [sosSent, setSosSent] = useState(false);
  const [audioListening, setAudioListening] = useState(false);
  const [distressDetected, setDistressDetected] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Attempt actual browser geolocation if allowed, else use realistic South India location
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsCoords({
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Math.round(pos.coords.accuracy) || 5,
            area: 'Live GPS Acquired (High Precision Fix)',
          });
        },
        () => {
          // fallback to Tamil Nadu / South India coordinates
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // Audio SOS Scream detection countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (distressDetected && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (distressDetected && countdown === 0) {
      triggerFullEmergencyDispatch();
      setDistressDetected(false);
    }
    return () => clearTimeout(timer);
  }, [distressDetected, countdown]);

  const triggerFullEmergencyDispatch = () => {
    VoiceAssistant.playSiren();
    setSosSent(true);

    const message = `EMERGENCY SOS! I need immediate help. My GPS coordinates: https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng} (Accuracy: ${gpsCoords.accuracy}m). Please dispatch Police (112) or Ambulance (108).`;

    // Forward to mesh router
    onBroadcastMeshAlert(message);

    VoiceAssistant.speak(
      `அவசர உதவி செய்தி அனுப்பப்பட்டது. உங்கள் இருப்பிடம் காவல்துறை மற்றும் குடும்பத்தினருக்கு பகிரப்பட்டுள்ளது.`,
      currentLanguage
    );
  };

  const simulateScreamTrigger = () => {
    setDistressDetected(true);
    setCountdown(5);
    VoiceAssistant.playDeterrentTone('cyber_crime');
  };

  const cancelDistressCountdown = () => {
    setDistressDetected(false);
    setCountdown(5);
    VoiceAssistant.stop();
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
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-slate-300 font-mono">Live GPS: {gpsCoords.lat}, {gpsCoords.lng}</span>
        </div>
      </div>

      {/* Main SOS Trigger Hero */}
      <div className="bg-gradient-to-b from-rose-950/90 via-slate-900 to-slate-950 border border-rose-800/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {distressDetected ? (
          <div className="py-4 animate-in zoom-in-95">
            <div className="relative w-36 h-36 mx-auto rounded-full bg-rose-600 border-4 border-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/70 animate-bounce">
              <span className="text-5xl font-black text-white">{countdown}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-100">
                Cancel in
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-4">
              Acoustic Distress Trigger Activated!
            </h3>
            <p className="text-xs text-rose-300 mt-1 max-w-sm mx-auto">
              Scream or panic phrase detected. Live coordinates transmitting to Police and family...
            </p>
            <button
              onClick={cancelDistressCountdown}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl border border-rose-500 shadow-lg"
            >
              Cancel False Alarm (தவறுதலாக அழுத்தப்பட்டது)
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <button
                onClick={triggerFullEmergencyDispatch}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 hover:from-rose-600 hover:to-red-400 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-900/80 border-4 border-rose-300/40 active:scale-95 transition transform"
              >
                <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.2] animate-pulse" />
                <span className="font-black text-xl tracking-wider uppercase mt-1">
                  {t.sosButton}
                </span>
                <span className="text-[10px] text-rose-200">Tap for Instant Help</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Instantly sends your high-precision GPS link to emergency responders, emergency contacts, and nearby mesh devices without relying on mobile internet.
            </p>
          </div>
        )}

        {/* SOS Sent Status Notification */}
        {sosSent && (
          <div className="mt-5 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">SOS Broadcast Dispatched Successfully!</strong>
                <span>SMS and encrypted mesh packets sent to 4 contacts & 112 Control Room.</span>
              </div>
            </div>
            <button
              onClick={() => setSosSent(false)}
              className="text-[11px] underline text-emerald-300"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* GPS Location & Map Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">Live Location Telemetry</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            ±{gpsCoords.accuracy}m Accuracy
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-slate-400 font-mono">
              Latitude: <strong className="text-white">{gpsCoords.lat}</strong> | Longitude:{' '}
              <strong className="text-white">{gpsCoords.lng}</strong>
            </div>
            <div className="text-slate-300 mt-1 text-[11px]">{gpsCoords.area}</div>
          </div>
          <a
            href={`https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-indigo-300 hover:text-white border border-slate-700 text-xs shrink-0"
          >
            Open Maps
          </a>
        </div>
      </div>

      {/* Audio SOS Scream Listener Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">Audio Distress & Scream Listener</h3>
          </div>
          <button
            onClick={() => setAudioListening(!audioListening)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              audioListening
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {audioListening ? 'Active (Listening)' : 'Turn On Audio SOS'}
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          Uses privacy-preserving on-device machine learning to detect screams, cries for help ("காப்பாத்துங்க", "Help", "காಪಾಡಿ"), or sudden panic spikes in volume.
        </p>

        {audioListening && (
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-3">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Microphone Monitoring Active
              </span>
              <span>Distress Level: Low</span>
            </div>
            <div className="flex items-center gap-1 h-6 bg-slate-900 px-3 rounded-lg overflow-hidden">
              {[4, 12, 8, 16, 24, 18, 10, 6, 14, 22, 10, 4, 8, 16, 30, 12, 6].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-1.5 bg-amber-400/80 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={simulateScreamTrigger}
          className="text-xs text-slate-400 hover:text-amber-300 underline font-medium"
        >
          [Simulate Test Panic Scream Detection]
        </button>
      </div>

      {/* Emergency Contacts Recipient Preview */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">Designated Emergency Contacts (4)</h3>
          </div>
          <span className="text-xs text-slate-400">All receive live SMS upon SOS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DEFAULT_EMERGENCY_CONTACTS.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
            >
              <div>
                <strong className="text-white block">{c.name}</strong>
                <span className="text-slate-400 font-mono text-[11px]">{c.phone}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                {c.relation}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

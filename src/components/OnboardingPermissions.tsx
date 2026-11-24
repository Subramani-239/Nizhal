import React, { useState } from 'react';
import { MapPin, Mic, Camera, Radio, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { VoiceAssistant } from '../utils/speechHelper';

interface OnboardingPermissionsProps {
  currentLanguage: Language;
  onComplete: () => void;
}

export const OnboardingPermissions: React.FC<OnboardingPermissionsProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [permissions, setPermissions] = useState({
    gps: true,
    microphone: true,
    camera: true,
    mesh: true,
  });

  const permissionItems = [
    {
      id: 'gps',
      icon: <MapPin className="w-5 h-5 text-rose-400" />,
      title: 'Emergency GPS Location',
      desc: 'Transmits live coordinates to 112 Police, 108 Ambulance and family upon SOS trigger.',
      regional: 'அவசர காலங்களில் உங்கள் இருப்பிடத்தை போலீசாருக்கும் குடும்பத்தினருக்கும் அனுப்பும்.',
    },
    {
      id: 'microphone',
      icon: <Mic className="w-5 h-5 text-amber-400" />,
      title: 'Acoustic Distress & Scream Detection',
      desc: 'Opt-in on-device microphone listening for panic screams and emergency distress trigger keywords.',
      regional: 'ஆபத்து நேரத்தில் நீங்கள் எழுப்பும் அலறல் சத்தத்தை உணர்ந்து உதவி கோரும்.',
    },
    {
      id: 'camera',
      icon: <Camera className="w-5 h-5 text-indigo-400" />,
      title: 'Civic Camera & Sign Language Bridge',
      desc: 'Captures road pothole/sanitation photos and runs on-device hand gesture recognition.',
      regional: 'சாலை பள்ளங்கள் புகைப்படம் எடுக்க மற்றும் சைகை மொழியை மொழிபெயர்க்க உதவும்.',
    },
    {
      id: 'mesh',
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      title: 'Offline Bluetooth Mesh Relay',
      desc: 'Relays encrypted SOS alerts through nearby Nizhal devices even when mobile network fails.',
      regional: 'இன்டர்நெட் இல்லாத போதும் புளூடூத் மூலம் அவசர செய்திகளை அடுத்த போன்களுக்கு பகிரும்.',
    },
  ];

  const togglePermission = (id: 'gps' | 'microphone' | 'camera' | 'mesh') => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const explainPermissionsAloud = () => {
    VoiceAssistant.speak(
      `நிழல் செயலிக்கு ஜிபிஎஸ் இருப்பிடம், மைக்ரோபோன், கேமரா மற்றும் புளூடூத் அனுமதிகள் தேவை. உங்கள் தகவல்கள் முழுமையாக குறியாக்கம் செய்யப்படுகின்றன.`,
      currentLanguage
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between p-4 sm:p-6 text-white max-w-lg mx-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold tracking-tight">Privacy & Permissions</h2>
          </div>
          <button
            onClick={explainPermissionsAloud}
            className="text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30"
          >
            {t.listenToVoice}
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Nizhal is built on zero-data-monetization principles for the Surakshit Bharat initiative. All processing runs on-device where possible.
        </p>

        {/* Permission List */}
        <div className="space-y-3">
          {permissionItems.map((item) => {
            const isGranted = permissions[item.id as keyof typeof permissions];
            return (
              <div
                key={item.id}
                onClick={() => togglePermission(item.id as keyof typeof permissions)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  isGranted
                    ? 'bg-slate-900/90 border-slate-700/80 shadow-md'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-800/80 mt-0.5">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isGranted ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  <p className="text-[11px] text-amber-200/80 mt-1 italic">{item.regional}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accept & Proceed */}
      <div className="pt-6">
        <button
          onClick={onComplete}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/40 transition active:scale-98"
        >
          <span>Grant & Enter Guardian • அனுமதியை ஏற்கவும்</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

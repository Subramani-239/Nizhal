import React, { useState, useRef, useEffect } from 'react';
import {
  HandMetal,
  Camera,
  Volume2,
  VolumeX,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { Language, SignLanguageGesture } from '../../types';
import { SIGN_LANGUAGE_GESTURES } from '../../data/mockData';
import { VoiceAssistant } from '../../utils/speechHelper';
import { TRANSLATIONS } from '../../i18n/translations';

interface SignLanguageBridgeViewProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const SignLanguageBridgeView: React.FC<SignLanguageBridgeViewProps> = ({
  currentLanguage,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [selectedGesture, setSelectedGesture] = useState<SignLanguageGesture>(SIGN_LANGUAGE_GESTURES[0]);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [confidence, setConfidence] = useState(96);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw simulated MediaPipe 21 hand landmarks on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const drawLandmarks = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle futuristic camera scan grid
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 21 hand landmark base coordinates with gentle breathing float
      const cx = canvas.width / 2 + Math.sin(t) * 8;
      const cy = canvas.height / 2 + Math.cos(t) * 6;

      const joints = [
        { x: cx, y: cy + 70 }, // 0: wrist
        { x: cx - 40, y: cy + 40 }, // 1: thumb cmc
        { x: cx - 60, y: cy + 10 }, // 2: thumb mcp
        { x: cx - 75, y: cy - 20 }, // 3: thumb ip
        { x: cx - 85, y: cy - 45 }, // 4: thumb tip
        { x: cx - 25, y: cy - 30 }, // 5: index mcp
        { x: cx - 28, y: cy - 65 }, // 6: index pip
        { x: cx - 30, y: cy - 95 }, // 7: index dip
        { x: cx - 32, y: cy - 120 }, // 8: index tip
        { x: cx, y: cy - 35 }, // 9: middle mcp
        { x: cx, y: cy - 75 }, // 10: middle pip
        { x: cx, y: cy - 105 }, // 11: middle dip
        { x: cx, y: cy - 130 }, // 12: middle tip
        { x: cx + 25, y: cy - 30 }, // 13: ring mcp
        { x: cx + 28, y: cy - 65 }, // 14: ring pip
        { x: cx + 30, y: cy - 95 }, // 15: ring dip
        { x: cx + 32, y: cy - 118 }, // 16: ring tip
        { x: cx + 45, y: cy - 15 }, // 17: pinky mcp
        { x: cx + 55, y: cy - 45 }, // 18: pinky pip
        { x: cx + 62, y: cy - 70 }, // 19: pinky dip
        { x: cx + 68, y: cy - 90 }, // 20: pinky tip
      ];

      // Connections between joints
      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], // thumb
        [0, 5], [5, 6], [6, 7], [7, 8], // index
        [5, 9], [9, 10], [10, 11], [11, 12], // middle
        [9, 13], [13, 14], [14, 15], [15, 16], // ring
        [13, 17], [17, 18], [18, 19], [19, 20], // pinky
        [0, 17], // palm base
      ];

      // Draw skeleton lines
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      connections.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(joints[i].x, joints[i].y);
        ctx.lineTo(joints[j].x, joints[j].y);
        ctx.stroke();
      });

      // Draw joint dots
      joints.forEach((pt, i) => {
        ctx.fillStyle = i === 8 || i === 12 || i === 4 ? '#f43f5e' : '#a855f7';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, i === 0 ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Target bounding box
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 100, cy - 145, 200, 240);

      animId = requestAnimationFrame(drawLandmarks);
    };

    drawLandmarks();
    return () => cancelAnimationFrame(animId);
  }, [selectedGesture]);

  const handleSelectGesture = (gesture: SignLanguageGesture) => {
    setSelectedGesture(gesture);
    setConfidence(Math.floor(92 + Math.random() * 7));

    // Immediately speak translation for hearing responders
    const speech = gesture.meaning[currentLanguage];
    VoiceAssistant.speak(speech, currentLanguage);
  };

  const handleVoiceSpeak = () => {
    if (isSpeaking) {
      VoiceAssistant.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      VoiceAssistant.speak(selectedGesture.meaning[currentLanguage], currentLanguage, () => {
        setIsSpeaking(false);
      });
    }
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
        <span className="text-xs text-purple-400 font-bold bg-purple-950/80 border border-purple-700/40 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          MediaPipe On-Device Neural Model
        </span>
      </div>

      {/* Intro Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <HandMetal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featSignLanguage}</h2>
            <p className="text-xs text-slate-400">
              Camera-based Indian Sign Language (ISL) emergency gesture recognition with instant voice synthesis
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Camera & Landmark Simulator */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-purple-700/60 shadow-2xl">
        {/* Top HUD overlay */}
        <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/40 text-purple-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-[11px]">MediaPipe 21-Landmarks: TRACKING</span>
          </div>

          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/40 text-amber-300 font-bold font-mono">
            Match: {confidence}%
          </div>
        </div>

        {/* Live Canvas Landmark Visualizer */}
        <div className="relative h-72 sm:h-80 w-full flex items-center justify-center bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950">
          <canvas
            ref={canvasRef}
            width={400}
            height={320}
            className="w-full h-full object-contain"
          />

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded">
              Gesture Target: {selectedGesture.signName}
            </span>
            <span className="text-[11px] font-mono text-purple-300 bg-black/70 px-2 py-0.5 rounded">
              FPS: 30 (TFLite Wasm)
            </span>
          </div>
        </div>

        {/* Large Prominent Translated Speech Card */}
        <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-t border-purple-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
              Live Translation Output:
            </span>
            <button
              onClick={handleVoiceSpeak}
              className="flex items-center gap-1 text-xs text-amber-300 bg-black/50 px-3 py-1 rounded-full border border-amber-500/30 font-bold hover:bg-black/80"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isSpeaking ? 'Stop Voice' : 'Play Aloud for Responders'}</span>
            </button>
          </div>

          <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <span>{selectedGesture.iconHint}</span>
            <span>"{selectedGesture.meaning[currentLanguage]}"</span>
          </div>

          <p className="text-xs text-purple-200/80 mt-2 italic">
            Hand Pose: {selectedGesture.handLandmarkDescriptor}
          </p>
        </div>
      </div>

      {/* Selectable Indian Sign Language Gestures */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
          Select or Demonstrate Emergency Signs:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SIGN_LANGUAGE_GESTURES.map((gesture) => (
            <button
              key={gesture.id}
              onClick={() => handleSelectGesture(gesture)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                selectedGesture.id === gesture.id
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/40 ring-2 ring-purple-400/30'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">{gesture.iconHint}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/30">
                  {gesture.category}
                </span>
              </div>
              <strong className="text-xs font-bold block">{gesture.signName}</strong>
              <span className="text-[11px] opacity-80 truncate mt-1">
                {gesture.meaning[currentLanguage]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

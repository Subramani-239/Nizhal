import React, { useState } from 'react';
import { Sparkles, X, Play, RefreshCw, Download, Palette, Shield } from 'lucide-react';

interface LogoVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoVisualizerModal: React.FC<LogoVisualizerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState('Nizhal Safety Shield');
  const [description, setDescription] = useState('A protective guardian emblem for South Indian public safety and cyber resilience');
  const [styleTheme, setStyleTheme] = useState<'cyber' | 'civic' | 'royal' | 'minimal'>('cyber');
  const [isAnimating, setIsAnimating] = useState(true);

  const getThemeColors = () => {
    switch (styleTheme) {
      case 'cyber':
        return { primary: '#f43f5e', secondary: '#8b5cf6', accent: '#38bdf8', bg: '#020617' };
      case 'civic':
        return { primary: '#10b981', secondary: '#06b6d4', accent: '#f59e0b', bg: '#022c22' };
      case 'royal':
        return { primary: '#f59e0b', secondary: '#dc2626', accent: '#fbbf24', bg: '#1c1917' };
      case 'minimal':
        return { primary: '#e2e8f0', secondary: '#94a3b8', accent: '#64748b', bg: '#0f172a' };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-xl shadow-2xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold">Nizhal Emblem & Brand Logo Designer</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Generate an emblem based on your organization description with animated SVG vector rendering
        </p>

        {/* Inputs */}
        <div className="space-y-3 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Brand / Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Color Palette & Vibe</label>
              <select
                value={styleTheme}
                onChange={(e) => setStyleTheme(e.target.value as typeof styleTheme)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="cyber">Cyber Guardian (Rose & Indigo)</option>
                <option value="civic">Civic Harmony (Emerald & Cyan)</option>
                <option value="royal">South Indian Heritage (Gold & Crimson)</option>
                <option value="minimal">Modern Minimal (Monochrome)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">Concept Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        {/* Animated Logo Canvas Stage */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated SVG Logo */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Glowing ring */}
            <div
              className={`absolute inset-0 rounded-full blur-xl opacity-40 transition-all duration-1000 ${
                isAnimating ? 'animate-pulse scale-110' : ''
              }`}
              style={{ background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})` }}
            ></div>

            {/* Vector SVG */}
            <svg
              viewBox="0 0 200 200"
              className={`w-full h-full relative z-10 transition-transform duration-700 ${
                isAnimating ? 'animate-spin-slow' : ''
              }`}
            >
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.primary} />
                  <stop offset="50%" stopColor={colors.secondary} />
                  <stop offset="100%" stopColor={colors.accent} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Hexagon Shield */}
              <polygon
                points="100,20 170,60 170,140 100,180 30,140 30,60"
                fill="none"
                stroke="url(#logoGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isAnimating ? 'animate-pulse' : ''}
              />

              {/* Dynamic Concentric Orbits */}
              <circle
                cx="100"
                cy="100"
                r="55"
                fill="none"
                stroke={colors.accent}
                strokeWidth="2"
                strokeDasharray="8 6"
                opacity="0.7"
              />

              {/* Central Core Emblem */}
              <path
                d="M100,50 L140,80 L140,120 L100,150 L60,120 L60,80 Z"
                fill="url(#logoGrad)"
                opacity="0.85"
                filter="url(#glow)"
              />

              <path
                d="M100,65 L125,85 L125,115 L100,135 L75,115 L75,85 Z"
                fill="#0f172a"
              />

              <circle cx="100" cy="100" r="10" fill={colors.accent} />
            </svg>
          </div>

          {/* Rendered Typography Under Logo */}
          <div className="mt-4 text-center z-10">
            <h4 className="text-lg font-black tracking-wider uppercase text-white font-mono">
              {companyName}
            </h4>
            <p className="text-[11px] text-slate-400 max-w-sm mt-0.5">{description}</p>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isAnimating ? 'Pause Animation' : 'Resume Animation'}</span>
          </button>

          <button
            onClick={() => {
              alert('Exporting high-resolution SVG vector & animated WebM asset...');
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Vector Emblem</span>
          </button>
        </div>
      </div>
    </div>
  );
};

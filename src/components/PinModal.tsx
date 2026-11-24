import React, { useState } from 'react';
import { Lock, Unlock, X, KeyRound, AlertTriangle } from 'lucide-react';
import { authenticatePin } from '../utils/pinAuth';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDecoyMode: boolean;
  setIsDecoyMode: (val: boolean) => void;
  onOpenVaultView: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  isDecoyMode,
  setIsDecoyMode,
  onOpenVaultView,
}) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) setPin((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const res = authenticatePin(pin);
    if (!res.isUnlocked) {
      setFeedback('Invalid PIN. Use "9999" (Master) or "1111" (Decoy).');
      return;
    }

    if (res.isDecoyMode) {
      setIsDecoyMode(true);
      setFeedback('Decoy mode enabled.');
    } else {
      setIsDecoyMode(false);
      setFeedback('Master safety vault unlocked.');
    }

    setTimeout(() => {
      onClose();
      onOpenVaultView();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
          <KeyRound className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold">Duraspin Security PIN Shield</h3>
        <p className="text-xs text-slate-400 mt-1 mb-4">
          Enter <strong className="text-amber-400">9999</strong> for Master Vault or{' '}
          <strong className="text-amber-400">1111</strong> for Decoy Mode
        </p>

        {/* PIN Indicators */}
        <div className="flex justify-center gap-3 mb-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full border-2 transition ${
                pin.length > i ? 'bg-amber-400 border-amber-400 scale-110' : 'border-slate-600'
              }`}
            ></div>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeyPress(digit)}
              className="py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-base font-bold text-slate-200 border border-slate-800 active:scale-95 transition"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-400 border border-slate-800"
          >
            DEL
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-base font-bold text-slate-200 border border-slate-800"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={pin.length !== 4}
            className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs border border-amber-400 shadow"
          >
            OK
          </button>
        </div>

        {feedback && (
          <div className="text-xs font-medium text-amber-300 bg-slate-950 p-2 rounded-xl border border-slate-800">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

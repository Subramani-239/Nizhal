import React, { useState } from 'react';
import {
  FileWarning,
  BadgeCheck,
  MapPin,
  Clock,
  PlusCircle,
  Volume2,
  VolumeX,
  ArrowLeft,
  Filter,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { CommunityNotice, Language, SouthState } from '../../types';
import { INITIAL_COMMUNITY_NOTICES } from '../../data/mockData';
import { VoiceAssistant } from '../../utils/speechHelper';
import { TRANSLATIONS } from '../../i18n/translations';

interface CommunityBulletinViewProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const CommunityBulletinView: React.FC<CommunityBulletinViewProps> = ({
  currentLanguage,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [notices, setNotices] = useState<CommunityNotice[]>(INITIAL_COMMUNITY_NOTICES);
  const [selectedState, setSelectedState] = useState<SouthState | 'All'>('All');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // New notice form
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');
  const [newNoticeLocation, setNewNoticeLocation] = useState('Thanjavur Panchayat, Tamil Nadu');
  const [newNoticeState, setNewNoticeState] = useState<SouthState>('Tamil Nadu');
  const [newNoticeType, setNewNoticeType] = useState<CommunityNotice['type']>('urgent_alert');

  const filteredNotices = notices.filter((n) => {
    if (selectedState === 'All') return true;
    return n.state === selectedState;
  });

  const handleReadNotice = (notice: CommunityNotice) => {
    if (speakingId === notice.id) {
      VoiceAssistant.stop();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(notice.id);
    const speech = `${notice.title[currentLanguage]}. ${notice.summary[currentLanguage]}. Issued by: ${notice.issuedBy}`;
    VoiceAssistant.speak(speech, currentLanguage, () => setSpeakingId(null));
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeSummary) return;

    const notice: CommunityNotice = {
      id: `notice_${Date.now()}`,
      title: {
        en: newNoticeTitle,
        ta: newNoticeTitle,
        te: newNoticeTitle,
        ml: newNoticeTitle,
        kn: newNoticeTitle,
      },
      summary: {
        en: newNoticeSummary,
        ta: newNoticeSummary,
        te: newNoticeSummary,
        ml: newNoticeSummary,
        kn: newNoticeSummary,
      },
      location: newNoticeLocation,
      state: newNoticeState,
      level: 'panchayat',
      type: newNoticeType,
      verifiedBadge: true,
      issuedBy: 'Verified Panchayat Administrator (e-GramSwaraj Sign)',
      postedAt: 'Just now',
      activeUntil: 'Next 48 Hours',
    };

    setNotices([notice, ...notices]);
    setShowAdminModal(false);
    setNewNoticeTitle('');
    setNewNoticeSummary('');
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
        <button
          onClick={() => setShowAdminModal(true)}
          className="flex items-center gap-1 text-xs font-bold text-sky-300 bg-sky-950/80 hover:bg-sky-900 border border-sky-700/60 px-3 py-1.5 rounded-xl transition shadow"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post Official Notice (Admin)</span>
        </button>
      </div>

      {/* Intro Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <FileWarning className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featBulletin}</h2>
            <p className="text-xs text-slate-400">
              Verified advisories from Panchayats, RWAs, and Municipal Wards filtered by locality
            </p>
          </div>
        </div>

        {/* State Filter Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(['All', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedState === st
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Post Modal */}
      {showAdminModal && (
        <div className="bg-slate-900 border-2 border-sky-500 rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Broadcast Verified Public Notice</span>
            </h3>
            <button
              onClick={() => setShowAdminModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleCreateNotice} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Notice Headline</label>
              <input
                type="text"
                required
                value={newNoticeTitle}
                onChange={(e) => setNewNoticeTitle(e.target.value)}
                placeholder="e.g. Cauvery drinking water pipeline repair in Ward 14"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Official Summary & Instructions</label>
              <textarea
                required
                rows={3}
                value={newNoticeSummary}
                onChange={(e) => setNewNoticeSummary(e.target.value)}
                placeholder="Describe timings, affected villages, and emergency relief contacts..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Jurisdiction / Town</label>
                <input
                  type="text"
                  value={newNoticeLocation}
                  onChange={(e) => setNewNoticeLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">State</label>
                <select
                  value={newNoticeState}
                  onChange={(e) => setNewNoticeState(e.target.value as SouthState)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
              >
                Publish Verified Bulletin
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const isSpeaking = speakingId === notice.id;
          return (
            <div
              key={notice.id}
              className={`rounded-3xl p-5 sm:p-6 border shadow-xl transition ${
                notice.type === 'urgent_alert'
                  ? 'bg-rose-950/40 border-rose-800/80 shadow-rose-950/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {notice.verifiedBadge && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>Verified Panchayat/Ward</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      {notice.type.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {notice.title[currentLanguage]}
                  </h3>
                </div>

                <button
                  onClick={() => handleReadNotice(notice)}
                  className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition ${
                    isSpeaking
                      ? 'bg-sky-500 text-slate-950 border-sky-400 animate-pulse'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
                  <span className="text-[11px] hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 mt-3 leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                {notice.summary[currentLanguage]}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{notice.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Active: {notice.activeUntil}</span>
                  </span>
                </div>
                <span className="italic text-slate-400">Issued by: {notice.issuedBy}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

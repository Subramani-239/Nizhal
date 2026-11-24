import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ThumbsUp,
  Image as ImageIcon,
  Building,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { CivicReport, Language, SouthState } from '../../types';
import { INITIAL_CIVIC_REPORTS } from '../../data/mockData';
import { TRANSLATIONS } from '../../i18n/translations';

interface CivicReportViewProps {
  currentLanguage: Language;
  onBack: () => void;
  reports: CivicReport[];
  onAddReport: (report: CivicReport) => void;
  onUpvoteReport: (id: string) => void;
}

export const CivicReportView: React.FC<CivicReportViewProps> = ({
  currentLanguage,
  onBack,
  reports,
  onAddReport,
  onUpvoteReport,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New report form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CivicReport['category']>('pothole');
  const [state, setState] = useState<SouthState>('Tamil Nadu');
  const [city, setCity] = useState('Chennai');
  const [address, setAddress] = useState('Anna Salai near Gemini Flyover');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const samplePhotoOptions = [
    { label: 'Pothole Road', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80' },
    { label: 'Dark Streetlight', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80' },
    { label: 'Water Leak Pipe', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReport: CivicReport = {
        id: `rep_${Date.now()}`,
        category,
        title,
        description,
        location: {
          address,
          city,
          state,
          lat: 13.0827,
          lng: 80.2707,
        },
        photoUrl,
        reportedAt: 'Just now',
        status: 'SUBMITTED',
        department: `${city} Municipal Corporation - Civic Grievance Cell`,
        upvotes: 1,
      };

      onAddReport(newReport);
      setIsSubmitting(false);
      setShowSubmitModal(false);
      setTitle('');
      setDescription('');
    }, 600);
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
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-1 text-xs font-bold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-700/60 px-3 py-1.5 rounded-xl transition shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Report New Civic Issue</span>
        </button>
      </div>

      {/* Intro Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featCivicReport}</h2>
            <p className="text-xs text-slate-400">
              Geo-tagged photo complaints routed directly to municipal departments with real-time status tracking
            </p>
          </div>
        </div>
      </div>

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <div className="bg-slate-900 border-2 border-teal-500 rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-teal-400" />
              <span>Submit Photo Grievance</span>
            </h3>
            <button
              onClick={() => setShowSubmitModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Issue Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dangerously deep pothole near school crossing"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CivicReport['category'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="pothole">Road Pothole</option>
                  <option value="streetlight">Dark / Broken Streetlight</option>
                  <option value="water_leak">Drinking Water Leak</option>
                  <option value="garbage">Garbage / Solid Waste</option>
                  <option value="drainage">Drainage Overflow</option>
                  <option value="stray_cattle">Stray Cattle on Highway</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value as SouthState)}
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

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Location Details</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how long the issue has persisted and the safety hazard..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white resize-none"
              />
            </div>

            {/* Photo Selection */}
            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Evidence Photo</label>
              <div className="flex gap-2">
                {samplePhotoOptions.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPhotoUrl(opt.url)}
                    className={`text-[10px] px-2 py-1 rounded-lg border ${
                      photoUrl === opt.url
                        ? 'bg-teal-600 border-teal-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
              >
                {isSubmitting ? 'Tagging GPS & Submitting...' : 'Submit Grievance'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports Feed */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      report.status === 'RESOLVED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : report.status === 'IN_PROGRESS'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    Status: {report.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {report.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{report.reportedAt}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white">{report.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{report.description}</p>
              </div>

              {/* Photo preview */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                <img
                  src={report.photoUrl}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>
                {report.location.address}, {report.location.city} ({report.location.state})
              </span>
            </div>

            {/* Authority Action Notes if present */}
            {report.authorityNotes && (
              <div className="mt-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-teal-300 mb-0.5">
                  <Building className="w-3.5 h-3.5 text-teal-400" />
                  <span>Authority Action Note ({report.department}):</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{report.authorityNotes}</p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-xs">
              <span className="text-[11px] text-slate-500">ID: {report.id}</span>
              <button
                onClick={() => onUpvoteReport(report.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-teal-400" />
                <span>Upvote Issue ({report.upvotes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

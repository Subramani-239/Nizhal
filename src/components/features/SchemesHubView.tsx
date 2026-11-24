import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Filter,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Volume2,
  VolumeX,
  FileText,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Language, Scheme, SouthState } from '../../types';
import { COMPREHENSIVE_SCHEMES_DATABASE, filterEligibleSchemes } from '../../utils/schemesEngine';
import { VoiceAssistant } from '../../utils/speechHelper';
import { TRANSLATIONS } from '../../i18n/translations';

interface SchemesHubViewProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const SchemesHubView: React.FC<SchemesHubViewProps> = ({ currentLanguage, onBack }) => {
  const t = TRANSLATIONS[currentLanguage];

  const [selectedState, setSelectedState] = useState<SouthState>('All');
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [filterAge, setFilterAge] = useState<number>(28);
  const [filterIncome, setFilterIncome] = useState<number>(180000);
  const [filterGender, setFilterGender] = useState<'female' | 'male' | 'transgender' | 'all'>('female');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [speakingSchemeId, setSpeakingSchemeId] = useState<string | null>(null);

  const statesList: SouthState[] = [
    'All',
    'Tamil Nadu',
    'Kerala',
    'Karnataka',
    'Andhra Pradesh',
    'Telangana',
  ];

  const displayedSchemes = useMemo(() => {
    if (!isFilterActive) {
      if (selectedState === 'All') return COMPREHENSIVE_SCHEMES_DATABASE;
      return COMPREHENSIVE_SCHEMES_DATABASE.filter(
        (s) => s.state === 'All' || s.state === selectedState
      );
    }

    return filterEligibleSchemes({
      state: selectedState,
      age: filterAge,
      annualIncome: filterIncome,
      gender: filterGender,
      category: filterCategory as Scheme['category'],
    });
  }, [selectedState, isFilterActive, filterAge, filterIncome, filterGender, filterCategory]);

  const handleReadScheme = (scheme: Scheme) => {
    if (speakingSchemeId === scheme.id) {
      VoiceAssistant.stop();
      setSpeakingSchemeId(null);
      return;
    }
    setSpeakingSchemeId(scheme.id);
    const speech = `${scheme.name[currentLanguage]}. ${scheme.benefitsSummary[currentLanguage]}. உதவி எண்: ${scheme.directHelpline}`;
    VoiceAssistant.speak(speech, currentLanguage, () => setSpeakingSchemeId(null));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <button
          onClick={() => setShowEligibilityModal(!showEligibilityModal)}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition ${
            isFilterActive
              ? 'bg-amber-600 text-black border-amber-500 font-extrabold shadow-md'
              : 'bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isFilterActive ? 'Eligibility Filter Active (Edit)' : 'Smart Eligibility Finder'}</span>
        </button>
      </div>

      {/* Intro & State Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featSchemes}</h2>
            <p className="text-xs text-slate-400">
              Verified welfare benefits for Tamil Nadu, Kerala, Karnataka, Andhra, Telangana & Central Government
            </p>
          </div>
        </div>

        {/* State Pill Filter */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {statesList.map((st) => (
            <button
              key={st}
              onClick={() => {
                setSelectedState(st);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                selectedState === st
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Eligibility Finder Panel */}
      {showEligibilityModal && (
        <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Smart Eligibility Calculator
              </h3>
            </div>
            <button
              onClick={() => setShowEligibilityModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Age */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Your Age: <span className="text-amber-400 font-bold">{filterAge} Years</span>
              </label>
              <input
                type="range"
                min="10"
                max="85"
                value={filterAge}
                onChange={(e) => setFilterAge(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Income */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Annual Household Income: <span className="text-amber-400 font-bold">₹{(filterIncome / 100000).toFixed(1)} Lakh</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="25000"
                value={filterIncome}
                onChange={(e) => setFilterIncome(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Gender</label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value as 'female' | 'male' | 'transgender' | 'all')}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="female">Female (பெண் / మహిళ)</option>
                <option value="male">Male (ஆண் / పురుషుడు)</option>
                <option value="transgender">Transgender (திருநங்கை)</option>
                <option value="all">Any / Household Head</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="all">All Categories</option>
                <option value="women">Women Welfare</option>
                <option value="farmer">Farmer / Agriculture</option>
                <option value="student">Student / Education</option>
                <option value="healthcare">Healthcare & Insurance</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setIsFilterActive(false);
                setShowEligibilityModal(false);
              }}
              className="px-3 py-2 text-xs text-slate-400 hover:text-white"
            >
              Reset Filters
            </button>
            <button
              onClick={() => {
                setIsFilterActive(true);
                setShowEligibilityModal(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
            >
              Apply Filter & Show Eligible Schemes
            </button>
          </div>
        </div>
      )}

      {/* Schemes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{displayedSchemes.length}</strong> welfare schemes
            {selectedState !== 'All' ? ` for ${selectedState}` : ' across South India'}
          </span>
          {isFilterActive && (
            <span className="text-amber-400 font-semibold">Filtered by your demographic profile</span>
          )}
        </div>

        {displayedSchemes.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 rounded-3xl border border-slate-800 text-slate-400">
            <Landmark className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No schemes matched the strict demographic filters.</p>
            <button
              onClick={() => setIsFilterActive(false)}
              className="mt-2 text-xs text-amber-400 underline font-bold"
            >
              Clear filters to view all schemes
            </button>
          </div>
        ) : (
          displayedSchemes.map((scheme) => {
            const isSpeaking = speakingSchemeId === scheme.id;
            return (
              <div
                key={scheme.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl transition"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {scheme.state === 'All' ? 'Central Scheme' : scheme.state}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {scheme.targetGroup}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {scheme.department}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {scheme.name[currentLanguage]}
                    </h3>
                  </div>

                  {/* Read Aloud Button */}
                  <button
                    onClick={() => handleReadScheme(scheme)}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition ${
                      isSpeaking
                        ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    <span className="text-[11px] hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
                  </button>
                </div>

                {/* Benefits text */}
                <p className="text-xs sm:text-sm text-slate-200 mt-3 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  {scheme.benefitsSummary[currentLanguage]}
                </p>

                {/* Document Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mandatory Document Checklist:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scheme.documentsRequired.map((doc, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{doc[currentLanguage]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                  <a
                    href={`tel:${scheme.directHelpline.split('/')[0].trim()}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-semibold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Helpline: {scheme.directHelpline}</span>
                  </a>

                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-bold shadow transition"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

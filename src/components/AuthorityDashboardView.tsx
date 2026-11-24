import React, { useState } from 'react';
import {
  Building2,
  ShieldAlert,
  CheckCircle,
  Clock,
  MapPin,
  Radio,
  FileText,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Send,
} from 'lucide-react';
import { CivicReport, Language } from '../types';

interface AuthorityDashboardViewProps {
  currentLanguage: Language;
  onBackToApp: () => void;
  civicReports: CivicReport[];
  onUpdateReportStatus: (id: string, newStatus: CivicReport['status'], notes: string) => void;
}

export const AuthorityDashboardView: React.FC<AuthorityDashboardViewProps> = ({
  currentLanguage,
  onBackToApp,
  civicReports,
  onUpdateReportStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'civic_tickets' | 'sos_dispatch' | 'mesh_telemetry'>('civic_tickets');
  const [selectedTicket, setSelectedTicket] = useState<CivicReport | null>(civicReports[0] || null);
  const [actionNotes, setActionNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<CivicReport['status']>('IN_PROGRESS');

  const handleApplyResolution = () => {
    if (!selectedTicket) return;
    onUpdateReportStatus(selectedTicket.id, selectedStatus, actionNotes || 'Updated by Municipal Grievance Officer');
    alert(`Ticket #${selectedTicket.id} updated to ${selectedStatus}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">South India Public Safety Authority Portal</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Surakshit Bharat Command
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time dispatch coordination for Greater Chennai, BBMP Bengaluru, Kochi Municipal, & Hyderabad GHMC
            </p>
          </div>
        </div>

        <button
          onClick={onBackToApp}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Switch to Mobile App</span>
        </button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Civic Tickets</span>
          <div className="text-2xl font-black text-white mt-1">{civicReports.length + 148}</div>
          <span className="text-[10px] text-emerald-400">↑ 94% Resolution Rate</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Active SOS Dispatches</span>
          <div className="text-2xl font-black text-rose-500 mt-1">2 Live</div>
          <span className="text-[10px] text-rose-400">Avg Response: 4.8 min</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Mesh Gateway Relays</span>
          <div className="text-2xl font-black text-cyan-400 mt-1">1,420 Hops</div>
          <span className="text-[10px] text-cyan-300">100% Offline Resilience</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Cyber Scams Thwarted</span>
          <div className="text-2xl font-black text-amber-400 mt-1">₹3.8 Cr</div>
          <span className="text-[10px] text-amber-300">Via 1930 & Voice Deterrents</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('civic_tickets')}
          className={`pb-3 px-4 border-b-2 transition ${
            activeTab === 'civic_tickets'
              ? 'border-teal-500 text-teal-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Civic Grievance Desk ({civicReports.length})
        </button>
        <button
          onClick={() => setActiveTab('sos_dispatch')}
          className={`pb-3 px-4 border-b-2 transition ${
            activeTab === 'sos_dispatch'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          112 Live SOS Monitor (2)
        </button>
        <button
          onClick={() => setActiveTab('mesh_telemetry')}
          className={`pb-3 px-4 border-b-2 transition ${
            activeTab === 'mesh_telemetry'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Offline Mesh Gateway Diagnostics
        </button>
      </div>

      {/* Tab 1: Civic Grievance Desk */}
      {activeTab === 'civic_tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets Column */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Incoming Citizen Reports
            </h3>
            {civicReports.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  setSelectedTicket(report);
                  setSelectedStatus(report.status);
                  setActionNotes(report.authorityNotes || '');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  selectedTicket?.id === report.id
                    ? 'bg-slate-800 border-teal-500 shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-teal-400 font-bold">{report.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                      report.status === 'RESOLVED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : report.status === 'IN_PROGRESS'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{report.title}</h4>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>
                    {report.location.city}, {report.location.state}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Detail & Status Action Column */}
          {selectedTicket && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-teal-400 font-bold">{selectedTicket.id}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {selectedTicket.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{selectedTicket.title}</h3>
                </div>

                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-700">
                  <img src={selectedTicket.photoUrl} alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Citizen Description:</span>
                <p className="text-slate-200 leading-relaxed">{selectedTicket.description}</p>
                <div className="mt-2 text-[11px] text-teal-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {selectedTicket.location.address}, {selectedTicket.location.city} (GPS:{' '}
                    {selectedTicket.location.lat}, {selectedTicket.location.lng})
                  </span>
                </div>
              </div>

              {/* Status Update Form */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Update Official Ticket Status
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Action State</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as CivicReport['status'])}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="IN_PROGRESS">In Progress (Crew Dispatched)</option>
                      <option value="ASSIGNED">Assigned (Contractor Engaged)</option>
                      <option value="RESOLVED">Resolved (Work Completed)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Official Resolution Notes</label>
                  <textarea
                    rows={2}
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Enter crew details, completion date, or asphalt volume used..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
                  />
                </div>

                <button
                  onClick={handleApplyResolution}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
                >
                  Save Status & Notify Citizen
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: SOS Emergency Dispatch Monitor */}
      {activeTab === 'sos_dispatch' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
              <span>Real-Time 112 / PCR Van Dispatch Feed</span>
            </h3>
            <span className="text-xs text-rose-400 font-mono">Live Sync Active</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                    EMERGENCY DISTRESS
                  </span>
                  <span className="font-mono text-slate-300">ID: SOS-CH-9182</span>
                  <span className="text-slate-400">2 minutes ago</span>
                </div>
                <strong className="text-white block">
                  Acoustic Scream Trigger Detected • Kaveripattinam, Tamil Nadu
                </strong>
                <span className="text-slate-300 font-mono text-[11px]">
                  Coords: 12.4331° N, 78.2144° E (Accuracy: ±3 meters)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-bold">PCR Van 14 Dispatched</span>
                <button
                  onClick={() => alert('Opening live police CAD map...')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs"
                >
                  View Live Track
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    MEDICAL AMBULANCE (108)
                  </span>
                  <span className="font-mono text-slate-300">ID: SOS-KL-4402</span>
                  <span className="text-slate-400">14 minutes ago</span>
                </div>
                <strong className="text-white block">Cardiac Emergency • Wayanad Road, Ernakulam</strong>
                <span className="text-slate-300 font-mono text-[11px]">Coords: 9.9816° N, 76.2798° E</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">Patient Admitted to General Hospital</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Mesh Diagnostics */}
      {activeTab === 'mesh_telemetry' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400" />
              <span>Offline Mesh Network Satellite & LoRa Relays</span>
            </h3>
            <span className="text-xs text-cyan-300 font-mono">5 State Gateways Operational</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <strong className="text-white block">Tamil Nadu Coastal Gateway (Chennai - Cuddalore)</strong>
              <p className="text-slate-400 text-[11px] mt-1">
                Connected over LoRa 865MHz + ISRO NavIC satellite backup. Relays cyclone warnings during fiber line breaks.
              </p>
              <div className="mt-2 text-[10px] text-emerald-400 font-mono">Status: 99.98% Available</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <strong className="text-white block">Kerala Western Ghats Gateway (Wayanad - Idukki)</strong>
              <p className="text-slate-400 text-[11px] mt-1">
                High-altitude repeater stations for landslide and heavy rainfall SOS mesh packets.
              </p>
              <div className="mt-2 text-[10px] text-emerald-400 font-mono">Status: Active & Armed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

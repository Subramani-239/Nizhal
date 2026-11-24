import React, { useState } from 'react';
import {
  Radio,
  Share2,
  ShieldCheck,
  Send,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Repeat,
  WifiOff,
  Signal,
} from 'lucide-react';
import { Language, MeshPacket } from '../../types';
import { MeshNetworkRouter } from '../../utils/meshProtocol';
import { MOCK_MESH_NODES } from '../../data/mockData';
import { TRANSLATIONS } from '../../i18n/translations';

interface OfflineMeshNetworkViewProps {
  currentLanguage: Language;
  onBack: () => void;
  meshRouter: MeshNetworkRouter;
}

export const OfflineMeshNetworkView: React.FC<OfflineMeshNetworkViewProps> = ({
  currentLanguage,
  onBack,
  meshRouter,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [outgoingText, setOutgoingText] = useState('Urgent: Flood water entered ground floor near Temple tank. Need evacuation boat.');
  const [packetType, setPacketType] = useState<MeshPacket['payloadType']>('SOS_ALERT');
  const [packetsLog, setPacketsLog] = useState<MeshPacket[]>([
    meshRouter.createEmergencyPacket('SOS_ALERT', 'Elderly diabetic patient needing insulin at Ward 4, Kaveripattinam.'),
  ]);
  const [relayedHopsFeedback, setRelayedHopsFeedback] = useState<string[]>([]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const handleBroadcastPacket = () => {
    if (!outgoingText.trim()) return;
    setIsBroadcasting(true);
    setRelayedHopsFeedback([]);

    const packet = meshRouter.createEmergencyPacket(packetType, outgoingText);
    setPacketsLog((prev) => [packet, ...prev]);

    // Simulate multi-hop propagation through peers
    const hops = [
      'Node #881 (You) initiated Bluetooth BLE broadcast',
      'Hop 1: Auto-Rickshaw Driver App received (TTL: 4)',
      'Hop 2: Panchayat Office Hub verified & relayed (TTL: 3)',
      'Hop 3: State Police LoRa/Satellite Gateway uploaded to Cloud Run Command!',
    ];

    hops.forEach((step, index) => {
      setTimeout(() => {
        setRelayedHopsFeedback((prev) => [...prev, step]);
        if (index === hops.length - 1) {
          setIsBroadcasting(false);
        }
      }, (index + 1) * 700);
    });
  };

  const handleTestDuplicateDrop = () => {
    if (packetsLog.length === 0) return;
    const latestPacket = packetsLog[0];
    const relayAttempt = meshRouter.receiveAndRelay(latestPacket);

    alert(
      `Deduplication Shield: Packet ${latestPacket.packetId} was rejected (${relayAttempt.reason}). Loop prevention protects battery and prevents broadcast storms.`
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs text-cyan-400 font-bold bg-cyan-950/80 border border-cyan-700/40 px-2.5 py-1 rounded-full flex items-center gap-1">
          <WifiOff className="w-3.5 h-3.5" />
          Zero Cellular Internet Required
        </span>
      </div>

      {/* Intro Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t.featMeshNet}</h2>
            <p className="text-xs text-slate-400">
              Nearby Connections Bluetooth & Wi-Fi Direct multi-hop relay for cyclones, floods and network blackouts
            </p>
          </div>
        </div>

        {/* Live Peers Status */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Active Nearby Nodes in Physical Range (5 Peers):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {MOCK_MESH_NODES.map((node) => (
              <div
                key={node.id}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-slate-200 block truncate max-w-[170px]">{node.name}</strong>
                  <span className="text-[10px] text-slate-500">
                    Dist: {node.distance} • Bat: {node.battery}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    node.isGateway
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {node.isGateway ? 'Internet Gateway' : 'Peer Hop'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Broadcast Simulator Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Send className="w-4 h-4 text-cyan-400" />
          <span>Transmit Encrypted Offline Mesh Packet</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Alert Payload</label>
            <textarea
              rows={3}
              value={outgoingText}
              onChange={(e) => setOutgoingText(e.target.value)}
              placeholder="Describe emergency situation for nearby peers..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3 text-xs text-white resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Type:</span>
              <select
                value={packetType}
                onChange={(e) => setPacketType(e.target.value as MeshPacket['payloadType'])}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
              >
                <option value="SOS_ALERT">🚨 SOS Alert</option>
                <option value="RELIEF_REQUEST">📦 Relief & Supplies</option>
                <option value="MEDICAL_URGENT">🩺 Medical Urgent</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestDuplicateDrop}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold"
              >
                Test Deduplication
              </button>
              <button
                type="button"
                onClick={handleBroadcastPacket}
                disabled={isBroadcasting}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950/40 flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{isBroadcasting ? 'Broadcasting...' : 'Broadcast to Nearby Phones'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Multi-hop trace sequence */}
        {relayedHopsFeedback.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-cyan-800/60 animate-in fade-in">
            <div className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Multi-Hop Propagation Log (Hop-by-Hop Verification)</span>
            </div>
            <div className="space-y-1.5">
              {relayedHopsFeedback.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Packet Transmission History & Cryptographic Verification */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
          <span>Mesh Packet Relay Log ({packetsLog.length})</span>
          <span className="text-[11px] text-slate-400 font-normal">TTL = 5 hops max</span>
        </h3>

        <div className="space-y-3">
          {packetsLog.map((pkt) => (
            <div
              key={pkt.packetId}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold">{pkt.packetId}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {pkt.payloadType}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>Hops: {pkt.hopsTraversed.length} / 5</span>
                  <span>TTL: {pkt.ttl}</span>
                </div>
              </div>

              <div>
                <strong className="text-white block">{pkt.decryptedPreview}</strong>
                <div className="mt-1 font-mono text-[10px] text-slate-500 truncate">
                  Encrypted Payload: {pkt.contentEncrypted}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Origin: {pkt.sourceNodeName}</span>
                <span>GPS: {pkt.gpsCoordinates.lat}, {pkt.gpsCoordinates.lng}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

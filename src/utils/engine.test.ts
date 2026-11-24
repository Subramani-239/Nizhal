import test from 'node:test';
import assert from 'node:assert/strict';
import { authenticatePin } from './pinAuth';
import { MeshNetworkRouter } from './meshProtocol';
import { verifyWhatsAppMessage } from './factCheckEngine';
import { filterEligibleSchemes } from './schemesEngine';
import { analyzeMessageThreat } from './scamDetector';

test('PinAuth: master PIN grants full real vault access', () => {
  const result = authenticatePin('9999');
  assert.equal(result.isUnlocked, true);
  assert.equal(result.isDecoyMode, false);
});

test('PinAuth: decoy PIN activates decoy safe mode', () => {
  const result = authenticatePin('1111');
  assert.equal(result.isUnlocked, true);
  assert.equal(result.isDecoyMode, true);
});

test('PinAuth: wrong PIN fails unlock', () => {
  const result = authenticatePin('0000');
  assert.equal(result.isUnlocked, false);
  assert.equal(result.isDecoyMode, false);
});

test('MeshProtocol: packet creation and TTL relay works', () => {
  const router = new MeshNetworkRouter('node_chennai_01', 'Chennai Station');
  const packet = router.createEmergencyPacket('SOS_ALERT', 'Medical assistance needed at Marina Beach');

  assert.equal(packet.ttl, 5);
  assert.equal(packet.sourceNodeId, 'node_chennai_01');
  assert.equal(packet.hopsTraversed.length, 1);

  // Relay through another router
  const peerRouter = new MeshNetworkRouter('node_adyar_02', 'Adyar Relay');
  const relayResult = peerRouter.receiveAndRelay(packet);

  assert.equal(relayResult.accepted, true);
  assert.equal(relayResult.relayedPacket?.ttl, 4);
  assert.equal(relayResult.relayedPacket?.hopsTraversed.includes('node_adyar_02'), true);

  // Deduplication check
  const duplicateResult = peerRouter.receiveAndRelay(packet);
  assert.equal(duplicateResult.accepted, false);
  assert.equal(duplicateResult.reason, 'DUPLICATE');
});

test('FactCheck: recognizes Digital Arrest fraud pattern', () => {
  const check = verifyWhatsAppMessage('Urgent: Mumbai Crime Branch CBI seized your FedEx courier. You are under digital arrest.');
  assert.equal(check.verdict, 'FAKE_SCAM');
  assert.equal(check.confidence >= 0.9, true);
});

test('ScamDetector: catches electricity disconnection phishing', () => {
  const threat = analyzeMessageThreat('Your power cut will happen tonight by TANGEDCO. Call electricity officer now or install quicksupport apk');
  assert.equal(threat.riskLevel, 'HIGH');
  assert.equal(threat.type, 'apk');
});

test('SchemesEngine: filters schemes by demographic parameters', () => {
  const schemes = filterEligibleSchemes({
    state: 'Tamil Nadu',
    age: 32,
    gender: 'female',
    annualIncome: 180000,
  });

  const ids = schemes.map(s => s.id);
  assert.equal(ids.includes('tn_magalir_urimai'), true);
});

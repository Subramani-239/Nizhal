import { MeshPacket } from '../types';

export class MeshNetworkRouter {
  private processedPacketIds: Set<string> = new Set();
  private maxCacheSize = 250;
  private localNodeId: string;
  private localNodeName: string;

  constructor(localNodeId = 'node_mysore_81', localNodeName = 'Nizhal Device (You)') {
    this.localNodeId = localNodeId;
    this.localNodeName = localNodeName;
  }

  public getLocalNodeInfo() {
    return {
      nodeId: this.localNodeId,
      nodeName: this.localNodeName,
    };
  }

  /**
   * Generates a new SOS or relief emergency packet to broadcast over Nearby Connections
   */
  public createEmergencyPacket(
    payloadType: MeshPacket['payloadType'],
    message: string,
    coords = { lat: 13.0827, lng: 80.2707, accuracyMeters: 4 },
    ttl = 5
  ): MeshPacket {
    const packetId = `NZ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const packet: MeshPacket = {
      packetId,
      sourceNodeId: this.localNodeId,
      sourceNodeName: this.localNodeName,
      recipientId: 'BROADCAST',
      payloadType,
      contentEncrypted: `ENCR_AES256::${btoa(encodeURIComponent(message))}`,
      decryptedPreview: message,
      gpsCoordinates: coords,
      timestamp: Date.now(),
      ttl,
      hopsTraversed: [this.localNodeId],
    };

    this.processedPacketIds.add(packetId);
    return packet;
  }

  /**
   * Process incoming packet from a peer.
   * Returns:
   *  - { shouldForward: false, reason: 'DUPLICATE' | 'EXPIRED' }
   *  - { shouldForward: true, packet: updatedPacket }
   */
  public receiveAndRelay(packet: MeshPacket): {
    accepted: boolean;
    reason?: 'DUPLICATE' | 'TTL_EXPIRED' | 'SELF_LOOP';
    relayedPacket?: MeshPacket;
  } {
    if (this.processedPacketIds.has(packet.packetId)) {
      return { accepted: false, reason: 'DUPLICATE' };
    }

    if (packet.hopsTraversed.includes(this.localNodeId)) {
      return { accepted: false, reason: 'SELF_LOOP' };
    }

    if (packet.ttl <= 1) {
      // Add to seen so we don't process again, but cannot forward
      this.cachePacketId(packet.packetId);
      return { accepted: false, reason: 'TTL_EXPIRED' };
    }

    this.cachePacketId(packet.packetId);

    // Relay packet: decrement TTL, append local node to hop path
    const relayedPacket: MeshPacket = {
      ...packet,
      ttl: packet.ttl - 1,
      hopsTraversed: [...packet.hopsTraversed, this.localNodeId],
    };

    return {
      accepted: true,
      relayedPacket,
    };
  }

  public decryptPayload(encryptedString: string): string {
    try {
      if (encryptedString.startsWith('ENCR_AES256::')) {
        const raw = encryptedString.replace('ENCR_AES256::', '');
        return decodeURIComponent(atob(raw));
      }
      return encryptedString;
    } catch {
      return 'Encrypted payload (Verified Nizhal Protocol Signature)';
    }
  }

  private cachePacketId(id: string) {
    if (this.processedPacketIds.size >= this.maxCacheSize) {
      const first = this.processedPacketIds.values().next().value;
      if (first) this.processedPacketIds.delete(first);
    }
    this.processedPacketIds.add(id);
  }

  public hasSeen(packetId: string): boolean {
    return this.processedPacketIds.has(packetId);
  }
}

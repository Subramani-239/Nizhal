export type Language = 'en' | 'ta' | 'te' | 'ml' | 'kn';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  hackathonBadge: string;
  sosButton: string;
  audioSos: string;
  audioSosActive: string;
  audioSosCancel: string;
  fakePinAlert: string;
  switchLanguage: string;
  selectLanguage: string;
  emergencyHeader: string;
  callingPolice: string;
  callingAmbulance: string;
  callingWomenHelpline: string;
  nearbyMeshPeers: string;
  offlineStatus: string;
  onlineStatus: string;
  // Features
  featWhatsAppVerifier: string;
  featWhatsAppDesc: string;
  featAiGuard: string;
  featAiGuardDesc: string;
  featSchemes: string;
  featSchemesDesc: string;
  featSos: string;
  featSosDesc: string;
  featDecoyPin: string;
  featDecoyPinDesc: string;
  featBulletin: string;
  featBulletinDesc: string;
  featSignLanguage: string;
  featSignLanguageDesc: string;
  featMeshNet: string;
  featMeshNetDesc: string;
  featCivicReport: string;
  featCivicReportDesc: string;
  settings: string;
  authorityDashboard: string;
  listenToVoice: string;
  readAloud: string;
  stopVoice: string;
}

export type VerdictType = 'AUTHENTIC' | 'UNVERIFIED' | 'FAKE_SCAM';

export interface FactCheckResult {
  id: string;
  query: string;
  verdict: VerdictType;
  confidence: number;
  title: string;
  explanation: Record<Language, string>;
  category: 'financial_scam' | 'health_myth' | 'government_hoax' | 'job_fraud' | 'communal_rumor' | 'authentic_news';
  verifiedSource?: string;
  matchedKeywords: string[];
  safeActionAdvised: Record<Language, string>;
  dateReported: string;
}

export interface ScamThreat {
  id: string;
  type: 'sms' | 'whatsapp' | 'call' | 'apk' | 'link';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  pattern: string;
  detectedText: string;
  explanation: Record<Language, string>;
  recommendedVoiceDeterrentId: string;
}

export interface VoiceDeterrent {
  id: string;
  label: Record<Language, string>;
  transcript: Record<Language, string>;
  audioTone: 'police_advisory' | 'cyber_crime' | 'call_recording' | 'financial_fraud_alert';
  durationSeconds: number;
}

export type SouthState = 'All' | 'Tamil Nadu' | 'Kerala' | 'Karnataka' | 'Andhra Pradesh' | 'Telangana';

export interface Scheme {
  id: string;
  name: Record<Language, string>;
  state: SouthState;
  department: string;
  targetGroup: string;
  minAge: number;
  maxAge: number;
  maxAnnualIncome: number; // in INR, 0 for unlimited
  applicableGenders: ('all' | 'female' | 'male' | 'transgender')[];
  category: 'farmer' | 'student' | 'women' | 'senior' | 'housing' | 'healthcare' | 'disaster';
  benefitsSummary: Record<Language, string>;
  documentsRequired: Record<Language, string>[];
  officialPortalUrl: string;
  directHelpline: string;
}

export interface MeshPacket {
  packetId: string;
  sourceNodeId: string;
  sourceNodeName: string;
  recipientId: string; // 'BROADCAST' or target
  payloadType: 'SOS_ALERT' | 'RELIEF_REQUEST' | 'MEDICAL_URGENT' | 'SAFETY_PING';
  contentEncrypted: string;
  decryptedPreview: string;
  gpsCoordinates: { lat: number; lng: number; accuracyMeters: number };
  timestamp: number;
  ttl: number; // max hops remaining (e.g. 5)
  hopsTraversed: string[];
}

export interface CivicReport {
  id: string;
  category: 'pothole' | 'streetlight' | 'garbage' | 'water_leak' | 'stray_cattle' | 'drainage' | 'encroachment';
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: SouthState;
    lat: number;
    lng: number;
  };
  photoUrl: string;
  reportedAt: string;
  status: 'SUBMITTED' | 'IN_PROGRESS' | 'ASSIGNED' | 'RESOLVED';
  department: string;
  upvotes: number;
  authorityNotes?: string;
  resolutionPhoto?: string;
}

export interface CommunityNotice {
  id: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  location: string;
  state: SouthState;
  level: 'panchayat' | 'ward' | 'rwa' | 'district_collector';
  type: 'urgent_alert' | 'power_cut' | 'water_supply' | 'festival_advisory' | 'health_camp';
  verifiedBadge: boolean;
  issuedBy: string;
  postedAt: string;
  activeUntil: string;
}

export interface SignLanguageGesture {
  id: string;
  signName: string;
  meaning: Record<Language, string>;
  category: 'EMERGENCY' | 'MEDICAL' | 'CIVIC' | 'BASIC';
  iconHint: string;
  handLandmarkDescriptor: string;
  samplePhrase: Record<Language, string>;
}

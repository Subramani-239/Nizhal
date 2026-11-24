import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SplashView } from './components/SplashView';
import { OnboardingPermissions } from './components/OnboardingPermissions';
import { HomeView } from './components/HomeView';
import { WhatsAppVerifierView } from './components/features/WhatsAppVerifierView';
import { AiGuardView } from './components/features/AiGuardView';
import { SchemesHubView } from './components/features/SchemesHubView';
import { SosLiveView } from './components/features/SosLiveView';
import { DecoyPinShieldView } from './components/features/DecoyPinShieldView';
import { CommunityBulletinView } from './components/features/CommunityBulletinView';
import { SignLanguageBridgeView } from './components/features/SignLanguageBridgeView';
import { OfflineMeshNetworkView } from './components/features/OfflineMeshNetworkView';
import { CivicReportView } from './components/features/CivicReportView';
import { AuthorityDashboardView } from './components/AuthorityDashboardView';
import { SettingsView } from './components/SettingsView';
import { PinModal } from './components/PinModal';
import { LogoVisualizerModal } from './components/LogoVisualizerModal';
import { CivicReport, Language } from './types';
import { INITIAL_CIVIC_REPORTS } from './data/mockData';
import { MeshNetworkRouter } from './utils/meshProtocol';
import { VoiceAssistant } from './utils/speechHelper';

export default function App() {
  // Query param check for ?autostart=1
  const isAutostart = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('autostart') === '1';

  const [currentScreen, setCurrentScreen] = useState<string>(isAutostart ? 'home' : 'splash');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ta'); // Default Tamil as per South Indian Nizhal identity
  const [isDecoyMode, setIsDecoyMode] = useState<boolean>(false);
  const [isAuthorityView, setIsAuthorityView] = useState<boolean>(false);
  const [isMeshActive, setIsMeshActive] = useState<boolean>(true);
  const [isAudioSosActive, setIsAudioSosActive] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(false);

  const [civicReports, setCivicReports] = useState<CivicReport[]>(INITIAL_CIVIC_REPORTS);

  const meshRouter = useMemo(() => new MeshNetworkRouter('node_mysore_81', 'Nizhal Device (You)'), []);

  // Sync title with language
  useEffect(() => {
    const titles: Record<Language, string> = {
      ta: 'நிழல் (Nizhal) | பொதுப் பாதுகாப்பு & அவசர உதவி',
      en: 'Nizhal | Public Safety & Civic Shield',
      te: 'నిழల్ (Nizhal) | ప్రజా భద్రత & పౌర రక్షణ',
      ml: 'നിഴൽ (Nizhal) | പൊതുസുരക്ഷാ കവചം',
      kn: 'ನಿೞಲ್ (Nizhal) | ಸಾರ್ವಜನಿಕ ಭದ್ರತೆ',
    };
    document.title = titles[currentLanguage] || titles.en;
  }, [currentLanguage]);

  const handleAddCivicReport = (newReport: CivicReport) => {
    setCivicReports((prev) => [newReport, ...prev]);
  };

  const handleUpvoteCivicReport = (id: string) => {
    setCivicReports((prev) =>
      prev.map((rep) => (rep.id === id ? { ...rep, upvotes: rep.upvotes + 1 } : rep))
    );
  };

  const handleUpdateReportStatus = (id: string, newStatus: CivicReport['status'], notes: string) => {
    setCivicReports((prev) =>
      prev.map((rep) =>
        rep.id === id
          ? {
              ...rep,
              status: newStatus,
              authorityNotes: notes,
            }
          : rep
      )
    );
  };

  const handleBroadcastMeshAlert = (message: string) => {
    meshRouter.createEmergencyPacket('SOS_ALERT', message);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Universal App Bar */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        isDecoyMode={isDecoyMode}
        onOpenPinModal={() => setIsPinModalOpen(true)}
        onToggleAuthorityDashboard={() => setIsAuthorityView(!isAuthorityView)}
        isAuthorityView={isAuthorityView}
        onNavigateHome={() => {
          setIsAuthorityView(false);
          setCurrentScreen('home');
        }}
        isMeshActive={isMeshActive}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        phoneFrameMode={phoneFrameMode}
        setPhoneFrameMode={setPhoneFrameMode}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-3 sm:px-6 py-4 flex flex-col items-center">
        {isAuthorityView ? (
          // Full Authority Web Dashboard
          <div className="w-full">
            <AuthorityDashboardView
              currentLanguage={currentLanguage}
              onBackToApp={() => setIsAuthorityView(false)}
              civicReports={civicReports}
              onUpdateReportStatus={handleUpdateReportStatus}
            />
          </div>
        ) : (
          // Citizen Mobile App View
          <div
            className={`w-full transition-all duration-300 ${
              phoneFrameMode
                ? 'max-w-md mx-auto bg-slate-900 border-4 border-slate-700/80 rounded-[40px] shadow-2xl p-4 sm:p-5 my-2 ring-1 ring-white/10 relative overflow-hidden'
                : 'max-w-5xl mx-auto'
            }`}
          >
            {phoneFrameMode && (
              /* Realistic Phone Camera Notch */
              <div className="w-28 h-4 bg-slate-950 rounded-full mx-auto mb-4 border border-slate-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
              </div>
            )}

            {/* Screen Routing */}
            {currentScreen === 'splash' && (
              <SplashView
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                onStart={() => setCurrentScreen('onboarding')}
              />
            )}

            {currentScreen === 'onboarding' && (
              <OnboardingPermissions
                currentLanguage={currentLanguage}
                onComplete={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'home' && (
              <HomeView
                currentLanguage={currentLanguage}
                onSelectFeature={(featId) => setCurrentScreen(featId)}
                isMeshActive={isMeshActive}
                onTriggerSos={() => setCurrentScreen('sos_live')}
                isAudioSosActive={isAudioSosActive}
                onToggleAudioSos={() => setIsAudioSosActive(!isAudioSosActive)}
                isDecoyMode={isDecoyMode}
                onOpenPinModal={() => setIsPinModalOpen(true)}
              />
            )}

            {currentScreen === 'whatsapp_verifier' && (
              <WhatsAppVerifierView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'ai_guard' && (
              <AiGuardView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'schemes_hub' && (
              <SchemesHubView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'sos_live' && (
              <SosLiveView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
                isMeshActive={isMeshActive}
                onBroadcastMeshAlert={handleBroadcastMeshAlert}
              />
            )}

            {currentScreen === 'decoy_pin' && (
              <DecoyPinShieldView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
                isDecoyMode={isDecoyMode}
                setIsDecoyMode={setIsDecoyMode}
              />
            )}

            {currentScreen === 'community_bulletin' && (
              <CommunityBulletinView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'sign_bridge' && (
              <SignLanguageBridgeView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'mesh_network' && (
              <OfflineMeshNetworkView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
                meshRouter={meshRouter}
              />
            )}

            {currentScreen === 'civic_report' && (
              <CivicReportView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
                reports={civicReports}
                onAddReport={handleAddCivicReport}
                onUpvoteReport={handleUpvoteCivicReport}
              />
            )}

            {currentScreen === 'settings' && (
              <SettingsView
                currentLanguage={currentLanguage}
                onBack={() => setCurrentScreen('home')}
                isMeshActive={isMeshActive}
                setIsMeshActive={setIsMeshActive}
              />
            )}
          </div>
        )}
      </main>

      {/* Quick Switch PIN Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        isDecoyMode={isDecoyMode}
        setIsDecoyMode={setIsDecoyMode}
        onOpenVaultView={() => {
          setIsAuthorityView(false);
          setCurrentScreen('decoy_pin');
        }}
      />
      {/* Logo & Emblem Designer Modal */}
      <LogoVisualizerModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
}

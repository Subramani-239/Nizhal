import { Language, ScamThreat, VoiceDeterrent } from '../types';

export const PRE_RECORDED_VOICE_DETERRENTS: VoiceDeterrent[] = [
  {
    id: 'det_01_cyber_crime',
    label: {
      en: 'Cyber Crime Recording Alert',
      ta: 'சைபர் கிரைம் பதிவு எச்சரிக்கை',
      te: 'సైబర్ క్రైమ్ రికార్డింగ్ హెచ్చరిక',
      ml: 'സൈബർ ക്രൈം റെക്കോർഡിംഗ് മുന്നറിയിപ്പ്',
      kn: 'ಸೈಬರ್ ಕ್ರೈಮ್ ರೆಕಾರ್ಡಿಂಗ್ ಎಚ್ಚರಿಕೆ',
    },
    audioTone: 'cyber_crime',
    durationSeconds: 7,
    transcript: {
      en: 'Notice: This telephone call and screen are being recorded and logged directly to the National Cyber Crime Portal (1930). Any attempt to defraud is punishable under the IT Act.',
      ta: 'கவனத்திற்கு: இந்த தொலைபேசி அழைப்பு மற்றும் திரை தேசிய சைபர் கிரைம் போர்ட்டலில் (1930) நேரடியாக பதிவு செய்யப்படுகிறது. மோசடி முயற்சிக்கு சட்டப்படி கடுமையான தண்டனை உண்டு.',
      te: 'గమనిక: ఈ టెలిఫోన్ కాల్ మరియు స్క్రీన్ నేషనల్ సైబర్ క్రైమ్ పోర్టల్ (1930) కు నేరుగా రికార్డ్ చేయబడుతోంది. మోసం చేస్తే కఠిన చర్యలు ఉంటాయి.',
      ml: 'ശ്രദ്ധിക്കുക: ഈ ഫോൺ കോൾ ദേശീയ സൈബർ ക്രൈം പോർട്ടലിൽ (1930) തത്സമയം റെക്കോർഡ് ചെയ്യപ്പെടുകയാണ്. തട്ടിപ്പ് നടത്തുന്നവർക്കെതിരെ കർശന നിയമനടപടി ഉണ്ടാകും.',
      kn: 'ಗಮನಿಸಿ: ಈ ಫೋನ್ ಕರೆಯನ್ನು ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ (1930) ನೇರವಾಗಿ ರೆಕಾರ್ಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ. ವಂಚನೆಗೆ ಕಠಿಣ ಶಿಕ್ಷೆ ಇದೆ.',
    },
  },
  {
    id: 'det_02_no_otp',
    label: {
      en: 'OTP & Banking Refusal Protocol',
      ta: 'OTP மற்றும் வங்கி விவரம் மறுப்பு',
      te: 'ఓటీపీ నిరాకరణ హెచ్చరిక',
      ml: 'ഒടിപി പങ്കിടില്ലെന്ന മുന്നറിയിപ്പ്',
      kn: 'ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳದಿರುವ ಎಚ್ಚರಿಕೆ',
    },
    audioTone: 'financial_fraud_alert',
    durationSeconds: 6,
    transcript: {
      en: 'Warning: As per Reserve Bank of India mandates, I will never share any OTP, PIN, or install any remote software. Disconnecting call now.',
      ta: 'எச்சரிக்கை: ரிசர்வ் வங்கியின் விதிமுறைகளின்படி, நான் எந்த ஒரு OTP, PIN அல்லது ரிமோட் செயலிகளையும் நிறுவவோ பகிரவோ மாட்டேன். அழைப்பைத் துண்டிக்கிறேன்.',
      te: 'హెచ్చరిక: రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా నిబంధనల ప్రకారం నేను ఎటువంటి ఓటీపీ, పిన్ లేదా యాప్‌లను ఇన్‌స్టాల్ చేయను. కాల్ ముగిస్తున్నాను.',
      ml: 'മുന്നറിയിപ്പ്: ആർ.ബി.ഐ നിർദ്ദേശപ്രകാരം ഞാൻ യാതൊരുവിധ ഒടിപിയോ പിൻ നമ്പറോ പങ്കിടില്ല, ആപ്പുകളും ഇൻസ്റ്റാൾ ചെയ്യില്ല. ഫോൺ കട്ട് ചെയ്യുന്നു.',
      kn: 'ಎಚ್ಚರಿಕೆ: ಆರ್‌ಬಿಐ ನಿಯಮಗಳ ಪ್ರಕಾರ ನಾನು ಯಾವುದೇ ಒಟಿಪಿ ಅಥವಾ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ. ಕರೆಯನ್ನು ಕೊನೆಗೊಳಿಸುತ್ತಿದ್ದೇನೆ.',
    },
  },
  {
    id: 'det_03_police_presence',
    label: {
      en: 'Legal Guardian & Police Station Check',
      ta: 'காவல் நிலைய சரிபார்ப்பு அறிவிப்பு',
      te: 'పోలీస్ స్టేషన్ చెక్ హెచ్చరిక',
      ml: 'പോലീസ് സ്റ്റേഷൻ സ്ഥിരീകരണ അറിയിപ്പ്',
      kn: 'ಪೊಲೀಸ್ ಠಾಣಾ ಪರಿಶೀಲನಾ ಎಚ್ಚರಿಕೆ',
    },
    audioTone: 'police_advisory',
    durationSeconds: 8,
    transcript: {
      en: 'Advisory: If this is a genuine law enforcement communication, please issue an official summons under Section 41A of CrPC. I will only appear in person at my local police station.',
      ta: 'அறிவிப்பு: இது உண்மையான சட்டப்பூர்வ அழைப்பாக இருந்தால், CrPC பிரிவு 41A இன் கீழ் எழுத்துப்பூர்வ சம்மன் அனுப்பவும். நான் நேரில் உள்ளூர் காவல் நிலையத்திற்கு மட்டுமே வருவேன்.',
      te: 'సమాచారం: ఇది చట్టపరమైన సంభాషణ అయితే సెక్షన్ 41A ప్రకారం అధికారిక నోటీసు పంపండి. నేను స్థానిక పోలీస్ స్టేషన్‌కు స్వయంగా వస్తాను.',
      ml: 'അറിയിപ്പ്: ഇത് നിയമപരമായ ആശയവിനിമയമാണെങ്കിൽ സി.ആർ.പി.സി സെക്ഷൻ 41A പ്രകാരം ഔദ്യോഗിക സമൻസ് അയക്കുക. ഞാൻ അടുത്തുള്ള പോലീസ് സ്റ്റേഷനിൽ നേരിട്ടെത്തും.',
      kn: 'ಸೂಚನೆ: ಇದು ಅಧಿಕೃತ ಕಾನೂನು ಕರೆ ಆಗಿದ್ದರೆ, ಸಿಆರ್‌ಪಿಸಿ ಸೆಕ್ಷನ್ 41A ಅಡಿಯಲ್ಲಿ ಅಧಿಕೃತ ಸಮನ್ಸ್ ಕಳುಹಿಸಿ. ನಾನು ಸ್ಥಳೀಯ ಪೊಲೀಸ್ ಠಾಣೆಗೆ ನೇರವಾಗಿ ಹಾಜರಾಗುತ್ತೇನೆ.',
    },
  },
  {
    id: 'det_04_screen_recording',
    label: {
      en: 'Anti-Screen Sharing Trap Alert',
      ta: 'திரை பகிர்வு மோசடி தடுப்பு ஒலி',
      te: 'స్క్రీన్ షేరింగ్ ట్రాప్ అలర్ట్',
      ml: 'സ്ക്രീൻ ഷെയറിംഗ് മുന്നറിയിപ്പ്',
      kn: 'ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಮೋಸ ಎಚ್ಚರಿಕೆ',
    },
    audioTone: 'cyber_crime',
    durationSeconds: 6,
    transcript: {
      en: 'Alert: AnyDesk, TeamViewer, or QuickSupport request detected. Screen sharing has been permanently disabled on this device for anti-fraud safety.',
      ta: 'எச்சரிக்கை: திரை பகிர்வு செயலிகள் இந்த மொபைலில் பாதுகாப்பு காரணங்களுக்காக முழுமையாக முடக்கப்பட்டுள்ளன.',
      te: 'హెచ్చరిక: భద్రతా కారణాల దృష్ట్యా ఈ ఫోన్‌లో స్క్రీన్ షేరింగ్ శాశ్వతంగా నిలిపివేయబడింది.',
      ml: 'മുന്നറിയിപ്പ്: സുരക്ഷാ കാരണങ്ങളാൽ ഈ ഫോണിൽ സ്ക്രീൻ ഷെയറിംഗ് പൂർണ്ണമായി ബ്ലോക്ക് ചെയ്തിരിക്കുന്നു.',
      kn: 'ಎಚ್ಚರಿಕೆ: ಭದ್ರತೆಯ ದೃಷ್ಟಿಯಿಂದ ಈ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಅನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ.',
    },
  },
  {
    id: 'det_05_courier_customs',
    label: {
      en: 'Fake Customs Parcel Refusal',
      ta: 'போலி சுங்கத்துறை பார்சல் மறுப்பு',
      te: 'నకిలీ కస్టమ్స్ పార్శిల్ తిరస్కరణ',
      ml: 'വ്യാജ കസ്റ്റംസ് പാർസൽ നിരസിക്കൽ',
      kn: 'ನಕಲಿ ಕಸ್ಟಮ್ಸ್ ಪಾರ್ಸೆಲ್ ನಿರಾಕರಣೆ',
    },
    audioTone: 'police_advisory',
    durationSeconds: 7,
    transcript: {
      en: 'Official Refusal: I have not ordered or dispatched any international courier or parcel containing contraband. Any unauthorized package is surrendered to state authorities.',
      ta: 'அதிகாரப்பூர்வ மறுப்பு: நான் எந்த ஒரு வெளிநாட்டு அல்லது தடைசெய்யப்பட்ட பார்சலையும் அனுப்பவில்லை. அத்தகைய பொருட்கள் இருந்தால் அரசிடம் ஒப்படைக்கவும்.',
      te: 'అధికారిక నిరాకరణ: నేను ఎటువంటి అంతర్జాతీయ పార్సిల్ పంపలేదు లేదా ఆర్డర్ చేయలేదు. ఎలాంటి తప్పుడు ప్యాకేజీలైనా ప్రభుత్వానికి అప్పగించబడతాయి.',
      ml: 'ഔദ്യോഗിക അറിയിപ്പ്: ഞാൻ ഒരു വിദേശ പാർസലും അയച്ചിട്ടില്ല. ഇതിനെക്കുറിച്ച് അന്വേഷിക്കാൻ ഞാൻ പോലീസിനെ സമീപിക്കുകയാണ്.',
      kn: 'ಅಧಿಕೃತ ನಿರಾಕರಣೆ: ನಾನು ಯಾವುದೇ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪಾರ್ಸೆಲ್ ಆರ್ಡರ್ ಮಾಡಿಲ್ಲ. ಅನುಮಾನಾಸ್ಪದ ಪಾರ್ಸೆಲ್ ಇದ್ದರೆ ಸರ್ಕಾರಕ್ಕೆ ಒಪ್ಪಿಸಿ.',
    },
  },
];

export function analyzeMessageThreat(text: string): ScamThreat {
  const lower = text.toLowerCase();

  // Test for high risk patterns
  if (lower.includes('fedex') || lower.includes('digital arrest') || lower.includes('cbi') || lower.includes('customs department')) {
    return {
      id: `threat_${Date.now()}`,
      type: 'call',
      riskLevel: 'HIGH',
      title: 'Digital Arrest / Impersonation Extortion Detected',
      pattern: 'Fake Law Enforcement & Customs Parcel Threat',
      detectedText: text,
      recommendedVoiceDeterrentId: 'det_01_cyber_crime',
      explanation: {
        en: 'Scammers are threatening you with illegal parcel or digital arrest to extort huge sums. Police never call on video or demand money.',
        ta: 'போலி காவல்துறை மற்றும் சுங்கத்துறை பெயரில் மிரட்டி பணம் பறிக்கும் அபாயகரமான மோசடி.',
        te: 'పోలీసులు లేదా కస్టమ్స్ పేరుతో బెదిరించి డబ్బు వసూలు చేసే తీవ్రమైన మోసం.',
        ml: 'പോലീസിന്റെയോ കസ്റ്റംസിന്റെയോ പേരിൽ ഭീഷണിപ്പെടുത്തി പണം തട്ടുന്ന തന്ത്രം.',
        kn: 'ಪೊಲೀಸ್ ಅಥವಾ ಕಸ್ಟಮ್ಸ್ ಹೆಸರಿನಲ್ಲಿ ಬೆದರಿಸಿ ಹಣ ವಸೂಲಿ ಮಾಡುವ ಅಪಾಯಕಾರಿ ವಂಚನೆ.',
      },
    };
  }

  if (lower.includes('quicksupport') || lower.includes('.apk') || lower.includes('anydesk') || lower.includes('update kyc')) {
    return {
      id: `threat_${Date.now()}`,
      type: 'apk',
      riskLevel: 'HIGH',
      title: 'Malicious APK / Screen Hijack Attack',
      pattern: 'Remote Access Trojan (RAT) Installation Lure',
      detectedText: text,
      recommendedVoiceDeterrentId: 'det_04_screen_recording',
      explanation: {
        en: 'The sender wants you to install a screen-mirroring app or dangerous APK that will read your banking OTPs silently.',
        ta: 'உங்கள் மொபைல் திரையைப் பார்த்து வங்கிக் கடவுச்சொல்லை திருடும் ஆபத்தான செயலி இது.',
        te: 'మీ బ్యాంకింగ్ ఓటీపీలను దొంగిలించడానికి స్క్రీన్ షేరింగ్ యాప్‌ను ఇన్‌స్టాల్ చేయిస్తున్నారు.',
        ml: 'നിങ്ങളുടെ ബാങ്കിംഗ് രഹസ്യങ്ങൾ ചോർത്താൻ ലക്ഷ്യമിട്ടുള്ള വ്യാജ ആപ്പ് ലിങ്കാണിത്.',
        kn: 'ನಿಮ್ಮ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಕದಿಯಲು ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಪ್ರೇರೇಪಿಸುತ್ತಿದ್ದಾರೆ.',
      },
    };
  }

  if (lower.includes('power cut') || lower.includes('electricity') || lower.includes('bill not updated') || lower.includes('tangedco')) {
    return {
      id: `threat_${Date.now()}`,
      type: 'sms',
      riskLevel: 'HIGH',
      title: 'Electricity Disconnection Phishing',
      pattern: 'Fake Utility Disconnection Panic Scam',
      detectedText: text,
      recommendedVoiceDeterrentId: 'det_02_no_otp',
      explanation: {
        en: 'Impersonating state electricity distribution company. Official boards never ask to dial private mobile numbers.',
        ta: 'மின்வாரியத்தின் பெயரைப் பயன்படுத்தி நுகர்வோரை ஏமாற்றி பணம் பறிக்கும் மோசடி.',
        te: 'విద్యుత్ సంస్థ పేరుతో భయాందోళన సృష్టించి మోసం చేసే ప్రయత్నం.',
        ml: 'വൈദ്യുതി ബിൽ മുടങ്ങിയെന്ന് പറഞ്ഞ് പണം തട്ടുന്ന വ്യാജ സന്ദേശം.',
        kn: 'ವಿದ್ಯುತ್ ಕಡಿತದ ಸುಳ್ಳು ಬೆದರಿಕೆ ಹಾಕಿ ಹಣ ಲೂಟಿ ಮಾಡುವ ಪ್ರಯತ್ನ.',
      },
    };
  }

  // Medium / low risk
  if (lower.includes('part-time') || lower.includes('telegram') || lower.includes('daily earn') || lower.includes('work from home')) {
    return {
      id: `threat_${Date.now()}`,
      type: 'whatsapp',
      riskLevel: 'MEDIUM',
      title: 'Prepaid Task / Job Fraud Lure',
      pattern: 'Ponzi Investment & Telegram Task Trap',
      detectedText: text,
      recommendedVoiceDeterrentId: 'det_02_no_otp',
      explanation: {
        en: 'Begins with paying small amounts for YouTube likes, then traps you into depositing lakhs into crypto/fake merchant portals.',
        ta: 'ஆரம்பத்தில் சிறு தொகை கொடுத்து பின்னர் லட்சக்கணக்கில் முதலீடு செய்ய வைத்து ஏமாற்றும் பகுதிநேர வேலை மோசடி.',
        te: 'మొదట్లో చిన్న మొత్తాలు ఇచ్చి, తర్వాత పెద్ద మొత్తంలో డబ్బు లాగే పార్ట్ టైమ్ జాబ్ మోసం.',
        ml: 'യൂട്യൂബ് ലൈക്കിംഗിലൂടെ പണം സമ്പാദിക്കാമെന്ന് പറഞ്ഞ് ലക്ഷങ്ങൾ തട്ടിയെടുക്കുന്ന കെണി.',
        kn: 'ಆರಂಭದಲ್ಲಿ ಕಡಿಮೆ ಹಣ ನೀಡಿ ನಂತರ ಲಕ್ಷಾಂತರ ರೂಪಾಯಿ ವಂಚಿಸುವ ಅರೆಕಾಲಿಕ ಉದ್ಯೋಗ ಜಾಲ.',
      },
    };
  }

  return {
    id: `threat_${Date.now()}`,
    type: 'link',
    riskLevel: 'LOW',
    title: 'Unverified Message: Low Risk Patterns',
    pattern: 'General Communication with No Explicit Threat Signature',
    detectedText: text,
    recommendedVoiceDeterrentId: 'det_02_no_otp',
    explanation: {
      en: 'No known malicious signature detected in our threat database. Always stay cautious when sharing confidential details.',
      ta: 'அறியப்பட்ட அச்சுறுத்தல்கள் ஏதும் கண்டறியப்படவில்லை. தனிப்பட்ட தகவல்களைப் பகிரும்போது எப்போதும் கவனமாக இருங்கள்.',
      te: 'ఎలాంటి సైబర్ ముప్పు గుర్తులు కనిపించలేదు. వ్యక్తిగత వివరాలను జాగ్రత్తగా ఉంచుకోండి.',
      ml: 'ഭീഷണികളൊന്നും കണ്ടെത്തിയില്ല. എന്നിരുന്നാലും സ്വകാര്യ വിവരങ്ങൾ കൈമാറുമ്പോൾ ശ്രദ്ധിക്കുക.',
      kn: 'ಯಾವುದೇ ಬೆದರಿಕೆ ಕಂಡುಬಂದಿಲ್ಲ. ಆದರೂ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವಾಗ ಎಚ್ಚರವಿರಲಿ.',
    },
  };
}

import { FactCheckResult, Language, VerdictType } from '../types';

export const KNOWN_FACT_CHECK_DATABASE: FactCheckResult[] = [
  {
    id: 'fc_001',
    query: 'digital arrest cbi parcel fedex courier mumbai crime branch skype video call',
    verdict: 'FAKE_SCAM',
    confidence: 0.99,
    title: 'Severe Scam: Fake "Digital Arrest" & Police Courier Extortion',
    category: 'financial_scam',
    verifiedSource: 'Indian Cyber Crime Coordination Centre (I4C), MHA & South State Police Advisories',
    matchedKeywords: ['digital arrest', 'fedex', 'cbi', 'customs', 'mumbai crime branch', 'skype', 'escrow'],
    dateReported: '2026-10-15',
    explanation: {
      en: '🚨 CRITICAL FRAUD ALERT: Police, CBI, and Customs NEVER arrest anyone on Skype or WhatsApp video call. There is NO legal term called "Digital Arrest" under Indian Law. Never transfer money to any "RBI verification account". Disconnect immediately and dial 1930.',
      ta: '🚨 மிக அபாயகரமான மோசடி: காவல்துறை, சிபிஐ அல்லது சுங்கத்துறை ஒருபோதும் வாட்ஸ்அப் அல்லது ஸ்கைப் வீடியோ காலில் யாரையும் கைது செய்யாது. இந்திய சட்டத்தில் "டிஜிட்டல் அரெஸ்ட்" என்ற சட்டப்பிரிவே கிடையாது. உடனே இணைப்பைத் துண்டித்து 1930 எண்ணை அழையுங்கள்.',
      te: '🚨 తీవ్రమైన మోసం హెచ్చరిక: పోలీసులు, సీబీఐ లేదా కస్టమ్స్ ఎవరినీ వాట్సాప్ లేదా స్కైప్ వీడియో కాల్ ద్వారా అరెస్టు చేయరు. భారత చట్టంలో "డిజిటల్ అరెస్ట్" లేదు. ఎట్టి పరిస్థితుల్లోనూ డబ్బు బదిలీ చేయవద్దు. వెంటనే 1930కి ఫిర్యాదు చేయండి.',
      ml: '🚨 അതീവ ജാഗ്രത: പോലീസോ സിബിഐയോ കസ്റ്റംസോ ഒരിക്കലും വാട്ട്സ്ആപ്പ് അല്ലെങ്കിൽ സ്കൈപ്പ് വീഡിയോ കോളിലൂടെ ആരെയും അറസ്റ്റ് ചെയ്യില്ല. നിയമത്തിൽ "ഡിജിറ്റൽ അറസ്റ്റ്" എന്നൊരു കാര്യമില്ല. ഉടൻ 1930-ൽ വിളിച്ച് പരാതിപ്പെടുക.',
      kn: '🚨 ಗಂಭೀರ ವಂಚನೆ ಎಚ್ಚರಿಕೆ: ಪೊಲೀಸರು, ಸಿಬಿಐ ಅಥವಾ ಕಸ್ಟಮ್ಸ್ ಎಂದಿಗೂ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಸ್ಕೈಪ್ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಯಾರನ್ನೂ ಬಂಧಿಸುವುದಿಲ್ಲ. ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಎಂಬ ಪರಿಕಲ್ಪನೆಯೇ ಇಲ್ಲ. ತಕ್ಷಣ 1930 ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
    },
    safeActionAdvised: {
      en: 'Hang up right now. Block the caller. Report to cybercrime.gov.in or dial 1930 national cyber helpline.',
      ta: 'உடனே அழைப்பைத் துண்டிக்கவும். எண்ணைத் தடுக்கவும் (Block). தேசிய சைபர் கிரைம் உதவி எண் 1930 ஐ அழைக்கவும்.',
      te: 'వెంటనే కాల్ కట్ చేయండి. నంబర్‌ను బ్లాక్ చేయండి. 1930 జాతీయ సైబర్ హెల్ప్‌లైన్‌కు కాల్ చేయండి.',
      ml: 'ഇപ്പോൾ തന്നെ ഫോൺ കട്ട് ചെയ്യുക. നമ്പർ ബ്ലോക്ക് ചെയ്യുക. 1930 സൈബർ ഹെൽപ്പ്‌ലൈനിൽ വിളിക്കുക.',
      kn: 'ಕೂಡಲೇ ಕಾಲ್ ಕಟ್ ಮಾಡಿ. ನಂಬರ್ ಬ್ಲಾಕ್ ಮಾಡಿ. 1930 ಸೈಬರ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.',
    },
  },
  {
    id: 'fc_002',
    query: 'electricity power cut bill update tangedco bescom kseb call officer quicksupport apk',
    verdict: 'FAKE_SCAM',
    confidence: 0.98,
    title: 'Phishing Scam: Fake Electricity Bill Disconnection Message',
    category: 'financial_scam',
    verifiedSource: 'TANGEDCO (Tamil Nadu), BESCOM (Karnataka), KSEB (Kerala) Consumer Safety Alerts',
    matchedKeywords: ['electricity', 'power cut', 'tonight', 'bill update', 'tangedco', 'bescom', 'kseb', 'apk'],
    dateReported: '2026-11-01',
    explanation: {
      en: '⚠️ FAKE NOTICE: Electricity boards (TANGEDCO, BESCOM, KSEB, APCPDCL) never send SMS from personal 10-digit mobile numbers asking you to call an officer or download an APK file to prevent power cutoff. This is designed to empty your bank account through screen-sharing.',
      ta: '⚠️ போலி எச்சரிக்கை: மின்சார வாரியம் (TANGEDCO) தனிப்பட்ட மொபைல் எண்களிலிருந்து மின்சாரம் துண்டிக்கப்படும் என்று மெசேஜ் அனுப்பாது. எந்த APK செயலியையும் தரவிறக்க வேண்டாம்.',
      te: '⚠️ నకిలీ మెసేజ్: విద్యుత్ సంస్థలు వ్యక్తిగత 10 అంకెల నంబర్ల నుండి ఇలాంటి మెసేజ్లు పంపవు. ఏ యాప్‌ను కూడా డౌన్‌లోడ్ చేయవద్దు.',
      ml: '⚠️ വ്യാജ സന്ദേശം: കെ.എസ്.ഇ.ബി വ്യക്തിഗത മൊബൈൽ നമ്പറുകളിൽ നിന്ന് ഇത്തരം മെസ്സേജുകൾ അയക്കില്ല. ബാങ്ക് തട്ടിപ്പ് തടയാൻ ഒരു ആപ്പും ഇൻസ്റ്റാൾ ചെയ്യരുത്.',
      kn: '⚠️ ನಕಲಿ ಸಂದೇಶ: ಬೆಸ್ಕಾಂ ಅಥವಾ ವಿದ್ಯುತ್ ನಿಗಮಗಳು ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳಿಂದ ಇಂತಹ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ. ಯಾವುದೇ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ.',
    },
    safeActionAdvised: {
      en: 'Pay bills only through the official board portal or authorized BBPS apps. Never install AnyDesk or QuickSupport.',
      ta: 'அரசு அதிகாரப்பூர்வ இணையதளம் அல்லது மின்சார வாரிய செயலி வழியாக மட்டுமே கட்டணம் செலுத்தவும்.',
      te: 'అధికారిక వెబ్‌సైట్ లేదా అధికారిక యాప్ ద్వారా మాత్రమే బిల్లులు చెల్లించండి.',
      ml: 'കെ.എസ്.ഇ.ബിയുടെ ഔദ്യോഗിക പോർട്ടൽ വഴി മാത്രം ബിൽ അടയ്ക്കുക.',
      kn: 'ಕೇವಲ ಅಧಿಕೃತ ಬೆಸ್ಕಾಂ ಪೋರ್ಟಲ್ ಅಥವಾ BBPS ಆ್ಯಪ್ ಮೂಲಕ ಮಾತ್ರ ಬಿಲ್ ಪಾವತಿಸಿ.',
    },
  },
  {
    id: 'fc_003',
    query: 'free recharge jio airtel diwali festival government scheme link claim cash 5000',
    verdict: 'FAKE_SCAM',
    confidence: 0.97,
    title: 'Malware Lure: Fake Free Recharge / Government Cash Bonus Scheme',
    category: 'government_hoax',
    verifiedSource: 'PIB Fact Check & South Telecom Regulatory Authority',
    matchedKeywords: ['free recharge', 'diwali gift', 'claim 5000', 'whatsapp forward', 'win free'],
    dateReported: '2026-10-28',
    explanation: {
      en: '🛑 FALSE HOAX: Neither telecom operators nor central/state governments provide free 3-month recharges or unannounced cash via random web links. Clicking downloads malicious adware and steals contacts.',
      ta: '🛑 வதந்தி: மத்திய/மாநில அரசுகளோ அல்லது தொலைத்தொடர்பு நிறுவனங்களோ வாட்ஸ்அப் இணைப்பு வழியாக இலவச ரீசார்ஜ் வழங்குவதில்லை. இதை மற்றவர்களுக்கு பகிராதீர்கள்.',
      te: '🛑 నకిలీ సమాచారం: టెలికాం కంపెనీలు లేదా ప్రభుత్వాలు ఉచిత రీఛార్జ్ లింక్‌లను పంపవు. ఈ లింక్‌లను ఇతరులకు ఫార్వర్డ్ చేయవద్దు.',
      ml: '🛑 വ്യാജ പ്രചാരണം: ടെലികോം കമ്പനികളോ സർക്കാരോ സൗജന്യ റീചാർജ് ലിങ്കുകൾ വാട്സാപ്പിൽ അയക്കില്ല. ഇത് ക്ലിക്ക് ചെയ്യരുത്.',
      kn: '🛑 ಸುಳ್ಳು ವದಂತಿ: ಯಾವುದೇ ಸರ್ಕಾರ ಅಥವಾ ಟೆಲಿಕಾಂ ಕಂಪನಿಗಳು ಉಚಿತ ರೀಚಾರ್ಜ್ ಲಿಂಕ್‌ಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ. ಇತರರಿಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಬೇಡಿ.',
    },
    safeActionAdvised: {
      en: 'Do not click or forward. Check genuine offers inside official MyJio or Airtel Thanks apps only.',
      ta: 'இணைப்பைத் தொட வேண்டாம். அதிகாரப்பூர்வ செயலிகளில் மட்டுமே சலுகைகளை சரிபார்க்கவும்.',
      te: 'లింక్ పై క్లిక్ చేయకండి. అధికారిక యాప్‌లో మాత్రమే చెక్ చేసుకోండి.',
      ml: 'ലിങ്കുകളിൽ ക്ലിക്ക് ചെയ്യരുത്. ഔദ്യോഗിക ആപ്പിൽ മാത്രം പരിശോധിക്കുക.',
      kn: 'ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ಅಧಿಕೃತ ಆಪ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
    },
  },
  {
    id: 'fc_004',
    query: 'urgent rare o negative blood required child hospital contact emergency forward',
    verdict: 'UNVERIFIED',
    confidence: 0.75,
    title: 'Outdated or Unverified Blood Donation Forward Chain',
    category: 'health_myth',
    verifiedSource: 'State Blood Transfusion Councils & Red Cross India',
    matchedKeywords: ['o negative', 'urgent blood', 'child hospital', 'icu', 'forward to groups'],
    dateReported: '2026-09-12',
    explanation: {
      en: '⚠️ UNVERIFIED / COMMONLY EXPIRED: Over 90% of WhatsApp blood appeal forwards are years old or have incorrect contact numbers. Calling unknown numbers can lead to spam or emotional fraud. Use official e-RaktKosh portal for real-time blood availability.',
      ta: '⚠️ சரிபார்க்கப்படாத தகவல்: வாட்ஸ்அப்பில் பரவும் பெரும்பாலான ரத்த தான செய்திகள் பல வருடங்களுக்கு முந்தையவை அல்லது தவறான எண்களை கொண்டவை. அரசின் e-RaktKosh இணையதளத்தை பயன்படுத்தவும்.',
      te: '⚠️ ధృవీకరించబడని సందేశం: రక్తదానం గురించిన చాలా వాట్సాప్ సందేశాలు పాతవి లేదా నకిలీవి. అధికారిక e-RaktKosh పోర్టల్‌ను మాత్రమే సంప్రదించండి.',
      ml: '⚠️ സ്ഥിരീകരിക്കാത്തത്: വാട്സാപ്പിൽ വരുന്ന രക്തദാന സന്ദേശങ്ങളിൽ ഭൂരിഭാഗവും വർഷങ്ങൾ പഴക്കമുള്ളതാണ്. ഔദ്യോഗിക ബ്ലഡ് ബാങ്കുമായി മാത്രം ബന്ധപ്പെടുക.',
      kn: '⚠️ ದೃಢೀಕರಿಸದ ಮಾಹಿತಿ: ವಾಟ್ಸಾಪ್ ರಕ್ತದಾನ ಸಂದೇಶಗಳಲ್ಲಿ ಹೆಚ್ಚಿನವು ಹಳೆಯವು ಅಥವಾ ನಕಲಿ. ಅಧಿಕೃತ e-RaktKosh ತಾಣವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    },
    safeActionAdvised: {
      en: 'Verify with the hospital blood bank directly or check the National Blood Portal (eraktkosh.in).',
      ta: 'மருத்துவமனையை நேரடியாக தொடர்பு கொண்டு உறுதி செய்யவும் அல்லது eraktkosh.in பார்க்கவும்.',
      te: 'ఆసుపత్రి బ్లడ్ బ్యాంక్‌ను నేరుగా సంప్రదించండి లేదా eraktkosh.in చూడండి.',
      ml: 'ആശുപത്രിയിലെ ബ്ലഡ് ബാങ്കുമായി നേരിട്ട് ബന്ധപ്പെടുക.',
      kn: 'ಆಸ್ಪತ್ರೆಯ ಬ್ಲಡ್ ಬ್ಯಾಂಕ್ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ ಅಥವಾ eraktkosh.in ನೋಡಿ.',
    },
  },
  {
    id: 'fc_005',
    query: 'imd red alert heavy rain cyclonic storm flood holiday announced school college district collector',
    verdict: 'AUTHENTIC',
    confidence: 0.94,
    title: 'Verified Advisory: Weather Bulletin & Official Holiday Protocols',
    category: 'authentic_news',
    verifiedSource: 'India Meteorological Department (IMD Chennai/Bengaluru/Thiruvananthapuram) & District Collectorate',
    matchedKeywords: ['red alert', 'heavy rain', 'collector', 'holiday', 'imd', 'cyclone'],
    dateReported: '2026-11-10',
    explanation: {
      en: '✅ VERIFIED PROTOCOL: Severe weather advisories and school holidays are officially issued through the District Collector’s verified handle (@DistrictCollector) and Disaster Management Authority (TNDMA, KSDMA).',
      ta: '✅ அதிகாரப்பூர்வ அறிவிப்பு: கனமழை மற்றும் பள்ளி விடுமுறை குறித்த தகவல்கள் மாவட்ட ஆட்சியரின் அதிகாரப்பூர்வ சமூகவலைதள பக்கத்தில் மட்டுமே உறுதி செய்யப்படுகின்றன.',
      te: '✅ ధృవీకరించబడిన సమాచారం: వర్షాలు మరియు సెలవుల సమాచారం జిల్లా కలెక్టర్ అధికారిక ఖాతా ద్వారా మాత్రమే నిర్ధారించబడుతుంది.',
      ml: '✅ സ്ഥിരീകരിച്ച വിവരം: മഴക്കെടുതിയും അവധിയും സംബന്ധിച്ച വിവരങ്ങൾ ജില്ലാ കളക്ടറുടെ ഔദ്യോഗിക പേജിലൂടെ മാത്രം പരിശോധിക്കുക.',
      kn: '✅ ದೃಢೀಕರಿಸಿದ ಮಾಹಿತಿ: ಭಾರಿ ಮಳೆ ಮತ್ತು ರಜೆಯ ಘೋಷಣೆಯನ್ನು ಜಿಲ್ಲಾಧಿಕಾರಿಗಳ ಅಧಿಕೃತ ಪುಟದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
    },
    safeActionAdvised: {
      en: 'Follow State Disaster Management Authority guidelines and keep emergency contacts ready.',
      ta: 'மாநில பேரிடர் மேலாண்மை ஆணையத்தின் வழிகாட்டுதல்களைப் பின்பற்றவும்.',
      te: 'రాష్ట్ర విపత్తు నిర్వహణ సంస్థ మార్గదర్శకాలను పాటించండి.',
      ml: 'സംസ്ഥാന ദുരന്ത നിവാരണ അതോറിറ്റിയുടെ നിർദ്ദേശങ്ങൾ പാലിക്കുക.',
      kn: 'ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಪ್ರಾಧಿಕಾರದ ಮಾರ್ಗದರ್ಶನಗಳನ್ನು ಪಾಲಿಸಿ.',
    },
  },
];

export function verifyWhatsAppMessage(input: string): FactCheckResult {
  const normalized = input.toLowerCase();

  // Keyword scoring
  let bestMatch: FactCheckResult | null = null;
  let highestScore = 0;

  for (const item of KNOWN_FACT_CHECK_DATABASE) {
    let score = 0;
    for (const kw of item.matchedKeywords) {
      if (normalized.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    const queryWords = item.query.split(' ');
    for (const qw of queryWords) {
      if (qw.length > 3 && normalized.includes(qw)) {
        score += 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // If score is substantial, return the matched verified fact-check
  if (bestMatch && highestScore >= 3) {
    return bestMatch;
  }

  // Check general heuristics for scams
  const scamIndicators = [
    'urgent', 'lottery', 'winner', 'otp', 'pin', 'bank account blocked',
    'kyc pending', 'click here', 'bit.ly', 'telegram', 'earn daily', 'part time job',
    'double money', 'gift voucher', 'gold coin', 'apk',
  ];

  let scamHits = 0;
  for (const indicator of scamIndicators) {
    if (normalized.includes(indicator)) scamHits++;
  }

  if (scamHits >= 2) {
    return {
      id: `dyn_scam_${Date.now()}`,
      query: input.slice(0, 50),
      verdict: 'FAKE_SCAM',
      confidence: 0.88,
      title: 'Potential Cyber Threat / Unsolicited Financial Lure',
      category: 'financial_scam',
      verifiedSource: 'Nizhal AI Behavioral Security Shield',
      matchedKeywords: scamIndicators.filter(i => normalized.includes(i)),
      dateReported: new Date().toISOString().split('T')[0],
      explanation: {
        en: '⚠️ SUSPICIOUS PATTERN DETECTED: This message uses high-urgency language, unverified external links, or financial promises typical of digital scams. Do NOT click any links, do not share OTP, and do not send money.',
        ta: '⚠️ சந்தேகத்திற்கிடமான மெசேஜ்: இது அவசரப்படுத்தும் வார்த்தைகள் அல்லது போலியான பண ஆசையை காட்டி ஏமாற்றும் தந்திரங்களைக் கொண்டுள்ளது. எந்த இணைப்பையும் தொடாதீர்கள்.',
        te: '⚠️ అనుమానాస్పద సందేశం: ఈ సందేశంలో మోసపూరిత లింకులు మరియు అత్యవసర పదాలు ఉన్నాయి. ఏ లింక్‌ను నొక్కకండి మరియు ఓటీపీని ఎవరితోనూ పంచుకోవద్దు.',
        ml: '⚠️ സംശയാസ്പദമായ സന്ദേശം: പണം തട്ടിയെടുക്കാൻ ലക്ഷ്യമിട്ടുള്ള തട്ടിപ്പ് രീതിയാണിത്. ഒരു ലിങ്കിലും ക്ലിക്ക് ചെയ്യരുത്, ഒടിപി നൽകരുത്.',
        kn: '⚠️ ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶ: ಹಣದ ಆಮಿಷ ಅಥವಾ ತುರ್ತು ಒತ್ತಡದ ಪದಗಳನ್ನು ಬಳಸುವ ವಂಚನೆ ಇದಾಗಿದೆ. ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.',
      },
      safeActionAdvised: {
        en: 'Verify directly with the entity by visiting their official branch or official website. Never use phone numbers inside suspicious messages.',
        ta: 'சம்பந்தப்பட்ட நிறுவனத்தின் அதிகாரப்பூர்வ கிளை அல்லது வலைத்தளத்தில் மட்டுமே சரிபார்க்கவும்.',
        te: 'సంబంధిత సంస్థ యొక్క అధికారిక వెబ్‌సైట్ ద్వారా మాత్రమే సరిచూసుకోండి.',
        ml: 'ഔദ്യോഗിക വെബ്സൈറ്റിലൂടെ മാത്രം വിവരങ്ങൾ അന്വേഷിക്കുക.',
        kn: 'ಸಂಬಂಧಪಟ್ಟ ಸಂಸ್ಥೆಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ಮಾತ್ರ ಪರಿಶೀಲಿಸಿ.',
      },
    };
  }

  // Fallback to unverified with safety guidance
  return {
    id: `dyn_unverified_${Date.now()}`,
    query: input.slice(0, 50),
    verdict: 'UNVERIFIED',
    confidence: 0.65,
    title: 'Unverified Message: Awaiting Official Fact-Check Corroboration',
    category: 'communal_rumor',
    verifiedSource: 'Nizhal Public Safety Verification Engine',
    matchedKeywords: [],
    dateReported: new Date().toISOString().split('T')[0],
    explanation: {
      en: 'ℹ️ UNVERIFIED: This message has not been authenticated by certified fact-checkers or state government gazettes. Exercise caution before forwarding to family or community WhatsApp groups.',
      ta: 'ℹ️ சரிபார்க்கப்படாத செய்தி: இந்த தகவல் இன்னும் அரசின் அதிகாரப்பூர்வ பதிவேடுகளில் உறுதி செய்யப்படவில்லை. குடும்பத்தினர் அல்லது பொது குழுக்களுக்கு பகிர வேண்டாம்.',
      te: 'ℹ️ ధృవీకరించబడలేదు: ఈ సమాచారం ఇంకా అధికారికంగా నిర్ధారించబడలేదు. వాట్సాప్ గ్రూపులలో ఫార్వర్డ్ చేయవద్దు.',
      ml: 'ℹ️ സ്ഥിരീകരിക്കാത്ത വാർത്ത: ഈ വാർത്ത ഔദ്യോഗികമായി സ്ഥിരീകരിച്ചിട്ടില്ല. കുടുംബ ഗ്രൂപ്പുകളിൽ ഷെയർ ചെയ്യരുത്.',
      kn: 'ℹ️ ದೃಢೀಕರಿಸದ ಮಾಹಿತಿ: ಈ ಮಾಹಿತಿಯು ಅಧಿಕೃತ ಮೂಲಗಳಿಂದ ದೃಢಪಟ್ಟಿಲ್ಲ. ವಾಟ್ಸಾಪ್ ಗುಂಪುಗಳಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
    },
    safeActionAdvised: {
      en: 'Cross-check with credible local daily newspapers or PIB Fact Check before trusting.',
      ta: 'நம்பகமான நாளிதழ்கள் அல்லது PIB Fact Check மூலம் உறுதி செய்து கொள்ளவும்.',
      te: 'విశ్వసనీయ వార్తాపత్రికలు లేదా అధికారిక వెబ్‌సైట్లలో తనిఖీ చేయండి.',
      ml: 'വിശ്വസനീയമായ പത്രങ്ങളിലോ ഔദ്യോഗിക വെബ്സൈറ്റിലോ പരിശോധിക്കുക.',
      kn: 'ವಿಶ್ವಾಸಾರ್ಹ ದಿನಪತ್ರಿಕೆಗಳು ಅಥವಾ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
    },
  };
}

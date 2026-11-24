import { Language, Scheme, SouthState } from '../types';

export const COMPREHENSIVE_SCHEMES_DATABASE: Scheme[] = [
  // TAMIL NADU
  {
    id: 'tn_magalir_urimai',
    name: {
      en: 'Kalaignar Magalir Urimai Thogai Thittam',
      ta: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
      te: 'కలైంజర్ మహిళా హక్కు పథకం',
      ml: 'കലൈഞ്ജർ മഗളിർ ഉരിമൈ തിട്ടം',
      kn: 'ಕಲೈಂಜರ್ ಮಹಿಳಾ ಹಕ್ಕು ಯೋಜನೆ',
    },
    state: 'Tamil Nadu',
    department: 'Special Programme Implementation Dept, TN',
    targetGroup: 'Women Heads of Families',
    minAge: 21,
    maxAge: 70,
    maxAnnualIncome: 250000,
    applicableGenders: ['female', 'transgender'],
    category: 'women',
    benefitsSummary: {
      en: 'Monthly financial assistance of ₹1,000 directly credited via DBT to female heads of eligible households.',
      ta: 'குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 நேரடி வங்கிப் பரிமாற்றம் மூலம் வழங்கப்படுகிறது.',
      te: 'అర్హులైన మహిళా కుటుంబ పెద్దలకు నెలకు ₹1,000 నేరుగా బ్యాంకు ఖాతాలో జమ.',
      ml: 'അർഹരായ കുടുംബനാഥകൾക്ക് പ്രതിമാസം ₹1,000 ബാങ്ക് അക്കൗണ്ടിലേക്ക് നൽകുന്നു.',
      kn: 'ಅರ್ಹ ಮಹಿಳಾ ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರಿಗೆ ತಿಂಗಳಿಗೆ ₹1,000 ನೇರ ಬ್ಯಾಂಕ್ ಜಮೆ.',
    },
    documentsRequired: [
      {
        en: 'Smart Family Ration Card (PHH / NPHH)',
        ta: 'ஸ்மார்ட் குடும்ப அட்டை',
        te: 'స్మార్ట్ రేషన్ కార్డు',
        ml: 'സ്മാർട്ട് റേഷൻ കാർഡ്',
        kn: 'ಸ್ಮಾರ್ಟ್ ರೇಷನ್ ಕಾರ್ಡ್',
      },
      {
        en: 'Aadhaar Card linked with Bank Account',
        ta: 'வங்கி கணக்குடன் இணைக்கப்பட்ட ஆதார் எண்',
        te: 'బ్యాంకుతో లింక్ అయిన ఆధార్ కార్డు',
        ml: 'ബാങ്കുമായി ബന്ധിപ്പിച്ച ആധാർ കാർഡ്',
        kn: 'ಬ್ಯಾಂಕ್ ಲಿಂಕ್ ಆದ ಆಧಾರ್ ಕಾರ್ಡ್',
      },
      {
        en: 'Electricity Bill Receipt (TANGEDCO)',
        ta: 'மின் கட்டண ரசீது',
        te: 'విద్యుత్ బిల్లు రసీదు',
        ml: 'വൈദ്യുതി ബിൽ രസീത്',
        kn: 'ವಿದ್ಯುತ್ ಬಿಲ್ ರಸೀದಿ',
      },
    ],
    officialPortalUrl: 'https://kmut.tn.gov.in',
    directHelpline: '044-25619208',
  },
  {
    id: 'tn_moovalur_pudhumai_penn',
    name: {
      en: 'Moovalur Ramamirtham Ammaiyar Pudhumai Penn Thittam',
      ta: 'புதுமைப் பெண் திட்டம்',
      te: 'పుదుమై పెన్ పథకం',
      ml: 'പുതുമൈ പെൺ തിട്ടം',
      kn: 'ಪುದುಮೈ ಪೆಣ್ ಯೋಜನೆ',
    },
    state: 'Tamil Nadu',
    department: 'Social Welfare & Women Empowerment Dept',
    targetGroup: 'Girls graduating from Government Schools',
    minAge: 17,
    maxAge: 26,
    maxAnnualIncome: 0, // open to all govt school girls
    applicableGenders: ['female', 'transgender'],
    category: 'student',
    benefitsSummary: {
      en: '₹1,000 monthly allowance until undergraduate degree/diploma completion to prevent dropout of female students.',
      ta: 'அரசுப் பள்ளிகளில் பயின்று உயர்கல்வி சேரும் மாணவிகளுக்கு மாதம் ₹1,000 கல்வி உதவித்தொகை.',
      te: 'ప్రభుత్వ పాఠశాలల్లో చదివి ఉన్నత విద్యను అభ్యసించే బాలికలకు నెలకు ₹1,000 సహాయం.',
      ml: 'സർക്കാർ സ്കൂളുകളിൽ പഠിച്ച പെൺകുട്ടികൾക്ക് ഉന്നത വിദ്യാഭ്യാസത്തിന് പ്രതിമാസം ₹1,000.',
      kn: 'ಸರ್ಕಾರಿ ಶಾಲೆಯಲ್ಲಿ ಓದಿ ಉನ್ನತ ಶಿಕ್ಷಣ ಪಡೆಯುವ ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ ತಿಂಗಳಿಗೆ ₹1,000.',
    },
    documentsRequired: [
      {
        en: '6th to 12th Govt School Study Certificates (EMIS)',
        ta: '6 முதல் 12-ம் வகுப்பு அரசுப் பள்ளி பயின்ற சான்றிதழ் (EMIS)',
        te: '6 నుండి 12వ తరగతి ప్రభుత్వ పాఠశాల ధృవీకరణ పత్రం',
        ml: '6 മുതൽ 12 വരെ സർക്കാർ സ്കൂൾ പഠന സർട്ടിഫിക്കറ്റ്',
        kn: '6 ರಿಂದ 12 ನೇ ತರಗತಿ ಸರ್ಕಾರಿ ಶಾಲಾ ಪ್ರಮಾಣಪತ್ರ',
      },
      {
        en: 'College Admission Letter & Student Bank Passbook',
        ta: 'கல்லூரி சேர்க்கை ஆவணம் மற்றும் மாணவி வங்கிக் கணக்கு புத்தகம்',
        te: 'కళాశాల ప్రవేశ పత్రం మరియు బ్యాంక్ పాస్‌బుక్',
        ml: 'കോളേജ് പ്രവേശന രേഖകളും ബാങ്ക് പാസ്ബുക്കും',
        kn: 'ಕಾಲೇಜು ಪ್ರವೇಶ ಪತ್ರ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್',
      },
    ],
    officialPortalUrl: 'https://www.pudhumaipenn.tn.gov.in',
    directHelpline: '044-24351891',
  },

  // KERALA
  {
    id: 'kl_karunya_arogya',
    name: {
      en: 'Karunya Arogya Suraksha Padhathi (KASP)',
      ta: 'காருண்யா ஆரோக்கிய சுரக்ஷா திட்டம் (கேரளா)',
      te: 'కారుణ్య ఆరోగ్య సురక్ష పద్ధతి (కేరళ)',
      ml: 'കാരുണ്യ ആരോഗ്യ സുരക്ഷാ പദ്ധതി (KASP)',
      kn: 'ಕಾರುಣ್ಯ ಆರೋಗ್ಯ ಸುರಕ್ಷಾ ಪದ್ಧತಿ (ಕೇರಳ)',
    },
    state: 'Kerala',
    department: 'State Health Agency, Govt of Kerala',
    targetGroup: 'Low-income and Vulnerable Families',
    minAge: 0,
    maxAge: 100,
    maxAnnualIncome: 300000,
    applicableGenders: ['all'],
    category: 'healthcare',
    benefitsSummary: {
      en: '₹5 Lakh per year cashless health insurance cover per family for secondary and tertiary hospitalization across empaneled hospitals.',
      ta: 'குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவ காப்பீடு சிகிச்சை.',
      te: 'ప్రతి కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత వైద్య చికిత్స.',
      ml: 'ഓരോ കുടുംബത്തിനും പ്രതിവർഷം ₹5 ലക്ഷം രൂപയുടെ സൗജന്യ കാഷ്‌ലെസ്സ് ചികിത്സ ലഭ്യമാക്കുന്നു.',
      kn: 'ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷದವರೆಗೆ ನಗದು ರಹಿತ ಚಿಕಿತ್ಸಾ ಸೌಲಭ್ಯ.',
    },
    documentsRequired: [
      {
        en: 'Kerala State Ration Card',
        ta: 'கேரளா ரேஷன் அட்டை',
        te: 'కేరళ రేషన్ కార్డు',
        ml: 'റേഷൻ കാർഡ്',
        kn: 'ರೇಷನ್ ಕಾರ್ಡ್',
      },
      {
        en: 'Aadhaar Card of all family members',
        ta: 'குடும்ப உறுப்பினர்களின் ஆதார் அட்டை',
        te: 'కుటుంబ సభ్యులందరి ఆధార్ కార్డులు',
        ml: 'എല്ലാ കുടുംബാംഗങ്ങളുടെയും ആധാർ കാർഡ്',
        kn: 'ಎಲ್ಲಾ ಕುಟುಂಬ ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್',
      },
    ],
    officialPortalUrl: 'https://sha.kerala.gov.in/kasp/',
    directHelpline: '1056 (DISHA Kerala)',
  },
  {
    id: 'kl_subhiksha_keralam',
    name: {
      en: 'Subhiksha Keralam Integrated Farming Mission',
      ta: 'சுபிக்ஷா கேரளம் ஒருங்கிணைந்த வேளாண்மை திட்டம்',
      te: 'సుభిక్ష కేరళం సమగ్ర వ్యవసాయ పథకం',
      ml: 'സുഭിക്ഷ കേരളം സംയോജിത കൃഷി ദൗത്യം',
      kn: 'ಸುಭಿಕ್ಷಾ ಕೇರಳ ಸಮಗ್ರ ಕೃಷಿ ಮಿಷನ್',
    },
    state: 'Kerala',
    department: 'Agriculture Development & Farmers Welfare Dept',
    targetGroup: 'Small and Marginal Farmers & FPOs',
    minAge: 18,
    maxAge: 75,
    maxAnnualIncome: 0,
    applicableGenders: ['all'],
    category: 'farmer',
    benefitsSummary: {
      en: 'Capital subsidy up to 50% for fallow land cultivation, drip irrigation, organic vegetable farming and dairy animal purchase.',
      ta: 'தரிசு நில சாகுபடி மற்றும் சொட்டு நீர் பாசனத்திற்கு 50% மானியம்.',
      te: 'బీడు భూముల్లో సాగు మరియు బిందు సేద్యానికి 50% రాయితీ.',
      ml: 'തരിശുഭൂമി കൃഷി, ജൈവ കൃഷി, ഡയറി ഫാമുകൾ എന്നിവയ്ക്ക് 50% വരെ സബ്‌സിഡി നൽകുന്നു.',
      kn: 'ಪಾಳು ಭೂಮಿ ಕೃಷಿ ಮತ್ತು ಹನಿ ನೀರಾವರಿಗಾಗಿ 50% ರವರೆಗೆ ಸಬ್ಸಿಡಿ.',
    },
    documentsRequired: [
      {
        en: 'Land Tax Receipt / Lease agreement',
        ta: 'நில வரி ரசீது / குத்தகை ஒப்பந்தம்',
        te: 'భూమి పన్ను రశీదు',
        ml: 'ഭൂനികുതി രസീത് / പാട്ടക്കരാർ',
        kn: 'ಜಮೀನು ತೆರಿಗೆ ರಶೀದಿ',
      },
      {
        en: 'Kisan Credit Card / Bank Details',
        ta: 'கிசான் கிரெடிட் கார்டு / வங்கி விவரங்கள்',
        te: 'కిసాన్ క్రెడిట్ కార్డు',
        ml: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ് / ബാങ്ക് പാസ്ബുക്ക്',
        kn: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
      },
    ],
    officialPortalUrl: 'https://aims.kerala.gov.in',
    directHelpline: '1800-425-1661',
  },

  // KARNATAKA
  {
    id: 'ka_gruha_lakshmi',
    name: {
      en: 'Gruha Lakshmi Guarantee Scheme',
      ta: 'க்ருஹ லக்ஷ்மி திட்டம் (கர்நாடகா)',
      te: 'గృహలక్ష్మి గ్యారెంటీ పథకం (కర్ణాటక)',
      ml: 'ഗൃഹലക്ഷ്മി ഗ്യാരണ്ടി പദ്ധതി (കർണാടക)',
      kn: 'ಗೃಹಲಕ್ಷ್ಮಿ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ',
    },
    state: 'Karnataka',
    department: 'Women & Child Development Dept, Karnataka',
    targetGroup: 'Woman Head of Household',
    minAge: 20,
    maxAge: 85,
    maxAnnualIncome: 350000,
    applicableGenders: ['female'],
    category: 'women',
    benefitsSummary: {
      en: '₹2,000 monthly financial aid transferred directly to the designated female head of the family.',
      ta: 'குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹2,000 நேரடி உதவித்தொகை.',
      te: 'కుటుంబ మహిళా పెద్దకు నెలకు ₹2,000 నేరుగా బ్యాంకు ఖాతాలో జమ.',
      ml: 'കുടുംബനാഥയായ വനിതയ്ക്ക് പ്രതിമാസം ₹2,000 ധനസഹായം.',
      kn: 'ಮನೆಯ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ನಗದು ವರ್ಗಾವಣೆ.',
    },
    documentsRequired: [
      {
        en: 'Ration Card (BPL / Antyodaya / APL with woman as head)',
        ta: 'ரேஷன் அட்டை (பெண் தலைவராக உள்ள)',
        te: 'మహిళ పేరు మీద ఉన్న రేషన్ కార్డు',
        ml: 'റേഷൻ കാർഡ്',
        kn: 'ಮಹಿಳೆ ಮುಖ್ಯಸ್ಥರಾಗಿರುವ ರೇಷನ್ ಕಾರ್ಡ್ (BPL/AAY)',
      },
      {
        en: 'Aadhaar linked Bank Account & Husband’s Aadhaar',
        ta: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு',
        te: 'ఆధార్ లింక్ అయిన బ్యాంక్ అకౌంట్',
        ml: 'ആധാർ ലിങ്ക് ചെയ്ത ബാങ്ക് അക്കൗണ്ട്',
        kn: 'ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಪತಿಯ ಆಧಾರ್',
      },
    ],
    officialPortalUrl: 'https://sevasindhu.karnataka.gov.in',
    directHelpline: '1902',
  },
  {
    id: 'ka_shakti_scheme',
    name: {
      en: 'Shakti Free Bus Travel for Women',
      ta: 'சக்தி இலவச பேருந்து திட்டம்',
      te: 'శక్తి ఉచిత బస్సు ప్రయాణం పథకం',
      ml: 'ശക്തി സൗജന്യ ബസ് യാത്ര പദ്ധതി',
      kn: 'ಶಕ್ತಿ ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ ಯೋಜನೆ',
    },
    state: 'Karnataka',
    department: 'Transport Department Karnataka (KSRTC, BMTC, NWKRTC, KKRTC)',
    targetGroup: 'All women residents of Karnataka',
    minAge: 5,
    maxAge: 100,
    maxAnnualIncome: 0,
    applicableGenders: ['female', 'transgender'],
    category: 'women',
    benefitsSummary: {
      en: '100% free bus travel in state-owned ordinary and express buses across the state of Karnataka for all female citizens.',
      ta: 'கர்நாடக மாநில அரசுப் பேருந்துகளில் பெண்களுக்கு 100% கட்டணமில்லா பயணம்.',
      te: 'కర్ణాటక ప్రభుత్వ సాధారణ మరియు ఎక్స్‌ప్రెస్ బస్సుల్లో మహిళలకు ఉచిత ప్రయాణం.',
      ml: 'കർണാടകയിലെ സർക്കാർ ബസുകളിൽ സ്ത്രീകൾക്ക് സൗജന്യ യാത്ര.',
      kn: 'ಕರ್ನಾಟಕದ ಮಹಿಳೆಯರು ಮತ್ತು ಲಿಂಗತ್ವ ಅಲ್ಪಸಂಖ್ಯಾತರಿಗೆ ರಾಜ್ಯಾದ್ಯಂತ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಮತ್ತು ಬಿಎಂಟಿಸಿ ಬಸ್‌ಗಳಲ್ಲಿ ಸಂಪೂರ್ಣ ಉಚಿತ ಪ್ರಯಾಣ.',
    },
    documentsRequired: [
      {
        en: 'Valid Karnataka Government ID (Voter ID, DL, or Shakti Smart Card)',
        ta: 'கர்நாடக முகவரி அடையாள அட்டை',
        te: 'కర్ణాటక చిరునామా గుర్తింపు కార్డు',
        ml: 'കർണാടക സർക്കാർ തിരിച്ചറിയൽ കാർഡ്',
        kn: 'ಕರ್ನಾಟಕ ವಿಳಾಸವಿರುವ ಮಾನ್ಯ ಗುರುತಿನ ಚೀಟಿ (ಆಧಾರ್, ವೋಟರ್ ಐಡಿ ಅಥವಾ ಡಿಎಲ್)',
      },
    ],
    officialPortalUrl: 'https://ksrtc.in/pages/shakti.html',
    directHelpline: '080-49596666',
  },

  // ANDHRA PRADESH
  {
    id: 'ap_aarogyasri',
    name: {
      en: 'Dr. YSR Aarogyasri Comprehensive Healthcare',
      ta: 'ஆரோக்கியஸ்ரீ மருத்துவ திட்டம் (ஆந்திரா)',
      te: 'వైఎస్సార్ ఆరోగ్యశ్రీ సమగ్ర ఆరోగ్య పథకం',
      ml: 'ആരോഗ്യശ്രീ ആരോഗ്യ പദ്ധതി (ആന്ധ്രാ)',
      kn: 'ಆರೋಗ್ಯಶ್ರೀ ಆರೋಗ್ಯ ಯೋಜನೆ (ಆಂಧ್ರ)',
    },
    state: 'Andhra Pradesh',
    department: 'Dr. YSR Aarogyasri Health Care Trust, AP',
    targetGroup: 'Families with annual income below ₹5 Lakh',
    minAge: 0,
    maxAge: 100,
    maxAnnualIncome: 500000,
    applicableGenders: ['all'],
    category: 'healthcare',
    benefitsSummary: {
      en: 'Free treatment up to ₹25 Lakh for over 3,250 medical and surgical procedures across empanelled super-specialty hospitals.',
      ta: '₹25 லட்சம் வரையிலான உயர் அறுவை சிகிச்சை மற்றும் மருத்துவ சிகிச்சை முழுமையாக இலவசம்.',
      te: '3,250కి పైగా వైద్య ప్రక్రియలకు ₹25 లక్షల వరకు పూర్తి ఉచిత కార్పొరేట్ వైద్య సేవలు.',
      ml: '3,250-ലധികം ചികിത്സകൾക്ക് ₹25 ലക്ഷം രൂപ വരെ സൗജന്യ ആതുരസേവനം നൽകുന്നു.',
      kn: 'ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ₹25 ಲಕ್ಷದವರೆಗೆ ಸಂಪೂರ್ಣ ಉಚಿತ ಚಿಕಿತ್ಸೆ.',
    },
    documentsRequired: [
      {
        en: 'YSR Aarogyasri Card or BPL Rice Card',
        ta: 'ஆரோக்கியஸ்ரீ அட்டை அல்லது ரேஷன் அரிசி அட்டை',
        te: 'వైఎస్సార్ ఆరోగ్యశ్రీ కార్డు లేదా బియ్యం కార్డు',
        ml: 'ആരോഗ്യശ്രീ കാർഡ് അല്ലെങ്കിൽ റേഷൻ കാർഡ്',
        kn: 'ಆರೋಗ್ಯಶ್ರೀ ಕಾರ್ಡ್ ಅಥವಾ ಅಕ್ಕಿ ಕಾರ್ಡ್',
      },
      {
        en: 'Aadhaar of the patient',
        ta: 'நோயாளியின் ஆதார் அட்டை',
        te: 'రోగి యొక్క ఆధార్ కార్డు',
        ml: 'രോഗിയുടെ ആധാർ കാർഡ്',
        kn: 'ರೋಗಿಯ ಆಧಾರ್ ಕಾರ್ಡ್',
      },
    ],
    officialPortalUrl: 'https://ysraarogyasri.ap.gov.in',
    directHelpline: '104',
  },
  {
    id: 'ap_rythu_bharosa',
    name: {
      en: 'YSR Rythu Bharosa - PM KISAN',
      ta: 'ரைத்து பரோசா உழவர் உதவி திட்டம்',
      te: 'వైఎస్సార్ రైతు భరోసా - పీఎం కిసాన్',
      ml: 'റൈതു ഭരോസ കർഷക സഹായ പദ്ധതി',
      kn: 'ರೈತು ಭರೋಸಾ ರೈತರ ಬೆಂಬಲ ಯೋಜನೆ',
    },
    state: 'Andhra Pradesh',
    department: 'Agriculture and Cooperation Dept, AP',
    targetGroup: 'Landholding & Tenant Farmer Families',
    minAge: 18,
    maxAge: 80,
    maxAnnualIncome: 0,
    applicableGenders: ['all'],
    category: 'farmer',
    benefitsSummary: {
      en: '₹13,500 annual input financial support per farmer family (including tenant farmers & ROFR forest cultivators) in 3 installments.',
      ta: 'விவசாயிகளுக்கு ஆண்டுதோறும் ₹13,500 இடுபொருள் உதவித்தொகை 3 தவணைகளில் வழங்கப்படுகிறது.',
      te: 'రైతు కుటుంబాలకు పంట పెట్టుబడి కోసం ఏటా ₹13,500 మూడు విడతలలో ఆర్థిక సహాయం.',
      ml: 'കർഷക കുടുംബങ്ങൾക്ക് പ്രതിവർഷം ₹13,500 സാമ്പത്തിക സഹായം നൽകുന്നു.',
      kn: 'ರೈತ ಕುಟುಂಬಗಳಿಗೆ ಬಿತ್ತನೆ ಬೀಜ ಮತ್ತು ಗೊಬ್ಬರಕ್ಕಾಗಿ ವಾರ್ಷಿಕ ₹13,500 ಆರ್ಥಿಕ ನೆರವು.',
    },
    documentsRequired: [
      {
        en: 'Pattadar Passbook / Crop Cultivator Rights Card (CCRC for tenants)',
        ta: 'பட்டா பாஸ்புக் அல்லது குத்தகை உழவர் அட்டை',
        te: 'పట్టాదారు పాస్‌బుక్ లేదా సిసిఆర్‌సి కార్డు',
        ml: 'പട്ടയ രേഖകൾ',
        kn: 'ಪಟ್ಟಾದಾರ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಹಿಡುವಳಿದಾರ ಹಕ್ಕು ಪತ್ರ',
      },
    ],
    officialPortalUrl: 'https://ysrrythubharosa.ap.gov.in',
    directHelpline: '1907',
  },

  // TELANGANA
  {
    id: 'ts_rythu_bandhu',
    name: {
      en: 'Rythu Bharosa / Rythu Bandhu Farm Investment Support',
      ta: 'ரைத்து பந்து விவசாய முதலீட்டு திட்டம்',
      te: 'రైతు భరోసా / రైతు బంధు పెట్టుబడి సహాయం',
      ml: 'റൈതു ബന്ധു കാർഷിക നിക്ഷേപ പദ്ധതി',
      kn: 'ರೈತು ಬಂಧು ಕೃಷಿ ಹೂಡಿಕೆ ಯೋಜನೆ',
    },
    state: 'Telangana',
    department: 'Agriculture and Cooperation Dept, Telangana',
    targetGroup: 'Land-owning Farmers',
    minAge: 18,
    maxAge: 90,
    maxAnnualIncome: 0,
    applicableGenders: ['all'],
    category: 'farmer',
    benefitsSummary: {
      en: 'Direct investment support of ₹10,000 to ₹15,000 per acre per year (₹7,500 per crop season) directly credited to farmer accounts.',
      ta: 'ஏக்கருக்கு ஆண்டுக்கு ₹10,000 முதல் ₹15,000 வரை நேரடி விவசாய முதலீட்டு உதவி.',
      te: 'ఎకరానికి ఏడాదికి ₹10,000 నుండి ₹15,000 వరకు నేరుగా పెట్టుబడి సహాయం.',
      ml: 'ഏക്കറിന് പ്രതിവർഷം ₹10,000 മുതൽ ₹15,000 വരെ കൃഷി നിക്ഷേപ സഹായം.',
      kn: 'ಎಕರೆಗೆ ವಾರ್ಷಿಕ ₹10,000 ದಿಂದ ₹15,000 ವರೆಗೆ ಕೃಷಿ ಹೂಡಿಕೆ ನೆರವು.',
    },
    documentsRequired: [
      {
        en: 'Dharani Portal Pattadar Passbook',
        ta: 'தாரணி பட்டாதாரர் பாஸ்புக்',
        te: 'ధరణి పోర్టల్ పట్టాదారు పాస్‌బుక్',
        ml: 'ധരണി പോർട്ടൽ ഭൂമി രേഖകൾ',
        kn: 'ಧರಣಿ ಪೋರ್ಟಲ್ ಪಟ್ಟಾದಾರ ಪಾಸ್‌ಬುಕ್',
      },
      {
        en: 'Aadhaar and IFSC Bank Details',
        ta: 'ஆதார் மற்றும் வங்கி விவரங்கள்',
        te: 'ఆధార్ మరియు బ్యాంక్ వివరాలు',
        ml: 'ആധാർ, ബാങ്ക് അക്കൗണ്ട്',
        kn: 'ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ',
      },
    ],
    officialPortalUrl: 'https://rythubandhu.telangana.gov.in',
    directHelpline: '040-23383520',
  },
  {
    id: 'ts_mahalakshmi',
    name: {
      en: 'Maha Lakshmi 6-Guarantees Scheme',
      ta: 'மகாலட்சுமி மகளிருக்கான மாதாந்திர திட்டம்',
      te: 'మహాలక్ష్మి పథకం - ఉచిత బస్సు & గ్యాస్ సిలిండర్',
      ml: 'മഹാലക്ഷ്മി വനിതാ ക്ഷേമ പദ്ധതി',
      kn: 'ಮಹಾಲಕ್ಷ್ಮಿ ಮಹಿಳಾ ಕಲ್ಯಾಣ ಯೋಜನೆ',
    },
    state: 'Telangana',
    department: 'Civil Supplies & Transport Dept, Telangana',
    targetGroup: 'Women of Telangana',
    minAge: 18,
    maxAge: 85,
    maxAnnualIncome: 300000,
    applicableGenders: ['female', 'transgender'],
    category: 'women',
    benefitsSummary: {
      en: '₹2,500 monthly financial aid, LPG domestic cylinder at ₹500, and 100% free bus travel on TSRTC buses.',
      ta: 'மாதம் ₹2,500 நிதி உதவி, ₹500-க்கு சமையல் எரிவாயு சிலிண்டர் மற்றும் இலவச TSRTC பேருந்து பயணம்.',
      te: 'నెలకు ₹2,500 ఆర్థిక సాయం, ₹500కే గ్యాస్ సిలిండర్ మరియు టిఎస్ఆర్టీసీ బస్సులలో ఉచిత ప్రయాణం.',
      ml: 'പ്രതിമാസം ₹2,500, ₹500 രൂപയ്ക്ക് ഗ്യാസ് സിലിണ്ടർ, സൗജന്യ ബസ് യാത്ര.',
      kn: 'ತಿಂಗಳಿಗೆ ₹2,500 ಧನಸಹಾಯ, ₹500 ಕ್ಕೆ ಅಡುಗೆ ಅನಿಲ ಸಿಲಿಂಡರ್ ಮತ್ತು ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ.',
    },
    documentsRequired: [
      {
        en: 'Praja Palana Application Number / Ration Card',
        ta: 'பிரஜா பாலனா விண்ணப்ப எண் அல்லது ரேஷன் அட்டை',
        te: 'ప్రజా పాలన దరఖాస్తు నంబర్ లేదా రేషన్ కార్డు',
        ml: 'പ്രജാ പാലന അപേക്ഷ നമ്പർ',
        kn: 'ಪ್ರಜಾ ಪಾಲನಾ ಅರ್ಜಿ ಸಂಖ್ಯೆ ಅಥವಾ ರೇಷನ್ ಕಾರ್ಡ್',
      },
      {
        en: 'Active LPG Gas Consumer Connection Book',
        ta: 'கேஸ் இணைப்பு புத்தகம்',
        te: 'గ్యాస్ కనెక్షన్ పుస్తకం',
        ml: 'ഗ്യാസ് കണക്ഷൻ രേഖ',
        kn: 'ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಪುಸ್ತಕ',
      },
    ],
    officialPortalUrl: 'https://prajapalana.telangana.gov.in',
    directHelpline: '040-48560012',
  },

  // CENTRAL GOVERNMENT
  {
    id: 'cen_pm_kisan',
    name: {
      en: 'PM-KISAN Samman Nidhi',
      ta: 'பிரதான் மந்திரி கிசான் சம்மான் நிதி',
      te: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
      ml: 'പി.എം കിസാൻ സമ്മാൻ നിധി',
      kn: 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ',
    },
    state: 'All',
    department: 'Ministry of Agriculture & Farmers Welfare, GoI',
    targetGroup: 'Small and Marginal Farmers with cultivable land',
    minAge: 18,
    maxAge: 99,
    maxAnnualIncome: 0,
    applicableGenders: ['all'],
    category: 'farmer',
    benefitsSummary: {
      en: '₹6,000 per year paid in three equal installments of ₹2,000 directly into the bank accounts of all landholding farmer families.',
      ta: 'ஆண்டுக்கு ₹6,000 மூன்று தவணைகளில் உழவர்களின் வங்கிக் கணக்கில் நேரடியாக வழங்கப்படுகிறது.',
      te: 'రైతులకు ఏడాదికి ₹6,000 మూడు విడతలలో నేరుగా బ్యాంకు ఖాతాలో జమ.',
      ml: 'കർഷകർക്ക് പ്രതിവർഷം ₹6,000 മൂന്ന് ഗഡുക്കളായി നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ ലഭിക്കുന്നു.',
      kn: 'ರೈತರಿಗೆ ವಾರ್ಷಿಕ ₹6,000 ಹಣವನ್ನು ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ.',
    },
    documentsRequired: [
      {
        en: 'Aadhaar Card linked to Mobile Number',
        ta: 'மொபைல் எண்ணுடன் இணைக்கப்பட்ட ஆதார் அட்டை',
        te: 'ఆధార్ కార్డు',
        ml: 'ആധാർ കാർഡ്',
        kn: 'ಆಧಾರ್ ಕಾರ್ಡ್',
      },
      {
        en: 'Land record / Patta / Chitta / RoR documents',
        ta: 'நிலப்பட்டா / சிட்டா ஆவணம்',
        te: 'భూమి పట్టా పత్రాలు',
        ml: 'ഭൂമി കരമടച്ച രസീത്',
        kn: 'ಆರ್‌ಟಿಸಿ/ಪಹಣಿ ಜಮೀನು ದಾಖಲೆಗಳು',
      },
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    directHelpline: '155261 / 011-24300606',
  },
  {
    id: 'cen_ayushman_bharat',
    name: {
      en: 'Ayushman Bharat PM-JAY & Vayo Vandana (Seniors)',
      ta: 'ஆயுஷ்மான் பாரத் பிரதம மந்திரி ஜன் ஆரோக்கிய திட்டம்',
      te: 'ఆయుష్మాన్ భారత్ పీఎం-జై మరియు వయో వందన',
      ml: 'ആയുഷ്മാൻ ഭാരത് പി.എം-ജയ്',
      kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಪಿಎಂ-ಜೆಎವೈ',
    },
    state: 'All',
    department: 'National Health Authority (NHA), GoI',
    targetGroup: 'Low-income Families & All Seniors Aged 70+',
    minAge: 0,
    maxAge: 110,
    maxAnnualIncome: 350000,
    applicableGenders: ['all'],
    category: 'healthcare',
    benefitsSummary: {
      en: '₹5 Lakh per year health coverage per family for secondary & tertiary hospital treatment, including all senior citizens aged 70+ regardless of income.',
      ta: 'குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் மருத்துவ காப்பீடு, 70 வயதுக்கு மேற்பட்ட முதியோர்களுக்கு வருமான வரம்பின்றி பாதுகாப்பு.',
      te: 'ఏడాదికి ₹5 లక్షల ఉచిత వైద్య బీమా, 70 ఏళ్లు పైబడిన వృద్ధులందరికీ ఉచిత వర్తింపు.',
      ml: 'പ്രതിവർഷം ₹5 ലക്ഷം രൂപയുടെ സൗജന്യ ചികിത്സ, 70 വയസ്സിന് മുകളിലുള്ള മുതിർന്ന പൗരന്മാർക്ക് മുൻഗണന.',
      kn: 'ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷದವರೆಗೆ ಉಚಿತ ಆರೋಗ್ಯ ವಿಮೆ, 70 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಸಂಪೂರ್ಣ ಉಚಿತ.',
    },
    documentsRequired: [
      {
        en: 'Aadhaar Card (Mandatory for e-KYC)',
        ta: 'ஆதார் அட்டை',
        te: 'ఆధార్ కార్డు',
        ml: 'ആധാർ കാർഡ്',
        kn: 'ಆಧಾರ್ ಕಾರ್ಡ್',
      },
      {
        en: 'Ration card or PM-JAY letter with family ID',
        ta: 'ரேஷன் அட்டை அல்லது குடும்ப அடையாள எண்',
        te: 'రేషన్ కార్డు',
        ml: 'റേഷൻ കാർഡ്',
        kn: 'ರೇಷನ್ ಕಾರ್ಡ್',
      },
    ],
    officialPortalUrl: 'https://pmjay.gov.in',
    directHelpline: '14555',
  },
];

export interface EligibilityFilters {
  state: SouthState;
  age: number;
  gender: 'female' | 'male' | 'transgender' | 'all';
  annualIncome: number; // in INR
  category?: 'all' | 'farmer' | 'student' | 'women' | 'senior' | 'housing' | 'healthcare' | 'disaster';
}

export function filterEligibleSchemes(filters: EligibilityFilters): Scheme[] {
  return COMPREHENSIVE_SCHEMES_DATABASE.filter((scheme) => {
    // State match
    if (filters.state !== 'All' && scheme.state !== 'All' && scheme.state !== filters.state) {
      return false;
    }

    // Age match
    if (filters.age < scheme.minAge || filters.age > scheme.maxAge) {
      return false;
    }

    // Income match (if maxAnnualIncome is set and income exceeds it)
    if (scheme.maxAnnualIncome > 0 && filters.annualIncome > scheme.maxAnnualIncome) {
      // Special exemption: Seniors 70+ on Ayushman Bharat have no income ceiling
      if (scheme.id === 'cen_ayushman_bharat' && filters.age >= 70) {
        // allowed
      } else {
        return false;
      }
    }

    // Gender match
    if (!scheme.applicableGenders.includes('all')) {
      if (filters.gender !== 'all' && !scheme.applicableGenders.includes(filters.gender)) {
        return false;
      }
    }

    // Category match
    if (filters.category && filters.category !== 'all') {
      if (scheme.category !== filters.category) {
        return false;
      }
    }

    return true;
  });
}

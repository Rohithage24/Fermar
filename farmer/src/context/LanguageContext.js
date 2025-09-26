import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translationsData = {
  English: {
    title: "AgroSanga",
    welcome: "Welcome to Farmer Portal",
    description: "Your AI-powered assistant for crop yield prediction & optimization.",
    chooseLang: "Choose Language",
    mainCrops: "🌱 Main Crops of Odisha",
    crops: {
      rice: "Rice",
      corn: "Corn",
      sugarcane: "Sugarcane",
      cotton: "Cotton",
      pulses: "Pulses",
      millets: "Millets",
    },
    farmingTipsTitle: "Farming Tips",
    farmingTips: [
      "Rotate crops to maintain soil fertility.",
      "Use organic fertilizers for healthier crops.",
      "Water plants early in the morning or late evening.",
      "Protect crops from pests using natural repellents.",
      "Monitor soil moisture regularly.",
    ],
    weatherTitle: "Weather & Soil Information",
    weatherSoilTitle: "Weather & Soil Information",
    weather: {
      temperature: "30°C",
      condition: "Sunny",
      humidity: "65%",
    },
    soilTitle: "Soil Information",
    soil: {
      type: "Loamy",
      moisture: "Moderate",
      pH: "6.5",
    },
    temperature: "Temperature",
    condition: "Condition",
    humidity: "Humidity",
    type: "Type",
    moisture: "Moisture",
    ph: "pH",
    aboutTitle: "About Farmers",
    aboutText: "This portal provides crop info, weather updates, farming tips, and access to government schemes.",
    contactTitle: "Contact Us",
    contactEmail: "Email: support@farmersportal.com",
    contactPhone: "Phone: +91 9876543210",
    soilUploadTitle: "Upload Soil Report Image",
    soilUploadText: "Take a photo or upload your soil test image for better recommendations.",
    submitButton: "Submit Report",
  },

  // Add the same dummy weather/soil structure for other languages
  Hindi: {
    title: "एग्रोसंगा",
    welcome: "किसान पोर्टल में आपका स्वागत है",
    description: "फसल उत्पादन भविष्यवाणी और अनुकूलन के लिए आपका एआई सहायक।",
    chooseLang: "भाषा चुनें",
    mainCrops: "🌱 ओडिशा के मुख्य फसलें",
    crops: {
      rice: "चावल",
      corn: "मक्का",
      sugarcane: "गन्ना",
      cotton: "कपास",
      pulses: "दालें",
      millets: "बाजरा",
    },
    farmingTipsTitle: "खेती के सुझाव",
    farmingTips: [
      "मिट्टी की उर्वरता बनाए रखने के लिए फसलें घुमाएं।",
      "स्वस्थ फसलों के लिए जैविक उर्वरक का उपयोग करें।",
      "पौधों को सुबह जल्दी या शाम को पानी दें।",
      "प्राकृतिक कीट निरोधकों का उपयोग करके फसलों की रक्षा करें।",
      "मिट्टी की नमी नियमित रूप से मॉनिटर करें।",
    ],
    weatherTitle: "मौसम और मिट्टी की जानकारी",
    weatherSoilTitle: "मौसम और मिट्टी की जानकारी",
    weather: {
      temperature: "30°C",
      condition: "सूर्यनुमा",
      humidity: "65%",
    },
    soilTitle: "मिट्टी की जानकारी",
    soil: {
      type: "दोमट",
      moisture: "मध्यम",
      pH: "6.5",
    },
    temperature: "तापमान",
    condition: "स्थिति",
    humidity: "नमी",
    type: "प्रकार",
    moisture: "नमी",
    ph: "पीएच",
    aboutTitle: "किसानों के बारे में",
    aboutText: "यह पोर्टल फसल जानकारी, मौसम अपडेट, खेती के सुझाव और सरकारी योजनाओं तक पहुंच प्रदान करता है।",
    contactTitle: "हमसे संपर्क करें",
    contactEmail: "ईमेल: support@farmersportal.com",
    contactPhone: "फोन: +91 9876543210",
    soilUploadTitle: "मिट्टी की रिपोर्ट छवि अपलोड करें",
    soilUploadText: "बेहतर सिफारिशों के लिए अपनी मिट्टी की परीक्षण छवि अपलोड करें।",
    submitButton: "रिपोर्ट सबमिट करें",
  },

  Marathi: {
    title : "ॲग्रोसंगा",
    welcome: "शेतकरी पोर्टल मध्ये आपले स्वागत आहे",
    description: "पिकाच्या उत्पादनाची भाकीत व अनुकूलनासाठी तुमचा एआय सहाय्यक.",
    chooseLang: "भाषा निवडा",
    mainCrops: "🌱 ओडिशाच्या मुख्य पिके",
    crops: {
      rice: "तांदूळ",
      corn: "मका",
      sugarcane: "ऊस",
      cotton: "कापूस",
      pulses: "डाळी",
      millets: "बाजरी",
    },
    farmingTipsTitle: "शेतीसाठी टिप्स",
    farmingTips: [
      "मातीची सुपीकता राखण्यासाठी पिके फेरफार करा.",
      "आरोग्यदायी पिकांसाठी सेंद्रिय खत वापरा.",
      "सकाळी लवकर किंवा संध्याकाळी पिकांना पाणी द्या.",
      "नैसर्गिक कीटकनाशक वापरून पिकांचे संरक्षण करा.",
      "मातीतील ओलसरपणा नियमितपणे तपासा.",
    ],
    weatherTitle: "हवामान व मातीची माहिती",
    weatherSoilTitle: "हवामान व मातीची माहिती",
    weather: {
      temperature: "30°C",
      condition: "सूर्यप्रकाश",
      humidity: "65%",
    },
    soilTitle: "मातीची माहिती",
    soil: {
      type: "लोमी",
      moisture: "मध्यम",
      pH: "6.5",
    },
    temperature: "तापमान",
    condition: "स्थिती",
    humidity: "आर्द्रता",
    type: "प्रकार",
    moisture: "ओलसरपणा",
    ph: "पीएच",
    aboutTitle: "शेतकऱ्यांविषयी",
    aboutText: "हा पोर्टल पीक माहिती, हवामान अद्यतने, शेती टिप्स आणि सरकारी योजनांपर्यंत प्रवेश पुरवतो.",
    contactTitle: "संपर्क साधा",
    contactEmail: "ईमेल: support@farmersportal.com",
    contactPhone: "फोन: +91 9876543210",
    soilUploadTitle: "माती अहवाल प्रतिमा अपलोड करा",
    soilUploadText: "चांगल्या शिफारशीसाठी आपली माती तपासणी प्रतिमा अपलोड करा.",
    submitButton: "रिपोर्ट सबमिट करा",
  },

  Odia: {
    title:"ଏଗ୍ରୋସଙ୍ଗା",
    welcome: "କୃଷକ ପୋର୍ଟାଲ୍‌କୁ ସ୍ୱାଗତ",
    description: "ଆପଣଙ୍କର ପକ୍ଷୀଚାଷ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ଏବଂ ସୁଧାରଣ ପାଇଁ AI ସହାୟକ।",
    chooseLang: "ଭାଷା ବାଛନ୍ତୁ",
    mainCrops: "🌱 ଓଡ଼ିଶାର ମୁଖ୍ୟ ଫସଲ",
    crops: {
      rice: "ଧାନ",
      corn: "ମକା",
      sugarcane: "ଇଁଗୁ",
      cotton: "କପାସ",
      pulses: "ଡାଲି",
      millets: "ମାଡି",
    },
    farmingTipsTitle: "କୃଷି ସୁପାରିଶ",
    farmingTips: [
      "ମାଟିର ସୁସ୍ଥତା ରକ୍ଷା ପାଇଁ ଫସଲ ଘୁରାନ୍ତୁ।",
      "ସ୍ୱାସ୍ଥ୍ୟକର ଫସଲ ପାଇଁ ସୂତ୍ର ଉପଦାନ ବ୍ୟବହାର କରନ୍ତୁ।",
      "ସକାଳି ଅଥବା ସନ୍ଧ୍ୟାରେ ଗଛକୁ ଜଳ ଦିଅନ୍ତୁ।",
      "ପ୍ରାକୃତିକ କୀଟ ନିରୋଧକ ବ୍ୟବହାର କରି ଫସଲର ସୁରକ୍ଷା କରନ୍ତୁ।",
      "ମାଟିର ଆର୍ଦ୍ରତା ନିୟମିତ ଭାବରେ ନିରୀକ୍ଷଣ କରନ୍ତୁ।",
    ],
    weatherTitle: "ମୌସମ ଏବଂ ମାଟି ସୂଚନା",
    weatherSoilTitle: "ମୌସମ ଏବଂ ମାଟି ସୂଚନା",
    weather: {
      temperature: "30°C",
      condition: "ସୂର୍ଯ୍ୟପ୍ରକାଶ",
      humidity: "65%",
    },
    soilTitle: "ମାଟି ସୂଚନା",
    soil: {
      type: "ଲୋମି",
      moisture: "ମଧ୍ୟମ",
      pH: "6.5",
    },
    temperature: "ତାପମାନ",
    condition: "ସ୍ଥିତି",
    humidity: "ଆର୍ଦ୍ରତା",
    type: "ପ୍ରକାର",
    moisture: "ଆର୍ଦ୍ରତା",
    ph: "ପିଏଚ୍",
    aboutTitle: "କୃଷକଙ୍କ ବିଷୟରେ",
    aboutText: "ଏହି ପୋର୍ଟାଲ୍ କ୍ଷେତ୍ର ସୂଚନା, ମୌସମ ଅପଡେଟ୍, କୃଷି ସୁପାରିଶ ଏବଂ ସରକାରୀ ସଂକଳନ ଉପଲବ୍ଧ କରାଏ।",
    contactTitle: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    contactEmail: "ଇମେଲ୍: support@farmersportal.com",
    contactPhone: "ଫୋନ୍: +91 9876543210",
    soilUploadTitle: "ମାଟି ରିପୋର୍ଟ ଇମେଜ୍ ଅପଲୋଡ୍ କରନ୍ତୁ",
    soilUploadText: "ଭଲ ପରାମର୍ଶ ପାଇଁ ଆପଣଙ୍କର ମାଟି ଟେଷ୍ଟ ଇମେଜ୍ ଅପଲୋଡ୍ କରନ୍ତୁ।",
    submitButton: "ରିପୋର୍ଟ ସବମିଟ୍ କରନ୍ତୁ",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations: translationsData[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

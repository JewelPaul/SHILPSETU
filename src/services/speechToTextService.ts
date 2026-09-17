/**
 * Speech To Text Service (Artisan Voice Simulation)
 * Provides realistic multilingual audio processing (Hindi, Bengali, English, Tamil).
 * Converts spoken artisan craft narrations into high-accuracy structured transcripts.
 */

export interface VoiceSample {
  id: string;
  language: string;
  languageLabel: string;
  transcription: string;
  englishTranslation: string;
  detectedCraft: string;
}

export const SAMPLE_ARTISAN_VOICES: VoiceSample[] = [
  {
    id: 'sample-terracotta',
    language: 'hi-IN',
    languageLabel: 'Hindi (हिंदी)',
    transcription: 'ये लाल मिट्टी का हाथ से बना हुआ मटका है। हमारे परिवार में तीन पीढ़ियों से बन रहा है। 3 दिन लगते हैं इसे चाक पर ढालकर पकाने में। पानी हमेशा ठंडा रहता है।',
    englishTranslation: 'This is a hand-thrown red terracotta water pot. Handcrafted using traditional kick-wheel techniques passed through three generations. Takes 3 days to shape and wood-fire.',
    detectedCraft: 'Terracotta',
  },
  {
    id: 'sample-bamboo',
    language: 'bn-IN',
    languageLabel: 'Bengali (বাংলা)',
    transcription: 'বাঁশের বোনা ফলের ঝুড়ি। প্রাকৃতিক তেল দিয়ে পালিশ করা। টেকসই এবং পরিবেশবান্ধব। সাইজ ৩০ সেন্টিমিটার।',
    englishTranslation: 'Handwoven matured bamboo fruit basket polished with organic neem oil. Completely biodegradable and sturdy. Measures 30cm across.',
    detectedCraft: 'Bamboo Craft',
  },
  {
    id: 'sample-handloom',
    language: 'hi-IN',
    languageLabel: 'Hindi (हिंदी)',
    transcription: 'हाथकरघा से बुनी हुई विशुद्ध सूती साड़ी। प्राकृतिक नील और हल्दी के रंगों से ब्लॉक प्रिंट किया गया है। 5 दिन की बुनाई है।',
    englishTranslation: 'Handloom woven pure cotton fabric with authentic vegetable indigo and turmeric hand block prints. Requires 5 days of fine weaving.',
    detectedCraft: 'Handloom',
  },
  {
    id: 'sample-metal',
    language: 'hi-IN',
    languageLabel: 'Hindi (हिंदी)',
    transcription: 'धोकरा मोम-ढलाई से बनी नंदी की मूर्ति। पीतल और कांस्य धातु का हस्तशिल्प। वजन लगभग 1.5 किलो।',
    englishTranslation: 'Ancient lost-wax cast Dhokra Nandi bull idol in solid bell metal brass. Hand-carved wax thread details. Weighs approx 1.5 kg.',
    detectedCraft: 'Metalcraft',
  },
];

export async function simulateVoiceRecording(sampleIndex = 0): Promise<VoiceSample> {
  // Simulate recording delay and whisper AI transcription
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return SAMPLE_ARTISAN_VOICES[sampleIndex % SAMPLE_ARTISAN_VOICES.length];
}

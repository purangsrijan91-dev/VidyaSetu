/**
 * VidyaSetu - Active Speech-to-Text (STT) Voice Assistant & Intent Router
 * Replaces simulated dialogue with native Web Speech Recognition and semantic intent routing.
 */
'use strict';

const VoiceAssistant = (() => {
  let recognition = null;
  let isListening = false;

  function init() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          isListening = true;
          updateVoiceUI(true, 'सुन रहा हूँ... अपनी कक्षा का प्रश्न पूछें...');
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log('[VoiceAssistant] Transcribed:', transcript);
          updateVoiceUI(false, `आपने पूछा: "${transcript}"`);
          routeIntent(transcript);
        };

        recognition.onerror = (event) => {
          console.warn('[VoiceAssistant] Speech recognition error:', event.error);
          isListening = false;
          updateVoiceUI(false, 'माइक त्रुटि: कृपया दोबारा बोलें या टेक्स्ट बटन दबाएं');
        };

        recognition.onend = () => {
          isListening = false;
          setTimeout(() => {
            updateVoiceUI(false, 'बोलकर पूछें: "कक्षा 2 के लिए 10 मिनट का गणित खेल बताएं"');
          }, 3500);
        };
      } catch (e) {
        console.warn('[VoiceAssistant] SpeechRecognition init failed:', e);
      }
    }
  }

  function startListening() {
    if (!recognition) {
      // Fallback for browsers without STT support
      promptManualQuery();
      return;
    }

    try {
      if (isListening) {
        recognition.stop();
        isListening = false;
      } else {
        AudioEngine.playTone(659.25, 880);
        recognition.start();
      }
    } catch (e) {
      console.warn('[VoiceAssistant] Error starting speech recognition:', e);
      promptManualQuery();
    }
  }

  function promptManualQuery() {
    AudioEngine.playTone(523.25, 659.25);
    AudioEngine.speakHindi('कृपया अपनी कक्षा का प्रश्न पूछें या नीचे दिए गए सुझावों को चुनें।');
    updateVoiceUI(false, 'कक्षा का प्रश्न पूछें');
  }

  // Dynamic Semantic Intent Router
  function routeIntent(transcript) {
    const text = transcript.toLowerCase();

    if (text.includes('खेल') || text.includes('गेम') || text.includes('रेलगाड़ी') || text.includes('ताली')) {
      AudioEngine.speakHindi('श्यामपट्ट खेल खोला जा रहा है।');
      AppController.showTLMGame();
    } else if (text.includes('घटाव') || text.includes('अवरोही') || text.includes('भिन्न') || text.includes('घर्षण') || text.includes('समझाएं') || text.includes('बोली')) {
      AudioEngine.speakHindi('घरेलू बोली में शिक्षण उपाय तैयार किया जा रहा है।');
      AppController.generateAnalogyFromQuery(transcript);
    } else if (text.includes('अनुपस्थिति') || text.includes('जांच') || text.includes('छुट्टी') || text.includes('बच्चा')) {
      AudioEngine.speakHindi('2 मिनट मौखिक जांच कार्ड खोला जा रहा है।');
      AppController.openCatchUpDiagnostic();
    } else if (text.includes('बारी') || text.includes('चक्र') || text.includes('समय') || text.includes('टाइमर')) {
      AudioEngine.speakHindi('बहु-कक्षा चक्र बदला जा रहा है।');
      TimerEngine.toggle();
    } else {
      AudioEngine.speakHindi(`आपने पूछा: ${transcript}। सुझाव है: 15-मिनट का विभाजन चक्र लागू करें या सहपाठी खेल शुरू करें।`);
    }
  }

  function updateVoiceUI(active, text) {
    const heroLabel = document.getElementById('voice-hero-label');
    const floatingLabel = document.getElementById('floating-voice-label');
    const soundwave = document.getElementById('soundwave-bars');

    if (soundwave) {
      if (active) soundwave.classList.remove('opacity-40');
      else soundwave.classList.add('opacity-40');
    }
    if (heroLabel) heroLabel.textContent = text;
    if (floatingLabel) floatingLabel.textContent = text;
  }

  return {
    init,
    startListening,
    routeIntent
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VoiceAssistant };
}

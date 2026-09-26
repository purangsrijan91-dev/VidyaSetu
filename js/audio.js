/**
 * KakshaSahay - Audio & Speech Engine with Defensive Error Boundaries
 * Hardware Web Audio synthesizers and Web Speech API with Hindi voice pack detection & visual fallbacks.
 */
'use strict';

const AudioEngine = (() => {
  let audioCtx = null;
  let hindiVoice = null;

  function initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      StateStore.setState({ speechAvailable: false, speechNotice: 'ब्राउज़र में स्पीच इंजन उपलब्ध नहीं है।' });
      return;
    }

    function detectHindi() {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          hindiVoice = voices.find(v => v.lang === 'hi-IN' || v.lang === 'hi' || v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi')) || null;
          
          if (hindiVoice) {
            StateStore.setState({ speechAvailable: true, speechNotice: '' });
          } else {
            // Voice pack missing on low-end device
            StateStore.setState({ 
              speechAvailable: false, 
              speechNotice: '⚠️ आपके डिवाइस में हिंदी वॉइस पैक (TTS) नहीं है। कृपया संवाद को स्क्रीन पर पढ़ें।' 
            });
          }
        }
      } catch (e) {
        console.warn('[AudioEngine] Error querying voices:', e);
      }
    }

    detectHindi();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = detectHindi;
    }
  }

  // Web Audio Dual-Tone Melodic Chime Generator (100% offline, zero network assets)
  function playTone(freq1 = 587.33, freq2 = 880, duration = 0.4) {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = freq1;
      osc2.frequency.value = freq2;

      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + duration);
      osc2.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('[AudioEngine] Audio tone synthesis notice:', e);
    }
  }

  const SPEECH_CHANNEL_NAME = 'kakshasahay_speech_channel';
  let speechChannel = null;
  const instanceId = 'audio_' + Math.random().toString(36).substring(2, 9);

  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      speechChannel = new BroadcastChannel(SPEECH_CHANNEL_NAME);
      speechChannel.onmessage = (e) => {
        if (e && e.data && e.data.type === 'CANCEL_SPEECH' && e.data.senderId !== instanceId) {
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            try { window.speechSynthesis.cancel(); } catch (_err) {}
          }
        }
      };
    } catch (_e) {}

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && typeof window !== 'undefined' && 'speechSynthesis' in window) {
          try { window.speechSynthesis.cancel(); } catch (_err) {}
        }
      });
    }
  }

  function cancelSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (_e) {}
    }
    if (speechChannel) {
      try {
        speechChannel.postMessage({ type: 'CANCEL_SPEECH', senderId: instanceId, timestamp: Date.now() });
      } catch (_e) {}
    }
  }

  // Defensive Speech Synthesis with Voice-Pack Fallback
  function speakHindi(text) {
    // 1. Accessibility announcer for screen readers
    try {
      const announcer = document.getElementById('sr-announcer');
      if (announcer) announcer.textContent = text;
    } catch (_e) {}

    // 2. Hardware Speech synthesis guard
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showVisualSpeechNotice('स्पीच इंजन उपलब्ध नहीं है।');
      return;
    }

    try {
      cancelSpeech(); // Cancel any overlapping queue locally and broadcast to peer tabs
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.88;

      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      utterance.onerror = (event) => {
        console.warn('[AudioEngine] Speech synthesis error/fallback:', event);
        showVisualSpeechNotice('आवाज़ नहीं चल सकी। कृपया स्क्रीन पर संवाद पढ़ें।');
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[AudioEngine] Speech invocation failed safely:', err);
      showVisualSpeechNotice('स्पीच त्रुटि: कृपया स्क्रीन पर संवाद पढ़ें।');
    }
  }

  function showVisualSpeechNotice(msg) {
    StateStore.setState({ speechNotice: msg });
    setTimeout(() => {
      StateStore.setState({ speechNotice: '' });
    }, 4000);
  }

  return {
    initVoices,
    playTone,
    cancelSpeech,
    speakHindi
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AudioEngine };
}

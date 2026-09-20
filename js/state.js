/**
 * VidyaSetu - Decoupled Reactive State Store
 * Isolates application state from DOM mutations and imperativeness.
 */
'use strict';

const StateStore = (() => {
  const subscribers = new Set();

  const state = {
    schoolMode: 'rural', // 'rural' | 'urban'
    activeTab: 'classroom',
    gradeFocus: 1, // 1 = Grade 1 Direct, 2 = Grade 2/3 Direct
    timerRunning: false,
    secondsRemaining: 900,
    targetEndTime: null,
    totalCycleSeconds: 900,
    nipunScore: 68,
    edgeApiKey: '',
    speechAvailable: false,
    speechNotice: '',
    selectedDialect: 'awadhi_bhojpuri',
    remediationPendingCount: 0
  };

  // Safe localStorage read on boot
  try {
    if (typeof localStorage !== 'undefined') {
      state.edgeApiKey = localStorage.getItem('vidyasetu_edge_api_key') || '';
    }
  } catch (e) {
    console.warn('[StateStore] LocalStorage disabled or blocked:', e);
  }

  function getState() {
    return { ...state };
  }

  function setState(patch) {
    let changed = false;
    for (const [key, value] of Object.entries(patch)) {
      if (state[key] !== value) {
        state[key] = value;
        changed = true;
      }
    }
    if (changed) {
      notifySubscribers();
    }
  }

  function subscribe(listener) {
    subscribers.add(listener);
    // Immediately emit current state on subscription
    try {
      listener(getState());
    } catch (e) {
      console.error('[StateStore] Error in listener callback:', e);
    }
    return () => subscribers.delete(listener);
  }

  function notifySubscribers() {
    const currentState = getState();
    subscribers.forEach((listener) => {
      try {
        listener(currentState);
      } catch (e) {
        console.error('[StateStore] Error dispatching to subscriber:', e);
      }
    });
  }

  return {
    getState,
    setState,
    subscribe
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StateStore };
}

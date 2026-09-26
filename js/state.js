/**
 * KakshaSahay - Decoupled Reactive Pedagogy State Store & FSM
 * Implements 15-Minute Multi-Grade Finite State Machine, Diagnostic Queue, and Input Sanitizer.
 */
'use strict';

const StateStore = (() => {
  const subscribers = new Set();

  // Formal 15-Minute Multi-Grade FSM States
  const FSM_STATES = {
    STANDBY: 'STANDBY',
    PHASE_1_DIRECT_G1: 'PHASE_1_DIRECT_G1',         // Teacher with Grade 1; Grade 2/3 peer-slate activity
    ROTATION_TRANSITION: 'ROTATION_TRANSITION',     // Bell chime, switch guidance, audio prompt
    PHASE_2_DIRECT_G2_3: 'PHASE_2_DIRECT_G2_3',     // Teacher with Grade 2/3; Grade 1 independent slate activity
    DIAGNOSTIC_REMEDIATION: 'DIAGNOSTIC_REMEDIATION',// 2-min oral catchup evaluation
    PAUSED: 'PAUSED'
  };

  const state = {
    schoolMode: 'rural', // 'rural' | 'urban'
    activeTab: 'classroom',
    gradeFocus: 1, // 1 = Grade 1 Direct, 2 = Grade 2/3 Direct
    timerRunning: false,
    secondsRemaining: 900,
    startTime: null,
    targetEndTime: null,
    totalCycleSeconds: 900,
    fsmState: FSM_STATES.STANDBY,
    nipunScore: 68,
    edgeApiKey: '',
    speechAvailable: false,
    speechNotice: '',
    selectedDialect: 'awadhi_bhojpuri',
    remediationPendingCount: 0,
    diagnosticQueue: []
  };

  // Safe localStorage read on boot
  try {
    if (typeof localStorage !== 'undefined') {
      state.edgeApiKey = localStorage.getItem('kakshasahay_edge_api_key') || localStorage.getItem('vidyasetu_edge_api_key') || '';
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

  // 15-Minute Multi-Grade FSM State Transitions
  function transitionFSM(action, payload = {}) {
    const prevFsm = state.fsmState;
    let nextFsm = prevFsm;

    switch (action) {
      case 'START_CYCLE':
        nextFsm = state.gradeFocus === 1 ? FSM_STATES.PHASE_1_DIRECT_G1 : FSM_STATES.PHASE_2_DIRECT_G2_3;
        break;
      case 'PAUSE_CYCLE':
        nextFsm = FSM_STATES.PAUSED;
        break;
      case 'RESUME_CYCLE':
        nextFsm = state.gradeFocus === 1 ? FSM_STATES.PHASE_1_DIRECT_G1 : FSM_STATES.PHASE_2_DIRECT_G2_3;
        break;
      case 'TRIGGER_ROTATION':
        nextFsm = FSM_STATES.ROTATION_TRANSITION;
        break;
      case 'COMPLETE_ROTATION':
        nextFsm = state.gradeFocus === 1 ? FSM_STATES.PHASE_1_DIRECT_G1 : FSM_STATES.PHASE_2_DIRECT_G2_3;
        break;
      case 'OPEN_DIAGNOSTIC':
        nextFsm = FSM_STATES.DIAGNOSTIC_REMEDIATION;
        break;
      case 'CLOSE_DIAGNOSTIC':
        nextFsm = state.timerRunning ? (state.gradeFocus === 1 ? FSM_STATES.PHASE_1_DIRECT_G1 : FSM_STATES.PHASE_2_DIRECT_G2_3) : FSM_STATES.STANDBY;
        break;
      default:
        console.warn('[StateStore] Unknown FSM action:', action);
    }

    if (nextFsm !== prevFsm) {
      setState({ fsmState: nextFsm, ...payload });
    }
  }

  // Input Sanitization Helper (Security Layer)
  function sanitizeInput(str, maxLength = 60) {
    if (typeof str !== 'string') return '';
    return str
      .normalize('NFC')
      .replace(/[<>&"'`]/g, '') // Strip HTML tag and attribute delimiters
      .replace(/[\x00-\x1F\x7F]/g, '') // Strip control characters
      .trim()
      .substring(0, maxLength);
  }

  return {
    getState,
    setState,
    subscribe,
    transitionFSM,
    sanitizeInput,
    FSM_STATES
  };
})();

if (typeof window !== 'undefined') {
  window.StateStore = StateStore;
}
if (typeof globalThis !== 'undefined') {
  globalThis.StateStore = StateStore;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StateStore };
}

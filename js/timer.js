/**
 * VidyaSetu - True Delta-Time Multigrade Clock Engine
 * Eliminates timer drift on budget Android Go devices during screen lock or background throttling.
 */
'use strict';

const TimerEngine = (() => {
  let intervalId = null;
  let targetEndTime = null;
  let onCycleCompleteCallback = null;

  function init(onCycleComplete) {
    onCycleCompleteCallback = onCycleComplete;

    // Listen for OS screen unlock or tab foregrounding to immediately resync delta
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          syncDeltaTick();
        }
      });
      window.addEventListener('focus', () => {
        syncDeltaTick();
      });
    }
  }

  function start(durationSeconds = 900) {
    const now = Date.now();
    targetEndTime = now + (durationSeconds * 1000);

    StateStore.setState({
      timerRunning: true,
      secondsRemaining: durationSeconds,
      targetEndTime: targetEndTime,
      totalCycleSeconds: durationSeconds
    });

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(syncDeltaTick, 500); // 500ms check avoids boundary clipping
  }

  function pause() {
    const currentState = StateStore.getState();
    if (!currentState.timerRunning) return;

    // Calculate exact true remaining seconds
    const now = Date.now();
    const remainingSeconds = targetEndTime ? Math.max(0, Math.ceil((targetEndTime - now) / 1000)) : currentState.secondsRemaining;

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    targetEndTime = null;

    StateStore.setState({
      timerRunning: false,
      secondsRemaining: remainingSeconds,
      targetEndTime: null
    });
  }

  function resume() {
    const currentState = StateStore.getState();
    start(currentState.secondsRemaining);
  }

  function toggle() {
    const currentState = StateStore.getState();
    if (currentState.timerRunning) {
      pause();
    } else {
      resume();
    }
  }

  function syncDeltaTick() {
    const currentState = StateStore.getState();
    if (!currentState.timerRunning || !targetEndTime) return;

    const now = Date.now();
    const remainingMs = targetEndTime - now;
    const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

    StateStore.setState({ secondsRemaining: remainingSecs });

    if (remainingMs <= 0) {
      // 15-Minute Cycle Finished
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      targetEndTime = null;
      StateStore.setState({
        timerRunning: false,
        secondsRemaining: 0,
        targetEndTime: null
      });

      if (typeof onCycleCompleteCallback === 'function') {
        onCycleCompleteCallback();
      }
    }
  }

  function reset(newDurationSeconds = 900) {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    targetEndTime = null;
    StateStore.setState({
      timerRunning: false,
      secondsRemaining: newDurationSeconds,
      targetEndTime: null,
      totalCycleSeconds: newDurationSeconds
    });
  }

  return {
    init,
    start,
    pause,
    resume,
    toggle,
    reset,
    syncDeltaTick
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TimerEngine };
}

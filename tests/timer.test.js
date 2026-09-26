/**
 * Unit Tests: True Delta-Time Clock Engine (TimerEngine)
 */
'use strict';

const { StateStore } = require('../js/state.js');
global.StateStore = StateStore;
const { TimerEngine } = require('../js/timer.js');

describe('TimerEngine & True Delta-Time Clock', () => {
  beforeEach(() => {
    TimerEngine.reset(900);
  });

  afterEach(() => {
    TimerEngine.pause();
  });

  test('Timer initializes with default 900 seconds and inactive state', () => {
    const s = StateStore.getState();
    expect(s.timerRunning).toBe(false);
    expect(s.secondsRemaining).toBe(900);
    expect(s.targetEndTime).toBeNull();
  });

  test('Timer start updates state and sets future targetEndTime', () => {
    TimerEngine.start(900);
    const s = StateStore.getState();
    expect(s.timerRunning).toBe(true);
    expect(typeof s.targetEndTime).toBe('number');
    expect(s.targetEndTime).toBeGreaterThan(Date.now());
  });

  test('syncDeltaTick accurately calculates remaining seconds without drifting', () => {
    TimerEngine.start(900);
    TimerEngine.syncDeltaTick();
    const s = StateStore.getState();
    expect(s.secondsRemaining).toBeLessThanOrEqual(900);
    expect(s.secondsRemaining).toBeGreaterThanOrEqual(898);
  });

  test('Timer pause preserves exact remaining seconds and stops running state', () => {
    TimerEngine.start(600);
    TimerEngine.pause();
    const paused = StateStore.getState();
    expect(paused.timerRunning).toBe(false);
    expect(paused.secondsRemaining).toBeLessThanOrEqual(600);
    expect(paused.targetEndTime).toBeNull();
  });

  test('Timer resume resumes from paused remaining seconds', () => {
    TimerEngine.start(300);
    TimerEngine.pause();
    const paused = StateStore.getState();
    TimerEngine.resume();
    const resumed = StateStore.getState();
    expect(resumed.timerRunning).toBe(true);
    expect(resumed.secondsRemaining).toBe(paused.secondsRemaining);
  });

  test('Timer toggle alternates between running and paused', () => {
    TimerEngine.reset(450);
    TimerEngine.toggle(); // starts
    expect(StateStore.getState().timerRunning).toBe(true);
    TimerEngine.toggle(); // pauses
    expect(StateStore.getState().timerRunning).toBe(false);
  });

  test('Timer never produces negative seconds when expired', () => {
    let completed = false;
    TimerEngine.init(() => { completed = true; });
    TimerEngine.start(1);

    // Mock time advancement beyond expiration
    const origNow = Date.now;
    try {
      Date.now = () => origNow() + 5000;
      TimerEngine.syncDeltaTick();
      const s = StateStore.getState();
      expect(s.secondsRemaining).toBe(0);
      expect(s.timerRunning).toBe(false);
      expect(completed).toBe(true);
    } finally {
      Date.now = origNow;
    }
  });

  test('Timer reset resets duration to custom value and stops execution', () => {
    TimerEngine.start(900);
    TimerEngine.reset(300);
    const s = StateStore.getState();
    expect(s.timerRunning).toBe(false);
    expect(s.secondsRemaining).toBe(300);
  });
});

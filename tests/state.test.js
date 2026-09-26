/**
 * Unit Tests: StateStore & 15-Minute Multi-Grade FSM
 */
'use strict';

const { StateStore } = require('../js/state.js');

describe('StateStore & Multi-Grade FSM Subsystem', () => {
  beforeEach(() => {
    StateStore.setState({
      schoolMode: 'rural',
      gradeFocus: 1,
      timerRunning: false,
      fsmState: StateStore.FSM_STATES.STANDBY,
      secondsRemaining: 900
    });
  });

  test('Initial state reflects rural defaults', () => {
    const s = StateStore.getState();
    expect(s.schoolMode).toBe('rural');
    expect(s.gradeFocus).toBe(1);
    expect(s.fsmState).toBe(StateStore.FSM_STATES.STANDBY);
  });

  test('Subscribers receive updates on state mutation and can unsubscribe', () => {
    const updates = [];
    const unsub = StateStore.subscribe((s) => updates.push(s.schoolMode));

    StateStore.setState({ schoolMode: 'urban' });
    StateStore.setState({ schoolMode: 'rural' });
    unsub();
    StateStore.setState({ schoolMode: 'urban' });

    expect(updates).toContain('urban');
    expect(updates.filter(m => m === 'urban').length).toBe(1);
  });

  test('FSM transitions correctly on START_CYCLE for Grade 1 focus', () => {
    StateStore.setState({ gradeFocus: 1 });
    StateStore.transitionFSM('START_CYCLE');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.PHASE_1_DIRECT_G1);
  });

  test('FSM transitions correctly on START_CYCLE for Grade 2/3 focus', () => {
    StateStore.setState({ gradeFocus: 2 });
    StateStore.transitionFSM('START_CYCLE');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.PHASE_2_DIRECT_G2_3);
  });

  test('FSM transitions to PAUSED on PAUSE_CYCLE and restores on RESUME_CYCLE', () => {
    StateStore.setState({ gradeFocus: 1 });
    StateStore.transitionFSM('START_CYCLE');
    StateStore.transitionFSM('PAUSE_CYCLE');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.PAUSED);

    StateStore.transitionFSM('RESUME_CYCLE');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.PHASE_1_DIRECT_G1);
  });

  test('FSM handles TRIGGER_ROTATION and COMPLETE_ROTATION', () => {
    StateStore.setState({ gradeFocus: 2 });
    StateStore.transitionFSM('TRIGGER_ROTATION');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.ROTATION_TRANSITION);

    StateStore.transitionFSM('COMPLETE_ROTATION');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.PHASE_2_DIRECT_G2_3);
  });

  test('FSM transitions into and out of DIAGNOSTIC_REMEDIATION', () => {
    StateStore.transitionFSM('OPEN_DIAGNOSTIC');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.DIAGNOSTIC_REMEDIATION);

    StateStore.transitionFSM('CLOSE_DIAGNOSTIC');
    expect(StateStore.getState().fsmState).toBe(StateStore.FSM_STATES.STANDBY);
  });
});

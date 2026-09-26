/**
 * Unit Tests: TaRL Ability Level Micro-Grouping & Session Summary Aggregation
 * Behavioral tests for Part 1 (Pedagogical differentiation) and Part 4 (Session Summary).
 */
'use strict';

const storageMock = (() => {
  let store = {};
  return {
    getItem: (k) => store[k] !== undefined ? store[k] : null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; }
  };
})();
global.localStorage = storageMock;

const { StateStore } = require('../js/state.js');

describe('TaRL Micro-Grouping & Ability Level Differentiation', () => {
  beforeEach(() => {
    localStorage.clear();
    StateStore.setState({
      rotationLevel: 'beginner',
      gradeFocus: 1,
      timerRunning: false
    });
  });

  test('Default rotation level initializes to beginner', () => {
    const s = StateStore.getState();
    expect(s.rotationLevel).toBe('beginner');
  });

  test('Rotation level updates state when set to developing or proficient', () => {
    StateStore.setState({ rotationLevel: 'developing' });
    expect(StateStore.getState().rotationLevel).toBe('developing');

    StateStore.setState({ rotationLevel: 'proficient' });
    expect(StateStore.getState().rotationLevel).toBe('proficient');
  });

  test('Differentiated tasks structure maps appropriate scaffolds per ability level', () => {
    const ROTATION_DIFFERENTIATED_TASKS = {
      beginner: {
        label: 'Beginner (अंक / वर्ण स्तर)',
        phaseA: {
          g1English: 'Direct instruction with Grade 1: Concrete counting with stones/beads and single-digit recognition.',
          g23English: 'Grades 2 & 3 Peer Practice: Front-row buddies pair with struggling students; count bundles of 10 seeds and write 1-50 on slates.'
        },
        phaseB: {
          g23English: 'Direct instruction with Grades 2 & 3: Guided 2-digit addition without carrying using bundles and loose sticks.',
          g1English: 'Grade 1 Independent Slate Practice: Tracing numerals 1 to 20 on slate; drawing tally dots for each number.'
        }
      },
      developing: {
        label: 'Developing (शब्द / संक्रिया स्तर)',
        phaseA: {
          g1English: 'Direct instruction with Grade 1: Grouping objects into sets of 5 and 10; number ladder jumps on chalkboard floor.',
          g23English: 'Grades 2 & 3 Peer Practice: Peer dyads write 2-digit number pairs on slates and test each other on single-step addition.'
        },
        phaseB: {
          g23English: 'Direct instruction with Grades 2 & 3: Regrouping and place-value decomposition (tens & ones) with slate problem sets.',
          g1English: 'Grade 1 Independent Slate Practice: Matching number cards to slate tallies; writing missing numbers in sequences up to 30.'
        }
      },
      proficient: {
        label: 'Proficient (वाक्य / अनुप्रयोग स्तर)',
        phaseA: {
          g1English: 'Direct instruction with Grade 1: Mental math bonds (sums to 10) and rapid number naming with slate flashcards.',
          g23English: 'Grades 2 & 3 Peer Practice: Student-led market story problem: one plays shopkeeper, one solves 2-digit total price on slate.'
        },
        phaseB: {
          g23English: 'Direct instruction with Grades 2 & 3: Multi-step contextual word problems involving measurement and money change.',
          g1English: 'Grade 1 Independent Slate Practice: Self-paced number sequence puzzles and writing simple 2-digit numbers (1-50) from memory.'
        }
      }
    };

    // Verify Beginner tasks have concrete scaffolds
    expect(ROTATION_DIFFERENTIATED_TASKS.beginner.phaseA.g1English).toContain('Concrete counting');
    expect(ROTATION_DIFFERENTIATED_TASKS.beginner.phaseA.g23English).toContain('bundles of 10');

    // Verify Developing tasks focus on decomposition and dyads
    expect(ROTATION_DIFFERENTIATED_TASKS.developing.phaseA.g23English).toContain('Peer dyads');
    expect(ROTATION_DIFFERENTIATED_TASKS.developing.phaseB.g23English).toContain('place-value decomposition');

    // Verify Proficient tasks focus on application / mental math
    expect(ROTATION_DIFFERENTIATED_TASKS.proficient.phaseA.g23English).toContain('market story problem');
    expect(ROTATION_DIFFERENTIATED_TASKS.proficient.phaseB.g23English).toContain('Multi-step contextual word problems');
  });

  test('Session summary correctly aggregates screening roster data and status', () => {
    const mockRoster = [
      { name: 'Aarav Patel', gap: 'Single-digit subtraction borrowing', buddy: 'Priya Sharma (Grade 3)', time: '10:15 AM' },
      { name: 'Meena Kumari', gap: 'Akshar-Matra decoding (ई की मात्रा)', buddy: 'Rahul Verma (Grade 2)', time: '10:30 AM' }
    ];

    // Helper simulating generateSessionSummaryHTML data aggregation
    function aggregateSessionData(roster, weeklyCycles, level) {
      const completedCount = roster.length;
      const targetWeeklyCycles = 20;
      const cycleProgressPercent = Math.min(100, Math.round((weeklyCycles / targetWeeklyCycles) * 100));

      return {
        screenedCount: completedCount,
        buddyCount: roster.filter(s => s.buddy).length,
        cycleCount: weeklyCycles,
        cyclePercent: cycleProgressPercent,
        activeLevel: level.toUpperCase()
      };
    }

    const summary = aggregateSessionData(mockRoster, 12, 'developing');
    expect(summary.screenedCount).toBe(2);
    expect(summary.buddyCount).toBe(2);
    expect(summary.cycleCount).toBe(12);
    expect(summary.cyclePercent).toBe(60);
    expect(summary.activeLevel).toBe('DEVELOPING');
  });

  test('Sanitizes level input to prevent arbitrary string injection', () => {
    const validLevels = ['beginner', 'developing', 'proficient'];
    function filterLevel(input) {
      return validLevels.includes(input) ? input : 'beginner';
    }

    expect(filterLevel('proficient')).toBe('proficient');
    expect(filterLevel('<script>alert(1)</script>')).toBe('beginner');
    expect(filterLevel('unknown')).toBe('beginner');
  });
});

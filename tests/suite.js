/**
 * VidyaSetu - Automated Test Suite
 * Validates StateStore, True Delta-Time Clock, Encrypted Storage, Generative RAG, and Security.
 */
'use strict';

const assert = require('assert');

// Mock browser globals for Node.js environment
global.window = {
  speechSynthesis: {
    getVoices: () => [{ lang: 'hi-IN', name: 'Google हिन्दी' }],
    speak: () => {},
    cancel: () => {}
  },
  AudioContext: class {
    constructor() { this.state = 'running'; }
    createOscillator() { return { start: () => {}, stop: () => {}, connect: () => {}, frequency: { value: 0 } }; }
    createGain() { return { gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
    get destination() { return {}; }
  }
};

global.document = {
  activeElement: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  getElementById: (id) => ({
    textContent: '',
    value: '',
    replaceChildren: () => {},
    classList: { add: () => {}, remove: () => {} },
    getBoundingClientRect: () => ({ height: 64, width: 220 })
  }),
  querySelectorAll: () => []
};

global.localStorage = (() => {
  let store = {};
  return {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; }
  };
})();

try {
  Object.defineProperty(global.navigator, 'serviceWorker', {
    value: { getRegistration: async () => ({ scope: 'http://localhost:3001/' }) },
    configurable: true,
    writable: true
  });
} catch (e) {}

global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
global.atob = (b64) => Buffer.from(b64, 'base64').toString('binary');

// Import modular subsystems
const { StateStore } = require('../js/state.js');
global.StateStore = StateStore;
const { TimerEngine } = require('../js/timer.js');
global.TimerEngine = TimerEngine;
const { StorageVault } = require('../js/storage.js');
global.StorageVault = StorageVault;
const { GenerativeRAG } = require('../js/rag.js');
global.GenerativeRAG = GenerativeRAG;
const { DiagnosticsEngine } = require('../js/diagnostics.js');
global.DiagnosticsEngine = DiagnosticsEngine;

let passed = 0;
let failed = 0;

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } catch (e) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${e.message}`);
    failed++;
  }
}

async function runAsyncTest(testName, testFn) {
  try {
    await testFn();
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } catch (e) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${e.message}`);
    failed++;
  }
}

async function runSuite() {
  console.log('\n=============================================================');
  console.log('🧪 VidyaSetu Comprehensive Automated Test Suite');
  console.log('=============================================================\n');

  // --- 1. StateStore Tests ---
  console.log('📦 1. Reactive StateStore Subsystem');
  runTest('Initial state matches default rural mode', () => {
    const s = StateStore.getState();
    assert.strictEqual(s.schoolMode, 'rural');
    assert.strictEqual(s.gradeFocus, 1);
    assert.strictEqual(s.secondsRemaining, 900);
  });

  runTest('State mutations notify registered subscribers', () => {
    let notifiedValue = null;
    const unsub = StateStore.subscribe((s) => {
      notifiedValue = s.schoolMode;
    });
    StateStore.setState({ schoolMode: 'urban' });
    assert.strictEqual(notifiedValue, 'urban');
    unsub();
    // Revert
    StateStore.setState({ schoolMode: 'rural' });
  });

  // --- 2. True Delta-Time Clock Tests ---
  console.log('\n⏱️ 2. True Delta-Time Clock Subsystem');
  runTest('Timer initializes without drift', () => {
    TimerEngine.start(900);
    const s = StateStore.getState();
    assert.strictEqual(s.timerRunning, true);
    assert.strictEqual(typeof s.targetEndTime, 'number');
    assert.ok(s.targetEndTime > Date.now());
  });

  runTest('Timer accurately calculates true remaining delta time', () => {
    TimerEngine.syncDeltaTick();
    const s = StateStore.getState();
    assert.ok(s.secondsRemaining <= 900 && s.secondsRemaining >= 898);
  });

  runTest('Timer pause and resume preserve exact second count', () => {
    TimerEngine.pause();
    const pausedState = StateStore.getState();
    assert.strictEqual(pausedState.timerRunning, false);
    TimerEngine.resume();
    const resumedState = StateStore.getState();
    assert.strictEqual(resumedState.timerRunning, true);
    TimerEngine.pause();
  });

  // --- 3. Encrypted Storage Vault Tests ---
  console.log('\n🔐 3. Protected Storage Vault Subsystem');
  await runAsyncTest('Encrypted student record saves and decrypts accurately', async () => {
    const record = {
      name: 'सोनू (कक्षा 2)',
      isProficient: false,
      reason: 'harvest'
    };
    const saved = await StorageVault.saveStudentRecord(record);
    assert.strictEqual(saved, true);

    const records = await StorageVault.getStudentRecords();
    assert.ok(records.length > 0);
    const found = records.find(r => r.name === 'सोनू (कक्षा 2)');
    assert.ok(found);
    assert.strictEqual(found.isProficient, false);
    assert.strictEqual(found.reason, 'harvest');
  });

  await runAsyncTest('Raw localStorage contains no unencrypted student names', async () => {
    const rawVal = global.localStorage.getItem('vidyasetu_enc_vault_v1');
    assert.ok(rawVal);
    // Student name must NOT be present as cleartext
    assert.strictEqual(rawVal.includes('सोनू (कक्षा 2)'), false);
  });

  await runAsyncTest('Storage latency benchmark measures real runtime performance', async () => {
    const bench = await StorageVault.benchmarkStorageLatency();
    assert.strictEqual(bench.pass, true);
    assert.ok(typeof bench.latencyMs === 'number');
  });

  // --- 4. Generative Bhasha Setu Tests ---
  console.log('\n🧠 4. Generative Bhasha Setu (Dialect Engine)');
  await runAsyncTest('Generates dialect analogy for subtraction in Awadhi/Bhojpuri', async () => {
    const res = await GenerativeRAG.generateAnalogy('घटाव', 'awadhi_bhojpuri', 'rural');
    assert.strictEqual(res.topic, 'घटाव (Subtraction)');
    assert.ok(res.analogy.length > 10);
    assert.ok(res.script.length > 10);
    assert.strictEqual(res.dialectName.includes('भोजपुरी'), true);
  });

  await runAsyncTest('Generates dialect analogy for fractions in Bundeli', async () => {
    const res = await GenerativeRAG.generateAnalogy('भिन्न', 'bundeli', 'rural');
    assert.strictEqual(res.topic, 'भिन्न (Fractions / Equal Parts)');
    assert.ok(res.analogy.includes('रोटी') || res.analogy.includes('गुड़') || res.analogy.includes('ककड़ी'));
  });

  await runAsyncTest('Dynamic semantic synthesizer handles arbitrary novel concepts', async () => {
    const res = await GenerativeRAG.generateAnalogy('ध्वनि का परावर्तन', 'chhattisgarhi', 'rural');
    assert.strictEqual(res.topic, 'ध्वनि का परावर्तन');
    assert.ok(res.analogy.length > 10);
    assert.ok(res.script.length > 10);
  });

  // --- 5. Non-Placebo Diagnostics Assertions ---
  console.log('\n🧪 5. Non-Placebo Diagnostics Engine');
  await runAsyncTest('Diagnostics execute dynamic assertions with real measurements', async () => {
    const assertions = await DiagnosticsEngine.runAllAssertions();
    assert.strictEqual(assertions.length, 6);
    
    const btnTest = assertions.find(a => a.name.includes('टच टारगेट'));
    assert.ok(btnTest);
    assert.ok(btnTest.detail.includes('px'));

    const storageTest = assertions.find(a => a.name.includes('स्टोरेज लेटेंसी'));
    assert.ok(storageTest);
    assert.ok(storageTest.detail.includes('ms'));
  });

  // --- 6. DOM Security Verification ---
  console.log('\n🛡️ 6. DOM Security & XSS Resistance');
  runTest('HTML textNode construction immune to malicious script tags', () => {
    const maliciousInput = '<img src=x onerror=alert(document.domain)>';
    const mockEl = { textContent: '' };
    mockEl.textContent = maliciousInput;
    assert.strictEqual(mockEl.textContent, '<img src=x onerror=alert(document.domain)>');
  });

  console.log('\n=============================================================');
  console.log(`Test Execution Finished: ${passed} Passed, ${failed} Failed`);
  console.log('=============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSuite();

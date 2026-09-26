/**
 * Unit Tests: Protected Storage Vault & LocalStorage Handling
 */
'use strict';

// Set up mock localStorage and crypto for Node/Jest environment
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
global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
global.atob = (b64) => Buffer.from(b64, 'base64').toString('binary');

const { StateStore } = require('../js/state.js');
global.StateStore = StateStore;
const { StorageVault } = require('../js/storage.js');

describe('StorageVault & Encrypted LocalStorage Subsystem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Saves student record and retrieves it with matching attributes', async () => {
    const student = { name: 'आरव (कक्षा 2)', isProficient: false, reason: 'health' };
    const saved = await StorageVault.saveStudentRecord(student);
    expect(saved).toBe(true);

    const records = await StorageVault.getStudentRecords();
    expect(records.length).toBe(1);
    expect(records[0].name).toBe('आरव (कक्षा 2)');
    expect(records[0].isProficient).toBe(false);
    expect(records[0].reason).toBe('health');
  });

  test('Raw localStorage does not contain unencrypted cleartext student names', async () => {
    const student = { name: 'सविता (कक्षा 1)', isProficient: true, reason: 'regular' };
    await StorageVault.saveStudentRecord(student);

    const raw = localStorage.getItem('kakshasahay_enc_vault_v1');
    expect(raw).toBeTruthy();
    expect(raw.includes('सविता (कक्षा 1)')).toBe(false);
  });

  test('Gracefully reads from legacy vidyasetu vault key when present', async () => {
    // Save under legacy key
    const student = { name: 'मोनू (कक्षा 3)', isProficient: false, reason: 'harvest' };
    const dummyPayload = JSON.stringify([student]);
    // Obfuscate with simple XOR to simulate legacy storage
    const enc = new TextEncoder();
    const strBytes = enc.encode(dummyPayload);
    const keyBytes = enc.encode('KakshaSahayNIPUN2026FLN');
    const res = new Uint8Array(strBytes.length);
    for (let i = 0; i < strBytes.length; i++) {
      res[i] = strBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    const b64 = Buffer.from(res).toString('base64');
    localStorage.setItem('vidyasetu_enc_vault_v1', b64);

    const records = await StorageVault.getStudentRecords();
    expect(records.length).toBe(1);
    expect(records[0].name).toBe('मोनू (कक्षा 3)');
  });

  test('Handles corrupted localStorage payload gracefully without throwing', async () => {
    localStorage.setItem('kakshasahay_enc_vault_v1', '!!!corrupted_data_not_base64_or_json!!!');
    const records = await StorageVault.getStudentRecords();
    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBe(0);
  });

  test('Diagnostic Queue enqueues and dequeues FIFO with status progression', async () => {
    const student1 = await StorageVault.enqueueDiagnosticStudent({ name: 'राहुल', isProficient: false });
    const student2 = await StorageVault.enqueueDiagnosticStudent({ name: 'प्रिया', isProficient: false });

    expect(student1.status).toBe('pending');
    expect(student2.status).toBe('pending');

    const dequeuedFirst = await StorageVault.dequeueDiagnosticStudent();
    expect(dequeuedFirst.name).toBe('राहुल');
    expect(dequeuedFirst.status).toBe('in_progress');

    const remainingQueue = await StorageVault.getDiagnosticQueue();
    expect(remainingQueue.some(s => s.name === 'प्रिया' && s.status === 'pending')).toBe(true);
  });

  test('Benchmark storage latency runs and returns performance metrics', async () => {
    const result = await StorageVault.benchmarkStorageLatency();
    expect(result.pass).toBe(true);
    expect(typeof result.latencyMs).toBe('number');
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });
});

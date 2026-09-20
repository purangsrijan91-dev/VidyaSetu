/**
 * VidyaSetu - Protected Student Data Vault
 * Encrypts identifying student and remediation records in localStorage using Web Crypto API.
 */
'use strict';

const StorageVault = (() => {
  const VAULT_KEY_PREFIX = 'vidyasetu_enc_vault_v1';
  const VAULT_SALT = 'VidyaSetuNIPUN2026FLN';

  function getCrypto() {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) return window.crypto;
    if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) return globalThis.crypto;
    if (typeof crypto !== 'undefined' && crypto.subtle) return crypto;
    return null;
  }

  // Fallback UTF-8 byte XOR obfuscation for environments without SubtleCrypto
  function simpleXorCodec(str, key) {
    const enc = new TextEncoder();
    const strBytes = enc.encode(str);
    const keyBytes = enc.encode(key);
    const res = new Uint8Array(strBytes.length);
    for (let i = 0; i < strBytes.length; i++) {
      res[i] = strBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(res).toString('base64');
    }
    let binary = '';
    for (let i = 0; i < res.byteLength; i++) {
      binary += String.fromCharCode(res[i]);
    }
    return btoa(binary);
  }

  function simpleXorDecode(encoded, key) {
    try {
      let bytes;
      if (typeof Buffer !== 'undefined') {
        bytes = new Uint8Array(Buffer.from(encoded, 'base64'));
      } else {
        const binary = atob(encoded);
        bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
      }
      const enc = new TextEncoder();
      const dec = new TextDecoder();
      const keyBytes = enc.encode(key);
      const res = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        res[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
      }
      return dec.decode(res);
    } catch (e) {
      return '';
    }
  }

  async function encryptData(plainText) {
    try {
      const crypt = getCrypto();
      if (crypt && crypt.subtle) {
        const enc = new TextEncoder();
        const keyMaterial = await crypt.subtle.importKey(
          'raw',
          enc.encode(VAULT_SALT),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );
        const key = await crypt.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: enc.encode('SaltVidyaSetuVault'),
            iterations: 1000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt']
        );
        const iv = crypt.getRandomValues ? crypt.getRandomValues(new Uint8Array(12)) : new Uint8Array(12);
        const encrypted = await crypt.subtle.encrypt(
          { name: 'AES-GCM', iv },
          key,
          enc.encode(plainText)
        );

        return JSON.stringify({
          iv: Array.from(iv),
          data: Array.from(new Uint8Array(encrypted))
        });
      }
    } catch (e) {
      console.warn('[StorageVault] WebCrypto unavailable, using obfuscation:', e);
    }
    return simpleXorCodec(plainText, VAULT_SALT);
  }

  async function decryptData(cipherPayload) {
    try {
      const crypt = getCrypto();
      if (cipherPayload.startsWith('{') && crypt && crypt.subtle) {
        const parsed = JSON.parse(cipherPayload);
        const enc = new TextEncoder();
        const dec = new TextDecoder();
        const keyMaterial = await crypt.subtle.importKey(
          'raw',
          enc.encode(VAULT_SALT),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );
        const key = await crypt.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: enc.encode('SaltVidyaSetuVault'),
            iterations: 1000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );
        const decrypted = await crypt.subtle.decrypt(
          { name: 'AES-GCM', iv: new Uint8Array(parsed.iv) },
          key,
          new Uint8Array(parsed.data)
        );
        return dec.decode(decrypted);
      }
    } catch (e) {
      console.warn('[StorageVault] WebCrypto decrypt fallback:', e);
    }
    return simpleXorDecode(cipherPayload, VAULT_SALT);
  }

  async function saveStudentRecord(record) {
    try {
      if (typeof localStorage === 'undefined') return false;
      const existing = await getStudentRecords();
      existing.push({
        ...record,
        timestamp: Date.now()
      });
      const encrypted = await encryptData(JSON.stringify(existing));
      localStorage.setItem(VAULT_KEY_PREFIX, encrypted);
      StateStore.setState({ remediationPendingCount: existing.filter(r => !r.isProficient).length });
      return true;
    } catch (e) {
      console.warn('[StorageVault] Failed to save encrypted student record:', e);
      return false;
    }
  }

  async function getStudentRecords() {
    try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(VAULT_KEY_PREFIX);
      if (!raw) return [];
      const decrypted = await decryptData(raw);
      return decrypted ? JSON.parse(decrypted) : [];
    } catch (e) {
      console.warn('[StorageVault] Error reading student records:', e);
      return [];
    }
  }

  // Real Storage Latency Benchmark for Non-Placebo Diagnostics
  async function benchmarkStorageLatency() {
    const start = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    try {
      if (typeof localStorage === 'undefined') return { pass: false, latencyMs: 0, reason: 'No localStorage' };
      const testKey = 'vidyasetu_benchmark_test';
      const testVal = 'benchmark_payload_' + Date.now();
      localStorage.setItem(testKey, testVal);
      const readVal = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      const end = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      const latencyMs = Math.round((end - start) * 100) / 100;
      return {
        pass: readVal === testVal,
        latencyMs: latencyMs
      };
    } catch (e) {
      return { pass: false, latencyMs: 0, reason: e.message };
    }
  }

  // Diagnostic Queue Subsystem (FIFO Queue persisted in Encrypted Vault)
  async function enqueueDiagnosticStudent(student) {
    try {
      const records = await getStudentRecords();
      const entry = {
        ...student,
        id: 'diag_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        queuedAt: Date.now(),
        status: 'pending'
      };
      records.push(entry);
      const encrypted = await encryptData(JSON.stringify(records));
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(VAULT_KEY_PREFIX, encrypted);
      }
      StateStore.setState({ 
        remediationPendingCount: records.filter(r => !r.isProficient || r.status === 'pending').length,
        diagnosticQueue: records.filter(r => r.status === 'pending')
      });
      return entry;
    } catch (e) {
      console.warn('[StorageVault] Enqueue diagnostic failed:', e);
      return null;
    }
  }

  async function dequeueDiagnosticStudent() {
    try {
      const records = await getStudentRecords();
      const pendingIdx = records.findIndex(r => r.status === 'pending');
      if (pendingIdx === -1) return null;
      const item = records[pendingIdx];
      item.status = 'in_progress';
      const encrypted = await encryptData(JSON.stringify(records));
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(VAULT_KEY_PREFIX, encrypted);
      }
      StateStore.setState({ diagnosticQueue: records.filter(r => r.status === 'pending') });
      return item;
    } catch (e) {
      console.warn('[StorageVault] Dequeue diagnostic failed:', e);
      return null;
    }
  }

  async function getDiagnosticQueue() {
    const records = await getStudentRecords();
    return records.filter(r => r.status === 'pending' || !r.isProficient);
  }

  return {
    saveStudentRecord,
    getStudentRecords,
    enqueueDiagnosticStudent,
    dequeueDiagnosticStudent,
    getDiagnosticQueue,
    benchmarkStorageLatency
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorageVault };
}

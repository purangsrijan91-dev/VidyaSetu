/**
 * Unit Tests: Input Sanitizer & XSS Resistance
 */
'use strict';

const { StateStore } = require('../js/state.js');

describe('InputSanitizer Subsystem', () => {
  test('Removes HTML markup tags and attribute delimiters', () => {
    const malicious = '<script>alert("xss")</script><img src=x onerror=alert(1)>Test';
    const cleaned = StateStore.sanitizeInput(malicious, 100);
    expect(cleaned).not.toContain('<');
    expect(cleaned).not.toContain('>');
    expect(cleaned).not.toContain('"');
    expect(cleaned).not.toContain("'");
    expect(cleaned).toContain('scriptalert(xss)/script');
  });

  test('Preserves full Devanagari Hindi text and standard punctuation', () => {
    const hindi = 'राजेश कुमार (कक्षा २) - जोड़ व घटाव अभ्यास';
    const cleaned = StateStore.sanitizeInput(hindi, 100);
    expect(cleaned).toBe(hindi);
  });

  test('Enforces maximum length bounds strictly', () => {
    const longInput = 'अ'.repeat(150);
    const cleaned = StateStore.sanitizeInput(longInput, 40);
    expect(cleaned.length).toBe(40);
  });

  test('Strips ASCII control characters and null bytes', () => {
    const dirty = 'विद्यार्थी\x00\x08\x1F\x7F';
    const cleaned = StateStore.sanitizeInput(dirty, 50);
    expect(cleaned).toBe('विद्यार्थी');
  });

  test('Handles non-string inputs safely without errors', () => {
    expect(StateStore.sanitizeInput(null)).toBe('');
    expect(StateStore.sanitizeInput(undefined)).toBe('');
    expect(StateStore.sanitizeInput(12345)).toBe('');
    expect(StateStore.sanitizeInput({})).toBe('');
  });
});

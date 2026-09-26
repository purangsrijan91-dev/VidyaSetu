/**
 * Unit Tests: Pedagogical Engine & Dialect Reasoning (GenerativeRAG)
 */
'use strict';

const { StateStore } = require('../js/state.js');
global.StateStore = StateStore;
const { GenerativeRAG } = require('../js/rag.js');

describe('Pedagogical Engine & Dialect Analogies', () => {
  beforeEach(() => {
    StateStore.setState({ edgeApiKey: '' }); // Force deterministic local engine
  });

  test('Retrieves localized analogy for known syllabus concept (घटाव)', async () => {
    const result = await GenerativeRAG.generateAnalogy('घटाव', 'awadhi_bhojpuri', 'rural');
    expect(result.topic).toContain('घटाव');
    expect(result.domain).toContain('गणित');
    expect(result.analogy).toBeTruthy();
    expect(result.script).toContain('बेर');
    expect(result.isCloudEdge).toBe(false);
  });

  test('Produces urban-adapted script when schoolMode is urban', async () => {
    const result = await GenerativeRAG.generateAnalogy('घटाव', 'urban_multilingual', 'urban');
    expect(result.script).toContain('दुकानदार');
    expect(result.isCloudEdge).toBe(false);
  });

  test('Produces dialect-specific Bundeli analogy for fractions (भिन्न)', async () => {
    const result = await GenerativeRAG.generateAnalogy('भिन्न', 'bundeli', 'rural');
    expect(result.topic).toContain('भिन्न');
    expect(result.analogy).toBeTruthy();
  });

  test('Handles novel / unsupported syllabus concept via dynamic semantic generator', async () => {
    const novelConcept = 'वायुमंडलीय दबाव (Atmospheric Pressure)';
    const result = await GenerativeRAG.generateAnalogy(novelConcept, 'chhattisgarhi', 'rural');
    expect(result.topic).toBe(novelConcept);
    expect(result.analogy).toBeTruthy();
    expect(result.script).toBeTruthy();
    expect(result.activity).toBeTruthy();
    expect(result.dialectName).toContain('छत्तीसगढ़ी');
    expect(result.isCloudEdge).toBe(false);
  });

  test('Handles empty or undefined concept by defaulting safely to standard topic', async () => {
    const result = await GenerativeRAG.generateAnalogy('', 'awadhi_bhojpuri', 'rural');
    expect(result.topic).toContain('घटाव');
    expect(result.analogy).toBeTruthy();
  });

  test('Knowledge bank exposes verified curriculum concepts', () => {
    const size = GenerativeRAG.getKnowledgeBankSize();
    expect(size).toBeGreaterThanOrEqual(3);
  });
});

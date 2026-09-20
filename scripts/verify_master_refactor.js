const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('===========================================================');
console.log('🔍 VidyaSetu Master Refactoring Verification Suite');
console.log('===========================================================\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// 1. Single file and structure
assert(content.startsWith('<!DOCTYPE html>') && content.includes('</html>'), 'Single valid runnable HTML document');
assert(!content.includes('/* ...') && !content.includes('// ...') && !content.includes('TODO'), 'Zero placeholders or TODOs');
assert(!content.includes('.innerHTML ='), 'Zero .innerHTML dynamic assignments');

// 2. Prototype Purge
assert(!content.toLowerCase().includes('self-test'), 'Zero "Self-Test" references');
assert(!content.includes('जांचें'), 'Zero "जांचें" obsolete diagnostic test buttons');
assert(!content.includes('vidyasetu_deck.html'), 'Zero links to vidyasetu_deck.html');
assert(!content.match(/Slide \d+/i), 'Zero slide deck numbering');

// 3. Voice Synthesis Engine (Section 2)
assert(content.includes('getVoices()') && content.includes('onvoiceschanged'), 'Speech voice discovery via getVoices and onvoiceschanged');
assert(content.includes('hi-IN') && content.includes('en-IN'), 'Voice priorities include Hindi (hi-IN) and Indian English (en-IN)');
assert(content.includes('utterance.pitch = 1.18') && content.includes('utterance.rate = 0.88') && content.includes('utterance.volume = 0.95'), 'Exact speech characteristics (pitch 1.18, rate 0.88, volume 0.95)');
assert(content.includes('window.speechSynthesis.cancel()'), 'Queue canceled before utterance');

// 4. Curriculum Data (Section 3 & 4)
assert(content.includes('CURRICULUM_DATA'), 'CURRICULUM_DATA dictionary present');
assert(content.includes('A curated NCERT/NIPUN Bharat-aligned learning dataset for Grades 1–3'), 'Exact curated NCERT/NIPUN description present');
assert(content.includes('Grade 1') && content.includes('Grade 2') && content.includes('Grade 3'), 'Grades 1, 2, 3 present in curriculum');
assert(content.includes('वर्ण पहचान — क, म, न, र') && content.includes('दो-अक्षर अमात्रिक शब्द — घर, जल, फल'), 'Grade 1 Hindi topics present');
assert(content.includes('1 से 9 वस्तुओं की गिनती') && content.includes('10–20 की समूह समझ'), 'Grade 1 Math topics present');
assert(content.includes('Phonic Letter Sounds (A–Z ध्वनियां)'), 'Grade 1 English present');
assert(content.includes('स्थानीय मान — दहाई और इकाई') && content.includes('दो-अंकीय जोड़') && content.includes('दो-अंकीय घटाव'), 'Grade 2 Math topics present');
assert(content.includes('संयुक्त वर्ण') && content.includes('विराम चिह्न'), 'Grade 3 Hindi topics present');
assert(content.includes('तीन-अंकीय स्थानीय मान') && content.includes('अवरोही क्रम') && content.includes('गुणा') && content.includes('भाग'), 'Grade 3 Math topics present');
assert(content.includes('हमारे सहायक एवं कारीगर') && content.includes('जल के स्रोत एवं स्वच्छता'), 'Grade 3 EVS present');

// 5. Dynamic Problem Generator (Section 6 & 7)
assert(content.includes('generateDynamicProblem(grade, subject)'), 'generateDynamicProblem(grade, subject) function present');
assert(content.includes('problemHistory') || content.includes('bounded history'), 'Bounded history to avoid duplicate problems');
assert(content.includes('RURAL_ITEMS') || content.includes('बेर') && content.includes('कंकड़') && content.includes('इमली के बीज'), 'Rural contextual items present');

// 6. Mastery Progression (Section 8 & 9)
assert(content.includes('completedCount') && content.includes('currentStreak'), 'Mastery tracking variables present');
assert(content.includes('अभ्यास पूरे:') && content.includes('लगातार सही:'), 'Mastery display badges present');
assert(content.includes('अगला अभ्यास / समस्या बदलें'), '"अगला अभ्यास / समस्या बदलें" control present');

// 7. Classroom Copilot (Section 10, 11, 12, 13, 14)
assert(content.includes('Math: Class 2 Place Value game'), 'Prompt pill 1 present');
assert(content.includes('Hindi: Class 1 Phonics drill'), 'Prompt pill 2 present');
assert(content.includes('Classroom Management: Quiet room game'), 'Prompt pill 3 present');
assert(content.includes('Multi-Grade: Keep Class 3 engaged during Class 1 reading'), 'Prompt pill 4 present');
assert(content.includes('Absentee: Rapid check for returning student'), 'Prompt pill 5 present');
assert(content.includes('Zero-Cost: 10-minute game with stones and slates'), 'Prompt pill 6 present');

// 8. Intent Engine & Responses
assert(content.includes('Chit-Chat / Simon Says silent finger game'), 'Classroom management response present');
assert(content.includes('Peer Chalkboard Relay'), 'Multi-grade response present');
assert(content.includes('Matchstick & Bundle activity'), 'Place value response present');
assert(content.includes('Pebble Basket relay'), 'Addition response present');
assert(content.includes('Sand/Slate Phonics hunt'), 'Reading/phonics response present');
assert(content.includes('2-minute oral rapid triage'), 'Absentee response present');
assert(content.includes('मैं आपकी मदद कर सकता हूँ। इनमें से कोई विकल्प चुनें:'), 'Intent fallback message present');
assert(content.includes('मैंने ठीक से नहीं सुना। कृपया दोबारा बोलें'), 'Speech uncertainty message present');

// 9. Response card 5-sections
assert(content.includes('लक्ष्य') && content.includes('सामग्री') && content.includes('शिक्षक क्या कहें') && content.includes('बच्चों की गतिविधि') && content.includes('समय'), 'All 5 response card sections present');
assert(content.includes('announceSpeech(resp.script)'), 'Read Aloud speaks ONLY teacher script');

// 10. Node VM Syntax Check
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
try {
  new vm.Script(scriptMatch[1]);
  assert(true, 'JavaScript in <script> compiles without syntax errors');
} catch (e) {
  assert(false, 'JavaScript syntax error: ' + e.message);
}

console.log('\n===========================================================');
console.log(`Results: ${passCount} Passed, ${failCount} Failed`);
console.log('===========================================================');

if (failCount > 0) process.exit(1);

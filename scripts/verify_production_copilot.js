const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('======================================================');
console.log('🔍 VidyaSetu Production Copilot Verification Suite');
console.log('======================================================\n');

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

// 1. Single-file completeness
assert(content.startsWith('<!DOCTYPE html>') && content.includes('</html>'), 'Complete valid HTML document');
assert(!content.includes('/* ...rest of code... */') && !content.includes('// ...rest') && !content.includes('TODO:'), 'No placeholder comments or ellipses');

// 2. Strict CSP & zero innerHTML
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
assert(scriptMatch && scriptMatch[1].length > 0, 'Script block found');
const scriptContent = scriptMatch ? scriptMatch[1] : '';

assert(!content.includes('.innerHTML'), 'Zero occurrences of .innerHTML');
assert(!content.includes('dangerouslySetInnerHTML'), 'Zero dangerous innerHTML methods');

// Check no external CDNs in script or link tags
const cdnPatterns = [/cdn\./i, /unpkg\.com/i, /jsdelivr\.net/i, /cdnjs\.cloudflare\.com/i, /fonts\.googleapis\.com/i];
const hasExternalCDN = cdnPatterns.some(p => p.test(content));
assert(!hasExternalCDN, 'Zero external CSS/JS framework CDNs or Google Fonts');

// 3. Metadata & UI Purge
assert(!content.toLowerCase().includes('self-test'), 'Zero occurrences of "Self-Test"');
assert(!content.includes('जांचें'), 'Zero occurrences of "जांचें"');
assert(!content.includes('vidyasetu_deck.html'), 'Zero references to vidyasetu_deck.html');
assert(!content.match(/Slide \d+/i), 'Zero slide numbering ("Slide 8", etc.)');
assert(!content.includes('Team Member') && !content.includes('Core Contributors'), 'Zero team member cards');

// 4. Header title & badges
assert(content.includes('VidyaSetu (विद्यासेतु) • FLN Classroom Copilot'), 'Header title is "VidyaSetu (विद्यासेतु) • FLN Classroom Copilot"');
assert(content.includes('NIPUN Bharat Aligned'), 'Header badge "NIPUN Bharat Aligned" present');
assert(content.includes('15-Min MGML Cycle'), 'Header badge "15-Min MGML Cycle" present');

// 5. 15-Minute Timer Engine
assert(content.includes('state.targetEpoch') && content.includes('Date.now() + (remainingSecs * 1000)'), 'Hardware delta timestamp state.targetEpoch used');
assert(!content.includes('10-Min') && !content.includes('20-Min') && !content.includes('10 Min') && !content.includes('20 Min'), 'No 10 or 20 minute cycle buttons');
assert(content.includes('window.speechSynthesis.cancel()'), 'Audio trigger cancels prior speech before announcement');
assert(content.includes('15-minute multi-grade cycle started. Teacher direct instruction with Grade 1; Grades 2 and 3 on collaborative peer tasks.'), 'Exact speech announcement text present');

// 6. Google Drive Pop-out Interceptor
assert(content.includes('class="video-container"') && content.includes('padding-top: 56.25%'), 'Video container with 56.25% aspect ratio present');
assert(content.includes('External pop-out disabled'), 'Pop-out blocker overlay with title "External pop-out disabled" present');
assert(content.includes('width: 68px; height: 68px; z-index: 30;'), 'Pop-out blocker dimensions 68px x 68px with z-index 30 present');

// 7. Resilient Interactive Live Tour
assert(content.includes('id="card-mgml"') && content.includes('id="card-bhasha"') && content.includes('id="card-absentee"') && content.includes('id="card-tlm"'), 'Tour target card IDs (#card-mgml, #card-bhasha, #card-absentee, #card-tlm) present');
assert(content.includes('tour-banner') && content.includes('bottom: 1.5rem') && content.includes('z-index: 999'), 'Floating bottom tour banner present');
assert(content.includes('boxShadow = \'none\'') || content.includes('box-shadow: none'), 'Outline cleanup (boxShadow = "none") executed on step transition');

// 8. Cascading Curriculum Selector (Bhasha Setu)
assert(content.includes('CURRICULUM_DATA'), 'CURRICULUM_DATA dictionary present');
assert(content.includes('Grade 1') && content.includes('Grade 2') && content.includes('Grade 3'), 'Grades 1-3 present in curriculum');
assert(content.includes('Textbook Concept') && content.includes('Rural Metaphor') && content.includes('Immediate Classroom Action'), 'Inline 3-tier card structure present');

// 9. Persistent Absenteeism Triage
assert(content.includes('vidyasetu_roster'), 'localStorage["vidyasetu_roster"] used for persistence');
assert(content.includes('Needs Peer Buddy'), 'Needs Peer Buddy action present');
assert(content.includes('Start 2-Min Oral Diagnostic'), 'Start 2-Min Oral Diagnostic button present');

// 10. Resilient Voice Assistant
assert(content.includes('SpeechRecognition') || content.includes('webkitSpeechRecognition'), 'SpeechRecognition API checked');
assert(content.includes('Grade 2 Math subtraction game') && content.includes('Grade 1 Phonics drill') && content.includes('Grade 3 Descending order ladder'), '3 fallback pills present');
assert(content.includes('/subtract|घटाव/') && content.includes('/phonic|वर्ण/') && content.includes('/order|क्रम/'), 'Offline regex mapper patterns present');

// 11. Script syntax check via Node VM
try {
  // Wrap in a mock DOM environment to verify syntax
  new vm.Script(scriptContent);
  assert(true, 'JavaScript in <script> compiles without syntax errors');
} catch (e) {
  assert(false, 'JavaScript syntax error: ' + e.message);
}

console.log('\n======================================================');
console.log(`Results: ${passCount} Passed, ${failCount} Failed`);
console.log('======================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All criteria successfully verified!');
}

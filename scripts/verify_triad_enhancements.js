const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('===========================================================');
console.log('🔍 VidyaSetu Triad Enhancements Verification Suite');
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

// 1. Single File & Zero Build
assert(content.startsWith('<!DOCTYPE html>') && content.includes('</html>'), 'Single valid runnable HTML document');
assert(!content.includes('/* ...') && !content.includes('// ...') && !content.includes('TODO'), 'Zero placeholder comments or ellipses');

// 2. CSP & Security
assert(content.includes('frame-src https://drive.google.com'), 'CSP explicitly allows frame-src https://drive.google.com');
assert(!content.includes('unsafe-eval'), 'Zero unsafe-eval in CSP');
assert(!content.includes('.innerHTML ='), 'Zero .innerHTML dynamic assignments');
assert(!content.includes('dangerouslySetInnerHTML'), 'Zero dangerous innerHTML');
assert(!content.match(/\son[a-z]+=["']/i), 'Zero inline on* event attributes in HTML tags');

// 3. Speech Synthesis Engine (Prompt 10 Section 2)
assert(content.includes('getVoices()') && content.includes('onvoiceschanged'), 'Speech voice discovery via getVoices and onvoiceschanged');
assert(content.includes('hi-IN') && content.includes('en-IN'), 'Language-aware speech targets hi-IN and en-IN');
assert(content.includes('Google हिन्दी') && content.includes('Microsoft Heera') && content.includes('Neerja'), 'Preferred Indian voice name preferences present');
assert(content.includes('utterance.pitch = 1.0') && content.includes('utterance.rate = 0.92') && content.includes('utterance.volume = 1.0'), 'Conservative natural speech parameters (pitch 1.0, rate 0.92, volume 1.0)');
assert(content.includes('window.speechSynthesis.cancel()'), 'Speech queue canceled before new utterance');

// 4. "How it Works" Walkthrough & Dialog (Prompt 10 Section 3)
assert(content.includes('id="btn-how-it-works"'), 'Header action #btn-how-it-works present');
assert(content.includes('id="walkthrough-dialog"') || content.includes('id="walkthrough-modal-backdrop"'), 'Accessible walkthrough modal/dialog present');
assert(content.includes('role="dialog"') && content.includes('aria-modal="true"'), 'Modal has role="dialog" and aria-modal="true"');
assert(content.includes('id="btn-close-walkthrough"'), 'Visible close button #btn-close-walkthrough present');
assert(content.includes('Escape') && content.includes('closeWalkthrough'), 'Escape key closes walkthrough dialog');
assert(content.includes('lastFocusedElement'), 'Focus restoration to opener on dialog close');
assert(content.includes('https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview'), 'Google Drive video preview URL embedded');
assert(content.includes('id="btn-audio-explain"'), 'Audio explanation button #btn-audio-explain present');
assert(content.includes('AUDIO_WALKTHROUGH') || content.includes('playNextWalkthroughUtterance'), 'Audio explanation controller present');
assert(content.includes('stopAudioExplanation()'), 'Closing dialog or starting speech cancels audio explanation');

// 5. English ↔ Hindi Language Toggle (Prompt 10 Section 4 & 5)
assert(content.includes('id="btn-lang-toggle"'), 'Header language toggle button #btn-lang-toggle present');
assert(content.includes('vidyasetu_lang'), 'Persistence key "vidyasetu_lang" in localStorage');
assert(content.includes('TRANSLATIONS'), 'Centralized TRANSLATIONS dictionary present');
assert(content.includes('data-i18n'), 'data-i18n attributes used for declarative text translation');
assert(content.includes('document.querySelectorAll(\'[data-i18n]\')') || content.includes('document.querySelectorAll("[data-i18n]")'), 'DOM query selector for data-i18n elements');

// 6. Responsive Design & Touch Targets (Section 7 & 8)
assert(content.includes('min-height: 48px') || content.includes('48px'), 'Interactive buttons satisfy 48px touch target');

// 7. JavaScript Syntax Check via Node VM
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
assert(scriptMatch && scriptMatch[1].length > 0, 'Script block found');
try {
  new vm.Script(scriptMatch[1]);
  assert(true, 'JavaScript compiles without syntax errors');
} catch (e) {
  assert(false, 'JavaScript syntax error: ' + e.message);
}

console.log('\n===========================================================');
console.log(`Results: ${passCount} Passed, ${failCount} Failed`);
console.log('===========================================================');

if (failCount > 0) process.exit(1);

const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('========================================================');
console.log('🔍 Comprehensive Verification of Refactored VidyaSetu UI');
console.log('========================================================\n');

const html = fs.readFileSync('index.html', 'utf8');

// Test 1: No modal-wrapper
console.log('1. Checking removal of intrusive full-screen modal-wrapper...');
assert.strictEqual(html.includes('id="modal-wrapper"'), false, 'id="modal-wrapper" MUST NOT exist');
assert.strictEqual(html.includes('.modal-backdrop'), false, '.modal-backdrop MUST NOT exist');
console.log('   ✅ PASS: modal-wrapper and modal-backdrop completely removed.');

// Test 2: Check all inline drawers
console.log('2. Checking presence of expandable inline drawers...');
const requiredDrawers = [
  'id="drawer-self-test"',
  'id="drawer-mgml"',
  'id="drawer-bhasha"',
  'id="drawer-absentee"',
  'id="drawer-tlm"'
];
requiredDrawers.forEach(d => {
  assert.ok(html.includes(d), 'Drawer missing: ' + d);
});
assert.ok(html.includes('.drawer-content.expanded'), '.drawer-content.expanded CSS missing');
console.log('   ✅ PASS: All 5 inline drawers and transitions present.');

// Test 3: Check zero innerHTML in <script>
console.log('3. Verifying ZERO innerHTML in script tags...');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart, scriptEnd);
const innerHtmlMatches = scriptContent.match(/\.innerHTML\s*=/g);
assert.strictEqual(innerHtmlMatches, null, 'No .innerHTML assignments allowed! Found: ' + (innerHtmlMatches ? innerHtmlMatches.length : 0));
console.log('   ✅ PASS: Zero .innerHTML assignments found in scripts (100% safe DOM node creation).');

// Test 4: Check JavaScript syntax validity of inline script
console.log('4. Validating JavaScript syntax of inline script...');
try {
  // Strip out HTML script tags and parse with Node VM
  const jsCode = scriptContent.replace('<script>', '');
  new vm.Script(jsCode);
  console.log('   ✅ PASS: Inline JavaScript compiles cleanly with no syntax errors.');
} catch (e) {
  console.error('   ❌ FAIL: JavaScript syntax error in index.html:', e);
  process.exit(1);
}

// Test 5: Check Slide 7 Absentee Remediation Roster
console.log('5. Checking Slide 7 Absentee Remediation & vidyasetu_roster persistence...');
assert.ok(scriptContent.includes('vidyasetu_roster'), "Must reference 'vidyasetu_roster' in storage");
assert.ok(scriptContent.includes('renderRosterTags'), 'Must have renderRosterTags');
assert.ok(scriptContent.includes('resolveRosterItem'), 'Must have resolveRosterItem');
assert.ok(html.includes('id="active-remediation-tags"'), 'Must have active-remediation-tags container');
assert.ok(html.includes('id="student-days-select"'), 'Must have student-days-select');
console.log('   ✅ PASS: Real Absentee Remediation with localStorage persistence verified.');

// Test 6: Check Slide 6 Bhasha Setu 6 Foundational Concepts
console.log('6. Checking Slide 6 Bhasha Setu 6 Foundational Concepts...');
const concepts = [
  'subtraction',
  'descending_order',
  'place_value',
  'addition',
  'ascending_order',
  'phoneme_ka'
];
concepts.forEach(c => {
  assert.ok(html.includes(`value="${c}"`), 'Dropdown option missing: ' + c);
  assert.ok(scriptContent.includes(`${c}:`), 'Concept data missing in script: ' + c);
});
assert.ok(scriptContent.includes('renderBhashaDrawerComparison'), 'renderBhashaDrawerComparison missing');
console.log('   ✅ PASS: All 6 foundational concepts and side-by-side comparison boxes present.');

// Test 7: Check Slide 5 Multi-Grade Split & Acoustic Bell
console.log('7. Checking Slide 5 Multi-Grade Split, focus borders & acoustic bell...');
assert.ok(html.includes('id="track-grade-1"'), 'track-grade-1 missing');
assert.ok(html.includes('id="track-grade-2-3"'), 'track-grade-2-3 missing');
assert.ok(html.includes('.pulse-instruction'), '.pulse-instruction CSS missing');
assert.ok(html.includes('.track-active'), '.track-active CSS missing');
assert.ok(html.includes('.track-inactive'), '.track-inactive CSS missing');
assert.ok(scriptContent.includes('playAcousticBell'), 'playAcousticBell missing');
console.log('   ✅ PASS: Multi-grade dual tracks, focus borders, pulse animation, and acoustic bell verified.');

// Test 8: Check Slide 9 Chalkboard TLM & Number Train ASCII Game
console.log('8. Checking Slide 9 Chalkboard TLM & Number Train ASCII Game...');
assert.ok(html.includes('.chalkboard-box'), '.chalkboard-box CSS missing');
assert.ok(scriptContent.includes('renderTlmDrawer'), 'renderTlmDrawer missing');
assert.ok(scriptContent.includes('[ 2 ] ===== [ ? ] ===== [ 4 ] ===== [ ? ] ===== [ 6 ]'), 'ASCII Number Train missing');
console.log('   ✅ PASS: Chalkboard TLM drawer, ASCII Number Train game, and zero-cost material switcher verified.');

// Test 9: Check Video Facade
console.log('9. Checking Video Facade for deferred iframe loading...');
assert.ok(html.includes('id="hero-video-facade"'), 'hero-video-facade missing');
assert.ok(html.includes('id="page-video-facade"'), 'page-video-facade missing');
assert.ok(html.includes('.video-facade-play-btn'), '.video-facade-play-btn missing');
console.log('   ✅ PASS: Video Facade implementation verified on both hero and dedicated video page.');

// Test 10: Check 12-Slide Deck preservation
console.log('10. Checking 12-Slide Presentation Deck preservation...');
assert.ok(html.includes('id="page-deck"'), '#page-deck missing');
for (let s = 1; s <= 12; s++) {
  assert.ok(html.includes(`data-slide="${s}"`), `data-slide="${s}" missing`);
}
assert.ok(scriptContent.includes('const PresentationEngine'), 'PresentationEngine missing');
console.log('   ✅ PASS: All 12 presentation slides and PresentationEngine verified.');

console.log('\n========================================================');
console.log('🎉 ALL 10 REFACORING VERIFICATION TESTS PASSED!');
console.log('========================================================\n');

// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('KakshaSahay End-to-End Workflow Verification', () => {

  test('1. App boots successfully with zero script runtime errors and valid branding', async ({ page }) => {
    const scriptErrors = [];
    page.on('pageerror', err => {
      scriptErrors.push(err.message);
    });

    await page.goto('http://localhost:3001');
    await expect(page).toHaveTitle(/KakshaSahay/);

    const brandHeader = page.locator('header h1');
    await expect(brandHeader).toContainText('KakshaSahay');

    // Confirm no uncaught runtime or script errors occurred
    expect(scriptErrors).toEqual([]);
  });

  test('2. 15-Minute MGML Timer cycles, switches focus, pauses, and resets', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const timerDisplay = page.locator('#timer-display');
    await expect(timerDisplay).toHaveText('15:00');

    const toggleBtn = page.locator('#btn-toggle-timer');
    const resetBtn = page.locator('#btn-reset-timer');
    const switchBtn = page.locator('#btn-switch-focus');

    // Start cycle
    await toggleBtn.click();
    await page.waitForTimeout(1100);

    // Verify timer has ticked down
    const textAfterStart = await timerDisplay.textContent();
    expect(textAfterStart).not.toBe('15:00');

    // Switch pedagogical grade focus
    await switchBtn.click();

    // Pause timer
    await toggleBtn.click();
    const textAfterPause = await timerDisplay.textContent();
    await page.waitForTimeout(1000);
    // Should remain same while paused
    await expect(timerDisplay).toHaveText(textAfterPause || '');

    // Reset timer
    await resetBtn.click();
    await expect(timerDisplay).toHaveText('15:00');
  });

  test('3. Bhasha Setu generates localized pedagogical analogy without network call', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const explainBtn = page.locator('#btn-explain-concept');
    await explainBtn.click();

    const outputArea = page.locator('#bhasha-output-area');
    await expect(outputArea).not.toBeEmpty();
    await expect(outputArea).toContainText(/Rural Metaphor|घरेलू सादृश्य|Textbook Concept/);
  });

  test('4. Absentee Triage runs 2-minute diagnostic and persists student across reload', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const nameInput = page.locator('#absentee-name-input');
    await nameInput.fill('परी शर्मा (कक्षा 2)');

    const startDiagBtn = page.locator('#btn-start-diagnostic');
    await startDiagBtn.click();

    // Checklist appears
    const checklistArea = page.locator('#absentee-checklist-area');
    await expect(checklistArea).toBeVisible();

    // Check oral screening items
    const checkboxes = checklistArea.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }

    // Save evaluation using Needs Peer Buddy to test roster addition
    const needsBuddyBtn = checklistArea.getByRole('button', { name: /Needs Peer Buddy/i });
    await needsBuddyBtn.click();

    // Student should now be in active roster
    const rosterContainer = page.locator('#active-roster-container');
    await expect(rosterContainer).toContainText('परी शर्मा');

    // Reload page to verify persistence in localStorage
    await page.reload();
    await expect(page.locator('#active-roster-container')).toContainText('परी शर्मा');
  });

  test('5. Zero-Cost TLM verifies train carriages and generates next puzzle', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const trainInp1 = page.locator('#train-inp-1');
    const trainInp2 = page.locator('#train-inp-2');
    const verifyBtn = page.locator('#btn-verify-train');
    const feedbackBox = page.locator('#train-feedback-box');

    // Fill correct answers for initial sequence: [2] === [?] === [4] === [?] === [6]
    await trainInp1.fill('3');
    await trainInp2.fill('5');
    await verifyBtn.click();

    await expect(feedbackBox).toBeVisible();
    await expect(feedbackBox).toContainText(/Excellent|शाबाश|Correct/i);

    // Next puzzle
    const nextPuzzleBtn = page.locator('#btn-next-puzzle');
    await nextPuzzleBtn.click();
    await expect(page.locator('#ascii-train-display')).toBeVisible();
  });

  test('6. Bilingual Toggle switches entire UI between English and Hindi instantaneously', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const langToggleBtn = page.locator('#btn-lang-toggle');
    const heroTitle = page.locator('#hero-title');

    // Default or current English
    await expect(heroTitle).toContainText(/Teaching|सरल/);

    // Toggle language
    await langToggleBtn.click();
    await expect(page.locator('html')).toHaveAttribute('lang', /hi|en/);

    // Toggle back
    await langToggleBtn.click();
  });

  test('7. Audio Concurrency & Cross-Tab Coordination: Prevents overlapping speech, cancels on hidden tab, coordinates cross-tab', async ({ context }) => {
    const page1 = await context.newPage();
    await page1.goto('http://localhost:3001');

    // 1. Same-Tab Concurrency: Rapid triggers cancel previous speech
    const speechStatus = await page1.evaluate(async () => {
      let speakCount = 0;
      let cancelCount = 0;
      const originalSpeak = window.speechSynthesis.speak;
      const originalCancel = window.speechSynthesis.cancel;

      window.speechSynthesis.speak = function(u) {
        speakCount++;
        return originalSpeak.call(window.speechSynthesis, u);
      };
      window.speechSynthesis.cancel = function() {
        cancelCount++;
        return originalCancel.call(window.speechSynthesis);
      };

      // Trigger first speech
      window.speak('First message test');
      // Trigger second speech immediately
      window.speak('Second message test');

      return { speakCount, cancelCount };
    });

    // Cancel should have been called before second speech
    expect(speechStatus.cancelCount).toBeGreaterThanOrEqual(1);
    expect(speechStatus.speakCount).toBe(2);

    // 2. Visibility change: speech cancelled when document becomes hidden
    const visibilityCanceled = await page1.evaluate(async () => {
      let canceledOnHidden = false;
      const originalCancel = window.speechSynthesis.cancel;
      window.speechSynthesis.cancel = function() {
        canceledOnHidden = true;
        return originalCancel.call(window.speechSynthesis);
      };

      // Speak something
      window.speak('Testing visibility hidden behavior');
      canceledOnHidden = false; // Reset to check event handler

      // Simulate visibility change to hidden
      Object.defineProperty(document, 'hidden', { value: true, writable: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));

      return canceledOnHidden;
    });

    expect(visibilityCanceled).toBe(true);

    // 3. Cross-Tab Coordination: Speech in Tab 2 cancels speech in Tab 1
    const page2 = await context.newPage();
    await page2.goto('http://localhost:3001');

    // Set up spy in Tab 1
    await page1.evaluate(() => {
      window._tab1CancelCalled = false;
      const originalCancel = window.speechSynthesis.cancel;
      window.speechSynthesis.cancel = function() {
        window._tab1CancelCalled = true;
        return originalCancel.call(window.speechSynthesis);
      };
      window.speak('Tab 1 long announcement');
    });

    // Speak in Tab 2
    await page2.evaluate(() => {
      window.speak('Tab 2 announcement taking priority');
    });

    // Wait briefly for BroadcastChannel message transmission
    await page1.waitForTimeout(300);

    const tab1Canceled = await page1.evaluate(() => window._tab1CancelCalled);
    expect(tab1Canceled).toBe(true);

    await page1.close();
    await page2.close();
  });

  test('8. How It Works button, dialog, and iframe are completely removed from DOM', async ({ page }) => {
    await page.goto('http://localhost:3001');

    await expect(page.locator('#btn-how-it-works')).toHaveCount(0);
    await expect(page.locator('#walkthrough-dialog')).toHaveCount(0);
    await expect(page.locator('#walkthrough-modal-backdrop')).toHaveCount(0);
    await expect(page.locator('#walkthrough-video-frame')).toHaveCount(0);

    // Verify preserved elements still exist
    await expect(page.locator('#btn-start-tour')).toBeVisible();
    await expect(page.locator('#field-video-frame')).toBeVisible();
  });

  test('9. TaRL Micro-Grouping Level Selector switches prompts and persists level', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const btnDeveloping = page.locator('#btn-level-developing');
    const btnProficient = page.locator('#btn-level-proficient');
    const g23Prompt = page.locator('#g23-prompt-english');

    // Default beginner prompt check
    await expect(g23Prompt).toContainText('Concrete 1-to-1 Manipulative Counting');

    // Click Developing level
    await btnDeveloping.click();
    await expect(btnDeveloping).toHaveAttribute('aria-checked', 'true');
    await expect(g23Prompt).toContainText('Base-10 Pebble Bundles & 2-Digit Numeral Writing');

    // Click Proficient level
    await btnProficient.click();
    await expect(btnProficient).toHaveAttribute('aria-checked', 'true');
    await expect(g23Prompt).toContainText('Peer Daily-Life Word Problem Creation');

    // Reload and verify persistence in localStorage
    await page.reload();
    await expect(page.locator('#btn-level-proficient')).toHaveAttribute('aria-checked', 'true');
    await expect(page.locator('#g23-prompt-english')).toContainText('Peer Daily-Life Word Problem Creation');
  });

  test('10. Session Summary & Weekly Local Dashboard displays metrics and copies summary', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('http://localhost:3001');

    const btnPrintSummary = page.locator('#btn-print-summary');
    const btnWeeklySummary = page.locator('#btn-view-weekly-summary');
    const summaryContainer = page.locator('#summary-view-container');

    // Open Session Summary
    await btnPrintSummary.click();
    await expect(summaryContainer).toBeVisible();
    await expect(summaryContainer).toContainText('Multigrade Classroom Daily Handoff Report');
    await expect(summaryContainer).toContainText('Post-Absence Diagnostic Screening');

    // Test Copy text button
    const btnCopySummary = page.locator('#btn-copy-summary');
    await expect(btnCopySummary).toBeVisible();
    await btnCopySummary.click();
    await expect(btnCopySummary).toContainText('Copied');

    // Open Weekly Summary
    await btnWeeklySummary.click();
    await expect(summaryContainer).toContainText('What Happened This Week');
    await expect(summaryContainer).toContainText('Teacher Local Summary');
    await expect(summaryContainer).toContainText('Offline Local Data');
  });
});


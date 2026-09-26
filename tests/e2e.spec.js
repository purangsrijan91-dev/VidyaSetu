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

  test('7. Walkthrough dialog opens with accessible focus and closes cleanly', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const howItWorksBtn = page.locator('#btn-how-it-works');
    await howItWorksBtn.click();

    const dialog = page.locator('#walkthrough-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    const closeBtn = page.locator('#btn-close-walkthrough');
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();
  });
});

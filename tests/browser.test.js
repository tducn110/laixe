const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const CHROME_PATH = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const INDEX_PATH = `file://${path.resolve(__dirname, '../index.html')}`;
const hasChrome = fs.existsSync(CHROME_PATH);

describe('Browser-Level Acceptance Tests (Chrome Headless & Mobile Viewport)', { skip: !hasChrome && `Chrome binary not found at ${CHROME_PATH}` }, () => {
  let browser;
  let page;

  before(async () => {
    if (!hasChrome) return;
    const puppeteer = await import('puppeteer-core');
    browser = await puppeteer.default.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    page = await browser.newPage();
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    // Simulate iPhone 14/15 Mobile Viewport (390 x 844)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(INDEX_PATH, { waitUntil: 'load' });
  });

  after(async () => {
    if (browser) await browser.close();
  });

  test('Flow 1: Mobile user opens menu and starts exam with 30 questions and timer', async () => {
    // Open hamburger menu
    await page.click('#menuBtn');
    // Wait for CSS slide transition to complete
    await new Promise(r => setTimeout(r, 300));

    // Click "Thi thử" mode
    await page.click('[data-mode="exam"]');
    await new Promise(r => setTimeout(r, 300));

    // Check 30 questions in palette
    const paletteButtons = await page.$$('.palette-btn');
    assert.equal(paletteButtons.length, 30, 'Exam palette must render exactly 30 question chips');

    // Check timer visibility and format
    const isTimerVisible = await page.$eval('#examTimerBox', el => !el.classList.contains('hidden'));
    assert.equal(isTimerVisible, true, 'Timer box must be visible');

    const timerText = await page.$eval('#examTimerText', el => el.textContent.trim());
    assert.ok(/^20:00|19:5[89]$/.test(timerText), `Timer should start at 20:00, got: ${timerText}`);

    // Check critical badge is NOT visible during active exam
    const isCriticalVisible = await page.$eval('#criticalBadge', el => !el.classList.contains('hidden'));
    assert.equal(isCriticalVisible, false, 'Critical question badge must remain hidden during active exam');
  });

  test('Flow 2: Navigating questions does NOT reset or modify the timer', async () => {
    // Wait 1.2s for timer tick
    await new Promise(r => setTimeout(r, 1200));
    const timerBefore = await page.$eval('#examTimerText', el => el.textContent.trim());

    // Navigate to question 15 via palette chip
    const paletteButtons = await page.$$('.palette-btn');
    assert.ok(paletteButtons.length >= 15, 'Should have at least 15 palette buttons');
    await paletteButtons[14].click();

    // Verify question 15 is active in palette and rendered
    const isActive15 = await page.$eval('.palette-btn[data-palette-idx="14"]', el => el.classList.contains('active'));
    assert.equal(isActive15, true, 'Chip 15 should be active');

    // Check timer was not reset back to 20:00
    const timerAfter = await page.$eval('#examTimerText', el => el.textContent.trim());
    assert.notEqual(timerAfter, '20:00');
    assert.ok(timerAfter <= timerBefore, 'Timer must continue ticking downwards without reset');
  });

  test('Flow 3: Candidate can select and modify answers before submission', async () => {
    // Jump to Question 1
    await page.click('.palette-btn[data-palette-idx="0"]');

    // Select option A (index 0)
    await page.click('.option[data-option="0"]');
    let isSelected0 = await page.$eval('.option[data-option="0"]', el => el.classList.contains('selected'));
    assert.equal(isSelected0, true, 'Option 0 should be selected');

    // Change mind: Select option B (index 1)
    await page.click('.option[data-option="1"]');
    isSelected0 = await page.$eval('.option[data-option="0"]', el => el.classList.contains('selected'));
    let isSelected1 = await page.$eval('.option[data-option="1"]', el => el.classList.contains('selected'));

    assert.equal(isSelected0, false, 'Option 0 should no longer be selected');
    assert.equal(isSelected1, true, 'Option 1 should now be selected');

    // Palette button 1 should show answered status
    const isPaletteAnswered = await page.$eval('.palette-btn[data-palette-idx="0"]', el => el.classList.contains('answered'));
    assert.equal(isPaletteAnswered, true, 'Palette chip 1 should show answered status');
  });

  test('Flow 4: Submit locks answers and renders evaluation results (PASS on 27/30)', async () => {
    // Fill 27 correct answers and 3 wrong answers (ensuring 0 critical wrong)
    await page.evaluate(() => {
      const session = window._app.state.examSession;
      const nonCriticalQuestions = session.questions.filter(q => !q.critical);
      const wrongIds = new Set(nonCriticalQuestions.slice(0, 3).map(q => q.id));

      session.questions.forEach((q) => {
        if (wrongIds.has(q.id)) {
          session.answerQuestion(q.id, (q.answer + 1) % q.options.length); // 3 non-critical wrong
        } else {
          session.answerQuestion(q.id, q.answer); // 27 correct (including all critical)
        }
      });
      window._app.submitExam();
    });

    // Check result card is visible
    const isResultVisible = await page.$eval('#examResultCard', el => !el.classList.contains('hidden'));
    assert.equal(isResultVisible, true, 'Result card must be visible after submission');

    // Check passing status badge
    const statusText = await page.$eval('#examStatusBadge', el => el.textContent.trim());
    assert.equal(statusText, 'ĐẠT', '27/30 with 0 critical wrong must PASS');

    // Check score text
    const scoreText = await page.$eval('#examScore', el => el.textContent.trim());
    assert.equal(scoreText, '27 / 30');
  });

  test('Flow 5: Review mode locks answers and reveals explanations & critical badges', async () => {
    // Click "Xem lại bài thi"
    await page.click('#btnExamReview');

    const isQuizCardVisible = await page.$eval('#quizCard', el => !el.classList.contains('hidden'));
    assert.equal(isQuizCardVisible, true, 'Quiz card must be visible in review mode');

    // All options must be disabled in review mode
    const disabledOptionsCount = await page.$$eval('.option', opts => opts.filter(o => o.disabled).length);
    assert.ok(disabledOptionsCount >= 2, 'Options must be disabled in review mode');

    // Feedback explanation must be visible
    const isFeedbackVisible = await page.$eval('#feedback', el => !el.classList.contains('hidden'));
    assert.equal(isFeedbackVisible, true, 'Explanation feedback must be shown in review mode');

    // Palette chips show review colors (27 green chips for correct answers)
    const reviewCorrectCount = await page.$$eval('.palette-btn.review-correct', els => els.length);
    assert.equal(reviewCorrectCount, 27, 'Palette should highlight 27 correct answers in green');
  });

  test('Flow 6: Critical failure overrides passing score on UI (29/30 + 1 critical wrong = FAIL)', async () => {
    await page.evaluate(() => {
      window._app.setMode('exam');
      const session = window._app.state.examSession;

      let criticalInExam = session.questions.find(q => q.critical);
      if (!criticalInExam) {
        session.questions[0].critical = true;
        criticalInExam = session.questions[0];
      }

      // Answer all questions correctly except the critical question
      session.questions.forEach(q => {
        if (q.id === criticalInExam.id) {
          session.answerQuestion(q.id, (q.answer + 1) % q.options.length); // Critical WRONG
        } else {
          session.answerQuestion(q.id, q.answer); // 29 others CORRECT
        }
      });

      window._app.submitExam();
    });

    const statusBadge = await page.$eval('#examStatusBadge', el => el.textContent.trim());
    assert.equal(statusBadge, 'KHÔNG ĐẠT', '29/30 with critical wrong must result in KHÔNG ĐẠT');

    const failReason = await page.$eval('#examFailureReason', el => el.textContent);
    assert.ok(failReason.includes('điểm liệt'), `Failure reason must mention điểm liệt, got: ${failReason}`);
  });

  test('Flow 7: Timeout auto-submits exam when duration expires', async () => {
    await page.evaluate(() => {
      window._app.setMode('exam');
      // Simulate timeout by ticking full 1200 seconds
      window._app.state.examSession.tick(1200);
    });

    const isResultVisible = await page.$eval('#examResultCard', el => !el.classList.contains('hidden'));
    assert.equal(isResultVisible, true, 'Result card must be visible after timeout auto-submit');

    const statusBadge = await page.$eval('#examStatusBadge', el => el.textContent.trim());
    assert.equal(statusBadge, 'KHÔNG ĐẠT', 'Unanswered exam on timeout must result in KHÔNG ĐẠT');
  });
});

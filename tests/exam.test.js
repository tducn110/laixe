const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  TOTAL_QUESTIONS,
  EXAM_DURATION_SECONDS,
  MIN_CORRECT_TO_PASS,
  CRITICAL_QUESTION_IDS,
  CANDIDATE_CRITICAL_QUESTION_IDS,
  CERTIFIED_CRITICAL_QUESTION_IDS,
  FAILURE_REASONS,
  ExamGenerator,
  ExamSession,
  evaluateExam
} = require('../js/exam.js');

const rawQuestions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/questions.json'), 'utf-8')
);

// Standard mock 30-question set (IDs 1..30)
// In this set, IDs 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30 are canonical critical questions.
// IDs 1..18 and 29 are NON-CRITICAL questions.
function createStandardMock30() {
  return Array.from({ length: 30 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      chapter: 1,
      question: `Question ${id}`,
      options: ['Option A', 'Option B', 'Option C'],
      answer: 0, // Option 0 is always correct answer
      critical: CRITICAL_QUESTION_IDS.has(id)
    };
  });
}

describe('Vietnam 600 GPLX Exam Domain Engine Invariants', () => {

  // Invariant 1: Exam always contains exactly 30 questions
  test('1. Exam always contains exactly 30 questions', () => {
    const examQuestions = ExamGenerator.generate(rawQuestions);
    assert.equal(examQuestions.length, 30);
    assert.equal(TOTAL_QUESTIONS, 30);
  });

  // Invariant 2: All 30 question IDs are unique
  test('2. All 30 question IDs are unique', () => {
    const examQuestions = ExamGenerator.generate(rawQuestions);
    const uniqueIds = new Set(examQuestions.map(q => q.id));
    assert.equal(uniqueIds.size, 30);
  });

  // Invariant 3: Exam duration is exactly 1200 seconds
  test('3. Exam duration is exactly 1200 seconds', () => {
    assert.equal(EXAM_DURATION_SECONDS, 1200);
    const questions = createStandardMock30();
    const session = new ExamSession(questions);
    assert.equal(session.durationSeconds, 1200);
    assert.equal(session.remainingSeconds, 1200);
  });

  // Invariant 4: Timer does not reset during navigation
  test('4. Timer does not reset during navigation', () => {
    const questions = createStandardMock30();
    const session = new ExamSession(questions);
    session.start(1000);

    // Tick 150 seconds
    session.tick(150);
    assert.equal(session.remainingSeconds, 1050);
    assert.equal(session.elapsedSeconds, 150);

    // Navigate across questions
    session.navigate(5);
    assert.equal(session.currentQuestionIndex, 5);
    assert.equal(session.remainingSeconds, 1050);
    assert.equal(session.elapsedSeconds, 150);

    session.navigate(29);
    assert.equal(session.currentQuestionIndex, 29);
    assert.equal(session.remainingSeconds, 1050);
    assert.equal(session.elapsedSeconds, 150);

    session.navigate(0);
    assert.equal(session.currentQuestionIndex, 0);
    assert.equal(session.remainingSeconds, 1050);
  });

  // Invariant 5: Timeout auto-submits
  test('5. Timeout auto-submits', () => {
    const questions = createStandardMock30();
    let timeoutFired = false;
    const session = new ExamSession(questions, {
      onTimeExpired: () => { timeoutFired = true; }
    });
    session.start(1000);

    // Answer 28 questions correctly
    for (let i = 1; i <= 28; i++) {
      session.answerQuestion(i, 0);
    }

    // Tick all remaining seconds to trigger timeout
    session.tick(1200);

    assert.equal(session.remainingSeconds, 0);
    assert.equal(timeoutFired, true);
    assert.equal(session.status, 'EVALUATED');
    assert.ok(session.result !== null);
    assert.equal(session.result.total_questions, 30);
    assert.equal(session.result.correct_count, 28);
    assert.equal(session.result.unanswered_count, 2);
  });

  // Invariant 6: Answers cannot change after submission
  test('6. Answers cannot change after submission', () => {
    const questions = createStandardMock30();
    const session = new ExamSession(questions);
    session.start();

    session.answerQuestion(1, 0);
    assert.equal(session.answers[1], 0);

    session.submit();
    assert.equal(session.status, 'EVALUATED');

    // Attempting to change answer after submission
    const modified = session.answerQuestion(1, 1);
    assert.equal(modified, false);
    assert.equal(session.answers[1], 0); // Preserves original answer
  });

  // Invariant 7: Evaluation executes once
  test('7. Evaluation executes once', () => {
    const questions = createStandardMock30();
    const session = new ExamSession(questions);
    session.start();

    session.submit();
    assert.equal(session._evaluationCount, 1);

    // Multiple submissions or evaluations must not re-evaluate
    session.submit();
    session.evaluate();
    session.submit();
    assert.equal(session._evaluationCount, 1);
  });

  // Invariant 8: 30/30 passes
  test('8. 30/30 passes', () => {
    const questions = createStandardMock30();
    const answers = {};
    questions.forEach(q => { answers[q.id] = q.answer; });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 30);
    assert.equal(result.incorrect_count, 0);
    assert.equal(result.unanswered_count, 0);
    assert.equal(result.critical_wrong_count, 0);
    assert.equal(result.normal_passed, true);
    assert.equal(result.critical_passed, true);
    assert.equal(result.passed, true);
    assert.deepEqual(result.failure_reasons, []);
  });

  // Invariant 9: 29/30 passes
  test('9. 29/30 passes', () => {
    const questions = createStandardMock30();
    const answers = {};
    questions.forEach((q) => {
      // Question 1 (non-critical) answered incorrectly, others correct
      answers[q.id] = (q.id === 1) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 29);
    assert.equal(result.incorrect_count, 1);
    assert.equal(result.unanswered_count, 0);
    assert.equal(result.critical_wrong_count, 0);
    assert.equal(result.normal_passed, true);
    assert.equal(result.critical_passed, true);
    assert.equal(result.passed, true);
  });

  // Invariant 10: 28/30 passes
  test('10. 28/30 passes', () => {
    const questions = createStandardMock30();
    const answers = {};
    questions.forEach((q) => {
      // Questions 1 and 2 (both non-critical) answered incorrectly, others correct
      answers[q.id] = (q.id === 1 || q.id === 2) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 28);
    assert.equal(result.incorrect_count, 2);
    assert.equal(result.critical_wrong_count, 0);
    assert.equal(result.normal_passed, true);
    assert.equal(result.critical_passed, true);
    assert.equal(result.passed, true);
  });

  // Invariant 11: 27/30 passes
  test('11. 27/30 passes', () => {
    const questions = createStandardMock30();
    const answers = {};
    questions.forEach((q) => {
      // Questions 1, 2, 3 (all non-critical) answered incorrectly, others correct
      answers[q.id] = (q.id === 1 || q.id === 2 || q.id === 3) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 27);
    assert.equal(result.incorrect_count, 3);
    assert.equal(result.critical_wrong_count, 0);
    assert.equal(result.normal_passed, true);
    assert.equal(result.critical_passed, true);
    assert.equal(result.passed, true);
  });

  // Invariant 12: 26/30 fails
  test('12. 26/30 fails', () => {
    const questions = createStandardMock30();
    const answers = {};
    questions.forEach((q) => {
      // Questions 1, 2, 3, 4 (all non-critical) answered incorrectly
      answers[q.id] = (q.id >= 1 && q.id <= 4) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 26);
    assert.equal(result.incorrect_count, 4);
    assert.equal(result.normal_passed, false);
    assert.equal(result.passed, false);
    assert.ok(result.failure_reasons.includes(FAILURE_REASONS.NORMAL_SCORE_FAILED));
  });

  // Invariant 13: Any critical wrong causes failure
  test('13. Any critical wrong causes failure', () => {
    const questions = createStandardMock30();
    const answers = {};
    // Question 19 is a validated critical question
    assert.ok(CRITICAL_QUESTION_IDS.has(19));

    questions.forEach((q) => {
      answers[q.id] = (q.id === 19) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.critical_wrong_count, 1);
    assert.equal(result.critical_passed, false);
    assert.equal(result.passed, false);
    assert.ok(result.failure_reasons.includes(FAILURE_REASONS.CRITICAL_QUESTION_FAILED));
  });

  // Invariant 14: 29/30 with critical wrong fails
  test('14. 29/30 with critical wrong fails', () => {
    const questions = createStandardMock30();
    const answers = {};
    // Question 19 is critical
    assert.ok(CRITICAL_QUESTION_IDS.has(19));

    questions.forEach((q) => {
      // 29 correct, only question 19 (critical) is wrong
      answers[q.id] = (q.id === 19) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 29);
    assert.equal(result.incorrect_count, 1);
    assert.equal(result.critical_wrong_count, 1);
    assert.equal(result.normal_passed, true); // 29 >= 27
    assert.equal(result.critical_passed, false); // Critical wrong > 0
    assert.equal(result.passed, false); // Overridden to FAIL
    assert.deepEqual(result.failure_reasons, [FAILURE_REASONS.CRITICAL_QUESTION_FAILED]);
  });

  // Invariant 15: 27/30 with critical wrong fails
  test('15. 27/30 with critical wrong fails', () => {
    const questions = createStandardMock30();
    const answers = {};
    // Question 19 (critical) + questions 1, 2 (non-critical) wrong
    // 27 correct, 3 wrong
    questions.forEach((q) => {
      answers[q.id] = (q.id === 19 || q.id === 1 || q.id === 2) ? 1 : q.answer;
    });

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 27);
    assert.equal(result.incorrect_count, 3);
    assert.equal(result.critical_wrong_count, 1);
    assert.equal(result.normal_passed, true); // 27 >= 27
    assert.equal(result.critical_passed, false);
    assert.equal(result.passed, false); // Overridden to FAIL
    assert.deepEqual(result.failure_reasons, [FAILURE_REASONS.CRITICAL_QUESTION_FAILED]);
  });

  // Invariant 16: Unanswered questions remain separately tracked
  test('16. Unanswered questions remain separately tracked', () => {
    const questions = createStandardMock30();
    const answers = {};
    // 25 answered correctly, 2 answered incorrectly, 3 unanswered
    for (let i = 0; i < 25; i++) answers[questions[i].id] = questions[i].answer;
    answers[questions[25].id] = 1; // incorrect
    answers[questions[26].id] = 1; // incorrect
    // questions 27, 28, 29 left unanswered (not in answers map)

    const result = evaluateExam(questions, answers);
    assert.equal(result.correct_count, 25);
    assert.equal(result.incorrect_count, 2);
    assert.equal(result.unanswered_count, 3);
    assert.equal(result.correct_count + result.incorrect_count + result.unanswered_count, 30);
  });

  // Invariant 17: Passing is determined using correct_count >= 27
  test('17. Passing is determined using correct_count >= 27', () => {
    const questions = createStandardMock30();

    // Case A: 26 correct, 0 incorrect, 4 unanswered -> correct_count = 26 < 27 => FAIL
    const answersA = {};
    for (let i = 0; i < 26; i++) answersA[questions[i].id] = questions[i].answer;
    const resultA = evaluateExam(questions, answersA);
    assert.equal(resultA.correct_count, 26);
    assert.equal(resultA.incorrect_count, 0);
    assert.equal(resultA.unanswered_count, 4);
    assert.equal(resultA.passed, false);

    // Case B: 27 correct, 0 incorrect, 3 unanswered -> correct_count = 27 >= 27 => PASS
    const answersB = {};
    for (let i = 0; i < 27; i++) answersB[questions[i].id] = questions[i].answer;
    const resultB = evaluateExam(questions, answersB);
    assert.equal(resultB.correct_count, 27);
    assert.equal(resultB.incorrect_count, 0);
    assert.equal(resultB.unanswered_count, 3);
    assert.equal(resultB.passed, true);
  });

  // Invariant 18: Question bank contains exactly 600 questions
  test('18. Question bank contains exactly 600 questions', () => {
    assert.equal(rawQuestions.length, 600);
    const uniqueBankIds = new Set(rawQuestions.map(q => q.id));
    assert.equal(uniqueBankIds.size, 600);
    assert.equal(Math.min(...uniqueBankIds), 1);
    assert.equal(Math.max(...uniqueBankIds), 600);
  });

  // Invariant 19: Critical candidate set contains exactly 60 questions
  test('19. Critical candidate set contains exactly 60 questions', () => {
    assert.equal(CRITICAL_QUESTION_IDS.size, 60);
    assert.equal(CANDIDATE_CRITICAL_QUESTION_IDS.size, 60);

    // Check all critical candidate IDs exist in the 600-question bank
    for (const cid of CANDIDATE_CRITICAL_QUESTION_IDS) {
      assert.ok(cid >= 1 && cid <= 600, `Critical candidate question ID ${cid} is out of range 1..600`);
    }

    // Check bank candidate critical metadata matches
    const criticalInBank = rawQuestions.filter(q => q.critical === true);
    assert.equal(criticalInBank.length, 60);

    for (const q of criticalInBank) {
      assert.ok(CANDIDATE_CRITICAL_QUESTION_IDS.has(q.id), `Question ${q.id} marked critical in bank but not in candidate set`);
      assert.equal(q.criticalCandidate, true, `Question ${q.id} should have criticalCandidate=true`);
    }
  });

  // Invariant 20: Candidate vs certified critical questions are tracked with candidate=60 and certified=0
  test('20. Candidate vs certified critical questions are tracked with candidate=60 and certified=0', () => {
    // Certified set is empty because official raw PDF binary is pending verification
    assert.equal(CERTIFIED_CRITICAL_QUESTION_IDS.size, 0);

    const candidateCriticalQuestions = rawQuestions.filter(q => q.critical === true);
    assert.equal(candidateCriticalQuestions.length, 60, 'Must have exactly 60 candidate critical questions');

    // All candidate critical questions must be explicitly marked UNVERIFIED until certified against PDF
    for (const q of candidateCriticalQuestions) {
      assert.equal(
        q.criticalVerification,
        'UNVERIFIED',
        `Question ${q.id} must have criticalVerification="UNVERIFIED" until certified by physical PDF`
      );
      assert.equal(
        q.criticalCertified,
        false,
        `Question ${q.id} must have criticalCertified=false until certified by physical PDF`
      );
      assert.ok(q.certification, `Question ${q.id} must have certification object`);
      assert.equal(q.certification.status, 'UNVERIFIED');
      assert.equal(q.certification.verifiedAgainstPdf, false);
      assert.equal(q.certification.fields.critical_metadata, 'UNVERIFIED');
    }

    // Exactly 540 non-critical questions
    const nonCriticalQuestions = rawQuestions.filter(q => !q.critical);
    assert.equal(nonCriticalQuestions.length, 540);
    for (const q of nonCriticalQuestions) {
      assert.equal(q.criticalVerification, 'NON_CRITICAL');
      assert.equal(q.criticalCandidate, false);
      assert.equal(q.criticalCertified, false);
    }

    // Certification state of bank must explicitly track candidate != certified
    const certifiedInBank = rawQuestions.filter(q => q.criticalCertified === true);
    assert.equal(certifiedInBank.length, 0, 'No questions can be marked certified without official PDF verification');
  });

});

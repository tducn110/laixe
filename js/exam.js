/**
 * EXAM DOMAIN ENGINE - SINGLE SOURCE OF TRUTH
 * Specification locked according to Vietnam Driving Test Regulations 2025:
 * - Total questions: 30
 * - Duration: 1200s (20 minutes)
 * - Passing threshold: correct_count >= 27 AND critical_wrong_count === 0
 * - Critical questions: Exactly 60 validated questions
 */
(() => {
  const TOTAL_QUESTIONS = 30;
  const EXAM_DURATION_SECONDS = 1200;
  const EXAM_DURATION_MINUTES = 20;
  const MIN_CORRECT_TO_PASS = 27;
  const MAXIMUM_NORMAL_WRONG_ANSWERS = 3;

  // 60 candidate critical question IDs from Cục CSGT 2025 (candidate set; provisional pending official PDF certification)
  const CANDIDATE_CRITICAL_QUESTION_IDS = new Set([
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    30, 32, 34, 35,
    47, 48, 52, 53, 55, 58,
    63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 74,
    85, 86, 87, 88, 89, 90, 91, 92, 93,
    97, 98, 102, 117, 163, 165, 167,
    197, 198,
    206, 215, 226, 234, 245, 246, 252, 253, 254, 255, 260
  ]);
  // Aliased as CRITICAL_QUESTION_IDS for runtime and backward compatibility
  const CRITICAL_QUESTION_IDS = CANDIDATE_CRITICAL_QUESTION_IDS;
  // Certified critical question IDs (empty until verified against official PDF binary)
  const CERTIFIED_CRITICAL_QUESTION_IDS = new Set();

  const FAILURE_REASONS = {
    NORMAL_SCORE_FAILED: 'NORMAL_SCORE_FAILED',
    CRITICAL_QUESTION_FAILED: 'CRITICAL_QUESTION_FAILED'
  };

  /**
   * Generates a 30-question exam from the canonical 600-question bank.
   * Invariants guaranteed:
   * - exactly 30 questions
   * - 30 unique question IDs
   * - no duplicates
   */
  class ExamGenerator {
    static generate(questionBank, options = {}) {
      if (!Array.isArray(questionBank) || questionBank.length < TOTAL_QUESTIONS) {
        throw new Error(`Question bank must contain at least ${TOTAL_QUESTIONS} questions.`);
      }

      const randomFn = options.randomFn || Math.random;
      const pool = [...questionBank];

      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(randomFn() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      const selected = pool.slice(0, TOTAL_QUESTIONS).map(q => ({
        ...q,
        critical: Boolean(q.critical || CRITICAL_QUESTION_IDS.has(q.id))
      }));

      // Invariant checks
      if (selected.length !== TOTAL_QUESTIONS) {
        throw new Error(`Exam generation failed: expected ${TOTAL_QUESTIONS} questions, got ${selected.length}`);
      }
      const uniqueIds = new Set(selected.map(q => q.id));
      if (uniqueIds.size !== TOTAL_QUESTIONS) {
        throw new Error(`Exam generation failed: duplicate question IDs found.`);
      }

      return selected;
    }
  }

  /**
   * Pure evaluation function.
   * Formula locked:
   *   normal_passed = correct_count >= 27
   *   critical_passed = critical_wrong_count === 0
   *   passed = normal_passed && critical_passed
   */
  function evaluateExam(questions, answers = {}, metadata = {}) {
    if (!Array.isArray(questions) || questions.length !== TOTAL_QUESTIONS) {
      throw new Error(`Exam evaluation requires exactly ${TOTAL_QUESTIONS} questions.`);
    }

    let correct_count = 0;
    let incorrect_count = 0;
    let unanswered_count = 0;

    const critical_question_ids = [];
    const critical_wrong_ids = [];

    for (const q of questions) {
      const isCritical = Boolean(q.critical || CRITICAL_QUESTION_IDS.has(q.id));
      if (isCritical) {
        critical_question_ids.push(q.id);
      }

      const candidateAnswer = answers[q.id];

      if (candidateAnswer === undefined || candidateAnswer === null) {
        unanswered_count++;
      } else if (candidateAnswer === q.answer) {
        correct_count++;
      } else {
        incorrect_count++;
        if (isCritical) {
          critical_wrong_ids.push(q.id);
        }
      }
    }

    const critical_wrong_count = critical_wrong_ids.length;

    // Strict locked formulas:
    const normal_passed = correct_count >= MIN_CORRECT_TO_PASS;
    const critical_passed = critical_wrong_count === 0;
    const passed = normal_passed && critical_passed;

    const failure_reasons = [];
    if (!normal_passed) {
      failure_reasons.push(FAILURE_REASONS.NORMAL_SCORE_FAILED);
    }
    if (!critical_passed) {
      failure_reasons.push(FAILURE_REASONS.CRITICAL_QUESTION_FAILED);
    }

    return {
      total_questions: TOTAL_QUESTIONS,
      correct_count,
      incorrect_count,
      unanswered_count,
      critical_question_ids,
      critical_wrong_ids,
      critical_wrong_count,
      started_at: metadata.started_at || null,
      submitted_at: metadata.submitted_at || null,
      elapsed_seconds: metadata.elapsed_seconds || 0,
      normal_passed,
      critical_passed,
      passed,
      failure_reasons
    };
  }

  /**
   * State Machine for an Exam Session.
   * Lifecycle: READY -> RUNNING -> SUBMITTED -> EVALUATED
   */
  class ExamSession {
    constructor(questions, options = {}) {
      if (!Array.isArray(questions) || questions.length !== TOTAL_QUESTIONS) {
        throw new Error(`ExamSession requires exactly ${TOTAL_QUESTIONS} questions.`);
      }
      const uniqueIds = new Set(questions.map(q => q.id));
      if (uniqueIds.size !== TOTAL_QUESTIONS) {
        throw new Error('All 30 question IDs in ExamSession must be unique.');
      }

      this.questions = questions.map(q => ({
        ...q,
        critical: Boolean(q.critical || CRITICAL_QUESTION_IDS.has(q.id))
      }));

      this.durationSeconds = options.durationSeconds || EXAM_DURATION_SECONDS;
      this.remainingSeconds = this.durationSeconds;
      this.startedAt = null;
      this.submittedAt = null;
      this.elapsedSeconds = 0;

      this.answers = {};
      this.currentQuestionIndex = 0;
      this.status = 'READY'; // READY | RUNNING | SUBMITTED | EVALUATED
      this.result = null;

      this._evaluationCount = 0;
      this._onTimeExpired = options.onTimeExpired || null;
    }

    start(timestamp = Date.now()) {
      if (this.status !== 'READY') return;
      this.status = 'RUNNING';
      this.startedAt = timestamp;
    }

    navigate(index) {
      // Question navigation does NOT reset or modify the timer
      if (index >= 0 && index < this.questions.length) {
        this.currentQuestionIndex = index;
      }
      return this.currentQuestionIndex;
    }

    answerQuestion(questionId, optionIndex) {
      // Answers cannot change after submission or expiration
      if (this.status !== 'RUNNING') {
        return false;
      }
      this.answers[questionId] = optionIndex;
      return true;
    }

    tick(seconds = 1) {
      if (this.status !== 'RUNNING') return;

      this.remainingSeconds = Math.max(0, this.remainingSeconds - seconds);
      this.elapsedSeconds = this.durationSeconds - this.remainingSeconds;

      if (this.remainingSeconds === 0) {
        if (typeof this._onTimeExpired === 'function') {
          this._onTimeExpired();
        }
        this.submit({ autoSubmit: true });
      }
    }

    submit(options = {}) {
      // Submission executes exactly once
      if (this.status === 'SUBMITTED' || this.status === 'EVALUATED') {
        return this.result;
      }

      this.status = 'SUBMITTED';
      const timestamp = options.timestamp || Date.now();
      this.submittedAt = timestamp;

      if (this.startedAt && !this.elapsedSeconds) {
        this.elapsedSeconds = Math.min(
          this.durationSeconds,
          Math.max(0, Math.round((timestamp - this.startedAt) / 1000))
        );
      }

      return this.evaluate();
    }

    evaluate() {
      // Single evaluation guarantee
      if (this.result) {
        return this.result;
      }

      this._evaluationCount++;
      this.status = 'EVALUATED';

      this.result = evaluateExam(this.questions, this.answers, {
        started_at: this.startedAt,
        submitted_at: this.submittedAt,
        elapsed_seconds: this.elapsedSeconds
      });

      return this.result;
    }
  }

  const ExamEngine = {
    TOTAL_QUESTIONS,
    EXAM_DURATION_SECONDS,
    EXAM_DURATION_MINUTES,
    MIN_CORRECT_TO_PASS,
    MAXIMUM_NORMAL_WRONG_ANSWERS,
    CRITICAL_QUESTION_IDS,
    CANDIDATE_CRITICAL_QUESTION_IDS,
    CERTIFIED_CRITICAL_QUESTION_IDS,
    FAILURE_REASONS,
    ExamGenerator,
    ExamSession,
    evaluateExam
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExamEngine;
  }
  if (typeof window !== 'undefined') {
    window.ExamEngine = ExamEngine;
  }
})();

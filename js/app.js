(() => {
  const QUESTIONS = window.DRIVING_QUESTIONS || [];
  const CHAPTERS = [
    {"id": 1, "name": "Quy định chung và quy tắc giao thông đường bộ", "range": "1–180", "count": 180},
    {"id": 2, "name": "Văn hóa giao thông, đạo đức, PCCC và cứu hộ cứu nạn", "range": "181–205", "count": 25},
    {"id": 3, "name": "Kỹ thuật lái xe", "range": "206–263", "count": 58},
    {"id": 4, "name": "Cấu tạo và sửa chữa", "range": "264–300", "count": 37},
    {"id": 5, "name": "Báo hiệu đường bộ", "range": "301–485", "count": 185},
    {"id": 6, "name": "Giải thế sa hình và xử lý tình huống giao thông", "range": "486–600", "count": 115}
  ];
  const STORAGE_KEY = 'gplx600-progress-v1';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  const el = {
    sidebar: $('#sidebar'), scrim: $('#scrim'), menuBtn: $('#menuBtn'), chapterList: $('#chapterList'),
    modeTitle: $('#modeTitle'), modeSubtitle: $('#modeSubtitle'),
    progressPanel: $('#progressPanel'), progressText: $('#progressText'), scoreText: $('#scoreText'), progressBar: $('#progressBar'),
    subtopicBar: $('#subtopicBar'), examPalette: $('#examPalette'),
    quizCard: $('#quizCard'), emptyCard: $('#emptyCard'), emptyTitle: $('#emptyTitle'), emptyText: $('#emptyText'), emptyBack: $('#emptyBack'),
    statsCard: $('#statsCard'), statsBackBtn: $('#statsBackBtn'),
    examResultCard: $('#examResultCard'), examStatusBadge: $('#examStatusBadge'), examResultTitle: $('#examResultTitle'),
    examFailureReason: $('#examFailureReason'), examScore: $('#examScore'), examCorrect: $('#examCorrect'),
    examWrong: $('#examWrong'), examUnanswered: $('#examUnanswered'), examCriticalWrong: $('#examCriticalWrong'),
    examTimeElapsed: $('#examTimeElapsed'), btnExamReview: $('#btnExamReview'), btnExamRetry: $('#btnExamRetry'),
    statAnswered: $('#statAnswered'), statAccuracy: $('#statAccuracy'), statWrong: $('#statWrong'), statMastered: $('#statMastered'),
    chapterProgressList: $('#chapterProgressList'), topicWeaknessList: $('#topicWeaknessList'),
    questionNumber: $('#questionNumber'), chapterName: $('#chapterName'), topicName: $('#topicName'),
    criticalBadge: $('#criticalBadge'),
    resetToggleLabel: $('#resetToggleLabel'), resetToggleCheckbox: $('#resetToggleCheckbox'),
    trainerModeBtn: $('#trainerModeBtn'), trainerPanel: $('#trainerPanel'), trainerCloseBtn: $('#trainerCloseBtn'),
    trainerStepper: $('#trainerStepper'), trainerStepContent: $('#trainerStepContent'),
    trainerPrevStep: $('#trainerPrevStep'), trainerNextStep: $('#trainerNextStep'),
    questionText: $('#questionText'), questionImages: $('#questionImages'), options: $('#options'),
    feedback: $('#feedback'), feedbackDetails: $('#feedbackDetails'), fbStatus: $('#fbStatus'), fbAnswer: $('#fbAnswer'), fbWhy: $('#fbWhy'), fbRule: $('#fbRule'), fbTip: $('#fbTip'),
    fbResetBlock: $('#fbResetBlock'), fbResetCountdown: $('#fbResetCountdown'),
    fbActions: $('#fbActions'), btnToggleSteps: $('#btnToggleSteps'), btnSimilar: $('#btnSimilar'), stepBreakdownBox: $('#stepBreakdownBox'),
    prevBtn: $('#prevBtn'), checkBtn: $('#checkBtn'), nextBtn: $('#nextBtn'), bookmarkBtn: $('#bookmarkBtn'),
    swipeHint: $('#swipeHint'), toastContainer: $('#toastContainer'),
    examSubmitCardBtn: $('#examSubmitCardBtn'),
    wrongBadge: $('#wrongBadge'), bookmarkBadge: $('#bookmarkBadge'), resetProgress: $('#resetProgress'),
    jumpControl: $('#jumpControl'), jumpInput: $('#jumpInput'), jumpBtn: $('#jumpBtn'),
    examTimerBox: $('#examTimerBox'), examTimerText: $('#examTimerText'), topExamSubmitBtn: $('#topExamSubmitBtn')
  };

  const state = {
    mode: 'all',
    chapter: null,
    subtopic: null,
    queue: QUESTIONS.map(q => q.id),
    index: 0,
    selected: null,
    checked: false,
    sessionAnswers: {},
    trainerOpen: false,
    trainerStep: 0,
    history: loadProgress(),
    resetOnWrong: true,
    resetTimer: null,
    resetInterval: null,
    lastAnswerCorrect: null,
    // Exam domain state
    examSession: null,
    examTimerInterval: null,
    examReview: false
  };
  state.resetOnWrong = state.history.resetOnWrong !== undefined ? state.history.resetOnWrong : true;

  let activeToast = null;
  let activeToastTimeout = null;

  function showToast(msg, type = 'info', duration = 2400) {
    if (!el.toastContainer) return;

    if (activeToast) {
      clearTimeout(activeToastTimeout);
      activeToast.remove();
      activeToast = null;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = 'ℹ️';
    if (type === 'good') icon = '✅';
    else if (type === 'bad') icon = '❌';
    else if (type === 'warn') icon = '⚠️';

    toast.innerHTML = `<span style="font-size:16px; flex-shrink:0;">${icon}</span><div>${msg}</div>`;
    el.toastContainer.appendChild(toast);
    activeToast = toast;

    activeToastTimeout = setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
        if (activeToast === toast) activeToast = null;
      }, 250);
    }, duration);
  }

  function clearResetTimer() {
    if (state.resetTimer) {
      clearTimeout(state.resetTimer);
      state.resetTimer = null;
    }
    if (state.resetInterval) {
      clearInterval(state.resetInterval);
      state.resetInterval = null;
    }
  }

  function returnToFirstQuestion() {
    clearResetTimer();
    state.index = 0;
    if (state.mode === 'all') {
      state.history.lastQuestion = 1;
      saveProgress();
    }
    showToast('↺ Đã quay lại Câu 1 để ôn luyện từ đầu!', 'info', 2200);
    render();
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function loadProgress() {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return {
        answers: d.answers || {},
        wrong: d.wrong || [],
        bookmarks: d.bookmarks || [],
        lastQuestion: d.lastQuestion || 1,
        topicStats: d.topicStats || {},
        mastery: d.mastery || {},
        resetOnWrong: d.resetOnWrong !== undefined ? d.resetOnWrong : true
      };
    } catch {
      return { answers: {}, wrong: [], bookmarks: [], lastQuestion: 1, topicStats: {}, mastery: {}, resetOnWrong: true };
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history));
    updateBadges();
  }

  function qById(id) {
    return QUESTIONS[id - 1];
  }

  function chapterFor(q) {
    return CHAPTERS.find(c => c.id === q.chapter);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildChapters() {
    el.chapterList.innerHTML = '<div class="chapter-heading">Theo chương</div>' + CHAPTERS.map(c =>
      `<button class="chapter-btn" data-chapter="${c.id}">Chương ${c.id}: ${c.name}<small>${c.range} · ${c.count} câu ${c.id === 6 ? '· 12 quy tắc' : ''}</small></button>`
    ).join('');
  }

  function getCh6QuestionsBySubtopic(subtopicId) {
    if (!window.QUESTION_RULES) return [];
    if (!subtopicId || subtopicId === 'all_ch6') {
      return QUESTIONS.filter(q => q.chapter === 6).map(q => q.id);
    }
    return QUESTIONS.filter(q => {
      if (q.chapter !== 6) return false;
      const m = window.QUESTION_RULES[q.id];
      return m && m.topic === subtopicId;
    }).map(q => q.id);
  }

  function renderSubtopicBar() {
    if (!window.SA_HINH_TOPICS) { el.subtopicBar.classList.add('hidden'); return; }
    const isCh6 = state.mode === 'trainer' || state.mode === 'subtopic' || (state.mode === 'chapter' && state.chapter === 6);
    if (!isCh6) { el.subtopicBar.classList.add('hidden'); return; }
    el.subtopicBar.classList.remove('hidden');
    const cur = state.subtopic || 'all_ch6';
    el.subtopicBar.innerHTML = window.SA_HINH_TOPICS.map(t =>
      `<button class="subtopic-chip ${cur === t.id ? 'active' : ''}" data-subtopic="${t.id}">
        <span>${t.icon} ${t.name}</span> <small>(${t.count})</small>
      </button>`
    ).join('');
  }

  function updateExamTimerUI() {
    if (!state.examSession) return;
    const rem = state.examSession.remainingSeconds;
    el.examTimerText.textContent = formatTime(rem);
    el.examTimerBox.classList.toggle('urgent', rem <= 120);
  }

  function handleExamTimeout() {
    clearInterval(state.examTimerInterval);
    state.examTimerInterval = null;
    alert('⏱ Đã hết 20:00! Hệ thống tự động khóa đáp án và chấm điểm bài thi.');
    showExamResults();
  }

  function renderExamPalette() {
    if (state.mode !== 'exam') {
      el.examPalette.classList.add('hidden');
      return;
    }
    el.examPalette.classList.remove('hidden');

    el.examPalette.innerHTML = state.queue.map((qid, idx) => {
      let cls = '';
      if (state.examReview) {
        const q = qById(qid);
        const ans = state.examSession.answers[qid];
        if (ans === undefined) cls = 'review-unanswered';
        else if (ans === q.answer) cls = 'review-correct';
        else cls = 'review-wrong';
      } else {
        if (state.examSession.answers[qid] !== undefined) cls = 'answered';
      }
      if (idx === state.index) cls += ' active';

      return `<button class="palette-btn ${cls}" data-palette-idx="${idx}">${idx + 1}</button>`;
    }).join('');

    $$('.palette-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.index = Number(btn.dataset.paletteIdx);
        render();
      });
    });
  }

  function showExamResults() {
    if (!state.examSession) return;
    const res = state.examSession.evaluate();

    el.quizCard.classList.add('hidden');
    el.progressPanel.classList.add('hidden');
    el.examPalette.classList.add('hidden');
    el.topExamSubmitBtn.classList.add('hidden');
    el.subtopicBar.classList.add('hidden');
    el.trainerPanel.classList.add('hidden');
    el.statsCard.classList.add('hidden');
    el.emptyCard.classList.add('hidden');
    el.examResultCard.classList.remove('hidden');

    if (res.passed) {
      el.examStatusBadge.textContent = 'ĐẠT';
      el.examStatusBadge.className = 'exam-status-badge pass';
      el.examFailureReason.classList.add('hidden');
      el.examResultTitle.textContent = 'Chúc mừng! Bạn đã vượt qua bài thi sát hạch lý thuyết 🎉';
    } else {
      el.examStatusBadge.textContent = 'KHÔNG ĐẠT';
      el.examStatusBadge.className = 'exam-status-badge fail';
      el.examResultTitle.textContent = 'Bài thi chưa đạt yêu cầu sát hạch ⚠️';

      const reasons = [];
      if (res.failure_reasons.includes(window.ExamEngine.FAILURE_REASONS.CRITICAL_QUESTION_FAILED)) {
        reasons.push(`❌ Trả lời sai ${res.critical_wrong_count} câu hỏi điểm liệt (mất an toàn nghiêm trọng).`);
      }
      if (res.failure_reasons.includes(window.ExamEngine.FAILURE_REASONS.NORMAL_SCORE_FAILED)) {
        reasons.push(`❌ Không đạt tối thiểu 27/30 câu (chỉ đạt ${res.correct_count}/30 câu).`);
      }

      el.examFailureReason.innerHTML = `<strong>Lý do không đạt:</strong><ul style="margin:6px 0 0; padding-left:18px;">${reasons.map(r => `<li>${r}</li>`).join('')}</ul>`;
      el.examFailureReason.classList.remove('hidden');
    }

    el.examScore.textContent = `${res.correct_count} / 30`;
    el.examCorrect.textContent = res.correct_count;
    el.examWrong.textContent = res.incorrect_count;
    el.examUnanswered.textContent = res.unanswered_count;
    el.examCriticalWrong.textContent = res.critical_wrong_count;
    el.examTimeElapsed.textContent = `${formatTime(res.elapsed_seconds)} / 20:00`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function submitExam() {
    if (!state.examSession || state.examSession.status !== 'RUNNING') return;

    const unanswered = state.examSession.questions.filter(
      q => state.examSession.answers[q.id] === undefined
    ).length;

    if (unanswered > 0) {
      const ok = confirm(`Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi ngay bây giờ?`);
      if (!ok) return;
    }

    clearInterval(state.examTimerInterval);
    state.examTimerInterval = null;
    state.examSession.submit();
    showExamResults();
  }

  function startExam() {
    if (!window.ExamEngine) return;
    clearInterval(state.examTimerInterval);
    state.examTimerInterval = null;

    const examQuestions = window.ExamEngine.ExamGenerator.generate(QUESTIONS);
    state.examSession = new window.ExamEngine.ExamSession(examQuestions, {
      onTimeExpired: handleExamTimeout
    });
    state.examSession.start();

    state.queue = state.examSession.questions.map(q => q.id);
    state.index = 0;
    state.examReview = false;

    updateExamTimerUI();
    state.examTimerInterval = setInterval(() => {
      if (state.examSession && state.examSession.status === 'RUNNING') {
        state.examSession.tick(1);
        updateExamTimerUI();
      }
    }, 1000);
  }

  function setMode(mode, param = null) {
    if (state.mode === 'exam' && mode !== 'exam') {
      clearInterval(state.examTimerInterval);
      state.examTimerInterval = null;
    }

    state.mode = mode;
    state.index = 0;
    state.selected = null;
    state.checked = false;
    state.sessionAnswers = {};

    $$('.nav-btn,.chapter-btn').forEach(b => b.classList.remove('active'));

    let title = '', sub = '';
    el.examTimerBox.classList.add('hidden');
    el.topExamSubmitBtn.classList.add('hidden');
    el.examResultCard.classList.add('hidden');
    el.examPalette.classList.add('hidden');
    el.jumpControl.classList.remove('hidden');

    if (mode === 'all') {
      state.chapter = null; state.subtopic = null; state.trainerOpen = false;
      state.queue = QUESTIONS.map(q => q.id);
      title = 'Tất cả 600 câu'; sub = 'Học theo thứ tự của tài liệu';
      $('[data-mode="all"]')?.classList.add('active');
      const last = Math.max(1, Math.min(600, state.history.lastQuestion || 1));
      state.index = last - 1;
    } else if (mode === 'exam') {
      state.chapter = null; state.subtopic = null; state.trainerOpen = false;
      startExam();
      title = '⏱ Thi thử sát hạch lý thuyết';
      sub = '30 câu / 20 phút · Cần đạt >= 27/30 và không sai câu điểm liệt';
      $('[data-mode="exam"]')?.classList.add('active');
      el.examTimerBox.classList.remove('hidden');
      el.topExamSubmitBtn.classList.remove('hidden');
      el.jumpControl.classList.add('hidden');
    } else if (mode === 'random') {
      state.chapter = null; state.subtopic = null; state.trainerOpen = false;
      state.queue = shuffle(QUESTIONS.map(q => q.id)).slice(0, 20);
      title = 'Ngẫu nhiên 20 câu'; sub = 'Một lượt mới được trộn ngẫu nhiên';
      $('[data-mode="random"]')?.classList.add('active');
    } else if (mode === 'wrong') {
      state.chapter = null; state.subtopic = null; state.trainerOpen = false;
      state.queue = [...new Set(state.history.wrong || [])].sort((a, b) => a - b);
      title = 'Ôn câu đã sai'; sub = `${state.queue.length} câu cần xem lại`;
      $('[data-mode="wrong"]')?.classList.add('active');
    } else if (mode === 'bookmarked') {
      state.chapter = null; state.subtopic = null; state.trainerOpen = false;
      state.queue = [...new Set(state.history.bookmarks || [])].sort((a, b) => a - b);
      title = 'Câu đã đánh dấu'; sub = `${state.queue.length} câu đã lưu`;
      $('[data-mode="bookmarked"]')?.classList.add('active');
    } else if (mode === 'chapter') {
      state.chapter = param;
      state.subtopic = null;
      state.trainerOpen = (param === 6);
      state.queue = QUESTIONS.filter(q => q.chapter === param).map(q => q.id);
      const c = CHAPTERS.find(x => x.id === param);
      title = `Chương ${c.id}`; sub = c.name;
      $(`[data-chapter="${param}"]`)?.classList.add('active');
    } else if (mode === 'subtopic') {
      state.chapter = 6;
      state.subtopic = param;
      state.trainerOpen = true;
      const topicInfo = (window.SA_HINH_TOPICS || []).find(t => t.id === param);
      state.queue = getCh6QuestionsBySubtopic(param);
      title = topicInfo ? `${topicInfo.icon} ${topicInfo.name}` : 'Quy tắc sa hình';
      sub = `Chương 6 · ${state.queue.length} câu thuộc quy tắc này`;
      $(`[data-chapter="6"]`)?.classList.add('active');
    } else if (mode === 'trainer') {
      state.chapter = 6;
      state.subtopic = param || 'all_ch6';
      state.trainerOpen = true;
      state.queue = getCh6QuestionsBySubtopic(state.subtopic);
      title = '⚡ Sa hình Trainer';
      sub = 'Phân tích 5 bước tư duy chuẩn trước khi chọn đáp án';
      $('[data-mode="trainer"]')?.classList.add('active');
    } else if (mode === 'stats') {
      title = '📊 Điểm yếu & Tiến độ';
      sub = 'Phân tích mức độ thuần thục theo từng quy tắc';
      $('[data-mode="stats"]')?.classList.add('active');
    }

    el.modeTitle.textContent = title;
    el.modeSubtitle.textContent = sub;
    renderSubtopicBar();
    closeMenu();
    render();
  }

  function render() {
    updateBadges();

    if (state.mode === 'stats') {
      el.quizCard.classList.add('hidden');
      el.emptyCard.classList.add('hidden');
      el.progressPanel.classList.add('hidden');
      el.subtopicBar.classList.add('hidden');
      el.examPalette.classList.add('hidden');
      el.examResultCard.classList.add('hidden');
      el.statsCard.classList.remove('hidden');
      renderStats();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    el.statsCard.classList.add('hidden');
    el.examResultCard.classList.add('hidden');
    el.progressPanel.classList.remove('hidden');

    if (!state.queue.length) {
      el.quizCard.classList.add('hidden');
      el.emptyCard.classList.remove('hidden');
      el.emptyTitle.textContent = state.mode === 'wrong' ? 'Chưa có câu sai' :
        state.mode === 'bookmarked' ? 'Chưa đánh dấu câu nào' : 'Không có câu hỏi';
      el.emptyText.textContent = state.mode === 'wrong' ? 'Các câu bạn trả lời sai sẽ xuất hiện ở đây để ôn luyện.' :
        'Bạn có thể quay lại bộ 600 câu để tiếp tục luyện.';
      el.progressText.textContent = '0 câu';
      el.progressBar.style.width = '0%';
      return;
    }

    el.emptyCard.classList.add('hidden');
    el.quizCard.classList.remove('hidden');

    state.index = Math.max(0, Math.min(state.index, state.queue.length - 1));
    const q = qById(state.queue[state.index]);
    if (state.mode !== 'exam' && state.sessionAnswers[q.id]) {
      state.selected = state.sessionAnswers[q.id].selected;
      state.checked = state.sessionAnswers[q.id].checked;
    } else {
      state.selected = null;
      state.checked = false;
    }
    clearResetTimer();
    state.lastAnswerCorrect = null;

    if (state.mode === 'all') {
      if (el.resetToggleLabel) el.resetToggleLabel.classList.remove('hidden');
      if (el.resetToggleCheckbox) el.resetToggleCheckbox.checked = !!state.resetOnWrong;
      if (el.resetToggleLabel) el.resetToggleLabel.classList.toggle('active', !!state.resetOnWrong);
      state.history.lastQuestion = q.id;
      saveProgress();
    } else {
      if (el.resetToggleLabel) el.resetToggleLabel.classList.add('hidden');
    }
    const c = chapterFor(q);
    el.questionNumber.textContent = `Câu ${q.id}`;
    el.chapterName.textContent = `Chương ${c.id}: ${c.name}`;

    const qMeta = window.getQuestionExplanation ? window.getQuestionExplanation(q) : null;
    if (qMeta && qMeta.topic && window.SA_HINH_TOPICS) {
      const topicObj = window.SA_HINH_TOPICS.find(t => t.id === qMeta.topic);
      if (topicObj) {
        el.topicName.textContent = `${topicObj.icon} ${topicObj.name}`;
        el.topicName.classList.remove('hidden');
      } else {
        el.topicName.classList.add('hidden');
      }
    } else {
      el.topicName.classList.add('hidden');
    }

    // Critical question badge: In Exam Mode, hide during active test; show only in Review mode!
    if (q.critical && (state.mode !== 'exam' || state.examReview)) {
      el.criticalBadge.classList.remove('hidden');
    } else {
      el.criticalBadge.classList.add('hidden');
    }

    // Trainer toggle
    if (q.chapter === 6 && state.mode !== 'exam') {
      el.trainerModeBtn.classList.remove('hidden');
      el.trainerModeBtn.classList.toggle('active', state.trainerOpen);
    } else {
      el.trainerModeBtn.classList.add('hidden');
      state.trainerOpen = false;
    }

    renderTrainerPanel(q, qMeta);

    el.questionText.textContent = q.question;
    el.questionImages.innerHTML = q.images.map(src => `<img src="${src}" alt="Hình minh họa câu ${q.id}" loading="eager">`).join('');

    // Mode-specific options rendering
    if (state.mode === 'exam') {
      const candidateAns = state.examSession.answers[q.id];
      el.options.innerHTML = q.options.map((opt, i) => {
        let optClass = 'option';
        if (state.examReview) {
          if (i === q.answer) optClass += ' correct';
          if (candidateAns === i && candidateAns !== q.answer) optClass += ' incorrect';
          if (candidateAns === i && candidateAns === q.answer) optClass += ' selected';
        } else {
          if (candidateAns === i) optClass += ' selected';
        }

        return `<button class="${optClass}" data-option="${i}" ${state.examReview ? 'disabled' : ''}>
          <span class="option-key">${String.fromCharCode(65 + i)}</span>
          <span>${escapeHtml(opt)}</span>
        </button>`;
      }).join('');
    } else {
      el.options.innerHTML = q.options.map((opt, i) => {
        let optClass = 'option';
        if (state.selected === i) optClass += ' selected';
        if (state.checked) {
          if (i === q.answer) optClass += ' correct';
          else if (state.selected === i && i !== q.answer) optClass += ' incorrect';
        }
        return `<button class="${optClass}" data-option="${i}" ${state.checked ? 'disabled' : ''}>
          <span class="option-key">${String.fromCharCode(65 + i)}</span>
          <span>${escapeHtml(opt)}</span>
        </button>`;
      }).join('');
    }

    $$('.option').forEach(b => b.addEventListener('click', () => selectOption(Number(b.dataset.option))));

    // Feedback visibility
    if (state.mode === 'exam' && !state.examReview) {
      el.feedback.className = 'feedback hidden';
      el.checkBtn.classList.add('hidden');
      el.nextBtn.classList.toggle('hidden', state.index === state.queue.length - 1);
      el.examSubmitCardBtn.classList.toggle('hidden', state.index !== state.queue.length - 1);
    } else if (state.mode === 'exam' && state.examReview) {
      const candidateAns = state.examSession.answers[q.id];
      const isCorrect = candidateAns === q.answer;
      renderFeedback(q, qMeta, isCorrect, candidateAns);
      el.checkBtn.classList.add('hidden');
      el.nextBtn.classList.remove('hidden');
      el.examSubmitCardBtn.classList.add('hidden');
    } else {
      // Standard practice mode
      el.stepBreakdownBox.classList.add('hidden');
      el.stepBreakdownBox.innerHTML = '';
      el.btnToggleSteps.textContent = '🔍 Xem phân tích 5 bước';
      el.examSubmitCardBtn.classList.add('hidden');
      if (el.fbResetBlock) el.fbResetBlock.classList.add('hidden');

      if (state.checked) {
        renderFeedback(q, qMeta, state.selected === q.answer, state.selected);
        el.checkBtn.classList.add('hidden');
        el.nextBtn.classList.remove('hidden');
        el.nextBtn.textContent = 'Câu tiếp →';
      } else {
        el.feedback.className = 'feedback hidden';
        el.checkBtn.classList.remove('hidden');
        el.nextBtn.classList.add('hidden');
        el.nextBtn.textContent = 'Câu tiếp →';
        el.checkBtn.disabled = state.selected === null;
      }
    }

    el.prevBtn.disabled = state.index === 0;
    el.nextBtn.disabled = state.index === state.queue.length - 1;

    el.bookmarkBtn.classList.toggle('active', (state.history.bookmarks || []).includes(q.id));
    el.bookmarkBtn.textContent = el.bookmarkBtn.classList.contains('active') ? '★' : '☆';

    updateProgress();
    renderExamPalette();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderFeedback(q, qMeta, correct, selected) {
    const correctLetter = String.fromCharCode(65 + q.answer);
    const correctText = q.options[q.answer];

    el.feedback.className = `feedback ${correct ? 'good' : 'bad'}`;
    el.fbStatus.textContent = correct ? '✅ Chính xác!' : (selected === undefined ? '⚠️ Chưa trả lời' : '❌ Chưa chính xác');
    el.fbAnswer.textContent = `Đáp án đúng: ${correctLetter} — ${correctText}`;

    if (q.critical && !correct) {
      el.fbWhy.innerHTML = `<span style="color:var(--bad); font-weight:800;">⚠️ ĐÂY LÀ CÂU ĐIỂM LIỆT!</span> Sai câu này sẽ khiến bài thi bị đánh KHÔNG ĐẠT ngay lập tức.<br>${escapeHtml(qMeta?.why || '')}`;
    } else {
      el.fbWhy.textContent = qMeta?.why || `Lựa chọn đúng là đáp án ${correctLetter}.`;
    }

    el.fbRule.textContent = qMeta?.rule || 'Căn cứ Luật Trật tự, an toàn giao thông đường bộ 2024 (hiệu lực 2025).';
    el.fbTip.textContent = qMeta?.tip || 'Đọc kỹ từ khóa loại trừ và quan sát biển báo, vạch kẻ đường.';

    if (q.chapter === 6 && qMeta?.steps) {
      el.btnToggleSteps.classList.remove('hidden');
    } else {
      el.btnToggleSteps.classList.add('hidden');
    }

    if (q.chapter === 6 && qMeta?.topic) {
      el.btnSimilar.classList.remove('hidden');
      el.btnSimilar.dataset.topic = qMeta.topic;
    } else {
      el.btnSimilar.classList.add('hidden');
    }

    if (state.mode === 'chapter' && correct) {
      el.feedbackDetails.style.display = 'none';
    } else {
      el.feedbackDetails.style.display = '';
      el.feedbackDetails.removeAttribute('open');
    }

    el.feedback.classList.remove('hidden');
  }

  function renderTrainerPanel(q, qMeta) {
    if (!state.trainerOpen || q.chapter !== 6 || !window.TRAINER_FRAMEWORK) {
      el.trainerPanel.classList.add('hidden');
      return;
    }

    el.trainerPanel.classList.remove('hidden');
    state.trainerStep = Math.max(0, Math.min(state.trainerStep, 4));

    el.trainerStepper.innerHTML = window.TRAINER_FRAMEWORK.map((st, i) => {
      const activeClass = i === state.trainerStep ? 'active' : (i < state.trainerStep ? 'completed' : '');
      return `<button class="trainer-step-pill ${activeClass}" data-step="${i}">
        <span>${st.icon} Bước ${st.step}</span>
      </button>`;
    }).join('');

    $$('.trainer-step-pill').forEach(b => {
      b.addEventListener('click', () => {
        state.trainerStep = Number(b.dataset.step);
        renderTrainerPanel(q, qMeta);
      });
    });

    const currentFw = window.TRAINER_FRAMEWORK[state.trainerStep];
    const qStepInfo = qMeta && qMeta.steps ? qMeta.steps[state.trainerStep] : null;

    let contentHtml = `<strong>${currentFw.icon} ${currentFw.title}</strong>`;
    contentHtml += `<p style="margin:4px 0 8px; color:var(--muted);">${currentFw.rule}</p>`;

    if (qStepInfo) {
      contentHtml += `<div style="background:var(--surface-2); padding:10px 12px; border-radius:8px; border-left:3px solid var(--accent); margin-top:8px;">
        <strong style="font-size:12px; color:var(--accent); margin-bottom:2px;">Phân tích câu ${q.id}:</strong>
        <div>${escapeHtml(qStepInfo.content)}</div>
      </div>`;
    }

    contentHtml += `<ul class="trainer-step-checklist">` +
      currentFw.checklist.map(c => `<li>${escapeHtml(c)}</li>`).join('') +
      `</ul>`;

    el.trainerStepContent.innerHTML = contentHtml;
    el.trainerPrevStep.disabled = state.trainerStep === 0;
    el.trainerNextStep.textContent = state.trainerStep === 4 ? 'Hoàn thành 5 bước ✓' : 'Bước tiếp theo →';
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function selectOption(i) {
    const q = qById(state.queue[state.index]);
    if (i < 0 || i >= q.options.length) return;

    if (state.mode === 'exam') {
      if (state.examReview) return;
      state.examSession.answerQuestion(q.id, i);
      state.selected = i;
      $$('.option').forEach((b, j) => b.classList.toggle('selected', i === j));
      renderExamPalette();
      updateProgress();
      return;
    }

    if (state.checked) return;
    state.selected = i;
    state.sessionAnswers[q.id] = state.sessionAnswers[q.id] || {};
    state.sessionAnswers[q.id].selected = i;
    $$('.option').forEach((b, j) => b.classList.toggle('selected', i === j));
    el.checkBtn.disabled = false;
  }

  function check() {
    if (state.selected === null || state.checked) return;
    state.checked = true;
    const q = qById(state.queue[state.index]);
    state.sessionAnswers[q.id] = state.sessionAnswers[q.id] || {};
    state.sessionAnswers[q.id].checked = true;
    clearResetTimer();

    const correct = state.selected === q.answer;
    state.lastAnswerCorrect = correct;

    $$('.option').forEach((b, i) => {
      b.disabled = true;
      b.classList.remove('selected');
      if (i === q.answer) b.classList.add('correct');
      if (i === state.selected && !correct) b.classList.add('incorrect');
    });

    const now = Date.now();
    const prevAnswer = state.history.answers[q.id];
    const attempts = (prevAnswer?.attempts || 0) + 1;
    const wrongCount = (prevAnswer?.wrongCount || 0) + (correct ? 0 : 1);

    state.history.answers[q.id] = {
      selected: state.selected,
      correct,
      attempts,
      wrongCount,
      ts: now
    };

    if (correct) {
      state.history.wrong = (state.history.wrong || []).filter(id => id !== q.id);
      state.history.mastery = state.history.mastery || {};
      state.history.mastery[q.id] = attempts >= 2 && wrongCount === 0 ? 'mastered' : 'learning';
    } else {
      if (!(state.history.wrong || []).includes(q.id)) state.history.wrong.push(q.id);
      state.history.mastery = state.history.mastery || {};
      state.history.mastery[q.id] = 'weak';
    }

    const qMeta = window.getQuestionExplanation ? window.getQuestionExplanation(q) : null;
    const topicKey = qMeta?.topic || `ch_${q.chapter}`;
    state.history.topicStats = state.history.topicStats || {};
    const tStat = state.history.topicStats[topicKey] || { attempts: 0, correct: 0, wrong: 0 };
    tStat.attempts++;
    if (correct) tStat.correct++; else tStat.wrong++;
    state.history.topicStats[topicKey] = tStat;

    saveProgress();

    renderFeedback(q, qMeta, correct, state.selected);

    el.checkBtn.classList.add('hidden');
    el.nextBtn.classList.remove('hidden');

    const correctLetter = String.fromCharCode(65 + q.answer);
    if (correct) {
      showToast(`✅ Chính xác! Đáp án đúng là ${correctLetter}.`, 'good', 2000);
      el.nextBtn.textContent = 'Câu tiếp →';
      if (el.fbResetBlock) el.fbResetBlock.classList.add('hidden');
    } else {
      if (state.mode === 'all' && state.resetOnWrong) {
        showToast(`❌ Sai rồi! Đáp án đúng: ${correctLetter}. Đang quay lại câu 1...`, 'bad', 2500);
        if (el.fbResetBlock) {
          el.fbResetBlock.classList.remove('hidden');
          if (el.fbResetCountdown) el.fbResetCountdown.textContent = '2';
        }
        let countdown = 2;
        el.nextBtn.textContent = `↺ Về câu 1 ngay (${countdown}s)`;
        state.resetInterval = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            el.nextBtn.textContent = `↺ Về câu 1 ngay (${countdown}s)`;
            if (el.fbResetCountdown) el.fbResetCountdown.textContent = String(countdown);
          } else {
            clearInterval(state.resetInterval);
            state.resetInterval = null;
          }
        }, 1000);

        state.resetTimer = setTimeout(() => {
          returnToFirstQuestion();
        }, 2000);
      } else {
        showToast(`❌ Chưa chính xác! Đáp án đúng là ${correctLetter}.`, 'bad', 2500);
        el.nextBtn.textContent = 'Câu tiếp →';
        if (el.fbResetBlock) el.fbResetBlock.classList.add('hidden');
      }
    }

    updateProgress();
  }

  function toggleStepBreakdown() {
    const q = qById(state.queue[state.index]);
    const qMeta = window.getQuestionExplanation ? window.getQuestionExplanation(q) : null;
    if (!qMeta || !qMeta.steps) return;

    if (el.stepBreakdownBox.classList.contains('hidden')) {
      el.stepBreakdownBox.innerHTML = qMeta.steps.map((st) =>
        `<div class="step-item">
          <strong>${st.title}:</strong> ${escapeHtml(st.content)}
        </div>`
      ).join('');
      el.stepBreakdownBox.classList.remove('hidden');
      el.btnToggleSteps.textContent = '▲ Thu gọn phân tích';
    } else {
      el.stepBreakdownBox.classList.add('hidden');
      el.btnToggleSteps.textContent = '🔍 Xem phân tích 5 bước';
    }
  }

  function practiceSimilarTopic() {
    const topicId = el.btnSimilar.dataset.topic;
    if (!topicId) return;
    setMode('subtopic', topicId);
  }

  function next() {
    clearResetTimer();
    if (state.mode === 'all' && state.checked && state.lastAnswerCorrect === false && state.resetOnWrong) {
      returnToFirstQuestion();
      return;
    }
    if (state.index < state.queue.length - 1) {
      state.index++;
      render();
    }
  }

  function prev() {
    clearResetTimer();
    if (state.index > 0) {
      state.index--;
      render();
    }
  }

  function updateProgress() {
    const total = state.queue.length;
    const pos = total > 0 ? state.index + 1 : 0;
    el.progressText.textContent = `Câu ${pos} / ${total}`;
    el.progressBar.style.width = total > 0 ? `${(pos / total) * 100}%` : '0%';

    if (state.mode === 'exam') {
      if (state.examSession) {
        const answeredCount = Object.keys(state.examSession.answers).length;
        el.scoreText.textContent = `Đã làm ${answeredCount} / 30 câu`;
      }
    } else {
      let correct = 0, wrong = 0;
      for (const id of state.queue) {
        const a = state.history.answers[id];
        if (a) { a.correct ? correct++ : wrong++; }
      }
      el.scoreText.textContent = `Đúng ${correct} · Sai ${wrong}`;
    }
  }

  function updateBadges() {
    el.wrongBadge.textContent = (state.history.wrong || []).length;
    el.bookmarkBadge.textContent = (state.history.bookmarks || []).length;
  }

  function toggleBookmark() {
    const id = state.queue[state.index], list = state.history.bookmarks || [];
    const ix = list.indexOf(id);
    if (ix >= 0) list.splice(ix, 1); else list.push(id);
    state.history.bookmarks = list;
    saveProgress();
    el.bookmarkBtn.classList.toggle('active', ix < 0);
    el.bookmarkBtn.textContent = ix < 0 ? '★' : '☆';
  }

  function jump() {
    const id = Number(el.jumpInput.value);
    if (!Number.isInteger(id) || id < 1 || id > 600) return;
    if (state.mode !== 'all') setMode('all');
    state.index = id - 1;
    render();
    el.jumpInput.value = '';
  }

  function renderStats() {
    const total = QUESTIONS.length;
    const answeredIds = Object.keys(state.history.answers || {}).map(Number);
    const answeredCount = answeredIds.length;
    let correctCount = 0;
    for (const id of answeredIds) {
      if (state.history.answers[id].correct) correctCount++;
    }
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    const wrongCount = (state.history.wrong || []).length;
    const masteredCount = Object.values(state.history.mastery || {}).filter(m => m === 'mastered').length;

    el.statAnswered.textContent = `${answeredCount} / ${total}`;
    el.statAccuracy.textContent = `${accuracy}%`;
    el.statWrong.textContent = `${wrongCount}`;
    el.statMastered.textContent = `${masteredCount}`;

    el.chapterProgressList.innerHTML = CHAPTERS.map(c => {
      const qIds = QUESTIONS.filter(q => q.chapter === c.id).map(q => q.id);
      const chDone = qIds.filter(id => state.history.answers[id]).length;
      const chCorrect = qIds.filter(id => state.history.answers[id]?.correct).length;
      const pctDone = Math.round((chDone / c.count) * 100);
      const pctAcc = chDone > 0 ? Math.round((chCorrect / chDone) * 100) : 0;

      return `<div class="chapter-progress-item">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-weight:600; font-size:13.5px;">
          <span>Chương ${c.id}: ${c.name}</span>
          <span>${chDone}/${c.count} (${pctDone}%)</span>
        </div>
        <div class="meter-bar">
          <div class="meter-fill" style="width:${pctDone}%"></div>
        </div>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">
          Đúng: ${chCorrect} · Tỉ lệ đúng: ${pctAcc}%
        </div>
      </div>`;
    }).join('');

    if (window.SA_HINH_TOPICS) {
      const saHinhTopics = window.SA_HINH_TOPICS.filter(t => t.id !== 'all_ch6');
      const topicStatsData = saHinhTopics.map(t => {
        const stat = (state.history.topicStats || {})[t.id] || { attempts: 0, correct: 0, wrong: 0 };
        const acc = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : null;
        return { topic: t, stat, acc };
      });

      topicStatsData.sort((a, b) => {
        if (a.acc === null && b.acc === null) return 0;
        if (a.acc === null) return 1;
        if (b.acc === null) return -1;
        return a.acc - b.acc;
      });

      el.topicWeaknessList.innerHTML = topicStatsData.map(item => {
        const t = item.topic;
        const stat = item.stat;
        const acc = item.acc;
        const isWeak = acc !== null && acc < 70;

        let tagHtml = '';
        let fillClass = '';
        if (acc === null) {
          tagHtml = '<span class="subtle-text">Chưa luyện tập</span>';
        } else if (isWeak) {
          tagHtml = `<span class="topic-tag-weak">⚠️ Cần cải thiện (${acc}%)</span>`;
          fillClass = 'weak';
        } else {
          tagHtml = `<span class="topic-tag-good">✓ Đạt (${acc}%)</span>`;
          fillClass = 'good';
        }

        return `<div class="topic-weakness-item">
          <div>
            <div class="topic-info-row">
              <span class="topic-name">${t.icon} ${t.name}</span>
              ${tagHtml}
            </div>
            <div class="topic-meta-row">
              <span>Đã làm: ${stat.attempts} lượt · Đúng: ${stat.correct} · Sai: ${stat.wrong}</span>
              <span>${t.count} câu trong ngân hàng</span>
            </div>
            <div class="meter-bar">
              <div class="meter-fill ${fillClass}" style="width:${acc !== null ? acc : 0}%"></div>
            </div>
          </div>
          <div>
            <button class="btn-practice" data-subtopic="${t.id}">Luyện ngay</button>
          </div>
        </div>`;
      }).join('');

      $$('.btn-practice').forEach(btn => {
        btn.addEventListener('click', () => {
          setMode('subtopic', btn.dataset.subtopic);
        });
      });
    }
  }

  function openMenu() { el.sidebar.classList.add('open'); el.scrim.classList.remove('hidden'); }
  function closeMenu() { el.sidebar.classList.remove('open'); el.scrim.classList.add('hidden'); }

  // Event Listeners initialization
  buildChapters();
  updateBadges();

  $$('.nav-btn').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));

  el.chapterList.addEventListener('click', e => {
    const b = e.target.closest('[data-chapter]');
    if (b) setMode('chapter', Number(b.dataset.chapter));
  });

  el.subtopicBar.addEventListener('click', e => {
    const b = e.target.closest('[data-subtopic]');
    if (b) setMode('subtopic', b.dataset.subtopic);
  });

  el.checkBtn.addEventListener('click', check);
  el.nextBtn.addEventListener('click', next);
  el.prevBtn.addEventListener('click', prev);
  el.bookmarkBtn.addEventListener('click', toggleBookmark);

  el.topExamSubmitBtn.addEventListener('click', submitExam);
  el.examSubmitCardBtn.addEventListener('click', submitExam);

  el.btnExamReview.addEventListener('click', () => {
    state.examReview = true;
    el.examResultCard.classList.add('hidden');
    el.quizCard.classList.remove('hidden');
    el.progressPanel.classList.remove('hidden');
    el.examPalette.classList.remove('hidden');
    state.index = 0;
    render();
  });

  el.btnExamRetry.addEventListener('click', () => {
    setMode('exam');
  });

  el.trainerModeBtn.addEventListener('click', () => {
    state.trainerOpen = !state.trainerOpen;
    el.trainerModeBtn.classList.toggle('active', state.trainerOpen);
    const q = qById(state.queue[state.index]);
    const qMeta = window.getQuestionExplanation ? window.getQuestionExplanation(q) : null;
    renderTrainerPanel(q, qMeta);
  });

  el.trainerCloseBtn.addEventListener('click', () => {
    state.trainerOpen = false;
    el.trainerModeBtn.classList.remove('active');
    el.trainerPanel.classList.add('hidden');
  });

  el.trainerPrevStep.addEventListener('click', () => {
    if (state.trainerStep > 0) {
      state.trainerStep--;
      const q = qById(state.queue[state.index]);
      const qMeta = window.getQuestionExplanation ? window.getQuestionExplanation(q) : null;
      renderTrainerPanel(q, qMeta);
    }
  });

  el.trainerNextStep.addEventListener('click', () => {
    if (state.trainerStep < 4) {
      state.trainerStep++;
      const q = qById(state.queue[state.index]);
      const qMeta = window.getQuestionExplanation ? window.getQuestionExplanation(q) : null;
      renderTrainerPanel(q, qMeta);
    } else {
      window.scrollTo({ top: el.options.offsetTop - 80, behavior: 'smooth' });
    }
  });

  el.btnToggleSteps.addEventListener('click', toggleStepBreakdown);
  el.btnSimilar.addEventListener('click', practiceSimilarTopic);

  el.menuBtn.addEventListener('click', openMenu);
  el.scrim.addEventListener('click', closeMenu);
  el.emptyBack.addEventListener('click', () => setMode('all'));
  el.statsBackBtn.addEventListener('click', () => setMode('all'));

  el.jumpBtn.addEventListener('click', jump);
  el.jumpInput.addEventListener('keydown', e => { if (e.key === 'Enter') jump(); });

  el.resetProgress.addEventListener('click', () => {
    if (confirm('Xóa toàn bộ tiến độ, câu sai và đánh dấu?')) {
      localStorage.removeItem(STORAGE_KEY);
      state.history = loadProgress();
      setMode('all');
    }
  });

  if (el.resetToggleCheckbox) {
    el.resetToggleCheckbox.addEventListener('change', () => {
      state.resetOnWrong = el.resetToggleCheckbox.checked;
      state.history.resetOnWrong = state.resetOnWrong;
      saveProgress();
      if (el.resetToggleLabel) el.resetToggleLabel.classList.toggle('active', state.resetOnWrong);
      showToast(
        state.resetOnWrong
          ? '✓ Đã bật: Khi làm sai bộ 600 câu sẽ tự động quay lại câu 1'
          : '✕ Đã tắt: Khi làm sai không tự quay lại câu 1',
        'info',
        2200
      );
    });
  }

  // Swipe Gesture Handling (Touch & Mouse drag)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let touchOptionIndex = null;
  let isDraggingCard = false;

  function handleSwipeStart(x, y, target) {
    touchStartX = x;
    touchStartY = y;
    touchStartTime = Date.now();
    isDraggingCard = true;
    const optEl = target ? target.closest('.option') : null;
    touchOptionIndex = optEl && optEl.dataset.option !== undefined ? Number(optEl.dataset.option) : null;
  }

  function handleSwipeMove(x, y, event) {
    if (!isDraggingCard) return;
    const deltaX = x - touchStartX;
    const deltaY = y - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      if (event && event.cancelable) event.preventDefault();
      el.quizCard.classList.add('swiping');
      const dampedX = Math.max(-100, Math.min(100, deltaX * 0.25));
      el.quizCard.style.transform = `translateX(${dampedX}px)`;
    }
  }

  function handleSwipeEnd(x, y) {
    if (!isDraggingCard) return;
    isDraggingCard = false;
    el.quizCard.classList.remove('swiping');
    el.quizCard.style.transform = '';

    const deltaX = x - touchStartX;
    const deltaY = y - touchStartY;
    const elapsed = Date.now() - touchStartTime;

    const isHorizontalSwipe = Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && elapsed < 800;

    if (!isHorizontalSwipe) return;

    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  }

  function onSwipeLeft() {
    if (state.mode === 'exam' && !state.examReview) {
      if (state.index === state.queue.length - 1) {
        submitExam();
      } else {
        next();
      }
      return;
    }

    if (!state.checked) {
      if (state.selected !== null) {
        check();
      } else if (touchOptionIndex !== null) {
        selectOption(touchOptionIndex);
        check();
      } else {
        showToast('👉 Vui lòng chọn đáp án trước khi quẹt qua để kiểm tra!', 'info', 2000);
      }
    } else {
      if (state.mode === 'all' && state.lastAnswerCorrect === false && state.resetOnWrong) {
        returnToFirstQuestion();
      } else {
        next();
      }
    }
  }

  function onSwipeRight() {
    prev();
  }

  // Touch gesture bindings
  el.quizCard.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    handleSwipeStart(t.clientX, t.clientY, e.target);
  }, { passive: true });

  el.quizCard.addEventListener('touchmove', e => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    handleSwipeMove(t.clientX, t.clientY, e);
  }, { passive: false });

  el.quizCard.addEventListener('touchend', e => {
    if (e.changedTouches.length !== 1) return;
    const t = e.changedTouches[0];
    handleSwipeEnd(t.clientX, t.clientY);
  }, { passive: true });

  el.quizCard.addEventListener('touchcancel', () => {
    isDraggingCard = false;
    el.quizCard.classList.remove('swiping');
    el.quizCard.style.transform = '';
  }, { passive: true });

  // Mouse drag support for desktop browsers
  let isMouseDown = false;
  el.quizCard.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    if (e.target.closest('button:not(.option), input, a')) return;
    isMouseDown = true;
    handleSwipeStart(e.clientX, e.clientY, e.target);
  });

  window.addEventListener('mousemove', e => {
    if (!isMouseDown) return;
    handleSwipeMove(e.clientX, e.clientY, e);
  });

  window.addEventListener('mouseup', e => {
    if (!isMouseDown) return;
    isMouseDown = false;
    handleSwipeEnd(e.clientX, e.clientY);
  });

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    
    // R to reset current chapter
    if ((e.key === 'r' || e.key === 'R') && ['chapter', 'all', 'critical', 'bookmarked', 'wrong'].includes(state.mode)) {
      state.index = 0;
      state.sessionAnswers = {};
      saveProgress();
      renderQuestion();
      showToast('Đã quay lại từ đầu!', 'info');
      return;
    }

    const q = (state.queue && state.queue.length > 0) ? qById(state.queue[state.index]) : null;

    if (state.mode === 'exam' && !state.examReview) {
      if (/^[1-4]$/.test(e.key)) selectOption(Number(e.key) - 1);
      else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        let current = state.selected === null ? 0 : state.selected;
        if (state.selected !== null) current = (current - 1 + q.options.length) % q.options.length;
        selectOption(current);
      }
      else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        let current = state.selected === null ? -1 : state.selected;
        selectOption((current + 1) % q.options.length);
      }
      else if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') next();
      else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') prev();
    } else {
      if (!state.checked && /^[1-4]$/.test(e.key)) selectOption(Number(e.key) - 1);
      else if (!state.checked && (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w')) {
        let current = state.selected === null ? 0 : state.selected;
        if (state.selected !== null) current = (current - 1 + q.options.length) % q.options.length;
        selectOption(current);
      }
      else if (!state.checked && (e.key === 'ArrowDown' || e.key.toLowerCase() === 's')) {
        let current = state.selected === null ? -1 : state.selected;
        selectOption((current + 1) % q.options.length);
      }
      else if (e.key === 'Enter') {
        if (!state.checked) {
          check();
        } else if (state.mode === 'all' && state.lastAnswerCorrect === false && state.resetOnWrong) {
          returnToFirstQuestion();
        } else {
          next();
        }
      }
      else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        if (state.checked || state.mode === 'exam') {
          if (state.mode === 'all' && state.lastAnswerCorrect === false && state.resetOnWrong) {
            returnToFirstQuestion();
          } else {
            next();
          }
        }
      }
      else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        prev();
      }
    }
  });

  window._app = {
    state,
    setMode,
    submitExam,
    showExamResults,
    check,
    next,
    prev,
    returnToFirstQuestion,
    onSwipeLeft,
    onSwipeRight,
    selectOption,
    showToast
  };
  setMode('all');
})();

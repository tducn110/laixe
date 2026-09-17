const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const questionsJs = fs.readFileSync(path.join(__dirname, '../data/questions.js'), 'utf-8');
const rulesJs = fs.readFileSync(path.join(__dirname, '../data/rules.js'), 'utf-8');
const examJs = fs.readFileSync(path.join(__dirname, '../js/exam.js'), 'utf-8');
const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf-8');

function createMockElement(tag, id = '', initialClassName = '') {
  const classList = new Set();
  let _className = '';

  const el = {
    tagName: tag.toUpperCase(),
    id,
    dataset: {},
    style: {},
    textContent: '',
    innerHTML: '',
    disabled: false,
    value: '',
    checked: false,
    children: [],
    listeners: {}
  };

  Object.defineProperty(el, 'className', {
    get: () => _className,
    set: (val) => {
      _className = val || '';
      classList.clear();
      _className.split(/\s+/).filter(Boolean).forEach(c => classList.add(c));
    }
  });

  el.className = initialClassName;

  el.classList = {
    add: (...cls) => {
      cls.forEach(c => classList.add(c));
      _className = [...classList].join(' ');
    },
    remove: (...cls) => {
      cls.forEach(c => classList.delete(c));
      _className = [...classList].join(' ');
    },
    toggle: (c, force) => {
      let res;
      if (force === undefined) {
        if (classList.has(c)) { classList.delete(c); res = false; }
        else { classList.add(c); res = true; }
      } else if (force) {
        classList.add(c); res = true;
      } else {
        classList.delete(c); res = false;
      }
      _className = [...classList].join(' ');
      return res;
    },
    contains: (c) => classList.has(c)
  };

  const attributes = {};
  el.setAttribute = (k, v) => { attributes[k] = String(v); };
  el.getAttribute = (k) => attributes[k] || null;
  el.removeAttribute = (k) => { delete attributes[k]; };

  el.addEventListener = (event, handler, options) => {
    el.listeners[event] = el.listeners[event] || [];
    el.listeners[event].push(handler);
  };

  el.removeEventListener = (event, handler) => {
    if (!el.listeners[event]) return;
    el.listeners[event] = el.listeners[event].filter(h => h !== handler);
  };

  el.dispatchEvent = (event) => {
    const handlers = el.listeners[event.type] || [];
    handlers.forEach(h => h(event));
  };

  el.appendChild = (child) => {
    el.children.push(child);
    child.parentNode = el;
    return child;
  };

  el.remove = () => {
    if (el.parentNode) {
      const idx = el.parentNode.children.indexOf(el);
      if (idx !== -1) el.parentNode.children.splice(idx, 1);
      el.parentNode = null;
    }
  };

  el.closest = (selector) => {
    if (selector.startsWith('.') && classList.has(selector.slice(1))) return el;
    if (selector.startsWith('#') && id === selector.slice(1)) return el;
    return null;
  };

  el.querySelectorAll = (sel) => {
    const res = [];
    function traverse(node) {
      for (const c of node.children || []) {
        if (sel.startsWith('.') && c.classList.contains(sel.slice(1))) res.push(c);
        traverse(c);
      }
    }
    traverse(el);
    return res;
  };

  el.querySelector = (sel) => {
    const list = el.querySelectorAll(sel);
    return list.length > 0 ? list[0] : null;
  };

  return el;
}

function setupAppEnvironment() {
  const elements = {};
  const elementIds = [
    'sidebar', 'scrim', 'menuBtn', 'chapterList',
    'modeTitle', 'modeSubtitle',
    'progressPanel', 'progressText', 'scoreText', 'progressBar',
    'subtopicBar', 'examPalette',
    'quizCard', 'emptyCard', 'emptyTitle', 'emptyText', 'emptyBack',
    'statsCard', 'statsBackBtn',
    'examResultCard', 'examStatusBadge', 'examResultTitle',
    'examFailureReason', 'examScore', 'examCorrect',
    'examWrong', 'examUnanswered', 'examCriticalWrong',
    'examTimeElapsed', 'btnExamReview', 'btnExamRetry',
    'statAnswered', 'statAccuracy', 'statWrong', 'statMastered',
    'chapterProgressList', 'topicWeaknessList',
    'questionNumber', 'chapterName', 'topicName',
    'criticalBadge',
    'resetToggleLabel', 'resetToggleCheckbox',
    'trainerModeBtn', 'trainerPanel', 'trainerCloseBtn',
    'trainerStepper', 'trainerStepContent',
    'trainerPrevStep', 'trainerNextStep',
    'questionText', 'questionImages', 'options',
    'feedback', 'feedbackDetails', 'fbStatus', 'fbAnswer', 'fbWhy', 'fbRule', 'fbTip',
    'fbResetBlock', 'fbResetCountdown',
    'fbActions', 'btnToggleSteps', 'btnSimilar', 'stepBreakdownBox',
    'prevBtn', 'checkBtn', 'nextBtn', 'bookmarkBtn',
    'swipeHint', 'toastContainer',
    'examSubmitCardBtn',
    'wrongBadge', 'bookmarkBadge', 'resetProgress',
    'jumpControl', 'jumpInput', 'jumpBtn',
    'examTimerBox', 'examTimerText', 'topExamSubmitBtn'
  ];

  elementIds.forEach(id => {
    elements[id] = createMockElement('div', id);
  });
  elements['resetToggleCheckbox'].type = 'checkbox';
  elements['resetToggleCheckbox'].checked = true;

  const mockStorage = {};
  const mockLocalStorage = {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; },
    clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
  };

  const winListeners = {};
  const docListeners = {};
  const mockDocument = {
    querySelector: (sel) => {
      if (sel.startsWith('#')) return elements[sel.slice(1)] || null;
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel === '.option') return elements['options'].children || [];
      return [];
    },
    createElement: (tag) => createMockElement(tag),
    addEventListener: (event, handler) => {
      docListeners[event] = docListeners[event] || [];
      docListeners[event].push(handler);
    }
  };

  const sandbox = {
    window: {
      addEventListener: (event, handler) => {
        winListeners[event] = winListeners[event] || [];
        winListeners[event].push(handler);
      },
      removeEventListener: (event, handler) => {
        if (!winListeners[event]) return;
        winListeners[event] = winListeners[event].filter(h => h !== handler);
      },
      scrollTo: () => {}
    },
    document: mockDocument,
    localStorage: mockLocalStorage,
    console,
    Date,
    Math,
    String,
    Number,
    Array,
    Object,
    Set,
    JSON,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    alert: () => {},
    confirm: () => true
  };

  const context = vm.createContext(sandbox);

  vm.runInContext(questionsJs, context);
  vm.runInContext(rulesJs, context);
  try {
    vm.runInContext(examJs, context);
  } catch (e) {
    // exam.js
  }
  vm.runInContext(appJs, context);

  return { sandbox, elements, mockStorage };
}

describe('Swipe Confirmation & 600 Questions Auto-Reset Mechanisms', () => {
  let env;

  beforeEach(() => {
    env = setupAppEnvironment();
  });

  test('1. Swiping left with a selected answer confirms immediately and displays right/wrong', () => {
    const { sandbox, elements } = env;
    const app = sandbox.window._app;

    assert.equal(app.state.mode, 'all');
    assert.equal(app.state.checked, false);

    const q1 = sandbox.window.DRIVING_QUESTIONS[0];
    assert.equal(q1.id, 1);

    // Select correct option
    app.selectOption(q1.answer);
    assert.equal(app.state.selected, q1.answer);
    assert.equal(app.state.checked, false);

    // Swipe left (quẹt qua)
    app.onSwipeLeft();

    // Checked must now be true!
    assert.equal(app.state.checked, true, 'Swiping left must confirm the selected answer');
    assert.equal(app.state.lastAnswerCorrect, true, 'Last answer correct state must be true');

    // Feedback should be visible
    assert.ok(elements['feedback'].classList.contains('good'), 'Feedback should indicate good answer');
    assert.equal(elements['fbStatus'].textContent, '✅ Chính xác!');

    // Toast container should contain a toast
    assert.ok(elements['toastContainer'].children.length >= 1, 'A toast message should be shown');
  });

  test('2. Swiping left directly with wrong answer selects and confirms it immediately', () => {
    const { sandbox, elements } = env;
    const app = sandbox.window._app;

    assert.equal(app.state.checked, false);
    assert.equal(app.state.selected, null);

    const q1 = sandbox.window.DRIVING_QUESTIONS[0];
    const wrongOpt = (q1.answer + 1) % q1.options.length;

    // Select wrong answer
    app.selectOption(wrongOpt);
    app.onSwipeLeft();

    assert.equal(app.state.checked, true);
    assert.equal(app.state.lastAnswerCorrect, false, 'Option should be wrong');
    assert.ok(elements['feedback'].classList.contains('bad'), 'Feedback should indicate bad answer');
    assert.equal(elements['fbStatus'].textContent, '❌ Chưa chính xác');
  });

  test('3. Swiping left when no option is selected shows guidance toast and does not advance', () => {
    const { sandbox, elements } = env;
    const app = sandbox.window._app;

    assert.equal(app.state.selected, null);
    assert.equal(app.state.checked, false);
    const initialIndex = app.state.index;

    app.onSwipeLeft();

    assert.equal(app.state.checked, false, 'Must not check without selection');
    assert.equal(app.state.index, initialIndex, 'Must not change index');
    assert.ok(elements['toastContainer'].children.length >= 1, 'Guidance toast must appear');
  });

  test('4. In 600 câu mode (mode=all), answering wrong triggers auto-return to Question 1', () => {
    const { sandbox, elements } = env;
    const app = sandbox.window._app;

    // Navigate to Question 5
    app.state.index = 4;
    assert.equal(app.state.index, 4);

    const q5 = sandbox.window.DRIVING_QUESTIONS[4];
    const wrongOpt = (q5.answer + 1) % q5.options.length;

    // Select wrong answer and confirm via swipe
    app.selectOption(wrongOpt);
    app.onSwipeLeft();

    assert.equal(app.state.checked, true);
    assert.equal(app.state.lastAnswerCorrect, false);

    // Reset warning block should be visible in feedback
    assert.equal(elements['fbResetBlock'].classList.contains('hidden'), false, 'Reset block must be displayed');

    // Next button text should offer immediate return
    assert.ok(elements['nextBtn'].textContent.includes('Về câu 1'), 'Next button must indicate return to câu 1');

    // Calling returnToFirstQuestion (or swipe left again, or next()) returns index to 0
    app.onSwipeLeft();
    assert.equal(app.state.index, 0, 'Index must return to 0 (Question 1)');
    assert.equal(app.state.history.lastQuestion, 1, 'Last question must reset to 1 in history');
  });

  test('5. In 600 câu mode, answering CORRECTLY advances to next question without returning to Question 1', () => {
    const { sandbox } = env;
    const app = sandbox.window._app;

    // Navigate to Question 5
    app.state.index = 4;
    const q5 = sandbox.window.DRIVING_QUESTIONS[4];

    // Select CORRECT answer and confirm via swipe
    app.selectOption(q5.answer);
    app.onSwipeLeft();

    assert.equal(app.state.checked, true);
    assert.equal(app.state.lastAnswerCorrect, true);

    // Swipe left again to advance to next
    app.onSwipeLeft();
    assert.equal(app.state.index, 5, 'Index must advance to 5 (Question 6)');
  });

  test('6. When resetOnWrong checkbox is turned off, wrong answer does not force return to Question 1', () => {
    const { sandbox, elements } = env;
    const app = sandbox.window._app;

    // Turn off resetOnWrong toggle
    app.state.resetOnWrong = false;

    // Navigate to Question 10
    app.state.index = 9;
    const q10 = sandbox.window.DRIVING_QUESTIONS[9];
    const wrongOpt = (q10.answer + 1) % q10.options.length;

    // Select wrong answer and confirm
    app.selectOption(wrongOpt);
    app.onSwipeLeft();

    assert.equal(app.state.checked, true);
    assert.equal(app.state.lastAnswerCorrect, false);

    // Reset block should remain hidden
    assert.equal(elements['fbResetBlock'].classList.contains('hidden'), true);

    // Swipe left again advances to next question instead of resetting
    app.onSwipeLeft();
    assert.equal(app.state.index, 10, 'Should advance to Question 11 when resetOnWrong is disabled');
  });

  test('7. Swiping right navigates to previous question', () => {
    const { sandbox } = env;
    const app = sandbox.window._app;

    app.state.index = 3;
    app.onSwipeRight();

    assert.equal(app.state.index, 2, 'Swiping right should navigate to previous question (index 2)');
  });
});

/**
 * KakshaSahay - Main Application Orchestrator
 * Links StateStore, TimerEngine, GenerativeRAG, StorageVault, and ModalManager to UI.
 */
'use strict';

const AppController = (() => {
  function init() {
    // 1. Initialize Subsystems
    AudioEngine.initVoices();
    VoiceAssistant.init();
    TimerEngine.init(() => handleCycleCompleted());

    // 2. Subscribe UI elements to StateStore
    StateStore.subscribe((state) => renderStateToUI(state));

    // 3. Bind Keyboard navigation shortcuts (Space to pause/resume timer)
    document.addEventListener('keydown', (e) => {
      // Space key toggles timer if not in text input
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        TimerEngine.toggle();
      }
    });

    console.log('[KakshaSahay] Application orchestrator initialized successfully');
  }

  // Reactive State-to-DOM Renderer (Avoids direct imperative DOM reads)
  function renderStateToUI(state) {
    // 1. Timer Display
    const mins = Math.floor(state.secondsRemaining / 60);
    const secs = state.secondsRemaining % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const timerDisplay = document.getElementById('countdown-timer');
    if (timerDisplay) timerDisplay.textContent = timeStr;

    // Sticky Mini-Bar timer
    const miniTimer = document.getElementById('mini-bar-timer');
    if (miniTimer) miniTimer.textContent = timeStr;

    // Progress Bar Fill
    const pct = ((state.totalCycleSeconds - state.secondsRemaining) / state.totalCycleSeconds) * 100;
    const progressFill = document.getElementById('split-progress-fill');
    if (progressFill) progressFill.style.width = `${Math.max(4, pct)}%`;

    // Split Button Label
    const btnLabel = document.getElementById('split-btn-label');
    const splitIcon = document.getElementById('split-icon');
    if (btnLabel && splitIcon) {
      if (state.timerRunning) {
        btnLabel.textContent = 'रोकें (Pause Cycle)';
        splitIcon.textContent = '⏸️';
      } else {
        btnLabel.textContent = state.secondsRemaining < state.totalCycleSeconds ? 'पुनः शुरू करें (Resume)' : '15 मिनट चक्र शुरू करें';
        splitIcon.textContent = state.secondsRemaining < state.totalCycleSeconds ? '▶️' : '⏱️';
      }
    }

    // 2. Grade Focus Indicators
    const focusLabel = document.getElementById('current-focus-label');
    const miniFocus = document.getElementById('mini-bar-focus');
    const badge = document.getElementById('split-timer-badge');

    const focusText = state.gradeFocus === 1 ? 'कक्षा 1 (प्रत्यक्ष शिक्षण)' : 'कक्षा 2/3 (प्रत्यक्ष शिक्षण)';
    if (focusLabel) focusLabel.textContent = focusText;
    if (miniFocus) miniFocus.textContent = focusText;
    if (badge) badge.textContent = state.gradeFocus === 1 ? 'कक्षा 1 ध्यान' : 'कक्षा 2/3 ध्यान';

    // 3. Speech Pack Warning Banner (if voice missing on low-end device)
    const voiceNoticeBanner = document.getElementById('voice-notice-banner');
    if (voiceNoticeBanner) {
      if (state.speechNotice) {
        voiceNoticeBanner.textContent = state.speechNotice;
        voiceNoticeBanner.classList.remove('hidden');
      } else {
        voiceNoticeBanner.classList.add('hidden');
      }
    }

    // 4. Pending Remediation Badge
    const remBadge = document.getElementById('remediation-badge');
    if (remBadge && state.remediationPendingCount > 0) {
      remBadge.textContent = `${state.remediationPendingCount} उपचारात्मक छात्र`;
    }
  }

  function handleCycleCompleted() {
    const currentState = StateStore.getState();
    const nextFocus = currentState.gradeFocus === 1 ? 2 : 1;

    StateStore.setState({
      gradeFocus: nextFocus,
      secondsRemaining: 900,
      totalCycleSeconds: 900
    });

    AudioEngine.playTone(880, 1174.66, 0.7);

    const guidanceT1 = document.getElementById('split-guidance-t1');
    const guidanceT2 = document.getElementById('split-guidance-t2');

    if (nextFocus === 1) {
      if (guidanceT1 && guidanceT2) {
        setGuidanceNode(guidanceT1, '👨‍🏫 शिक्षक प्रत्यक्ष (कक्षा 1):', 'वर्णमाला और ध्वनि पहचान (क, म, र), श्यामपट्ट पर प्रत्यक्ष अभ्यास।');
        setGuidanceNode(guidanceT2, '✍️ स्व-अध्ययन (कक्षा 2/3):', '10-10 कंकड़ों के बंडल बनाकर स्लेट पर गिनती लिखना (शांत सहपाठी कार्य)।');
      }
      AudioEngine.speakHindi('15 मिनट पूरे हुए! अब कक्षा 1 को प्रत्यक्ष सिखाएं और कक्षा 2 व 3 को कंकड़ गतिविधि सौंपें।');
    } else {
      if (guidanceT1 && guidanceT2) {
        setGuidanceNode(guidanceT1, '👨‍🏫 शिक्षक प्रत्यक्ष (कक्षा 2/3):', '2-अंकीय जोड़-घटाव और शब्द निर्माण पर सीधा ध्यान।');
        setGuidanceNode(guidanceT2, '✍️ स्व-अध्ययन (कक्षा 1):', 'स्लेट पर चित्र देखकर पहला अक्षर लिखने और रंग भरने का स्वतंत्र कार्य।');
      }
      AudioEngine.speakHindi('15 मिनट पूरे हुए! अब कक्षा 2 और 3 को प्रत्यक्ष समय दें और कक्षा 1 को स्लेट पर स्वतंत्र काम दें।');
    }
  }

  function setGuidanceNode(el, title, desc) {
    const strong = document.createElement('strong');
    strong.textContent = title;
    const span = document.createElement('span');
    span.textContent = ' ' + desc;
    el.replaceChildren(strong, span);
  }

  function forceNextSplitCycle() {
    handleCycleCompleted();
  }

  function setSchoolMode(mode) {
    StateStore.setState({ schoolMode: mode });
    const ruralBtn = document.getElementById('btn-mode-rural');
    const urbanBtn = document.getElementById('btn-mode-urban');
    const contextIcon = document.getElementById('context-icon');
    const contextPill = document.getElementById('context-pill');
    const contextTitle = document.getElementById('context-title');
    const contextDesc = document.getElementById('context-desc');
    const tlmTag = document.getElementById('tlm-mode-tag');
    const tlmCard = document.getElementById('tlm-game-preview-card');

    if (mode === 'rural') {
      if (ruralBtn) ruralBtn.className = "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 bg-amber-500 text-slate-950 shadow-md";
      if (urbanBtn) urbanBtn.className = "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 text-slate-300 hover:text-white";
      
      if (contextIcon) contextIcon.textContent = '🌾';
      if (contextPill) {
        contextPill.textContent = 'ग्रामीण प्राथमिक विद्यालय परिप्रेक्ष्य';
        contextPill.className = 'bg-amber-500 text-slate-950 text-xs font-black uppercase px-2.5 py-0.5 rounded-full';
      }
      if (contextTitle) contextTitle.textContent = '1 शिक्षक, 1 कमरा, कक्षा 1 से 3 संयुक्त (Multi-Grade)';
      if (contextDesc) contextDesc.textContent = 'घर की बोली (अवधी/भोजपुरी/बुंदेली) और किताबी हिंदी का अंतर मिटाएं, रबी-खरीफ कटाई के बाद लौटे बच्चों को साथ लाएं और बिना मुद्रित चार्ट के कंकड़ों से FLN सिखाएं।';
      if (tlmTag) tlmTag.textContent = 'कंकड़ / चॉक / स्लेट';

      if (tlmCard) {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between';
        const gameTitle = document.createElement('span');
        gameTitle.className = 'text-edu-amber font-bold text-sm';
        gameTitle.textContent = "🎲 आज का खेल: 'संख्या रेलगाड़ी'";
        const countTag = document.createElement('span');
        countTag.className = 'text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-bold';
        countTag.textContent = '20-30 बच्चे';
        row.replaceChildren(gameTitle, countTag);

        const p = document.createElement('p');
        p.className = 'text-xs sm:text-sm text-slate-300 m-0';
        p.textContent = 'श्यामपट्ट पर डिब्बे बनाएं, कंकड़ों से गिनती गिनवाएं और छूटी संख्या भरवाएं। पूरी कक्षा शांत और व्यस्त!';
        tlmCard.replaceChildren(row, p);
      }

      AudioEngine.playTone(523.25, 659.25);
      AudioEngine.speakHindi('ग्रामीण प्राथमिक विद्यालय मोड सक्रिय।');
    } else {
      if (urbanBtn) urbanBtn.className = "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 bg-sky-500 text-slate-950 shadow-md";
      if (ruralBtn) ruralBtn.className = "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 text-slate-300 hover:text-white";
      
      if (contextIcon) contextIcon.textContent = '🏙️';
      if (contextPill) {
        contextPill.textContent = 'शहरी प्राथमिक शाला परिप्रेक्ष्य';
        contextPill.className = 'bg-sky-500 text-slate-950 text-xs font-black uppercase px-2.5 py-0.5 rounded-full';
      }
      if (contextTitle) contextTitle.textContent = 'उच्च छात्र अनुपात (PTR 50:1+), प्रवासी बहुभाषिकता';
      if (contextDesc) contextDesc.textContent = 'संकीर्ण कमरों में अत्यधिक शोर नियंत्रित करें, बिहार/ओडिशा/बंगाल के प्रवासी बच्चों की भाषा को जोड़ें और अनौपचारिक मजदूरी विस्थापन से उपजे अंतर को पाटें।';
      if (tlmTag) tlmTag.textContent = 'डेस्क खेल / ताली / तुकबंदी';

      if (tlmCard) {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between';
        const gameTitle = document.createElement('span');
        gameTitle.className = 'text-sky-400 font-bold text-sm';
        gameTitle.textContent = "🎲 आज का खेल: 'ध्वनि ताली व शब्द श्रृंखला'";
        const countTag = document.createElement('span');
        countTag.className = 'text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-bold';
        countTag.textContent = '50-60 बच्चे';
        row.replaceChildren(gameTitle, countTag);

        const p = document.createElement('p');
        p.className = 'text-xs sm:text-sm text-slate-300 m-0';
        p.textContent = 'डेस्क पर बैठे-बैठे लयबद्ध ताली से वर्ण पहचान। बिना खड़े हुए या दौड़े, पूरी कक्षा में शोर 60% कम!';
        tlmCard.replaceChildren(row, p);
      }

      AudioEngine.playTone(659.25, 783.99);
      AudioEngine.speakHindi('शहरी प्राथमिक शाला मोड सक्रिय।');
    }
  }

  function switchTab(tabName) {
    StateStore.setState({ activeTab: tabName });
    const allTabs = ['classroom', 'relevance', 'nipun', 'voice', 'stories'];
    
    allTabs.forEach(t => {
      const btn = document.getElementById(`nav-tab-${t}`);
      const mobBtn = document.getElementById(`mobile-nav-${t}`);
      const view = document.getElementById(`view-${t}`);
      if (t === tabName) {
        if (btn) {
          btn.classList.add('active', 'bg-amber-500/20', 'text-edu-amber', 'border-amber-500/40');
          btn.classList.remove('text-slate-400');
        }
        if (mobBtn) {
          mobBtn.classList.add('text-amber-400');
          mobBtn.classList.remove('text-slate-400');
        }
        if (view) view.classList.remove('hidden');
      } else {
        if (btn) {
          btn.classList.remove('active', 'bg-amber-500/20', 'text-edu-amber', 'border-amber-500/40');
          btn.classList.add('text-slate-400');
        }
        if (mobBtn) {
          mobBtn.classList.remove('text-amber-400');
          mobBtn.classList.add('text-slate-400');
        }
        if (view) view.classList.add('hidden');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Generative Bhasha Setu Action
  async function generatePedagogicalAnalogy() {
    const inputEl = document.getElementById('concept-custom-input');
    const rawVal = inputEl?.value || 'घटाव';
    const cleanQuery = (typeof StateStore.sanitizeInput === 'function')
      ? StateStore.sanitizeInput(rawVal, 80)
      : rawVal.trim().substring(0, 80);
    const query = cleanQuery || 'घटाव';
    const dialectEl = document.getElementById('dialect-selector');
    const dialectKey = dialectEl?.value || 'awadhi_bhojpuri';
    const state = StateStore.getState();

    const btnLabel = document.getElementById('rag-btn-label');
    const btnIcon = document.getElementById('rag-btn-icon');
    const badge = document.getElementById('rag-engine-badge');

    if (btnLabel) btnLabel.textContent = 'ऑन-डिवाइस जेनेरेशन जारी...';
    if (btnIcon) btnIcon.textContent = '⏳';

    const data = await GenerativeRAG.generateAnalogy(query, dialectKey, state.schoolMode);

    if (btnLabel) btnLabel.textContent = 'घरेलू रूपक व संवाद उत्पन्न करें (Generate)';
    if (btnIcon) btnIcon.textContent = '🧠';

    if (badge) {
      if (data.isCloudEdge) {
        badge.textContent = '🛰️ सर्वरलेस एज API (Edge LLM)';
        badge.className = 'bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full text-xs font-bold';
      } else {
        badge.textContent = '⚡ ऑन-डिवाइस जेनेरेटिव AI';
        badge.className = 'bg-sky-950 text-edu-blue border border-sky-800 px-3 py-1 rounded-full text-xs font-bold';
      }
    }

    renderPedagogicalModal(data);
  }

  function generateAnalogyFromQuery(query) {
    const inputEl = document.getElementById('concept-custom-input');
    if (inputEl) inputEl.value = query;
    generatePedagogicalAnalogy();
  }

  function selectConceptChip(conceptName) {
    const inputEl = document.getElementById('concept-custom-input');
    if (inputEl) inputEl.value = conceptName;
    generatePedagogicalAnalogy();
  }

  function clearConceptInput() {
    const inputEl = document.getElementById('concept-custom-input');
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
  }

  // Pure DOM Modal Construction for Analogy
  function renderPedagogicalModal(data) {
    const container = document.createElement('div');
    container.className = 'space-y-4';

    const tagRow = document.createElement('div');
    tagRow.className = 'flex items-center justify-between text-xs pb-2 border-b border-slate-700';
    
    const topicSpan = document.createElement('span');
    topicSpan.className = 'text-slate-400';
    topicSpan.textContent = 'विषय: ';
    const strongTopic = document.createElement('strong');
    strongTopic.className = 'text-white';
    strongTopic.textContent = data.topic;
    topicSpan.appendChild(strongTopic);

    const badgeSpan = document.createElement('span');
    badgeSpan.className = `px-2.5 py-0.5 rounded-full font-bold ${data.isCloudEdge ? 'bg-purple-950 text-purple-300 border border-purple-700' : 'bg-sky-950 text-sky-300 border border-sky-700'}`;
    badgeSpan.textContent = data.isCloudEdge ? '🛰️ लाइव Edge LLM' : '⚡ ऑन-डिवाइस AI (WASM / Quantized)';

    tagRow.replaceChildren(topicSpan, badgeSpan);
    container.appendChild(tagRow);

    const standardBox = document.createElement('div');
    standardBox.className = 'p-3 rounded-xl bg-slate-900 border border-slate-700';
    const stdLabel = document.createElement('span');
    stdLabel.className = 'text-xs text-amber-400 font-bold uppercase block';
    stdLabel.textContent = '1. औपचारिक किताबी भाषा (Standard Textbook):';
    const stdP = document.createElement('p');
    stdP.className = 'm-0 text-white font-semibold mt-1';
    stdP.textContent = `"${data.standard}"`;
    standardBox.replaceChildren(stdLabel, stdP);
    container.appendChild(standardBox);

    const metaphorBox = document.createElement('div');
    metaphorBox.className = 'p-4 rounded-xl bg-emerald-950/80 border-2 border-emerald-500 space-y-2';
    
    const metLabel = document.createElement('span');
    metLabel.className = 'text-xs text-emerald-400 font-bold uppercase flex items-center gap-1.5';
    const state = StateStore.getState();
    metLabel.textContent = `${state.schoolMode === 'rural' ? '🌾 ग्रामीण संदर्भ रूपक' : '🏙️ शहरी संदर्भ रूपक'} (${data.dialectName}):`;
    
    const metP = document.createElement('p');
    metP.className = 'text-white text-teacher-base font-black m-0';
    metP.textContent = data.analogy;

    const scriptBox = document.createElement('div');
    scriptBox.className = 'bg-slate-950/70 p-3 rounded-xl border border-emerald-500/40 mt-2';
    const scriptTitle = document.createElement('span');
    scriptTitle.className = 'text-xs text-slate-300 font-bold block';
    scriptTitle.textContent = 'कक्षा में शिक्षक का मौखिक संवाद (Teacher Verbal Script):';
    const scriptP = document.createElement('p');
    scriptP.className = 'text-emerald-200 text-sm font-medium mt-1 m-0';
    scriptP.textContent = data.script;
    scriptBox.replaceChildren(scriptTitle, scriptP);

    metaphorBox.replaceChildren(metLabel, metP, scriptBox);
    container.appendChild(metaphorBox);

    if (data.activity) {
      const actBox = document.createElement('div');
      actBox.className = 'p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300';
      const actTitle = document.createElement('strong');
      actTitle.className = 'text-amber-400';
      actTitle.textContent = '🎲 श्यामपट्ट व कंकड़ गतिविधि: ';
      const actSpan = document.createElement('span');
      actSpan.textContent = data.activity;
      actBox.replaceChildren(actTitle, actSpan);
      container.appendChild(actBox);
    }

    const audioRow = document.createElement('div');
    audioRow.className = 'flex items-center justify-between text-xs text-slate-400 pt-1';
    const statusSpan = document.createElement('span');
    statusSpan.textContent = '🗣️ हिंदी ऑडियो वाचन तैयार';
    
    const replayBtn = document.createElement('button');
    replayBtn.className = 'px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg font-bold border border-slate-700 flex items-center gap-1 transition-transform active:scale-95';
    replayBtn.textContent = '🔊 कक्षा में सुनाएं (Play)';
    replayBtn.addEventListener('click', () => {
      AudioEngine.speakHindi(`${data.analogy}। ${data.script}`);
    });

    audioRow.replaceChildren(statusSpan, replayBtn);
    container.appendChild(audioRow);

    AudioEngine.playTone(523.25, 783.99);
    ModalManager.open(`भाषा सेतु: ${data.topic}`, container);
    AudioEngine.speakHindi(`${data.analogy}। ${data.script}`);
  }

  // 100% Pure DOM Construction for Catch-Up Diagnostic (Immune to DOM XSS)
  function launchCatchUpDiagnostic() {
    const inputEl = document.getElementById('student-name-input');
    const rawStudentName = inputEl ? inputEl.value : '';
    const cleanName = (typeof StateStore.sanitizeInput === 'function')
      ? StateStore.sanitizeInput(rawStudentName, 60)
      : rawStudentName.trim().substring(0, 60);
    const studentName = cleanName || 'रोहन (कक्षा 2)';
    
    if (typeof StateStore.transitionFSM === 'function') {
      StateStore.transitionFSM('OPEN_DIAGNOSTIC');
    }

    const reasonEl = document.getElementById('absence-reason');
    const reason = reasonEl ? reasonEl.value : 'harvest';
    const reasonText = reason === 'harvest' ? 'रबी/खरीफ कटाई' : reason === 'migration' ? 'पारिवारिक प्रवास' : 'स्वास्थ्य कारण';

    const container = document.createElement('div');
    container.className = 'space-y-4';

    const headerBox = document.createElement('div');
    headerBox.className = 'bg-slate-900 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center';

    const nameGroup = document.createElement('div');
    const nameLabel = document.createElement('span');
    nameLabel.className = 'text-xs text-slate-400 block';
    nameLabel.textContent = 'छात्र का नाम:';

    const nameVal = document.createElement('div');
    nameVal.className = 'text-white font-black text-lg';
    nameVal.textContent = studentName;

    nameGroup.replaceChildren(nameLabel, nameVal);
    headerBox.appendChild(nameGroup);

    const reasonBadge = document.createElement('span');
    reasonBadge.className = 'text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-bold border border-amber-500/30';
    reasonBadge.textContent = 'कारण: ' + reasonText;
    headerBox.appendChild(reasonBadge);
    container.appendChild(headerBox);

    const promptLabel = document.createElement('p');
    promptLabel.className = 'text-xs text-amber-400 font-bold uppercase m-0';
    promptLabel.textContent = '2-मिनट मौखिक त्वरित जांच (3 सवाल):';
    container.appendChild(promptLabel);

    const questionList = document.createElement('div');
    questionList.className = 'space-y-2 text-sm text-slate-200';

    const q1 = document.createElement('div');
    q1.className = 'p-2.5 rounded-xl bg-slate-950 border border-slate-800';
    const q1Title = document.createElement('strong');
    q1Title.textContent = '1. वर्ण पहचान: ';
    const q1Span = document.createElement('span');
    q1Span.textContent = "स्लेट पर लिखे 'म' और 'र' पहचान कर बताएं।";
    q1.replaceChildren(q1Title, q1Span);

    const q2 = document.createElement('div');
    q2.className = 'p-2.5 rounded-xl bg-slate-950 border border-slate-800';
    const q2Title = document.createElement('strong');
    q2Title.textContent = '2. बुनियादी गणना: ';
    const q2Span = document.createElement('span');
    q2Span.textContent = 'इन 6 कंकड़ों में 2 कंकड़ और जोड़े, कुल कितने हुए?';
    q2.replaceChildren(q2Title, q2Span);

    const q3 = document.createElement('div');
    q3.className = 'p-2.5 rounded-xl bg-slate-950 border border-slate-800';
    const q3Title = document.createElement('strong');
    q3Title.textContent = '3. शब्द पठन: ';
    const q3Span = document.createElement('span');
    q3Span.textContent = "यह सरल शब्द पढ़कर सुनाएं: 'घर'";
    q3.replaceChildren(q3Title, q3Span);

    questionList.replaceChildren(q1, q2, q3);
    container.appendChild(questionList);

    const btnRow = document.createElement('div');
    btnRow.className = 'flex flex-col sm:flex-row gap-3 pt-2';

    const btnPass = document.createElement('button');
    btnPass.className = 'flex-1 min-h-[48px] bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-transform active:scale-95';
    btnPass.textContent = '✅ सभी उत्तर सही (स्तर पर है)';
    btnPass.addEventListener('click', () => recordRemediation(studentName, true, reason));

    const btnRemedial = document.createElement('button');
    btnRemedial.className = 'flex-1 min-h-[48px] bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-md transition-transform active:scale-95';
    btnRemedial.textContent = '⚠️ अटक रहा है (सहपाठी साथी दें)';
    btnRemedial.addEventListener('click', () => recordRemediation(studentName, false, reason));

    btnRow.replaceChildren(btnPass, btnRemedial);
    container.appendChild(btnRow);

    AudioEngine.playTone(587.33, 783.99);
    ModalManager.open('2-मिनट मौखिक जांच कार्ड', container);
    AudioEngine.speakHindi(`${studentName} के लिए 2 मिनट की मौखिक जांच कार्ड खुला है।`);
  }

  async function recordRemediation(studentName, isProficient, reason) {
    ModalManager.close();

    // Persist securely into encrypted vault
    await StorageVault.saveStudentRecord({
      name: studentName,
      isProficient: isProficient,
      reason: reason
    });

    if (!isProficient) {
      AudioEngine.playTone(440, 523.25);
      AudioEngine.speakHindi(`${studentName} को सहपाठी साथी के साथ 10 मिनट के वर्णमाला खेल में बैठाएं।`);
      alert(`उपचारात्मक कदम: ${studentName} को अग्रिम पंक्ति के सहपाठी (Peer Buddy) के साथ 'अक्षर कार्ड खेल' में बैठाएं ताकि मुख्य कक्षा बिना रुके चलती रहे।`);
    } else {
      AudioEngine.playTone(659.25, 880);
      AudioEngine.speakHindi(`${studentName} बुनियादी स्तर पर सही है। नियमित पाठ में शामिल करें।`);
      alert(`${studentName} ने बुनियादी FLN जांच पास कर ली है। उन्हें मुख्य समूह में शामिल करें।`);
    }
  }

  function showTLMGame() {
    const state = StateStore.getState();
    const container = document.createElement('div');
    container.className = 'space-y-4';

    let titleText = '';
    if (state.schoolMode === 'rural') {
      titleText = 'शून्य-लागत खेल: "संख्या रेलगाड़ी" (Number Train)';

      const card = document.createElement('div');
      card.className = 'p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2';

      const head = document.createElement('div');
      head.className = 'flex items-center justify-between text-xs text-slate-400';
      const spanMat = document.createElement('span');
      spanMat.textContent = 'सामग्री: केवल चॉक, श्यामपट्ट, 10 कंकड़';
      const spanGrade = document.createElement('span');
      spanGrade.className = 'text-amber-400 font-bold';
      spanGrade.textContent = 'कक्षा 1 व 2 संयुक्त';
      head.replaceChildren(spanMat, spanGrade);

      const h4 = document.createElement('h4');
      h4.className = 'text-amber-400 font-black text-base m-0';
      h4.textContent = 'कक्षा में कैसे खेलें:';

      const ol = document.createElement('ol');
      ol.className = 'list-decimal pl-5 space-y-2 text-slate-300 text-sm';
      const steps = [
        'श्यामपट्ट पर एक ट्रेन के 5 डिब्बे बनाएं।',
        "पहले डिब्बे में '3', तीसरे में '5' लिखें; बीच का डिब्बा खाली छोड़ें।",
        'कक्षा 1 के बच्चे को बुलाकर कंकड़ गिनने को कहें और कक्षा 2 के बच्चे से छूटी हुई संख्या लिखवाएं।',
        "सफल होने पर पूरी कक्षा 3 बार 'निपुण ताली' बजाएगी!"
      ];
      steps.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        ol.appendChild(li);
      });

      card.replaceChildren(head, h4, ol);

      const tip = document.createElement('div');
      tip.className = 'p-3 rounded-xl bg-emerald-950/60 border border-emerald-500 text-xs text-emerald-300';
      const strongTip = document.createElement('strong');
      strongTip.textContent = '💡 शिक्षक लाभ: ';
      const tipText = document.createElement('span');
      tipText.textContent = '15 मिनट तक बिना शोर किए 30 बच्चे एक साथ संख्याओं का अभ्यास करते हैं।';
      tip.replaceChildren(strongTip, tipText);

      container.replaceChildren(card, tip);
      AudioEngine.speakHindi('संख्या रेलगाड़ी श्यामपट्ट खेल के चरण प्रदर्शित किए गए हैं।');
    } else {
      titleText = 'शहरी डेस्क खेल: "ध्वनि ताली व शब्द श्रृंखला"';

      const card = document.createElement('div');
      card.className = 'p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2';

      const head = document.createElement('div');
      head.className = 'flex items-center justify-between text-xs text-slate-400';
      const spanMat = document.createElement('span');
      spanMat.textContent = 'सामग्री: शून्य सामग्री (डेस्क पर बैठे-बैठे)';
      const spanGrade = document.createElement('span');
      spanGrade.className = 'text-sky-400 font-bold';
      spanGrade.textContent = '50-60 बच्चे';
      head.replaceChildren(spanMat, spanGrade);

      const h4 = document.createElement('h4');
      h4.className = 'text-sky-400 font-black text-base m-0';
      h4.textContent = 'कक्षा में कैसे खेलें:';

      const ol = document.createElement('ol');
      ol.className = 'list-decimal pl-5 space-y-2 text-slate-300 text-sm';
      const steps = [
        "शिक्षक एक वर्ण बोलेंगे (जैसे 'क')।",
        'पूरी कक्षा एक साथ दो बार डेस्क पर हल्की ताली बजाएगी।',
        "आगे की पंक्ति का बच्चा 'क' से शब्द बोलेगा (उदा. 'कमल')।",
        "अगला बच्चा 'ल' से नया शब्द बोलेगा (उदा. 'लाल')।"
      ];
      steps.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        ol.appendChild(li);
      });

      card.replaceChildren(head, h4, ol);

      const tip = document.createElement('div');
      tip.className = 'p-3 rounded-xl bg-sky-950/60 border border-sky-500 text-xs text-sky-300';
      const strongTip = document.createElement('strong');
      strongTip.textContent = '💡 शिक्षक लाभ: ';
      const tipText = document.createElement('span');
      tipText.textContent = '50+ बच्चों की संकीर्ण कक्षा में बिना भागे-दौड़े शोर 60% कम होता है और शब्दावली बढ़ती है।';
      tip.replaceChildren(strongTip, tipText);

      container.replaceChildren(card, tip);
      AudioEngine.speakHindi('शहरी डेस्क खेल: ध्वनि ताली के चरण प्रदर्शित किए गए हैं।');
    }

    ModalManager.open(titleText, container);
    AudioEngine.playTone(523.25, 783.99);
  }

  function runInteractiveDemo() {
    const container = document.createElement('div');
    container.className = 'space-y-4';

    const intro = document.createElement('p');
    intro.className = 'text-sm text-slate-300 m-0';
    intro.textContent = 'देखें कि कैसे 1 शिक्षक कक्षासहाय के साथ 2 कक्षाओं को एक साथ बिना तनाव के संचालित करता है:';
    container.appendChild(intro);

    const simBox = document.createElement('div');
    simBox.id = 'sim-progress-box';
    simBox.className = 'p-4 rounded-2xl bg-slate-900 border-2 border-amber-500 space-y-3';

    const topRow = document.createElement('div');
    topRow.className = 'flex items-center justify-between text-xs font-bold text-amber-400';
    const badgeSpan = document.createElement('span');
    badgeSpan.id = 'sim-step-badge';
    badgeSpan.textContent = 'चरण 1/3: कक्षा 1 प्रत्यक्ष समय';
    const livePill = document.createElement('span');
    livePill.className = 'animate-pulse';
    livePill.textContent = '🟢 सिमुलेशन चल रहा है';
    topRow.replaceChildren(badgeSpan, livePill);
    simBox.appendChild(topRow);

    const barTrack = document.createElement('div');
    barTrack.className = 'w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700';
    const barFill = document.createElement('div');
    barFill.id = 'sim-bar';
    barFill.className = 'bg-amber-400 h-full w-1/3 transition-all duration-700';
    barTrack.appendChild(barFill);
    simBox.appendChild(barTrack);

    const pDesc = document.createElement('p');
    pDesc.id = 'sim-text';
    pDesc.className = 'text-sm text-white font-semibold m-0';
    pDesc.textContent = "👨‍🏫 शिक्षक कक्षा 1 को 'क' और 'म' वर्ण पहचान करा रहे हैं, जबकि कक्षा 2/3 स्लेट पर 10-10 कंकड़ गिन रहे हैं।";
    simBox.appendChild(pDesc);

    container.appendChild(simBox);

    const footer = document.createElement('p');
    footer.className = 'text-xs text-slate-400 text-center';
    footer.textContent = '15 सेकंड बाद स्वचालित रूप से बारी बदलेगी...';
    container.appendChild(footer);

    ModalManager.open('⚡ 30-सेकंड सजीव कक्षा सिमुलेशन (Classroom in Action)', container);
    AudioEngine.playTone(523.25, 659.25);
    AudioEngine.speakHindi('सजीव कक्षा सिमुलेशन शुरू हुआ। पहले चरण में कक्षा 1 को प्रत्यक्ष समय दिया जा रहा है।');

    setTimeout(() => {
      const badge = document.getElementById('sim-step-badge');
      const bar = document.getElementById('sim-bar');
      const text = document.getElementById('sim-text');
      if (badge && bar && text) {
        badge.textContent = 'चरण 2/3: 15 मिनट पूरे • बारी परिवर्तन!';
        bar.className = 'bg-blue-400 h-full w-2/3 transition-all duration-700';
        text.textContent = '🔔 घंटी बजी! अब शिक्षक कक्षा 2/3 को 2-अंकीय जोड़ सिखा रहे हैं, और कक्षा 1 स्लेट पर चित्र बना रही है।';
        AudioEngine.playTone(880, 1174.66, 0.5);
        AudioEngine.speakHindi('घंटी बजी! अब कक्षा 2 और 3 को प्रत्यक्ष समय दिया जा रहा है।');
      }
    }, 4000);

    setTimeout(() => {
      const badge = document.getElementById('sim-step-badge');
      const bar = document.getElementById('sim-bar');
      const text = document.getElementById('sim-text');
      if (badge && bar && text) {
        badge.textContent = 'चरण 3/3: 2-मिनट अनुपस्थिति जांच';
        bar.className = 'bg-emerald-400 h-full w-full transition-all duration-700';
        text.textContent = '🎯 परिणाम: 30 मिनट में दोनों कक्षाओं का FLN लक्ष्य पूरा हुआ। कोई बच्चा खाली नहीं बैठा, कोई शोर नहीं हुआ!';
        AudioEngine.playTone(659.25, 880, 0.6);
        AudioEngine.speakHindi('सिमुलेशन पूरा हुआ। दोनों कक्षाओं ने बिना शोर किए अपना दैनिक लक्ष्य प्राप्त किया।');
      }
    }, 8000);
  }

  function updateNipunScore() {
    const checkboxes = document.querySelectorAll('#view-nipun input[type="checkbox"]');
    let checked = 0;
    checkboxes.forEach(c => { if (c.checked) checked++; });
    const pct = Math.round((checked / checkboxes.length) * 100);
    StateStore.setState({ nipunScore: pct });
    const gauge = document.getElementById('nipun-percentage');
    if (gauge) gauge.textContent = `${pct}% दक्ष`;
    AudioEngine.playTone(587.33, 783.99, 0.2);
  }

  function askQuickVoice(query) {
    AudioEngine.speakHindi(`आपने पूछा: ${query}। इसके लिए कक्षासहाय का सुझाव है: कक्षा को दो समूहों में बांटें और 15 मिनट का चक्रीय अभ्यास शुरू करें।`);
    if (typeof alert !== 'undefined') {
      alert(`सहायक उत्तर:\n"${query}"\n\nसुझाव: 15-मिनट का विभाजन चक्र लागू करें या 2-मिनट मौखिक जांच शुरू करें।`);
    }
  }

  return {
    init,
    toggleSplitCycle: () => TimerEngine.toggle(),
    forceNextSplitCycle,
    setSchoolMode,
    switchTab,
    selectConceptChip,
    clearConceptInput,
    generatePedagogicalAnalogy,
    generateAnalogyFromQuery,
    launchCatchUpDiagnostic,
    openCatchUpDiagnostic: launchCatchUpDiagnostic,
    recordRemediation,
    showTLMGame,
    triggerVoiceQuery: () => VoiceAssistant.startListening(),
    askQuickVoice,
    runInteractiveDemo,
    updateNipunScore,
    runDiagnostics: () => DiagnosticsEngine.renderDiagnosticsModal(),
    openSettings: () => ModalManager.open('⚙️ AI व एज सेटिंग्स', buildSettingsNode()),
    closeModal: () => ModalManager.close()
  };

  function buildSettingsNode() {
    const currentKey = StateStore.getState().edgeApiKey;
    const container = document.createElement('div');
    container.className = 'space-y-4';

    const info = document.createElement('p');
    info.className = 'text-sm text-slate-300';
    info.textContent = 'कक्षासहाय बिना इंटरनेट के 100% कार्य करता है (ऑन-डिवाइस जेनेरेटिव AI)। यदि आप वैकल्पिक रूप से सर्वरलेस Edge LLM (Gemini 2.5 Flash API) जोड़ना चाहते हैं, तो नीचे अपनी API Key दर्ज करें:';
    container.appendChild(info);

    const inputGroup = document.createElement('div');
    inputGroup.className = 'space-y-1.5';
    const label = document.createElement('label');
    label.className = 'text-xs text-amber-400 font-bold uppercase block';
    label.textContent = 'Gemini / Edge LLM API Key (वैकल्पिक):';
    const input = document.createElement('input');
    input.type = 'password';
    input.id = 'edge-api-key-input';
    input.value = currentKey;
    input.placeholder = 'AIzaSy... (खाली रखने पर ऑन-डिवाइस AI चलेगा)';
    input.className = 'w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm';
    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    container.appendChild(inputGroup);

    const btnSave = document.createElement('button');
    btnSave.className = 'w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-transform active:scale-95';
    btnSave.textContent = 'सहेजें (Save Settings)';
    btnSave.addEventListener('click', () => {
      const val = document.getElementById('edge-api-key-input').value.trim();
      StateStore.setState({ edgeApiKey: val });
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('kakshasahay_edge_api_key', val);
      }
      ModalManager.close();
      alert('सेटिंग्स सहेजी गईं! ' + (val ? 'क्लाउड Edge LLM पाइपलाइन सक्रिय।' : 'ऑन-डिवाइस जेनेरेटिव AI सक्रिय।'));
    });
    container.appendChild(btnSave);

    return container;
  }
})();

// Global VidyaEngine bridge for backwards-compatible HTML onclick attributes
const VidyaEngine = {
  setSchoolMode: (m) => AppController.setSchoolMode(m),
  switchTab: (t) => AppController.switchTab(t),
  toggleSplitCycle: () => AppController.toggleSplitCycle(),
  forceNextSplitCycle: () => AppController.forceNextSplitCycle(),
  selectConceptChip: (c) => AppController.selectConceptChip(c),
  clearConceptInput: () => AppController.clearConceptInput(),
  generatePedagogicalAnalogy: () => AppController.generatePedagogicalAnalogy(),
  launchCatchUpDiagnostic: () => AppController.launchCatchUpDiagnostic(),
  launchCatchUpDiagnosticSecure: () => AppController.launchCatchUpDiagnostic(),
  showChalkboardGame: () => AppController.showTLMGame(),
  triggerVoiceQuery: () => AppController.triggerVoiceQuery(),
  askQuickVoice: (q) => AppController.askQuickVoice(q),
  runInteractiveDemo: () => AppController.runInteractiveDemo(),
  updateNipunScore: () => AppController.updateNipunScore(),
  runSelfDiagnostics: () => AppController.runDiagnostics(),
  openSettingsModal: () => AppController.openSettings(),
  speakHindi: (txt) => AudioEngine.speakHindi(txt),
  closeModal: () => AppController.closeModal()
};

// Global direct function bindings for browser window scope
if (typeof window !== 'undefined') {
  window.VidyaEngine = VidyaEngine;
  window.launchCatchUpDiagnostic = () => AppController.launchCatchUpDiagnostic();
  window.runSelfDiagnostics = () => AppController.runDiagnostics();
}
if (typeof globalThis !== 'undefined') {
  globalThis.VidyaEngine = VidyaEngine;
}

// Auto-boot on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    AppController.init();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppController, VidyaEngine };
}

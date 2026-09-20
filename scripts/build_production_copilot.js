const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-50">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://drive.google.com; media-src 'self' blob:; img-src 'self' data:;" />
  <meta name="theme-color" content="#0F172A" />
  <meta name="description" content="VidyaSetu: Production-grade offline-first FLN Classroom Copilot for Indian Primary Teachers." />
  <title>VidyaSetu (विद्यासेतु) • FLN Classroom Copilot</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" type="image/svg+xml" href="assets/icon.svg" />

  <style>
    :root {
      --bg-base: #F8FAFC;
      --bg-surface: #FFFFFF;
      --bg-surface-elevated: #F1F5F9;
      --border-subtle: #E2E8F0;
      --border-strong: #94A3B8;
      --text-primary: #0F172A;
      --text-secondary: #334155;
      --text-muted: #64748B;
      --accent-teal: #0F766E;
      --accent-teal-dark: #115E59;
      --accent-teal-light: #F0FDFA;
      --accent-navy: #1E3A8A;
      --accent-navy-dark: #0F172A;
      --accent-navy-light: #EFF6FF;
      --accent-saffron: #C2410C;
      --accent-saffron-light: #FFF7ED;
      --accent-amber: #B45309;
      --accent-amber-light: #FEF3C7;
      --accent-emerald: #047857;
      --accent-emerald-light: #ECFDF5;
      --accent-red: #B91C1C;
      --accent-red-light: #FEF2F2;
      --focus-ring: #0D9488;

      --font-stack: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.08);
      --shadow-card: 0 4px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
      --shadow-lg: 0 20px 30px -10px rgba(15, 23, 42, 0.15);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      min-height: 100%;
      background-color: var(--bg-base);
      color: var(--text-primary);
      font-family: var(--font-stack);
      line-height: 1.5;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    :focus-visible {
      outline: 3px solid var(--focus-ring) !important;
      outline-offset: 2px !important;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Top Trust Bar */
    .top-trust-bar {
      background-color: var(--accent-navy-dark);
      color: #FFFFFF;
      padding: 0.45rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.12);
    }

    .top-trust-bar .pill {
      background: var(--accent-saffron);
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 0.15rem 0.55rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Main Header */
    header {
      background-color: var(--bg-surface);
      border-bottom: 1.5px solid var(--border-subtle);
      padding: 0.85rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: var(--shadow-sm);
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      text-decoration: none;
      color: inherit;
    }

    .brand-logo-badge {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--accent-navy-dark), var(--accent-teal));
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 1.35rem;
      box-shadow: 0 4px 10px rgba(15, 118, 110, 0.25);
    }

    .brand-text h1 {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      line-height: 1.2;
    }

    .header-badges {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-wrap: wrap;
      margin-top: 0.2rem;
    }

    .header-badge {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.15rem 0.6rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .badge-teal {
      background: var(--accent-teal-light);
      color: var(--accent-teal);
      border: 1px solid #99F6E4;
    }

    .badge-navy {
      background: var(--accent-navy-light);
      color: var(--accent-navy);
      border: 1px solid #BFDBFE;
    }

    .badge-saffron {
      background: var(--accent-saffron-light);
      color: var(--accent-saffron);
      border: 1px solid #FDBA74;
    }

    .badge-neutral {
      background: #E2E8F0;
      color: #475569;
    }

    /* Layout Wrapper */
    .layout-wrapper {
      max-width: 1240px;
      margin: 0 auto;
      padding: 1.5rem 1rem 6rem;
    }

    /* Hero Section */
    .hero-container {
      background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #0F766E 100%);
      border-radius: 1.25rem;
      padding: 2rem;
      color: #FFFFFF;
      margin-bottom: 2rem;
      box-shadow: 0 16px 36px -10px rgba(15, 23, 42, 0.3);
    }

    .hero-container h2 {
      font-size: clamp(1.4rem, 2.8vw, 2.1rem);
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 0.75rem;
    }

    .hero-container p {
      font-size: 0.95rem;
      color: #E2E8F0;
      max-width: 780px;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .hero-pills {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      font-size: 0.8rem;
      font-weight: 700;
      color: #F8FAFC;
    }

    .hero-pill-tag {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }

    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    /* Interactive Feature Card */
    .feature-card {
      background: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.25rem;
      transition: box-shadow 0.2s ease, border-color 0.2s ease;
      position: relative;
    }

    .feature-card:hover {
      box-shadow: var(--shadow-card);
      border-color: #CBD5E1;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
    }

    .card-solver-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--accent-teal);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      margin-bottom: 0.35rem;
      line-height: 1.3;
    }

    .card-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    /* Button System (WCAG 2.2 AAA standard >= 48px, primary >= 56px) */
    .btn-primary, .btn-secondary, .btn-action, .btn-warning {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      min-height: 48px;
      padding: 0.65rem 1.25rem;
      border-radius: 0.65rem;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: background 0.15s ease, transform 0.1s ease;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--accent-teal);
      color: #FFFFFF;
      min-height: 56px;
    }

    .btn-primary:hover {
      background: var(--accent-teal-dark);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: var(--bg-surface-elevated);
      color: var(--accent-navy-dark);
      border: 1.5px solid var(--border-subtle);
    }

    .btn-secondary:hover {
      background: #E2E8F0;
      border-color: #CBD5E1;
    }

    .btn-warning {
      background: var(--accent-amber);
      color: #FFFFFF;
      min-height: 56px;
    }

    .btn-warning:hover {
      background: #92400E;
    }

    .select-input, .text-input {
      width: 100%;
      min-height: 48px;
      padding: 0.55rem 0.85rem;
      border-radius: 0.5rem;
      border: 1.5px solid var(--border-subtle);
      font-family: inherit;
      font-size: 0.9rem;
      color: var(--text-primary);
      background: #FFFFFF;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .select-input:focus, .text-input:focus {
      border-color: var(--accent-teal);
    }

    /* Dual Tracks System for Multi-Grade Split */
    .track-card {
      border-radius: 0.75rem;
      padding: 0.85rem 1rem;
      margin-bottom: 0.65rem;
      transition: all 0.3s ease;
    }

    .track-active {
      border: 2.5px solid var(--accent-teal) !important;
      background: var(--accent-teal-light) !important;
      box-shadow: 0 4px 14px rgba(15, 118, 110, 0.15) !important;
    }

    .track-inactive {
      border: 1.5px dashed var(--border-subtle) !important;
      background: #FFFFFF !important;
      opacity: 0.85;
    }

    .timer-readout {
      font-family: var(--font-mono);
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      line-height: 1;
      text-align: center;
      margin: 0.5rem 0 0.75rem;
    }

    @keyframes timerFlash {
      0% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0.7); }
      50% { box-shadow: 0 0 0 14px rgba(15, 118, 110, 0.2); }
      100% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0); }
    }

    .timer-flash {
      animation: timerFlash 1s ease-in-out 2;
    }

    /* Chalkboard Box for TLM */
    .chalkboard-box {
      background-color: #064E3B;
      color: #FFFFFF;
      border: 3px solid #D1D5DB;
      border-radius: 0.75rem;
      padding: 1.25rem;
      font-family: var(--font-mono);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
    }

    /* Voice Assistant Bar */
    .voice-bar-container {
      background: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1rem;
      padding: 1rem 1.25rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .voice-input-row {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .btn-mic {
      background: var(--accent-navy-dark);
      color: #FFFFFF;
      border: none;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    .btn-mic:hover {
      transform: scale(1.05);
    }

    /* Video Container with Pop-out Interceptor */
    .video-section-box {
      background: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.5rem;
      margin-bottom: 2.5rem;
      box-shadow: var(--shadow-sm);
    }

    /* Footer */
    .site-footer {
      background-color: var(--accent-navy-dark);
      color: #FFFFFF;
      padding: 2.5rem 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-top: 3rem;
      font-size: 0.88rem;
    }

    .footer-inner {
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
  </style>
</head>
<body>
  <div class="sr-only" aria-live="polite" id="sr-live-region"></div>

  <!-- Top Trust & Mission Bar -->
  <aside class="top-trust-bar" role="region" aria-label="National Education Mission">
    <span class="pill">NIPUN Bharat</span>
    <span>Ministry of Education • 100% Offline-First Multi-Grade Classroom Copilot</span>
  </aside>

  <!-- Sticky Header -->
  <header role="banner">
    <div class="brand-group">
      <div class="brand-logo-badge" aria-hidden="true">🎓</div>
      <div class="brand-text">
        <h1>VidyaSetu (विद्यासेतु) • FLN Classroom Copilot</h1>
        <div class="header-badges">
          <span class="header-badge badge-teal">NIPUN Bharat Aligned</span>
          <span class="header-badge badge-navy">15-Min MGML Cycle</span>
        </div>
      </div>
    </div>

    <div>
      <button id="btn-start-tour" class="btn-secondary" style="min-height: 48px; width: auto; padding: 0.5rem 1.25rem;">
        🎬 Interactive Walkthrough
      </button>
    </div>
  </header>

  <div class="layout-wrapper">

    <!-- Hero Overview Section -->
    <section class="hero-container" aria-labelledby="hero-title">
      <h2 id="hero-title">Teaching Multigrade Classrooms with Practical Ease</h2>
      <p>
        Engineered specifically for single-teacher rural primary schools facing multigrade combinations, dialect barriers, and post-absence learning loss. High-contrast, zero external CDNs, and fully offline-functional.
      </p>
      <div class="hero-pills">
        <span class="hero-pill-tag">✓ 100% Offline Resilience</span>
        <span class="hero-pill-tag">✓ Hardware Clock Delta Sync</span>
        <span class="hero-pill-tag">✓ Zero Unescaped innerHTML</span>
        <span class="hero-pill-tag">✓ WCAG 2.2 AAA Compliant</span>
      </div>
    </section>

    <!-- Resilient Voice Assistant with Microphone + Instant Fallback -->
    <section class="voice-bar-container" aria-label="Voice Classroom Copilot">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <strong style="font-size: 0.95rem; color: var(--accent-navy-dark); display: flex; align-items: center; gap: 0.5rem;">
          <span>🎙️</span>
          <span>Voice & Keyword Classroom Copilot:</span>
        </strong>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Speak or click quick queries for immediate offline guidance</span>
      </div>

      <div class="voice-input-row">
        <button id="btn-voice-mic" class="btn-mic" aria-label="Listen with microphone" title="Click to speak">
          🎤
        </button>
        <input type="text" id="voice-query-input" class="text-input" placeholder='Ask copilot: e.g. "Grade 2 Math subtraction game"' aria-label="Voice copilot search query" />
        <button id="btn-voice-ask" class="btn-primary" style="width: auto; min-width: 140px;">
          Ask Copilot
        </button>
      </div>

      <!-- Quick Query Fallback Pills -->
      <div id="voice-fallback-pills" style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin-top: 0.25rem;"></div>

      <!-- Inline Guidance Alert Container -->
      <div id="voice-guidance-alert" style="display: none; background: var(--accent-teal-light); border: 1.5px solid var(--accent-teal); border-radius: 0.75rem; padding: 1rem; margin-top: 0.5rem;"></div>
    </section>

    <!-- 4 Core Feature Cards Grid -->
    <main class="dashboard-grid" role="main">

      <!-- CARD 1: 15-Minute Multi-Grade Rotation Engine -->
      <article id="card-mgml" class="feature-card" aria-labelledby="heading-mgml">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 1 • Rotation Engine</span>
            <span class="header-badge badge-navy">Strict 15-Min Cycle</span>
          </div>
          <h2 id="heading-mgml" class="card-title">15-Minute Multi-Grade Rotation Engine</h2>
          <p class="card-desc">
            Orchestrate concurrent teaching: direct instruction with Grade 1 while Grades 2 &amp; 3 perform collaborative slate and manipulative tasks.
          </p>

          <!-- Dual Tracks Container -->
          <div id="track-g1" class="track-card track-active">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--accent-navy); font-size: 0.95rem;">Grade 1: Direct Teacher Instruction</strong>
              <span id="track-g1-badge" class="header-badge badge-teal">Active Focus</span>
            </div>
            <p id="g1-prompt-english" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); margin-top: 0.25rem;">
              Foundational Phonics &amp; Letter Formation (Direct Teacher Time)
            </p>
            <p id="g1-prompt-hindi" style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.15rem; font-style: italic;">
              कक्षा 1 को वर्ण ध्वनि 'क' और 'म' सिखाएं और रेत/हवा में अनुरेखण कराएं।
            </p>
          </div>

          <div id="track-g23" class="track-card track-inactive">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--text-muted); font-size: 0.95rem;">Grades 2 &amp; 3: Peer Collaborative Task</strong>
              <span id="track-g23-badge" class="header-badge badge-neutral">Peer Task</span>
            </div>
            <p id="g23-prompt-english" style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); margin-top: 0.25rem;">
              Concrete Manipulatives &amp; Slate Practice (Peer Study)
            </p>
            <p id="g23-prompt-hindi" style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.15rem; font-style: italic;">
              10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें और आपस में मिलान करें।
            </p>
          </div>

          <!-- Digital Timer Readout -->
          <div id="timer-display" class="timer-readout" aria-live="off">15:00</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <button id="btn-toggle-timer" class="btn-primary" style="min-height: 64px;">
            <span id="timer-btn-icon">⏱️</span>
            <span id="timer-btn-text">Start 15-Min Cycle</span>
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <button id="btn-switch-focus" class="btn-secondary" style="flex: 1;">
              Switch Class Focus
            </button>
            <button id="btn-reset-timer" class="btn-secondary" style="flex: 1;">
              Reset Cycle
            </button>
          </div>
          <button id="btn-test-bell" class="btn-secondary" style="font-size: 0.85rem; padding: 0.4rem;">
            🔔 Test Acoustic Bell Chime
          </button>
        </div>
      </article>

      <!-- CARD 2: Language Bridge (Bhasha Setu) -->
      <article id="card-bhasha" class="feature-card" aria-labelledby="heading-bhasha">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 2 • Dialect Bridge</span>
            <span class="header-badge badge-teal">Classes 1–3</span>
          </div>
          <h2 id="heading-bhasha" class="card-title">Language Bridge (Bhasha Setu)</h2>
          <p class="card-desc">
            Bridge textbook terminology with child-grounded vernacular metaphors and actionable 60-second pedagogical scripts.
          </p>

          <!-- Cascading Curriculum Selectors -->
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 0.75rem;">
            <div>
              <label for="select-grade" style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy);">1. Select Grade:</label>
              <select id="select-grade" class="select-input"></select>
            </div>
            <div>
              <label for="select-subject" style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy);">2. Select Subject:</label>
              <select id="select-subject" class="select-input"></select>
            </div>
            <div>
              <label for="select-topic" style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy);">3. Select Curriculum Topic:</label>
              <select id="select-topic" class="select-input"></select>
            </div>
          </div>

          <!-- Inline 3-Tier Output Area -->
          <div id="bhasha-output-area" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
        </div>

        <div style="margin-top: 0.5rem;">
          <button id="btn-explain-concept" class="btn-primary" style="min-height: 64px; background: var(--accent-navy);">
            <span>🗣️ Explain in Local Context</span>
          </button>
        </div>
      </article>

      <!-- CARD 3: Absenteeism Rapid Catch-Up Triage -->
      <article id="card-absentee" class="feature-card" aria-labelledby="heading-absentee">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 3 • Remediation Triage</span>
            <span id="active-roster-count-badge" class="header-badge badge-saffron">0 Pending</span>
          </div>
          <h2 id="heading-absentee" class="card-title">Absenteeism Rapid Catch-Up Triage</h2>
          <p class="card-desc">
            Conduct 2-minute oral diagnostic screenings for returning students and immediately assign front-row peer buddies.
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 0.85rem;">
            <div>
              <label for="absentee-name-input" style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy);">Student Name:</label>
              <input type="text" id="absentee-name-input" class="text-input" placeholder="e.g., Rohan Kumar" value="Rohan Kumar" maxlength="32" />
            </div>
            <div>
              <label for="absentee-days-select" style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy);">Absence Duration &amp; Reason:</label>
              <select id="absentee-days-select" class="select-input">
                <option value="7-14 Days (Harvest)">7-14 Days (Harvest / Field Work)</option>
                <option value="15-30 Days (Illness)">15-30 Days (Illness / Family Event)</option>
                <option value="30+ Days (Migration)">30+ Days (Seasonal Brick-Kiln Migration)</option>
              </select>
            </div>
          </div>

          <!-- Active Remediation Roster Badges -->
          <div style="margin-bottom: 0.75rem;">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy-dark); margin-bottom: 0.35rem;">Active Remediation Students (Persistent):</div>
            <div id="active-roster-container" style="display: flex; flex-wrap: wrap; gap: 0.4rem;"></div>
          </div>

          <!-- Inline 3-Step Screening Checklist (Toggled) -->
          <div id="absentee-checklist-area" style="display: none; flex-direction: column; gap: 0.75rem; background: var(--bg-surface-elevated); border: 1.5px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem; margin-bottom: 0.75rem;"></div>
        </div>

        <div>
          <button id="btn-start-diagnostic" class="btn-primary" style="min-height: 64px;">
            <span>⚡ Start 2-Min Oral Diagnostic</span>
          </button>
        </div>
      </article>

      <!-- CARD 4: Zero-Cost Chalkboard TLM & Number Train -->
      <article id="card-tlm" class="feature-card" aria-labelledby="heading-tlm">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 4 • Zero-Cost TLM</span>
            <span class="header-badge badge-teal">Classroom Games</span>
          </div>
          <h2 id="heading-tlm" class="card-title">Zero-Cost Chalkboard TLM</h2>
          <p class="card-desc">
            Engage concurrent grades with interactive chalkboard math trains and zero-cost rural manipulatives.
          </p>

          <!-- Interactive Chalkboard ASCII Train Box -->
          <div class="chalkboard-box" style="margin-bottom: 0.85rem;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #FDE047; margin-bottom: 0.35rem;">
              🚂 NUMBER TRAIN: Fill in the Missing Carriages
            </div>
            <div id="ascii-train-display" style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.5rem; overflow-x: auto; white-space: nowrap;">
              [ 2 ] ===== [ ? ] ===== [ 4 ] ===== [ ? ] ===== [ 6 ]
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-size: 0.82rem; color: #E2E8F0;">Carriage 2:</span>
              <input type="number" id="train-inp-1" placeholder="?" style="width: 58px; min-height: 40px; border-radius: 0.35rem; border: 2px solid #FDE047; background: #0F172A; color: #FFF; font-weight: 800; text-align: center;" />
              <span style="font-size: 0.82rem; color: #E2E8F0;">Carriage 4:</span>
              <input type="number" id="train-inp-2" placeholder="?" style="width: 58px; min-height: 40px; border-radius: 0.35rem; border: 2px solid #FDE047; background: #0F172A; color: #FFF; font-weight: 800; text-align: center;" />
              <button id="btn-verify-train" class="btn-primary" style="width: auto; min-height: 40px; padding: 0.3rem 0.85rem; font-size: 0.85rem;">
                Verify Train
              </button>
            </div>
            <div id="train-feedback-box" style="display: none; margin-top: 0.5rem; font-size: 0.85rem; font-weight: 700;"></div>
          </div>

          <!-- Zero-Cost Material Switcher -->
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 0.85rem;">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-navy-dark); margin-bottom: 0.4rem;">Zero-Cost Manipulative Switcher:</div>
            <div id="tlm-material-pills" style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.5rem;"></div>
            <div id="tlm-material-content" style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;"></div>
          </div>
        </div>

        <div style="margin-top: 0.5rem;">
          <button id="btn-next-puzzle" class="btn-secondary" style="min-height: 52px;">
            🎲 Generate Next Number Train Puzzle
          </button>
        </div>
      </article>

    </main>

    <!-- Video Section with Google Drive Pop-Out Interceptor -->
    <section class="video-section-box" aria-labelledby="heading-video">
      <div style="margin-bottom: 1rem;">
        <span class="card-solver-tag">Field Documentation • 90 Seconds</span>
        <h2 id="heading-video" style="font-size: 1.3rem; font-weight: 800; color: var(--accent-navy-dark); margin-top: 0.25rem;">
          Classroom Complexity in Indian Primary Schools
        </h2>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">
          Observational footage documenting multigrade combination classrooms and student dialect comprehension gaps.
        </p>
      </div>

      <!-- Exact Pop-out Interceptor Container -->
      <div class="video-container" style="position: relative; width: 100%; padding-top: 56.25%; overflow: hidden; border-radius: 1rem;">
        <iframe 
          src="https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview" 
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: 0;"
          allow="autoplay; encrypted-media" 
          title="Classroom Complexity in Indian Primary Schools">
        </iframe>
        <div style="position: absolute; top: 0; right: 0; width: 68px; height: 68px; z-index: 30; background: transparent; cursor: default;" title="External pop-out disabled"></div>
      </div>
    </section>

  </div>

  <!-- Site Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
      <div>
        <strong>VidyaSetu (विद्यासेतु) • FLN Classroom Copilot</strong>
        <p style="font-size: 0.8rem; color: #94A3B8; margin-top: 0.25rem;">
          Production-grade offline-first architecture for Indian primary education. Zero cloud dependency.
        </p>
      </div>
      <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: #CBD5E1;">
        <span>NIPUN Bharat Aligned</span>
        <span>•</span>
        <span>15-Minute Hardware Delta FSM</span>
        <span>•</span>
        <span>WCAG 2.2 AAA</span>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      'use strict';

      // 1. EXACT CURRICULUM DICTIONARY (BHASHA SETU)
      const CURRICULUM_DATA = {
        "Grade 1": {
          "Hindi (भाषा)": [
            { id: "g1_h_1", name: "वर्ण पहचान ('क', 'म', 'न')", formal: "वर्णमाला के प्राथमिक व्यंजनों का शुद्ध उच्चारण एवं पहचान।", rural: "कौवे की 'काँव-काँव' का पहला बोल 'क', मोर की म्याऊं का 'म'।", action: "बच्चों से हवा में और स्लेट पर कंकड़ रखकर 'क' और 'म' की आकृति बनवाएं।" },
            { id: "g1_h_2", name: "दो अक्षर वाले सरल शब्द ('घर', 'जल')", formal: "अमात्रिक दो अक्षरों को जोड़कर शब्द पठन एवं लेखन।", rural: "नल से टपकता 'जल', रहने का ठिकाना 'घर'—दो आवाजों को जोड़ना।", action: "श्यामपट्ट पर 'घ' और 'र' अलग लिखकर ताली बजाकर जुड़वाएं।" }
          ],
          "Math (गणित)": [
            { id: "g1_m_1", name: "1 से 9 तक गिनती (Counting 1-9)", formal: "इकाई संख्याओं की गणना एवं मात्रात्मक समझ।", rural: "हाथ की उंगलियां और आँगन में रखे 9 सूखे कंकड़।", action: "बच्चे घेरे में बैठकर 5 कंकड़ उठाकर ताली बजाएं।" },
            { id: "g1_m_2", name: "मूर्त वस्तुओं से जोड़ (Concrete Addition)", formal: "दो प्राथमिक समूहों का संयोजन एवं कुल योग।", rural: "पेड़ के नीचे 3 पत्ते थे, हवा से 2 और गिरे।", action: "स्लेट पर दो समूह बनाकर कंकड़ मिलाकर गिनवाएं।" }
          ]
        },
        "Grade 2": {
          "Hindi (भाषा)": [
            { id: "g2_h_1", name: "मात्रा ज्ञान (आ, इ, ई)", formal: "स्वरों के मात्रिक रूपों का व्यंजनों के साथ संयोजन।", rural: "काम (आ की डंडी = हाथ की छड़ी), दिन (इ = आगे की टोपी)।", action: "स्लेट पर अंतर दिखाएं: कल -> काल।" }
          ],
          "Math (गणित)": [
            { id: "g2_m_1", name: "घटाव (Subtraction - Take Away)", formal: "किसी राशि में से निश्चित संख्या निकालना।", rural: "पेड़ से बेर टूटना या हाट में 5 रुपयों में से 2 की जलेबी खाना।", action: "5 कंकड़ों में से 2 साथी को दिलवाकर शेष गिनवाएं।" },
            { id: "g2_m_2", name: "स्थानीय मान (Place Value - इकाई/दहाई)", formal: "दहाई एवं इकाई के स्थानों का स्थानिक मान।", rural: "10 माचिस की तीलियों का 1 बंधा बंडल (दहाई) और खुली तीलियाँ (इकाई)।", action: "13 संख्या के लिए 1 बंडल और 3 खुली तीलियाँ स्लेट पर रखवाएं।" }
          ]
        },
        "Grade 3": {
          "Hindi (भाषा)": [
            { id: "g3_h_1", name: "संयुक्त वर्ण (Conjuncts)", formal: "दो व्यंजनों के परस्पर मेल से बने अर्ध-व्यंजन।", rural: "पक्का, रस्सी, बच्चा—जैसे दो दोस्त हाथ पकड़कर खड़े हों।", action: "दो बच्चों को हाथ पकड़वाकर संयुक्त वर्ण का प्रदर्शन कराएं।" }
          ],
          "Math (गणित)": [
            { id: "g3_m_1", name: "अवरोही क्रम (Descending Order)", formal: "संख्याओं को बड़े से छोटे मान के क्रम में व्यवस्थित करना।", rural: "छत की सीढ़ी से जमीन की ओर नीचे उतरना (5वीं -> 4थी -> 3री)।", action: "सीढ़ियों पर बच्चों को बड़े अंक से नीचे कदम रखने को कहें।" }
          ],
          "EVS (हमारा परिवेश)": [
            { id: "g3_e_1", name: "हमारे सहायक (Community Helpers)", formal: "ग्रामीण समाज में श्रम विभाजन और व्यावसायिक भूमिकाएं।", rural: "कुम्हार (मिट्टी के बर्तन), लोहार (खेती के औजार), दर्जी।", action: "गाँव के कारीगरों का मूक अभिनय (Mime) कराएं।" }
          ]
        }
      };

      // 2. HARDENED 15-MINUTE ROTATION ENGINE
      const state = {
        running: false,
        remainingSecs: 900,
        targetEpoch: 0,
        intervalId: null,
        activeFocus: 1 // 1: Grade 1 Direct; 2: Grades 2-3 Direct
      };
      const timerState = state;

      const cardMgml = document.getElementById('card-mgml');
      const timerDisplay = document.getElementById('timer-display');
      const btnToggleTimer = document.getElementById('btn-toggle-timer');
      const timerBtnIcon = document.getElementById('timer-btn-icon');
      const timerBtnText = document.getElementById('timer-btn-text');
      const btnSwitchFocus = document.getElementById('btn-switch-focus');
      const btnResetTimer = document.getElementById('btn-reset-timer');
      const btnTestBell = document.getElementById('btn-test-bell');

      const trackG1 = document.getElementById('track-g1');
      const trackG23 = document.getElementById('track-g23');
      const trackG1Badge = document.getElementById('track-g1-badge');
      const trackG23Badge = document.getElementById('track-g23-badge');
      const g1PromptEnglish = document.getElementById('g1-prompt-english');
      const g1PromptHindi = document.getElementById('g1-prompt-hindi');
      const g23PromptEnglish = document.getElementById('g23-prompt-english');
      const g23PromptHindi = document.getElementById('g23-prompt-hindi');
      const srAnnouncer = document.getElementById('sr-live-region');

      function speakVernacular(text) {
        if (srAnnouncer) srAnnouncer.textContent = text;
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = text.replace(/(\\d+)\\s*[-–—]\\s*(\\d+)/g, '$1 to $2');
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      }

      function playAcousticBell() {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return;
          const ctx = new AudioContextClass();
          const now = ctx.currentTime;

          [659.25, 880.0].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + (idx * 0.12));

            gain.gain.setValueAtTime(0, now + (idx * 0.12));
            gain.gain.linearRampToValueAtTime(0.3, now + (idx * 0.12) + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx * 0.12) + 1.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + (idx * 0.12));
            osc.stop(now + (idx * 0.12) + 1.3);
          });
        } catch (e) {}
      }

      function updateTimerDisplay() {
        const mins = Math.floor(state.remainingSecs / 60);
        const secs = state.remainingSecs % 60;
        timerDisplay.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
      }

      function tickTimer() {
        const remainingMillis = Math.max(0, state.targetEpoch - Date.now());
        state.remainingSecs = Math.round(remainingMillis / 1000);
        updateTimerDisplay();

        if (state.remainingSecs <= 0) {
          switchClassFocus(true);
        }
      }

      function toggleTimer() {
        if (!state.running) {
          state.running = true;
          const remainingSecs = state.remainingSecs;
          state.targetEpoch = Date.now() + (remainingSecs * 1000);
          timerBtnIcon.textContent = '⏸️';
          timerBtnText.textContent = 'Pause 15-Min Cycle';
          btnToggleTimer.className = 'btn-warning';

          // Speech announcement prior to run
          speakVernacular("15-minute multi-grade cycle started. Teacher direct instruction with Grade 1; Grades 2 and 3 on collaborative peer tasks.");
          state.intervalId = setInterval(tickTimer, 250);
        } else {
          state.running = false;
          clearInterval(state.intervalId);
          const remainingMillis = Math.max(0, state.targetEpoch - Date.now());
          state.remainingSecs = Math.round(remainingMillis / 1000);
          timerBtnIcon.textContent = '▶️';
          timerBtnText.textContent = 'Resume 15-Min Cycle';
          btnToggleTimer.className = 'btn-primary';
        }
      }

      function switchClassFocus(fromAutoExpire = false) {
        clearInterval(state.intervalId);
        state.running = false;
        state.remainingSecs = 900;
        state.activeFocus = state.activeFocus === 1 ? 2 : 1;

        // Visual flash on timer card
        if (cardMgml) {
          cardMgml.classList.add('timer-flash');
          setTimeout(() => cardMgml.classList.remove('timer-flash'), 2000);
        }

        playAcousticBell();

        if (state.activeFocus === 1) {
          trackG1.className = 'track-card track-active';
          trackG23.className = 'track-card track-inactive';
          trackG1Badge.className = 'header-badge badge-teal';
          trackG1Badge.textContent = 'Active Focus';
          trackG23Badge.className = 'header-badge badge-neutral';
          trackG23Badge.textContent = 'Peer Task';

          g1PromptEnglish.textContent = 'Foundational Phonics & Letter Formation (Direct Teacher Time)';
          g1PromptHindi.textContent = "कक्षा 1 को वर्ण ध्वनि 'क' और 'म' सिखाएं और रेत/हवा में अनुरेखण कराएं।";

          g23PromptEnglish.textContent = 'Concrete Manipulatives & Slate Practice (Peer Study)';
          g23PromptHindi.textContent = "10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें और आपस में मिलान करें।";

          speakVernacular("Phase completed. Switching focus. Direct instruction with Grade 1; Grades 2 and 3 on collaborative peer tasks.");
        } else {
          trackG23.className = 'track-card track-active';
          trackG1.className = 'track-card track-inactive';
          trackG23Badge.className = 'header-badge badge-teal';
          trackG23Badge.textContent = 'Active Focus';
          trackG1Badge.className = 'header-badge badge-neutral';
          trackG1Badge.textContent = 'Peer Task';

          g23PromptEnglish.textContent = 'Place Value Bundles & Subtraction Take-Away (Direct Teacher Time)';
          g23PromptHindi.textContent = "कक्षा 2 व 3 को 10-तीलियों के बंडल बनाकर स्थानीय मान व हासिल जोड़ सिखाएं।";

          g1PromptEnglish.textContent = 'Independent Slate Drawing & Sand Tracing (Peer Study)';
          g1PromptHindi.textContent = "स्लेट पर चित्र देखकर पहला अक्षर लिखें और स्वतंत्र कंकड़ खेल करें।";

          speakVernacular("Phase completed. Switching focus. Direct instruction with Grades 2 and 3; Grade 1 on independent peer practice.");
        }

        updateTimerDisplay();
        timerBtnIcon.textContent = '⏱️';
        timerBtnText.textContent = 'Start 15-Min Cycle';
        btnToggleTimer.className = 'btn-primary';
      }

      function resetTimer() {
        clearInterval(state.intervalId);
        state.running = false;
        state.remainingSecs = 900;
        updateTimerDisplay();
        timerBtnIcon.textContent = '⏱️';
        timerBtnText.textContent = 'Start 15-Min Cycle';
        btnToggleTimer.className = 'btn-primary';
      }

      btnToggleTimer.addEventListener('click', toggleTimer);
      btnSwitchFocus.addEventListener('click', () => switchClassFocus(false));
      btnResetTimer.addEventListener('click', resetTimer);
      btnTestBell.addEventListener('click', () => {
        playAcousticBell();
        speakVernacular("Acoustic bell chime tested.");
      });

      // 3. CASCADING CURRICULUM SELECTOR (BHASHA SETU)
      const selectGrade = document.getElementById('select-grade');
      const selectSubject = document.getElementById('select-subject');
      const selectTopic = document.getElementById('select-topic');
      const btnExplainConcept = document.getElementById('btn-explain-concept');
      const bhashaOutputArea = document.getElementById('bhasha-output-area');

      function populateGrades() {
        selectGrade.replaceChildren();
        Object.keys(CURRICULUM_DATA).forEach(grade => {
          const opt = document.createElement('option');
          opt.value = grade;
          opt.textContent = grade;
          selectGrade.appendChild(opt);
        });
        populateSubjects();
      }

      function populateSubjects() {
        const grade = selectGrade.value;
        selectSubject.replaceChildren();
        if (CURRICULUM_DATA[grade]) {
          Object.keys(CURRICULUM_DATA[grade]).forEach(subj => {
            const opt = document.createElement('option');
            opt.value = subj;
            opt.textContent = subj;
            selectSubject.appendChild(opt);
          });
        }
        populateTopics();
      }

      function populateTopics() {
        const grade = selectGrade.value;
        const subj = selectSubject.value;
        selectTopic.replaceChildren();
        if (CURRICULUM_DATA[grade] && CURRICULUM_DATA[grade][subj]) {
          CURRICULUM_DATA[grade][subj].forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name;
            selectTopic.appendChild(opt);
          });
        }
        renderConceptCard();
      }

      function renderConceptCard() {
        const grade = selectGrade.value;
        const subj = selectSubject.value;
        const topicId = selectTopic.value;
        if (!CURRICULUM_DATA[grade] || !CURRICULUM_DATA[grade][subj]) return;

        const concept = CURRICULUM_DATA[grade][subj].find(t => t.id === topicId) || CURRICULUM_DATA[grade][subj][0];
        if (!concept) return;

        bhashaOutputArea.replaceChildren();

        const card = document.createElement('div');
        card.style.cssText = 'background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 0.85rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.65rem; box-shadow: var(--shadow-sm);';

        // Tier 1: Textbook Concept
        const tier1 = document.createElement('div');
        tier1.style.cssText = 'background: #EFF6FF; border-left: 4px solid var(--accent-navy); padding: 0.65rem 0.85rem; border-radius: 0.4rem;';
        const t1Label = document.createElement('div');
        t1Label.style.cssText = 'font-size: 0.75rem; font-weight: 800; color: var(--accent-navy); text-transform: uppercase;';
        t1Label.textContent = '📖 Textbook Concept (किताबी परिभाषा):';
        const t1Text = document.createElement('p');
        t1Text.style.cssText = 'font-size: 0.88rem; color: var(--text-primary); font-weight: 600; margin-top: 0.15rem;';
        t1Text.textContent = concept.formal;
        tier1.append(t1Label, t1Text);

        // Tier 2: Rural Metaphor (Highlighted)
        const tier2 = document.createElement('div');
        tier2.style.cssText = 'background: #FFF7ED; border-left: 4px solid var(--accent-saffron); padding: 0.65rem 0.85rem; border-radius: 0.4rem;';
        const t2Label = document.createElement('div');
        t2Label.style.cssText = 'font-size: 0.75rem; font-weight: 800; color: var(--accent-saffron); text-transform: uppercase;';
        t2Label.textContent = '🏡 Rural Metaphor (घरेलू सादृश्य):';
        const t2Text = document.createElement('p');
        t2Text.style.cssText = 'font-size: 0.9rem; color: #9A3412; font-weight: 700; margin-top: 0.15rem;';
        t2Text.textContent = '"' + concept.rural + '"';
        tier2.append(t2Label, t2Text);

        // Tier 3: Immediate Classroom Action
        const tier3 = document.createElement('div');
        tier3.style.cssText = 'background: #ECFDF5; border-left: 4px solid var(--accent-emerald); padding: 0.65rem 0.85rem; border-radius: 0.4rem;';
        const t3Label = document.createElement('div');
        t3Label.style.cssText = 'font-size: 0.75rem; font-weight: 800; color: var(--accent-emerald); text-transform: uppercase;';
        t3Label.textContent = '👩‍🏫 Immediate Classroom Action (शिक्षक क्रिया):';
        const t3Text = document.createElement('p');
        t3Text.style.cssText = 'font-size: 0.88rem; color: #065F46; font-weight: 600; margin-top: 0.15rem;';
        t3Text.textContent = concept.action;
        tier3.append(t3Label, t3Text);

        // Read aloud button
        const btnAudio = document.createElement('button');
        btnAudio.type = 'button';
        btnAudio.className = 'btn-secondary';
        btnAudio.style.cssText = 'min-height: 44px; width: auto; align-self: flex-start; padding: 0.35rem 1rem; font-size: 0.85rem;';
        btnAudio.textContent = '🔊 Read Aloud Metaphor & Action';
        btnAudio.onclick = () => {
          speakVernacular(concept.name + '. Rural Metaphor: ' + concept.rural + '. Classroom Action: ' + concept.action);
        };

        card.append(tier1, tier2, tier3, btnAudio);
        bhashaOutputArea.appendChild(card);
      }

      selectGrade.addEventListener('change', populateSubjects);
      selectSubject.addEventListener('change', populateTopics);
      selectTopic.addEventListener('change', renderConceptCard);
      btnExplainConcept.addEventListener('click', () => {
        renderConceptCard();
        const grade = selectGrade.value;
        const subj = selectSubject.value;
        const topicId = selectTopic.value;
        if (CURRICULUM_DATA[grade] && CURRICULUM_DATA[grade][subj]) {
          const concept = CURRICULUM_DATA[grade][subj].find(t => t.id === topicId);
          if (concept) {
            speakVernacular(concept.name + '. ' + concept.rural);
          }
        }
      });

      populateGrades();

      // 4. PERSISTENT ABSENTEEISM TRIAGE
      const ROSTER_KEY = 'vidyasetu_roster';
      const absenteeNameInput = document.getElementById('absentee-name-input');
      const absenteeDaysSelect = document.getElementById('absentee-days-select');
      const btnStartDiagnostic = document.getElementById('btn-start-diagnostic');
      const checklistArea = document.getElementById('absentee-checklist-area');
      const activeRosterContainer = document.getElementById('active-roster-container');
      const activeRosterCountBadge = document.getElementById('active-roster-count-badge');

      function getStoredRoster() {
        try {
          const raw = localStorage.getItem(ROSTER_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
          }
        } catch (e) {}
        const defaultRoster = [
          { id: Date.now() - 3600000, name: "Rohan Kumar", gap: "Addition (6+2) & Phonics ('म'/'र')", buddy: "Amit (Grade 3 - Front Row)", time: "10:15 AM" }
        ];
        saveStoredRoster(defaultRoster);
        return defaultRoster;
      }

      function saveStoredRoster(roster) {
        try {
          localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
        } catch (e) {}
      }

      function renderActiveRoster() {
        if (!activeRosterContainer) return;
        activeRosterContainer.replaceChildren();

        const roster = getStoredRoster();
        if (activeRosterCountBadge) {
          activeRosterCountBadge.textContent = roster.length + ' Pending';
        }

        if (roster.length === 0) {
          const empty = document.createElement('div');
          empty.style.cssText = 'font-size: 0.85rem; color: var(--accent-emerald); font-weight: 700; padding: 0.25rem 0;';
          empty.textContent = '✓ All students at expected grade level!';
          activeRosterContainer.appendChild(empty);
          return;
        }

        roster.forEach(student => {
          const badge = document.createElement('div');
          badge.style.cssText = 'display: inline-flex; align-items: center; gap: 0.5rem; background: var(--accent-red-light); border: 1.5px solid #FECACA; color: var(--accent-red); padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;';

          const span = document.createElement('span');
          span.textContent = '🔴 ' + student.name + ' • ' + student.gap + ' • Peer: ' + student.buddy;

          const btnDismiss = document.createElement('button');
          btnDismiss.type = 'button';
          btnDismiss.setAttribute('aria-label', 'Dismiss and mark resolved');
          btnDismiss.style.cssText = 'background: var(--accent-red); color: #FFFFFF; border: none; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; cursor: pointer; line-height: 1;';
          btnDismiss.textContent = '✕';
          btnDismiss.onclick = () => {
            badge.remove();
            const currentRoster = getStoredRoster();
            const updated = currentRoster.filter(s => s.id !== student.id);
            saveStoredRoster(updated);
            if (activeRosterCountBadge) {
              activeRosterCountBadge.textContent = updated.length + ' Pending';
            }
            speakVernacular(student.name + " marked resolved.");
          };

          badge.append(span, btnDismiss);
          activeRosterContainer.appendChild(badge);
        });
      }

      function showDiagnosticChecklist() {
        const studentName = (absenteeNameInput.value || 'Student').trim();
        const days = absenteeDaysSelect.value;

        checklistArea.style.display = 'flex';
        checklistArea.replaceChildren();

        const title = document.createElement('strong');
        title.style.cssText = 'color: var(--accent-navy-dark); font-size: 0.95rem;';
        title.textContent = '📋 2-Minute Oral Diagnostic: ' + studentName + ' (' + days + ')';

        const questions = [
          { q: "1. Phoneme Recognition: Ask student to identify 'म' and 'र' from slate.", label: "Identified 'म' and 'र' accurately" },
          { q: "2. Concrete Arithmetic: Oral question: '6 + 2 = ?' (Answer: 8)", label: "Answered 6+2=8 accurately" },
          { q: "3. Word Fluency: Ask student to read 'घर' from chalkboard.", label: "Read 'घर' without hesitation" }
        ];

        const listDiv = document.createElement('div');
        listDiv.style.cssText = 'display: flex; flex-direction: column; gap: 0.4rem;';

        questions.forEach(item => {
          const row = document.createElement('div');
          row.style.cssText = 'background: #FFF; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.6rem;';

          const pQ = document.createElement('p');
          pQ.style.cssText = 'margin: 0 0 0.25rem; font-size: 0.85rem; color: var(--text-secondary);';
          pQ.textContent = item.q;

          const lbl = document.createElement('label');
          lbl.style.cssText = 'display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 700; color: var(--text-primary); cursor: pointer;';
          const chk = document.createElement('input');
          chk.type = 'checkbox';
          chk.style.cssText = 'width: 18px; height: 18px;';
          const sLabel = document.createElement('span');
          sLabel.textContent = item.label;
          lbl.append(chk, sLabel);

          row.append(pQ, lbl);
          listDiv.appendChild(row);
        });

        // Verdict Buttons
        const verdictRow = document.createElement('div');
        verdictRow.style.cssText = 'display: flex; gap: 0.5rem; margin-top: 0.25rem;';

        const btnPass = document.createElement('button');
        btnPass.className = 'btn-primary';
        btnPass.style.cssText = 'min-height: 48px; flex: 1;';
        btnPass.textContent = 'Pass (Grade Ready)';

        const btnNeedsBuddy = document.createElement('button');
        btnNeedsBuddy.className = 'btn-warning';
        btnNeedsBuddy.style.cssText = 'min-height: 48px; flex: 1;';
        btnNeedsBuddy.textContent = 'Needs Peer Buddy';

        verdictRow.append(btnPass, btnNeedsBuddy);

        const outcomeAlert = document.createElement('div');
        outcomeAlert.style.cssText = 'display: none; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.88rem; font-weight: 700;';

        btnPass.onclick = () => {
          outcomeAlert.style.display = 'block';
          outcomeAlert.style.background = 'var(--accent-emerald-light)';
          outcomeAlert.style.border = '1px solid var(--accent-emerald)';
          outcomeAlert.style.color = 'var(--accent-emerald)';
          outcomeAlert.textContent = '✓ ' + studentName + ' is at expected grade level. Continue standard multigrade cycle.';
          speakVernacular(studentName + ' passed oral screening.');
        };

        btnNeedsBuddy.onclick = () => {
          outcomeAlert.style.display = 'block';
          outcomeAlert.style.background = 'var(--accent-saffron-light)';
          outcomeAlert.style.border = '1px solid var(--accent-saffron)';
          outcomeAlert.style.color = 'var(--accent-saffron)';
          outcomeAlert.textContent = '⚠️ Remediation Active: ' + studentName + ' paired with front-row peer buddy (Amit, Grade 3) for slate & pebble drills.';

          // Store in roster
          const roster = getStoredRoster();
          const newStudent = {
            id: Date.now(),
            name: studentName,
            gap: "Identified FLN Gap",
            buddy: "Auto-Assigned Peer",
            time: new Date().toLocaleTimeString()
          };
          roster.unshift(newStudent);
          saveStoredRoster(roster);
          renderActiveRoster();

          speakVernacular(studentName + " assigned peer buddy for foundational catch-up.");
        };

        checklistArea.append(title, listDiv, verdictRow, outcomeAlert);
        speakVernacular("2-minute oral diagnostic ready for " + studentName + ".");
      }

      btnStartDiagnostic.addEventListener('click', showDiagnosticChecklist);
      renderActiveRoster();

      // 5. ZERO-COST CHALKBOARD TLM & NUMBER TRAIN
      const trainPuzzles = [
        { display: "[ 2 ] ===== [ ? ] ===== [ 4 ] ===== [ ? ] ===== [ 6 ]", a1: 3, a2: 5, hint: "Step of 1: 2, 3, 4, 5, 6" },
        { display: "[ 1 ] ===== [ ? ] ===== [ 3 ] ===== [ ? ] ===== [ 5 ]", a1: 2, a2: 4, hint: "Step of 1: 1, 2, 3, 4, 5" },
        { display: "[ 10 ] ===== [ ? ] ===== [ 30 ] ===== [ ? ] ===== [ 50 ]", a1: 20, a2: 40, hint: "Step of 10: 10, 20, 30, 40, 50" }
      ];
      let currentTrainIdx = 0;

      const asciiTrainDisplay = document.getElementById('ascii-train-display');
      const trainInp1 = document.getElementById('train-inp-1');
      const trainInp2 = document.getElementById('train-inp-2');
      const btnVerifyTrain = document.getElementById('btn-verify-train');
      const trainFeedbackBox = document.getElementById('train-feedback-box');
      const btnNextPuzzle = document.getElementById('btn-next-puzzle');

      function renderCurrentTrainPuzzle() {
        const puzzle = trainPuzzles[currentTrainIdx % trainPuzzles.length];
        asciiTrainDisplay.textContent = puzzle.display;
        trainInp1.value = '';
        trainInp2.value = '';
        trainFeedbackBox.style.display = 'none';
      }

      btnVerifyTrain.addEventListener('click', () => {
        const puzzle = trainPuzzles[currentTrainIdx % trainPuzzles.length];
        const v1 = parseInt(trainInp1.value, 10);
        const v2 = parseInt(trainInp2.value, 10);

        trainFeedbackBox.style.display = 'block';
        if (v1 === puzzle.a1 && v2 === puzzle.a2) {
          trainFeedbackBox.style.color = '#A7F3D0';
          trainFeedbackBox.textContent = '🎉 Excellent! Train completed accurately: [ ' + puzzle.display.replace(/\\?/g, (m, offset) => (offset < 15 ? puzzle.a1 : puzzle.a2)) + ' ]';
          speakVernacular("Excellent! Number train completed accurately.");
        } else {
          trainFeedbackBox.style.color = '#FECACA';
          trainFeedbackBox.textContent = '💡 Hint: ' + puzzle.hint + '. Count pebbles on slates!';
          speakVernacular("Try again. Hint: " + puzzle.hint);
        }
      });

      btnNextPuzzle.addEventListener('click', () => {
        currentTrainIdx++;
        renderCurrentTrainPuzzle();
      });

      renderCurrentTrainPuzzle();

      // Zero-Cost Manipulative Switcher
      const zeroCostMaterials = {
        pebbles: {
          name: "🍂 Dry Leaves & Pebbles",
          instruction: "Group 10 pebbles on slates. Draw a chalk circle; place 6 pebbles inside and 2 outside to practice concrete addition (6+2=8)."
        },
        sticks: {
          name: "🥢 Matchsticks & String",
          instruction: "Tie 10 matchsticks with string to form 1 bundle (Ten / दहाई). Place with 4 loose sticks to visualize place value 14 directly."
        },
        rope: {
          name: "🪢 Rope & Chalk",
          instruction: "Tie chalk to string to trace a giant circle on the classroom floor. Have children walk along the perimeter counting aloud."
        },
        boxes: {
          name: "📦 Medicine Boxes",
          instruction: "Use empty cardboard boxes to introduce 3D geometry (Cuboid / घनाभ), count 6 faces and 8 corners with zero recurring cost."
        }
      };

      const tlmMaterialPills = document.getElementById('tlm-material-pills');
      const tlmMaterialContent = document.getElementById('tlm-material-content');

      function initMaterialSwitcher() {
        tlmMaterialPills.replaceChildren();
        Object.entries(zeroCostMaterials).forEach(([key, mat], idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn-secondary';
          btn.style.cssText = 'min-height: 38px; width: auto; font-size: 0.8rem; padding: 0.25rem 0.65rem; border-radius: 9999px;';
          if (idx === 0) btn.style.background = '#E2E8F0';
          btn.textContent = mat.name;
          btn.onclick = () => {
            Array.from(tlmMaterialPills.children).forEach(b => b.style.background = '');
            btn.style.background = '#E2E8F0';
            tlmMaterialContent.textContent = mat.instruction;
            speakVernacular(mat.name + ". " + mat.instruction);
          };
          tlmMaterialPills.appendChild(btn);
        });
        tlmMaterialContent.textContent = zeroCostMaterials.pebbles.instruction;
      }

      initMaterialSwitcher();

      // 6. RESILIENT INTERACTIVE "LIVE TOUR"
      const tourSteps = [
        {
          targetId: 'card-mgml',
          title: '15-Minute Multi-Grade Rotation Engine',
          tip: 'Locks instruction into strict 15-minute cycles. Direct Grade 1 instruction while Grades 2 & 3 perform structured peer tasks.'
        },
        {
          targetId: 'card-bhasha',
          title: 'Language Bridge (Bhasha Setu)',
          tip: 'Select Grade, Subject, and Topic to instantly generate rural vernacular metaphors and immediate classroom micro-scripts.'
        },
        {
          targetId: 'card-absentee',
          title: 'Absenteeism Rapid Catch-Up Triage',
          tip: 'Screen returning students in 2 minutes and assign front-row peer buddies to prevent dropout.'
        },
        {
          targetId: 'card-tlm',
          title: 'Zero-Cost Chalkboard TLM & Games',
          tip: 'Run interactive chalkboard ASCII Number Train games and use zero-cost manipulatives like dry leaves, pebbles, and matchsticks.'
        }
      ];

      let currentStepIndex = 0;

      function cleanupTourHighlight() {
        tourSteps.forEach(step => {
          const el = document.getElementById(step.targetId);
          if (el) {
            el.style.boxShadow = 'none';
            el.style.transition = '';
          }
        });
      }

      function exitTour() {
        cleanupTourHighlight();
        const banner = document.getElementById('tour-floating-banner');
        if (banner) banner.remove();
      }

      function renderTourBanner(step, index) {
        let banner = document.getElementById('tour-floating-banner');
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'tour-floating-banner';
          banner.className = 'tour-banner';
          banner.style.cssText = 'position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 999; background: var(--accent-navy-dark); color: #FFFFFF; border: 2px solid var(--accent-teal); border-radius: 1rem; padding: 1.25rem 1.5rem; box-shadow: 0 20px 45px rgba(0,0,0,0.4); width: 92%; max-width: 640px; display: flex; flex-direction: column; gap: 0.75rem;';
          document.body.appendChild(banner);
        }

        banner.replaceChildren();

        const topRow = document.createElement('div');
        topRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

        const badge = document.createElement('span');
        badge.style.cssText = 'background: var(--accent-saffron); color: #FFFFFF; font-size: 0.78rem; font-weight: 800; padding: 0.2rem 0.65rem; border-radius: 9999px; text-transform: uppercase;';
        badge.textContent = 'Step ' + (index + 1) + ' of 4: ' + step.title;

        const btnClose = document.createElement('button');
        btnClose.setAttribute('aria-label', 'Exit walkthrough');
        btnClose.style.cssText = 'background: rgba(255,255,255,0.15); border: none; color: #FFF; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem; font-weight: bold;';
        btnClose.textContent = '✕';
        btnClose.onclick = exitTour;

        topRow.append(badge, btnClose);

        const tipEl = document.createElement('p');
        tipEl.style.cssText = 'font-size: 0.92rem; color: #E2E8F0; margin: 0; line-height: 1.5;';
        tipEl.textContent = step.tip;

        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-top: 0.25rem;';

        const btnExit = document.createElement('button');
        btnExit.className = 'btn-secondary';
        btnExit.style.cssText = 'min-height: 40px; font-size: 0.85rem; padding: 0.35rem 0.85rem; width: auto;';
        btnExit.textContent = 'Exit';
        btnExit.onclick = exitTour;

        const navBtns = document.createElement('div');
        navBtns.style.cssText = 'display: flex; gap: 0.5rem;';

        if (index > 0) {
          const btnPrev = document.createElement('button');
          btnPrev.className = 'btn-secondary';
          btnPrev.style.cssText = 'min-height: 40px; font-size: 0.85rem; padding: 0.35rem 1rem; width: auto;';
          btnPrev.textContent = 'Prev';
          btnPrev.onclick = () => showTourStep(index - 1);
          navBtns.appendChild(btnPrev);
        }

        const btnNext = document.createElement('button');
        btnNext.className = 'btn-primary';
        btnNext.style.cssText = 'min-height: 40px; font-size: 0.85rem; padding: 0.35rem 1.15rem; width: auto;';
        btnNext.textContent = index === tourSteps.length - 1 ? 'Exit' : 'Next';
        btnNext.onclick = () => {
          if (index === tourSteps.length - 1) {
            exitTour();
          } else {
            showTourStep(index + 1);
          }
        };
        navBtns.appendChild(btnNext);

        btnRow.append(btnExit, navBtns);
        banner.append(topRow, tipEl, btnRow);
      }

      function showTourStep(index) {
        if (index < 0) index = 0;
        if (index >= tourSteps.length) {
          exitTour();
          return;
        }

        // Clean up previous outline box-shadow: none
        cleanupTourHighlight();
        currentStepIndex = index;
        const step = tourSteps[index];
        const targetEl = document.getElementById(step.targetId);

        if (targetEl) {
          targetEl.style.transition = 'box-shadow 0.3s ease';
          targetEl.style.boxShadow = '0 0 0 4px var(--accent-teal), 0 16px 36px rgba(15, 118, 110, 0.25)';
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        renderTourBanner(step, index);
        speakVernacular("Step " + (index + 1) + ". " + step.title + ". " + step.tip);
      }

      const btnStartTour = document.getElementById('btn-start-tour');
      if (btnStartTour) {
        btnStartTour.addEventListener('click', () => showTourStep(0));
      }

      // 7. RESILIENT VOICE ASSISTANT (MICROPHONE + INSTANT FALLBACK PILLS)
      const btnVoiceMic = document.getElementById('btn-voice-mic');
      const voiceQueryInput = document.getElementById('voice-query-input');
      const btnVoiceAsk = document.getElementById('btn-voice-ask');
      const voiceFallbackPills = document.getElementById('voice-fallback-pills');
      const voiceGuidanceAlert = document.getElementById('voice-guidance-alert');

      const fallbackPillTexts = [
        "Grade 2 Math subtraction game",
        "Grade 1 Phonics drill",
        "Grade 3 Descending order ladder"
      ];

      function renderFallbackPills() {
        if (!voiceFallbackPills) return;
        voiceFallbackPills.replaceChildren();

        const label = document.createElement('span');
        label.style.cssText = 'font-size: 0.82rem; font-weight: 700; color: var(--text-muted);';
        label.textContent = 'Suggested Queries:';
        voiceFallbackPills.appendChild(label);

        fallbackPillTexts.forEach(pillText => {
          const pillBtn = document.createElement('button');
          pillBtn.type = 'button';
          pillBtn.className = 'btn-secondary';
          pillBtn.style.cssText = 'min-height: 38px; width: auto; font-size: 0.82rem; font-weight: 700; padding: 0.25rem 0.85rem; border-radius: 9999px;';
          pillBtn.textContent = pillText;
          pillBtn.onclick = () => {
            voiceQueryInput.value = pillText;
            executeVoiceQuery(pillText);
          };
          voiceFallbackPills.appendChild(pillBtn);
        });
      }

      function executeVoiceQuery(query) {
        if (!query) return;
        let guidance = '';
        if (/subtract|घटाव/.test(query)) {
          guidance = "💡 Subtraction Guidance: Use the tree-berry metaphor. '5 berries on the branch, 2 fall down, how many remain in hand?' Have children count remaining pebbles on their slates.";
        } else if (/phonic|वर्ण/.test(query)) {
          guidance = "💡 Phonics Guidance: Practice phoneme 'क' using the crow's call 'काँव-काँव' and 'म' using peacock call. Have children trace the letters in sand or with pebbles.";
        } else if (/order|क्रम/.test(query)) {
          guidance = "💡 Descending Order: Use the rooftop ladder metaphor (stepping down from 5th rung to 4th, 3rd, 2nd, 1st). Have children take steps backward counting down.";
        } else {
          guidance = "💡 Multi-Grade Copilot: Alternate 15 minutes of direct teacher instruction for one grade with independent peer slate & pebble activities for the other grade.";
        }

        if (voiceGuidanceAlert) {
          voiceGuidanceAlert.style.display = 'block';
          voiceGuidanceAlert.replaceChildren();

          const p = document.createElement('p');
          p.style.cssText = 'margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--text-primary); line-height: 1.5;';
          p.textContent = guidance;

          const btnAudio = document.createElement('button');
          btnAudio.type = 'button';
          btnAudio.className = 'btn-secondary';
          btnAudio.style.cssText = 'min-height: 40px; font-size: 0.82rem; padding: 0.3rem 0.85rem; width: auto; margin-top: 0.5rem;';
          btnAudio.textContent = '🔊 Read Aloud';
          btnAudio.onclick = () => speakVernacular(guidance);

          voiceGuidanceAlert.append(p, btnAudio);
          speakVernacular(guidance);
        }
      }

      btnVoiceAsk.addEventListener('click', () => {
        const q = (voiceQueryInput.value || '').trim();
        if (q) executeVoiceQuery(q);
        else renderFallbackPills();
      });

      voiceQueryInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          btnVoiceAsk.click();
        }
      });

      btnVoiceMic.addEventListener('click', () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          renderFallbackPills();
          return;
        }

        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-IN';
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          voiceQueryInput.placeholder = 'Listening to your voice...';
          btnVoiceMic.style.background = 'var(--accent-red)';

          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            voiceQueryInput.value = transcript;
            voiceQueryInput.placeholder = 'Ask copilot: e.g. "Grade 2 Math subtraction game"';
            btnVoiceMic.style.background = '';
            executeVoiceQuery(transcript);
          };

          recognition.onerror = () => {
            voiceQueryInput.placeholder = 'Ask copilot: e.g. "Grade 2 Math subtraction game"';
            btnVoiceMic.style.background = '';
            renderFallbackPills();
          };

          recognition.onend = () => {
            voiceQueryInput.placeholder = 'Ask copilot: e.g. "Grade 2 Math subtraction game"';
            btnVoiceMic.style.background = '';
          };

          recognition.start();
        } catch (err) {
          renderFallbackPills();
        }
      });

      // Default fallback pill rendering on page load
      renderFallbackPills();

      // Service Worker registration
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('Successfully written production-grade single-file index.html!');

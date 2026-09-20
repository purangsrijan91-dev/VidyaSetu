const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://drive.google.com; media-src 'self' blob:; img-src 'self' data:;" />
  <meta name="theme-color" content="#0F172A" />
  <meta name="description" content="VidyaSetu: Offline-first FLN Classroom Copilot for Indian Primary Teachers managing multigrade classrooms." />
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

    /* Top Trust Ribbon */
    .top-trust-bar {
      background-color: var(--accent-navy-dark);
      color: #FFFFFF;
      padding: 0.45rem 1rem;
      font-size: 0.82rem;
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

    /* Header */
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
      gap: 0.4rem;
      margin-top: 0.25rem;
      flex-wrap: wrap;
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
      background-color: var(--accent-teal-light);
      color: var(--accent-teal-dark);
      border: 1px solid var(--accent-teal);
    }

    .badge-navy {
      background-color: var(--accent-navy-light);
      color: var(--accent-navy);
      border: 1px solid var(--accent-navy);
    }

    .badge-neutral {
      background-color: var(--bg-surface-elevated);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .badge-saffron {
      background-color: var(--accent-saffron-light);
      color: var(--accent-saffron);
      border: 1px solid var(--accent-saffron);
    }

    /* Main Container */
    .layout-wrapper {
      max-width: 1240px;
      margin: 0 auto;
      padding: 1.5rem 1rem 3.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* Hero / Status Bar */
    .hero-container {
      background: linear-gradient(135deg, #FFFFFF 0%, var(--accent-navy-light) 100%);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
    }

    .hero-container h2 {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .hero-container p {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 900px;
      line-height: 1.6;
    }

    .hero-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .hero-pill-tag {
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      padding: 0.35rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-secondary);
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    /* Resilient Voice Assistant Bar */
    .voice-bar-container {
      background: var(--bg-surface);
      border: 2px solid var(--accent-teal);
      border-radius: 1.25rem;
      padding: 1.25rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .voice-input-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;
    }

    .btn-mic {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--accent-teal);
      color: #FFFFFF;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.1s ease;
      flex-shrink: 0;
    }

    .btn-mic:hover {
      background: var(--accent-teal-dark);
      transform: scale(1.04);
    }

    .btn-mic.mic-active {
      background: var(--accent-red);
      animation: pulse-ring 1.5s infinite;
    }

    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(185, 28, 28, 0.4); }
      70% { box-shadow: 0 0 0 12px rgba(185, 28, 28, 0); }
      100% { box-shadow: 0 0 0 0 rgba(185, 28, 28, 0); }
    }

    .text-input {
      flex: 1;
      min-width: 240px;
      min-height: 48px;
      padding: 0.6rem 1rem;
      border: 1.5px solid var(--border-strong);
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 0.95rem;
      color: var(--text-primary);
      background-color: var(--bg-surface);
    }

    .text-input:focus {
      border-color: var(--focus-ring);
      outline: none;
    }

    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    @media (min-width: 1024px) {
      .dashboard-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Feature Cards */
    .feature-card {
      background: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.5rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.25rem;
      position: relative;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .feature-card:focus-within {
      border-color: var(--accent-teal);
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.65rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .card-solver-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--accent-teal-dark);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      line-height: 1.3;
      margin-bottom: 0.35rem;
    }

    .card-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    /* Timer Controls & Display */
    .timer-display-box {
      background: var(--accent-navy-dark);
      color: #FFFFFF;
      border-radius: 1rem;
      padding: 1rem;
      text-align: center;
      margin: 0.75rem 0;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.25);
    }

    .timer-readout {
      font-family: var(--font-mono);
      font-size: 2.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      line-height: 1.1;
      color: #38BDF8;
    }

    .timer-subtext {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #94A3B8;
      margin-top: 0.25rem;
    }

    .timer-flash {
      animation: timer-flash-anim 1s 2 ease-in-out;
    }

    @keyframes timer-flash-anim {
      0%, 100% { border-color: var(--border-subtle); background-color: var(--bg-surface); }
      50% { border-color: var(--accent-saffron); background-color: var(--accent-saffron-light); }
    }

    .track-card {
      border: 1.5px solid var(--border-subtle);
      border-radius: 0.75rem;
      padding: 0.85rem;
      margin-bottom: 0.65rem;
      transition: all 0.2s ease;
    }

    .track-active {
      background-color: var(--accent-teal-light);
      border-color: var(--accent-teal);
    }

    .track-inactive {
      background-color: var(--bg-surface-elevated);
      border-color: var(--border-subtle);
      opacity: 0.85;
    }

    /* Common Buttons */
    .btn-primary {
      min-height: 48px;
      padding: 0.6rem 1.25rem;
      background-color: var(--accent-teal);
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.15s ease, transform 0.1s ease;
      text-decoration: none;
      width: 100%;
    }

    .btn-primary:hover {
      background-color: var(--accent-teal-dark);
    }

    .btn-secondary {
      min-height: 48px;
      padding: 0.6rem 1.25rem;
      background-color: var(--bg-surface-elevated);
      color: var(--text-primary);
      font-size: 0.95rem;
      font-weight: 700;
      border: 1.5px solid var(--border-strong);
      border-radius: 0.75rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.15s ease;
      width: 100%;
    }

    .btn-secondary:hover {
      background-color: var(--border-subtle);
    }

    .btn-warning {
      min-height: 48px;
      padding: 0.6rem 1.25rem;
      background-color: var(--accent-saffron);
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
    }

    .btn-warning:hover {
      background-color: #9A3412;
    }

    /* Select Dropdowns */
    .custom-select {
      width: 100%;
      min-height: 48px;
      padding: 0.6rem 0.85rem;
      border: 1.5px solid var(--border-strong);
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--text-primary);
      background-color: var(--bg-surface);
    }

    .custom-select:focus {
      border-color: var(--focus-ring);
      outline: none;
    }

    /* Chalkboard TLM Box */
    .chalkboard-box {
      background: #064E3B;
      color: #ECFDF5;
      border: 4px solid #78350F;
      border-radius: 0.75rem;
      padding: 1rem;
      font-family: var(--font-mono);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
    }

    /* Video Section with Pure CSS Layout */
    .video-section-box {
      background: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
    }

    .video-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      overflow: hidden;
      border-radius: 1rem;
      background-color: #0F172A;
    }

    .video-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .video-overlay-blocker {
      position: absolute;
      top: 0;
      right: 0;
      width: 68px; height: 68px; z-index: 30;
      background: transparent;
      cursor: default;
    }

    .video-offline-msg {
      display: none;
      position: absolute;
      inset: 0;
      background: #0F172A;
      color: #F8FAFC;
      padding: 2rem;
      text-align: center;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.75rem;
      z-index: 20;
    }

    /* Tour Banner */
    .tour-banner {
      position: fixed;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      background: var(--accent-navy-dark);
      color: #FFFFFF;
      border: 2px solid var(--accent-teal);
      border-radius: 1rem;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 20px 45px rgba(0,0,0,0.4);
      width: 92%;
      max-width: 640px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* Footer */
    .site-footer {
      background-color: var(--bg-surface);
      border-top: 1.5px solid var(--border-subtle);
      padding: 1.5rem;
      margin-top: 2rem;
      font-size: 0.85rem;
      color: var(--text-muted);
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

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  </style>
</head>
<body>

  <!-- Top Trust Ribbon -->
  <div class="top-trust-bar" role="complementary" aria-label="Alignment Information">
    <span class="pill">NIPUN Bharat Aligned</span>
    <span>FLN Mission • Multigrade &amp; Multilingual Classroom Architecture • 100% Offline Functional</span>
  </div>

  <!-- Header -->
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

    <!-- Hero / Status Overview Section -->
    <section class="hero-container" aria-labelledby="hero-title">
      <h2 id="hero-title">Teaching Multigrade Classrooms with Practical Ease</h2>
      <p>
        Engineered specifically for single-teacher rural primary schools facing multigrade combinations, dialect barriers, and post-absence learning loss. High-contrast, zero external CDNs, and fully offline-functional.
      </p>
      <div class="hero-pills">
        <span class="hero-pill-tag">✓ 100% Offline Resilience</span>
        <span class="hero-pill-tag">✓ Hardware Clock Delta Sync</span>
        <span class="hero-pill-tag">✓ Safe DOM Architecture</span>
        <span class="hero-pill-tag">✓ WCAG 2.2 AAA Compliant</span>
      </div>
    </section>

    <!-- Resilient Voice Assistant with Microphone + Instant Fallback -->
    <section class="voice-bar-container" aria-label="Voice Classroom Copilot">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <strong style="font-size: 0.95rem; color: var(--accent-navy-dark); display: flex; align-items: center; gap: 0.5rem;">
          <span aria-hidden="true">🎙️</span>
          <span>Voice &amp; Keyword Classroom Copilot:</span>
        </strong>
        <span id="voice-status-label" style="font-size: 0.8rem; color: var(--text-muted);">Speak or click quick queries for immediate offline guidance</span>
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
            <span id="badge-current-phase" class="header-badge badge-saffron">Phase A: Grade 1 Focus</span>
          </div>
          <h2 id="heading-mgml" class="card-title">15-Minute Multi-Grade Rotation Engine</h2>
          <p class="card-desc">
            Orchestrate concurrent teaching: direct instruction with Grade 1 while Grades 2 &amp; 3 perform collaborative slate and manipulative tasks.
          </p>

          <!-- Explicit Phase Banner -->
          <div id="phase-status-banner" style="background: var(--accent-navy-light); border-left: 4px solid var(--accent-navy); padding: 0.65rem 0.85rem; border-radius: 0.4rem; margin: 0.75rem 0 0.5rem;">
            <div style="font-size: 0.78rem; font-weight: 800; color: var(--accent-navy); text-transform: uppercase;">
              Current Classroom Configuration:
            </div>
            <div id="phase-status-text" style="font-size: 0.92rem; font-weight: 700; color: var(--accent-navy-dark); margin-top: 0.15rem;">
              Phase A: Teacher Instruction with Grade 1 • Peer Practice with Grades 2 &amp; 3
            </div>
          </div>

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
          <div id="timer-display-container" class="timer-display-box" role="timer" aria-live="off" aria-label="15-minute countdown timer">
            <div id="timer-display" class="timer-readout">15:00</div>
            <div class="timer-subtext">Authoritative 15-Min MGML Hardware Clock</div>
          </div>
        </div>

        <div>
          <!-- Timer Action Controls -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button id="btn-toggle-timer" class="btn-primary" style="flex: 2; min-width: 160px;">
              <span id="timer-btn-icon">⏱️</span>
              <span id="timer-btn-text">Start 15-Min Cycle</span>
            </button>
            <button id="btn-switch-focus" class="btn-secondary" style="flex: 1; min-width: 130px;">
              🔄 Switch Focus
            </button>
            <button id="btn-reset-timer" class="btn-secondary" style="flex: 1; min-width: 90px;" aria-label="Reset 15-minute timer">
              Reset
            </button>
          </div>

          <div style="margin-top: 0.5rem; text-align: center;">
            <button id="btn-test-bell" class="btn-secondary" style="min-height: 40px; font-size: 0.8rem; padding: 0.35rem 0.75rem; width: auto;">
              🔔 Test Acoustic Bell
            </button>
          </div>
        </div>
      </article>

      <!-- CARD 2: Language Bridge (Bhasha Setu) -->
      <article id="card-bhasha" class="feature-card" aria-labelledby="heading-bhasha">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 2 • Vernacular Bridge</span>
            <span class="header-badge badge-teal">NIPUN Bhasha</span>
          </div>
          <h2 id="heading-bhasha" class="card-title">Language Bridge (Bhasha Setu)</h2>
          <p class="card-desc">
            Bridge textbook terminology with child-grounded vernacular metaphors and actionable 60-second pedagogical scripts.
          </p>

          <!-- Cascading Selectors: Grade -> Subject -> Topic -->
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin: 1rem 0;">
            <div>
              <label for="select-grade" style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 0.2rem;">
                Select Grade (कक्षा चुनें):
              </label>
              <select id="select-grade" class="custom-select"></select>
            </div>

            <div>
              <label for="select-subject" style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 0.2rem;">
                Select Subject (विषय चुनें):
              </label>
              <select id="select-subject" class="custom-select"></select>
            </div>

            <div>
              <label for="select-topic" style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 0.2rem;">
                Select Concept Topic (अवधारणा चुनें):
              </label>
              <select id="select-topic" class="custom-select"></select>
            </div>
          </div>

          <!-- Safe 3-Tier Output Area -->
          <div id="bhasha-output-area" style="margin-top: 0.75rem;"></div>
        </div>

        <div style="margin-top: 0.5rem;">
          <button id="btn-explain-concept" class="btn-primary">
            💡 Explain in Local Context
          </button>
        </div>
      </article>

      <!-- CARD 3: Absenteeism Rapid Catch-Up Triage -->
      <article id="card-absentee" class="feature-card" aria-labelledby="heading-absentee">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 3 • Post-Absence Remediation</span>
            <span id="active-roster-count-badge" class="header-badge badge-saffron">0 Pending</span>
          </div>
          <h2 id="heading-absentee" class="card-title">Absenteeism Rapid Catch-Up Triage</h2>
          <p class="card-desc">
            Conduct 2-minute oral diagnostic screenings for returning students and immediately assign front-row peer buddies.
          </p>

          <!-- Input Fields for Returning Student -->
          <div style="display: flex; gap: 0.5rem; margin: 0.85rem 0; flex-wrap: wrap;">
            <input type="text" id="absentee-name-input" class="text-input" placeholder="Returning student name..." value="Rohan Kumar" aria-label="Returning student name" style="flex: 2; min-width: 160px;" />
            <select id="absentee-days-select" class="custom-select" style="flex: 1; min-width: 130px;" aria-label="Days absent">
              <option value="Absent 3-5 days">Absent 3-5 days</option>
              <option value="Absent 1-2 weeks">Absent 1-2 weeks</option>
              <option value="Post-harvest return (3+ weeks)">Post-harvest return (3+ weeks)</option>
            </select>
          </div>

          <!-- Inline 3-Step Screening Workflow -->
          <div id="absentee-checklist-area" style="display: none; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 0.85rem; margin: 0.75rem 0; flex-direction: column; gap: 0.5rem;"></div>

          <!-- Persistent Roster Container -->
          <div style="margin-top: 0.75rem;">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.4rem;">
              Active Remediation Peer Buddies (Saved to localStorage):
            </div>
            <div id="active-roster-container" style="display: flex; flex-direction: column; gap: 0.4rem;"></div>
          </div>
        </div>

        <div style="margin-top: 0.5rem;">
          <button id="btn-start-diagnostic" class="btn-primary">
            📋 Start 2-Min Oral Diagnostic
          </button>
        </div>
      </article>

      <!-- CARD 4: Zero-Cost Chalkboard TLM & Games -->
      <article id="card-tlm" class="feature-card" aria-labelledby="heading-tlm">
        <div>
          <div class="card-meta">
            <span class="card-solver-tag">Core Solver 4 • Zero-Cost TLM</span>
            <span class="header-badge badge-teal">Chalkboard Games</span>
          </div>
          <h2 id="heading-tlm" class="card-title">Zero-Cost Chalkboard TLM &amp; Games</h2>
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

    <!-- Video Section with Google Drive Pop-Out Overlay & Offline Graceful Fallback -->
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

      <!-- Pure CSS Responsive 16:9 Video Container with Best-Effort Overlay -->
      <div class="video-container">
        <iframe 
          id="field-video-frame"
          class="video-iframe"
          src="https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview" 
          allow="autoplay; encrypted-media" 
          title="Classroom Complexity in Indian Primary Schools">
        </iframe>
        <!-- UI Convenience Overlay to reduce accidental navigation to external Drive -->
        <div class="video-overlay-blocker" title="External pop-out disabled"></div>
        <!-- Offline Fallback Notice -->
        <div id="video-offline-notice" class="video-offline-msg">
          <p style="font-size: 1.1rem; font-weight: 800;">📶 External Video Resource Offline</p>
          <p style="font-size: 0.88rem; color: #CBD5E1; max-width: 500px;">
            Field documentation video requires an internet connection. All core pedagogical tools (MGML Timer, Bhasha Setu, Absentee Triage, Chalkboard TLM) remain 100% operational offline.
          </p>
        </div>
      </div>
    </section>

  </div>

  <!-- Site Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
      <div>
        <strong>VidyaSetu (विद्यासेतु) • FLN Classroom Copilot</strong>
        <div style="font-size: 0.78rem; margin-top: 0.2rem;">
          Production-grade offline-first architecture for Indian primary education. Zero cloud dependency.
        </div>
      </div>
      <div style="font-size: 0.8rem; font-weight: 600;">
        <span>Offline Cache: Active</span> • <span>WCAG 2.2 AAA</span>
      </div>
    </div>
  </footer>

  <!-- Screen Reader Live Announcements Region -->
  <div id="sr-live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {

      // 1. EXACT CURRICULUM DATA SPECIFICATION
      const CURRICULUM_DATA = {
        "Grade 1": {
          "Hindi (भाषा)": [
            {
              id: "g1_h_1",
              name: "वर्ण पहचान ('क', 'म', 'न')",
              formal: "वर्णमाला के प्राथमिक व्यंजनों का शुद्ध उच्चारण एवं पहचान।",
              rural: "कौवे की 'काँव-काँव' का पहला बोल 'क', मोर की म्याऊं का 'म'।",
              action: "बच्चों से हवा में और स्लेट पर कंकड़ रखकर 'क' और 'म' की आकृति बनवाएं।"
            },
            {
              id: "g1_h_2",
              name: "दो अक्षर वाले सरल शब्द ('घर', 'जल')",
              formal: "अमात्रिक दो अक्षरों को जोड़कर शब्द पठन एवं लेखन।",
              rural: "नल से टपकता 'जल', रहने का ठिकाना 'घर'—दो आवाजों को जोड़ना।",
              action: "श्यामपट्ट पर 'घ' और 'र' अलग लिखकर ताली बजाकर जुड़वाएं।"
            }
          ],
          "Math (गणित)": [
            {
              id: "g1_m_1",
              name: "1 से 9 तक गिनती (Counting 1-9)",
              formal: "इकाई संख्याओं की गणना एवं मात्रात्मक समझ।",
              rural: "हाथ की उंगलियां और आँगन में रखे 9 सूखे कंकड़।",
              action: "बच्चे घेरे में बैठकर 5 कंकड़ उठाकर ताली बजाएं।"
            },
            {
              id: "g1_m_2",
              name: "मूर्त वस्तुओं से जोड़ (Concrete Addition)",
              formal: "दो प्राथमिक समूहों का संयोजन एवं कुल योग।",
              rural: "पेड़ के नीचे 3 पत्ते थे, हवा से 2 और गिरे।",
              action: "स्लेट पर दो समूह बनाकर कंकड़ मिलाकर गिनवाएं।"
            }
          ]
        },
        "Grade 2": {
          "Hindi (भाषा)": [
            {
              id: "g2_h_1",
              name: "मात्रा ज्ञान (आ, इ, ई)",
              formal: "स्वरों के मात्रिक रूपों का व्यंजनों के साथ संयोजन।",
              rural: "काम (आ की डंडी = हाथ की छड़ी), दिन (इ = आगे की टोपी)।",
              action: "स्लेट पर अंतर दिखाएं: कल -> काल।"
            }
          ],
          "Math (गणित)": [
            {
              id: "g2_m_1",
              name: "घटाव (Subtraction - Take Away)",
              formal: "किसी राशि में से निश्चित संख्या निकालना।",
              rural: "पेड़ से बेर टूटना या हाट में 5 रुपयों में से 2 की जलेबी खाना।",
              action: "5 कंकड़ों में से 2 साथी को दिलवाकर शेष गिनवाएं।"
            },
            {
              id: "g2_m_2",
              name: "स्थानीय मान (Place Value - इकाई/दहाई)",
              formal: "दहाई एवं इकाई के स्थानों का स्थानिक मान।",
              rural: "10 माचिस की तीलियों का 1 बंधा बंडल (दहाई) और खुली तीलियाँ (इकाई)।",
              action: "13 संख्या के लिए 1 बंडल और 3 खुली तीलियाँ स्लेट पर रखवाएं।"
            }
          ]
        },
        "Grade 3": {
          "Hindi (भाषा)": [
            {
              id: "g3_h_1",
              name: "संयुक्त वर्ण (Conjuncts)",
              formal: "दो व्यंजनों के परस्पर मेल से बने अर्ध-व्यंजन।",
              rural: "पक्का, रस्सी, बच्चा—जैसे दो दोस्त हाथ पकड़कर खड़े हों।",
              action: "दो बच्चों को हाथ पकड़वाकर संयुक्त वर्ण का प्रदर्शन कराएं।"
            }
          ],
          "Math (गणित)": [
            {
              id: "g3_m_1",
              name: "अवरोही क्रम (Descending Order)",
              formal: "संख्याओं को बड़े से छोटे मान के क्रम में व्यवस्थित करना।",
              rural: "छत की सीढ़ी से जमीन की ओर नीचे उतरना (5वीं -> 4थी -> 3री)।",
              action: "सीढ़ियों पर बच्चों को बड़े अंक से नीचे कदम रखने को कहें।"
            }
          ],
          "EVS (हमारा परिवेश)": [
            {
              id: "g3_e_1",
              name: "हमारे सहायक (Community Helpers)",
              formal: "ग्रामीण समाज में श्रम विभाजन और व्यावसायिक भूमिकाएं।",
              rural: "कुम्हार (मिट्टी के बर्तन), लोहार (खेती के औजार), दर्जी।",
              action: "गाँव के कारीगरों का मूक अभिनय (Mime) कराएं।"
            }
          ]
        }
      };

      // 2. AUTHORITATIVE APPLICATION STATE
      const appState = {
        phase: 'A', // 'A' (Grade 1 Direct, Grades 2-3 Peer) or 'B' (Grades 2-3 Direct, Grade 1 Independent)
        timer: {
          running: false,
          remainingSecs: 900,
          targetEpoch: 0,
          intervalId: null,
          isTransitioning: false
        },
        curriculum: {
          selectedClass: 'Grade 1',
          selectedSubject: 'Hindi (भाषा)',
          selectedTopic: null
        },
        tour: {
          active: false,
          currentStepIndex: 0
        },
        roster: [],
        voice: {
          isListening: false,
          supported: false,
          query: ''
        }
      };

      // Explicit timer state alias for specification: state.targetEpoch = Date.now() + (remainingSecs * 1000)
      const state = appState.timer;

      // DOM Elements
      const cardMgml = document.getElementById('card-mgml');
      const badgeCurrentPhase = document.getElementById('badge-current-phase');
      const phaseStatusText = document.getElementById('phase-status-text');
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

      function announceSpeech(text) {
        if (srAnnouncer) {
          srAnnouncer.textContent = text;
        }
        if ('speechSynthesis' in window) {
          try {
            window.speechSynthesis.cancel();
            const cleanText = text.replace(/(\\d+)\\s*[-–—]\\s*(\\d+)/g, '$1 to $2');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
          } catch (e) {}
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

      function updatePhaseUI() {
        if (appState.phase === 'A') {
          badgeCurrentPhase.className = 'header-badge badge-saffron';
          badgeCurrentPhase.textContent = 'Phase A: Grade 1 Focus';
          phaseStatusText.textContent = 'Phase A: Teacher Instruction with Grade 1 • Peer Practice with Grades 2 & 3';

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
        } else {
          badgeCurrentPhase.className = 'header-badge badge-teal';
          badgeCurrentPhase.textContent = 'Phase B: Grades 2-3 Focus';
          phaseStatusText.textContent = 'Phase B: Teacher Instruction with Grades 2 & 3 • Independent Practice with Grade 1';

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
        }
      }

      function tickTimer() {
        if (!state.running) return;

        const remainingMillis = Math.max(0, state.targetEpoch - Date.now());
        state.remainingSecs = Math.ceil(remainingMillis / 1000);
        updateTimerDisplay();

        if (state.remainingSecs <= 0 && !state.isTransitioning) {
          state.isTransitioning = true;
          handleTimerCycleExpiration();
        }
      }

      function handleTimerCycleExpiration() {
        clearInterval(state.intervalId);
        state.remainingSecs = 900;
        
        // 1. Toggle phase state: Grade 1 <-> Grades 2/3
        appState.phase = appState.phase === 'A' ? 'B' : 'A';
        updatePhaseUI();

        // 2. Visual flash on timer card
        if (cardMgml) {
          cardMgml.classList.add('timer-flash');
          setTimeout(() => cardMgml.classList.remove('timer-flash'), 2000);
        }

        // 3. Play chime
        playAcousticBell();

        // 4. Announce new phase
        const announcement = appState.phase === 'A'
          ? "Phase A started. Teacher direct instruction with Grade 1; Grades 2 and 3 on collaborative peer tasks."
          : "Phase B started. Teacher direct instruction with Grades 2 and 3; Grade 1 on independent peer practice.";
        announceSpeech(announcement);

        // 5. Automatically reset and start next 15-minute cycle
        const remainingSecs = 900;
        state.remainingSecs = remainingSecs;
        state.targetEpoch = Date.now() + (remainingSecs * 1000);
        state.running = true;
        state.isTransitioning = false;
        state.intervalId = setInterval(tickTimer, 250);
        updateTimerDisplay();

        timerBtnIcon.textContent = '⏸️';
        timerBtnText.textContent = 'Pause 15-Min Cycle';
        btnToggleTimer.className = 'btn-warning';
      }

      function toggleTimer() {
        if (!state.running) {
          state.running = true;
          state.isTransitioning = false;
          const remainingSecs = state.remainingSecs > 0 ? state.remainingSecs : 900;
          state.remainingSecs = remainingSecs;
          state.targetEpoch = Date.now() + (remainingSecs * 1000);
          
          timerBtnIcon.textContent = '⏸️';
          timerBtnText.textContent = 'Pause 15-Min Cycle';
          btnToggleTimer.className = 'btn-warning';

          // Speech announcement prior to start
          window.speechSynthesis.cancel();
          announceSpeech("15-minute multi-grade cycle started. Teacher direct instruction with Grade 1; Grades 2 and 3 on collaborative peer tasks.");
          state.intervalId = setInterval(tickTimer, 250);
        } else {
          state.running = false;
          clearInterval(state.intervalId);
          const remainingMillis = Math.max(0, state.targetEpoch - Date.now());
          state.remainingSecs = Math.max(1, Math.ceil(remainingMillis / 1000));
          
          timerBtnIcon.textContent = '▶️';
          timerBtnText.textContent = 'Resume 15-Min Cycle';
          btnToggleTimer.className = 'btn-primary';
          updateTimerDisplay();
        }
      }

      function manualSwitchFocus() {
        appState.phase = appState.phase === 'A' ? 'B' : 'A';
        updatePhaseUI();

        if (cardMgml) {
          cardMgml.classList.add('timer-flash');
          setTimeout(() => cardMgml.classList.remove('timer-flash'), 1000);
        }

        playAcousticBell();
        const msg = appState.phase === 'A'
          ? "Switched to Phase A: Grade 1 focus."
          : "Switched to Phase B: Grades 2 and 3 focus.";
        announceSpeech(msg);
      }

      function resetTimer() {
        clearInterval(state.intervalId);
        state.running = false;
        state.isTransitioning = false;
        state.remainingSecs = 900;
        updateTimerDisplay();
        timerBtnIcon.textContent = '⏱️';
        timerBtnText.textContent = 'Start 15-Min Cycle';
        btnToggleTimer.className = 'btn-primary';
      }

      btnToggleTimer.addEventListener('click', toggleTimer);
      btnSwitchFocus.addEventListener('click', manualSwitchFocus);
      btnResetTimer.addEventListener('click', resetTimer);
      btnTestBell.addEventListener('click', () => {
        playAcousticBell();
        announceSpeech("Acoustic bell chime tested.");
      });

      updatePhaseUI();
      updateTimerDisplay();

      // 3. BHASHA SETU CASCADING SELECTOR
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
        appState.curriculum.selectedClass = selectGrade.value;
        populateSubjects();
      }

      function populateSubjects() {
        const selectedClass = selectGrade.value;
        appState.curriculum.selectedClass = selectedClass;
        selectSubject.replaceChildren();
        if (CURRICULUM_DATA[selectedClass]) {
          Object.keys(CURRICULUM_DATA[selectedClass]).forEach(subj => {
            const opt = document.createElement('option');
            opt.value = subj;
            opt.textContent = subj;
            selectSubject.appendChild(opt);
          });
        }
        appState.curriculum.selectedSubject = selectSubject.value;
        populateTopics();
      }

      function populateTopics() {
        const selectedClass = selectGrade.value;
        const selectedSubject = selectSubject.value;
        appState.curriculum.selectedSubject = selectedSubject;
        selectTopic.replaceChildren();
        if (CURRICULUM_DATA[selectedClass] && CURRICULUM_DATA[selectedClass][selectedSubject]) {
          CURRICULUM_DATA[selectedClass][selectedSubject].forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name;
            selectTopic.appendChild(opt);
          });
        }
        updateSelectedTopicObject();
        renderConceptCard();
      }

      function updateSelectedTopicObject() {
        const selectedClass = selectGrade.value;
        const selectedSubject = selectSubject.value;
        const topicId = selectTopic.value;
        if (CURRICULUM_DATA[selectedClass] && CURRICULUM_DATA[selectedClass][selectedSubject]) {
          const found = CURRICULUM_DATA[selectedClass][selectedSubject].find(t => t.id === topicId);
          appState.curriculum.selectedTopic = found || CURRICULUM_DATA[selectedClass][selectedSubject][0] || null;
        } else {
          appState.curriculum.selectedTopic = null;
        }
      }

      function renderConceptCard() {
        const concept = appState.curriculum.selectedTopic;
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

        // Tier 2: Rural Metaphor (Visually Highlighted)
        const tier2 = document.createElement('div');
        tier2.style.cssText = 'background: #FFF7ED; border-left: 4px solid var(--accent-saffron); padding: 0.65rem 0.85rem; border-radius: 0.4rem; border: 1px solid #FED7AA;';
        const t2Label = document.createElement('div');
        t2Label.style.cssText = 'font-size: 0.75rem; font-weight: 800; color: var(--accent-saffron); text-transform: uppercase;';
        t2Label.textContent = '🏡 Rural Metaphor (घरेलू सादृश्य):';
        const t2Text = document.createElement('p');
        t2Text.style.cssText = 'font-size: 0.95rem; color: #9A3412; font-weight: 700; margin-top: 0.15rem;';
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

        // Audio trigger
        const btnAudio = document.createElement('button');
        btnAudio.type = 'button';
        btnAudio.className = 'btn-secondary';
        btnAudio.style.cssText = 'min-height: 44px; width: auto; align-self: flex-start; padding: 0.35rem 1rem; font-size: 0.85rem;';
        btnAudio.textContent = '🔊 Read Aloud Metaphor & Action';
        btnAudio.onclick = () => {
          announceSpeech(concept.name + '. Rural Metaphor: ' + concept.rural + '. Classroom Action: ' + concept.action);
        };

        card.append(tier1, tier2, tier3, btnAudio);
        bhashaOutputArea.appendChild(card);
      }

      selectGrade.addEventListener('change', populateSubjects);
      selectSubject.addEventListener('change', populateTopics);
      selectTopic.addEventListener('change', () => {
        updateSelectedTopicObject();
        renderConceptCard();
      });

      btnExplainConcept.addEventListener('click', () => {
        updateSelectedTopicObject();
        renderConceptCard();
        if (appState.curriculum.selectedTopic) {
          announceSpeech(appState.curriculum.selectedTopic.name + '. ' + appState.curriculum.selectedTopic.rural);
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
            if (Array.isArray(parsed)) {
              return parsed.filter(item => item && typeof item === 'object' && item.name);
            }
          }
        } catch (e) {
          console.warn('[VidyaSetu] Corrupt roster data in localStorage, recovering gracefully.', e);
        }
        return [
          { id: Date.now() - 3600000, name: "Rohan Kumar", gap: "Identified FLN Gap", buddy: "Auto-Assigned Peer", time: "10:15 AM" }
        ];
      }

      function saveStoredRoster(roster) {
        try {
          localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
        } catch (e) {
          console.warn('[VidyaSetu] Failed to save roster to localStorage.', e);
        }
      }

      function renderActiveRoster() {
        if (!activeRosterContainer) return;
        activeRosterContainer.replaceChildren();

        const roster = getStoredRoster();
        appState.roster = roster;

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
          badge.style.cssText = 'display: inline-flex; align-items: center; justify-content: space-between; gap: 0.5rem; background: var(--accent-red-light); border: 1.5px solid #FECACA; color: var(--accent-red); padding: 0.4rem 0.75rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;';

          const span = document.createElement('span');
          span.textContent = '🔴 ' + student.name + ' • ' + (student.gap || 'FLN Catch-Up') + ' • Peer: ' + (student.buddy || 'Front Row');

          const btnDismiss = document.createElement('button');
          btnDismiss.type = 'button';
          btnDismiss.setAttribute('aria-label', 'Dismiss ' + student.name + ' and mark resolved');
          btnDismiss.style.cssText = 'background: var(--accent-red); color: #FFFFFF; border: none; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; cursor: pointer; line-height: 1; flex-shrink: 0;';
          btnDismiss.textContent = '✕';
          btnDismiss.onclick = () => {
            badge.remove();
            const currentRoster = getStoredRoster();
            const updated = currentRoster.filter(s => s.id !== student.id);
            saveStoredRoster(updated);
            appState.roster = updated;
            if (activeRosterCountBadge) {
              activeRosterCountBadge.textContent = updated.length + ' Pending';
            }
            announceSpeech(student.name + " marked resolved.");
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
          announceSpeech(studentName + ' passed oral screening.');
        };

        btnNeedsBuddy.onclick = () => {
          outcomeAlert.style.display = 'block';
          outcomeAlert.style.background = 'var(--accent-saffron-light)';
          outcomeAlert.style.border = '1px solid var(--accent-saffron)';
          outcomeAlert.style.color = 'var(--accent-saffron)';
          outcomeAlert.textContent = '⚠️ Remediation Active: ' + studentName + ' paired with front-row peer buddy for slate & pebble drills.';

          // Store in roster as specified: { id, name, gap, buddy, time }
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

          announceSpeech(studentName + " assigned peer buddy for foundational catch-up.");
        };

        checklistArea.append(title, listDiv, verdictRow, outcomeAlert);
        announceSpeech("2-minute oral diagnostic ready for " + studentName + ".");
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
          announceSpeech("Excellent! Number train completed accurately.");
        } else {
          trainFeedbackBox.style.color = '#FECACA';
          trainFeedbackBox.textContent = '💡 Hint: ' + puzzle.hint + '. Count pebbles on slates!';
          announceSpeech("Try again. Hint: " + puzzle.hint);
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
            announceSpeech(mat.name + ". " + mat.instruction);
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
        appState.tour.active = false;
        const banner = document.getElementById('tour-floating-banner');
        if (banner) banner.remove();
      }

      function renderTourBanner(step, index) {
        let banner = document.getElementById('tour-floating-banner');
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'tour-floating-banner';
          banner.className = 'tour-banner';
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

        cleanupTourHighlight();
        currentStepIndex = index;
        appState.tour.currentStepIndex = index;
        appState.tour.active = true;

        const step = tourSteps[index];
        const targetEl = document.getElementById(step.targetId);

        if (targetEl) {
          targetEl.style.transition = 'box-shadow 0.3s ease';
          targetEl.style.boxShadow = '0 0 0 4px var(--accent-teal), 0 16px 36px rgba(15, 118, 110, 0.25)';
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        renderTourBanner(step, index);
        announceSpeech("Step " + (index + 1) + ". " + step.title + ". " + step.tip);
      }

      const btnStartTour = document.getElementById('btn-start-tour');
      if (btnStartTour) {
        btnStartTour.addEventListener('click', () => showTourStep(0));
      }

      // 7. RESILIENT VOICE ASSISTANT (MICROPHONE + INSTANT KEYWORD FALLBACK)
      const btnVoiceMic = document.getElementById('btn-voice-mic');
      const voiceQueryInput = document.getElementById('voice-query-input');
      const btnVoiceAsk = document.getElementById('btn-voice-ask');
      const voiceFallbackPills = document.getElementById('voice-fallback-pills');
      const voiceGuidanceAlert = document.getElementById('voice-guidance-alert');
      const voiceStatusLabel = document.getElementById('voice-status-label');

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
        appState.voice.query = query;
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
          btnAudio.onclick = () => announceSpeech(guidance);

          voiceGuidanceAlert.append(p, btnAudio);
          announceSpeech(guidance);
        }
      }

      function initVoiceAssistant() {
        renderFallbackPills();

        btnVoiceAsk.addEventListener('click', () => {
          executeVoiceQuery(voiceQueryInput.value);
        });

        voiceQueryInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            executeVoiceQuery(voiceQueryInput.value);
          }
        });

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          appState.voice.supported = false;
          btnVoiceMic.title = "Speech recognition unavailable. Use suggested queries below.";
          btnVoiceMic.addEventListener('click', () => {
            renderFallbackPills();
            if (voiceStatusLabel) {
              voiceStatusLabel.textContent = "Speech recognition unsupported in this browser. Please use query pills.";
            }
          });
          return;
        }

        appState.voice.supported = true;
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'hi-IN';

          recognition.onstart = () => {
            appState.voice.isListening = true;
            btnVoiceMic.classList.add('mic-active');
            btnVoiceMic.textContent = '🔴';
            if (voiceStatusLabel) {
              voiceStatusLabel.textContent = "Listening... Speak your classroom query now.";
            }
          };

          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            voiceQueryInput.value = transcript;
            executeVoiceQuery(transcript);
          };

          recognition.onerror = (event) => {
            appState.voice.isListening = false;
            btnVoiceMic.classList.remove('mic-active');
            btnVoiceMic.textContent = '🎤';
            if (voiceStatusLabel) {
              voiceStatusLabel.textContent = "Speech recognition failed or permission denied. Select a fallback option.";
            }
            renderFallbackPills();
          };

          recognition.onend = () => {
            appState.voice.isListening = false;
            btnVoiceMic.classList.remove('mic-active');
            btnVoiceMic.textContent = '🎤';
            if (voiceStatusLabel) {
              voiceStatusLabel.textContent = "Speak or click quick queries for immediate offline guidance";
            }
          };

          btnVoiceMic.addEventListener('click', () => {
            if (appState.voice.isListening) {
              try { recognition.stop(); } catch (err) {}
            } else {
              try {
                recognition.start();
              } catch (err) {
                renderFallbackPills();
              }
            }
          });
        } catch (e) {
          appState.voice.supported = false;
          renderFallbackPills();
        }
      }

      initVoiceAssistant();

      // 8. EXTERNAL VIDEO OFFLINE GRACEFUL RECOVERY
      const fieldVideoFrame = document.getElementById('field-video-frame');
      const videoOfflineNotice = document.getElementById('video-offline-notice');

      function checkVideoConnectivity() {
        if (!navigator.onLine && videoOfflineNotice) {
          videoOfflineNotice.style.display = 'flex';
        } else if (videoOfflineNotice) {
          videoOfflineNotice.style.display = 'none';
        }
      }

      window.addEventListener('online', checkVideoConnectivity);
      window.addEventListener('offline', checkVideoConnectivity);
      checkVideoConnectivity();

      if (fieldVideoFrame) {
        fieldVideoFrame.addEventListener('error', () => {
          if (videoOfflineNotice) videoOfflineNotice.style.display = 'flex';
        });
      }

    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), html.trim() + '\n', 'utf8');
console.log('Successfully written refined index.html!');

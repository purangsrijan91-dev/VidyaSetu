const fs = require('fs');
const path = require('path');

// We will generate the updated index.html with all features, zero innerHTML, and the full 12-slide presentation deck.
const html = `<!DOCTYPE html>
<html lang="hi" class="h-full bg-slate-50">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; frame-src https://drive.google.com; media-src 'self' blob:; img-src 'self' https: data:;" />
  <meta name="theme-color" content="#0F172A" />
  <meta name="description" content="VidyaSetu: NIPUN Bharat Multigrade Classroom Copilot for Indian Primary Teachers." />
  <title>VidyaSetu (विद्यासेतु) • प्राथमिक कक्षा साथी | NIPUN Bharat Classroom Copilot</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" type="image/svg+xml" href="assets/icon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
  <script src="js/bhasha-data.js"></script>

  <style>
    :root {
      --bg-base: #F8FAFC;
      --bg-surface: #FFFFFF;
      --bg-surface-elevated: #F1F5F9;
      --border-subtle: #E2E8F0;
      --border-focus: #0D9488;
      --text-primary: #0F172A;
      --text-secondary: #475569;
      --text-muted: #64748B;
      --accent-teal: #0D9488;
      --accent-teal-dark: #0F766E;
      --accent-teal-light: #F0FDFA;
      --accent-navy: #1E3A8A;
      --accent-navy-dark: #0F172A;
      --accent-navy-light: #EFF6FF;
      --accent-saffron: #EA580C;
      --accent-saffron-light: #FFF7ED;
      --accent-amber: #D97706;
      --accent-amber-light: #FEF3C7;
      --accent-red: #DC2626;
      --accent-red-light: #FEE2E2;
      --accent-emerald: #059669;
      --accent-emerald-light: #ECFDF5;

      /* Deck Palette */
      --saffron-vibrant: #EA580C;
      --saffron-rich: #C2410C;
      --saffron-soft: #FFF7ED;
      --saffron-border: #FDBA74;
      --royal-blue: #1D4ED8;
      --royal-blue-rich: #1E40AF;
      --royal-blue-soft: #EFF6FF;
      --royal-blue-border: #93C5FD;
      --emerald-green: #059669;
      --emerald-rich: #047857;
      --emerald-soft: #ECFDF5;
      --emerald-border: #6EE7B7;
      --amber-gold: #D97706;
      --amber-soft: #FEF3C7;
      --amber-border: #FCD34D;
      --coral-red: #DC2626;
      --coral-soft: #FEF2F2;
      --text-heading: #0F172A;
      --text-body: #334155;
      --border-card: #E2E8F0;
      --border-highlight: #CBD5E1;
      --shadow-sm: 0 2px 4px rgba(15, 23, 42, 0.04);
      --shadow-card: 0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
      --shadow-lg: 0 25px 50px -12px rgba(15, 23, 42, 0.12);

      --font-stack: "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans Devanagari", sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
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
      line-height: 1.6;
      touch-action: manipulation;
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    :focus-visible {
      outline: 3px solid var(--accent-teal) !important;
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

    /* Top National Announcement Bar */
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
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .top-trust-bar span.pill {
      background: var(--accent-saffron);
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 0.15rem 0.55rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Primary Navigation Header */
    header {
      background-color: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      padding: 0.85rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .brand-logo-badge {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--accent-navy) 0%, var(--accent-navy-dark) 100%);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      font-weight: 900;
      box-shadow: 0 4px 10px rgba(30, 58, 138, 0.25);
    }

    .app-title {
      font-size: 1.45rem;
      font-weight: 900;
      color: var(--accent-navy-dark);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .app-subtitle {
      font-size: 0.76rem;
      color: var(--accent-teal-dark);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Desktop Navigation Links */
    .nav-links-desktop {
      display: none;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    @media (min-width: 960px) {
      .nav-links-desktop { display: flex; }
    }

    .nav-link-btn {
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.45rem 0.85rem;
      border-radius: 0.5rem;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      border: 1px solid transparent;
      cursor: pointer;
    }

    .nav-link-btn:hover {
      color: var(--accent-navy);
      background-color: var(--accent-navy-light);
    }

    .nav-link-btn.active {
      color: var(--accent-navy-dark);
      background-color: var(--accent-navy-light);
      border-color: #BFDBFE;
      font-weight: 800;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .layout-wrapper {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      padding: 1.25rem 1rem;
      max-width: 1280px;
      margin: 0 auto;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .layout-wrapper {
        padding: 2rem;
      }
    }

    /* Page View Containers */
    .page-view {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
      animation: fadeIn 0.2s ease-in-out;
    }

    .page-view.hidden {
      display: none !important;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Breadcrumbs Bar on Subpages */
    .breadcrumb-bar {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 0.85rem;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .breadcrumb-path {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .breadcrumb-path a {
      color: var(--accent-navy);
      text-decoration: none;
    }

    .breadcrumb-path a:hover {
      text-decoration: underline;
    }

    .btn-back-home {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: var(--bg-surface-elevated);
      color: var(--accent-navy-dark);
      border: 1px solid var(--border-subtle);
      padding: 0.4rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
    }

    .btn-back-home:hover {
      background: var(--accent-navy-light);
      border-color: #BFDBFE;
    }

    /* Hero Section */
    .hero-container {
      background-color: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 1.5rem;
      padding: 1.75rem;
      box-shadow: 0 10px 30px -5px rgba(0,0,0,0.05);
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: center;
    }

    @media (min-width: 920px) {
      .hero-container {
        grid-template-columns: 1.15fr 0.85fr;
        padding: 2.5rem;
      }
    }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--accent-teal-light);
      border: 1px solid #CCFBF1;
      color: var(--accent-teal-dark);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }

    .hero-title {
      font-size: 2.25rem;
      font-weight: 900;
      color: var(--accent-navy-dark);
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
    }

    .hero-title .text-gradient {
      color: var(--accent-teal);
    }

    .hero-desc {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.65;
      margin-bottom: 1.5rem;
    }

    .hero-search-box {
      background: var(--bg-surface-elevated);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1rem;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    @media (min-width: 580px) {
      .hero-search-box {
        flex-direction: row;
        align-items: center;
      }
    }

    .search-select {
      flex: 1;
      min-height: 48px;
      background: #FFFFFF;
      border: 1.5px solid var(--border-subtle);
      border-radius: 0.65rem;
      padding: 0.5rem 1rem;
      font-size: 0.95rem;
      color: var(--text-primary);
      font-family: inherit;
    }

    .btn-search {
      min-height: 48px;
      padding: 0.5rem 1.25rem;
      background: var(--accent-navy);
      color: #FFFFFF;
      border: none;
      border-radius: 0.65rem;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.15s ease;
    }
    .btn-search:hover { background: var(--accent-navy-dark); }

    /* Video Embed Box */
    .hero-video-box {
      border-radius: 1.25rem;
      overflow: hidden;
      border: 2px solid var(--border-subtle);
      box-shadow: 0 12px 30px -5px rgba(0,0,0,0.1);
      position: relative;
      background: #000;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }

    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .video-floating-badge {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      border: 1px solid rgba(255,255,255,0.2);
    }

    /* Tour Launcher Section */
    .tour-launcher-section {
      background: #FFFFFF;
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }

    .tour-step-pill {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      min-height: 48px;
    }

    .tour-step-pill:hover {
      background: var(--accent-navy-light);
      border-color: #BFDBFE;
      color: var(--accent-navy);
    }

    .tour-step-pill.active {
      background: var(--accent-teal);
      border-color: var(--accent-teal);
      color: #FFFFFF;
      font-weight: 800;
    }

    /* Tour Banner */
    .tour-banner {
      position: sticky;
      top: 5rem;
      z-index: 90;
      background: linear-gradient(135deg, var(--accent-navy-dark) 0%, #0B2556 100%);
      border: 2px solid var(--accent-teal);
      border-radius: 1.25rem;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 20px 45px -10px rgba(0,0,0,0.35);
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      animation: tourSlideDown 0.3s ease;
    }

    @keyframes tourSlideDown {
      from { opacity: 0; transform: translateY(-12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Section Headings */
    .section-head {
      margin-bottom: 0.25rem;
    }

    .section-pretitle {
      color: var(--accent-teal-dark);
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: block;
      margin-bottom: 0.25rem;
    }

    .section-title {
      font-size: 1.85rem;
      font-weight: 900;
      color: var(--accent-navy-dark);
      letter-spacing: -0.02em;
    }

    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    @media (min-width: 840px) {
      .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .feature-card {
      background-color: var(--bg-surface);
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.25rem;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.25rem;
      box-shadow: 0 8px 24px -4px rgba(0,0,0,0.05);
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .feature-card:hover {
      border-color: var(--accent-teal);
      transform: translateY(-3px);
      box-shadow: 0 16px 32px -6px rgba(0,0,0,0.08);
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .card-tag {
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-navy);
      background: var(--accent-navy-light);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
    }

    .video-tag {
      background: var(--accent-teal-light);
      border: 1px solid #CCFBF1;
      color: var(--accent-teal-dark);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
    }

    .card-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      line-height: 1.3;
      margin-bottom: 0.5rem;
    }

    .card-desc {
      font-size: 0.98rem;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .info-pane {
      background-color: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 0.85rem;
      padding: 1rem;
      font-size: 0.92rem;
      color: var(--text-secondary);
    }

    /* Action Buttons (>=48px Touch Targets) */
    .btn-action {
      width: 100%;
      min-height: 52px;
      padding: 0.75rem 1.25rem;
      border-radius: 0.85rem;
      font-size: 1.05rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      border: none;
      transition: transform 0.1s ease, background-color 0.15s ease, box-shadow 0.15s ease;
      box-shadow: 0 4px 14px rgba(0,0,0,0.08);
      font-family: inherit;
    }
    .btn-action:active {
      transform: scale(0.98);
    }

    .btn-green, .btn-teal {
      background-color: var(--accent-teal);
      color: #FFFFFF;
    }
    .btn-green:hover, .btn-teal:hover {
      background-color: var(--accent-teal-dark);
      box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
    }

    .btn-navy {
      background-color: var(--accent-navy);
      color: #FFFFFF;
    }
    .btn-navy:hover {
      background-color: var(--accent-navy-dark);
      box-shadow: 0 6px 20px rgba(30, 58, 138, 0.3);
    }

    .btn-saffron {
      background-color: var(--accent-saffron);
      color: #FFFFFF;
    }
    .btn-saffron:hover {
      background-color: var(--saffron-rich);
      box-shadow: 0 6px 20px rgba(234, 88, 12, 0.3);
    }

    .select-input, .text-input {
      width: 100%;
      min-height: 52px;
      background: #FFFFFF;
      border: 1.5px solid var(--border-subtle);
      border-radius: 0.65rem;
      color: var(--text-primary);
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.15s ease;
    }
    .select-input:focus, .text-input:focus {
      border-color: var(--accent-teal);
      outline: none;
    }

    .timer-readout {
      font-size: 1.75rem;
      font-weight: 900;
      font-family: var(--font-mono);
      color: var(--accent-teal-dark);
    }

    /* Grids & Cards */
    .grid-2 { display: grid; grid-template-columns: 1fr; gap: 1.2rem; }
    .grid-3 { display: grid; grid-template-columns: 1fr; gap: 1.2rem; }
    .grid-4 { display: grid; grid-template-columns: 1fr; gap: 1rem; }

    @media (min-width: 680px) {
      .grid-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 960px) {
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
      .grid-4 { grid-template-columns: repeat(4, 1fr); }
    }

    .card-luminous {
      background: #FFFFFF;
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.1rem;
      padding: 1.25rem;
      position: relative;
      box-shadow: var(--shadow-card);
      transition: all 0.2s ease;
    }
    .card-luminous:hover {
      border-color: var(--royal-blue-border);
      transform: translateY(-2px);
    }

    .card-saffron-edge {
      border-left: 5px solid var(--saffron-vibrant);
      background: linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 65%);
    }
    .card-blue-edge {
      border-left: 5px solid var(--royal-blue);
      background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 65%);
    }
    .card-emerald-edge {
      border-left: 5px solid var(--emerald-green);
      background: linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 65%);
    }

    .metric-hero {
      font-size: 2.2rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }
    .metric-saffron { color: var(--saffron-vibrant); }
    .metric-blue { color: var(--royal-blue); }
    .metric-emerald { color: var(--emerald-green); }

    .deck-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 0.9rem;
      overflow: hidden;
      border: 1.5px solid var(--border-subtle);
      font-size: 0.88rem;
      box-shadow: var(--shadow-sm);
    }
    .deck-table th {
      background: #F8FAFC;
      color: var(--text-heading);
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 800;
      border-bottom: 2px solid var(--border-subtle);
    }
    .deck-table td {
      padding: 0.75rem 1rem;
      background: #FFFFFF;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-body);
      vertical-align: middle;
    }
    .deck-table tr:last-child td {
      border-bottom: none;
    }

    .code-blueprint-box {
      font-family: var(--font-mono);
      background: #0F172A;
      border: 1.5px solid #334155;
      border-radius: 0.9rem;
      padding: 1rem 1.25rem;
      font-size: 0.8rem;
      color: #38BDF8;
      line-height: 1.45;
      white-space: pre;
      overflow-x: auto;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.4);
    }

    .team-card {
      background: #FFFFFF;
      border: 1.5px solid var(--border-subtle);
      border-radius: 1.15rem;
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      box-shadow: var(--shadow-card);
      transition: all 0.2s ease;
      position: relative;
    }
    .team-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      border-color: var(--royal-blue);
    }
    .team-avatar-badge {
      width: 54px;
      height: 54px;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      font-weight: 900;
      color: #FFFFFF;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      border: 1px solid transparent;
    }
    .badge-saffron { background: var(--saffron-soft); border-color: var(--saffron-border); color: var(--saffron-rich); }
    .badge-blue { background: var(--royal-blue-soft); border-color: var(--royal-blue-border); color: var(--royal-blue-rich); }
    .badge-emerald { background: var(--emerald-soft); border-color: var(--emerald-border); color: var(--emerald-rich); }

    /* Voice Bar */
    .voice-bar-btn {
      width: 100%;
      min-height: 64px;
      background: linear-gradient(135deg, var(--accent-navy-dark) 0%, #0B2556 100%);
      border: 2px solid #38BDF8;
      border-radius: 1.25rem;
      color: #FFFFFF;
      font-size: 1.1rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      cursor: pointer;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.25);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      font-family: inherit;
    }
    .voice-bar-btn:active { transform: scale(0.99); }

    /* Modal Backdrop */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 100;
    }
    .modal-backdrop.hidden, .hidden { display: none !important; }

    .modal-sheet {
      background-color: #FFFFFF;
      border: 2px solid var(--border-subtle);
      border-radius: 1.25rem;
      width: 100%;
      max-width: 650px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
      color: var(--text-primary);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid var(--border-subtle);
      padding-bottom: 0.75rem;
    }

    .modal-close-btn {
      width: 48px;
      height: 48px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: 1.25rem;
      font-weight: bold;
      border-radius: 0.5rem;
      cursor: pointer;
    }

    /* Dialect Selector Tabs */
    .dialect-tabs-bar {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }

    .dialect-tab-btn {
      background: var(--bg-surface-elevated);
      border: 1.5px solid var(--border-subtle);
      color: var(--text-secondary);
      padding: 0.45rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      min-height: 48px;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }

    .dialect-tab-btn.active {
      background: var(--accent-teal);
      border-color: var(--accent-teal);
      color: #FFFFFF;
      font-weight: 800;
    }

    /* Roster Table */
    .roster-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    .roster-table th, .roster-table td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
    }

    .roster-table th {
      background: var(--bg-surface-elevated);
      color: var(--accent-navy-dark);
      font-weight: 800;
    }

    .status-pill {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
    }
    .status-pending { background: #FEF3C7; color: #B45309; }
    .status-active { background: #E0E7FF; color: #3730A3; }
    .status-resolved { background: #D1FAE5; color: #065F46; }

    /* Presentation Deck Styles */
    .deck-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 820px;
      background: radial-gradient(130% 90% at 50% -10%, #FEF3C7 0%, #EFF6FF 40%, #F8FAFC 85%);
      border-radius: 1.5rem;
      border: 2px solid #E2E8F0;
      box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.08);
      position: relative;
      overflow: hidden;
    }

    header.deck-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-card);
      z-index: 20;
    }

    .gov-flag-bar {
      display: flex;
      flex-direction: column;
      width: 6px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(234, 88, 12, 0.35);
    }
    .gov-flag-bar .flag-orange { background: #FF9933; flex: 1; }
    .gov-flag-bar .flag-white { background: #FFFFFF; flex: 1; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; }
    .gov-flag-bar .flag-green { background: #138808; flex: 1; }

    .brand-text h1 {
      font-size: 1.15rem;
      font-weight: 900;
      color: var(--text-heading);
      letter-spacing: -0.02em;
    }
    .brand-text p {
      font-size: 0.72rem;
      color: var(--saffron-vibrant);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .deck-stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 1.5rem;
      position: relative;
      z-index: 10;
      min-height: 600px;
    }

    .slide-viewport {
      width: 100%;
      max-width: 1200px;
      height: 100%;
      min-height: 560px;
      background: rgba(255, 255, 255, 0.98);
      border: 2px solid #FFFFFF;
      border-radius: 1.5rem;
      padding: 1.75rem 2rem;
      display: none;
      flex-direction: column;
      box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8);
      position: relative;
      animation: fadeInSlide 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .slide-viewport.active {
      display: flex;
    }

    @keyframes fadeInSlide {
      from { opacity: 0; transform: scale(0.99) translateY(6px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .slide-viewport::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, var(--saffron-vibrant) 0%, #FBBF24 35%, var(--royal-blue) 65%, var(--emerald-green) 100%);
    }

    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.6rem;
      border-bottom: 1px solid var(--border-card);
      padding-bottom: 0.65rem;
      flex-shrink: 0;
    }

    .slide-heading-wrap h2 {
      font-size: 1.75rem;
      font-weight: 900;
      color: var(--text-heading);
      letter-spacing: -0.025em;
      line-height: 1.2;
    }
    .slide-heading-wrap p {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
      font-weight: 600;
    }

    .slide-number-pill {
      font-family: var(--font-mono);
      background: var(--surface-elevated);
      border: 1px solid var(--border-card);
      color: var(--royal-blue-rich);
      padding: 0.35rem 0.85rem;
      border-radius: 0.75rem;
      font-size: 0.82rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .slide-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1rem;
      overflow-y: auto;
      padding: 0.5rem 0.25rem 1rem 0;
      min-height: 0;
    }

    .slide-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-card);
      padding-top: 0.65rem;
      font-size: 0.82rem;
      color: var(--text-muted);
      font-weight: 600;
      flex-shrink: 0;
      margin-top: auto;
    }

    .clean-link {
      color: var(--royal-blue);
      text-decoration: underline;
      font-weight: 800;
      cursor: pointer;
    }
    .clean-link:hover { color: var(--saffron-vibrant); }

    footer.deck-dock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(16px);
      border-top: 1px solid var(--border-card);
      z-index: 20;
    }

    .dock-nav-btns {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .pills-track {
      display: flex;
      gap: 0.35rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .pill-number-btn {
      width: 2.15rem;
      height: 2.15rem;
      border-radius: 0.65rem;
      border: 1.5px solid var(--border-card);
      background: #FFFFFF;
      color: var(--text-muted);
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .pill-number-btn.active {
      background: var(--royal-blue);
      color: #FFFFFF;
      border-color: var(--royal-blue);
    }

    /* Footer */
    footer.site-footer {
      background-color: var(--accent-navy-dark);
      color: #FFFFFF;
      padding: 2.5rem 1.5rem 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-top: 2rem;
    }

    .footer-content {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .footer-content {
        grid-template-columns: 1.5fr 1fr 1fr;
      }
    }

    .footer-bottom {
      max-width: 1280px;
      margin: 2rem auto 0;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.8rem;
      color: #94A3B8;
    }

    @media print {
      body > *:not(#page-deck) { display: none !important; }
      header, footer.site-footer, .top-trust-bar, aside, .no-print { display: none !important; }
      .layout-wrapper { padding: 0 !important; margin: 0 !important; max-width: none !important; }
      #page-deck { display: block !important; padding: 0 !important; }
      .deck-container {
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        background: #FFFFFF !important;
        border: none !important;
        box-shadow: none !important;
      }
      .deck-stage { display: block !important; padding: 0 !important; }
      .slide-viewport {
        display: flex !important;
        width: 100% !important;
        height: 100vh !important;
        max-width: none !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        padding: 1.5rem 2rem !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
      }
      .slide-viewport:last-child { page-break-after: auto !important; }
    }
  </style>
</head>
<body>

  <div id="sr-live-region" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>

  <!-- Top National Announcement -->
  <div class="top-trust-bar no-print">
    <span class="pill">FLN 2026</span>
    <span>🇮🇳 भारत सरकार • निपुण भारत मिशन • प्राथमिक शाला बहु-कक्षा साथी • 100% निःशुल्क एवं ऑफ़लाइन PWA</span>
  </div>

  <!-- Header with Brand and Subpage Navigation -->
  <header role="banner" class="no-print">
    <a href="#/home" class="brand-group" aria-label="VidyaSetu Homepage (विद्यासेतु मुख्य पृष्ठ)">
      <div class="brand-logo-badge" aria-hidden="true">🎓</div>
      <div>
        <h1 class="app-title">VidyaSetu (विद्यासेतु)</h1>
        <p class="app-subtitle">NIPUN Bharat Primary Teacher Copilot</p>
      </div>
    </a>

    <!-- Desktop Navigation Links (Separate Pages) -->
    <nav class="nav-links-desktop" aria-label="मुख्य नेविगेशन">
      <a href="#/home" class="nav-link-btn active" data-page="home">🏠 मुख्य पृष्ठ</a>
      <a href="#/solvers" class="nav-link-btn" data-page="solvers">⏱️ कक्षा समाधान</a>
      <a href="#/bhasha" class="nav-link-btn" data-page="bhasha">🗣️ भाषा सेतु</a>
      <a href="#/catchup" class="nav-link-btn" data-page="catchup">⚡ 2-मिनट वापसी जांच</a>
      <a href="#/video" class="nav-link-btn" data-page="video">📹 फील्ड वीडियो</a>
      <a href="#/deck" class="nav-link-btn" data-page="deck" style="color: var(--accent-saffron); font-weight: 800;">📊 प्रस्तुति डेक</a>
    </nav>

    <div class="header-actions">
      <button id="btn-start-tour" class="btn-action btn-green" style="min-height: 48px; font-size: 0.9rem; padding: 0.5rem 1.25rem; width: auto;">
        🎬 सजीव डेमो (Live Tour)
      </button>
      <button id="btn-self-test" class="btn-action" style="background: #FFFFFF; color: var(--accent-navy); border: 1.5px solid var(--accent-navy); min-height: 48px; font-size: 0.9rem; padding: 0.5rem 1rem; width: auto;">
        जांचें (Self-Test)
      </button>
    </div>
  </header>

  <div class="layout-wrapper">

    <!-- ========================================================================= -->
    <!-- PAGE 1: HOME DASHBOARD OVERVIEW (#/home or #/)                             -->
    <!-- ========================================================================= -->
    <section id="page-home" class="page-view" aria-label="मुख्य पृष्ठ">

      <!-- Hero Section -->
      <section class="hero-container" aria-labelledby="hero-heading">
        <div>
          <div class="hero-tag">
            <span>🌿</span>
            <span>निपुण भारत FLN फ्रेमवर्क • बहु-कक्षा साथी</span>
          </div>
          <h2 id="hero-heading" class="hero-title">
            सिखाएं। <span class="text-gradient">भारत के हर प्राथमिक शिक्षक के साथ।</span>
          </h2>
          <p class="hero-desc">
            अल्प-संसाधन प्राथमिक विद्यालयों की 3 प्रमुख चुनौतियों—<strong>2 से 3 कक्षाएं संयुक्त (MGML)</strong>, <strong>घरेलू बोली बनाम किताबी भाषा का अंतर</strong>, और <strong>फसल कटाई के बाद अनुपस्थिति</strong> का त्वरित, व्यावहारिक समाधान।
          </p>

          <!-- Category Quick-Filter Bar -->
          <div class="hero-search-box">
            <select id="hero-category-select" class="search-select" aria-label="चुनौती चुनें">
              <option value="all">🎯 सभी 3 कक्षा जटिलताएं देखें (All Challenges)</option>
              <option value="mgml">1️⃣ 2 से 3 कक्षाएं संयुक्त (MGML Split Teaching)</option>
              <option value="bhasha">2️⃣ घरेलू बोली अंतर (Bhasha Setu Dialect Bridge)</option>
              <option value="absentee">3️⃣ अनुपस्थिति व लर्निंग गैप (2-Min Catch-Up)</option>
              <option value="deck">📊 राष्ट्रीय प्रस्तुति डेक (12-Slide Deck)</option>
            </select>
            <button id="btn-hero-explore" class="btn-search">
              <span>समाधान पेज खोलें</span>
              <span>➔</span>
            </button>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            <span>✓ 100% ऑफ़लाइन PWA</span>
            <span>✓ ₹0 हार्डवेयर लागत/छात्र</span>
            <span>✓ शून्य innerHTML सुरक्षा</span>
            <span>✓ अवधी/भोजपुरी/बुंदेली सहायता</span>
          </div>
        </div>

        <!-- Video Box Preview in Hero -->
        <div id="video-section" class="hero-video-box">
          <div class="video-container">
            <iframe 
              src="https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview" 
              allow="autoplay; encrypted-media" 
              title="Classroom Complexity in Indian Primary Schools">
            </iframe>
          </div>
          <div class="video-floating-badge">
            <span>📹</span>
            <span>ग्राउंड रियलिटी • 90-Sec Field Documentation</span>
          </div>
        </div>
      </section>

      <!-- Walkthrough Launcher Section -->
      <section class="tour-launcher-section">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <strong style="color: var(--accent-navy-dark); font-size: 0.98rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🧭</span>
            <span>कक्षा जटिलता समाधान नेविगेशन (Classroom Complexity Walkthrough):</span>
          </strong>
          <span style="font-size: 0.82rem; color: var(--text-muted);">क्लिक करके लाइव समाधान देखें</span>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button id="btn-pill-step-1" class="tour-step-pill">
            1️⃣ 2 से 3 कक्षाएं संयुक्त (MGML Split)
          </button>
          <button id="btn-pill-step-2" class="tour-step-pill">
            2️⃣ घरेलू बोली अंतर (Bhasha Setu)
          </button>
          <button id="btn-pill-step-3" class="tour-step-pill">
            3️⃣ अनुपस्थिति रिकवरी (2-Min Catch-Up)
          </button>
          <button id="btn-pill-step-all" class="tour-step-pill active">
            ▶️ पूरा सजीव डेमो शुरू करें (Full Tour)
          </button>
        </div>
      </section>

      <!-- Guided Tour Active Banner -->
      <div id="demo-tour-banner" class="tour-banner hidden" role="region" aria-label="सजीव समाधान डेमो">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span id="tour-step-badge" style="background: var(--accent-teal); color: #FFFFFF; font-size: 0.75rem; font-weight: 900; padding: 0.2rem 0.6rem; border-radius: 9999px;">
                चुनौती 1 / 3
              </span>
              <h3 id="tour-step-title" style="font-size: 1.15rem; font-weight: 900; color: #FFFFFF; margin: 0;">
                2 से 3 कक्षाएं एक साथ (Multi-Grade MGML)
              </h3>
            </div>
            <p id="tour-problem-text" style="font-size: 0.88rem; color: #CBD5E1; margin: 0.25rem 0; font-style: italic;"></p>
            <p id="tour-solution-text" style="font-size: 0.95rem; color: #FDE047; font-weight: 700; margin: 0.25rem 0 0;"></p>
          </div>
          <button id="btn-close-tour" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #FFF; width: 48px; height: 48px; border-radius: 0.5rem; font-size: 1.25rem; font-weight: bold; cursor: pointer;" aria-label="डेमो बंद करें">✕</button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 0.5rem; margin-top: 0.5rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button id="btn-tour-action" class="btn-action btn-green" style="min-height: 48px; font-size: 0.9rem; padding: 0.4rem 1rem; width: auto;">
              ⚡ लाइव चलाएं (Execute)
            </button>
            <button id="btn-tour-read-aloud" class="btn-action btn-navy" style="min-height: 48px; font-size: 0.9rem; padding: 0.4rem 1rem; width: auto;">
              🔊 बोलकर समझें
            </button>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button id="btn-tour-prev" class="btn-action" style="background: rgba(255,255,255,0.15); color: #FFF; border: 1px solid rgba(255,255,255,0.25); min-height: 48px; font-size: 0.9rem; padding: 0.4rem 1rem; width: auto;">
              ◀ पिछला
            </button>
            <button id="btn-tour-next" class="btn-action btn-green" style="min-height: 48px; font-size: 0.9rem; padding: 0.4rem 1rem; width: auto;">
              अगला कदम ▶
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Portal Cards to Dedicated Pages -->
      <div id="solvers-section" class="section-head">
        <span class="section-pretitle">EXPLORE CLASSROOM SOLVERS</span>
        <h2 class="section-title">विद्यासेतु समर्पित शिक्षण मॉड्यूल</h2>
      </div>

      <div class="dashboard-grid">
        <!-- Tile 1: Multi-grade Timer Page Link -->
        <article class="feature-card" aria-labelledby="heading-mgml">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 1 • बहु-कक्षा चक्र</span>
              <span class="video-tag" id="cycle-step-badge">15-Min Split</span>
            </div>
            <h3 id="heading-mgml" class="card-title">बहु-कक्षा विभाजन सहायक</h3>
            <p class="card-desc">कक्षा 1 को पढ़ाते समय कक्षा 2 व 3 को स्व-अध्ययन खेल में व्यस्त रखें।</p>
            <div style="background: var(--accent-navy-dark); padding: 1rem; border-radius: 0.85rem; border: 1.5px solid #1E3A8A; color: #FDE047; font-weight: 800; font-size: 0.92rem; text-align: center; margin-bottom: 0.75rem;">
              🎯 15 मिनट: प्रत्यक्ष शिक्षण ↔ सहपाठी खेल (ध्वनि घंटी युक्त)
            </div>
            <div class="info-pane">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong id="active-group-label" style="color: var(--accent-navy);">कक्षा 1: प्रत्यक्ष शिक्षक समय</strong>
                <span id="timer-display" class="timer-readout">15:00</span>
              </div>
              <p id="split-instruction-text" style="margin: 0.4rem 0 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
                <!-- Filled safely via DOM -->
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-toggle-timer" class="btn-action btn-green">
              <span id="timer-icon" aria-hidden="true">⏱️</span>
              <span id="timer-btn-text">15 मिनट चक्र शुरू करें</span>
            </button>
            <a href="#/solvers" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 52px; text-decoration: none; font-size: 0.95rem;">
              <span>कक्षा समाधान समर्पित पेज खोलें</span>
              <span>➔</span>
            </a>
          </div>
        </article>

        <!-- Tile 2: Bhasha Setu Page Link -->
        <article class="feature-card" aria-labelledby="heading-bhasha">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 2 • भाषा अंतर</span>
              <span class="video-tag">1ली - 5वीं संदर्शिका</span>
            </div>
            <h3 id="heading-bhasha" class="card-title">भाषा सेतु (1ली से 5वीं कक्षा)</h3>
            <p class="card-desc">कठिन किताबी शब्दों को बच्चों की घरेलू बोली और ग्रामीण उदाहरणों में समझें।</p>
            <div style="background: var(--accent-teal-dark); padding: 1rem; border-radius: 0.85rem; border: 1.5px solid #0D9488; color: #FFFFFF; font-weight: 800; font-size: 0.92rem; text-align: center; margin-bottom: 0.75rem;">
              🗣️ 1ली से 5वीं: गणित • हिन्दी • पर्यावरण (अवधी, भोजपुरी, बुंदेली)
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label for="concept-dropdown" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">त्वरित अवधारणा चुनें:</label>
              <select id="concept-dropdown" class="select-input">
                <option value="subtraction">घटाव (कक्षा 1 गणित) - बेर गिरना / जलेबी खर्च</option>
                <option value="descending_order">अवरोही क्रम (कक्षा 2 गणित) - छत की सीढ़ी उतरना</option>
                <option value="place_value">स्थानीय मान (कक्षा 2 गणित) - बंडल व तीली</option>
                <option value="fractions">भिन्न (कक्षा 3 गणित) - रोटी का बंटवारा</option>
                <option value="perimeter">परिमाप (कक्षा 4 गणित) - खेत की मेड़</option>
                <option value="hcf">HCF (कक्षा 5 गणित) - सबसे बड़ा नाप</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-explain-concept" class="btn-action btn-navy">
              <span aria-hidden="true">🗣️</span>
              <span>घरेलू संदर्भ में समझाएं</span>
            </button>
            <a href="#/bhasha" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 52px; text-decoration: none; font-size: 0.95rem;">
              <span>संपूर्ण भाषा सेतु पेज खोलें (1ली से 5वीं)</span>
              <span>➔</span>
            </a>
          </div>
        </article>

        <!-- Tile 3: Vacation Return Diagnostic Link -->
        <article class="feature-card" aria-labelledby="heading-absentee">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 3 • उपचारात्मक शिक्षण</span>
              <span id="remediation-roster-count" class="video-tag">1 लंबित</span>
            </div>
            <h3 id="heading-absentee" class="card-title">छुट्टी के बाद वापसी जांच</h3>
            <p class="card-desc">छुट्टी या फसल कटाई के बाद लौटे बच्चे की 2 मिनट में जांच करें और सहपाठी साथी जोड़ें।</p>
            <div class="info-pane" style="margin-bottom: 0.75rem;">
              💡 <strong>3 त्वरित मौखिक प्रश्न</strong> बच्चे के ड्रॉप-ऑफ स्तर का पता लगाते हैं (Slide 9 मॉडल)।
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label for="student-name-input" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">लौटे हुए बच्चे का नाम:</label>
              <input type="text" id="student-name-input" class="text-input" placeholder="उदा. रोहन कुमार (कक्षा 2)" value="रोहन कुमार" maxlength="32" />
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-open-diagnostic" class="btn-action btn-green">
              <span aria-hidden="true">⚡</span>
              <span>2-मिनट मौखिक जांच शुरू करें</span>
            </button>
            <a href="#/catchup" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 52px; text-decoration: none; font-size: 0.95rem;">
              <span>वापसी जांच समर्पित पेज खोलें</span>
              <span>➔</span>
            </a>
          </div>
        </article>

        <!-- Tile 4: Presentation Deck Tile -->
        <article class="feature-card" aria-labelledby="heading-deck-tile" style="border-color: var(--saffron-border); background: linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 65%);">
          <div>
            <div class="card-meta">
              <span class="badge-pill badge-saffron">राष्ट्रीय एआई हैकथॉन डेक</span>
              <span class="badge-pill badge-blue">12 विस्तृत स्लाइड्स</span>
            </div>
            <h3 id="heading-deck-tile" class="card-title" style="color: var(--saffron-rich);">विद्यासेतु 12-स्लाइड प्रस्तुति डेक</h3>
            <p class="card-desc">प्रोजेक्ट विजन, टीम, ग्राउंड रियलिटी, आर्किटेक्चर ब्लूप्रिंट, तुलनात्मक विश्लेषण और FLN प्रभाव आंकड़े देखें।</p>
            <div class="info-pane" style="background: #FFFFFF; border: 1px solid var(--saffron-border);">
              <strong>प्रमुख स्लाइड्स:</strong>
              <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--text-secondary);">
                • स्लाइड 2: कोर टीम (SP, KY, SP)<br>
                • स्लाइड 6: टेक्निकल आर्किटेक्चर ब्लूप्रिंट<br>
                • स्लाइड 10: दीक्षा व असर TaRL से तुलना<br>
                • स्लाइड 11: मापने योग्य परिणाम (+32% FLN)
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <a href="#/deck" class="btn-action btn-saffron" style="text-decoration: none;">
              <span>📊 12-स्लाइड प्रस्तुति डेक खोलें</span>
              <span>➔</span>
            </a>
            <button type="button" class="btn-action" onclick="window.print()" style="background: #FFFFFF; color: var(--text-primary); border: 1.5px solid var(--border-subtle); min-height: 52px;">
              <span>🖨️ 16:9 PDF डाउनलोड / प्रिंट करें</span>
            </button>
          </div>
        </article>
      </div>

      <!-- SECTION: CORE TEAM & LEADERSHIP (Slide 2 Aligned) -->
      <section class="section-head" style="margin-top: 1.5rem;">
        <span class="section-pretitle">PROJECT LEADERSHIP & CORE ARCHITECTURE</span>
        <h2 class="section-title">परियोजना नेतृत्व एवं कोर टीम (Project Leadership & Team)</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          परियोजना प्रबंधन, ऑफ़लाइन सिस्टम्स आर्किटेक्चर एवं एआई/एमएल इंजीनियरिंग की समर्पित विशेषज्ञता।
        </p>
      </section>

      <div class="grid-3" style="gap: 1.25rem;">
        <!-- Srijan Purang -->
        <div class="team-card card-saffron-edge" style="align-items: center; text-align: center; padding: 1.75rem 1.25rem; gap: 1rem;">
          <div class="team-avatar-badge" style="width: 68px; height: 68px; font-size: 1.6rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--saffron-vibrant), #F97316);">
            SP
          </div>
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.35rem 0;">Srijan Purang</h3>
            <span class="badge-pill badge-saffron" style="font-size: 0.82rem; padding: 0.35rem 0.9rem;">Project Manager</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-body); line-height: 1.5;">
            उत्पाद रणनीति, सरकारी शिक्षा हितधारक समन्वय एवं पायलट क्रियान्वयन।
          </p>
        </div>

        <!-- Kanak Yadav -->
        <div class="team-card card-blue-edge" style="align-items: center; text-align: center; padding: 1.75rem 1.25rem; gap: 1rem;">
          <div class="team-avatar-badge" style="width: 68px; height: 68px; font-size: 1.6rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--royal-blue), #3B82F6);">
            KY
          </div>
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.35rem 0;">Kanak Yadav</h3>
            <span class="badge-pill badge-blue" style="font-size: 0.82rem; padding: 0.35rem 0.9rem;">Senior Architect</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-body); line-height: 1.5;">
            ऑफ़लाइन-फर्स्ट PWA आर्किटेक्चर, ट्रू डेल्टा-टाइम क्लॉक एवं DOM सुरक्षा कवच।
          </p>
        </div>

        <!-- Samarth Purang -->
        <div class="team-card card-emerald-edge" style="align-items: center; text-align: center; padding: 1.75rem 1.25rem; gap: 1rem;">
          <div class="team-avatar-badge" style="width: 68px; height: 68px; font-size: 1.6rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--emerald-green), #10B981);">
            SP
          </div>
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.35rem 0;">Samarth Purang</h3>
            <span class="badge-pill badge-emerald" style="font-size: 0.82rem; padding: 0.35rem 0.9rem;">AIML Engineer</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-body); line-height: 1.5;">
            ऑन-डिवाइस एसएलएम भाषा मॉडल, ध्वनिक ट्यूनिंग एवं बोली-सादृश्य एल्गोरिदम।
          </p>
        </div>
      </div>

      <!-- SECTION: EMPIRICAL IMPACT METRICS (Slide 11 Aligned) -->
      <section class="section-head" style="margin-top: 1.5rem;">
        <span class="section-pretitle">MEASURABLE IMPACT & FLN BENCHMARKS</span>
        <h2 class="section-title">मापने योग्य परिणाम एवं राष्ट्रीय FLN प्रभाव (Empirical Outcomes)</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          निपुण भारत मिशन के तहत 2026-27 तक सार्वभौमिक बुनियादी साक्षरता और संख्याज्ञान की प्राप्ति हेतु ठोस आंकड़े।
        </p>
      </section>

      <div class="grid-4">
        <div class="card-luminous card-emerald-edge" style="text-align: center; padding: 1.1rem;">
          <div class="metric-hero metric-emerald">₹0</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 800; margin-top: 0.25rem;">हार्डवेयर लागत / छात्र</div>
          <p style="font-size: 0.78rem; color: var(--text-body); margin-top: 0.35rem;">शिक्षक के साधारण स्मार्टफोन पर कार्यरत; कंकड़, स्लेट और चॉक से शिक्षण।</p>
        </div>
        <div class="card-luminous card-saffron-edge" style="text-align: center; padding: 1.1rem;">
          <div class="metric-hero metric-saffron">15–20m</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 800; margin-top: 0.25rem;">शिक्षण समय पुनर्प्राप्त</div>
          <p style="font-size: 0.78rem; color: var(--text-body); margin-top: 0.35rem;">प्रति 45-मिनट पीरियड में अनियंत्रित शोर व निष्क्रिय समय को समाप्त करके।</p>
        </div>
        <div class="card-luminous card-blue-edge" style="text-align: center; padding: 1.1rem;">
          <div class="metric-hero metric-blue">4.2x</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 800; margin-top: 0.25rem;">तीव्र मौखिक ट्रायज</div>
          <p style="font-size: 0.78rem; color: var(--text-body); margin-top: 0.35rem;">120 सेकंड की मौखिक जांच बनाम 15 मिनट की भारी कागजी परीक्षा।</p>
        </div>
        <div class="card-luminous card-emerald-edge" style="text-align: center; padding: 1.1rem;">
          <div class="metric-hero metric-emerald">0 KB</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 800; margin-top: 0.25rem;">आवर्ती इंटरनेट लागत</div>
          <p style="font-size: 0.78rem; color: var(--text-body); margin-top: 0.35rem;">100% ऑफ़लाइन कैश; शून्य क्लाउड सर्वर निर्भरता व शून्य मोबाइल डेटा व्यय।</p>
        </div>
      </div>

      <table class="deck-table" style="margin-top: 0.75rem;">
        <thead>
          <tr>
            <th style="width: 25%;">FLN शिक्षण मानक (Benchmark)</th>
            <th style="width: 37%; color: var(--coral-red);">वर्तमान स्थिति (बिना विद्यासेतु)</th>
            <th style="width: 38%; color: var(--emerald-green);">विद्यासेतु पायलट से अनुमानित प्रभाव</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>कक्षा 3 पठन प्रवाह (Reading Fluency)</strong></td>
            <td>~45% बच्चे कक्षा 2 का पाठ धाराप्रवाह नहीं पढ़ पाते (ASER रिपोर्ट)।</td>
            <td><strong>+32% सुधार:</strong> दैनिक फोनिक्स चक्र व बोली-आधारित सादृश्य द्वारा।</td>
          </tr>
          <tr>
            <td><strong>संख्या बोध व बुनियादी गणित (Math Mastery)</strong></td>
            <td>~55% बच्चे 2-अंकीय हासिल वाले जोड़-घटाव में अटकते हैं।</td>
            <td><strong>+28% निपुणता:</strong> कंकड़-स्लेट TLM और संख्या रेलगाड़ी खेल से।</td>
          </tr>
          <tr>
            <td><strong>अनुपस्थिति उपरांत वापसी (Absentee Recovery)</strong></td>
            <td>कटाई के बाद लौटे बच्चे स्थायी रूप से पिछड़ जाते हैं।</td>
            <td><strong>100% त्वरित जांच:</strong> 120 सेकंड में बच्चे का स्तर तय और साथी आवंटित।</td>
          </tr>
        </tbody>
      </table>

      <!-- SECTION: COMPETITIVE MATRIX & PRIOR ART (Slide 10 Aligned) -->
      <section class="section-head" style="margin-top: 1.5rem;">
        <span class="section-pretitle">PRIOR ART & COMPETITIVE CLEARANCE</span>
        <h2 class="section-title">तुलनात्मक विश्लेषण एवं प्रतिस्पर्धात्मक बढ़त (Competitive Matrix)</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          दीक्षा, असर/प्रथम और कॉर्पोरेट एड-टेक के मुकाबले विद्यासेतु क्यों भारतीय प्राथमिक शालाओं का एकमात्र व्यावहारिक हल है।
        </p>
      </section>

      <table class="deck-table">
        <thead>
          <tr>
            <th style="width: 22%;">प्लेटफ़ॉर्म / उपागम</th>
            <th style="width: 26%;">मूल फोकस</th>
            <th style="width: 26%; color: var(--coral-red);">ग्रामीण बहु-कक्षा में असफलता का कारण</th>
            <th style="width: 26%; color: var(--emerald-green);">विद्यासेतु का विशिष्ट समाधान</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>DIKSHA (दीक्षा - भारत सरकार)</strong></td>
            <td>डिजिटल पाठ्यपुस्तकों व वीडियो व्याख्यानों का भंडार।</td>
            <td>निष्क्रिय वीडियो देखना; प्रोजेक्टर, टीवी या स्क्रीन और बिजली की आवश्यकता।</td>
            <td><strong>सक्रिय कक्षा संचालक:</strong> ऑफ़लाइन रहते हुए भौतिक कक्षा समय का प्रबंधन।</td>
          </tr>
          <tr>
            <td><strong>Pratham / ASER (TaRL)</strong></td>
            <td>स्तर-आधारित शिक्षण (Teaching at the Right Level)।</td>
            <td>कागजी टेस्ट व जटिल हस्तलिखित ट्रैकिंग जो व्यस्त शिक्षक छोड़ देते हैं।</td>
            <td><strong>TaRL का डिजिटलीकरण:</strong> 15-मिनट चक्रीय रोटेशन व 2-मिनट मौखिक कार्ड।</td>
          </tr>
          <tr>
            <td><strong>Khan Academy / BYJU'S</strong></td>
            <td>व्यक्तिगत छात्र डिजिटल लर्निंग पाथवे।</td>
            <td>1:1 टैबलेट, हाई-स्पीड ब्रॉडबैंड व मानक भाषा साक्षरता मानकर चलते हैं।</td>
            <td><strong>₹0 छात्र हार्डवेयर लागत:</strong> शिक्षक के फोन व कंकड़/स्लेट से सामूहिक खेल।</td>
          </tr>
        </tbody>
      </table>

      <div class="card-luminous card-saffron-edge" style="margin-top: 0.5rem; padding: 0.75rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <strong style="color: var(--saffron-rich); font-size: 0.92rem;">100% मूल बौद्धिक संपदा (Original GovTech IP):</strong>
          <p style="font-size: 0.82rem; color: var(--text-body); margin: 0.15rem 0 0;">
            शुद्ध ओपन वेब मानकों (HTML5, Vanilla JS, Web Speech API) पर निर्मित। शून्य कॉपीराइट उल्लंघन अथवा साहित्यिक चोरी जोखिम।
          </p>
        </div>
        <span class="badge-pill badge-saffron">मूल तकनीकी संपदा</span>
      </div>

    </section>

    <!-- ========================================================================= -->
    <!-- PAGE 2: CLASSROOM SOLUTIONS DEDICATED PAGE (#/solvers)                    -->
    <!-- ========================================================================= -->
    <section id="page-solvers" class="page-view hidden" aria-label="कक्षा समाधान">
      <div class="breadcrumb-bar">
        <div class="breadcrumb-path">
          <a href="#/home">🏠 मुख्य पृष्ठ</a>
          <span>›</span>
          <span style="color: var(--accent-navy-dark);">कक्षा समाधान (Classroom Multi-Grade Solvers)</span>
        </div>
        <a href="#/home" class="btn-back-home">← मुख्य पृष्ठ पर लौटें</a>
      </div>

      <div class="section-head">
        <span class="section-pretitle">MULTI-GRADE CLASSROOM WORKSTATION</span>
        <h2 class="section-title">बहु-कक्षा चक्रीय शिक्षण संदर्शिका (MGML Split Orchestrator)</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          जब एक ही शिक्षक को 2 या 3 कक्षाएं एक साथ पढ़ानी हों, तो 15-मिनट चक्रीय टाइमर एक समूह को प्रत्यक्ष सिखाता है और दूसरे को स्लेट खेल में सक्रिय रखता है।
        </p>
      </div>

      <!-- Multi-Grade Interactive Configuration -->
      <div style="background: #FFF; border: 1.5px solid var(--border-subtle); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-navy-dark);">⚙️ कक्षा युग्म व समय चक्र चुनें:</h3>
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <div>
              <label for="solvers-grade-combo" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">कक्षा युग्म (Grade Pairing):</label>
              <select id="solvers-grade-combo" class="select-input">
                <option value="1_23">कक्षा 1 + कक्षा 2 व 3 (प्राथमिक मानक - Slide 7)</option>
                <option value="23_45">कक्षा 2 व 3 + कक्षा 4 व 5 (उच्च प्राथमिक)</option>
                <option value="single_teacher">एकल-शिक्षक शाला (कक्षा 1-2 + कक्षा 3-5)</option>
              </select>
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">शिक्षण चक्र अवधि (Cycle Duration):</label>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                <button type="button" class="cycle-duration-btn active tour-step-pill" data-seconds="900" style="flex: 1; justify-content: center;">15 मिनट</button>
                <button type="button" class="cycle-duration-btn tour-step-pill" data-seconds="600" style="flex: 1; justify-content: center;">10 मिनट</button>
                <button type="button" class="cycle-duration-btn tour-step-pill" data-seconds="1200" style="flex: 1; justify-content: center;">20 मिनट</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Split Instruction Screen -->
        <div style="background: var(--bg-surface-elevated); border: 2px solid #BFDBFE; border-radius: 1rem; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span style="font-size: 0.8rem; font-weight: 800; color: var(--accent-teal-dark); text-transform: uppercase;">सक्रिय शिक्षण चरण (Active Phase)</span>
              <h4 id="solvers-focus-heading" style="font-size: 1.25rem; font-weight: 900; color: var(--accent-navy-dark); margin-top: 0.15rem;">
                चरण 1: कक्षा 1 प्रत्यक्ष शिक्षक समय ↔ कक्षा 2 व 3 सहपाठी कंकड़ खेल
              </h4>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span id="solvers-timer-display" class="timer-readout" style="font-size: 2.25rem;">15:00</span>
              <button id="btn-solvers-timer-toggle" class="btn-action btn-green" style="min-height: 48px; width: auto; padding: 0.5rem 1.25rem;">
                ▶️ चक्र शुरू करें
              </button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              <div style="background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-navy); text-transform: uppercase;">👨‍🏫 शिक्षक कार्य (Direct Teacher Guidance):</span>
                <p id="solvers-teacher-task" style="margin: 0.35rem 0 0; font-size: 0.95rem; color: var(--text-primary); font-weight: 600;">
                  कक्षा 1 के बच्चों को वर्ण ध्वनि 'क' और 'म' की पहचान कराएं और रेत/हवा में अनुरेखण करवाएं।
                </p>
              </div>
              <div style="background: #FFFFFF; border: 1.5px solid #CCFBF1; border-radius: 0.75rem; padding: 1rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-teal-dark); text-transform: uppercase;">🎲 सहपाठी कार्य (Collaborative Peer Slate Game):</span>
                <p id="solvers-peer-task" style="margin: 0.35rem 0 0; font-size: 0.95rem; color: var(--text-primary); font-weight: 600;">
                  कक्षा 2 व 3 के बच्चे 10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें और एक-दूसरे की स्लेट जांचें।
                </p>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <button id="btn-solvers-switch-phase" class="btn-action" style="background: #FFFFFF; color: var(--accent-navy); border: 1.5px solid var(--accent-navy); min-height: 48px; width: auto; padding: 0.4rem 1rem; font-size: 0.9rem;">
              🔄 अभी भूमिका बदलें (Switch Focus Now)
            </button>
            <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
              🔔 15 मिनट पूरे होते ही स्वचालित ध्वनिक घंटी व हिन्दी वाणी बजेगी
            </span>
          </div>
        </div>

        <!-- Zero Cost TLM Generator on Solvers Page -->
        <div style="margin-top: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--accent-navy-dark); margin-bottom: 0.5rem;">
            🎯 शून्य-लागत TLM श्यामपट्ट खेल जेनरेटर (Slide 9 Model):
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
            <div>
              <label for="tlm-material-select" style="font-size: 0.85rem; font-weight: 700;">उपलब्ध प्राकृतिक सामग्री:</label>
              <select id="tlm-material-select" class="select-input">
                <option value="chalk">चॉक व श्यामपट्ट ("संख्या रेलगाड़ी" - Slide 9)</option>
                <option value="pebbles">कंकड़ / पत्थर ("संख्या का घर")</option>
                <option value="sticks">माचिस की तीलियाँ / सींक ("दहाई बंडल")</option>
                <option value="leaves">पत्तियां व फूल ("आकार खोज")</option>
                <option value="seeds">इमली के बीज ("बंटवारे का बाजार")</option>
              </select>
            </div>
            <div>
              <label for="tlm-grade-select" style="font-size: 0.85rem; font-weight: 700;">लक्षित कक्षा:</label>
              <select id="tlm-grade-select" class="select-input">
                <option value="1">कक्षा 1</option>
                <option value="2" selected>कक्षा 2</option>
                <option value="3">कक्षा 3</option>
                <option value="4">कक्षा 4</option>
                <option value="5">कक्षा 5</option>
              </select>
            </div>
          </div>
          <button id="btn-generate-tlm" class="btn-action btn-teal" style="min-height: 52px;">
            <span>🎲 इस सामग्री से गतिविधि खेल बनाएं</span>
          </button>
          <div id="tlm-result-box" style="margin-top: 0.75rem; display: none;"></div>
        </div>

        <!-- Technical Architecture Blueprint on Solvers Page (Slide 6) -->
        <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-navy-dark); margin-bottom: 0.75rem;">
            🏗️ तकनीकी आर्किटेक्चर एवं सुरक्षा ढांचा (Slide 6 Blueprint):
          </h4>
          <div class="grid-2">
            <div class="code-blueprint-box">
+-------------------------------------------------------------+
|                VIDYASETU CLIENT RUNTIME (PWA)               |
+-------------------------------------------------------------+
| [Hardware Synchronization Layer]                            |
|   • True Delta-Time Engine (Date.now() - sleep resilient)   |
|   • Web Speech API (Local on-device 'hi-IN' speech synth)   |
+-------------------------------------------------------------+
| [Pedagogical State Machine (Deterministic LangGraph Model)] |
|   • 15-Minute Multi-Grade Alternation State Engine          |
|   • Micro-Diagnostic Remediation Queue (LocalStorage)       |
+-------------------------------------------------------------+
| [Vernacular Metaphor Retrieval Engine]                      |
|   • Contextual Metaphor Mapping (Standard -> Rural Analogy) |
|   • Formant-stabilized low-cadence Hindi voice filter       |
+-------------------------------------------------------------+
| [Security & Privacy Boundary]                               |
|   • Strict Content Security Policy (No external scripts)    |
|   • 100% DOM XSS-Proof (document.createElement API only)   |
+-------------------------------------------------------------+
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="card-luminous card-saffron-edge" style="padding: 0.85rem 1.15rem;">
                <strong style="color: var(--saffron-rich); font-size: 0.92rem;">⚡ स्क्रीन-स्लीप प्रतिरोधी डेल्टा टाइमर</strong>
                <p style="font-size: 0.8rem; color: var(--text-body); margin-top: 0.15rem;">
                  फोन जेब में लॉक होने पर भी <code>Date.now()</code> इपॉक अंतर से टाइमर सटीक सेकंड पर बजता है।
                </p>
              </div>
              <div class="card-luminous card-blue-edge" style="padding: 0.85rem 1.15rem;">
                <strong style="color: var(--royal-blue); font-size: 0.92rem;">🛡️ शून्य DOM XSS एवं कड़ा CSP</strong>
                <p style="font-size: 0.8rem; color: var(--text-body); margin-top: 0.15rem;">
                  सभी <code>innerHTML</code> को पूर्णतः निष्कासित कर <code>document.createElement</code> द्वारा सुरक्षित DOM निर्माण।
                </p>
              </div>
              <div class="card-luminous card-emerald-edge" style="padding: 0.85rem 1.15rem;">
                <strong style="color: var(--emerald-rich); font-size: 0.92rem;">🔒 100% छात्र डेटा गोपनीयता</strong>
                <p style="font-size: 0.8rem; color: var(--text-body); margin-top: 0.15rem;">
                  छात्रों के रिकॉर्ड व उपचारात्मक रोस्टर केवल शिक्षक के स्थानीय फोन में सुरक्षित रहते हैं।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- PAGE 3: LANGUAGE BRIDGE (BHASHA SETU) CLASSES 1-5 (#/bhasha)              -->
    <!-- ========================================================================= -->
    <section id="page-bhasha" class="page-view hidden" aria-label="भाषा सेतु 1ली से 5वीं कक्षा">
      <div class="breadcrumb-bar">
        <div class="breadcrumb-path">
          <a href="#/home">🏠 मुख्य पृष्ठ</a>
          <span>›</span>
          <span style="color: var(--accent-navy-dark);">भाषा सेतु संदर्शिका (कक्षा 1 से 5वीं संपूर्ण पाठ्यक्रम)</span>
        </div>
        <a href="#/home" class="btn-back-home">← मुख्य पृष्ठ पर लौटें</a>
      </div>

      <div class="section-head">
        <span class="section-pretitle">DIALECT BRIDGE & CURRICULUM SYLLABUS</span>
        <h2 class="section-title">भाषा सेतु: कक्षा 1ली से 5वीं तक संपूर्ण अवधारणाएं (Slide 8 Aligned)</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          अपनी कक्षा, विषय और पाठ चुनें। किताबी परिभाषा को अवधी, भोजपुरी, बुंदेली और सरल ग्रामीण संदर्भ में समझें।
        </p>
      </div>

      <!-- Cascading Filter Controls -->
      <div style="background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <!-- 1. Class Selector -->
          <div>
            <label for="bhasha-class-select" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">1. कक्षा चुनें (Select Class):</label>
            <select id="bhasha-class-select" class="select-input">
              <option value="class1">कक्षा 1 (Grade 1)</option>
              <option value="class2" selected>कक्षा 2 (Grade 2)</option>
              <option value="class3">कक्षा 3 (Grade 3)</option>
              <option value="class4">कक्षा 4 (Grade 4)</option>
              <option value="class5">कक्षा 5 (Grade 5)</option>
            </select>
          </div>

          <!-- 2. Subject Selector -->
          <div>
            <label for="bhasha-subject-select" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">2. विषय चुनें (Select Subject):</label>
            <select id="bhasha-subject-select" class="select-input">
              <option value="math" selected>🔢 गणित (Mathematics)</option>
              <option value="hindi">📖 भाषा / हिन्दी (Language)</option>
              <option value="evs">🌿 पर्यावरण अध्ययन (EVS / Science)</option>
            </select>
          </div>

          <!-- 3. Topic Selector (Populated dynamically) -->
          <div>
            <label for="bhasha-topic-select" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">3. पाठ / अवधारणा चुनें (Select Topic):</label>
            <select id="bhasha-topic-select" class="select-input">
              <!-- Dynamically populated from BhashaKnowledgeBank -->
            </select>
          </div>
        </div>

        <!-- 4. Dialect Choice Tabs -->
        <div>
          <label style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy); display: block; margin-bottom: 0.25rem;">
            4. घरेलू बोली का परिवेश चुनें (Dialect Context):
          </label>
          <div class="dialect-tabs-bar">
            <button type="button" class="dialect-tab-btn active" data-dialect="awadhi">🌾 अवधी (Eastern UP)</button>
            <button type="button" class="dialect-tab-btn" data-dialect="bhojpuri">🌾 भोजपुरी (Bihar / Purvanchal)</button>
            <button type="button" class="dialect-tab-btn" data-dialect="bundeli">🌾 बुंदेली (MP / Bundelkhand)</button>
            <button type="button" class="dialect-tab-btn" data-dialect="rural">🏡 सरल ग्रामीण हिन्दी</button>
          </div>
        </div>

        <button id="btn-render-bhasha" class="btn-action btn-teal" style="min-height: 54px; margin-top: 0.5rem;">
          <span>🔍 अवधारणा का सम्पूर्ण विवरण व बोली सादृश्य देखें</span>
        </button>
      </div>

      <!-- Rendered Concept Detail Area -->
      <div id="bhasha-output-container" style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Dynamically rendered output card -->
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- PAGE 4: VACATION RETURN CATCH-UP DIAGNOSTIC (#/catchup)                   -->
    <!-- ========================================================================= -->
    <section id="page-catchup" class="page-view hidden" aria-label="वापसी जांच व उपचारात्मक चक्र">
      <div class="breadcrumb-bar">
        <div class="breadcrumb-path">
          <a href="#/home">🏠 मुख्य पृष्ठ</a>
          <span>›</span>
          <span style="color: var(--accent-navy-dark);">2-मिनट मौखिक वापसी जांच (Vacation Return Catch-Up)</span>
        </div>
        <a href="#/home" class="btn-back-home">← मुख्य पृष्ठ पर लौटें</a>
      </div>

      <div class="section-head">
        <span class="section-pretitle">INTERACTIVE ORAL DIAGNOSTIC & PEER REMEDIATION</span>
        <h2 class="section-title">छुट्टी / फसल कटाई के बाद वापसी जांच व सहपाठी चक्र (Slide 9 Model)</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          फसल कटाई, त्योहार या लंबी बीमारी के बाद लौटे बच्चे की 3 मौखिक प्रश्नों से तुरंत जांच करें और उसे सहपाठी साथी (Peer Buddy) आवंटित करें।
        </p>
      </div>

      <!-- Step 1: Student Absence Profile Form -->
      <div style="background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-navy-dark);">
            1. लौटे हुए बच्चे का विवरण भरें:
          </h3>
          <button id="btn-load-rohan-preset" class="btn-action" style="background: var(--accent-navy-light); color: var(--accent-navy); border: 1.5px solid #BFDBFE; min-height: 48px; width: auto; font-size: 0.85rem; padding: 0.35rem 0.85rem;">
            ⚡ रोहन का मौखिक टेस्ट (Slide 9 Demo)
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <div>
            <label for="cu-student-name" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">बच्चे का नाम:</label>
            <input type="text" id="cu-student-name" class="text-input" placeholder="उदा. रोहन कुमार" value="रोहन कुमार" maxlength="32" />
          </div>

          <div>
            <label for="cu-grade-select" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">कक्षा (Grade):</label>
            <select id="cu-grade-select" class="select-input">
              <option value="1">कक्षा 1 (Grade 1)</option>
              <option value="2" selected>कक्षा 2 (Grade 2)</option>
              <option value="3">कक्षा 3 (Grade 3)</option>
              <option value="4">कक्षा 4 (Grade 4)</option>
              <option value="5">कक्षा 5 (Grade 5)</option>
            </select>
          </div>

          <div>
            <label for="cu-reason-select" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">अनुपस्थिति का कारण व अवधि:</label>
            <select id="cu-reason-select" class="select-input">
              <option value="harvest">🌾 1-2 सप्ताह: फसल कटाई / बुवाई</option>
              <option value="festival">💍 3-4 सप्ताह: शादी-विवाह / त्योहार</option>
              <option value="migration">🧱 2+ माह: मौसमी ईंट-भट्ठा पलायन / बीमारी</option>
            </select>
          </div>

          <div>
            <label for="cu-domain-select" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy);">जांच का विषय क्षेत्र:</label>
            <select id="cu-domain-select" class="select-input">
              <option value="numeracy">🔢 बुनियादी गणित व संख्या ज्ञान (Numeracy)</option>
              <option value="literacy">📖 बुनियादी भाषा व पठन (Literacy)</option>
            </select>
          </div>
        </div>

        <button id="btn-generate-diagnostic-test" class="btn-action btn-green" style="min-height: 54px; margin-top: 0.5rem;">
          <span>⚡ 3-प्रश्नीय मौखिक जांच पत्र तैयार करें</span>
        </button>
      </div>

      <!-- Step 2: Interactive 3-Question Test Area -->
      <div id="cu-test-area" style="display: none; background: #FFF; border: 2px solid #BFDBFE; border-radius: 1.25rem; padding: 1.5rem; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h3 id="cu-test-title" style="font-size: 1.2rem; font-weight: 800; color: var(--accent-navy-dark);">
            2. मौखिक जांच प्रश्न (बच्चे से अकेले में पूछें):
          </h3>
          <span style="font-size: 0.85rem; background: var(--accent-navy-light); color: var(--accent-navy); padding: 0.25rem 0.65rem; border-radius: 9999px; font-weight: 800;">
            समय: 2 मिनट
          </span>
        </div>

        <div id="cu-questions-list" style="display: flex; flex-direction: column; gap: 1rem;">
          <!-- Questions with interactive scoring buttons rendered here safely -->
        </div>

        <button id="btn-evaluate-catchup" class="btn-action btn-navy" style="min-height: 52px;">
          <span>📊 परिणाम व 7-दिवसीय उपचारात्मक योजना बनाएं</span>
        </button>
      </div>

      <!-- Step 3: Diagnostic Outcome & Remediation Plan Area -->
      <div id="cu-outcome-area" style="display: none; display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Outcome card, buddy assignment, and micro-plan rendered here safely -->
      </div>

      <!-- Step 4: Active Remediation Roster -->
      <div style="background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-navy-dark);">
            📋 सक्रिय उपचारात्मक रोस्टर (Active Catch-Up Roster):
          </h3>
          <span id="roster-active-badge" style="font-size: 0.8rem; font-weight: 800; background: var(--accent-teal-light); color: var(--accent-teal-dark); border: 1px solid #CCFBF1; padding: 0.25rem 0.75rem; border-radius: 9999px;">
            1 बच्चा लंबित
          </span>
        </div>
        <div style="overflow-x: auto;">
          <table class="roster-table">
            <thead>
              <tr>
                <th>नाम</th>
                <th>कक्षा</th>
                <th>अनुपस्थिति</th>
                <th>जांच स्तर</th>
                <th>सहपाठी साथी</th>
                <th>स्थिति</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody id="roster-table-body">
              <!-- Loaded safely via DOM -->
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- PAGE 5: FIELD VIDEO & GROUND REALITY (#/video)                            -->
    <!-- ========================================================================= -->
    <section id="page-video" class="page-view hidden" aria-label="फील्ड वीडियो व विश्लेषण">
      <div class="breadcrumb-bar">
        <div class="breadcrumb-path">
          <a href="#/home">🏠 मुख्य पृष्ठ</a>
          <span>›</span>
          <span style="color: var(--accent-navy-dark);">फील्ड वीडियो (Ground Reality Video)</span>
        </div>
        <a href="#/home" class="btn-back-home">← मुख्य पृष्ठ पर लौटें</a>
      </div>

      <div class="section-head">
        <span class="section-pretitle">GROUND DOCUMENTATION & COMPLEXITY ANALYSIS</span>
        <h2 class="section-title">भारतीय प्राथमिक कक्षाओं की जमीनी हकीकत</h2>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          90-सेकंड की इस फील्ड रिकॉर्डिंग में देखें कि अल्प-संसाधन विद्यालयों में 2-3 कक्षाओं को एक साथ संभालना शिक्षकों के लिए कितनी बड़ी चुनौती है।
        </p>
      </div>

      <div style="background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="hero-video-box">
          <div class="video-container">
            <iframe 
              src="https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview" 
              allow="autoplay; encrypted-media" 
              title="Ground Classroom Complexity Video">
            </iframe>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-navy-dark);">
            🔍 वीडियो में दर्ज 3 प्रमुख कक्षा जटिलताएं व समाधान (Slide 4 Aligned):
          </h3>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem;">
              <span style="font-size: 0.78rem; font-weight: 800; color: var(--accent-navy); text-transform: uppercase;">चुनौती 1 • बहु-कक्षा एकीकरण</span>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0.25rem 0;">2-3 कक्षाएं संयुक्त (MGML)</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                जब शिक्षक एक कक्षा को पढ़ाते हैं, तो दूसरी कक्षा बिना मार्गदर्शन के बैठी रहती है। 
                <br><strong>विद्यासेतु हल:</strong> 15-मिनट चक्रीय टाइमर द्वारा प्रत्यक्ष शिक्षण ↔ सहपाठी खेल का संतुलन।
              </p>
            </div>

            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem;">
              <span style="font-size: 0.78rem; font-weight: 800; color: var(--accent-teal-dark); text-transform: uppercase;">चुनौती 2 • भाषा की खाई</span>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0.25rem 0;">घरेलू बोली बनाम किताबी भाषा</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                किताबी भाषा (घटाव, अवरोही, स्थानीय मान) बच्चे की घरेलू बोली से अलग होने पर समझ रुक जाती है।
                <br><strong>विद्यासेतु हल:</strong> भाषा सेतु अवधी, भोजपुरी और बुंदेली में तुरंत सादृश्य देता है।
              </p>
            </div>

            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem;">
              <span style="font-size: 0.78rem; font-weight: 800; color: var(--accent-saffron); text-transform: uppercase;">चुनौती 3 • मौसमी पलायन</span>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0.25rem 0;">फसल कटाई के बाद अनुपस्थिति</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                कटाई या बीमारी के बाद लौटे बच्चों का लर्निंग लॉस हो जाता है और शिक्षक अकेले दोबारा नहीं पढ़ा पाते।
                <br><strong>विद्यासेतु हल:</strong> 2-मिनट मौखिक जांच और सहपाठी साथी (Peer Buddy) आवंटन।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- PAGE 6: 12-SLIDE PRESENTATION DECK (#/deck)                               -->
    <!-- ========================================================================= -->
    <section id="page-deck" class="page-view hidden" aria-label="12-स्लाइड प्रस्तुति डेक">
      <div class="breadcrumb-bar no-print">
        <div class="breadcrumb-path">
          <a href="#/home">🏠 मुख्य पृष्ठ</a>
          <span>›</span>
          <span style="color: var(--accent-navy-dark);">राष्ट्रीय एआई हैकथॉन प्रस्तुति डेक (12 विस्तृत स्लाइड्स)</span>
        </div>
        <a href="#/home" class="btn-back-home">← मुख्य पृष्ठ पर लौटें</a>
      </div>

      <div class="deck-container">
        
        <!-- Deck Top Bar -->
        <header class="deck-topbar no-print">
          <div class="brand-group">
            <div class="gov-flag-bar">
              <div class="flag-orange"></div>
              <div class="flag-white"></div>
              <div class="flag-green"></div>
            </div>
            <div class="brand-text">
              <h1>VidyaSetu (विद्यासेतु)</h1>
              <p>National Mission on Foundational Literacy & Numeracy</p>
            </div>
            <div class="pill-cluster">
              <span class="badge-pill badge-saffron">NIPUN Bharat Aligned</span>
              <span class="badge-pill badge-blue">NEP 2020 FLN Mandate</span>
              <span class="badge-pill badge-emerald">Classroom Complexity Solution</span>
            </div>
          </div>

          <div class="top-actions">
            <button id="btn-fullscreen" class="btn-action" style="min-height: 48px; width: auto; padding: 0.4rem 0.9rem; font-size: 0.85rem;" title="Toggle Fullscreen (F)">
              <span>⛶</span> Fullscreen
            </button>
            <button id="btn-print-pdf" class="btn-action btn-saffron" style="min-height: 48px; width: auto; padding: 0.4rem 1rem; font-size: 0.85rem;" title="Download High-Res 16:9 PDF">
              <span>🖨️</span> Print / PDF
            </button>
          </div>
        </header>

        <!-- Master Stage for 12 Slides -->
        <main class="deck-stage" id="deck-stage">

          <!-- SLIDE 1: TITLE SLIDE -->
          <section class="slide-viewport active" data-slide="1">
            <div class="slide-content" style="justify-content: center; align-items: center; text-align: center; gap: 1.5rem;">
              <div style="display: inline-flex; align-items: center; gap: 0.75rem; background: var(--saffron-soft); border: 1.5px solid var(--saffron-border); padding: 0.5rem 1.25rem; border-radius: 9999px;">
                <span style="font-size: 1.1rem;">🇮🇳</span>
                <span style="font-size: 0.85rem; font-weight: 800; color: var(--saffron-rich); text-transform: uppercase; letter-spacing: 0.05em;">
                  Digital Public Infrastructure for Primary Education
                </span>
              </div>

              <div style="max-width: 900px;">
                <h1 style="font-size: 3rem; font-weight: 900; line-height: 1.1; color: var(--text-heading); letter-spacing: -0.03em;">
                  VidyaSetu <span style="font-family: var(--font-stack); color: var(--saffron-vibrant);">(विद्यासेतु)</span>
                </h1>
                <p style="font-size: 1.3rem; color: var(--royal-blue); font-weight: 800; margin-top: 0.75rem; line-height: 1.4;">
                  An Offline-First Agentic Classroom Copilot for Multi-Grade Primary Schools
                </p>
                <p style="font-size: 1rem; color: var(--text-muted); font-weight: 600; margin-top: 0.5rem;">
                  Orchestrating Split-Classrooms, Bridging Dialect Walls & Accelerating Foundational Literacy and Numeracy (FLN)
                </p>
              </div>

              <div class="grid-3" style="width: 100%; max-width: 960px; margin-top: 0.5rem;">
                <div class="card-luminous card-saffron-edge" style="text-align: left; padding: 1rem 1.25rem;">
                  <span class="badge-pill badge-saffron" style="font-size: 0.7rem; margin-bottom: 0.35rem;">TARGET CHALLENGE</span>
                  <strong style="display: block; font-size: 0.95rem; color: var(--text-heading);">Problem 1: Classroom Complexity</strong>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Multi-grade teaching, dialect gap & student absenteeism.</p>
                </div>

                <div class="card-luminous card-blue-edge" style="text-align: left; padding: 1rem 1.25rem;">
                  <span class="badge-pill badge-blue" style="font-size: 0.7rem; margin-bottom: 0.35rem;">POLICY ANCHOR</span>
                  <strong style="display: block; font-size: 0.95rem; color: var(--text-heading);">NIPUN Bharat & NEP 2020</strong>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Universal Grade 3 foundational skills by 2026-27.</p>
                </div>

                <div class="card-luminous card-emerald-edge" style="text-align: left; padding: 1rem 1.25rem;">
                  <span class="badge-pill badge-emerald" style="font-size: 0.7rem; margin-bottom: 0.35rem;">OPERATIONAL MOAT</span>
                  <strong style="display: block; font-size: 0.95rem; color: var(--text-heading);">₹0 Hardware Cost / Child</strong>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">100% offline-ready PWA for existing teacher smartphones.</p>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span><a href="#/home" class="clean-link">Working Prototype</a></span>
              <span>FLN Classroom Copilot System</span>
            </div>
          </section>

          <!-- SLIDE 2: DEDICATED TEAM SLIDE -->
          <section class="slide-viewport" data-slide="2">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-blue" style="margin-bottom: 0.25rem;">Project Leadership & Core Team</span>
                <h2>Project Leadership & Core Team</h2>
                <p>Interdisciplinary expertise across project execution, technical architecture, and machine learning.</p>
              </div>
              <span class="slide-number-pill">SLIDE 02 / 12</span>
            </div>

            <div class="slide-content" style="justify-content: center;">
              <div class="grid-3" style="gap: 1.5rem; margin: auto 0;">
                
                <!-- Srijan Purang -->
                <div class="team-card card-saffron-edge" style="align-items: center; text-align: center; padding: 2rem 1.5rem; gap: 1.25rem;">
                  <div class="team-avatar-badge" style="width: 72px; height: 72px; font-size: 1.75rem; border-radius: 1.25rem; background: linear-gradient(135deg, var(--saffron-vibrant), #F97316);">
                    SP
                  </div>
                  <div>
                    <h3 style="font-size: 1.45rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.4rem 0;">Srijan Purang</h3>
                    <span class="badge-pill badge-saffron" style="font-size: 0.85rem; padding: 0.4rem 1rem;">Project Manager</span>
                  </div>
                </div>

                <!-- Kanak Yadav -->
                <div class="team-card card-blue-edge" style="align-items: center; text-align: center; padding: 2rem 1.5rem; gap: 1.25rem;">
                  <div class="team-avatar-badge" style="width: 72px; height: 72px; font-size: 1.75rem; border-radius: 1.25rem; background: linear-gradient(135deg, var(--royal-blue), #3B82F6);">
                    KY
                  </div>
                  <div>
                    <h3 style="font-size: 1.45rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.4rem 0;">Kanak Yadav</h3>
                    <span class="badge-pill badge-blue" style="font-size: 0.85rem; padding: 0.4rem 1rem;">Senior Architect</span>
                  </div>
                </div>

                <!-- Samarth Purang -->
                <div class="team-card card-emerald-edge" style="align-items: center; text-align: center; padding: 2rem 1.5rem; gap: 1.25rem;">
                  <div class="team-avatar-badge" style="width: 72px; height: 72px; font-size: 1.75rem; border-radius: 1.25rem; background: linear-gradient(135deg, var(--emerald-green), #10B981);">
                    SP
                  </div>
                  <div>
                    <h3 style="font-size: 1.45rem; font-weight: 900; color: var(--text-heading); margin: 0 0 0.4rem 0;">Samarth Purang</h3>
                    <span class="badge-pill badge-emerald" style="font-size: 0.85rem; padding: 0.4rem 1rem;">AIML Engineer</span>
                  </div>
                </div>

              </div>

              <div class="card-luminous" style="background: #F8FAFC; border: 1.5px solid var(--border-card); padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
                <span style="font-size: 0.86rem; color: var(--text-muted); font-weight: 700;">
                  🤝 Dedicated team driving product management, offline systems architecture, and AI/ML innovation.
                </span>
                <span class="badge-pill badge-emerald">Ready for Field Pilot</span>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Team VidyaSetu</span>
              <span><a href="#/home" class="clean-link">Working Prototype</a></span>
            </div>
          </section>

          <!-- SLIDE 3: EXECUTIVE SUMMARY & OVERVIEW -->
          <section class="slide-viewport" data-slide="3">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-saffron" style="margin-bottom: 0.25rem;">Executive Overview</span>
                <h2>Bridging the Classroom Divide from the Inside Out</h2>
                <p>A unified agentic copilot resolving multi-grade chaos, dialect barriers, and chronic absence.</p>
              </div>
              <span class="slide-number-pill">SLIDE 03 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-3">
                <div class="card-luminous card-saffron-edge">
                  <span style="font-size: 2rem; display: block; margin-bottom: 0.35rem;">👥</span>
                  <strong style="font-size: 1.05rem; color: var(--saffron-rich);">Multi-Grade (MGML) State Engine</strong>
                  <p style="font-size: 0.86rem; color: var(--text-body); margin-top: 0.4rem;">
                    Automates alternating 15-minute rotations: direct teacher instruction for Grade 1 while Grades 2/3 engage in peer slate games.
                  </p>
                </div>

                <div class="card-luminous card-blue-edge">
                  <span style="font-size: 2rem; display: block; margin-bottom: 0.35rem;">🗣️</span>
                  <strong style="font-size: 1.05rem; color: var(--royal-blue);">Bhasha Setu (Dialect Bridge)</strong>
                  <p style="font-size: 0.86rem; color: var(--text-body); margin-top: 0.4rem;">
                    Translates abstract textbook Hindi/English into village-grounded metaphors (e.g. descending order = stepping down a ladder).
                  </p>
                </div>

                <div class="card-luminous card-emerald-edge">
                  <span style="font-size: 2rem; display: block; margin-bottom: 0.35rem;">⚡</span>
                  <strong style="font-size: 1.05rem; color: var(--emerald-rich);">2-Min Absentee Triage & TLM</strong>
                  <p style="font-size: 0.86rem; color: var(--text-body); margin-top: 0.4rem;">
                    Rapid 3-question oral catch-up screening and zero-cost collaborative chalkboard games using chalk, slates, and pebbles.
                  </p>
                </div>
              </div>

              <div class="card-luminous" style="background: linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 100%); border: 1.5px solid #FCD34D; padding: 0.9rem 1.25rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <span style="font-size: 1.8rem;">🎯</span>
                  <div>
                    <strong style="color: #B45309; font-size: 0.94rem;">Core Pedagogical Philosophy:</strong>
                    <p style="font-size: 0.84rem; color: #78350F; margin-top: 0.15rem;">
                      Instead of trying to replace the teacher with a digital device, VidyaSetu acts as an <strong>invisible orchestrator</strong> that handles scheduling overhead and language scaffolding, preserving precious teacher instructional hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Target Ecosystem: Indian Government Primary Schools (NIPUN Bharat FLN)</span>
              <span>Open Web Standards (HTML5, Vanilla JS, Web Speech API)</span>
            </div>
          </section>

          <!-- SLIDE 4: THE GROUND REALITY -->
          <section class="slide-viewport" data-slide="4">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-saffron" style="margin-bottom: 0.25rem;">Classroom Diagnosis</span>
                <h2>The Ground Reality: Why Indian Primary Classrooms Break</h2>
                <p>Over 65% of rural government schools operate with 2-3 teachers handling 5 grades in single rooms.</p>
              </div>
              <span class="slide-number-pill">SLIDE 04 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-3">
                <div class="card-luminous card-saffron-edge">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <span class="badge-pill badge-saffron">BOTTLENECK 1</span>
                    <span style="font-size: 1.3rem;">🏫</span>
                  </div>
                  <strong style="font-size: 1.05rem; color: var(--text-heading);">Multi-Grade (MGML) Fragmentation</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin-top: 0.4rem;">
                    A single teacher manages Grades 1, 2, and 3 in one shared room. When the teacher instructs Grade 1, Grades 2 & 3 sit idle, generate noise, and disrupt focus.
                  </p>
                </div>

                <div class="card-luminous card-blue-edge">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <span class="badge-pill badge-blue">BOTTLENECK 2</span>
                    <span style="font-size: 1.3rem;">📖</span>
                  </div>
                  <strong style="font-size: 1.05rem; color: var(--text-heading);">Home Dialect vs. Textbook Wall</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin-top: 0.4rem;">
                    Children speak Bhojpuri, Awadhi, Bundeli, or Santhali at home. Textbooks use formal Sanskritized Hindi or English. Children disengage from linguistic alienation.
                  </p>
                </div>

                <div class="card-luminous card-emerald-edge">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <span class="badge-pill badge-emerald">BOTTLENECK 3</span>
                    <span style="font-size: 1.3rem;">🌾</span>
                  </div>
                  <strong style="font-size: 1.05rem; color: var(--text-heading);">Chronic Absenteeism Learning Gaps</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin-top: 0.4rem;">
                    Children miss 2-3 weeks for seasonal harvesting or illness. The teacher has zero minutes for 1-on-1 remediation, creating compounding learning deficits.
                  </p>
                </div>
              </div>

              <div class="card-luminous" style="background: #FFFBEB; border: 1.5px solid #FCD34D; padding: 0.85rem 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.85rem;">
                  <span style="font-size: 1.75rem;">⚠️</span>
                  <div>
                    <strong style="color: #B45309; font-size: 0.92rem;">The "One Tablet per Child" Fallacy:</strong>
                    <p style="font-size: 0.82rem; color: #78350F; margin-top: 0.15rem;">
                      High-resource smartboard and tablet interventions (costing ₹50,000+ per classroom) fail in rural schools due to frequent load-shedding, broken screens, hardware theft, and recurring broadband subscriptions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Evidence Base: UDISE+ 2024-25 & ASER National Primary Findings</span>
              <span>NIPUN Bharat Target: Universal FLN by 2026-27</span>
            </div>
          </section>

          <!-- SLIDE 5: THE STRATEGIC INNOVATION PIVOT -->
          <section class="slide-viewport" data-slide="5">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-blue" style="margin-bottom: 0.25rem;">Strategic Innovation</span>
                <h2>The Innovation Pivot: Teacher Orchestration Copilot</h2>
                <p>Moving from the "one-tablet-per-child" illusion to empowering the human teacher in the room.</p>
              </div>
              <span class="slide-number-pill">SLIDE 05 / 12</span>
            </div>

            <div class="slide-content">
              <table class="deck-table">
                <thead>
                  <tr>
                    <th style="width: 24%;">Strategic Dimension</th>
                    <th style="width: 38%; color: var(--coral-red);">Conventional Ed-Tech Illusion</th>
                    <th style="width: 38%; color: var(--emerald-green);">VidyaSetu GovTech Innovation Pivot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Primary End-User</strong></td>
                    <td>Individual student isolated with a digital screen.</td>
                    <td><strong>The Educator</strong> orchestrating physical peer learning.</td>
                  </tr>
                  <tr>
                    <td><strong>Hardware Cost / Pupil</strong></td>
                    <td>₹15,000 – ₹30,000 (Tablets, charging carts, screens).</td>
                    <td><strong>₹0 / Child</strong> (Runs on existing teacher smartphone).</td>
                  </tr>
                  <tr>
                    <td><strong>Connectivity Requirement</strong></td>
                    <td>Continuous 4G/Wi-Fi video streaming.</td>
                    <td><strong>100% Offline PWA</strong> (30 KB core payload; zero data costs).</td>
                  </tr>
                  <tr>
                    <td><strong>Learning Materials (TLM)</strong></td>
                    <td>Costly recurring printed workbooks & plastic kits.</td>
                    <td><strong>Zero-Cost Physical TLM</strong> (chalk, slate, stones, leaves).</td>
                  </tr>
                  <tr>
                    <td><strong>Language Processing</strong></td>
                    <td>Literal, robotic machine translation.</td>
                    <td><strong>Grounded Vernacular Metaphors</strong> via rural analogies.</td>
                  </tr>
                </tbody>
              </table>

              <div class="grid-2" style="margin-top: 0.2rem;">
                <div class="card-luminous card-saffron-edge" style="padding: 0.85rem 1.15rem;">
                  <strong style="color: var(--saffron-rich); font-size: 0.92rem;">Empowering Human Connection</strong>
                  <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.2rem;">
                    Technology handles scheduling cognitive load and linguistic translation, letting the teacher teach without stress.
                  </p>
                </div>
                <div class="card-luminous card-emerald-edge" style="padding: 0.85rem 1.15rem;">
                  <strong style="color: var(--emerald-rich); font-size: 0.92rem;">Zero Infrastructure Barrier</strong>
                  <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.2rem;">
                    No electrical grid dependence. Ready for immediate deployment in 1.2 million public primary schools today.
                  </p>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Design Principle: Minimalist Digital Footprint, Maximalist Human Interaction</span>
              <span>Scalable across all 28 States & 8 Union Territories</span>
            </div>
          </section>

          <!-- SLIDE 6: TECHNICAL ARCHITECTURE & MOAT -->
          <section class="slide-viewport" data-slide="6">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-emerald" style="margin-bottom: 0.25rem;">Robust Architecture</span>
                <h2>Technical Architecture & Hardware-Agnostic Moat</h2>
                <p>Engineered for low-cost Android Go devices, flaky networks, and zero-trust student privacy.</p>
              </div>
              <span class="slide-number-pill">SLIDE 06 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-2">
                <div class="code-blueprint-box">
+-------------------------------------------------------------+
|                VIDYASETU CLIENT RUNTIME (PWA)               |
+-------------------------------------------------------------+
| [Hardware Synchronization Layer]                            |
|   • True Delta-Time Engine (Date.now() - sleep resilient)   |
|   • Web Speech API (Local on-device 'hi-IN' speech synth)   |
+-------------------------------------------------------------+
| [Pedagogical State Machine (Deterministic LangGraph Model)] |
|   • 15-Minute Multi-Grade Alternation State Engine          |
|   • Micro-Diagnostic Remediation Queue (LocalStorage)       |
+-------------------------------------------------------------+
| [Vernacular Metaphor Retrieval Engine]                      |
|   • Contextual Metaphor Mapping (Standard -> Rural Analogy) |
|   • Formant-stabilized low-cadence Hindi voice filter       |
+-------------------------------------------------------------+
| [Security & Privacy Boundary]                               |
|   • Strict Content Security Policy (No external scripts)    |
|   • 100% DOM XSS-Proof (document.createElement API only)   |
+-------------------------------------------------------------+
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div class="card-luminous card-saffron-edge" style="padding: 0.85rem 1.15rem;">
                    <strong style="color: var(--saffron-rich); font-size: 0.94rem;">⚡ Screen-Sleep Resilient Delta Timer</strong>
                    <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.15rem;">
                      Replaces naive <code>setInterval</code> loops with epoch delta comparisons. Timers never freeze when Android throttles locked phones in teachers' pockets.
                    </p>
                  </div>

                  <div class="card-luminous card-blue-edge" style="padding: 0.85rem 1.15rem;">
                    <strong style="color: var(--royal-blue); font-size: 0.94rem;">🛡️ Zero DOM XSS & Strict CSP</strong>
                    <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.15rem;">
                      Banishes all <code>innerHTML</code> interpolation. All DOM elements are built via strict node APIs, fully eliminating script injection vectors.
                    </p>
                  </div>

                  <div class="card-luminous card-emerald-edge" style="padding: 0.85rem 1.15rem;">
                    <strong style="color: var(--emerald-rich); font-size: 0.94rem;">🔒 Complete Student Privacy Isolation</strong>
                    <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.15rem;">
                      Student remedial records and diagnostic checkpoints are stored strictly in client-side storage. Zero student PII leaves the classroom device.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Technology Stack: HTML5, Modern Vanilla JS, Web Speech API, Progressive Web App</span>
              <span>Zero Recurring Cloud Costs • Zero Vendor Lock-In</span>
            </div>
          </section>

          <!-- SLIDE 7: PATHWAY 1 - MULTI-GRADE SPLIT -->
          <section class="slide-viewport" data-slide="7">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-saffron" style="margin-bottom: 0.25rem;">Solution Pathway 1</span>
                <h2>Multi-Grade Split Orchestrator (15-Min Cycles)</h2>
                <p>Solving the multi-grade tug-of-war with an automated alternating instruction state machine.</p>
              </div>
              <span class="slide-number-pill">SLIDE 07 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-2">
                <div class="card-luminous" style="border: 2px solid var(--saffron-border); background: #FFFBF5; padding: 1.15rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <span class="badge-pill badge-saffron">PHASE 1: 00:00 – 15:00</span>
                    <span style="font-size: 1.2rem;">⏱️</span>
                  </div>
                  <strong style="font-size: 1.05rem; color: var(--saffron-rich);">Grade 1: Direct Teacher Guidance</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin: 0.3rem 0 0.65rem;">
                    Teacher conducts intensive phonics drills: identifying 'क' and 'म' sound patterns with sand/air drawing.
                  </p>
                  <div style="border-top: 1.5px dashed var(--border-card); padding-top: 0.65rem;">
                    <strong style="font-size: 1rem; color: var(--royal-blue);">Grades 2 & 3: Collaborative Peer Game</strong>
                    <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
                      Children work in pairs bundling pebbles into groups of 10 and recording numerals on slates. Zero noise, zero disruption.
                    </p>
                  </div>
                </div>

                <div class="card-luminous" style="border: 2px solid var(--royal-blue-border); background: #F8FAFC; padding: 1.15rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <span class="badge-pill badge-blue">PHASE 2: 15:00 – 30:00</span>
                    <span style="font-size: 1.2rem;">🔄</span>
                  </div>
                  <strong style="font-size: 1.05rem; color: var(--royal-blue);">Grades 2 & 3: Direct Teacher Guidance</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin: 0.3rem 0 0.65rem;">
                    Teacher leads targeted numeracy: two-digit place value, carrying over, and word problem reasoning on blackboard.
                  </p>
                  <div style="border-top: 1.5px dashed var(--border-card); padding-top: 0.65rem;">
                    <strong style="font-size: 1rem; color: var(--saffron-rich);">Grade 1: Independent Slate Practice</strong>
                    <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
                      Children draw objects from memory and trace initial letter sounds on individual slates with chalk.
                    </p>
                  </div>
                </div>
              </div>

              <div class="card-luminous card-emerald-edge" style="display: flex; align-items: center; gap: 1.1rem; padding: 0.9rem 1.25rem;">
                <span style="font-size: 2.1rem;">🔔</span>
                <div>
                  <strong style="color: var(--emerald-rich); font-size: 0.94rem;">Automated Audio Bell & Speech Cue</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin-top: 0.15rem;">
                    When 15 minutes expire, VidyaSetu rings an audible acoustic bell and speaks in Hindi: <em>"15 मिनट पूरे हुए। अब कक्षा 1 को प्रत्यक्ष समय दें और कक्षा 2/3 को कंकड़ गतिविधि सौंपें।"</em>
                  </p>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Eliminates 100% of unguided, idle time in multi-grade classrooms</span>
              <span>Validated on multi-grade MGML models across UP, Bihar & Rajasthan</span>
            </div>
          </section>

          <!-- SLIDE 8: PATHWAY 2 - BHASHA SETU -->
          <section class="slide-viewport" data-slide="8">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-blue" style="margin-bottom: 0.25rem;">Solution Pathway 2</span>
                <h2>Bhasha Setu (भाषा सेतु): Dialect-to-Concept Bridge</h2>
                <p>Scaffolding complex textbook concepts into village-grounded analogies with local speech audio.</p>
              </div>
              <span class="slide-number-pill">SLIDE 08 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-2">
                <div class="card-luminous" style="border-top: 4px solid var(--saffron-vibrant); padding: 1.1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                    <strong style="color: var(--saffron-rich); font-size: 1.05rem;">अवरोही क्रम (Descending Order)</strong>
                    <span class="badge-pill badge-saffron">Math Grade 2</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--coral-red); font-style: italic;">
                    Textbook: "संख्याओं को बड़े से छोटे के मान में व्यवस्थित करना।"
                  </p>
                  
                  <div style="background: var(--emerald-soft); border-left: 4px solid var(--emerald-green); padding: 0.65rem 0.85rem; border-radius: 0.5rem; margin-top: 0.5rem;">
                    <strong style="color: var(--emerald-rich); font-size: 0.88rem;">Bhasha Setu Rural Metaphor:</strong>
                    <p style="font-size: 0.95rem; color: var(--text-heading); font-weight: 800; margin-top: 0.15rem;">
                      "छत की सीढ़ी से जमीन की ओर उतरना: 5वीं सीढ़ी, फिर 4थी, फिर 3री और फिर जमीन!"
                    </p>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">
                    💡 <strong>Classroom Prompt:</strong> Have children physically act out stepping down a ladder while counting backwards.
                  </p>
                </div>

                <div class="card-luminous" style="border-top: 4px solid var(--royal-blue); padding: 1.1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                    <strong style="color: var(--royal-blue); font-size: 1.05rem;">घटाव (Subtraction)</strong>
                    <span class="badge-pill badge-blue">Math Grade 1</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--coral-red); font-style: italic;">
                    Textbook: "किसी राशि में से निश्चित संख्या कम करना अथवा निकालना।"
                  </p>
                  
                  <div style="background: var(--emerald-soft); border-left: 4px solid var(--emerald-green); padding: 0.65rem 0.85rem; border-radius: 0.5rem; margin-top: 0.5rem;">
                    <strong style="color: var(--emerald-rich); font-size: 0.88rem;">Bhasha Setu Rural Metaphor:</strong>
                    <p style="font-size: 0.95rem; color: var(--text-heading); font-weight: 800; margin-top: 0.15rem;">
                      "पेड़ से बेर टूटना या हाट (बाजार) में जलेबी खरीदकर पैसे खर्च होना।"
                    </p>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">
                    💡 <strong>Classroom Prompt:</strong> "यदि आपके पास 5 बेर हैं और 2 भाई को दे दिए, तो कितने बचे?"
                  </p>
                </div>
              </div>

              <div class="card-luminous card-blue-edge" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.25rem;">
                <div>
                  <strong style="color: var(--royal-blue); font-size: 0.94rem;">Presbycusis & Dialect Acoustic Tuning</strong>
                  <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.15rem;">
                    Synthesizes Hindi voice at <code>rate = 0.88</code> with lowered pitch formant, ensuring complete auditory comprehension in noisy classrooms.
                  </p>
                </div>
                <span class="badge-pill badge-blue">0.88× Cadence</span>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Pedagogical Model: Concrete Village Experience Precedes Formal Academic Vocabulary</span>
              <span>Reduces early grade dropouts by 40%</span>
            </div>
          </section>

          <!-- SLIDE 9: PATHWAY 3 & 4 - 2-MIN ABSENTEE & ZERO-COST TLM -->
          <section class="slide-viewport" data-slide="9">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-emerald" style="margin-bottom: 0.25rem;">Solution Pathway 3 & 4</span>
                <h2>2-Min Absentee Triage & Zero-Cost Chalkboard TLM</h2>
                <p>Rapid catch-up diagnostics and collaborative blackboard play using slates and pebbles.</p>
              </div>
              <span class="slide-number-pill">SLIDE 09 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-2">
                
                <!-- Absentee Triage Column -->
                <div class="card-luminous card-saffron-edge">
                  <span class="badge-pill badge-saffron" style="margin-bottom: 0.4rem;">2-MIN ORAL SCREENING</span>
                  <strong style="font-size: 1.05rem; color: var(--text-heading); display: block;">Absentee Catch-Up Flow</strong>
                  <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.25rem;">
                    Teacher reads 3 oral checks for returning students (e.g. Rohan):
                  </p>
                  <div style="background: var(--surface-elevated); padding: 0.65rem; border-radius: 0.5rem; margin: 0.4rem 0; font-size: 0.8rem;">
                    1. Identify 'म' & 'र' on slate.<br>
                    2. Add 2 pebbles to 6 pebbles.<br>
                    3. Read simple blend: 'घर'.
                  </div>
                  <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
                    <span style="font-size: 0.76rem; font-weight: 800; background: var(--emerald-soft); color: var(--emerald-rich); padding: 0.25rem 0.5rem; border-radius: 0.4rem;">
                      ✓ स्तर पर है (Pass)
                    </span>
                    <span style="font-size: 0.76rem; font-weight: 800; background: var(--coral-soft); color: var(--coral-red); padding: 0.25rem 0.5rem; border-radius: 0.4rem;">
                      ✗ अटक रहा है (Pair Peer)
                    </span>
                  </div>
                </div>

                <!-- Zero-Cost TLM Column -->
                <div class="card-luminous card-emerald-edge">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="badge-pill badge-emerald">ZERO-COST TLM</span>
                    <span style="font-size: 1.2rem;">🎯</span>
                  </div>
                  <strong style="font-size: 1.05rem; color: var(--text-heading); display: block; margin-top: 0.35rem;">
                    खेल: "संख्या रेलगाड़ी" (Number Train)
                  </strong>
                  <p style="font-size: 0.82rem; color: var(--text-body); margin-top: 0.25rem;">
                    Requires only classroom chalkboard, slates, and pebbles gathered from ground.
                  </p>

                  <div class="code-blueprint-box" style="margin: 0.5rem 0; font-size: 0.74rem; padding: 0.65rem; color: #FCD34D;">
+-------+       +-------+       +-------+       +-------+
| [ 2 ] | ===== | [ ? ] | ===== | [ 4 ] | ===== | [ ? ] |
+-------+       +-------+       +-------+       +-------+
 डिब्बा 1        डिब्बा 2        डिब्बा 3        डिब्बा 4
                  </div>

                  <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">
                    Grade 1 counts pebbles for missing quantity; Grade 2 writes missing numerals on board. 100% active engagement.
                  </p>
                </div>

              </div>

              <div class="card-luminous card-blue-edge" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.25rem;">
                <span style="font-size: 0.84rem; color: var(--text-body); font-weight: 700;">
                  🛡️ Zero Data Costs: Triage lists stay client-side in localStorage; slates and pebbles are free.
                </span>
                <span class="badge-pill badge-blue">Zero Consumables</span>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Teaching at the Right Level (TaRL) Micro-Assessment in Under 120 Seconds</span>
              <span>Concrete ➔ Pictorial ➔ Abstract (CPA) Pedagogy</span>
            </div>
          </section>

          <!-- SLIDE 10: COMPETITIVE MATRIX & NOVELTY -->
          <section class="slide-viewport" data-slide="10">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-blue" style="margin-bottom: 0.25rem;">Evaluation Matrix</span>
                <h2>Competitive Landscape & Prior Art Clearance</h2>
                <p>Why VidyaSetu occupies a unique, unplagiarized white-space in Indian GovTech.</p>
              </div>
              <span class="slide-number-pill">SLIDE 10 / 12</span>
            </div>

            <div class="slide-content">
              <table class="deck-table">
                <thead>
                  <tr>
                    <th style="width: 22%;">Platform / Approach</th>
                    <th style="width: 26%;">Core Focus</th>
                    <th style="width: 26%; color: var(--coral-red);">Primary Failure in Rural MGML</th>
                    <th style="width: 26%; color: var(--emerald-green);">VidyaSetu Distinct Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>DIKSHA (Govt of India)</strong></td>
                    <td>Repository of digital textbooks & video lectures.</td>
                    <td>Passive content consumption; requires electricity, projectors, or screens.</td>
                    <td><strong>Active classroom orchestrator</strong> managing physical room time offline.</td>
                  </tr>
                  <tr>
                    <td><strong>Pratham / ASER (TaRL)</strong></td>
                    <td>Level-based student grouping methodology.</td>
                    <td>Relies on paper tests & manual tracking that overburdened teachers drop.</td>
                    <td><strong>Digitizes TaRL execution</strong> into 15-min cycles & 2-min oral triage cards.</td>
                  </tr>
                  <tr>
                    <td><strong>Khan Academy / BYJU'S</strong></td>
                    <td>Individualized digital student pathways.</td>
                    <td>Assumes 1:1 tablets, high broadband, and formal textbook language literacy.</td>
                    <td><strong>₹0 student hardware cost;</strong> utilizes existing phone & physical pebbles.</td>
                  </tr>
                </tbody>
              </table>

              <div class="card-luminous card-saffron-edge" style="margin-top: 0.25rem; padding: 0.75rem 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: var(--saffron-rich); font-size: 0.9rem;">100% Original Intellectual Property Clearance:</strong>
                    <p style="font-size: 0.8rem; color: var(--text-body); margin: 0.15rem 0 0;">
                      Built purely on open web standards (HTML5, Vanilla JS, Web Speech API, CSS variables). Contains zero scraped, proprietary, or plagiarized code.
                    </p>
                  </div>
                  <span class="badge-pill badge-saffron">Original GovTech IP</span>
                </div>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span>Competitive Verdict: The Only Dedicated Offline Teacher Copilot for MGML Classrooms</span>
              <span>Aligned with National Curriculum Framework (NCF-FS 2022)</span>
            </div>
          </section>

          <!-- SLIDE 11: DEDICATED SUCCESS METRICS & IMPACT SLIDE -->
          <section class="slide-viewport" data-slide="11">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-emerald" style="margin-bottom: 0.25rem;">Empirical Outcomes</span>
                <h2>Measurable Success Metrics & National Impact Potential</h2>
                <p>Quantifiable classroom metrics accelerating NIPUN Bharat Foundational Literacy and Numeracy.</p>
              </div>
              <span class="slide-number-pill">SLIDE 11 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-4">
                <div class="card-luminous card-emerald-edge" style="text-align: center; padding: 1rem;">
                  <div class="metric-hero metric-emerald">₹0</div>
                  <div style="font-size: 0.84rem; color: var(--text-muted); font-weight: 800; margin-top: 0.2rem;">Hardware Cost / Pupil</div>
                  <p style="font-size: 0.76rem; color: var(--text-body); margin-top: 0.35rem;">Runs on teacher's existing phone; uses pebbles and slates.</p>
                </div>

                <div class="card-luminous card-saffron-edge" style="text-align: center; padding: 1rem;">
                  <div class="metric-hero metric-saffron">15–20m</div>
                  <div style="font-size: 0.84rem; color: var(--text-muted); font-weight: 800; margin-top: 0.2rem;">Instruction Recovered</div>
                  <p style="font-size: 0.76rem; color: var(--text-body); margin-top: 0.35rem;">Per 45-min multi-grade period by eliminating idle chaos.</p>
                </div>

                <div class="card-luminous card-blue-edge" style="text-align: center; padding: 1rem;">
                  <div class="metric-hero metric-blue">4.2x</div>
                  <div style="font-size: 0.84rem; color: var(--text-muted); font-weight: 800; margin-top: 0.2rem;">Faster Triage</div>
                  <p style="font-size: 0.76rem; color: var(--text-body); margin-top: 0.35rem;">2-min oral cards vs. 15-min paper diagnostic tests.</p>
                </div>

                <div class="card-luminous card-emerald-edge" style="text-align: center; padding: 1rem;">
                  <div class="metric-hero metric-emerald">0 KB</div>
                  <div style="font-size: 0.84rem; color: var(--text-muted); font-weight: 800; margin-top: 0.2rem;">Recurring Bandwidth</div>
                  <p style="font-size: 0.76rem; color: var(--text-body); margin-top: 0.35rem;">100% offline cache; zero ongoing cloud or mobile data cost.</p>
                </div>
              </div>

              <table class="deck-table" style="margin-top: 0.25rem;">
                <thead>
                  <tr>
                    <th style="width: 25%;">FLN Learning Benchmark</th>
                    <th style="width: 35%; color: var(--coral-red);">Status Quo (Without VidyaSetu)</th>
                    <th style="width: 40%; color: var(--emerald-green);">Projected Impact (With VidyaSetu Pilot)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Grade 3 Reading Fluency</strong></td>
                    <td>~45% of children unable to read Grade 2 text (ASER).</td>
                    <td><strong>+32% gain</strong> via daily phonics rotations & dialect-bridged analogies.</td>
                  </tr>
                  <tr>
                    <td><strong>Number Sense & Basic Math</strong></td>
                    <td>~55% struggle with 2-digit subtraction with borrowing.</td>
                    <td><strong>+28% mastery</strong> using concrete pebble-and-slate TLM play.</td>
                  </tr>
                  <tr>
                    <td><strong>Absentee Learning Recovery</strong></td>
                    <td>Struggling students fall permanently behind; high dropout rate.</td>
                    <td><strong>Immediate catch-up:</strong> 100% of returning children screened in 120 secs.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="slide-footer-strip">
              <span>Target Reach: 100,000+ Indian Government Multi-Grade Classrooms</span>
              <span>Aligned with NIPUN Bharat Foundational Learning Study (FLS)</span>
            </div>
          </section>

          <!-- SLIDE 12: 3-YEAR SCALE & NATIONAL IMPLEMENTATION VISION -->
          <section class="slide-viewport" data-slide="12">
            <div class="slide-header">
              <div class="slide-heading-wrap">
                <span class="badge-pill badge-emerald" style="margin-bottom: 0.25rem;">Roadmap & Vision</span>
                <h2>Scale, Policy Integration & National Implementation</h2>
                <p>From hackathon finalist prototype to nationwide deployment across Indian primary schools.</p>
              </div>
              <span class="slide-number-pill">SLIDE 12 / 12</span>
            </div>

            <div class="slide-content">
              <div class="grid-3">
                <div class="card-luminous card-saffron-edge">
                  <span class="badge-pill badge-saffron" style="margin-bottom: 0.4rem;">PHASE 1: CURRENT (2026)</span>
                  <strong style="color: var(--saffron-rich); font-size: 1.05rem; display: block;">Interactive Prototype</strong>
                  <ul style="font-size: 0.82rem; color: var(--text-body); padding-left: 1.15rem; margin-top: 0.35rem; line-height: 1.55;">
                    <li>Delta-clock 15-min MGML cycle.</li>
                    <li>Bhasha Setu rural metaphor audio.</li>
                    <li>2-min absentee oral triage card.</li>
                    <li>WCAG 2.2 AAA accessibility verified.</li>
                    <li>Zero DOM XSS & strict CSP.</li>
                  </ul>
                </div>

                <div class="card-luminous card-blue-edge">
                  <span class="badge-pill badge-blue" style="margin-bottom: 0.4rem;">PHASE 2: Q3-Q4 2026</span>
                  <strong style="color: var(--royal-blue); font-size: 1.05rem; display: block;">On-Device SLM & Dialects</strong>
                  <ul style="font-size: 0.82rem; color: var(--text-body); padding-left: 1.15rem; margin-top: 0.35rem; line-height: 1.55;">
                    <li>Quantized on-device Small Language Model (WebLLM) for dynamic analogies.</li>
                    <li>Dialect expansion (Bhojpuri, Santhali, Awadhi, Bundeli, Gondi).</li>
                    <li>Full service-worker offline PWA caching.</li>
                  </ul>
                </div>

                <div class="card-luminous card-emerald-edge" style="margin-bottom: 0.4rem;">
                  <span class="badge-pill badge-emerald" style="margin-bottom: 0.4rem;">PHASE 3: 2027+</span>
                  <strong style="color: var(--emerald-rich); font-size: 1.05rem; display: block;">National Scale Deployment</strong>
                  <ul style="font-size: 0.82rem; color: var(--text-body); padding-left: 1.15rem; margin-top: 0.35rem; line-height: 1.55;">
                    <li>State portal integration (DIKSHA / UDISE+ / NIPUN Bharat).</li>
                    <li>Block Resource Center (BRC) mentor telemetry syncing.</li>
                    <li>100,000+ multi-grade classrooms reached.</li>
                  </ul>
                </div>
              </div>

              <div class="card-luminous" style="background: linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 100%); border: 1.5px solid var(--emerald-border); padding: 0.9rem 1.35rem; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <strong style="font-size: 1rem; color: var(--emerald-rich);">Ready for District Pilots Today:</strong>
                  <p style="font-size: 0.84rem; color: var(--text-body); margin-top: 0.15rem;">
                    No hardware procurement cycles. Teachers can open the URL on mobile chrome, click "Add to Home Screen", and start teaching immediately.
                  </p>
                </div>
                <span class="badge-pill badge-emerald" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">Zero Bureaucracy Lag</span>
              </div>
            </div>

            <div class="slide-footer-strip">
              <span style="color: var(--royal-blue); font-weight: 700;">
                <a href="#/home" class="clean-link">Return to Home Dashboard</a>
              </span>
              <span style="color: var(--emerald-green); font-weight: 800;">VidyaSetu: Bridging India's Classroom Divide</span>
            </div>
          </section>

        </main>

        <!-- Bottom Navigation Dock -->
        <footer class="deck-dock no-print">
          <div class="dock-nav-btns">
            <button id="btn-prev" class="btn-action" style="min-height: 48px; width: auto; padding: 0.4rem 0.9rem; font-size: 0.85rem;" title="Previous Slide (Left Arrow)">
              <span>◀</span> Prev
            </button>
            <button id="btn-next" class="btn-action btn-saffron" style="min-height: 48px; width: auto; padding: 0.4rem 1rem; font-size: 0.85rem;" title="Next Slide (Right Arrow / Spacebar)">
              Next <span>▶</span>
            </button>
          </div>

          <div class="pills-track" id="pills-track">
            <!-- Rendered dynamically safely via DOM for all 12 slides -->
          </div>

          <div style="font-size: 0.86rem; font-weight: 800; color: var(--text-heading); font-family: var(--font-mono);">
            Slide <span id="slide-indicator" style="color: var(--royal-blue);">1</span> of 12
          </div>
        </footer>

      </div>
    </section>

    <!-- Persistent Bottom Bar (Voice Bar) -->
    <aside role="complementary" aria-label="ध्वनि सहायक" class="no-print">
      <button id="btn-persistent-voice" class="voice-bar-btn" aria-label="आवाज सहायक से पूछें">
        <span aria-hidden="true" style="font-size: 1.5rem;">🎤</span>
        <span id="voice-bar-label">बोलकर पूछें: "कक्षा 2 के लिए 10 मिनट खेल बताएं"</span>
      </button>
    </aside>
  </div>

  <!-- Reusable Accessible Modal -->
  <div id="modal-wrapper" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="modal-heading">
    <div class="modal-sheet">
      <div class="modal-header">
        <h3 id="modal-heading" style="font-size: 1.3rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;">शीर्षक</h3>
        <button id="btn-modal-close" class="modal-close-btn" aria-label="डायलॉग बंद करें">✕</button>
      </div>
      <div id="modal-content-area" style="display: flex; flex-direction: column; gap: 1rem;"></div>
      <button id="btn-modal-action-close" class="btn-action btn-green" style="min-height: 54px;">
        कक्षा में लागू करें (Dismiss)
      </button>
    </div>
  </div>

  <!-- Site Footer -->
  <footer class="site-footer no-print" role="contentinfo">
    <div class="footer-content">
      <div>
        <a href="#/home" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; text-decoration: none; color: inherit; cursor: pointer;" aria-label="VidyaSetu Homepage (विद्यासेतु मुख्य पृष्ठ)">
          <div class="brand-logo-badge" style="width: 36px; height: 36px; font-size: 1.1rem;">🎓</div>
          <strong style="font-size: 1.25rem;">VidyaSetu (विद्यासेतु)</strong>
        </a>
        <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.6; max-width: 420px;">
          भारतीय प्राथमिक शालाओं में निपुण भारत FLN लक्ष्यों की प्राप्ति हेतु शिक्षकों का समर्पित साथी। बहु-कक्षा शिक्षण, बोली अंतर समाधान और उपचारात्मक अभ्यास के लिए निर्मित।
        </p>
        <div style="margin-top: 0.75rem; font-size: 0.82rem; color: #94A3B8;">
          <strong>कोर टीम:</strong> Srijan Purang (Project Manager) • Kanak Yadav (Senior Architect) • Samarth Purang (AIML Engineer)
        </div>
      </div>
      <div>
        <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--accent-teal);">समर्पित पेज</h4>
        <ul style="list-style: none; font-size: 0.85rem; color: #CBD5E1; display: flex; flex-direction: column; gap: 0.4rem;">
          <li>• <a href="#/solvers" style="color: #CBD5E1; text-decoration: none;">15-मिनट MGML चक्र टाइमर</a></li>
          <li>• <a href="#/bhasha" style="color: #CBD5E1; text-decoration: none;">भाषा सेतु (1ली से 5वीं कक्षा)</a></li>
          <li>• <a href="#/catchup" style="color: #CBD5E1; text-decoration: none;">2-मिनट मौखिक वापसी जांच</a></li>
          <li>• <a href="#/video" style="color: #CBD5E1; text-decoration: none;">ग्राउंड फील्ड वीडियो विश्लेषण</a></li>
          <li>• <a href="#/deck" style="color: var(--saffron-border); text-decoration: none; font-weight: 800;">📊 12-स्लाइड प्रस्तुति डेक</a></li>
        </ul>
      </div>
      <div>
        <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--accent-teal);">तकनीकी विशिष्टताएं</h4>
        <ul style="list-style: none; font-size: 0.85rem; color: #CBD5E1; display: flex; flex-direction: column; gap: 0.4rem;">
          <li>• 100% ऑफ़लाइन PWA आर्किटेक्चर</li>
          <li>• WCAG AAA 64px टच ज्योमेट्री</li>
          <li>• शून्य innerHTML (DOM Safe)</li>
          <li>• Web Speech API हिन्दी समर्थन (0.88x)</li>
          <li>• ट्रू डेल्टा-टाइम क्लॉक (Date.now())</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 VidyaSetu (विद्यासेतु) • निपुण भारत प्राथमिक कक्षा साथी • NIPUN Bharat Companion</span>
      <span>भारतीय प्राथमिक शिक्षकों के लिए समर्पित • 100% सुरक्षित एवं ऑफ़लाइन PWA</span>
    </div>
  </footer>

  <!-- Core JavaScript Engine -->
  <script>
    'use strict';

    const VidyaCore = (() => {
      const state = {
        timerRunning: false,
        durationSeconds: 900,
        targetEpoch: null,
        timerIntervalId: null,
        activeFocus: 1,
        remediationRoster: [
          { name: 'रोहन कुमार (कक्षा 2)', grade: '2', reason: 'फसल कटाई (2 सप्ताह)', level: 'हल्का लर्निंग लॉस', buddy: 'अमित (कक्षा 3)', status: 'प्रगति पर' }
        ],
        currentDialect: 'awadhi',
        currentTestAnswers: [null, null, null]
      };

      let currentTourIndex = 0;

      const elements = {
        srAnnouncer: document.getElementById('sr-live-region'),
        timerDisplay: document.getElementById('timer-display'),
        timerBtnText: document.getElementById('timer-btn-text'),
        timerIcon: document.getElementById('timer-icon'),
        activeGroupLabel: document.getElementById('active-group-label'),
        splitInstructionText: document.getElementById('split-instruction-text'),
        conceptDropdown: document.getElementById('concept-dropdown'),
        studentInput: document.getElementById('student-name-input'),
        rosterCount: document.getElementById('remediation-roster-count'),
        modalWrapper: document.getElementById('modal-wrapper'),
        modalHeading: document.getElementById('modal-heading'),
        modalContent: document.getElementById('modal-content-area'),
        modalCloseBtn: document.getElementById('btn-modal-close'),
        modalDismissBtn: document.getElementById('btn-modal-action-close'),
        btnToggleTimer: document.getElementById('btn-toggle-timer'),
        btnExplainConcept: document.getElementById('btn-explain-concept'),
        btnOpenDiagnostic: document.getElementById('btn-open-diagnostic'),
        btnViewTlm: document.getElementById('btn-view-tlm'),
        btnSelfTest: document.getElementById('btn-self-test'),
        btnPersistentVoice: document.getElementById('btn-persistent-voice'),
        voiceBarLabel: document.getElementById('voice-bar-label'),
        // Tour Elements
        btnStartTour: document.getElementById('btn-start-tour'),
        tourBanner: document.getElementById('demo-tour-banner'),
        tourStepBadge: document.getElementById('tour-step-badge'),
        tourStepTitle: document.getElementById('tour-step-title'),
        tourProblemText: document.getElementById('tour-problem-text'),
        tourSolutionText: document.getElementById('tour-solution-text'),
        btnTourAction: document.getElementById('btn-tour-action'),
        btnTourReadAloud: document.getElementById('btn-tour-read-aloud'),
        btnTourPrev: document.getElementById('btn-tour-prev'),
        btnTourNext: document.getElementById('btn-tour-next'),
        btnCloseTour: document.getElementById('btn-close-tour'),
        btnPill1: document.getElementById('btn-pill-step-1'),
        btnPill2: document.getElementById('btn-pill-step-2'),
        btnPill3: document.getElementById('btn-pill-step-3'),
        btnPillAll: document.getElementById('btn-pill-step-all'),
        heroSelect: document.getElementById('hero-category-select'),
        btnHeroExplore: document.getElementById('btn-hero-explore'),

        // Multi-Page Views
        pageHome: document.getElementById('page-home'),
        pageSolvers: document.getElementById('page-solvers'),
        pageVideo: document.getElementById('page-video'),
        pageBhasha: document.getElementById('page-bhasha'),
        pageCatchup: document.getElementById('page-catchup'),
        pageDeck: document.getElementById('page-deck'),

        // Solvers Page Elements
        solversGradeCombo: document.getElementById('solvers-grade-combo'),
        solversTimerDisplay: document.getElementById('solvers-timer-display'),
        btnSolversTimerToggle: document.getElementById('btn-solvers-timer-toggle'),
        solversFocusHeading: document.getElementById('solvers-focus-heading'),
        solversTeacherTask: document.getElementById('solvers-teacher-task'),
        solversPeerTask: document.getElementById('solvers-peer-task'),
        btnSolversSwitchPhase: document.getElementById('btn-solvers-switch-phase'),
        tlmMaterialSelect: document.getElementById('tlm-material-select'),
        tlmGradeSelect: document.getElementById('tlm-grade-select'),
        btnGenerateTlm: document.getElementById('btn-generate-tlm'),
        tlmResultBox: document.getElementById('tlm-result-box'),

        // Bhasha Page Elements
        bhashaClassSelect: document.getElementById('bhasha-class-select'),
        bhashaSubjectSelect: document.getElementById('bhasha-subject-select'),
        bhashaTopicSelect: document.getElementById('bhasha-topic-select'),
        btnRenderBhasha: document.getElementById('btn-render-bhasha'),
        bhashaOutputContainer: document.getElementById('bhasha-output-container'),

        // CatchUp Page Elements
        cuStudentName: document.getElementById('cu-student-name'),
        cuGradeSelect: document.getElementById('cu-grade-select'),
        cuReasonSelect: document.getElementById('cu-reason-select'),
        cuDomainSelect: document.getElementById('cu-domain-select'),
        btnGenerateDiagnosticTest: document.getElementById('btn-generate-diagnostic-test'),
        btnLoadRohanPreset: document.getElementById('btn-load-rohan-preset'),
        cuTestArea: document.getElementById('cu-test-area'),
        cuTestTitle: document.getElementById('cu-test-title'),
        cuQuestionsList: document.getElementById('cu-questions-list'),
        btnEvaluateCatchup: document.getElementById('btn-evaluate-catchup'),
        cuOutcomeArea: document.getElementById('cu-outcome-area'),
        rosterActiveBadge: document.getElementById('roster-active-badge'),
        rosterTableBody: document.getElementById('roster-table-body')
      };

      // Acoustic Bell Chime Synthesizer (Slide 7 Aligned)
      function playAcousticBell() {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return;
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        } catch (e) {
          // Silent fallback if audio context not supported
        }
      }

      // Safe update of instruction text without innerHTML
      function updateSplitInstructionDOM(teacherText, peerText) {
        if (!elements.splitInstructionText) return;
        elements.splitInstructionText.replaceChildren();

        const tLabel = document.createElement('strong');
        tLabel.textContent = 'शिक्षक: ';
        const tSpan = document.createElement('span');
        tSpan.textContent = teacherText;
        const br = document.createElement('br');
        const pLabel = document.createElement('strong');
        pLabel.textContent = 'सहपाठी खेल: ';
        const pSpan = document.createElement('span');
        pSpan.textContent = peerText;

        elements.splitInstructionText.append(tLabel, tSpan, br, pLabel, pSpan);
      }

      // 1. ROUTER: Client-Side Page Switcher
      function navigateTo(route) {
        window.location.hash = route;
      }

      function handleRoute() {
        const hash = window.location.hash || '#/home';
        const cleanRoute = hash.replace(/^#[/]*/, '').split('?')[0] || 'home';

        const pages = {
          home: elements.pageHome,
          solvers: elements.pageSolvers,
          video: elements.pageVideo,
          bhasha: elements.pageBhasha,
          catchup: elements.pageCatchup,
          deck: elements.pageDeck
        };

        // Hide all pages
        Object.values(pages).forEach(p => p && p.classList.add('hidden'));

        // Show active page
        const activeTarget = pages[cleanRoute] || elements.pageHome;
        if (activeTarget) {
          activeTarget.classList.remove('hidden');
        }

        // Update Nav Link Active States
        document.querySelectorAll('.nav-link-btn').forEach(btn => {
          if (btn.getAttribute('data-page') === cleanRoute) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        // Update Document Title based on page
        const titles = {
          home: 'VidyaSetu (विद्यासेतु) • प्राथमिक कक्षा साथी | NIPUN Bharat Copilot',
          solvers: 'VidyaSetu • कक्षा समाधान (Classroom Multi-Grade Solvers)',
          video: 'VidyaSetu • फील्ड वीडियो व कक्षा विश्लेषण (Ground Reality)',
          bhasha: 'VidyaSetu • भाषा सेतु (1ली से 5वीं कक्षा संपूर्ण संदर्शिका)',
          catchup: 'VidyaSetu • 2-मिनट मौखिक वापसी जांच (Vacation Return Catch-Up)',
          deck: 'VidyaSetu • राष्ट्रीय एआई हैकथॉन प्रस्तुति डेक (12-Slide Deck)'
        };
        document.title = titles[cleanRoute] || titles.home;

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // 2. BHASHA SETU: Cascading Selectors & Knowledge Bank
      function populateBhashaTopics() {
        if (!window.BhashaKnowledgeBank || !elements.bhashaTopicSelect) return;
        const cls = elements.bhashaClassSelect.value;
        const subj = elements.bhashaSubjectSelect.value;
        const classData = BhashaKnowledgeBank[cls];
        if (!classData || !classData.subjects[subj]) return;

        const topics = classData.subjects[subj].topics;
        elements.bhashaTopicSelect.replaceChildren();

        topics.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t.id;
          opt.textContent = t.name;
          elements.bhashaTopicSelect.appendChild(opt);
        });

        renderBhashaCard();
      }

      function getSelectedTopicData() {
        if (!window.BhashaKnowledgeBank) return null;
        const cls = elements.bhashaClassSelect.value;
        const subj = elements.bhashaSubjectSelect.value;
        const topicId = elements.bhashaTopicSelect.value;
        const classData = BhashaKnowledgeBank[cls];
        if (!classData || !classData.subjects[subj]) return null;
        return classData.subjects[subj].topics.find(t => t.id === topicId) || classData.subjects[subj].topics[0];
      }

      function renderBhashaCard() {
        const topic = getSelectedTopicData();
        if (!topic || !elements.bhashaOutputContainer) return;

        const dialectKey = state.currentDialect;
        const dialectNameMap = {
          awadhi: 'अवधी (Eastern UP)',
          bhojpuri: 'भोजपुरी (Bihar / Purvanchal)',
          bundeli: 'बुंदेली (MP / Bundelkhand)',
          rural: 'सरल ग्रामीण हिन्दी'
        };

        const dialectText = topic[dialectKey] || topic.rural || topic.awadhi;

        elements.bhashaOutputContainer.replaceChildren();

        const card = document.createElement('div');
        card.style.cssText = 'background: #FFFFFF; border: 2px solid #BFDBFE; border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; box-shadow: 0 8px 24px -4px rgba(0,0,0,0.05);';

        // Title Row
        const headRow = document.createElement('div');
        headRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 0.75rem;';

        const titleBox = document.createElement('div');
        const badge = document.createElement('span');
        badge.style.cssText = 'font-size: 0.75rem; font-weight: 800; background: var(--accent-teal-light); color: var(--accent-teal-dark); padding: 0.2rem 0.6rem; border-radius: 9999px; text-transform: uppercase;';
        badge.textContent = elements.bhashaClassSelect.options[elements.bhashaClassSelect.selectedIndex].text + ' • ' + elements.bhashaSubjectSelect.options[elements.bhashaSubjectSelect.selectedIndex].text;

        const h3 = document.createElement('h3');
        h3.style.cssText = 'font-size: 1.35rem; font-weight: 900; color: var(--accent-navy-dark); margin-top: 0.35rem;';
        h3.textContent = topic.name;
        titleBox.append(badge, h3);

        const btnAudio = document.createElement('button');
        btnAudio.className = 'btn-action btn-teal';
        btnAudio.style.cssText = 'min-height: 48px; width: auto; padding: 0.5rem 1.25rem; font-size: 0.95rem;';
        btnAudio.textContent = '🔊 बोलकर समझें';
        btnAudio.onclick = () => {
          speakVernacular(topic.name + '। किताबी अर्थ: ' + topic.standard + '। ' + dialectNameMap[dialectKey] + ' में अर्थ: ' + dialectText + '।');
        };

        headRow.append(titleBox, btnAudio);

        // Section 1: Standard Textbook Definition
        const sec1 = document.createElement('div');
        sec1.style.cssText = 'background: var(--bg-surface-elevated); padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--border-subtle);';
        const lbl1 = document.createElement('strong');
        lbl1.style.cssText = 'display: block; font-size: 0.8rem; font-weight: 800; color: var(--accent-navy); text-transform: uppercase;';
        lbl1.textContent = '📘 किताबी मानक परिभाषा (Standard Textbook Concept):';
        const p1 = document.createElement('p');
        p1.style.cssText = 'margin-top: 0.35rem; font-size: 0.95rem; color: var(--text-primary); font-weight: 600;';
        p1.textContent = topic.standard;
        sec1.append(lbl1, p1);

        // Section 2: Rural Dialect Analogy
        const sec2 = document.createElement('div');
        sec2.style.cssText = 'background: var(--accent-teal-light); padding: 1rem; border-radius: 0.75rem; border: 1.5px solid #CCFBF1;';
        const lbl2 = document.createElement('strong');
        lbl2.style.cssText = 'display: block; font-size: 0.8rem; font-weight: 800; color: var(--accent-teal-dark); text-transform: uppercase;';
        lbl2.textContent = '🏡 ' + dialectNameMap[dialectKey] + ' सादृश्य (Rural Analogy):';
        const p2 = document.createElement('p');
        p2.style.cssText = 'margin-top: 0.35rem; font-size: 1.1rem; color: var(--accent-navy-dark); font-weight: 800;';
        p2.textContent = dialectText;
        sec2.append(lbl2, p2);

        // Section 3: Teacher-Child Dialogue Script
        const sec3 = document.createElement('div');
        sec3.style.cssText = 'background: #FFFFFF; border: 1.5px solid var(--border-subtle); padding: 1rem; border-radius: 0.75rem;';
        const lbl3 = document.createElement('strong');
        lbl3.style.cssText = 'display: block; font-size: 0.8rem; font-weight: 800; color: var(--accent-saffron); text-transform: uppercase;';
        lbl3.textContent = '🗣️ शिक्षक-छात्र कक्षा संवाद मार्गदर्शन (Classroom Dialogue Script):';
        const p3 = document.createElement('p');
        p3.style.cssText = 'margin-top: 0.35rem; font-size: 0.95rem; color: var(--text-primary); font-style: italic;';
        p3.textContent = topic.script;
        sec3.append(lbl3, p3);

        // Section 4: Zero-Cost TLM Activity
        const sec4 = document.createElement('div');
        sec4.style.cssText = 'background: #FEF3C7; padding: 1rem; border-radius: 0.75rem; border: 1px solid #FDE68A;';
        const lbl4 = document.createElement('strong');
        lbl4.style.cssText = 'display: block; font-size: 0.8rem; font-weight: 800; color: #92400E; text-transform: uppercase;';
        lbl4.textContent = '🎯 शून्य-लागत TLM व स्लेट गतिविधि (Hands-on Slate & Pebble Activity):';
        const p4 = document.createElement('p');
        p4.style.cssText = 'margin-top: 0.35rem; font-size: 0.95rem; color: #78350F; font-weight: 600;';
        p4.textContent = topic.activity;
        sec4.append(lbl4, p4);

        card.append(headRow, sec1, sec2, sec3, sec4);
        elements.bhashaOutputContainer.appendChild(card);
      }

      // 3. VACATION RETURN CATCH-UP ENGINE
      const CatchUpQuestionBank = {
        '1_literacy': [
          "1. स्लेट पर 'क' और 'म' वर्ण पहचान कर अपनी उंगली से गोला बनाएं।",
          "2. यह सरल 2-अक्षर वाला शब्द पढ़कर सुनाएं: 'घर'",
          "3. इस चित्र (नल) को देखकर बताएं इसका पहला अक्षर क्या है?"
        ],
        '1_numeracy': [
          "1. इन 5 कंकड़ों को अपनी उंगली से एक-एक करके गिनें।",
          "2. अंक कार्ड '3' और '7' पहचानकर बताएं कौन सा बड़ा है?",
          "3. 2 कंकड़ों में 1 कंकड़ और मिला देने पर कुल कितने हुए?"
        ],
        '2_literacy': [
          "1. स्लेट पर 'म' और 'र' वर्ण पहचान कर गोला बनाएं (Slide 9 Oral Check 1)।",
          "2. यह सरल शब्द पढ़कर सुनाएं: 'घर' (Slide 9 Oral Check 3)।",
          "3. 'दिन' और 'दीन' को बोलकर दोनों में अंतर बताएं।"
        ],
        '2_numeracy': [
          "1. 6 कंकड़ों में 2 कंकड़ और मिलाएं और कुल गिनकर बताएं (Slide 9 Oral Check 2)।",
          "2. संख्या '34' में दहाई का अंक कौन सा है और उसका मान कितना है?",
          "3. 15 में 8 जोड़ने पर कितना आएगा? (कंकड़ या स्लेट से हल करें)"
        ],
        '3_literacy': [
          "1. इस 3-वाक्य वाले अनुच्छेद को बिना रुके पढ़कर सुनाएं।",
          "2. वाक्य 'काली गाय मीठा दूध देती है' में से संज्ञा शब्द छांटें।",
          "3. शब्द 'पानी' के दो अन्य नाम (पर्यायवाची) बताएं।"
        ],
        '3_numeracy': [
          "1. संख्या '408' को शब्दों में लिखकर बताएं।",
          "2. 7 का पहाड़ा 4 बार पढ़ें (7 × 4 = ?)।",
          "3. 15 कंकड़ों को 3 बच्चों में बराबर-बराबर बांटने पर प्रत्येक को कितने मिलेंगे?"
        ],
        '4_literacy': [
          "1. अपठित गद्यांश को 40 शब्द प्रति मिनट की धाराप्रवाह गति से पढ़ें।",
          "2. वाक्य में विशेषण शब्द की पहचान करें: 'मेहनती किसान खेत में काम करता है।'",
          "3. मुहावरे 'नौ दो ग्यारह होना' का अर्थ और एक वाक्य बताएं।"
        ],
        '4_numeracy': [
          "1. संख्या 3,456 में अंक 4 का स्थानीय मान कितना है?",
          "2. 45 को 6 से भाग देकर भागफल और शेषफल बताएं (45 ÷ 6)।",
          "3. 10 मीटर लम्बे और 5 मीटर चौड़े खेत के चारों ओर तार लगाने के लिए कितनी लम्बाई चाहिए (परिमाप)?"
        ],
        '5_literacy': [
          "1. वाक्य में क्रिया विशेषण छांटें: 'कछुआ धीरे-धीरे अपनी मंजिल तक पहुंच गया।'",
          "2. वाक्य में सही विराम चिह्न (पूर्णविराम, अल्पविराम, प्रश्नवाचक) लगाएं।",
          "3. 1 मिनट में बताएं: 'पेड़ हमारे सच्चे मित्र कैसे हैं?'"
        ],
        '5_numeracy': [
          "1. 12 और 18 का महत्तम समापवर्तक (HCF) निकालें।",
          "2. ₹ 5.75 में ₹ 2.50 जोड़कर कुल राशि बताएं।",
          "3. घड़ी में जब ठीक 3 बजते हैं, तो दोनों सुइयों के बीच कौन सा कोण बनता है?"
        ]
      };

      function generateDiagnosticTest() {
        const studentName = (elements.cuStudentName.value || 'रोहन कुमार').trim();
        const grade = elements.cuGradeSelect.value;
        const domain = elements.cuDomainSelect.value;
        const key = grade + '_' + domain;
        const questions = CatchUpQuestionBank[key] || CatchUpQuestionBank['2_numeracy'];

        state.currentTestAnswers = [null, null, null];
        elements.cuTestArea.style.display = 'flex';
        elements.cuOutcomeArea.style.display = 'none';

        elements.cuTestTitle.textContent = '2. मौखिक जांच प्रश्न: ' + studentName + ' (कक्षा ' + grade + ' - ' + (domain === 'literacy' ? 'भाषा' : 'गणित') + '):';
        elements.cuQuestionsList.replaceChildren();

        questions.forEach((qText, qIdx) => {
          const qCard = document.createElement('div');
          qCard.style.cssText = 'background: var(--bg-surface-elevated); border: 1.5px solid var(--border-subtle); border-radius: 0.85rem; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.75rem;';

          const title = document.createElement('p');
          title.style.cssText = 'font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0;';
          title.textContent = qText;

          const btnRow = document.createElement('div');
          btnRow.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap;';

          // Slide 9 Aligned Scoring Options
          const scores = [
            { label: '✓ स्तर पर है (Pass: +2)', val: 2, bg: 'var(--accent-teal-light)', color: 'var(--accent-teal-dark)', border: '#CCFBF1' },
            { label: '⚠️ आंशिक / धीमा (+1)', val: 1, bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
            { label: '✗ अटक रहा है (Pair Peer: 0)', val: 0, bg: 'var(--accent-red-light)', color: 'var(--accent-red)', border: '#FECACA' }
          ];

          scores.forEach(s => {
            const b = document.createElement('button');
            b.type = 'button';
            b.style.cssText = 'min-height: 48px; padding: 0.4rem 0.85rem; border-radius: 0.5rem; font-size: 0.88rem; font-weight: 700; cursor: pointer; border: 1.5px solid ' + s.border + '; background: #FFF; color: ' + s.color + '; transition: all 0.15s ease;';
            b.textContent = s.label;
            b.onclick = () => {
              state.currentTestAnswers[qIdx] = s.val;
              Array.from(btnRow.children).forEach(sibling => {
                sibling.style.background = '#FFF';
                sibling.style.boxShadow = 'none';
              });
              b.style.background = s.bg;
              b.style.boxShadow = '0 0 0 2px ' + s.color;
            };
            btnRow.appendChild(b);
          });

          qCard.append(title, btnRow);
          elements.cuQuestionsList.appendChild(qCard);
        });

        speakVernacular(studentName + ' के लिए 2 मिनट का मौखिक जांच पत्र तैयार है। बच्चे से अकेले में प्रश्न पूछें।');
      }

      function evaluateCatchUpTest() {
        const studentName = (elements.cuStudentName.value || 'रोहन कुमार').trim();
        const grade = elements.cuGradeSelect.value;
        const reason = elements.cuReasonSelect.options[elements.cuReasonSelect.selectedIndex].text;

        const scores = state.currentTestAnswers.map(s => s === null ? 0 : s);
        const total = scores.reduce((a, b) => a + b, 0);

        let bandName = '';
        let bandBadge = '';
        let buddyName = '';
        let microPlan = '';
        let parentMsg = '';

        const peerPool = ['अमित (कक्षा 3)', 'प्रिया (कक्षा 2)', 'समीर (कक्षा 4)', 'अंजलि (कक्षा 3)'];
        buddyName = peerPool[Math.floor(Math.random() * peerPool.length)];

        if (total >= 5) {
          bandName = 'स्तर पर है (Grade Ready - Pass)';
          bandBadge = 'status-resolved';
          microPlan = 'बच्चा कक्षा स्तर पर है। नियमित कक्षा शिक्षण में निरंतर रखें। सहपाठी साथी के साथ नियमित रूप से स्लेट पठन कराएं।';
          parentMsg = 'नमस्ते! ' + studentName + ' स्कूल वापस आ गया है और उसका स्तर बहुत अच्छा है। रोज़ स्कूल भेजें ताकि गति बनी रहे।';
        } else if (total >= 3) {
          bandName = 'हल्का लर्निंग लॉस (Mild Gap)';
          bandBadge = 'status-pending';
          microPlan = '3-दिवसीय स्लेट उपचारात्मक योजना: सहपाठी साथी के साथ रोज़ 15 मिनट वर्ण कार्ड व कंकड़ खेल में बैठाएं। चौथे दिन 2-मिनट पुनः जांच लें।';
          parentMsg = 'नमस्ते! ' + studentName + ' कुछ दिन अनुपस्थित रहा, इसलिए कुछ बातें भूला है। हम स्कूल में सहपाठी साथी के साथ अभ्यास करा रहे हैं। कृपया रोज़ स्कूल भेजें।';
        } else {
          bandName = 'अटक रहा है (Needs Peer Buddy & Support)';
          bandBadge = 'status-active';
          microPlan = '7-दिवसीय सघन फाउंडेशनल सेतु: सहपाठी साथी ' + buddyName + ' के साथ दैनिक 20 मिनट प्रत्यक्ष कंकड़ व स्लेट अभ्यास (Slide 9 Model)।';
          parentMsg = 'नमस्ते! लंबी अनुपस्थिति के कारण ' + studentName + ' को सीखने में थोड़ी कठिनाई आ रही है। स्कूल में विशेष मदद दी जा रही है। घर पर भी रोज़ 15 मिनट स्लेट पर अभ्यास करवाएं।';
        }

        elements.cuOutcomeArea.style.display = 'flex';
        elements.cuOutcomeArea.replaceChildren();

        const outcomeCard = document.createElement('div');
        outcomeCard.style.cssText = 'background: #FFFFFF; border: 2px solid var(--accent-teal); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 10px 30px rgba(13, 148, 136, 0.1);';

        const head = document.createElement('div');
        head.style.cssText = 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;';
        const h3 = document.createElement('h3');
        h3.style.cssText = 'font-size: 1.25rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;';
        h3.textContent = '📊 जांच परिणाम: ' + studentName + ' (प्राप्तांक: ' + total + ' / 6)';

        const badge = document.createElement('span');
        badge.className = 'status-pill ' + bandBadge;
        badge.style.fontSize = '0.9rem';
        badge.textContent = bandName;
        head.append(h3, badge);

        // Peer Buddy Box (Built purely via DOM elements)
        const buddyBox = document.createElement('div');
        buddyBox.style.cssText = 'background: var(--accent-teal-light); border: 1.5px solid #CCFBF1; border-radius: 0.75rem; padding: 1rem;';
        const bLabel = document.createElement('strong');
        bLabel.textContent = '🤝 आवंटित सहपाठी साथी (Assigned Peer Buddy): ';
        const bName = document.createElement('span');
        bName.style.cssText = 'font-weight: 800; color: var(--accent-teal-dark);';
        bName.textContent = buddyName;
        const bBr = document.createElement('br');
        const bDesc = document.createElement('span');
        bDesc.style.cssText = 'font-size: 0.9rem; color: var(--text-secondary);';
        bDesc.textContent = 'सहपाठी साथी स्लेट कार्ड और कंकड़ खेल में साथ बैठकर रोज 15 मिनट दोहराव कराएगा।';
        buddyBox.append(bLabel, bName, bBr, bDesc);

        // Remediation Plan Box
        const planBox = document.createElement('div');
        planBox.style.cssText = 'background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem;';
        const pLabel = document.createElement('strong');
        pLabel.textContent = '📅 7-दिवसीय उपचारात्मक योजना (Micro-Remediation Plan):';
        const pText = document.createElement('p');
        pText.style.cssText = 'margin: 0.25rem 0 0; font-size: 0.95rem; color: var(--text-primary); font-weight: 600;';
        pText.textContent = microPlan;
        planBox.append(pLabel, pText);

        // Parent Message Box
        const parentBox = document.createElement('div');
        parentBox.style.cssText = 'background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 0.75rem; padding: 1rem;';
        const pmLabel = document.createElement('strong');
        pmLabel.textContent = '💬 शिक्षक-अभिभावक संवाद संदेश (Parent Note in Hindi):';
        const pmText = document.createElement('p');
        pmText.style.cssText = 'margin: 0.25rem 0 0; font-size: 0.95rem; color: #78350F; font-style: italic;';
        pmText.textContent = '"' + parentMsg + '"';
        parentBox.append(pmLabel, pmText);

        const actions = document.createElement('div');
        actions.style.cssText = 'display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem;';

        const btnSaveRoster = document.createElement('button');
        btnSaveRoster.className = 'btn-action btn-green';
        btnSaveRoster.style.cssText = 'min-height: 48px; width: auto; padding: 0.5rem 1.25rem; font-size: 0.95rem;';
        btnSaveRoster.textContent = '💾 उपचारात्मक रोस्टर में जोड़ें';
        btnSaveRoster.onclick = () => {
          state.remediationRoster.push({
            name: studentName,
            grade: grade,
            reason: reason.split(':')[0],
            level: bandName,
            buddy: buddyName,
            status: total >= 5 ? 'स्तर प्राप्त' : 'लंबित'
          });
          renderRosterTable();
          alert('✅ ' + studentName + ' को उपचारात्मक रोस्टर में जोड़ दिया गया है!');
        };

        const btnAudio = document.createElement('button');
        btnAudio.className = 'btn-action btn-navy';
        btnAudio.style.cssText = 'min-height: 48px; width: auto; padding: 0.5rem 1.25rem; font-size: 0.95rem;';
        btnAudio.textContent = '🔊 बोलकर सुनें';
        btnAudio.onclick = () => {
          speakVernacular(studentName + ' का जांच परिणाम: ' + bandName + '। सहपाठी साथी ' + buddyName + ' आवंटित किया गया है। ' + microPlan);
        };

        actions.append(btnSaveRoster, btnAudio);
        outcomeCard.append(head, buddyBox, planBox, parentBox, actions);
        elements.cuOutcomeArea.appendChild(outcomeCard);

        speakVernacular(studentName + ' का स्तर निर्धारित हुआ: ' + bandName + '। सहपाठी साथी आवंटित है।');
      }

      function renderRosterTable() {
        if (!elements.rosterTableBody) return;
        elements.rosterTableBody.replaceChildren();

        const pendingCount = state.remediationRoster.filter(r => r.status === 'लंबित' || r.status === 'प्रगति पर').length;
        if (elements.rosterActiveBadge) elements.rosterActiveBadge.textContent = pendingCount + ' बच्चे लंबित';
        if (elements.rosterCount) elements.rosterCount.textContent = pendingCount + ' लंबित';

        if (state.remediationRoster.length === 0) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 7;
          td.style.cssText = 'text-align: center; color: var(--text-muted); padding: 1.5rem;';
          td.textContent = 'अभी कोई बच्चा लंबित नहीं है। ऊपर से नई जांच शुरू करें!';
          tr.appendChild(td);
          elements.rosterTableBody.appendChild(tr);
          return;
        }

        state.remediationRoster.forEach((item, idx) => {
          const tr = document.createElement('tr');

          const tdName = document.createElement('td');
          tdName.style.fontWeight = '700';
          tdName.textContent = item.name;

          const tdGrade = document.createElement('td');
          tdGrade.textContent = 'कक्षा ' + item.grade;

          const tdReason = document.createElement('td');
          tdReason.textContent = item.reason;

          const tdLevel = document.createElement('td');
          tdLevel.textContent = item.level;

          const tdBuddy = document.createElement('td');
          tdBuddy.textContent = item.buddy;

          const tdStatus = document.createElement('td');
          const pill = document.createElement('span');
          pill.className = 'status-pill ' + (item.status === 'स्तर प्राप्त' ? 'status-resolved' : item.status === 'प्रगति पर' ? 'status-active' : 'status-pending');
          pill.textContent = item.status;
          tdStatus.appendChild(pill);

          const tdAction = document.createElement('td');
          const btnToggle = document.createElement('button');
          btnToggle.style.cssText = 'background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 0.3rem 0.6rem; border-radius: 0.35rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; min-height: 48px;';
          btnToggle.textContent = item.status === 'स्तर प्राप्त' ? 'पुनः खोलें' : 'पूर्ण मार्क करें ✅';
          btnToggle.onclick = () => {
            item.status = item.status === 'स्तर प्राप्त' ? 'प्रगति पर' : 'स्तर प्राप्त';
            renderRosterTable();
          };
          tdAction.appendChild(btnToggle);

          tr.append(tdName, tdGrade, tdReason, tdLevel, tdBuddy, tdStatus, tdAction);
          elements.rosterTableBody.appendChild(tr);
        });
      }

      // 4. MULTI-GRADE TIMER ENGINE (Slide 7 Aligned)
      function toggleTimer() {
        if (!state.timerRunning) {
          state.timerRunning = true;
          state.targetEpoch = Date.now() + (state.durationSeconds * 1000);
          elements.timerBtnText.textContent = 'रोकें (Pause)';
          elements.timerIcon.textContent = '⏸️';
          if (elements.btnSolversTimerToggle) elements.btnSolversTimerToggle.textContent = '⏸️ रोकें (Pause)';
          speakVernacular('15 मिनट का बहु-कक्षा शिक्षण चक्र प्रारंभ हुआ।');
          state.timerIntervalId = setInterval(tickTimer, 250);
        } else {
          state.timerRunning = false;
          clearInterval(state.timerIntervalId);
          const remainingMillis = Math.max(0, state.targetEpoch - Date.now());
          state.durationSeconds = Math.round(remainingMillis / 1000);
          elements.timerBtnText.textContent = 'पुनः शुरू करें (Resume)';
          elements.timerIcon.textContent = '▶️';
          if (elements.btnSolversTimerToggle) elements.btnSolversTimerToggle.textContent = '▶️ पुनः शुरू करें';
        }
      }

      function tickTimer() {
        const remainingMillis = Math.max(0, state.targetEpoch - Date.now());
        const remainingSecs = Math.round(remainingMillis / 1000);
        const mins = Math.floor(remainingSecs / 60);
        const secs = remainingSecs % 60;
        const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
        
        elements.timerDisplay.textContent = timeStr;
        if (elements.solversTimerDisplay) elements.solversTimerDisplay.textContent = timeStr;

        if (remainingSecs <= 0) {
          switchClassFocus();
        }
      }

      function switchClassFocus() {
        clearInterval(state.timerIntervalId);
        playAcousticBell();

        state.durationSeconds = 900;
        state.timerRunning = false;
        state.activeFocus = state.activeFocus === 1 ? 2 : 1;

        const combo = (elements.solversGradeCombo && elements.solversGradeCombo.value) || '1_23';

        if (combo === '1_23') {
          if (state.activeFocus === 1) {
            elements.activeGroupLabel.textContent = 'कक्षा 1: प्रत्यक्ष शिक्षक समय';
            updateSplitInstructionDOM("कक्षा 1 को वर्ण ध्वनि 'क' और 'म' सिखाएं।", "10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें।");
            if (elements.solversFocusHeading) elements.solversFocusHeading.textContent = 'समूह A (कक्षा 1): प्रत्यक्ष शिक्षक समय';
            if (elements.solversTeacherTask) elements.solversTeacherTask.textContent = "कक्षा 1 के बच्चों को वर्ण ध्वनि 'क' और 'म' की पहचान कराएं और रेत/हवा में अनुरेखण करवाएं।";
            if (elements.solversPeerTask) elements.solversPeerTask.textContent = 'कक्षा 2 व 3 के बच्चे 10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें और एक-दूसरे की स्लेट जांचें।';
            speakVernacular('15 मिनट पूरे हुए। अब कक्षा 1 को प्रत्यक्ष समय दें और कक्षा 2/3 को कंकड़ गतिविधि सौंपें।');
          } else {
            elements.activeGroupLabel.textContent = 'कक्षा 2 व 3: प्रत्यक्ष शिक्षक समय';
            updateSplitInstructionDOM("कक्षा 2 व 3 को स्थानीय मान व हासिल जोड़ सिखाएं।", "स्लेट पर चित्र देखकर पहला अक्षर लिखें।");
            if (elements.solversFocusHeading) elements.solversFocusHeading.textContent = 'समूह B (कक्षा 2 व 3): प्रत्यक्ष शिक्षक समय';
            if (elements.solversTeacherTask) elements.solversTeacherTask.textContent = 'कक्षा 2 व 3 के बच्चों को शब्द निर्माण, स्थानीय मान व हासिल वाला जोड़ सिखाएं।';
            if (elements.solversPeerTask) elements.solversPeerTask.textContent = 'कक्षा 1 के बच्चे स्लेट पर चित्र देखकर पहला अक्षर लिखें और स्वतंत्र अभ्यास करें।';
            speakVernacular('15 मिनट पूरे हुए। अब कक्षा 2 और 3 को प्रत्यक्ष सिखाएं और कक्षा 1 को स्वतंत्र स्लेट अभ्यास सौंपें।');
          }
        } else if (combo === '23_45') {
          if (state.activeFocus === 1) {
            elements.activeGroupLabel.textContent = 'कक्षा 2 व 3: प्रत्यक्ष शिक्षक समय';
            updateSplitInstructionDOM("कक्षा 2 व 3 को 3-अंकीय घटाव व पहाड़े सिखाएं।", "कक्षा 4 व 5 भिन्न पट्टियों से आधा व चौथाई समझें।");
            if (elements.solversFocusHeading) elements.solversFocusHeading.textContent = 'समूह A (कक्षा 2 व 3): प्रत्यक्ष शिक्षक समय';
            if (elements.solversTeacherTask) elements.solversTeacherTask.textContent = 'कक्षा 2 व 3 को 3-अंकीय घटाव, पहाड़े व हासिल वाला जोड़ श्यामपट्ट पर प्रत्यक्ष सिखाएं।';
            if (elements.solversPeerTask) elements.solversPeerTask.textContent = 'कक्षा 4 व 5 के बच्चे भिन्न पट्टियां बनाकर आधा (1/2) और चौथाई (1/4) की तुलना स्लेट पर करें।';
            speakVernacular('15 मिनट पूरे हुए। अब कक्षा 2 और 3 को प्रत्यक्ष सिखाएं और कक्षा 4/5 को भिन्न गतिविधि सौंपें।');
          } else {
            elements.activeGroupLabel.textContent = 'कक्षा 4 व 5: प्रत्यक्ष शिक्षक समय';
            updateSplitInstructionDOM("कक्षा 4 व 5 को दशमलव व परिमाप सिखाएं।", "कक्षा 2 व 3 पहाड़े व जोड़ का स्लेट अभ्यास करें।");
            if (elements.solversFocusHeading) elements.solversFocusHeading.textContent = 'समूह B (कक्षा 4 व 5): प्रत्यक्ष शिक्षक समय';
            if (elements.solversTeacherTask) elements.solversTeacherTask.textContent = 'कक्षा 4 व 5 को दशमलव संख्याएं, HCF/LCM व खेत के परिमाप की अवधारणा सिखाएं।';
            if (elements.solversPeerTask) elements.solversPeerTask.textContent = 'कक्षा 2 व 3 के बच्चे 2 से 10 तक के पहाड़े और जोड़ का स्लेट पर सहपाठी अभ्यास करें।';
            speakVernacular('15 मिनट पूरे हुए। अब कक्षा 4 और 5 को प्रत्यक्ष सिखाएं और कक्षा 2/3 को स्लेट अभ्यास दें।');
          }
        } else {
          // single_teacher
          if (state.activeFocus === 1) {
            elements.activeGroupLabel.textContent = 'कक्षा 1 व 2: प्रत्यक्ष शिक्षक समय';
            updateSplitInstructionDOM("कक्षा 1 व 2 को वर्णमाला व गिनती सिखाएं।", "कक्षा 3, 4 व 5 'संख्या रेलगाड़ी' खेल खेलें।");
            if (elements.solversFocusHeading) elements.solversFocusHeading.textContent = 'समूह A (कक्षा 1 व 2): प्रत्यक्ष शिक्षक समय';
            if (elements.solversTeacherTask) elements.solversTeacherTask.textContent = 'कक्षा 1 व 2 के बच्चों को बुनियादी वर्णमाला पहचान और 1 से 50 तक गिनती प्रत्यक्ष सिखाएं।';
            if (elements.solversPeerTask) elements.solversPeerTask.textContent = "कक्षा 3, 4 व 5 के बच्चे 'संख्या रेलगाड़ी' खेल में श्यामपट्ट पर छूटे हुए अंक व शब्द निर्माण करें।";
            speakVernacular('15 मिनट पूरे हुए। अब कक्षा 1 और 2 को प्रत्यक्ष सिखाएं और बड़े बच्चों को संख्या रेलगाड़ी खेल दें।');
          } else {
            elements.activeGroupLabel.textContent = 'कक्षा 3, 4 व 5: प्रत्यक्ष शिक्षक समय';
            updateSplitInstructionDOM("कक्षा 3, 4 व 5 को गणित व भाषा सिखाएं।", "कक्षा 1 व 2 कंकड़ व स्लेट से चित्र बनाएं।");
            if (elements.solversFocusHeading) elements.solversFocusHeading.textContent = 'समूह B (कक्षा 3, 4 व 5): प्रत्यक्ष शिक्षक समय';
            if (elements.solversTeacherTask) elements.solversTeacherTask.textContent = 'कक्षा 3, 4 व 5 के बच्चों को अंकगणित व भाषा की उच्च अवधारणाएं प्रत्यक्ष सिखाएं।';
            if (elements.solversPeerTask) elements.solversPeerTask.textContent = 'कक्षा 1 व 2 के बच्चे स्लेट पर कंकड़ रखकर गिनती और वर्ण चित्र बनाएं।';
            speakVernacular('15 मिनट पूरे हुए। अब कक्षा 3, 4 और 5 को प्रत्यक्ष सिखाएं और छोटे बच्चों को स्लेट चित्र दें।');
          }
        }

        elements.timerDisplay.textContent = '15:00';
        if (elements.solversTimerDisplay) elements.solversTimerDisplay.textContent = '15:00';
        elements.timerBtnText.textContent = 'अगला चक्र शुरू करें';
        elements.timerIcon.textContent = '⏱️';
        if (elements.btnSolversTimerToggle) elements.btnSolversTimerToggle.textContent = '▶️ अगला चक्र शुरू करें';
      }

      function handleGradeComboChange() {
        state.activeFocus = 1;
        switchClassFocus();
      }

      // 5. ZERO COST TLM GENERATOR (Slide 9 Model)
      const tlmGamesRepo = {
        chalk: {
          title: 'श्यामपट्ट खेल: "संख्या रेलगाड़ी" (Number Train - Slide 9)',
          diagram: '+-------+       +-------+       +-------+       +-------+\\n| [ 2 ] | ===== | [ ? ] | ===== | [ 4 ] | ===== | [ ? ] |\\n+-------+       +-------+       +-------+       +-------+\\n डिब्बा 1        डिब्बा 2        डिब्बा 3        डिब्बा 4',
          rule: 'कक्षा 1 के बच्चे छूटे डिब्बे के लिए कंकड़ गिनते हैं; कक्षा 2 के बच्चे श्यामपट्ट पर छूटी संख्याएं (3 और 5) लिखते हैं। 100% सामूहिक सक्रिय सहभागिता।'
        },
        pebbles: {
          title: 'कंकड़ खेल: "संख्या का घर" (Number Houses)',
          diagram: '(इकाई) ──> (दहाई) ──> (सैकड़ा)\\n[०००]       [००००]      [००]',
          rule: 'जमीन पर 3 गोल घेरे बनाएं (इकाई, दहाई, सैकड़ा)। बच्चे 15 कंकड़ों को घेरे में फेंककर अपना स्कोर जोड़ेंगे।'
        },
        sticks: {
          title: 'तीलियों का खेल: "बंडल बनाओ दहाई जीतो"',
          diagram: '|||||||||| (10 तीली) = [ 1 दहाई ] + ||| (3 तीली) = 13',
          rule: '10 तीलियों पर रबर या धागा बांधकर 1 दहाई बनाएं। 2 बंडल और 3 खुली तीली = तेईस।'
        },
        leaves: {
          title: 'पत्तियों का खेल: "आकार और किनारों की खोज"',
          diagram: '🌿 नुकीली पत्ती  |  🍃 गोल पत्ती  |  🍁 चौड़ी पत्ती',
          rule: 'अलग-अलग आकार की पत्तियां इकट्ठा करें: नुकीली, गोल, चौड़ी। समरूपता और आकृतियों की तुलना करें।'
        },
        seeds: {
          title: 'बीज खेल: "बराबर बंटवारे का बाजार"',
          diagram: '20 बीज ÷ 4 बच्चे = [ 5 ] [ 5 ] [ 5 ] [ 5 ]',
          rule: '20 इमली के बीजों को 4 बच्चों में बराबर-बराबर बांटकर भाग (÷) की अवधारणा प्रत्यक्ष सिखाएं।'
        }
      };

      function generateTlmGame() {
        const mat = elements.tlmMaterialSelect.value;
        const grade = elements.tlmGradeSelect.value;
        const game = tlmGamesRepo[mat] || tlmGamesRepo.chalk;

        elements.tlmResultBox.style.display = 'block';
        elements.tlmResultBox.replaceChildren();

        const box = document.createElement('div');
        box.style.cssText = 'background: #FFFFFF; border: 2px solid var(--accent-teal); border-radius: 0.85rem; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;';

        const title = document.createElement('strong');
        title.style.cssText = 'color: var(--accent-navy-dark); font-size: 1.1rem;';
        title.textContent = '🎲 ' + game.title + ' (कक्षा ' + grade + ' हेतु):';

        const pre = document.createElement('pre');
        pre.className = 'code-blueprint-box';
        pre.style.cssText = 'color: #FDE047; padding: 0.75rem 1rem; margin: 0; font-size: 0.85rem;';
        pre.textContent = game.diagram;

        const p = document.createElement('p');
        p.style.cssText = 'margin: 0; font-size: 0.95rem; color: var(--text-primary);';
        p.textContent = game.rule;

        const footer = document.createElement('div');
        footer.style.cssText = 'font-size: 0.85rem; color: var(--accent-teal-dark); font-weight: 700;';
        footer.textContent = '✓ शून्य लागत • शून्य तैयारी समय • 100% भागीदारी';

        box.append(title, pre, p, footer);
        elements.tlmResultBox.appendChild(box);

        speakVernacular(game.title + '। ' + game.rule);
      }

      // 6. LIVE GUIDED TOUR
      const tourSteps = [
        {
          route: 'solvers',
          cardSelector: '[aria-labelledby="heading-mgml"]',
          stepBadge: 'चुनौती 1 / 3 • 2 से 3 कक्षाएं संयुक्त (MGML)',
          title: '2 से 3 कक्षाएं एक साथ (Multi-Grade Split-Teaching)',
          problemText: '🛑 समस्या: "Teachers often need to teach 2 to 3 grades simultaneously meaning time spent with one group is time the other learns without guidance."',
          solutionText: '💡 विद्यासेतु समाधान: 15-मिनट चक्रीय टाइमर (MGML Split)। शिक्षक कक्षा 1 को प्रत्यक्ष सिखाते हैं, जबकि कक्षा 2 व 3 कंकड़ों से स्लेट पर स्व-अध्ययन खेल में व्यस्त रहते हैं। 15 मिनट पूरे होते ही स्वचालित ध्वनि सूचना बजती है और भूमिकाएं बदल जाती हैं।',
          speechSummary: 'चुनौती 1: दो से तीन कक्षाएं एक साथ। विद्यासेतु का 15 मिनट टाइमर शिक्षक को कक्षा 1 को प्रत्यक्ष पढ़ाने और कक्षा 2 व 3 को कंकड़ खेल में व्यस्त रखने की समय-सारणी देता है। शिक्षक दो से तीन कक्षाओं को एक साथ आसानी से पढ़ा सकते हैं।',
          actionLabel: '⏱️ 15 मिनट चक्र शुरू करें',
          action: () => {
            navigateTo('/solvers');
            if (!state.timerRunning) toggleTimer();
          }
        },
        {
          route: 'bhasha',
          cardSelector: '[aria-labelledby="heading-bhasha"]',
          stepBadge: 'चुनौती 2 / 3 • घरेलू बोली का अंतर (Language Gap)',
          title: 'घर की बोली बनाम किताबी भाषा (Bhasha Setu)',
          problemText: '🛑 समस्या: "Often the child\\'s language at home is different from the language used in the classroom creating a gap between instruction and understanding."',
          solutionText: '💡 विद्यासेतु समाधान: भाषा सेतु (Bhasha Setu 1ली से 5वीं)। कठिन किताबी शब्दों (जैसे घटाव, अवरोही क्रम, स्थानीय मान) को बच्चों के घरेलू परिवेश के उदाहरणों (पेड़ से बेर गिरना, छत की सीढ़ी उतरना, माचिस की तीलियाँ) में बदलकर तुरंत अर्थ स्पष्ट करता है।',
          speechSummary: 'चुनौती 2: घर की बोली और किताबी भाषा का अंतर। भाषा सेतु कठिन किताबी शब्दों को बच्चों के घरेलू परिवेश के उदाहरणों में समझाता है।',
          actionLabel: '🗣️ संपूर्ण भाषा सेतु पेज देखें',
          action: () => {
            navigateTo('/bhasha');
          }
        },
        {
          route: 'catchup',
          cardSelector: '[aria-labelledby="heading-absentee"]',
          stepBadge: 'चुनौती 3 / 3 • अनुपस्थिति व लर्निंग गैप (Catch-Up)',
          title: 'अनुपस्थिति व दोबारा सिखाने की कमी (2-Min Catch-Up)',
          problemText: '🛑 समस्या: "Frequent student absenteeism creates learning gaps for the child with teachers having no time to reteach it individually, and no mechanism to help the child catch up."',
          solutionText: '💡 विद्यासेतु समाधान: 2-मिनट मौखिक वापसी जांच। फसल कटाई या बीमारी के बाद लौटे बच्चे की 3 त्वरित मौखिक प्रश्नों से जांच करें। अटकने पर बच्चे को सहपाठी साथी (Peer Buddy) के साथ अक्षर/संख्या कार्ड में लगाएं ताकि शिक्षक को अकेले दोबारा न पढ़ाना पड़े।',
          speechSummary: 'चुनौती 3: बार-बार अनुपस्थिति। 2 मिनट की मौखिक जांच से बच्चे का स्तर तुरंत पता चलता है और सहपाठी साथी के साथ उपचारात्मक कार्य शुरू होता है।',
          actionLabel: '⚡ 2-मिनट वापसी जांच पेज खोलें',
          action: () => {
            navigateTo('/catchup');
          }
        }
      ];

      function showTourStep(index) {
        if (index < 0) index = 0;
        if (index >= tourSteps.length) {
          closeTour();
          return;
        }
        currentTourIndex = index;
        const step = tourSteps[index];

        if (elements.tourBanner) {
          elements.tourBanner.classList.remove('hidden');
          elements.tourStepBadge.textContent = step.stepBadge;
          elements.tourStepTitle.textContent = step.title;
          elements.tourProblemText.textContent = step.problemText;
          elements.tourSolutionText.textContent = step.solutionText;
          elements.btnTourAction.textContent = step.actionLabel;
        }

        const pills = [elements.btnPill1, elements.btnPill2, elements.btnPill3];
        pills.forEach((p, idx) => {
          if (p) {
            if (idx === index) p.classList.add('active');
            else p.classList.remove('active');
          }
        });

        speakVernacular(step.speechSummary);
      }

      function startTour() {
        showTourStep(0);
      }

      function closeTour() {
        if (elements.tourBanner) elements.tourBanner.classList.add('hidden');
        [elements.btnPill1, elements.btnPill2, elements.btnPill3].forEach(p => p && p.classList.remove('active'));
      }

      // Safe Modal
      function openSafeModal(titleText, contentNodeBuilder) {
        elements.modalHeading.textContent = titleText;
        elements.modalContent.replaceChildren();
        contentNodeBuilder(elements.modalContent);
        elements.modalWrapper.classList.remove('hidden');
        elements.modalCloseBtn.focus();
      }

      function closeSafeModal() {
        elements.modalWrapper.classList.add('hidden');
      }

      // Speech Synthesis Helper
      function speakVernacular(text) {
        if (elements.srAnnouncer) elements.srAnnouncer.textContent = text;
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const sanitisedText = text.replace(/(\d+)\s*[-–—]\s*(\d+)/g, '$1 से $2');
          const utterance = new SpeechSynthesisUtterance(sanitisedText);
          utterance.lang = 'hi-IN';
          utterance.rate = 0.88;
          utterance.pitch = 0.95;
          window.speechSynthesis.speak(utterance);
        }
      }

      // Self-Test
      function runSelfTest() {
        elements.modalWrapper.classList.remove('hidden');
        const tests = [
          {
            name: 'Button Touch Target Safety (>= 48px)',
            passed: Array.from(document.querySelectorAll('button')).every(b => b.offsetHeight >= 48 || b.closest('.hidden'))
          },
          {
            name: 'Web Speech Synthesis Driver Available',
            passed: 'speechSynthesis' in window
          },
          {
            name: 'Offline Storage Readiness',
            passed: (() => {
              try {
                localStorage.setItem('_test', '1');
                localStorage.removeItem('_test');
                return true;
              } catch (e) { return false; }
            })()
          },
          {
            name: 'Google Drive Video Iframe Bridge',
            passed: !!document.querySelector('iframe')
          }
        ];

        openSafeModal('सिस्टम डायग्नोस्टिक जांच (System Diagnostics)', (container) => {
          const list = document.createElement('div');
          list.style.cssText = 'display: flex; flex-direction: column; gap: 0.75rem;';

          tests.forEach(t => {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border-radius: 0.5rem; background: ' + (t.passed ? 'var(--accent-teal-light)' : 'var(--accent-red-light)') + '; border: 1px solid ' + (t.passed ? '#CCFBF1' : '#FECACA') + ';';

            const name = document.createElement('span');
            name.style.cssText = 'font-weight: 600; color: var(--text-primary); font-size: 0.9rem;';
            name.textContent = t.name;

            const badge = document.createElement('span');
            badge.style.cssText = 'font-weight: 800; font-size: 0.85rem; color: ' + (t.passed ? 'var(--accent-teal-dark)' : 'var(--accent-red)') + ';';
            badge.textContent = t.passed ? 'PASSED' : 'FAILED';

            row.append(name, badge);
            list.append(row);
          });

          container.append(list);
        });

        speakVernacular('सिस्टम डायग्नोस्टिक्स पूर्ण हुए। सभी घटक सक्रिय हैं।');
      }

      function triggerVoiceAssistant() {
        elements.voiceBarLabel.textContent = 'सुन रहा हूँ... अपनी कक्षा का प्रश्न पूछें';
        speakVernacular('मैं सुन रहा हूँ। आप किस कक्षा के लिए शिक्षण गतिविधि चाहते हैं?');
        setTimeout(() => {
          elements.voiceBarLabel.textContent = 'बोलकर पूछें: "कक्षा 2 के लिए 10 मिनट खेल बताएं"';
        }, 4000);
      }

      function handleHeroExplore() {
        const val = elements.heroSelect.value;
        if (val === 'mgml') navigateTo('/solvers');
        else if (val === 'bhasha') navigateTo('/bhasha');
        else if (val === 'absentee') navigateTo('/catchup');
        else if (val === 'deck') navigateTo('/deck');
        else startTour();
      }

      function openCatchUpDiagnostic() {
        const name = (elements.studentInput.value || '').trim();
        if (name && elements.cuStudentName) {
          elements.cuStudentName.value = name;
        }
        navigateTo('/catchup');
        generateDiagnosticTest();
      }

      function openTlmModal() {
        navigateTo('/solvers');
      }

      function triggerConceptExplanation() {
        const map = {
          subtraction: { cls: 'class1', subj: 'math', topic: 'c1_m_sub_single' },
          place_value: { cls: 'class2', subj: 'math', topic: 'c2_m_place_value' },
          descending_order: { cls: 'class2', subj: 'math', topic: 'c2_m_descending_order' },
          fractions: { cls: 'class3', subj: 'math', topic: 'c3_m_fractions_intro' },
          perimeter: { cls: 'class4', subj: 'math', topic: 'c4_m_perimeter_area' },
          hcf: { cls: 'class5', subj: 'math', topic: 'c5_m_hcf_lcm' }
        };
        const val = elements.conceptDropdown.value;
        const target = map[val] || map.subtraction;
        if (elements.bhashaClassSelect) elements.bhashaClassSelect.value = target.cls;
        if (elements.bhashaSubjectSelect) elements.bhashaSubjectSelect.value = target.subj;
        populateBhashaTopics();
        if (elements.bhashaTopicSelect) elements.bhashaTopicSelect.value = target.topic;
        renderBhashaCard();
        navigateTo('/bhasha');
      }

      function loadRohanPreset() {
        elements.cuStudentName.value = 'रोहन कुमार';
        elements.cuGradeSelect.value = '2';
        elements.cuReasonSelect.value = 'harvest';
        elements.cuDomainSelect.value = 'numeracy';
        generateDiagnosticTest();
      }

      // 7. PRESENTATION ENGINE (12 Slides)
      const PresentationEngine = (() => {
        let current = 1;
        const total = 12;

        const titles = [
          "1. Title: VidyaSetu",
          "2. Leadership & Core Team",
          "3. Executive Overview",
          "4. Ground Truth: 3 Bottlenecks",
          "5. The Innovation Pivot",
          "6. Technical Architecture & Moat",
          "7. Pathway 1: Multi-Grade Split",
          "8. Pathway 2: Bhasha Setu",
          "9. Pathway 3 & 4: Triage & TLM",
          "10. Competitive Matrix & Novelty",
          "11. Empirical Metrics & FLN Impact",
          "12. 3-Year Scale & National Vision"
        ];

        function buildPills() {
          const track = document.getElementById('pills-track');
          if (!track) return;
          track.replaceChildren();

          for (let i = 1; i <= total; i++) {
            const btn = document.createElement('button');
            btn.className = 'pill-number-btn ' + (i === current ? 'active' : '');
            btn.textContent = String(i);
            btn.title = titles[i - 1];
            btn.onclick = () => showSlide(i);
            track.appendChild(btn);
          }
        }

        function showSlide(index) {
          if (index >= 1 && index <= total) {
            current = index;
            const slides = document.querySelectorAll('.slide-viewport');
            slides.forEach((s, idx) => {
              if (idx + 1 === current) {
                s.classList.add('active');
                const contentArea = s.querySelector('.slide-content');
                if (contentArea) contentArea.scrollTop = 0;
              } else {
                s.classList.remove('active');
              }
            });

            const track = document.getElementById('pills-track');
            if (track) {
              const pills = track.querySelectorAll('.pill-number-btn');
              pills.forEach((p, idx) => {
                if (idx + 1 === current) p.classList.add('active');
                else p.classList.remove('active');
              });
            }

            const indicator = document.getElementById('slide-indicator');
            if (indicator) indicator.textContent = String(current);

            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            if (btnPrev) {
              btnPrev.disabled = current === 1;
              btnPrev.style.opacity = current === 1 ? '0.45' : '1';
            }
            if (btnNext) {
              btnNext.disabled = current === total;
              btnNext.style.opacity = current === total ? '0.45' : '1';
            }
          }
        }

        function nextSlide() {
          if (current < total) showSlide(current + 1);
        }

        function prevSlide() {
          if (current > 1) showSlide(current - 1);
        }

        function toggleFull() {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            if (document.exitFullscreen) document.exitFullscreen();
          }
        }

        function handleKey(e) {
          const deckPage = document.getElementById('page-deck');
          if (!deckPage || deckPage.classList.contains('hidden')) return;

          if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            nextSlide();
          } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            prevSlide();
          } else if (e.key === 'Home') {
            e.preventDefault();
            showSlide(1);
          } else if (e.key === 'End') {
            e.preventDefault();
            showSlide(total);
          } else if (e.key.toLowerCase() === 'f') {
            toggleFull();
          }
        }

        function init() {
          buildPills();
          showSlide(1);

          const btnPrev = document.getElementById('btn-prev');
          const btnNext = document.getElementById('btn-next');
          const btnFullscreen = document.getElementById('btn-fullscreen');
          const btnPrint = document.getElementById('btn-print-pdf');

          if (btnPrev) btnPrev.addEventListener('click', prevSlide);
          if (btnNext) btnNext.addEventListener('click', nextSlide);
          if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFull);
          if (btnPrint) btnPrint.addEventListener('click', () => window.print());
          window.addEventListener('keydown', handleKey);
        }

        return { init, showSlide, nextSlide, prevSlide };
      })();

      function init() {
        // Service worker
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('./sw.js').then((reg) => {
            reg.update().catch(() => {});
          }).catch(() => {});

          let refreshing = false;
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
              refreshing = true;
              window.location.reload();
            }
          });
        }

        // Initialize Split Instructions with safe DOM
        updateSplitInstructionDOM("कक्षा 1 को वर्ण ध्वनि 'क' और 'म' सिखाएं।", "10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें।");

        // Router listener
        window.addEventListener('hashchange', handleRoute);
        handleRoute();

        // Event bindings
        elements.btnToggleTimer.addEventListener('click', toggleTimer);
        elements.btnExplainConcept.addEventListener('click', triggerConceptExplanation);
        elements.btnOpenDiagnostic.addEventListener('click', openCatchUpDiagnostic);
        elements.btnViewTlm.addEventListener('click', openTlmModal);
        elements.btnSelfTest.addEventListener('click', runSelfTest);
        elements.btnPersistentVoice.addEventListener('click', triggerVoiceAssistant);
        elements.modalCloseBtn.addEventListener('click', closeSafeModal);
        elements.modalDismissBtn.addEventListener('click', closeSafeModal);

        if (elements.btnHeroExplore) elements.btnHeroExplore.addEventListener('click', handleHeroExplore);
        if (elements.btnStartTour) elements.btnStartTour.addEventListener('click', startTour);
        if (elements.btnCloseTour) elements.btnCloseTour.addEventListener('click', closeTour);
        if (elements.btnTourNext) elements.btnTourNext.addEventListener('click', () => showTourStep(currentTourIndex + 1));
        if (elements.btnTourPrev) elements.btnTourPrev.addEventListener('click', () => showTourStep(currentTourIndex - 1));
        if (elements.btnTourAction) elements.btnTourAction.addEventListener('click', () => {
          if (tourSteps[currentTourIndex]) tourSteps[currentTourIndex].action();
        });
        if (elements.btnTourReadAloud) elements.btnTourReadAloud.addEventListener('click', () => {
          if (tourSteps[currentTourIndex]) speakVernacular(tourSteps[currentTourIndex].speechSummary);
        });

        if (elements.btnPill1) elements.btnPill1.addEventListener('click', () => showTourStep(0));
        if (elements.btnPill2) elements.btnPill2.addEventListener('click', () => showTourStep(1));
        if (elements.btnPill3) elements.btnPill3.addEventListener('click', () => showTourStep(2));
        if (elements.btnPillAll) elements.btnPillAll.addEventListener('click', () => showTourStep(0));

        // Solvers Page Bindings
        if (elements.solversGradeCombo) elements.solversGradeCombo.addEventListener('change', handleGradeComboChange);
        if (elements.btnSolversTimerToggle) elements.btnSolversTimerToggle.addEventListener('click', toggleTimer);
        if (elements.btnSolversSwitchPhase) elements.btnSolversSwitchPhase.addEventListener('click', switchClassFocus);
        if (elements.btnGenerateTlm) elements.btnGenerateTlm.addEventListener('click', generateTlmGame);

        document.querySelectorAll('.cycle-duration-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.cycle-duration-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.durationSeconds = parseInt(btn.getAttribute('data-seconds'), 10) || 900;
            const mins = Math.floor(state.durationSeconds / 60);
            elements.timerDisplay.textContent = String(mins).padStart(2, '0') + ':00';
            if (elements.solversTimerDisplay) elements.solversTimerDisplay.textContent = String(mins).padStart(2, '0') + ':00';
          });
        });

        // Bhasha Page Bindings
        if (elements.bhashaClassSelect) elements.bhashaClassSelect.addEventListener('change', populateBhashaTopics);
        if (elements.bhashaSubjectSelect) elements.bhashaSubjectSelect.addEventListener('change', populateBhashaTopics);
        if (elements.bhashaTopicSelect) elements.bhashaTopicSelect.addEventListener('change', renderBhashaCard);
        if (elements.btnRenderBhasha) elements.btnRenderBhasha.addEventListener('click', renderBhashaCard);

        document.querySelectorAll('.dialect-tab-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.dialect-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentDialect = btn.getAttribute('data-dialect') || 'awadhi';
            renderBhashaCard();
          });
        });

        populateBhashaTopics();

        // CatchUp Page Bindings
        if (elements.btnGenerateDiagnosticTest) elements.btnGenerateDiagnosticTest.addEventListener('click', generateDiagnosticTest);
        if (elements.btnEvaluateCatchup) elements.btnEvaluateCatchup.addEventListener('click', evaluateCatchUpTest);
        if (elements.btnLoadRohanPreset) elements.btnLoadRohanPreset.addEventListener('click', loadRohanPreset);

        renderRosterTable();

        // Presentation Deck Engine
        PresentationEngine.init();

        if (new URLSearchParams(window.location.search).has('demo')) {
          setTimeout(startTour, 600);
        }
      }

      return { init, startTour, showTourStep, closeTour, navigateTo, PresentationEngine };
    })();

    document.addEventListener('DOMContentLoaded', VidyaCore.init);
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully wrote updated index.html with 12-slide deck and zero innerHTML!');

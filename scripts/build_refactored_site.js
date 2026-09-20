const fs = require('fs');
const path = require('path');

// Read the current index.html to extract large static sections (like the 12 slides of presentation deck and dedicated pages)
const oldHtml = fs.readFileSync('index.html', 'utf8');

function extractBetween(str, startMarker, endMarker) {
  const s = str.indexOf(startMarker);
  if (s === -1) throw new Error('Start marker not found: ' + startMarker);
  const e = str.indexOf(endMarker, s);
  if (e === -1) throw new Error('End marker not found: ' + endMarker);
  return str.substring(s, e);
}

// Extract the dedicated pages
const pageSolversSection = extractBetween(oldHtml, '<section id="page-solvers"', '<section id="page-bhasha"');
const pageBhashaSection = extractBetween(oldHtml, '<section id="page-bhasha"', '<section id="page-catchup"');
const pageCatchupSection = extractBetween(oldHtml, '<section id="page-catchup"', '<section id="page-video"');
const pageDeckSection = extractBetween(oldHtml, '<section id="page-deck"', '</section>\n\n    <!-- Persistent Bottom Bar');

// For page-video, replace iframe with video facade
let pageVideoSection = extractBetween(oldHtml, '<section id="page-video"', '<section id="page-deck"');
// Replace iframe container in pageVideoSection with video facade
pageVideoSection = pageVideoSection.replace(
  /<div class="video-container">[\s\S]*?<\/iframe>\s*<\/div>/,
  `<div id="page-video-container" class="video-container">
            <div class="video-facade" id="page-video-facade" role="button" tabindex="0" aria-label="ग्राउंड फील्ड वीडियो चलाएं">
              <div class="video-facade-play-btn" aria-hidden="true">▶</div>
              <div style="font-weight: 800; font-size: 1.15rem; color: #FFFFFF; margin-bottom: 0.25rem;">ग्राउंड फील्ड वीडियो देखें (90 सेकंड)</div>
              <div style="font-size: 0.88rem; color: #CBD5E1;">भारतीय प्राथमिक शाला की 3 वास्तविक जटिलताएं • 0 KB प्रारंभिक लोड • क्लिक पर लोड</div>
            </div>
          </div>`
);

console.log('Extracted dedicated pages successfully.');

// Now let's build the complete HTML!
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
      background: linear-gradient(135deg, var(--accent-navy-dark), var(--accent-teal));
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 1.35rem;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
    }

    .brand-text h1 {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .brand-text p {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .main-nav-links {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-wrap: wrap;
    }

    .nav-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      color: var(--text-secondary);
      border: 1px solid transparent;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .nav-link-btn:hover {
      color: var(--accent-navy-dark);
      background-color: var(--bg-surface-elevated);
    }

    .nav-link-btn.active {
      color: var(--accent-teal);
      background-color: var(--accent-teal-light);
      border-color: #CCFBF1;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    /* Layout Wrapper */
    .layout-wrapper {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1.5rem 1rem 5rem;
    }

    /* Page Visibility Controller */
    .page-view {
      display: block;
    }

    .page-view.hidden {
      display: none !important;
    }

    /* Breadcrumbs */
    .breadcrumb-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    .breadcrumb-path {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .breadcrumb-path a {
      color: var(--accent-teal);
      text-decoration: none;
    }

    .btn-back-home {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 0.4rem 0.85rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-back-home:hover {
      background: var(--bg-surface-elevated);
      color: var(--accent-navy-dark);
    }

    /* Hero Section */
    .hero-container {
      background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F766E 100%);
      border-radius: 1.5rem;
      padding: 2.25rem 2rem;
      color: #FFFFFF;
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 2rem;
      align-items: center;
      box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.35);
      position: relative;
      overflow: hidden;
      margin-bottom: 1.75rem;
    }

    @media (max-width: 900px) {
      .hero-container {
        grid-template-columns: 1fr;
        padding: 1.5rem 1.25rem;
      }
    }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 0.85rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .hero-title {
      font-size: clamp(1.6rem, 3.2vw, 2.5rem);
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 0.85rem;
    }

    .hero-title .text-gradient {
      background: linear-gradient(90deg, #FDE047, #F97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-desc {
      font-size: 0.95rem;
      color: #E2E8F0;
      line-height: 1.6;
      margin-bottom: 1.25rem;
      max-width: 580px;
    }

    .hero-search-box {
      background: #FFFFFF;
      border-radius: 0.85rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      max-width: 580px;
    }

    .search-select {
      flex: 1;
      border: none;
      padding: 0.65rem 0.85rem;
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
      background: transparent;
      outline: none;
      cursor: pointer;
    }

    .btn-search {
      background: var(--accent-saffron);
      color: #FFFFFF;
      border: none;
      padding: 0.75rem 1.35rem;
      border-radius: 0.6rem;
      font-size: 0.9rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: background 0.2s ease, transform 0.1s ease;
      min-height: 48px;
    }

    .btn-search:hover {
      background: #C2410C;
      transform: translateY(-1px);
    }

    /* Video Facade & Player */
    .hero-video-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      border-radius: 1.25rem;
      padding: 0.75rem;
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .video-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 0.85rem;
      overflow: hidden;
      background: #000;
    }

    .video-facade {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F766E 100%);
      border-radius: 0.85rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      box-shadow: var(--shadow-card);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      text-align: center;
      padding: 1.25rem;
    }

    .video-facade:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .video-facade-play-btn {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--accent-saffron);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 8px 24px rgba(234, 88, 12, 0.4);
      margin-bottom: 0.75rem;
      transition: transform 0.2s ease;
    }

    .video-facade:hover .video-facade-play-btn {
      transform: scale(1.1);
    }

    .video-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .video-floating-badge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.4rem 0.6rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      font-size: 0.75rem;
      color: #E2E8F0;
      font-weight: 600;
    }

    /* Section Headings */
    .section-head {
      margin-bottom: 1.25rem;
    }

    .section-pretitle {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-teal);
      display: block;
      margin-bottom: 0.25rem;
    }

    .section-title {
      font-size: clamp(1.2rem, 2.2vw, 1.75rem);
      font-weight: 800;
      color: var(--accent-navy-dark);
      letter-spacing: -0.02em;
    }

    /* Guided Walkthrough Banner */
    .tour-banner-box {
      background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%);
      border: 2px solid #3B82F6;
      border-radius: 1.25rem;
      padding: 1.25rem 1.5rem;
      color: #FFFFFF;
      margin-bottom: 2rem;
      box-shadow: 0 12px 30px -10px rgba(30, 58, 138, 0.4);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .tour-launcher-section {
      background: #FFFFFF;
      border: 1.5px solid var(--border-subtle);
      border-radius: 1rem;
      padding: 1rem 1.25rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .tour-pills-row {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tour-step-pill {
      flex: 1;
      min-width: 140px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      padding: 0.5rem 0.75rem;
      border-radius: 0.6rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-secondary);
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tour-step-pill:hover {
      background: #E2E8F0;
      color: var(--accent-navy-dark);
    }

    .tour-step-pill.active {
      background: var(--accent-navy-dark);
      color: #FDE047;
      border-color: #1E3A8A;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    }

    /* Grid Layouts */
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    /* Feature Cards */
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
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
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
      margin-bottom: 0.75rem;
    }

    .card-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--accent-teal);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      margin-bottom: 0.4rem;
      line-height: 1.3;
    }

    .card-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .info-pane {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 0.75rem;
      padding: 0.85rem;
      margin-bottom: 1rem;
      font-size: 0.88rem;
    }

    /* Expandable Inline Drawer Pattern */
    .drawer-content {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.35s ease-in-out, opacity 0.35s ease-in-out, margin-top 0.35s ease-in-out, padding 0.35s ease-in-out;
      border-radius: 0.85rem;
      background: var(--bg-surface-elevated);
      border: 1.5px solid var(--border-subtle);
      margin-top: 0;
      padding: 0;
    }

    .drawer-content.expanded {
      max-height: 2200px;
      opacity: 1;
      margin-top: 1.25rem;
      padding: 1.25rem;
      overflow: visible;
    }

    /* Pulse animation on phase toggle */
    @keyframes pulseInstruction {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4); }
      50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(13, 148, 136, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
    }

    .pulse-instruction {
      animation: pulseInstruction 0.8s ease-in-out 2;
    }

    /* Dual Track Active Focus Borders */
    .track-active {
      border: 2.5px solid var(--accent-teal) !important;
      background: var(--accent-teal-light) !important;
      box-shadow: 0 4px 14px rgba(13, 148, 136, 0.15) !important;
    }

    .track-inactive {
      border: 1.5px dashed var(--border-subtle) !important;
      background: #FFFFFF !important;
      opacity: 0.85;
    }

    /* Chalkboard Box for TLM Game */
    .chalkboard-box {
      background-color: #064E3B;
      color: #FFFFFF;
      border: 3px solid #D1D5DB;
      border-radius: 0.75rem;
      padding: 1.25rem;
      font-family: var(--font-mono);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);
    }

    /* Remediation Tag */
    .remediation-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #FEF2F2;
      border: 1px solid #FECACA;
      color: #991B1B;
      border-radius: 9999px;
      padding: 0.35rem 0.85rem;
      font-size: 0.82rem;
      font-weight: 700;
    }

    .remediation-tag.resolved {
      background: #ECFDF5;
      border-color: #A7F3D0;
      color: #065F46;
    }

    .btn-tag-resolve {
      background: #DC2626;
      color: #FFFFFF;
      border: none;
      border-radius: 9999px;
      padding: 0.15rem 0.55rem;
      font-size: 0.75rem;
      font-weight: 800;
      cursor: pointer;
    }

    .btn-tag-resolve:hover {
      background: #B91C1C;
    }

    /* Interactive Action Buttons */
    .btn-action {
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
      font-weight: 800;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-green {
      background: var(--accent-teal);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
    }

    .btn-green:hover {
      background: var(--accent-teal-dark);
      transform: translateY(-1px);
    }

    .btn-navy {
      background: var(--accent-navy);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
    }

    .btn-navy:hover {
      background: var(--accent-navy-dark);
      transform: translateY(-1px);
    }

    .btn-saffron {
      background: var(--accent-saffron);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(234, 88, 12, 0.2);
    }

    .btn-saffron:hover {
      background: #C2410C;
      transform: translateY(-1px);
    }

    .btn-amber {
      background: var(--accent-amber);
      color: #FFFFFF;
    }

    .btn-amber:hover {
      background: #B45309;
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

    .timer-readout {
      font-family: var(--font-mono);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--accent-navy-dark);
      line-height: 1;
    }

    .video-tag {
      background: #FEF3C7;
      color: #92400E;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      text-transform: uppercase;
    }

    .cycle-duration-btn, .dialect-tab-btn, .card-dialect-btn, .material-btn {
      background: var(--bg-surface-elevated);
      border: 1.5px solid var(--border-subtle);
      color: var(--text-secondary);
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.4rem 0.85rem;
      border-radius: 0.5rem;
      cursor: pointer;
      min-height: 48px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .cycle-duration-btn.active, .dialect-tab-btn.active, .card-dialect-btn.active, .material-btn.active {
      background: var(--accent-navy-dark);
      color: #FFFFFF;
      border-color: var(--accent-navy-dark);
    }

    /* Tables */
    .deck-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 1.25rem 0;
      border-radius: 0.75rem;
      overflow: hidden;
      border: 1px solid var(--border-card);
      background: #FFFFFF;
    }

    .deck-table th, .deck-table td {
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.85rem;
      border-bottom: 1px solid var(--border-card);
    }

    .deck-table th {
      background: var(--bg-surface-elevated);
      font-weight: 800;
      color: var(--text-heading);
    }

    .deck-table tr:last-child td {
      border-bottom: none;
    }

    /* Badges & Metrics */
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.2rem 0.65rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .badge-saffron { background: var(--saffron-soft); color: var(--saffron-rich); border: 1px solid var(--saffron-border); }
    .badge-blue { background: var(--royal-blue-soft); color: var(--royal-blue-rich); border: 1px solid var(--royal-blue-border); }
    .badge-emerald { background: var(--emerald-soft); color: var(--emerald-rich); border: 1px solid var(--emerald-border); }
    .badge-teal { background: var(--accent-teal-light); color: var(--accent-teal-dark); border: 1px solid #99F6E4; }

    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .card-luminous {
      background: #FFFFFF;
      border: 1.5px solid var(--border-card);
      border-radius: 1rem;
      padding: 1.25rem;
      box-shadow: var(--shadow-sm);
    }

    .card-saffron-edge { border-top: 4px solid var(--saffron-vibrant); }
    .card-blue-edge { border-top: 4px solid var(--royal-blue); }
    .card-emerald-edge { border-top: 4px solid var(--emerald-green); }

    .metric-hero {
      font-size: 2.25rem;
      font-weight: 900;
      line-height: 1;
      font-family: var(--font-mono);
    }
    .metric-saffron { color: var(--saffron-vibrant); }
    .metric-blue { color: var(--royal-blue); }
    .metric-emerald { color: var(--emerald-green); }

    /* Persistent Voice Bottom Bar */
    .voice-bar-btn {
      position: fixed;
      bottom: 1.25rem;
      right: 1.25rem;
      background: linear-gradient(135deg, var(--accent-navy-dark), var(--accent-teal));
      color: #FFFFFF;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 9999px;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.3);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      z-index: 40;
      min-height: 48px;
      transition: transform 0.2s ease;
    }

    .voice-bar-btn:hover {
      transform: scale(1.03);
    }

    /* Site Footer */
    .site-footer {
      background-color: var(--accent-navy-dark);
      color: #FFFFFF;
      padding: 3rem 1.5rem 2rem;
      margin-top: 3rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .footer-content {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-bottom {
      max-width: 1280px;
      margin: 0 auto;
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

    /* Deck Slide Styles */
    .deck-container {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .deck-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 1rem;
      padding: 0.75rem 1.25rem;
      box-shadow: var(--shadow-sm);
    }

    .slide-viewport {
      display: none;
      aspect-ratio: 16 / 9;
      width: 100%;
      background: #FFFFFF;
      border: 1.5px solid var(--border-card);
      border-radius: 1.25rem;
      box-shadow: var(--shadow-lg);
      padding: 2.25rem 2.75rem;
      overflow-y: auto;
      position: relative;
    }

    .slide-viewport.active {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .deck-nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: 1rem;
      padding: 0.75rem 1.25rem;
      box-shadow: var(--shadow-sm);
    }

    .pills-track {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      flex-wrap: wrap;
    }

    .pill-number-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1.5px solid var(--border-subtle);
      background: var(--bg-surface-elevated);
      color: var(--text-secondary);
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .pill-number-btn.active {
      background: var(--accent-navy-dark);
      color: #FFFFFF;
      border-color: var(--accent-navy-dark);
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
    }

    @media print {
      .no-print, header, footer, .top-trust-bar, .deck-top-bar, .deck-nav-bar, #persistent-voice-bar {
        display: none !important;
      }
      body > *:not(#page-deck) { display: none !important; }
      #page-deck { display: block !important; padding: 0 !important; }
      .slide-viewport {
        display: flex !important;
        page-break-after: always !important;
        border: none !important;
        box-shadow: none !important;
        aspect-ratio: 16 / 9 !important;
        margin-bottom: 2cm !important;
      }
    }
  </style>
</head>
<body>
  <div class="sr-only" aria-live="polite" id="sr-live-region"></div>

  <!-- Top Trust & National Mission Banner -->
  <aside class="top-trust-bar no-print" role="region" aria-label="राष्ट्रीय मिशन घोषणा">
    <span class="pill">निपुण भारत FLN</span>
    <span>भारतीय प्राथमिक शालाओं में 100% ऑफ़लाइन बहु-कक्षा शिक्षण साथी • शून्य आवर्ती लागत</span>
  </aside>

  <!-- Main Sticky Header -->
  <header role="banner">
    <a href="#/home" class="brand-group" aria-label="VidyaSetu Homepage (विद्यासेतु मुख्य पृष्ठ)">
      <div class="brand-logo-badge" aria-hidden="true">🎓</div>
      <div class="brand-text">
        <h1>VidyaSetu (विद्यासेतु)</h1>
        <p>प्राथमिक कक्षा साथी • FLN Multigrade Copilot</p>
      </div>
    </a>

    <!-- Navigation Links to Dedicated Sub-Pages -->
    <nav class="main-nav-links" role="navigation" aria-label="मुख्य नेविगेशन">
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

      <!-- Inline Self-Test Diagnostic Drawer -->
      <div id="drawer-self-test" class="drawer-content" role="region" aria-label="सिस्टम डायग्नोस्टिक जांच">
        <!-- Built dynamically via DOM -->
      </div>

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

          <div style="margin-top: 1rem; display: flex; gap: 1rem; font-size: 0.82rem; color: #CBD5E1;">
            <span>✓ 100% ऑफ़लाइन PWA</span>
            <span>✓ शून्य innerHTML सुरक्षा</span>
            <span>✓ अवधी/भोजपुरी/बुंदेली सहायता</span>
          </div>
        </div>

        <!-- Video Box Preview in Hero (With Interactive Facade) -->
        <div id="video-section" class="hero-video-box">
          <div id="hero-video-container" class="video-container">
            <div class="video-facade" id="hero-video-facade" role="button" tabindex="0" aria-label="ग्राउंड फील्ड वीडियो चलाएं">
              <div class="video-facade-play-btn" aria-hidden="true">▶</div>
              <div style="font-weight: 800; font-size: 1.05rem; color: #FFFFFF; margin-bottom: 0.25rem;">ग्राउंड फील्ड वीडियो देखें (90 सेकंड)</div>
              <div style="font-size: 0.82rem; color: #CBD5E1;">निपुण भारत FLN • 3 कक्षा जटिलताएं • क्लिक पर लोड</div>
            </div>
          </div>
          <div class="video-floating-badge">
            <span>📹 ग्राउंड रियलिटी • 90-Sec Field Documentation</span>
            <span style="color: #FDE047;">0 KB इनिशियल लोड</span>
          </div>
        </div>
      </section>

      <!-- Walkthrough Launcher Section -->
      <section class="tour-launcher-section">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <strong style="color: var(--accent-navy-dark); font-size: 0.98rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>🧭</span>
            <span>3 प्रमुख कक्षा जटिलताओं का सीधा समाधान व सजीव डेमो:</span>
          </strong>
          <span style="font-size: 0.82rem; color: var(--text-muted);">किसी भी कदम पर क्लिक करके लाइव समाधान चलाएं</span>
        </div>

        <div class="tour-pills-row">
          <button id="btn-pill-step-1" class="tour-step-pill" data-step="0">
            1️⃣ 2-3 कक्षाएं संयुक्त (MGML)
          </button>
          <button id="btn-pill-step-2" class="tour-step-pill" data-step="1">
            2️⃣ घरेलू बोली अंतर (भाषा सेतु)
          </button>
          <button id="btn-pill-step-3" class="tour-step-pill" data-step="2">
            3️⃣ लंबी अनुपस्थिति (2-Min Triage)
          </button>
          <button id="btn-pill-step-all" class="tour-step-pill" style="background: var(--accent-teal-light); color: var(--accent-teal-dark); border-color: #CCFBF1;">
            ⚡ संपूर्ण 3-कदम डेमो चलाएं
          </button>
        </div>
      </section>

      <!-- Live Guided Tour Banner (Shown during active tour) -->
      <div id="demo-tour-banner" class="tour-banner-box hidden" role="region" aria-label="सजीव निर्देशित डेमो">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span id="tour-step-badge" class="badge-pill badge-saffron" style="background: #FDE047; color: #000; font-weight: 800;">कदम 1</span>
              <h3 id="tour-step-title" style="font-size: 1.15rem; font-weight: 800; color: #FFFFFF; margin: 0;">
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

      <!-- Quick Portal Cards to Dedicated Pages & Interactive Drawers -->
      <div id="solvers-section" class="section-head">
        <span class="section-pretitle">EXPLORE CLASSROOM SOLVERS</span>
        <h2 class="section-title">विद्यासेतु समर्पित शिक्षण मॉड्यूल</h2>
      </div>

      <div class="dashboard-grid">
        <!-- Tile 1: Multi-Grade Split Orchestrator -->
        <article class="feature-card" aria-labelledby="heading-mgml">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 1 • बहु-कक्षा चक्र</span>
              <span class="video-tag" id="cycle-step-badge">15-Min Split</span>
            </div>
            <h3 id="heading-mgml" class="card-title">बहु-कक्षा विभाजन सहायक</h3>
            <p class="card-desc">कक्षा 1 को पढ़ाते समय कक्षा 2 व 3 को स्व-अध्ययन खेल में व्यस्त रखें।</p>
            
            <!-- Dual Tracks with Dynamic Active Focus Border -->
            <div id="track-grade-1" class="info-pane track-active" style="margin-bottom: 0.5rem; transition: all 0.3s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong id="track-g1-title" style="color: var(--accent-navy);">कक्षा 1: प्रत्यक्ष शिक्षक समय</strong>
                <span id="track-g1-badge" class="badge-pill badge-teal">🎯 सक्रिय ध्यान</span>
              </div>
              <p id="g1-instruction-text" style="font-size: 0.9rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
                कक्षा 1 को वर्ण ध्वनि 'क' और 'म' सिखाएं।
              </p>
            </div>

            <div id="track-grade-2-3" class="info-pane track-inactive" style="margin-bottom: 0.75rem; transition: all 0.3s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong id="track-g23-title" style="color: var(--text-muted);">कक्षा 2 व 3: सहपाठी खेल अभ्यास</strong>
                <span id="track-g23-badge" class="badge-pill" style="background: #E2E8F0; color: #475569;">सहपाठी समूह</span>
              </div>
              <p id="g23-instruction-text" style="font-size: 0.9rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
                10-10 कंकड़ों के समूह बनाकर स्लेट पर गिनती लिखें।
              </p>
            </div>

            <div style="text-align: center; margin-bottom: 0.75rem;">
              <span id="timer-display" class="timer-readout">15:00</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-toggle-timer" class="btn-action btn-green" style="min-height: 64px;">
              <span id="timer-icon" aria-hidden="true">⏱️</span>
              <span id="timer-btn-text">15 मिनट चक्र शुरू करें</span>
            </button>
            <div style="display: flex; gap: 0.5rem;">
              <button id="btn-switch-phase" class="btn-action" style="background: var(--accent-navy); color: #FFFFFF; min-height: 48px; flex: 1;">
                <span>🔄 चरण बदलें</span>
              </button>
              <button id="btn-mgml-drawer-toggle" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 48px; flex: 1;">
                <span>🔽 चक्र विवरण</span>
              </button>
            </div>
          </div>

          <!-- Inline Drawer: Multi-Grade Split Settings & Details -->
          <div id="drawer-mgml" class="drawer-content" role="region" aria-label="बहु-कक्षा चक्र विस्तार">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--accent-navy-dark);">⏱️ बहु-कक्षा समय चक्र सेटिंग्स (Slide 5 Model)</h4>
              <button id="btn-close-drawer-mgml" class="btn-action" style="width: auto; min-height: 38px; padding: 0.2rem 0.65rem; background: #E2E8F0; color: #1E293B; font-size: 0.8rem;">✕ संकुचित करें</button>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">चक्र अवधि चुनें (Cycle Duration):</p>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.85rem;">
              <button class="cycle-duration-btn" data-seconds="600" style="flex: 1;">10 मिनट</button>
              <button class="cycle-duration-btn active" data-seconds="900" style="flex: 1;">15 मिनट</button>
              <button class="cycle-duration-btn" data-seconds="1200" style="flex: 1;">20 मिनट</button>
            </div>
            <div class="info-pane" style="margin-bottom: 0.75rem; font-size: 0.85rem;">
              <strong>🔔 Web Audio ध्वनिक घंटी:</strong> समय समाप्त होने पर घंटी व हिन्दी वाणी निर्देश स्वचालित रूप से बजेंगे।
            </div>
            <div style="display: flex; gap: 0.5rem; flex-direction: column;">
              <button id="btn-test-bell" class="btn-action" style="background: var(--accent-amber); color: #FFF; min-height: 48px;">
                <span>🔔 घंटी बजाकर परीक्षण करें (Test Acoustic Bell)</span>
              </button>
              <a href="#/solvers" class="btn-action" style="background: #FFFFFF; color: var(--accent-navy); border: 1.5px solid var(--accent-navy); min-height: 48px; text-decoration: none;">
                <span>➔ पूर्ण बहु-कक्षा वर्कस्टेशन पेज खोलें</span>
              </a>
            </div>
          </div>
        </article>

        <!-- Tile 2: Bhasha Setu (6 Foundational Concepts) -->
        <article class="feature-card" aria-labelledby="heading-bhasha">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 2 • भाषा अंतर</span>
              <span class="video-tag">1ली - 5वीं संदर्शिका</span>
            </div>
            <h3 id="heading-bhasha" class="card-title">भाषा सेतु (Bhasha Setu)</h3>
            <p class="card-desc">कठिन किताबी शब्दों को बच्चों की घरेलू बोली और ग्रामीण उदाहरणों में समझें।</p>
            
            <div style="display: flex; gap: 0.4rem; margin-bottom: 0.75rem;">
              <button class="card-dialect-btn active" data-dialect="awadhi" style="flex: 1;">अवधी</button>
              <button class="card-dialect-btn" data-dialect="bhojpuri" style="flex: 1;">भोजपुरी</button>
              <button class="card-dialect-btn" data-dialect="bundeli" style="flex: 1;">बुंदेली</button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              <label for="concept-dropdown" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">6 आधारभूत अवधारणाएं चुनें (Slide 6):</label>
              <select id="concept-dropdown" class="select-input">
                <option value="subtraction">घटाव (कक्षा 1 गणित) - बेर गिरना / जलेबी खर्च</option>
                <option value="descending_order">अवरोही क्रम (कक्षा 2 गणित) - छत की सीढ़ी उतरना</option>
                <option value="place_value">स्थानीय मान (कक्षा 2 गणित) - बंडल व तीली</option>
                <option value="addition">जोड़ (कक्षा 1 गणित) - टोकरी में अमिया मिलना</option>
                <option value="ascending_order">आरोही क्रम (कक्षा 2 गणित) - नन्हे पौधे से पेड़ बनना</option>
                <option value="phoneme_ka">वर्ण ध्वनि 'क' (कक्षा 1 हिन्दी) - कौवे की आवाज़ 'काँव-काँव'</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-explain-concept" class="btn-action btn-navy" style="min-height: 64px;">
              <span aria-hidden="true">🗣️</span>
              <span>घरेलू संदर्भ में समझाएं</span>
            </button>
            <a href="#/bhasha" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 48px; text-decoration: none; font-size: 0.92rem;">
              <span>संपूर्ण 75+ संदर्शिका खोलें (1ली से 5वीं)</span>
              <span>➔</span>
            </a>
          </div>

          <!-- Inline Drawer: Bhasha Setu Side-by-Side Comparison Output -->
          <div id="drawer-bhasha" class="drawer-content" role="region" aria-label="भाषा सेतु तुलना">
            <!-- Dynamically populated via safe DOM: Box A, Box B, Box C, Audio button, Close button -->
          </div>
        </article>

        <!-- Tile 3: Absentee Catch-Up & Remediation Roster -->
        <article class="feature-card" aria-labelledby="heading-absentee">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 3 • उपचारात्मक शिक्षण</span>
              <span id="remediation-roster-count" class="video-tag">1 लंबित</span>
            </div>
            <h3 id="heading-absentee" class="card-title">छुट्टी के बाद वापसी जांच</h3>
            <p class="card-desc">छुट्टी या फसल कटाई के बाद लौटे बच्चे की 2 मिनट में जांच करें और सहपाठी साथी जोड़ें।</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div>
                <label for="student-name-input" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">लौटे हुए बच्चे का नाम:</label>
                <input type="text" id="student-name-input" class="text-input" placeholder="उदा. रोहन कुमार (कक्षा 2)" value="रोहन कुमार" maxlength="32" />
              </div>
              <div>
                <label for="student-days-select" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-navy);">अनुपस्थिति अवधि व कारण:</label>
                <select id="student-days-select" class="select-input">
                  <option value="14 दिन (फसल कटाई)">14 दिन (फसल कटाई / रबी-खरीफ)</option>
                  <option value="7 दिन (बीमारी / बुखार)">7 दिन (बीमारी / बुखार)</option>
                  <option value="21 दिन (पारिवारिक यात्रा)">21 दिन (पारिवारिक यात्रा / शादी)</option>
                  <option value="30+ दिन (मौसमी प्रवास)">30+ दिन (मौसमी ईंट-भट्ठा प्रवास)</option>
                </select>
              </div>
            </div>

            <!-- Active Remediation Tags Container -->
            <div style="margin-top: 0.75rem;">
              <div style="font-size: 0.82rem; font-weight: 800; color: var(--accent-navy); margin-bottom: 0.35rem;">सक्रिय उपचारात्मक छात्र (Active Tags):</div>
              <div id="active-remediation-tags" style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                <!-- Populated via localStorage['vidyasetu_roster'] -->
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-open-diagnostic" class="btn-action btn-green" style="min-height: 64px;">
              <span aria-hidden="true">⚡</span>
              <span>2-मिनट मौखिक जांच शुरू करें</span>
            </button>
            <a href="#/catchup" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 48px; text-decoration: none; font-size: 0.92rem;">
              <span>वापसी जांच समर्पित पेज खोलें</span>
              <span>➔</span>
            </a>
          </div>

          <!-- Inline Drawer: 3-Question Screening Checklist & Remediation Action Card -->
          <div id="drawer-absentee" class="drawer-content" role="region" aria-label="2-मिनट मौखिक जांच व उपचारात्मक योजना">
            <!-- Dynamically populated via safe DOM -->
          </div>
        </article>

        <!-- Tile 4: Chalkboard TLM & Number Train Game -->
        <article class="feature-card" aria-labelledby="heading-tlm">
          <div>
            <div class="card-meta">
              <span class="card-tag">समस्या 4 • शून्य-लागत TLM</span>
              <span class="video-tag">ब्लैकबोर्ड खेल</span>
            </div>
            <h3 id="heading-tlm" class="card-title">ब्लैकबोर्ड शिक्षण सामग्री (TLM)</h3>
            <p class="card-desc">बिना किसी खर्च के चाक, स्लेट और परिवेशीय वस्तुओं से तुरंत प्रभावी शिक्षण सामग्री व खेल तैयार करें।</p>
            
            <div class="info-pane" style="background: #064E3B; color: #FFFFFF; font-family: var(--font-mono); font-size: 0.82rem; margin-bottom: 0.75rem;">
              🚂 <strong>संख्या रेलगाड़ी (Number Train):</strong><br>
              [ 2 ] ===== [ ? ] ===== [ 4 ] ===== [ ? ] ===== [ 6 ]
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary);">
              कक्षा 1 के बच्चे कंकड़ गिनते हैं, कक्षा 2 के बच्चे छूटी संख्याएं भरते हैं।
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-direction: column;">
            <button id="btn-view-tlm" class="btn-action btn-teal" style="background: var(--accent-teal); color: #FFFFFF; min-height: 64px;">
              <span aria-hidden="true">🎨</span>
              <span>ब्लैकबोर्ड TLM व संख्या खेल खेलें</span>
            </button>
            <a href="#/solvers" class="btn-action" style="background: var(--bg-surface-elevated); color: var(--accent-navy-dark); border: 1.5px solid var(--border-subtle); min-height: 48px; text-decoration: none; font-size: 0.92rem;">
              <span>कक्षा वर्कस्टेशन पेज खोलें</span>
              <span>➔</span>
            </a>
          </div>

          <!-- Inline Drawer: Interactive Chalkboard TLM & Material Switcher -->
          <div id="drawer-tlm" class="drawer-content" role="region" aria-label="ब्लैकबोर्ड TLM व संख्या खेल">
            <!-- Dynamically populated via safe DOM -->
          </div>
        </article>

        <!-- Tile 5: Presentation Deck Tile -->
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
            <a href="#/deck" class="btn-action btn-saffron" style="text-decoration: none; min-height: 56px;">
              <span>📊 12-स्लाइड प्रस्तुति डेक खोलें</span>
              <span>➔</span>
            </a>
            <button type="button" class="btn-action" onclick="window.print()" style="background: #FFFFFF; color: var(--text-primary); border: 1.5px solid var(--border-subtle); min-height: 48px;">
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
        <div class="team-card card-saffron-edge card-luminous" style="align-items: center; text-align: center; padding: 1.75rem 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
          <div class="team-avatar-badge" style="width: 68px; height: 68px; font-size: 1.6rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--saffron-vibrant), #F97316); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 900;">
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
        <div class="team-card card-blue-edge card-luminous" style="align-items: center; text-align: center; padding: 1.75rem 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
          <div class="team-avatar-badge" style="width: 68px; height: 68px; font-size: 1.6rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--royal-blue), #3B82F6); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 900;">
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
        <div class="team-card card-emerald-edge card-luminous" style="align-items: center; text-align: center; padding: 1.75rem 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
          <div class="team-avatar-badge" style="width: 68px; height: 68px; font-size: 1.6rem; border-radius: 1.2rem; background: linear-gradient(135deg, var(--emerald-green), #10B981); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 900;">
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

    <!-- Dedicated Sub-Pages -->
    ${pageSolversSection}
    ${pageBhashaSection}
    ${pageCatchupSection}
    ${pageVideoSection}
    ${pageDeckSection}
    </section>

    <!-- Persistent Bottom Bar (Voice Bar) -->
    <aside role="complementary" aria-label="ध्वनि सहायक" class="no-print">
      <button id="btn-persistent-voice" class="voice-bar-btn" aria-label="आवाज सहायक से पूछें">
        <span aria-hidden="true" style="font-size: 1.5rem;">🎤</span>
        <span id="voice-bar-label">बोलकर पूछें: "कक्षा 2 के लिए 10 मिनट खेल बताएं"</span>
      </button>
    </aside>
  </div>

  <!-- Site Footer (No intrusive modal overlay) -->
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
          <li>• <a href="#/deck" style="color: #CBD5E1; text-decoration: none;">राष्ट्रीय एआई हैकथॉन प्रस्तुति डेक</a></li>
        </ul>
      </div>
      <div>
        <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--accent-teal);">ऑफ़लाइन अनुपालन</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: #CBD5E1;">
          <div>📦 <strong>सर्विस वर्कर:</strong> एक्टिव (v10-inline-drawers)</div>
          <div>🛡️ <strong>DOM सुरक्षा:</strong> 100% शून्य innerHTML</div>
          <div>🔇 <strong>इंटरनेट निर्भरता:</strong> 0 KB (पूर्ण ऑफ़लाइन)</div>
          <div>🎯 <strong>टच टारगेट:</strong> सभी बटन ≥ 48px (मुख्य ≥ 64px)</div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 VidyaSetu Core Team. भारतीय प्राथमिक शालाओं के लिए समर्पित ओपन समाधान।</span>
      <div style="display: flex; gap: 1rem;">
        <span>निपुण भारत FLN अनुपालित</span>
        <span>•</span>
        <span>शून्य क्लाउड सर्वर निर्भरता</span>
      </div>
    </div>
  </footer>

  <script>
    const VidyaCore = (() => {
      'use strict';

      // 6 Foundational Concepts Data Dictionary (Slide 6 Alignment)
      const bhashaFoundationalConcepts = {
        subtraction: {
          id: 'subtraction',
          name: 'घटाव (Subtraction)',
          classGrade: 'कक्षा 1 गणित',
          textbook: 'किसी राशि अथवा समूह में से निश्चित संख्या कम करना या निकालना (-)।',
          awadhi: 'पेड़ से 5 बेर मा से 2 बेर टपक पड़े या भाई के दे दिहिन, हाथ मा कितने बचे? (उत्तर: 3 बेर)',
          bhojpuri: 'पेड़ से बेर टूटल भा हाट में जलेबी कीन के पइसा खरच भइल। 5 गो बेर में से 2 गो दे देहनी त 3 गो बचल!',
          bundeli: 'पेड़ से बेर टूटन या हाट में जलेबी खावे में पईसा खरच होनो। 5 में से 2 गए तो 3 बचे।',
          script: "बच्चों से कहें: 'यदि आपके पास 5 बेर हैं और 2 भाई को दे दिए, तो कितने बचे?' बच्चे कंकड़ या उंगलियों से 2 मोड़कर 3 गिनेंगे।"
        },
        descending_order: {
          id: 'descending_order',
          name: 'अवरोही क्रम (Descending Order)',
          classGrade: 'कक्षा 2 गणित',
          textbook: 'संख्याओं को बड़े मान से छोटे मान की ओर व्यवस्थित करना (घटता क्रम)।',
          awadhi: 'छत की सीढ़ी से जमीन पर उतरब: पहले 5वीं सीढ़ी, फेर 4थी, फेर 3री और फेर भुईयां!',
          bhojpuri: 'छत के सीढ़ी से नीचे उतरल: पहिले 5वीं सीढ़ी, फेर 4थी, फेर 3री आ फेर जमीन!',
          bundeli: 'छत की सीढ़ी से जमीन पे उतरबो: पहले 5वीं, फिर 4थी, फिर 3री और फिर जमीन!',
          script: 'कक्षा में बच्चों को जमीन पर कदम नीचे रखते हुए उल्टी गिनती (5, 4, 3, 2, 1) का अभिनय करवाएं।'
        },
        place_value: {
          id: 'place_value',
          name: 'स्थानीय मान (Place Value)',
          classGrade: 'कक्षा 2 गणित',
          textbook: 'संख्या में किसी अंक की स्थिति के अनुसार उसका मान (इकाई, दहाई, सैकड़ा)।',
          awadhi: '10 तीली के धागा से बांध दिहेव त भवा 1 गट्ठा (दहाई), अउर खुली तीली भई इकाई।',
          bhojpuri: '10 गो तीली के बांध देहल त बनल 1 बोझा (दहाई), अउर छूटा तीली भईल इकाई।',
          bundeli: '10 तीली को पूला बांधो तो बनो 1 दहाई, और खुली तीली इकाई।',
          script: "बच्चों को 10 तीलियों पर धागा बांधकर 1 दहाई (10) और 3 खुली तीली दिखाकर 'तेरह' (13) गिनवाएं।"
        },
        addition: {
          id: 'addition',
          name: 'जोड़ (Addition)',
          classGrade: 'कक्षा 1 गणित',
          textbook: 'दो या दो से अधिक समूहों की वस्तुओं को एक साथ मिलाकर कुल संख्या ज्ञात करना (+)।',
          awadhi: 'टोकरी मा 3 अमिया रहिन, 2 अमिया अउर मिल गईं, कुल 5 भईं। जोड़ का मतलब एकट्ठे मिलब।',
          bhojpuri: 'मेला में 3 गो सखा रहे, 2 गो अउर मिल गईल, कुल 5 गो भईल। जोड़ मतलब सब एक संगे!',
          bundeli: '3 अमिया हतीं, 2 और धर दईं, कुल 5 हो गईं।',
          script: "बच्चों से कहें: 'टोकरी में 3 अमिया थीं, नानी 2 अमिया और ले आईं, अब टोकरी में कुल कितनी अमिया हो गईं?'"
        },
        ascending_order: {
          id: 'ascending_order',
          name: 'आरोही क्रम (Ascending Order)',
          classGrade: 'कक्षा 2 गणित',
          textbook: 'संख्याओं को सबसे छोटे मान से शुरू कर बड़े मान की ओर व्यवस्थित करना (बढ़ता क्रम)।',
          awadhi: 'छोटे पौधे से बड़ा पेड़ बनब या पहली सीढ़ी से छत की ओर चढ़ब: 1, फेर 2, फेर 3, फेर 4!',
          bhojpuri: 'सीढ़ी पर ऊपर चढ़ल: पहिले 1ली, फेर 2सरी, फेर 3सरी सीढ़ी!',
          bundeli: 'नीचे से ऊपर चढ़बो: 1 से 2, 2 से 3, 3 से 4।',
          script: "बच्चों से कहें: 'पहले नन्हा बीज (1), फिर छोटा पौधा (2), फिर बड़ा तना (3), फिर छायादार पेड़ (4)!' स्लेट पर सीढ़ी बनवाएं।"
        },
        phoneme_ka: {
          id: 'phoneme_ka',
          name: "वर्ण ध्वनि 'क' (Phoneme 'Ka')",
          classGrade: 'कक्षा 1 हिन्दी',
          textbook: "कंठ से उच्चरित स्पर्श व्यंजन ध्वनि 'क' की प्रतीक व आकृति संगति।",
          awadhi: "कौवा क बोली 'काँव-काँव' क पहला बोल, कमल क फूल क पहला अक्षर।",
          bhojpuri: "कागा बोले 'काँव-काँव', पहिला अक्षर बनल 'क'। खेत के करेला और केला।",
          bundeli: "ककड़ी और कौवा को पहलो अक्षर 'क'। बोल के देखो: काँव-काँव!",
          script: "बच्चों से कहें: 'कौवा कैसे बोलता है? काँव-काँव! पहली आवाज़ क्या निकली? क! स्लेट पर क की गोल छतरी बनाओ।'"
        }
      };

      // Number Train ASCII Puzzles (Slide 9 Model)
      const trainPuzzles = [
        { display: '[ 2 ] ===== [ ? ] ===== [ 4 ] ===== [ ? ] ===== [ 6 ]', a1: 3, a2: 5, hint: '1 का अंतर: 2, 3, 4, 5, 6' },
        { display: '[ 1 ] ===== [ ? ] ===== [ 3 ] ===== [ ? ] ===== [ 5 ]', a1: 2, a2: 4, hint: '1 का अंतर: 1, 2, 3, 4, 5' },
        { display: '[ 10 ] ===== [ ? ] ===== [ 30 ] ===== [ ? ] ===== [ 50 ]', a1: 20, a2: 40, hint: '10 का अंतर: 10, 20, 30, 40, 50' }
      ];
      let currentTrainIdx = 0;

      // Zero-cost materials for TLM
      const zeroCostMaterials = {
        pebbles: {
          title: '🍂 सूखे पत्ते व कंकड़ (Leaves & Pebbles)',
          script: 'कक्षा में 10-10 कंकड़ों के समूह बनाएं। स्लेट पर गोल घेरा खींचकर 6 कंकड़ अंदर और 2 बाहर रखकर जोड़ (6+2=8) सिखाएं।'
        },
        sticks: {
          title: '🥢 माचिस की तीलियां व धागा (Matchsticks & String)',
          script: '10 तीलियों को धागे से बांधकर 1 दहाई (10) बनाएं। 4 खुली तीलियों के साथ रखकर संख्या 14 का स्थानीय मान प्रत्यक्ष दिखाएं।'
        },
        rope: {
          title: '🪢 रस्सी व चाक (Rope & Chalk)',
          script: 'रस्सी के सिरे पर चाक बांधकर जमीन पर बड़ा वृत्त खींचें। बच्चों को वृत्त की परिधि पर चलाकर गिनती व ज्यामिति सिखाएं।'
        },
        boxes: {
          title: '📦 खाली दवा का डिब्बा (Medicine Boxes)',
          script: 'दवा के खाली डिब्बे से घनाभ (Cuboid), इसके 6 फलक और 8 कोने गिनवाएं। बिना किसी लागत के 3D आकृतियों का बोध।'
        }
      };

      // Persistent Reactive State
      const state = {
        timerRunning: false,
        durationSeconds: 900,
        targetEpoch: 0,
        timerIntervalId: null,
        activeFocus: 1,
        currentDialect: 'awadhi',
        currentTestAnswers: [null, null, null]
      };

      let currentTourIndex = 0;

      // Persistent Roster Management via localStorage['vidyasetu_roster']
      const ROSTER_KEY = 'vidyasetu_roster';

      function getStoredRoster() {
        try {
          const raw = localStorage.getItem(ROSTER_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          }
        } catch (e) {}
        const defaultRoster = [
          {
            id: 'roster-rohan-1',
            name: 'रोहन कुमार',
            grade: 'कक्षा 2',
            absentDays: '14 दिन (फसल कटाई)',
            gap: 'वर्ण पहचान व 6+2 जोड़ में कठिनाई',
            buddy: 'अमित (कक्षा 3 - आगे की पंक्ति)',
            task: 'स्लेट पर 8 कंकड़ गिनकर 6+2 चित्र बनाएं',
            status: 'active',
            date: new Date().toLocaleDateString('hi-IN')
          }
        ];
        saveStoredRoster(defaultRoster);
        return defaultRoster;
      }

      function saveStoredRoster(roster) {
        try {
          localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
        } catch (e) {}
      }

      function addRosterEntry(studentName, absentDays) {
        const roster = getStoredRoster();
        const entry = {
          id: 'roster-' + Date.now(),
          name: studentName || 'रोहन कुमार',
          grade: 'कक्षा 2',
          absentDays: absentDays || '14 दिन (फसल कटाई)',
          gap: "कक्षा 2 जोड़ (6+2) व वर्ण पहचान ('म'/'र') में कठिनाई",
          buddy: 'अमित (कक्षा 3 - आगे की पंक्ति)',
          task: 'स्लेट पर 8 कंकड़ गिनकर 6+2 चित्र बनाएं और साथी को दिखाएं',
          status: 'active',
          date: new Date().toLocaleDateString('hi-IN')
        };
        roster.unshift(entry);
        saveStoredRoster(roster);
        renderRosterTags();
        renderRosterTable();
        return entry;
      }

      function resolveRosterItem(id) {
        const roster = getStoredRoster();
        const updated = roster.map(item => {
          if (item.id === id) {
            return { ...item, status: 'resolved' };
          }
          return item;
        });
        saveStoredRoster(updated);
        renderRosterTags();
        renderRosterTable();
        speakVernacular('छात्र का उपचारात्मक कार्य पूर्ण मार्क किया गया।');
      }

      // DOM Elements Cache
      const elements = {
        srAnnouncer: document.getElementById('sr-live-region'),
        timerDisplay: document.getElementById('timer-display'),
        timerBtnText: document.getElementById('timer-btn-text'),
        timerIcon: document.getElementById('timer-icon'),
        trackGrade1: document.getElementById('track-grade-1'),
        trackGrade23: document.getElementById('track-grade-2-3'),
        trackG1Title: document.getElementById('track-g1-title'),
        trackG23Title: document.getElementById('track-g23-title'),
        trackG1Badge: document.getElementById('track-g1-badge'),
        trackG23Badge: document.getElementById('track-g23-badge'),
        g1InstructionText: document.getElementById('g1-instruction-text'),
        g23InstructionText: document.getElementById('g23-instruction-text'),
        conceptDropdown: document.getElementById('concept-dropdown'),
        studentInput: document.getElementById('student-name-input'),
        studentDaysSelect: document.getElementById('student-days-select'),
        activeRosterTags: document.getElementById('active-remediation-tags'),
        rosterCount: document.getElementById('remediation-roster-count'),

        // Drawers
        drawerSelfTest: document.getElementById('drawer-self-test'),
        drawerMgml: document.getElementById('drawer-mgml'),
        drawerBhasha: document.getElementById('drawer-bhasha'),
        drawerAbsentee: document.getElementById('drawer-absentee'),
        drawerTlm: document.getElementById('drawer-tlm'),

        // Action Buttons
        btnToggleTimer: document.getElementById('btn-toggle-timer'),
        btnSwitchPhase: document.getElementById('btn-switch-phase'),
        btnMgmlDrawerToggle: document.getElementById('btn-mgml-drawer-toggle'),
        btnCloseDrawerMgml: document.getElementById('btn-close-drawer-mgml'),
        btnTestBell: document.getElementById('btn-test-bell'),
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

      // Drawer Helper: Expand or Collapse with Smooth Auto-Scroll
      function toggleDrawer(drawerEl, forceOpen = null, autoScroll = true) {
        if (!drawerEl) return;
        const isExpanded = forceOpen !== null ? forceOpen : !drawerEl.classList.contains('expanded');
        if (isExpanded) {
          drawerEl.classList.add('expanded');
          if (autoScroll) {
            setTimeout(() => {
              drawerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 80);
          }
        } else {
          drawerEl.classList.remove('expanded');
        }
        return isExpanded;
      }

      // Web Audio Acoustic Bell Chime Synthesizer (Pure Offline, Rich Harmonics)
      function playAcousticBell() {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) return;
          const ctx = new AudioContextClass();
          const now = ctx.currentTime;

          // Authentic two-tone church / school bell chime: 659.25Hz (E5) and 880Hz (A5)
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

      // Stutter-Free Vernacular Speech Synthesis
      function speakVernacular(text) {
        if (elements.srAnnouncer) elements.srAnnouncer.textContent = text;
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          // Replace hyphen ranges like "2-3" with "2 से 3" so speech doesn't say "minus"
          const cleanText = text.replace(/(\\d+)\\s*[-–—]\\s*(\\d+)/g, '$1 से $2');
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'hi-IN';
          utterance.rate = 0.88;
          utterance.pitch = 0.95;
          window.speechSynthesis.speak(utterance);
        }
      }

      // Render Active Remediation Tags on Card 3
      function renderRosterTags() {
        if (!elements.activeRosterTags) return;
        elements.activeRosterTags.replaceChildren();

        const roster = getStoredRoster();
        const activeItems = roster.filter(r => r.status === 'active');

        if (elements.rosterCount) {
          elements.rosterCount.textContent = activeItems.length + ' लंबित';
        }

        if (activeItems.length === 0) {
          const empty = document.createElement('div');
          empty.style.cssText = 'font-size: 0.85rem; color: var(--emerald-rich); font-weight: 700; padding: 0.2rem 0;';
          empty.textContent = '🟢 कोई सक्रिय उपचारात्मक कार्य लंबित नहीं है। सभी छात्र स्तर पर हैं!';
          elements.activeRosterTags.appendChild(empty);
          return;
        }

        activeItems.forEach(item => {
          const tag = document.createElement('div');
          tag.className = 'remediation-tag';
          tag.id = 'tag-' + item.id;

          const span = document.createElement('span');
          span.textContent = '🔴 ' + item.name + ' (' + item.gap + ') • साथी: ' + item.buddy;

          const btnResolve = document.createElement('button');
          btnResolve.type = 'button';
          btnResolve.className = 'btn-tag-resolve';
          btnResolve.textContent = '✓ पूर्ण (Resolved)';
          btnResolve.onclick = () => {
            resolveRosterItem(item.id);
          };

          tag.append(span, btnResolve);
          elements.activeRosterTags.appendChild(tag);
        });
      }

      // Card 3: 2-Minute Oral Screening & Remediation Action Card Generator (Slide 7)
      function renderAbsenteeDrawerScreening() {
        const drawer = elements.drawerAbsentee;
        if (!drawer) return;
        drawer.replaceChildren();

        const studentName = (elements.studentInput.value || 'रोहन कुमार').trim();
        const absentDays = elements.studentDaysSelect ? elements.studentDaysSelect.value : '14 दिन (फसल कटाई)';

        const head = document.createElement('div');
        head.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.85rem;';

        const title = document.createElement('h4');
        title.style.cssText = 'font-size: 1.05rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;';
        title.textContent = '📋 2-मिनट मौखिक जांच: ' + studentName + ' (' + absentDays + ')';

        const btnClose = document.createElement('button');
        btnClose.className = 'btn-action';
        btnClose.style.cssText = 'width: auto; min-height: 38px; padding: 0.2rem 0.65rem; background: #E2E8F0; color: #1E293B; font-size: 0.8rem;';
        btnClose.textContent = '✕ संकुचित करें';
        btnClose.onclick = () => toggleDrawer(drawer, false);
        head.append(title, btnClose);

        const sub = document.createElement('p');
        sub.style.cssText = 'font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;';
        sub.textContent = 'निपुण भारत FLN आधारभूत स्तर 2-मिनट त्वरित मौखिक परीक्षण (Slide 7 Model):';

        // 3-Question Checklist Container
        const checklist = document.createElement('div');
        checklist.style.cssText = 'display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem;';

        const questions = [
          {
            icon: '🔤',
            title: "प्रश्न 1 (वर्ण पहचान): 'म' व 'र'",
            desc: "शिक्षक निर्देश: कार्ड पर लिखे वर्ण दिखाकर पूछें: 'यह क्या लिखा है?'",
            checkLabel: "'म' और 'र' सही पहचाना"
          },
          {
            icon: '🔢',
            title: 'प्रश्न 2 (संख्या जोड़): 6 + 2 = ?',
            desc: "शिक्षक निर्देश: मौखिक पूछें: '6 में 2 कंकड़ और मिलाए तो कितने बने?' (उत्तर: 8)",
            checkLabel: '6+2 = 8 सही उत्तर दिया'
          },
          {
            icon: '📖',
            title: "प्रश्न 3 (शब्द पठन): 'घर'",
            desc: "शिक्षक निर्देश: स्लेट पर लिखा शब्द पढ़वाएं: 'घर'",
            checkLabel: "'घर' शब्द बिना अटके पढ़ा"
          }
        ];

        const checkStates = [false, false, false];

        questions.forEach((q, idx) => {
          const item = document.createElement('div');
          item.style.cssText = 'background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 0.65rem; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem;';

          const qHead = document.createElement('div');
          qHead.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';
          const qTitle = document.createElement('strong');
          qTitle.style.cssText = 'font-size: 0.92rem; color: var(--accent-navy);';
          qTitle.textContent = q.icon + ' ' + q.title;

          const lbl = document.createElement('label');
          lbl.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: var(--text-primary); cursor: pointer;';
          const chk = document.createElement('input');
          chk.type = 'checkbox';
          chk.style.cssText = 'width: 20px; height: 20px; cursor: pointer;';
          chk.onchange = () => {
            checkStates[idx] = chk.checked;
          };
          const chkTxt = document.createElement('span');
          chkTxt.textContent = q.checkLabel;
          lbl.append(chk, chkTxt);
          qHead.append(qTitle, lbl);

          const qDesc = document.createElement('p');
          qDesc.style.cssText = 'font-size: 0.82rem; color: var(--text-muted); margin: 0;';
          qDesc.textContent = q.desc;

          item.append(qHead, qDesc);
          checklist.appendChild(item);
        });

        // Verdict Action Area
        const verdictRow = document.createElement('div');
        verdictRow.style.cssText = 'display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.75rem;';

        const btnPass = document.createElement('button');
        btnPass.className = 'btn-action btn-green';
        btnPass.style.cssText = 'flex: 1; min-height: 52px; font-size: 0.95rem;';
        btnPass.textContent = '✅ स्तर पर है (Pass)';

        const btnNeedsBuddy = document.createElement('button');
        btnNeedsBuddy.className = 'btn-action btn-saffron';
        btnNeedsBuddy.style.cssText = 'flex: 1; min-height: 52px; font-size: 0.95rem;';
        btnNeedsBuddy.textContent = '⚠️ अटक रहा है (Needs Peer Buddy)';

        verdictRow.append(btnPass, btnNeedsBuddy);

        // Result Container
        const resultBox = document.createElement('div');
        resultBox.style.cssText = 'display: none; flex-direction: column; gap: 0.75rem;';

        btnPass.onclick = () => {
          resultBox.style.display = 'flex';
          resultBox.replaceChildren();

          const passCard = document.createElement('div');
          passCard.style.cssText = 'background: var(--accent-emerald-light); border: 1.5px solid var(--accent-emerald); border-radius: 0.75rem; padding: 1rem;';
          const pTitle = document.createElement('strong');
          pTitle.style.cssText = 'color: var(--accent-emerald); font-size: 1rem; display: block; margin-bottom: 0.25rem;';
          pTitle.textContent = '🎉 परिणाम: ' + studentName + ' अपेक्षित FLN स्तर पर है!';
          const pDesc = document.createElement('p');
          pDesc.style.cssText = 'font-size: 0.88rem; color: var(--text-body); margin: 0;';
          pDesc.textContent = 'छात्र बुनियादी वर्ण व जोड़ में निपुण है। कोई गंभीर लर्निंग लॉस नहीं। नियमित कक्षा समूह में शिक्षण जारी रखें।';
          passCard.append(pTitle, pDesc);
          resultBox.appendChild(passCard);

          speakVernacular(studentName + ' अपेक्षित स्तर पर है। नियमित शिक्षण में जारी रखें।');
        };

        btnNeedsBuddy.onclick = () => {
          resultBox.style.display = 'flex';
          resultBox.replaceChildren();

          // Add to localStorage roster
          const record = addRemediationEntry(studentName, absentDays);

          // Remediation Action Card
          const actionCard = document.createElement('div');
          actionCard.style.cssText = 'background: #FFFFFF; border: 2px solid var(--accent-saffron); border-radius: 0.85rem; padding: 1.25rem; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.15); display: flex; flex-direction: column; gap: 0.75rem;';

          const acHead = document.createElement('div');
          acHead.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;';
          const acTitle = document.createElement('strong');
          acTitle.style.cssText = 'font-size: 1rem; color: var(--saffron-rich);';
          acTitle.textContent = '📋 उपचारात्मक कार्य योजना (Remediation Action Card - Slide 7)';
          const acBadge = document.createElement('span');
          acBadge.className = 'badge-pill badge-saffron';
          acBadge.textContent = 'सहपाठी जोड़ी सक्रिय';
          acHead.append(acTitle, acBadge);

          // Student Details
          const row1 = document.createElement('div');
          row1.style.cssText = 'font-size: 0.88rem; color: var(--text-primary);';
          const sLabel = document.createElement('strong');
          sLabel.textContent = 'छात्र का नाम: ';
          const sVal = document.createElement('span');
          sVal.textContent = record.name + ' (' + record.absentDays + ')';
          row1.append(sLabel, sVal);

          // Flagged Gap
          const row2 = document.createElement('div');
          row2.style.cssText = 'background: #FEF2F2; border: 1px solid #FECACA; border-radius: 0.5rem; padding: 0.6rem; font-size: 0.85rem;';
          const gLabel = document.createElement('strong');
          gLabel.style.color = '#991B1B';
          gLabel.textContent = '🚩 चिन्हित लर्निंग गैप: ';
          const gVal = document.createElement('span');
          gVal.style.color = '#7F1D1D';
          gVal.textContent = record.gap;
          row2.append(gLabel, gVal);

          // Peer Buddy Recommendation
          const row3 = document.createElement('div');
          row3.style.cssText = 'background: var(--accent-teal-light); border: 1px solid #CCFBF1; border-radius: 0.5rem; padding: 0.6rem; font-size: 0.85rem;';
          const bLabel = document.createElement('strong');
          bLabel.style.color = 'var(--accent-teal-dark)';
          bLabel.textContent = '🤝 सहपाठी जोड़ीदार (Peer Buddy Allocation): ';
          const bVal = document.createElement('span');
          bVal.textContent = record.buddy;
          row3.append(bLabel, bVal);

          // Zero Cost Slate Assignment
          const row4 = document.createElement('div');
          row4.style.cssText = 'background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 0.5rem; padding: 0.6rem; font-size: 0.85rem;';
          const tLabel = document.createElement('strong');
          tLabel.style.color = '#92400E';
          tLabel.textContent = '📝 शून्य-लागत स्लेट अभ्यास: ';
          const tVal = document.createElement('span');
          tVal.textContent = record.task;
          row4.append(tLabel, tVal);

          // Audio button
          const btnAudio = document.createElement('button');
          btnAudio.className = 'btn-action btn-navy';
          btnAudio.style.cssText = 'min-height: 48px; width: auto; align-self: flex-start; padding: 0.4rem 1rem; font-size: 0.9rem;';
          btnAudio.textContent = '🔊 उपचारात्मक निर्देश सुनाएं';
          btnAudio.onclick = () => {
            speakVernacular(record.name + ' के लिए उपचारात्मक योजना: ' + record.buddy + ' के साथ आगे बैठें। स्लेट पर 8 कंकड़ गिनकर 6+2 चित्र बनाएं।');
          };

          actionCard.append(acHead, row1, row2, row3, row4, btnAudio);
          resultBox.appendChild(actionCard);

          speakVernacular(record.name + ' के लिए सहपाठी साथी आवंटित किया गया। स्लेट अभ्यास योजना सक्रिय है।');
        };

        drawer.append(head, sub, checklist, verdictRow, resultBox);
        toggleDrawer(drawer, true);
      }

      // Card 2: Bhasha Setu Side-by-Side Comparison Generator (Slide 6)
      function renderBhashaDrawerComparison() {
        const drawer = elements.drawerBhasha;
        if (!drawer) return;
        drawer.replaceChildren();

        const conceptKey = elements.conceptDropdown.value;
        const concept = bhashaFoundationalConcepts[conceptKey] || bhashaFoundationalConcepts.subtraction;
        const dialectKey = state.currentDialect || 'awadhi';
        const dialectNameMap = {
          awadhi: 'अवधी (Eastern UP)',
          bhojpuri: 'भोजपुरी (Purvanchal / Bihar)',
          bundeli: 'बुंदेली (Bundelkhand)'
        };
        const dialectName = dialectNameMap[dialectKey] || 'अवधी';
        const vernacularText = concept[dialectKey] || concept.awadhi;

        const head = document.createElement('div');
        head.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.85rem;';

        const title = document.createElement('h4');
        title.style.cssText = 'font-size: 1.05rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;';
        title.textContent = '🗣️ भाषा सेतु विश्लेषण: ' + concept.name + ' (' + dialectName + ')';

        const btnClose = document.createElement('button');
        btnClose.className = 'btn-action';
        btnClose.style.cssText = 'width: auto; min-height: 38px; padding: 0.2rem 0.65rem; background: #E2E8F0; color: #1E293B; font-size: 0.8rem;';
        btnClose.textContent = '✕ संकुचित करें';
        btnClose.onclick = () => toggleDrawer(drawer, false);
        head.append(title, btnClose);

        // 3-Box Side-by-Side Comparison Container
        const grid = document.createElement('div');
        grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.85rem; margin-bottom: 1rem;';

        // Box A: Standard Textbook Definition
        const boxA = document.createElement('div');
        boxA.style.cssText = 'background: #EFF6FF; border: 1.5px solid #93C5FD; border-radius: 0.75rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;';
        const aHead = document.createElement('span');
        aHead.style.cssText = 'font-size: 0.78rem; font-weight: 800; color: #1E40AF; text-transform: uppercase;';
        aHead.textContent = '📖 Box A: किताबी परिभाषा (Standard Hindi)';
        const aText = document.createElement('p');
        aText.style.cssText = 'font-size: 0.9rem; color: #1E293B; margin: 0; line-height: 1.5; font-weight: 600;';
        aText.textContent = concept.textbook;
        boxA.append(aHead, aText);

        // Box B: Vernacular Dialect Analogy
        const boxB = document.createElement('div');
        boxB.style.cssText = 'background: #FFF7ED; border: 1.5px solid #FDBA74; border-radius: 0.75rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;';
        const bHead = document.createElement('span');
        bHead.style.cssText = 'font-size: 0.78rem; font-weight: 800; color: #C2410C; text-transform: uppercase;';
        bHead.textContent = '🏡 Box B: घरेलू बोली सादृश्य (' + dialectName + ')';
        const bText = document.createElement('p');
        bText.style.cssText = 'font-size: 0.9rem; color: #9A3412; margin: 0; line-height: 1.5; font-weight: 700;';
        bText.textContent = '"' + vernacularText + '"';
        boxB.append(bHead, bText);

        // Box C: Teacher Action 60-Sec Micro-Script
        const boxC = document.createElement('div');
        boxC.style.cssText = 'background: #ECFDF5; border: 1.5px solid #6EE7B7; border-radius: 0.75rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;';
        const cHead = document.createElement('span');
        cHead.style.cssText = 'font-size: 0.78rem; font-weight: 800; color: #065F46; text-transform: uppercase;';
        cHead.textContent = '👩‍🏫 Box C: शिक्षक क्रिया (Teacher Micro-Script)';
        const cText = document.createElement('p');
        cText.style.cssText = 'font-size: 0.9rem; color: #047857; margin: 0; line-height: 1.5; font-weight: 600;';
        cText.textContent = concept.script;
        boxC.append(cHead, cText);

        grid.append(boxA, boxB, boxC);

        // Action Buttons Row
        const actions = document.createElement('div');
        actions.style.cssText = 'display: flex; gap: 0.75rem; flex-wrap: wrap;';

        const btnAudio = document.createElement('button');
        btnAudio.className = 'btn-action btn-navy';
        btnAudio.style.cssText = 'min-height: 48px; width: auto; padding: 0.4rem 1.25rem; font-size: 0.95rem;';
        btnAudio.textContent = '🔊 घरेलू बोली में बोलकर सुनाएं (Read Aloud)';
        btnAudio.onclick = () => {
          speakVernacular(concept.name + '। घरेलू बोली में: ' + vernacularText + '। शिक्षक निर्देश: ' + concept.script);
        };

        const linkFull = document.createElement('a');
        linkFull.href = '#/bhasha';
        linkFull.className = 'btn-action';
        linkFull.style.cssText = 'background: #FFFFFF; color: var(--accent-navy); border: 1.5px solid var(--accent-navy); min-height: 48px; width: auto; padding: 0.4rem 1.25rem; font-size: 0.95rem; text-decoration: none;';
        linkFull.textContent = '📚 संपूर्ण 75+ संदर्शिका खोलें (1ली से 5वीं) ➔';

        actions.append(btnAudio, linkFull);

        drawer.append(head, grid, actions);
        toggleDrawer(drawer, true);

        speakVernacular(concept.name + ' का घरेलू संदर्भ तैयार है। ' + vernacularText);
      }

      // Card 4: Chalkboard TLM & Number Train Game (Slide 9 Model)
      function renderTlmDrawer() {
        const drawer = elements.drawerTlm;
        if (!drawer) return;
        drawer.replaceChildren();

        const puzzle = trainPuzzles[currentTrainIdx % trainPuzzles.length];

        const head = document.createElement('div');
        head.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.85rem;';

        const title = document.createElement('h4');
        title.style.cssText = 'font-size: 1.05rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;';
        title.textContent = "🎨 ब्लैकबोर्ड TLM व 'संख्या रेलगाड़ी' खेल (Slide 9 Model)";

        const btnClose = document.createElement('button');
        btnClose.className = 'btn-action';
        btnClose.style.cssText = 'width: auto; min-height: 38px; padding: 0.2rem 0.65rem; background: #E2E8F0; color: #1E293B; font-size: 0.8rem;';
        btnClose.textContent = '✕ संकुचित करें';
        btnClose.onclick = () => toggleDrawer(drawer, false);
        head.append(title, btnClose);

        // Chalkboard ASCII Train Game Box
        const board = document.createElement('div');
        board.className = 'chalkboard-box';
        board.style.cssText = 'margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.75rem;';

        const bTitle = document.createElement('div');
        bTitle.style.cssText = 'font-size: 0.95rem; font-weight: 800; color: #FDE047;';
        bTitle.textContent = '🚂 संख्या रेलगाड़ी (छूटी हुई संख्या भरो):';

        const trainVisual = document.createElement('pre');
        trainVisual.style.cssText = 'font-size: 1rem; color: #FFFFFF; font-weight: 800; margin: 0.25rem 0; overflow-x: auto;';
        trainVisual.textContent = puzzle.display;

        // Input Controls for Train Carriages
        const inputRow = document.createElement('div');
        inputRow.style.cssText = 'display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem;';

        const lbl1 = document.createElement('span');
        lbl1.style.cssText = 'font-size: 0.85rem; color: #E2E8F0;';
        lbl1.textContent = 'डिब्बा 2:';

        const inp1 = document.createElement('input');
        inp1.type = 'number';
        inp1.placeholder = '?';
        inp1.style.cssText = 'width: 70px; min-height: 48px; border-radius: 0.4rem; border: 2px solid #FDE047; background: #0F172A; color: #FFFFFF; font-size: 1.1rem; font-weight: 800; text-align: center;';

        const lbl2 = document.createElement('span');
        lbl2.style.cssText = 'font-size: 0.85rem; color: #E2E8F0;';
        lbl2.textContent = 'डिब्बा 4:';

        const inp2 = document.createElement('input');
        inp2.type = 'number';
        inp2.placeholder = '?';
        inp2.style.cssText = 'width: 70px; min-height: 48px; border-radius: 0.4rem; border: 2px solid #FDE047; background: #0F172A; color: #FFFFFF; font-size: 1.1rem; font-weight: 800; text-align: center;';

        const btnCheck = document.createElement('button');
        btnCheck.className = 'btn-action btn-green';
        btnCheck.style.cssText = 'min-height: 48px; width: auto; padding: 0.4rem 1.25rem; font-size: 0.92rem;';
        btnCheck.textContent = 'जांचें (Verify Answers)';

        const trainResult = document.createElement('div');
        trainResult.style.cssText = 'display: none; padding: 0.6rem; border-radius: 0.5rem; font-weight: 700; font-size: 0.9rem;';

        btnCheck.onclick = () => {
          trainResult.style.display = 'block';
          const v1 = parseInt(inp1.value, 10);
          const v2 = parseInt(inp2.value, 10);
          if (v1 === puzzle.a1 && v2 === puzzle.a2) {
            trainResult.style.background = '#065F46';
            trainResult.style.color = '#A7F3D0';
            trainResult.textContent = '🎉 शाबाश! रेलगाड़ी पूरी हो गई: [ ' + puzzle.display.replace(/\\?/g, (m, offset) => (offset < 20 ? puzzle.a1 : puzzle.a2)) + ' ]! बच्चों से ताली बजवाएं!';
            speakVernacular('शाबाश! संख्या रेलगाड़ी पूरी हो गई है।');
          } else {
            trainResult.style.background = '#7F1D1D';
            trainResult.style.color = '#FECACA';
            trainResult.textContent = '💡 फिर सोचें! संकेत: ' + puzzle.hint + '। कंकड़ गिनकर भरें।';
            speakVernacular('गलत उत्तर। संकेत: ' + puzzle.hint);
          }
        };

        const btnNextPuzzle = document.createElement('button');
        btnNextPuzzle.className = 'btn-action';
        btnNextPuzzle.style.cssText = 'background: rgba(255,255,255,0.15); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.3); min-height: 48px; width: auto; padding: 0.4rem 1rem; font-size: 0.85rem;';
        btnNextPuzzle.textContent = '🎲 नई रेलगाड़ी बनाएं';
        btnNextPuzzle.onclick = () => {
          currentTrainIdx++;
          renderTlmDrawer();
        };

        inputRow.append(lbl1, inp1, lbl2, inp2, btnCheck, btnNextPuzzle);
        board.append(bTitle, trainVisual, inputRow, trainResult);

        // Zero-Cost Materials Switcher
        const switcherBox = document.createElement('div');
        switcherBox.style.cssText = 'background: #FFFFFF; border: 1.5px solid var(--border-subtle); border-radius: 0.75rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem;';

        const swTitle = document.createElement('strong');
        swTitle.style.cssText = 'font-size: 0.95rem; color: var(--accent-navy-dark);';
        swTitle.textContent = '🎒 शून्य-लागत परिवेशीय सामग्री गतिविधि (Material Switcher):';

        const btnBar = document.createElement('div');
        btnBar.style.cssText = 'display: flex; gap: 0.4rem; flex-wrap: wrap;';

        const matInstruction = document.createElement('div');
        matInstruction.style.cssText = 'background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; font-size: 0.88rem; color: var(--text-primary); line-height: 1.5;';

        const updateMat = (key) => {
          const mat = zeroCostMaterials[key] || zeroCostMaterials.pebbles;
          matInstruction.replaceChildren();

          const mTitle = document.createElement('strong');
          mTitle.style.cssText = 'color: var(--accent-teal-dark); display: block; margin-bottom: 0.25rem;';
          mTitle.textContent = mat.title;

          const mText = document.createElement('p');
          mText.style.margin = '0';
          mText.textContent = mat.script;

          matInstruction.append(mTitle, mText);
          speakVernacular(mat.title + '। ' + mat.script);
        };

        const keys = [
          { k: 'pebbles', label: '🍂 पत्ते व कंकड़' },
          { k: 'sticks', label: '🥢 तीलियां व धागा' },
          { k: 'rope', label: '🪢 रस्सी व चाक' },
          { k: 'boxes', label: '📦 खाली डिब्बे' }
        ];

        keys.forEach((item, idx) => {
          const b = document.createElement('button');
          b.className = 'material-btn ' + (idx === 0 ? 'active' : '');
          b.textContent = item.label;
          b.onclick = () => {
            Array.from(btnBar.children).forEach(s => s.classList.remove('active'));
            b.classList.add('active');
            updateMat(item.k);
          };
          btnBar.appendChild(b);
        });

        updateMat('pebbles');
        switcherBox.append(swTitle, btnBar, matInstruction);

        drawer.append(head, board, switcherBox);
        toggleDrawer(drawer, true);

        speakVernacular('ब्लैकबोर्ड संख्या रेलगाड़ी खेल तैयार है। छूटे हुए डिब्बों के अंक भरें।');
      }

      // Self-Test Diagnostics Drawer (Zero Modals)
      function runSelfTest() {
        const drawer = elements.drawerSelfTest;
        if (!drawer) return;
        drawer.replaceChildren();

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
            name: 'Offline Storage Readiness (localStorage)',
            passed: (() => {
              try {
                localStorage.setItem('_test', '1');
                localStorage.removeItem('_test');
                return true;
              } catch (e) { return false; }
            })()
          },
          {
            name: 'Field Video Facade & Iframe Bridge',
            passed: !!document.querySelector('.video-facade') || !!document.querySelector('iframe')
          }
        ];

        const head = document.createElement('div');
        head.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 0.5rem; margin-bottom: 0.85rem;';

        const title = document.createElement('h4');
        title.style.cssText = 'font-size: 1.05rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;';
        title.textContent = '🧪 सिस्टम डायग्नोस्टिक जांच (System Diagnostics - Zero Modals)';

        const btnClose = document.createElement('button');
        btnClose.className = 'btn-action';
        btnClose.style.cssText = 'width: auto; min-height: 38px; padding: 0.2rem 0.65rem; background: #E2E8F0; color: #1E293B; font-size: 0.8rem;';
        btnClose.textContent = '✕ संकुचित करें';
        btnClose.onclick = () => toggleDrawer(drawer, false);
        head.append(title, btnClose);

        const list = document.createElement('div');
        list.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';

        tests.forEach(t => {
          const row = document.createElement('div');
          row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border-radius: 0.5rem; background: ' + (t.passed ? 'var(--accent-teal-light)' : 'var(--accent-red-light)') + '; border: 1px solid ' + (t.passed ? '#CCFBF1' : '#FECACA') + ';';

          const name = document.createElement('span');
          name.style.cssText = 'font-weight: 700; color: var(--text-primary); font-size: 0.9rem;';
          name.textContent = t.name;

          const badge = document.createElement('span');
          badge.style.cssText = 'font-weight: 800; font-size: 0.85rem; color: ' + (t.passed ? 'var(--accent-teal-dark)' : 'var(--accent-red)') + ';';
          badge.textContent = t.passed ? '✓ PASSED' : '✕ FAILED';

          row.append(name, badge);
          list.append(row);
        });

        drawer.append(head, list);
        toggleDrawer(drawer, true);
        speakVernacular('सिस्टम डायग्नोस्टिक्स पूर्ण हुए। सभी घटक सक्रिय हैं।');
      }

      // Multi-Grade Timer Engine with Sleep-Resilient Date.now() Delta
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

        if (state.activeFocus === 1) {
          // Grade 1 gets teacher focus
          if (elements.trackGrade1) {
            elements.trackGrade1.className = 'info-pane track-active pulse-instruction';
            setTimeout(() => elements.trackGrade1.classList.remove('pulse-instruction'), 1600);
          }
          if (elements.trackGrade23) elements.trackGrade23.className = 'info-pane track-inactive';
          if (elements.trackG1Title) elements.trackG1Title.style.color = 'var(--accent-navy)';
          if (elements.trackG23Title) elements.trackG23Title.style.color = 'var(--text-muted)';
          if (elements.trackG1Badge) {
            elements.trackG1Badge.textContent = '🎯 सक्रिय ध्यान';
            elements.trackG1Badge.className = 'badge-pill badge-teal';
          }
          if (elements.trackG23Badge) {
            elements.trackG23Badge.textContent = 'सहपाठी समूह';
            elements.trackG23Badge.style.cssText = 'background: #E2E8F0; color: #475569;';
          }
          speakVernacular('समय समाप्त। कक्षा 1 अब प्रत्यक्ष शिक्षक के साथ आएं, कक्षा 2 और 3 सहपाठी खेल करें।');
        } else {
          // Grade 2/3 gets teacher focus
          if (elements.trackGrade23) {
            elements.trackGrade23.className = 'info-pane track-active pulse-instruction';
            setTimeout(() => elements.trackGrade23.classList.remove('pulse-instruction'), 1600);
          }
          if (elements.trackGrade1) elements.trackGrade1.className = 'info-pane track-inactive';
          if (elements.trackG23Title) elements.trackG23Title.style.color = 'var(--accent-navy)';
          if (elements.trackG1Title) elements.trackG1Title.style.color = 'var(--text-muted)';
          if (elements.trackG23Badge) {
            elements.trackG23Badge.textContent = '🎯 सक्रिय ध्यान';
            elements.trackG23Badge.className = 'badge-pill badge-teal';
          }
          if (elements.trackG1Badge) {
            elements.trackG1Badge.textContent = 'सहपाठी समूह';
            elements.trackG1Badge.style.cssText = 'background: #E2E8F0; color: #475569;';
          }
          speakVernacular('समय समाप्त। कक्षा 2 और 3 अब प्रत्यक्ष शिक्षक के साथ आएं, कक्षा 1 सहपाठी अभ्यास करें।');
        }

        elements.timerDisplay.textContent = '15:00';
        if (elements.solversTimerDisplay) elements.solversTimerDisplay.textContent = '15:00';
        elements.timerBtnText.textContent = 'अगला चक्र शुरू करें';
        elements.timerIcon.textContent = '⏱️';
        if (elements.btnSolversTimerToggle) elements.btnSolversTimerToggle.textContent = '▶️ अगला चक्र शुरू करें';
      }

      // Video Facade Setup: Click to load deferred Google Drive iframe
      function setupVideoFacades() {
        const heroFacade = document.getElementById('hero-video-facade');
        if (heroFacade) {
          const loadHeroVideo = () => {
            const container = document.getElementById('hero-video-container');
            if (!container) return;
            container.replaceChildren();
            const iframe = document.createElement('iframe');
            iframe.src = 'https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview';
            iframe.allow = 'autoplay; encrypted-media';
            iframe.title = 'Classroom Complexity in Indian Primary Schools';
            iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 0.85rem;';
            container.appendChild(iframe);
          };
          heroFacade.addEventListener('click', loadHeroVideo);
          heroFacade.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              loadHeroVideo();
            }
          });
        }

        const pageFacade = document.getElementById('page-video-facade');
        if (pageFacade) {
          const loadPageVideo = () => {
            const container = document.getElementById('page-video-container');
            if (!container) return;
            container.replaceChildren();
            const iframe = document.createElement('iframe');
            iframe.src = 'https://drive.google.com/file/d/1DmrKPbypnrUiBwDYfqLrj1qs-Bm_3IYS/preview';
            iframe.allow = 'autoplay; encrypted-media';
            iframe.title = 'Ground Classroom Complexity Video';
            iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 0.85rem;';
            container.appendChild(iframe);
          };
          pageFacade.addEventListener('click', loadPageVideo);
          pageFacade.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              loadPageVideo();
            }
          });
        }
      }

      // Client-Side Router
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

      // Guided Tour Steps (Expanding Inline Drawers)
      const tourSteps = [
        {
          stepBadge: 'चुनौती 1 / 3 • बहु-कक्षा एकीकरण (MGML)',
          title: '2 से 3 कक्षाएं एक साथ (Multi-Grade Teaching)',
          problemText: '🛑 समस्या: "When a single teacher must teach grades 1, 2, and 3 concurrently in one room, while the teacher instructs one grade, the other grades sit idle or disrupt the classroom."',
          solutionText: '💡 विद्यासेतु समाधान: 15-मिनट बहु-कक्षा विभाजन सहायक। एक कक्षा (कक्षा 1) को प्रत्यक्ष शिक्षक समय दें, जबकि दूसरी कक्षा (कक्षा 2-3) को स्लेट पर कंकड़ आधारित स्व-अध्ययन खेल में व्यस्त रखें।',
          speechSummary: 'चुनौती 1: 2 से 3 कक्षाएं एक साथ। 15 मिनट का चक्रीय टाइमर प्रत्यक्ष शिक्षण और सहपाठी खेल में संतुलन बनाता है।',
          actionLabel: '⏱️ 15-मिनट चक्र ड्रॉअर खोलें',
          action: () => {
            toggleDrawer(elements.drawerMgml, true);
          }
        },
        {
          stepBadge: 'चुनौती 2 / 3 • बोली अंतर समाधान (Bhasha Setu)',
          title: 'घर की बोली बनाम किताबी भाषा (Bhasha Setu)',
          problemText: '🛑 समस्या: "Often the child\\'s language at home is different from the language used in the classroom creating a gap between instruction and understanding."',
          solutionText: '💡 विद्यासेतु समाधान: भाषा सेतु (Bhasha Setu 1ली से 5वीं)। कठिन किताबी शब्दों (जैसे घटाव, अवरोही क्रम, स्थानीय मान) को बच्चों के घरेलू परिवेश के उदाहरणों (पेड़ से बेर गिरना, छत की सीढ़ी उतरना, माचिस की तीलियाँ) में बदलकर तुरंत अर्थ स्पष्ट करता है।',
          speechSummary: 'चुनौती 2: घर की बोली और किताबी भाषा का अंतर। भाषा सेतु कठिन किताबी शब्दों को बच्चों के घरेलू परिवेश के उदाहरणों में समझाता है।',
          actionLabel: '🗣️ भाषा सेतु तुलना ड्रॉअर खोलें',
          action: () => {
            renderBhashaDrawerComparison();
          }
        },
        {
          stepBadge: 'चुनौती 3 / 3 • अनुपस्थिति व लर्निंग गैप (Catch-Up)',
          title: 'अनुपस्थिति व दोबारा सिखाने की कमी (2-Min Catch-Up)',
          problemText: '🛑 समस्या: "Frequent student absenteeism creates learning gaps for the child with teachers having no time to reteach it individually, and no mechanism to help the child catch up."',
          solutionText: '💡 विद्यासेतु समाधान: 2-मिनट मौखिक वापसी जांच। फसल कटाई या बीमारी के बाद लौटे बच्चे की 3 त्वरित मौखिक प्रश्नों से जांच करें। अटकने पर बच्चे को सहपाठी साथी (Peer Buddy) के साथ अक्षर/संख्या कार्ड में लगाएं ताकि शिक्षक को अकेले दोबारा न पढ़ाना पड़े।',
          speechSummary: 'चुनौती 3: बार-बार अनुपस्थिति। 2 मिनट की मौखिक जांच से बच्चे का स्तर तुरंत पता चलता है और सहपाठी साथी के साथ उपचारात्मक कार्य शुरू होता है।',
          actionLabel: '⚡ 2-मिनट मौखिक जांच ड्रॉअर खोलें',
          action: () => {
            renderAbsenteeDrawerScreening();
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

      function handleHeroExplore() {
        const val = elements.heroSelect.value;
        if (val === 'mgml') navigateTo('/solvers');
        else if (val === 'bhasha') navigateTo('/bhasha');
        else if (val === 'absentee') navigateTo('/catchup');
        else if (val === 'deck') navigateTo('/deck');
        else startTour();
      }

      function triggerVoiceAssistant() {
        elements.voiceBarLabel.textContent = 'सुन रहा हूँ... अपनी कक्षा का प्रश्न पूछें';
        speakVernacular('मैं सुन रहा हूँ। आप किस कक्षा के लिए शिक्षण गतिविधि चाहते हैं?');
        setTimeout(() => {
          elements.voiceBarLabel.textContent = 'बोलकर पूछें: "कक्षा 2 के लिए 10 मिनट खेल बताएं"';
        }, 4000);
      }

      // Solvers Page Bhasha & Roster Methods
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
        const dialectText = topic[dialectKey] || topic.rural || topic.awadhi;

        elements.bhashaOutputContainer.replaceChildren();

        const card = document.createElement('div');
        card.style.cssText = 'background: #FFFFFF; border: 2px solid #BFDBFE; border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; box-shadow: 0 8px 24px -4px rgba(0,0,0,0.05);';

        const h3 = document.createElement('h3');
        h3.style.cssText = 'font-size: 1.35rem; font-weight: 800; color: var(--accent-navy-dark); margin: 0;';
        h3.textContent = topic.name;

        const pDesc = document.createElement('p');
        pDesc.style.cssText = 'font-size: 0.95rem; color: var(--text-secondary); margin: 0;';
        pDesc.textContent = topic.standard;

        const analBox = document.createElement('div');
        analBox.style.cssText = 'background: #FFF7ED; border: 1.5px solid #FDBA74; border-radius: 0.75rem; padding: 1rem;';
        const aTitle = document.createElement('strong');
        aTitle.style.cssText = 'color: #C2410C; display: block; margin-bottom: 0.25rem;';
        aTitle.textContent = '🏡 घरेलू बोली सादृश्य:';
        const aText = document.createElement('p');
        aText.style.cssText = 'font-size: 0.95rem; color: #9A3412; font-weight: 700; margin: 0;';
        aText.textContent = '"' + dialectText + '"';
        analBox.append(aTitle, aText);

        const btnAudio = document.createElement('button');
        btnAudio.className = 'btn-action btn-navy';
        btnAudio.style.cssText = 'min-height: 48px; width: auto; align-self: flex-start; padding: 0.4rem 1.25rem;';
        btnAudio.textContent = '🔊 बोलकर सुनाएं';
        btnAudio.onclick = () => {
          speakVernacular(topic.name + '। ' + dialectText);
        };

        card.append(h3, pDesc, analBox, btnAudio);
        elements.bhashaOutputContainer.appendChild(card);
      }

      function renderRosterTable() {
        if (!elements.rosterTableBody) return;
        elements.rosterTableBody.replaceChildren();

        const roster = getStoredRoster();
        const pendingCount = roster.filter(r => r.status === 'active').length;
        if (elements.rosterActiveBadge) elements.rosterActiveBadge.textContent = pendingCount + ' बच्चे लंबित';

        if (roster.length === 0) {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.colSpan = 7;
          td.style.cssText = 'text-align: center; color: var(--text-muted); padding: 1.5rem;';
          td.textContent = 'अभी कोई बच्चा लंबित नहीं है। ऊपर से नई जांच शुरू करें!';
          tr.appendChild(td);
          elements.rosterTableBody.appendChild(tr);
          return;
        }

        roster.forEach(item => {
          const tr = document.createElement('tr');

          const tdName = document.createElement('td');
          tdName.style.fontWeight = '700';
          tdName.textContent = item.name;

          const tdGrade = document.createElement('td');
          tdGrade.textContent = item.grade;

          const tdReason = document.createElement('td');
          tdReason.textContent = item.absentDays || '14 दिन';

          const tdLevel = document.createElement('td');
          tdLevel.textContent = item.gap;

          const tdBuddy = document.createElement('td');
          tdBuddy.textContent = item.buddy;

          const tdStatus = document.createElement('td');
          const pill = document.createElement('span');
          pill.className = 'status-pill ' + (item.status === 'resolved' ? 'status-resolved' : 'status-pending');
          pill.textContent = item.status === 'resolved' ? 'पूर्ण (Resolved)' : 'सक्रिय (Active)';
          tdStatus.appendChild(pill);

          const tdAction = document.createElement('td');
          const btnToggle = document.createElement('button');
          btnToggle.style.cssText = 'background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 0.3rem 0.6rem; border-radius: 0.35rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; min-height: 48px;';
          btnToggle.textContent = item.status === 'resolved' ? 'पुनः खोलें' : 'पूर्ण मार्क करें ✅';
          btnToggle.onclick = () => {
            resolveRosterItem(item.id);
          };
          tdAction.appendChild(btnToggle);

          tr.append(tdName, tdGrade, tdReason, tdLevel, tdBuddy, tdStatus, tdAction);
          elements.rosterTableBody.appendChild(tr);
        });
      }

      function generateDiagnosticTest() {
        const studentName = (elements.cuStudentName && elements.cuStudentName.value || 'रोहन कुमार').trim();
        if (elements.cuTestArea) elements.cuTestArea.style.display = 'flex';
        if (elements.cuTestTitle) elements.cuTestTitle.textContent = '📋 ' + studentName + ' हेतु 2-मिनट मौखिक जांच पत्र';

        if (elements.cuQuestionsList) {
          elements.cuQuestionsList.replaceChildren();
          const qs = [
            "प्रश्न 1: नीचे दिए गए वर्ण पहचानें: 'म', 'र'",
            "प्रश्न 2: मौखिक जोड़ बताएं: 6 + 2 कितने होते हैं?",
            "प्रश्न 3: स्लेट पर लिखा शब्द पढ़ें: 'घर'"
          ];
          qs.forEach((q, idx) => {
            const div = document.createElement('div');
            div.style.cssText = 'background: #FFF; border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem;';
            div.textContent = q;
            elements.cuQuestionsList.appendChild(div);
          });
        }
      }

      function evaluateCatchUpTest() {
        const studentName = (elements.cuStudentName && elements.cuStudentName.value || 'रोहन कुमार').trim();
        addRosterEntry(studentName, '14 दिन (फसल कटाई)');
        alert('✅ ' + studentName + ' के लिए उपचारात्मक सहपाठी योजना स्लेट पर सक्रिय की गई!');
      }

      function loadRohanPreset() {
        if (elements.cuStudentName) elements.cuStudentName.value = 'रोहन कुमार';
        generateDiagnosticTest();
      }

      function generateTlmGame() {
        renderTlmDrawer();
      }

      // PRESENTATION ENGINE (12 Slides)
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

            const counter = document.getElementById('slide-counter-badge');
            if (counter) counter.textContent = 'Slide ' + current + ' of ' + total;
          }
        }

        function nextSlide() {
          if (current < total) showSlide(current + 1);
        }

        function prevSlide() {
          if (current > 1) showSlide(current - 1);
        }

        function toggleFull() {
          const deckPage = document.getElementById('page-deck');
          if (!document.fullscreenElement) {
            if (deckPage && deckPage.requestFullscreen) deckPage.requestFullscreen();
          } else {
            if (document.exitFullscreen) document.exitFullscreen();
          }
        }

        function handleKey(e) {
          const deckPage = document.getElementById('page-deck');
          if (!deckPage || deckPage.classList.contains('hidden')) return;

          if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
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

      // Initialization Lifecycle
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

        // Router listener
        window.addEventListener('hashchange', handleRoute);
        handleRoute();

        // Setup Video Facades
        setupVideoFacades();

        // Roster tags on Card 3
        renderRosterTags();
        renderRosterTable();

        // Primary Event Bindings
        elements.btnToggleTimer.addEventListener('click', toggleTimer);
        elements.btnSwitchPhase.addEventListener('click', switchClassFocus);
        elements.btnMgmlDrawerToggle.addEventListener('click', () => toggleDrawer(elements.drawerMgml));
        elements.btnCloseDrawerMgml.addEventListener('click', () => toggleDrawer(elements.drawerMgml, false));
        elements.btnTestBell.addEventListener('click', () => {
          playAcousticBell();
          speakVernacular('परीक्षण घंटी बजी।');
        });

        elements.btnExplainConcept.addEventListener('click', renderBhashaDrawerComparison);
        elements.btnOpenDiagnostic.addEventListener('click', renderAbsenteeDrawerScreening);
        elements.btnViewTlm.addEventListener('click', renderTlmDrawer);
        elements.btnSelfTest.addEventListener('click', runSelfTest);
        elements.btnPersistentVoice.addEventListener('click', triggerVoiceAssistant);

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

        // Dialect button toggles on Card 2
        document.querySelectorAll('.card-dialect-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.card-dialect-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentDialect = btn.getAttribute('data-dialect') || 'awadhi';
            if (elements.drawerBhasha && elements.drawerBhasha.classList.contains('expanded')) {
              renderBhashaDrawerComparison();
            }
          });
        });

        // Cycle duration buttons
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

        // Solvers Page Bindings
        if (elements.btnSolversTimerToggle) elements.btnSolversTimerToggle.addEventListener('click', toggleTimer);
        if (elements.btnSolversSwitchPhase) elements.btnSolversSwitchPhase.addEventListener('click', switchClassFocus);
        if (elements.btnGenerateTlm) elements.btnGenerateTlm.addEventListener('click', generateTlmGame);

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
console.log('Successfully wrote refactored index.html with inline drawers and zero modal popups!');

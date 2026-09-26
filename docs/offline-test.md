# KakshaSahay Offline Capability & Resilience Verification Report

> **Audited By:** Senior Full-Stack Engineer / Reliability Review  
> **Date:** September 2026  
> **Claim Statement:** *Offline-capable core classroom workflows after initial caching.*  
> **Evidence Tier:** `Verified in code` | `Verified by automated test` | `Verified manually`

---

## 1. Test Environment Specification

* **Operating System:** Windows 11 Enterprise (x64)
* **Tested Browsers:**
  * Google Chrome `128.x` (Engine: Chromium / Blink)
  * Microsoft Edge `128.x`
  * Headless Chromium (Playwright Automation Suite)
* **Local Web Server:** Node.js HTTP Server (`serve.js`, port 3001)
* **PWA Service Worker:** `sw.js` (Cache identifier: `kakshasahay-v14-rebrand`)
* **Network Throttling / Offline Simulation:**
  * Chrome DevTools: `Network = Offline`
  * Playwright BrowserContext: `setOffline(true)`
  * Physical NIC disconnect simulation

---

## 2. Verification Protocol

1. **Step 1 (First-Time Online Seed):**
   * Navigate to `http://localhost:3001/` (or live production URL).
   * Confirm Service Worker registration (`navigator.serviceWorker.register('./sw.js')`).
   * Confirm all core cache targets (`index.html`, `css/styles.css`, `manifest.json`, `assets/icon.svg`, and modular scripts) are stored in Cache Storage under `kakshasahay-v14-rebrand`.
2. **Step 2 (Simulate Complete Disconnection):**
   * Disconnect network interface / set browser context to `offline`.
   * Trigger hard refresh (`Ctrl + Shift + R` or `page.reload()`).
   * Verify HTTP 200 equivalent delivery via Service Worker cache-first handler.
3. **Step 3 (Solver Functional Matrix):**
   * Exercise each of the 4 core solvers in disconnected state.
   * Verify state persistence in `localStorage`.
   * Verify English ⟷ Hindi bilingual UI toggle.
4. **Step 4 (Online-Only Graceful Degradation):**
   * Observe external video container behavior when offline.

---

## 3. Detailed Results Matrix

| Capability / Workflow | Target Subsystem | Offline Operational Status | Verification Method | Notes & Constraints |
|:---|:---|:---:|:---:|:---|
| **App Shell & Boot** | PWA Service Worker (`sw.js`) | ✅ **PASS** | Automated Test & Manual | Loads instantaneously from cache without network packet exchange. |
| **Solver 1: 15-Min Timer** | `TimerEngine` & Web Audio API | ✅ **PASS** | Automated Test (`timer.test.js`, `e2e.spec.js`) | True delta clock (`Date.now() - startTime`) computes drift-free countdown. Synthesized acoustic bell plays via Web Audio oscillator without external audio files. |
| **Solver 2: Bhasha Setu** | `CURRICULUM_DATA` & `GenerativeRAG` | ✅ **PASS** | Automated Test (`pedagogical.test.js`, `e2e.spec.js`) | Local rule-based table + dialect village archetypes generate analogies for Awadhi, Bhojpuri, Bundeli, Chhattisgarhi, and Maithili without server calls. |
| **Solver 3: Absentee Triage** | Oral Screening & `StorageVault` | ✅ **PASS** | Automated Test (`storage.test.js`, `e2e.spec.js`) | Screening flow executes locally. Records persist in browser `localStorage` and survive page reload. |
| **Solver 4: Zero-Cost TLM** | Train Puzzles & Concrete Practice | ✅ **PASS** | Automated Test (`e2e.spec.js`) | Dynamic arithmetic problem generator and ASCII train run via deterministic client JavaScript. |
| **Classroom Copilot** | Regex & Heuristic Intent Engine | ✅ **PASS** | Automated Test (`suite.js`) | 12 built-in pedagogical micro-scripts match query patterns offline. |
| **Bilingual Toggle** | `TRANSLATIONS` Object | ✅ **PASS** | Automated Test (`e2e.spec.js`) | In-memory key-value dictionary swaps DOM text content with zero latency. |
| **Speech Synthesis (TTS)** | `window.speechSynthesis` | ⚠️ **PARTIAL** | Verified Manually (`Requires human QA`) | Speech playback uses local browser-installed TTS voices (e.g. Android Hindi voice data). If host device lacks an offline Hindi TTS voice pack, the browser silently ignores or falls back to system default. |
| **Field Showcase Video** | Embedded Google Drive `<iframe>` | ❌ **ONLINE ONLY** | Verified Manually & Code Review | External video streaming cannot function offline. The application detects offline state and displays a graceful fallback message (`#video-offline-notice`). |
| **Cloud Edge LLM Mode** | Gemini 2.5 Flash API (`js/rag.js`) | ❌ **ONLINE ONLY** | Verified in Code | Requires internet connectivity and user-provided API key. Engine automatically falls back to local on-device knowledge bank when offline. |

---

## 4. Failure Mode & Resilience Analysis

### Video Offline Handling
* **Trigger:** Disconnected network during session, or initial load offline after cache installation.
* **Observed UI Behavior:** The container renders `#video-offline-notice`:
  > *"📶 External Video Resource Offline: Field documentation video requires an internet connection. All core pedagogical tools (MGML Timer, Bhasha Setu, Absentee Triage, Chalkboard TLM) remain fully operational offline without connectivity."*
* **Outcome:** The user is explicitly notified without broken layouts or uncaught console exceptions.

### LocalStorage Corruption / Quota Limit
* **Observed Behavior:** If `localStorage` is disabled or corrupted, `StorageVault` catches parse errors and falls back to an empty in-memory array rather than crashing the page.

---

## 5. Scope of Offline Guarantee

KakshaSahay guarantees that **frontline teachers can conduct an entire multigrade school day offline** once the initial application is cached. The core pedagogy, timers, dialect adaptations, student triage, and games do **not** depend on cloud connectivity.

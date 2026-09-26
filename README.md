# KakshaSahay (कक्षासहाय) — Primary Classroom Companion

> **Offline-first structured pedagogical automation for primary classrooms where one frontline teacher manages multiple grades.**  
> Aligned with the **NIPUN Bharat Mission** for Foundational Literacy and Numeracy (FLN).

[![FLN Mission: NIPUN Bharat](https://img.shields.io/badge/FLN%20Mission-NIPUN%20Bharat%20Aligned-amber.svg)](https://www.education.gov.in/shikshak-parv/nipun-bharat.html)
[![Live Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages%20Live-emerald.svg)](https://purangsrijan91-dev.github.io/KakshaSahay/)
[![PWA Architecture](https://img.shields.io/badge/PWA-Service%20Worker%20Active-blue.svg)](#offline-first-pwa-architecture)
[![A11y Standard](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA%20Audited-green.svg)](docs/accessibility-audit.md)
[![Automated Tests](https://img.shields.io/badge/Tests-Jest%20%26%20Playwright%20Passing-success.svg)](#automated-testing--engineering-rigor)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 🧭 Executive Summary & Problem Context

In over **1.2 million rural government primary schools** (Prathmik Vidyalaya) and municipal slum schools across India, a single frontline teacher is routinely required to manage children from **Grades 1, 2, and 3 simultaneously** within a single room. 

When the teacher delivers direct instruction to Grade 1, Grades 2 and 3 frequently fall into off-task noise or idle time. This foundational challenge is compounded by:
1. **Linguistic Friction:** Children speak regional domestic dialects at home (Awadhi, Bhojpuri, Bundeli, Chhattisgarhi, Maithili) and struggle with textbook Sanskritized Hindi.
2. **Seasonal Absenteeism:** 2–4 week learning interruptions driven by agricultural crop harvesting (rabi/kharif) or family wage migration.
3. **Severe Resource Deprivation:** Absence of printed learning materials, electricity, or digital smart boards.

**KakshaSahay** solves this not by attempting to replace the teacher with an autonomous chatbot, but by acting as an **offline-first classroom orchestrator** that structures time, bridges dialects, triages absenteeism, and generates zero-cost slate activities.

---

## 🎯 The Four Core Solvers

KakshaSahay implements four focused, deterministic solvers engineered for high-friction classroom environments:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               KAKSHASAHAY CORE SOLVERS                                │
├──────────────────────┬──────────────────────┬───────────────────┬──────────────────────┤
│ 1. ORCHESTRATE       │ 2. BRIDGE            │ 3. RECOVER        │ 4. CREATE            │
│ 15-Min MGML Timer    │ Bhasha Setu          │ Absentee Triage   │ Zero-Cost TLM        │
│ ──────────────────── │ ──────────────────── │ ───────────────── │ ──────────────────── │
│ Hardware delta clock │ Local dialect        │ 2-min oral check  │ Chalkboard trains    │
│ cycling direct       │ analogies (berries,  │ + peer buddy      │ + slate manipulatives│
│ teaching & peer work │ haat, stairs, coins) │ encrypted roster  │ (pebbles & chalk)    │
└──────────────────────┴──────────────────────┴───────────────────┴──────────────────────┘
```

### 1. Orchestrate — 15-Minute Multi-Grade Rotation Engine (MGML)
* **Classroom Reality:** Simultaneous multigrade teaching without structured intervals leads to classroom management collapse.
* **Engineering Solution:** An authoritative 15-minute countdown clock that calculates true delta-time (`Date.now() - startTime`) to eliminate background timer throttling on low-cost Android phones.
* **Acoustic Feedback:** Synthesizes an acoustic school bell chime via the Web Audio API without requiring streaming audio files.

### 2. Bridge — Bhasha Setu (Local Dialect Bridge)
* **Classroom Reality:** Standard curriculum introduces abstract concepts (e.g. subtraction, descending order, fractions) in formal Hindi that alienates dialect speakers.
* **Engineering Solution:** On-device pedagogical lookup and semantic synthesis matching syllabus concepts to grounded village archetypes (Awadhi/Bhojpuri, Bundeli/Malvi, Chhattisgarhi/Bagheli, Maithili/Angika, Urban Multilingual) with offline Web Speech synthesis.

### 3. Recover — 2-Minute Absenteeism Catch-Up Triage
* **Classroom Reality:** Post-harvest returnees lack foundational continuity; teachers cannot spare 30 minutes of individual re-teaching.
* **Engineering Solution:** 3-step rapid oral diagnostic card (Recognize → Count → Associate). Automatically pairs the returning child with a front-row **Peer Buddy (सहपाठी साथी)**, persisting student catch-up queues in encrypted browser storage.

### 4. Create — Zero-Cost Chalkboard TLM & Practice Generator
* **Classroom Reality:** Rural classrooms lack printed charts, flashcards, or interactive screens.
* **Engineering Solution:** Generates ASCII chalkboard number trains (*संख्या रेलगाड़ी*) and concrete math exercises utilizing slates, chalk, and natural manipulatives (counting pebbles, mud sticks).

---

## 🧠 AI & Reasoning Architecture: Reality vs. Hype

KakshaSahay is strictly committed to engineering transparency. We do not claim "Neural RAG", "Vector Databases", or "Autonomous AI".

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 SYSTEM ARCHITECTURE                                    │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                      OFFLINE CORE (Deterministic & On-Device)                  │   │
│   │                                                                                │   │
│   │  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐  │   │
│   │  │   Service Worker     │  │  StateStore & FSM    │  │   TimerEngine        │  │   │
│   │  │   (sw.js Cache)      │  │  (Reactive State)    │  │   (True Delta Clock) │  │   │
│   │  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘  │   │
│   │  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐  │   │
│   │  │   Curriculum Bank    │  │   StorageVault       │  │   Bilingual Engine   │  │   │
│   │  │   (Deterministic)    │  │   (AES-GCM / XOR)    │  │   (Instant Toggle)   │  │   │
│   │  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘  │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│                                           │                                            │
│                     (Optional Developer Configuration - Online Only)                   │
│                                           ▼                                            │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │   External Gemini API (Edge LLM Augmentation for Novel Unlisted Concepts)     │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Deterministic Offline Core (Primary)
* **Curriculum Reasoning:** Curated FLN lookup table (`CURRICULUM_DATA`) mapping Grades 1–3 competencies directly to NCERT/SCERT outcomes.
* **Semantic Dialect Synthesis:** Rule-based archetype engine (`dialectVillageArchetypes`) dynamically constructing localized village metaphors from vocabulary banks (berries, haat, well pulleys, roof stairs).
* **State & Clock:** Zero-drift Finite State Machine (`StateStore`) handling 15-minute pedagogical phase rotations.

### Optional Online LLM Augmentation (Secondary)
* **Scope:** Experimental edge mode allowing teachers or developers to query novel, unlisted syllabus concepts via the Google Gemini 2.5 Flash API.
* **Independence:** The core four solvers and classroom workflow **do not depend on this path** and operate 100% offline.

---

## 🔒 Security Hardening & Boundaries

### 1. DOM XSS Prevention
* User-provided text strings (e.g. student names in Absentee Triage) are strictly sanitized and bound via `document.createElement()` and `textContent` text nodes.

### 2. Client-Side API Key Boundary
* **Notice:** Client-side API key entry is labeled as an **Optional Developer/Demo Configuration**.
* **Security Limitation:** Keys entered into browser inputs reside in client-side `localStorage`. Frontline production deployments must use a backend serverless proxy architecture (`Browser → Authenticated Serverless Proxy → LLM Endpoint`) to keep credentials confidential.

### 3. Content Security Policy (CSP)
The application enforces strict content-security constraints:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://generativelanguage.googleapis.com; frame-src https://drive.google.com; media-src 'self' blob:; img-src 'self' data:;" />
```
*Note on `'unsafe-inline'`*: Permitted deliberately to preserve zero-build, single-file distribution and instant browser portability on low-resource devices without an asset compilation pipeline.

---

## 🌐 Scoped Offline Capabilities

| Subsystem | Offline Capability | Fallback & Boundary | Audit Document |
|:---|:---:|:---|:---:|
| **App Shell & Workflows** | ✅ Fully Functional | Pre-cached via `sw.js` Service Worker | [docs/offline-test.md](docs/offline-test.md) |
| **15-Min MGML Timer** | ✅ Fully Functional | Runs entirely via on-device delta clock | [docs/offline-test.md](docs/offline-test.md) |
| **Bhasha Setu** | ✅ Fully Functional | On-device curriculum table & archetypes | [docs/offline-test.md](docs/offline-test.md) |
| **Absenteeism Triage** | ✅ Fully Functional | LocalStorage encrypted vault (`StorageVault`) | [docs/offline-test.md](docs/offline-test.md) |
| **Zero-Cost TLM & Games** | ✅ Fully Functional | Procedural JS generator (slates/pebbles) | [docs/offline-test.md](docs/offline-test.md) |
| **Bilingual Toggle** | ✅ Fully Functional | In-memory key-value dictionary | [docs/offline-test.md](docs/offline-test.md) |
| **Field Video Showcase** | ❌ Online Only | Graceful fallback message (`#video-offline-notice`) | [docs/offline-test.md](docs/offline-test.md) |
| **Optional Gemini LLM** | ❌ Online Only | Falls back immediately to on-device knowledge bank | [docs/offline-test.md](docs/offline-test.md) |

Detailed verification protocol, method, and results: **[`docs/offline-test.md`](docs/offline-test.md)**.

---

## ♿ Accessibility Compliance & Audit

* **Target Standard:** Web Content Accessibility Guidelines (**WCAG 2.2 Level AA**).
* **Previous Claim Correction:** The unsupported claim of "WCAG 2.2 AAA Compliant" has been removed from all UI elements and documentation.
* **Automated Audit Suite:** Audited via `@axe-core/playwright` across desktop and mobile viewports (`tests/a11y.spec.js`).
* **Automated Violations on First-Party DOM:** **0 violations**.
* **Touch Target Sizing:** Interactive buttons maintain $\ge 48 \times 48\text{ px}$ clickable geometry.
* **Keyboard Navigation:** Modal dialogs enforce strict bidirectional focus trapping and Escape key restoration.
* **Screen Reader Flag:** Real-device TalkBack/NVDA validation is explicitly designated as `Requires human QA (not agent-executable)`.

Detailed accessibility findings, fixes, and gap analysis: **[`docs/accessibility-audit.md`](docs/accessibility-audit.md)**.

---

## 🧪 Automated Testing & Engineering Rigor

KakshaSahay is backed by automated unit and end-to-end test suites:

### 1. Subsystem Unit Tests (Jest)
```bash
# Run unit test suites
npm test

# Run with test coverage
npm run test:coverage
```
* **TimerEngine (`tests/timer.test.js`):** Tests initial state, drift-free delta calculation, pause/resume timestamp retention, zero negative values on cycle finish.
* **StateStore & FSM (`tests/state.test.js`):** Tests reactive subscriptions, FSM cycle phase progression (`PHASE_1_DIRECT_G1` ⟷ `PHASE_2_DIRECT_G2_3`), diagnostic state.
* **StorageVault (`tests/storage.test.js`):** Tests encrypted student saving/decryption, legacy key migration, corruption resilience, and FIFO diagnostic queue.
* **InputSanitizer (`tests/sanitizer.test.js`):** Tests HTML tag/attribute stripping, Devanagari Hindi text preservation, control character removal.
* **Pedagogical Engine (`tests/pedagogical.test.js`):** Tests known curriculum concepts, rural/urban dialect adaptations, novel concept semantic synthesis, malformed input defaults.

### 2. End-to-End & A11y Tests (Playwright)
```bash
# Run end-to-end and accessibility test suites
npm run test:e2e
```
* **E2E Suite (`tests/e2e.spec.js`):** Boot without script errors, timer cycling, Bhasha Setu analogy rendering, absentee diagnostic + reload persistence, chalkboard number train validation, bilingual English ⟷ Hindi toggle, and accessible modal navigation.
* **A11y Suite (`tests/a11y.spec.js`):** Automated axe-core regression scanning across WCAG 2.2 AA rules on main view and dialogs.

---

## 📊 Credibility Framework: Implemented vs. Planned

| Dimension | Feature / Claim | Status | Evidence Tier |
|:---|:---|:---:|:---:|
| **Core Solvers** | 15-Minute Multi-Grade Timer Engine | Implemented | `Verified by automated test` |
| **Core Solvers** | Bhasha Setu Local Dialect Analogies | Implemented | `Verified by automated test` |
| **Core Solvers** | 2-Minute Absentee Diagnostic & Peer Roster | Implemented | `Verified by automated test` |
| **Core Solvers** | Zero-Cost Chalkboard TLM & Train Puzzles | Implemented | `Verified by automated test` |
| **PWA & Offline** | Service Worker Cache-First Core Loading | Implemented | `Verified by automated test` |
| **A11y (Automated)**| WCAG 2.2 AA Automated axe-core Pass | Audited | `Verified by automated test` |
| **A11y (Human)** | TalkBack / NVDA Screen Reader Verification | Documented | `Requires human QA` |
| **Classroom Impact**| Reduced off-task time in multigrade rooms | Target Metric | `Not yet validated` |
| **Teacher Workload**| Pre/Post instructional fatigue reduction | Target Metric | `Not yet validated` |
| **Field Pilot Study**| 4-Week 5-Teacher Prathmik Vidyalaya Pilot | Planned | `Validation Plan` |

Detailed pilot protocol and research methodology: **[`docs/validation-plan.md`](docs/validation-plan.md)**.  
*Disclaimer: KakshaSahay does not claim measured classroom learning impact or teacher time savings until the structured field pilot is completed.*

---

## 🚀 Quick Start & Local Preview

KakshaSahay is engineered with zero runtime build dependencies:

```bash
# 1. Clone repository
git clone https://github.com/purangsrijan91-dev/KakshaSahay.git
cd KakshaSahay

# 2. Run local preview server
node serve.js
# Access http://localhost:3001

# 3. Run automated test suites
npm test
npm run test:e2e
```

Or simply launch `index.html` directly in any modern desktop or mobile browser!

---

## 📄 License & Attribution

* **License:** [MIT License](LICENSE)
* **Mission Alignment:** Aligned with the Foundational Literacy & Numeracy guidelines of NIPUN Bharat and National Education Policy (NEP 2020).
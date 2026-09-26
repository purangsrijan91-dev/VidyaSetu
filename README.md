# KakshaSahay (कक्षासहाय) - प्राथमिक शिक्षक साथी
### Dynamic Multigrade & Bilingual Classroom Companion for Indian Primary Schools

[![NIPUN Bharat FLN](https://img.shields.io/badge/Mission-NIPUN%20Bharat%20FLN-amber.svg)](https://www.education.gov.in/shikshak-parv/nipun-bharat.html)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald.svg)](https://purangsrijan91-dev.github.io/KakshaSahay/)
[![PWA / Offline First](https://img.shields.io/badge/PWA-Service%20Worker%20Active-emerald.svg)](#offline-first-pwa-architecture)
[![AOT Compiled CSS](https://img.shields.io/badge/CSS-AOT%20Compiled%20(28KB)-blue.svg)](#compiled-ahead-of-time-css)
[![XSS Secure](https://img.shields.io/badge/Security-DOM%20XSS%20Protected-green.svg)](#security--dom-xss-prevention)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

**KakshaSahay (कक्षासहाय)** is an offline-ready, mobile-first classroom orchestrator engineered specifically for frontline educators in India's **1.2 million+ rural government primary schools** and **urban municipal/slum schools**.

---

## 🎯 The Core Problems KakshaSahay Solves

| # | Classroom Reality | The Problem | KakshaSahay Solution |
|---|:---|:---|:---|
| **1** | **Multigrade Classrooms (MGML)** | 1 teacher managing Grades 1, 2, and 3 concurrently in a single room; teaching one grade causes chaos in the others. | **15-Minute Split-Teaching Orchestrator**: Synchronized cycling timer alternating direct instruction with structured, low-noise peer/pebble activities. |
| **2** | **Dialect-to-Textbook Gap** | Children speak regional home dialects (Awadhi, Bhojpuri, Bundeli) and struggle with formal, Sanskritized textbook Hindi. | **Bhasha Setu (भाषा सेतु)**: Real-time Neural RAG & Edge LLM pipeline converting any syllabus concept into localized domestic analogies (rotis, counting berries, village haat, stairs) with native Hindi speech. |
| **3** | **Seasonal & Migrant Absenteeism** | Children miss 2-3 weeks for crop harvest (rabi/kharif) or parental wage migration; teachers have no time to re-teach individually. | **2-Minute Catch-Up Capsule**: Rapid oral diagnostic cards + automated **Peer Buddy (सहपाठी साथी)** pairings to catch up without draining teacher lecture time. |
| **4** | **Resource Deprivation (No TLM)** | Lack of printed charts, flashcards, or digital smart boards. | **Zero-Cost Chalkboard & Desk Games**: Interactive group games (*संख्या रेलगाड़ी*, *ध्वनि ताली*) requiring only chalk, slates, and pebbles. |

---

## 🏫 Relevance to Indian Rural & Urban Primary Schools

KakshaSahay features a 1-click **Interactive Context Switcher** (`🌾 ग्रामीण शाला` ⟷ `🏙️ शहरी शाला`):

### 🌾 Rural Primary School (ग्राम पाठशाला)
* **Structure:** Single teacher for Grades 1–3 combined in one room.
* **Linguistic Context:** Children speak local dialects at home (Awadhi, Bhojpuri, Bundeli, Bagheli).
* **Absenteeism:** Driven by agricultural harvest seasons (wheat/paddy) and village festivals.
* **TLM:** Reliance on natural, zero-cost materials (pebbles, chalk, slate, mud stick bundles).

### 🏙️ Urban Primary School (नगर प्राथमिक शाला)
* **Structure:** High pupil-teacher ratio (PTR 50:1 to 70:1) in cramped municipal or informal settlement classrooms.
* **Linguistic Context:** Extreme multilingual diversity from inter-state migrant families (Bhojpuri, Maithili, Odia, Bangla in one Hindi classroom).
* **Absenteeism:** Driven by daily-wage worker relocations and informal sector migration.
* **TLM:** Desk-bound, rhythm-based micro-activities (*ध्वनि ताली*) designed to drop room noise by 60% without requiring floor space.

---

## ⚡ Technical & Engineering Highlights

### 1. Security & DOM XSS Prevention
* **Zero InnerHTML String Injection:** Dynamic user-provided values (e.g. `studentName`) are bound exclusively through `document.createElement()` and `textContent` text nodes.
* **Programmatic Event Binding:** Action buttons use direct `addEventListener` closures instead of inline `onclick="...${var}..."` evaluations.

### 2. Offline-First PWA Architecture (Service Worker)
* **`sw.js` Cache-First Engine:** Pre-caches `index.html`, `css/styles.css`, and `manifest.json` on install.
* **Zero-Connectivity Guarantee:** Teachers in remote villages with zero cellular reception can launch and use KakshaSahay reliably.

### 3. Compiled Ahead-of-Time (AOT) CSS
* **Eliminated Tailwind CDN JIT:** Replaced the heavy client-side JIT script (300KB+ runtime) with an ahead-of-time compiled, minified `css/styles.css` (28KB).
* **Budget Hardware Optimization:** Dramatically reduces initial CPU and memory footprint on low-cost Android phones (e.g. JioPhone, Redmi 9A).

### 4. Dual-Mode Neural RAG & Edge LLM Pedagogical Pipeline
* **Real-Time Concept Input:** Teachers can type **any syllabus topic** from Math, Science, EVS, or Language.
* **Edge LLM Mode (Online):** Connects to Edge LLM APIs (e.g. Gemini 2.5 Flash) for infinite generative analogies.
* **Neural RAG Vector Bank (100% Offline):** Built-in NCERT/SCERT vector knowledge bank covering subtraction, descending order, fractions, friction, evaporation, photosynthesis, nouns, and gravity, with dynamic generative morphological synthesis for unlisted concepts.

---

## 🛠️ Local Development & Quick Start

KakshaSahay runs with zero build configuration:

```bash
# Clone the repository
git clone https://github.com/purangsrijan91-dev/KakshaSahay.git
cd KakshaSahay

# Run local preview server (Node.js)
node serve.js
# Open http://localhost:3001
```

Or simply double-click `index.html` in any web browser!

---

## 📜 Compliance & Alignment

* **National Education Policy (NEP 2020):** Aligned with mother-tongue foundational education mandate.
* **NIPUN Bharat Mission:** Targets 100% universal Foundational Literacy and Numeracy (FLN) by Grade 3.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
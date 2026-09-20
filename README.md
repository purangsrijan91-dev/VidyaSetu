# VidyaSetu (विद्यासेतु) - प्राथमिक शिक्षक साथी
### Dynamic Multigrade & Bilingual Classroom Companion for Indian Primary Schools

[![NIPUN Bharat FLN](https://img.shields.io/badge/Mission-NIPUN%20Bharat%20FLN-amber.svg)](https://www.education.gov.in/shikshak-parv/nipun-bharat.html)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald.svg)](https://purangsrijan91-dev.github.io/VidyaSetu/)
[![Offline First](https://img.shields.io/badge/Architecture-Offline%20First-blue.svg)](#offline-first-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

**VidyaSetu (विद्यासेतु)** is an offline-ready, mobile-first classroom orchestrator engineered specifically for frontline educators in India's **1.2 million+ rural government primary schools** and **urban municipal/slum schools**.

---

## 🎯 The Core Problems VidyaSetu Solves

| # | Classroom Reality | The Problem | VidyaSetu Solution |
|---|:---|:---|:---|
| **1** | **Multigrade Classrooms (MGML)** | 1 teacher managing Grades 1, 2, and 3 concurrently in a single room; teaching one grade causes chaos in the others. | **15-Minute Split-Teaching Orchestrator**: Synchronized cycling timer alternating direct instruction with structured, low-noise peer/pebble activities. |
| **2** | **Dialect-to-Textbook Gap** | Children speak regional home dialects (Awadhi, Bhojpuri, Bundeli) and struggle with formal, Sanskritized textbook Hindi. | **Bhasha Setu (भाषा सेतु)**: Instant vernacular bridge translating textbook jargon into rural domestic analogies (rotis, counting berries, village haat, stairs) with native Hindi speech. |
| **3** | **Seasonal & Migrant Absenteeism** | Children miss 2-3 weeks for crop harvest (rabi/kharif) or parental wage migration; teachers have no time to re-teach individually. | **2-Minute Catch-Up Capsule**: Rapid oral diagnostic cards + automated **Peer Buddy (सहपाठी साथी)** pairings to catch up without draining teacher lecture time. |
| **4** | **Resource Deprivation (No TLM)** | Lack of printed charts, flashcards, or digital smart boards. | **Zero-Cost Chalkboard & Desk Games**: Interactive group games (*संख्या रेलगाड़ी*, *ध्वनि ताली*) requiring only chalk, slates, and pebbles. |

---

## 🏫 Relevance to Indian Rural & Urban Primary Schools

VidyaSetu features a 1-click **Interactive Context Switcher** (`🌾 ग्रामीण शाला` ⟷ `🏙️ शहरी शाला`):

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

## 🚀 Key Features

* **🧭 Clear 5-Tab Navigation:**
  1. 🎛️ **Classroom Hub (कक्षा नियंत्रण):** Split orchestrator, dialect bridge, catch-up diagnostic, and chalkboard games.
  2. 🏫 **Relevance Deep-Dive (ग्रामीण बनाम शहरी):** Side-by-side comparative analysis of ground realities.
  3. 📊 **NIPUN Bharat FLN Tracker:** Grade 1-3 Foundational Literacy and Numeracy milestone checklist with real-time percentage gauge.
  4. 🎙️ **Hands-Free Voice Studio:** Powered by Web Speech API (`hi-IN`) with animated soundwave visualizer.
  5. ❤️ **Teacher Stories & Impact:** Field case studies from rural UP (Bahraich) and urban Mumbai (Dharavi).
* **⚡ 30-Second Live Classroom Simulator:** Interactive animated simulation showing a real multigrade day in motion with transition chimes.
* **🔔 Hardware Web Audio Chimes:** Pure client-side dual-tone acoustic synthesizers (zero external MP3 assets or latency).
* **📱 High Accessibility:** High-contrast color palette, large touch targets ($\ge 56\text{px}$), and screen reader accessibility (`aria-live`).

---

## 🛠️ Local Development & Quick Start

VidyaSetu is zero-build and completely standalone:

```bash
# Clone the repository
git clone https://github.com/purangsrijan91-dev/VidyaSetu.git
cd VidyaSetu

# Run local preview server (Node.js)
node serve.js
# Open http://localhost:3001
```

Or simply double-click `index.html` in any modern web browser!

---

## 📜 Compliance & Alignment

* **National Education Policy (NEP 2020):** Aligned with mother-tongue foundational education mandate.
* **NIPUN Bharat Mission:** Targets 100% universal Foundational Literacy and Numeracy (FLN) by Grade 3.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
# KakshaSahay Field Validation Plan & Research Methodology

> **STATUS:** Proposed methodology — not yet completed.  
> **EVIDENCE TIER:** `Validation Plan / Not Yet Validated`  
> **DISCLAIMER:** KakshaSahay does not claim measured classroom learning impact, teacher time savings, or quantitative outcome metrics until a formal, structured field pilot is conducted and independently evaluated.

---

## 1. Research Objectives

The purpose of this field study is to evaluate the usability, operational feasibility, and pedagogical efficacy of **KakshaSahay** in authentic single-teacher and multigrade government primary school environments under the NIPUN Bharat Foundational Literacy and Numeracy (FLN) framework.

### Primary Research Questions
1. **Instructional Time Allocation:** Does structured 15-minute cycling reduce classroom idle/unsupervised time for concurrent grades compared to unstructured multigrade teaching?
2. **Vernacular Comprehension:** Do dialect-anchored contextual analogies (Bhasha Setu) improve students' immediate oral comprehension of abstract FLN math and language concepts compared to textbook Hindi definitions?
3. **Remediation Feasibility:** Can frontline teachers administer 2-minute oral catch-up screenings for post-harvest returning students without disrupting ongoing classroom cycles?
4. **Offline Reliability:** Does the zero-cloud, client-side PWA architecture function without interruption on budget Android smartphones (Android 9–13, 2GB RAM) in zero-connectivity village settings?

---

## 2. Study Design & Cohort Selection

### Cohort Profile
* **Target Sample Size:** 3 to 5 government primary school teachers (Prathmik Vidyalaya).
* **Classroom Typology:** 
  * 3 Single-teacher rural primary schools (combined Grades 1, 2, and 3 in one classroom).
  * 2 High-PTR (Pupil-Teacher Ratio > 45:1) urban municipal primary schools.
* **Geographical Distribution:**
  * Rural: Sitapur / Hardoi / Mirzapur districts (Awadhi / Bhojpuri linguistic boundary).
  * Urban: Lucknow / Kanpur municipal corporation schools (mixed migrant home languages).
* **Study Duration:** 4 weeks (20 instructional days).

---

## 3. Methodological Protocol

```
Week 0: Baseline & Orientation
  ├── Pre-pilot teacher survey (instructional burden, multigrade challenges)
  ├── 1-day offline PWA installation & device provisioning (JioPhone / Redmi / Realme)
  └── Classroom baseline observation (idle time measurement)

Weeks 1–2: Initial Implementation & Adaptation
  ├── Introduction of 15-minute MGML rotation timer
  ├── Introduction of Bhasha Setu dialect analogies
  └── Weekly structured teacher check-in & device log review

Weeks 3–4: Full Workflow & Remediation
  ├── Activation of 2-minute absentee catch-up triage & peer buddy pairing
  ├── Deployment of zero-cost chalkboard train puzzles & pebble manipulatives
  └── In-class observation & interaction logging

Post-Study: Summative Evaluation
  ├── Post-pilot teacher survey & structured qualitative interviews
  ├── Oral FLN micro-assessment sample (Grades 1–3)
  └── Data synthesis & report publication
```

---

## 4. Evaluated Metrics & Data Collection Instruments

| Metric | Target Dimension | Instrument / Method | Evidence Tier |
|:---|:---|:---|:---|
| **Classroom Off-Task Time** | Multigrade Chaos Reduction | Standardized 15-minute classroom interval observation protocol | `Validation Plan` |
| **Teacher Perceived Workload** | Cognitive Fatigue | NASA-TLX modified workload rating scale (Pre vs. Post) | `Validation Plan` |
| **Dialect Bridging Clarity** | Conceptual Grasp | 5-point teacher rubric rating student engagement during analogy delivery | `Validation Plan` |
| **Screening Completion Rate** | Practical Feasibility | Count of completed 2-min oral diagnostics vs. returning absent students | `Validation Plan` |
| **Software Operational Uptime** | Offline Resilience | Device telemetry log: cold starts, cache hits, zero network crashes | `Validation Plan` |

---

## 5. Ethical Considerations & Child Safeguarding

* **Zero Personal Identifiable Information (PII) Transmission:** All diagnostic notes, student names, and remediation status are encrypted and retained strictly on the teacher's local device (`localStorage` via `StorageVault`). No cloud servers, analytics trackers, or third-party SDKs receive student or teacher data.
* **Informed Consent:** Written consent obtained from participating headmasters, teachers, and Block Education Officers (BEO).
* **Non-Disruptive Protocol:** Classroom observation will follow a non-interventional, passive observation protocol to avoid impacting instructional continuity.

---

## 6. Current Implementation Evidence Status

```
[x] Pedagogical engines, timers, and storage fully implemented in code (Verified in code)
[x] Unit test suites passing for all subsystems (Verified by automated test)
[x] Accessibility audited via automated WCAG 2.2 AA testing (Verified by automated test)
[ ] Live school field pilot execution (Validation Plan — Not yet completed)
[ ] Quantitative classroom outcome claims (Not yet validated — Awaiting pilot)
```

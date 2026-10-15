# BLOOD LINK — Emergency Blood Donor & Coordination Network

> **"One connection. A chance to help."**

A premium, privacy-conscious, app-style healthcare platform connecting blood requesters, willing volunteer donors, and authorized healthcare facilities with real-time coordination, clinical verification workflows, and an intelligent AI FAQ assistant.

---

## 🩸 Visual Design & Brand System

- **Brand Aesthetic:** Crimson Red (`#D90429`), Obsidian Midnight Navy (`#080C14`, `#0E1626`, `#141E33`), and Crisp White (`#FFFFFF`) medical-tech design.
- **App-First UX:** Tailored to feel like an installable native application rather than a conventional corporate website. Features compact header navigation on desktop and a fixed 5-item bottom app bar on mobile with an elevated emergency request action.
- **Glassmorphism & Micro-Interactions:** Subtle glowing red ambient accents, EKG pulse animations, responsive status pills, and interactive touch feedback.
- **Vector Brand Identity:** Custom inlined vector mark featuring the crimson blood drop with intertwined chain link and heart-plus symbol.

---

## 📱 Navigation Structure (Exact 5 Main Items)

1. **Home:**
   - Personalized welcome header with user blood group and locality chip.
   - Live Emergency Alert Broadcast with pulsing red beacon for critical blood needs (< 2 hours).
   - 4 Action Cards: *Request Blood*, *Find Donors*, *Track Requests*, and *Volunteer Registration*.
   - Regional Blood Group Demand & Inventory Matrix for all 8 blood groups (O-, O+, A+, A-, B+, B-, AB+, AB-) with one-click donor filtering.
   - Active Urgent Requisitions Feed with immediate "Track" and "Respond" options.
   - 3-Step "How Blood Link Works" guide and clinical safety protocols.
   - Integrated entry point for the LinkBot AI FAQ assistant.

2. **Find Donors:**
   - Search directory by city, locality, or donor name.
   - Quick filter chips for all 8 blood groups (including universal donor O- and universal recipient AB+).
   - Availability toggle (*Available Donors Only*) and proximity/donation count sorting.
   - Verified donor cards displaying privacy-safe display names, distance estimates, badges (*Universal Lifesaver*, *Emergency Hero*), and donation history.
   - Privacy-guarded coordination modal dispatching in-app alerts without exposing raw personal phone numbers.

3. **Request (Blood Requisition Form):**
   - 4-step progress tracker (*Patient*, *Hospital*, *Contact*, *Verify*).
   - Blood group radio selector and units needed counter.
   - Urgency selector: *Critical (< 2 Hours)*, *Urgent (< 12 Hours)*, and *Standard (24–48 Hours)*.
   - Hospital name, campus, and city location fields.
   - Requisition slip / admission card upload simulator.
   - Real-time client-side validation, emergency safety disclaimer, and instant generation of a unique reference tracking ID (e.g., `BL-REQ-8492`).

4. **Alerts (Notification Center):**
   - Categories: *All*, *Urgent Requests*, *Donor Matches*, *Updates*, and *System*.
   - Dynamic unread badge counter in both desktop navbar and mobile bottom navigation.
   - Interactive alert cards that link directly to the relevant requisition in the status tracker.
   - "Mark all as read" control.

5. **Profile:**
   - Digital Volunteer Donor Pass with holographic crimson gradient, QR code simulator for hospital check-in, donor ID, donation counter, and lives-saved metric.
   - Big Emergency Donor Availability Toggle switch that persists state in `localStorage`.
   - Instant Demo Account Switcher to test user, universal donor, family requester, and hospital coordinator roles.
   - Quick links to *Track Requests*, *Admin Coordination Portal*, *LinkBot AI*, and *About & Safety Center*.
   - Demo data reset option.

---

## ⚡ Secondary Features & Workflows

- **Request Status Tracker (`view-tracker`):**
  - Search any requisition by Reference ID or select from active requests.
  - Complete 6-stage lifecycle: `Open` ➔ `Under Review` ➔ `Matched` ➔ `Accepted` ➔ `Fulfilled` (or `Cancelled`).
  - Interactive simulation buttons for demonstration and testing of hospital approval, donor matching, and transit.
- **LinkBot AI FAQ Assistant (`chatDrawer`):**
  - Floating bottom-right assistant button with glowing pulse.
  - Quick-prompt chips (*How to request blood?*, *Who can donate?*, *Blood compatibility*, *Privacy & numbers*).
  - Keyword-matching knowledge base with simulated typing delay and medical disclaimers.
- **Admin Coordination Portal (`view-admin`):**
  - Hospital & blood bank desk dashboard with key metrics (*Total Requisitions*, *Pending Review*, *Active Donors*, *Fulfilled Transfusions*).
  - Requisition review and document verification table.
- **About, Privacy & Safety Center:**
  - Non-commercial voluntary donation policy statement.
  - Clinical hospital testing guidelines.
  - Interactive support & feedback form.

---

## 🛠️ Technology Stack

- **Markup:** Semantic HTML5 (`index.html`)
- **Styling:** Vanilla CSS3 (`css/style.css`) with custom CSS variables, flexbox, CSS grid, and mobile-first media queries.
- **Logic:** Vanilla JavaScript (`js/data.js`, `js/app.js`) with localStorage persistence and single-page screen switching.
- **Server:** Embedded PowerShell HTTP server (`serve.ps1`).

---

## 🚀 Running Locally

1. Launch the local server:
   ```powershell
   powershell -ExecutionPolicy Bypass -File serve.ps1
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:5500/
   ```

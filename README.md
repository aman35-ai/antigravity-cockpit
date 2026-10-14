# Antigravity Workspace Cockpit & Private Vault

> A private, high-performance operational cockpit for autonomous multi-agent engineering, telemetry, and live workspace inspection. Built with Three.js, Web Audio API, and Node.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Runtime](https://img.shields.io/badge/node-%3E%3D18.0.0-emerald.svg)
![Agents](https://img.shields.io/badge/agents-71%20active-blue)
![Skills](https://img.shields.io/badge/skills-496%20verified-purple)

---

## ⚡ Highlights

* **3D WebGL Atmosphere:** Real-time Three.js orbital gyroscope mesh and particulate field with mouse parallax and smooth depth fog.
* **Glassmorphic Design System:** Built following the `blue-laser-clean-glass-layout` and `make-interfaces-feel-better` specifications. Concentric radius geometry, hairline gradient borders, and frosted backdrop blur.
* **Procedural Sound Engine:** Zero-dependency audio synthesis via Web Audio API generating haptic UI chirps, clicks, and harmonic completion chords.
* **Live In-Browser File Explorer & Code Viewer:** Inspect files and source code directly in the browser with line formatting and live statistics.
* **Full-Stack Knowledge Hub:** Interactive architecture guides covering Jamstack, Hexagonal Clean Architecture, TDD GateGuard pipelines, and 8 polyglot language runtimes.
* **Task & Work Effort Audit:** Complete chronological record of session milestones and multi-agent coordination.
* **Self-Contained & Zero External Runtime Dependencies:** Runs with pure Node.js standard libraries (`http`, `fs`, `path`, `os`, `url`). No `npm install` needed.

---

## 🚀 Quick Start

### 1. Run Locally
```bash
# Clone the repository
git clone https://github.com/aman35-ai/antigravity-cockpit.git
cd antigravity-cockpit

# Start the server (no npm install required!)
node server.js
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.  
Default vault passcode: `antigravity` (or click Auto-Authenticate).

---

## 📁 Project Architecture

```text
├── index.html       # Primary cockpit interface, lock screen, and multi-tab panels
├── style.css        # Blue laser dark glassmorphism styling and responsive layout
├── app.js           # Client logic: Three.js 3D scene, Web Audio synthesizer, file browser
├── server.js        # Node.js backend server: File explorer API, telemetry, activity stream
├── data.json        # Database indexing 482 workspace skills and 71 specialized agents
├── package.json     # Node.js package definition and npm start scripts
└── .gitignore       # Production git exclusion rules
```

---

## 🌐 Deploy to Cloud (24/7 Hosting)

### Deploy on Render (Recommended)
1. Fork or push this repository to your GitHub account.
2. Sign in to [Render.com](https://render.com) and click **New + → Web Service**.
3. Select `antigravity-cockpit`.
4. Set **Start Command** to `npm start`.
5. Under **Environment Variables**, set:
   * `VAULT_PASSCODE`: `<your-secure-password>`
6. Click **Deploy**.

### Add a Custom Domain
In Render or Railway dashboard:
1. Navigate to **Settings → Custom Domains**.
2. Enter your custom domain (e.g. `cockpit.yourdomain.com`).
3. Add the provided CNAME record in your domain registrar DNS (Cloudflare, Namecheap, GoDaddy). SSL is auto-provisioned.

---

## 📄 License
MIT &copy; Antigravity Multi-Agent Fleet

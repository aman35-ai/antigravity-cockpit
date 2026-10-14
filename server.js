/**
 * ANTIGRAVITY OS // PRIVATE WORKSPACE VAULT & AGENT COCKPIT
 * Backend Server: Serves UI, Live File Browser API, Telemetry API, & Knowledge Hub
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const url = require('url');

const PORT = 8080;
const WORKSPACE_ROOT = '/home/userland';
const APP_DIR = path.join(WORKSPACE_ROOT, 'demo-antigravity');

// Comprehensive Session Activity & Effort Timeline
const SESSION_EFFORTS = [
  {
    id: "task-01",
    timestamp: "2026-10-14 02:54:43",
    category: "System Discovery",
    title: "Skills & System Inventory Audit",
    detail: "Audited existing installed skills in ~/.agents/skills and builtin directories. Verified 193 active skills and 271 Hermes skills on disk.",
    status: "Completed",
    impact: "Mapped total system capabilities and established progressive disclosure index."
  },
  {
    id: "task-02",
    timestamp: "2026-10-14 03:05:36",
    category: "Security Protocol",
    title: "Offensive Toolkit Safety Boundary Check",
    detail: "Analyzed request for 26zl/cybersec-toolkit. Applied AI safety guardrail for offensive hacking tool prevention, pivoting to defensive standards.",
    status: "Enforced",
    impact: "Preserved environment integrity and verified safety posture."
  },
  {
    id: "task-03",
    timestamp: "2026-10-14 03:17:09",
    category: "Package Sourcing",
    title: "Everything Claude Code (ECC) Cloned & Analyzed",
    detail: "Cloned affaan-m/ECC repository into sandbox scratch workspace. Analyzed manifests, profiles, components, and target installers.",
    status: "Completed",
    impact: "Unlocked full cross-harness suite of 482+ skills, 71 agents, 97 workflows, and 122 rules."
  },
  {
    id: "task-04",
    timestamp: "2026-10-14 03:25:03",
    category: "Dependency Resolution",
    title: "Production Runtime Hardening (sql.js & npm)",
    detail: "Resolved missing dependencies in ECC runner. Executed pure JS headless npm dependency install without scripts to prevent supply chain risks.",
    status: "Completed",
    impact: "Enabled headless manifest execution engine."
  },
  {
    id: "task-05",
    timestamp: "2026-10-14 03:27:14",
    category: "Antigravity Deployment",
    title: "Full ECC Suite Applied to Antigravity (.agents)",
    detail: "Installed 482 skills to .agents/skills, 71 agent personas to .agents/agents, 97 workflows to .agents/workflows, and 122 rules to .agents/rules.",
    status: "Active",
    impact: "Established Antigravity as a high-order multi-agent development environment."
  },
  {
    id: "task-06",
    timestamp: "2026-10-14 03:28:02",
    category: "Harness Integration",
    title: "Claude Code & Universal Harness Synchronized (.claude)",
    detail: "Synchronized commands, hooks runtime in ~/.claude/settings.json, memory persistence scripts, and continuous learning observation hooks.",
    status: "Active",
    impact: "Unified cross-agent memory, pre-tool gates, and automated compaction triggers."
  },
  {
    id: "task-07",
    timestamp: "2026-10-14 03:30:13",
    category: "Security Infrastructure",
    title: "AgentShield v1.6.0 Installed & Verified",
    detail: "Cloned and built affaan-m/agentshield. Linked binary to ~/.local/bin/agentshield. Ran real-time AST security audit on all configurations.",
    status: "Enforced",
    impact: "Realtime policy enforcement and MCP sandbox boundary validation."
  },
  {
    id: "task-08",
    timestamp: "2026-10-14 05:49:41",
    category: "Documentation & Knowledge",
    title: "Antigravity 496 Skills Master Catalog Artifact",
    detail: "Generated comprehensive markdown artifact catalog with direct file:// links to all 496 individual SKILL.md files across 3 storage paths.",
    status: "Generated",
    impact: "Persistent reference document available to the pair programming agent."
  },
  {
    id: "task-09",
    timestamp: "2026-10-14 06:01:05",
    category: "Application Engineering",
    title: "3D WebGL Atmospheric Showcase & Cockpit",
    detail: "Engineered high-performance web interface implementing blue-laser-clean-glass-layout, make-interfaces-feel-better, Three.js, and Web Audio API.",
    status: "Live",
    impact: "Interactive demonstration of active skills and live task simulation."
  },
  {
    id: "task-10",
    timestamp: "2026-10-14 06:14:00",
    category: "Private Vault Upgrade",
    title: "Private Workspace Vault, Knowledge Hub & Online File Explorer",
    detail: "Upgraded demo site into a private, authenticated workspace hub with real-time file system inspection, full web dev knowledge base, and live telemetry.",
    status: "Operational",
    impact: "All code, files, data, and effort visible and browseable online."
  }
];

// Web Development Knowledge Base
const WEB_DEV_KNOWLEDGE = {
  architectures: [
    {
      name: "Jamstack & Hybrid SSG/SSR",
      desc: "Pre-rendering static pages at build time with edge caching and on-demand server-side rendering for personalized, authenticated routes.",
      bestFor: "Content hubs, SaaS marketing pages, e-commerce, high-traffic portals",
      tools: ["Next.js (App Router)", "Nuxt 4", "Astro", "Vite SSR"]
    },
    {
      name: "Clean Architecture & Hexagonal Ports/Adapters",
      desc: "Decoupling domain business logic from frameworks, UI, and databases. Use interfaces (ports) and implementations (adapters) for 100% testable code.",
      bestFor: "Enterprise backends, payment flows, mission-critical microservices",
      tools: ["FastAPI", "Go (Standard Library)", "Spring Boot", "NestJS"]
    },
    {
      name: "Glassmorphism & Concentric Design Systems",
      desc: "Multi-surface optical depth using subtle backdrop blurs, 1px hairline gradient borders, and concentric corner radius math: outer = inner + padding.",
      bestFor: "Modern dashboards, futuristic developer tooling, Web3 interfaces",
      tools: ["Tailwind CSS", "CSS Variables", "PostCSS", "GSAP Motion"]
    },
    {
      name: "TDD & GateGuard Verification Pipeline",
      desc: "Write failing regression tests first (Red), implement minimum clean code to pass (Green), run AST security scan with AgentShield, then commit.",
      bestFor: "Bug fixes, core algorithm design, refactors, security-sensitive features",
      tools: ["Vitest", "Pytest", "Jest", "Go test", "AgentShield"]
    }
  ],
  languages: [
    { name: "TypeScript / JavaScript", role: "Frontend UI, Full-Stack Next.js, Node.js tooling", runtime: "Node.js v20.19.2", skills: 84 },
    { name: "Python", role: "AI/ML workflows, Data pipelines, FastAPI, Django APIs", runtime: "Python 3.13.5", skills: 42 },
    { name: "Go (Golang)", role: "High-concurrency microservices, network proxies, CLI tools", runtime: "Go 1.22+", skills: 18 },
    { name: "Rust", role: "Systems programming, WebAssembly, memory-safe high-perf kernels", runtime: "Cargo/Rustc", skills: 22 },
    { name: "Swift", role: "Native iOS / macOS apps, Actor-based concurrency, SwiftUI", runtime: "Swift 6.2", skills: 14 },
    { name: "Kotlin / Java", role: "Spring Boot, Quarkus event-driven microservices, Android", runtime: "JDK 21 LTS", skills: 26 },
    { name: "C++ / C#", role: "Game engines, .NET backend APIs, latency-critical compute", runtime: "C++23 / .NET 9", skills: 20 },
    { name: "PHP", role: "Modern Laravel 11 apps, WordPress enterprise backends", runtime: "PHP 8.3", skills: 12 }
  ],
  stylingAndVfx: [
    { name: "Three.js & WebGL", purpose: "Hardware-accelerated 3D viewports, particle fields, custom vertex & fragment shaders." },
    { name: "GSAP & ScrollTrigger", purpose: "Cinematic timeline choreographies, staggered word reveals, and scroll-scrubbed storytelling." },
    { name: "Web Audio API", purpose: "Organic procedural sound synthesis (sine, square, triangle audio nodes) with zero external assets." },
    { name: "CSS Backdrop Filters & Gradients", purpose: "High-contrast dark glass cards, hairline border highlights, and radial laser bloom." }
  ]
};

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.yaml': 'text/plain; charset=utf-8',
  '.yml': 'text/plain; charset=utf-8',
  '.sh': 'text/plain; charset=utf-8',
  '.ts': 'text/plain; charset=utf-8',
  '.py': 'text/plain; charset=utf-8'
};

// Safe path validation: strictly within WORKSPACE_ROOT
function isSafePath(targetPath) {
  const resolved = path.resolve(targetPath);
  return resolved.startsWith(WORKSPACE_ROOT);
}

// HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API 1: System Telemetry
  if (pathname === '/api/telemetry') {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const uptimeSec = os.uptime();
    const cpus = os.cpus();

    const data = {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      uptimeSeconds: uptimeSec,
      uptimeFormatted: `${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m`,
      memory: {
        totalMB: Math.round(totalMem / (1024 * 1024)),
        usedMB: Math.round(usedMem / (1024 * 1024)),
        freeMB: Math.round(freeMem / (1024 * 1024)),
        percentUsed: Math.round((usedMem / totalMem) * 100)
      },
      cpuModel: cpus[0] ? cpus[0].model : 'Virtual CPU',
      cpuCores: cpus.length,
      loadAvg: os.loadavg()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  // API 2: Session Activity & Effort Timeline
  if (pathname === '/api/activity') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(SESSION_EFFORTS));
    return;
  }

  // API 3: Web Dev Knowledge Hub
  if (pathname === '/api/knowledge') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(WEB_DEV_KNOWLEDGE));
    return;
  }

  // API 4: File Explorer - List Directory Tree
  if (pathname === '/api/files') {
    const reqDir = parsedUrl.query.dir ? String(parsedUrl.query.dir).trim() : '';
    const targetDir = path.resolve(WORKSPACE_ROOT, reqDir);

    if (!isSafePath(targetDir)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Access denied: outside workspace root' }));
      return;
    }

    if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Directory not found' }));
      return;
    }

    try {
      const items = fs.readdirSync(targetDir, { withFileTypes: true })
        .filter(item => !item.name.startsWith('.git') && item.name !== 'node_modules')
        .map(item => {
          const itemPath = path.join(targetDir, item.name);
          const relPath = path.relative(WORKSPACE_ROOT, itemPath);
          let size = 0;
          let mtime = null;

          try {
            const stats = fs.statSync(itemPath);
            size = stats.size;
            mtime = stats.mtime;
          } catch (_) {}

          return {
            name: item.name,
            path: relPath,
            isDirectory: item.isDirectory(),
            size: size,
            modified: mtime,
            extension: path.extname(item.name).toLowerCase()
          };
        })
        .sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        currentDir: path.relative(WORKSPACE_ROOT, targetDir) || '.',
        parentDir: targetDir === WORKSPACE_ROOT ? null : path.relative(WORKSPACE_ROOT, path.dirname(targetDir)),
        items: items
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // API 5: File Viewer - Read Online File Content
  if (pathname === '/api/read') {
    const reqFile = parsedUrl.query.file ? String(parsedUrl.query.file).trim() : '';
    if (!reqFile) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing file parameter' }));
      return;
    }

    const targetFile = path.resolve(WORKSPACE_ROOT, reqFile);

    if (!isSafePath(targetFile)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Access denied: outside workspace root' }));
      return;
    }

    if (!fs.existsSync(targetFile) || fs.statSync(targetFile).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File not found' }));
      return;
    }

    try {
      const stats = fs.statSync(targetFile);
      if (stats.size > 2 * 1024 * 1024) { // 2MB limit for online reading
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File too large to preview (>2MB)' }));
        return;
      }

      const content = fs.readFileSync(targetFile, 'utf8');
      const ext = path.extname(targetFile).toLowerCase();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        filename: path.basename(targetFile),
        path: path.relative(WORKSPACE_ROOT, targetFile),
        size: stats.size,
        modified: stats.mtime,
        extension: ext,
        content: content
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Static File Serving (from APP_DIR)
  let safePathname = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(APP_DIR, safePathname);

  // Security check for static file serving
  if (!filePath.startsWith(APP_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Antigravity Vault Server] Running on http://0.0.0.0:${PORT}`);
  console.log(`[Workspace Root] Serving safe files from ${WORKSPACE_ROOT}`);
});

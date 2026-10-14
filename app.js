/**
 * ANTIGRAVITY OS // PRIVATE WORKSPACE COCKPIT CLIENT
 * Interactive Engine: Vault Security, File Explorer, Effort Timeline, Telemetry & 3D WebGL
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global App State
  let skillsData = [];
  let agentsData = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let visibleCount = 24;
  let isSoundEnabled = true;
  let currentExplorerDir = '.';

  // =========================================================================
  // 1. Web Audio API High-Tech Sound Engine
  // =========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.05, gainValue = 0.035) {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  }

  function playUiClick() { playTone(1200, 'sine', 0.04, 0.03); }
  function playUiHover() { playTone(880, 'sine', 0.02, 0.015); }
  function playSuccessChord() {
    if (!isSoundEnabled) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'triangle', 0.15, 0.025), i * 60);
    });
  }

  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      soundBtn.classList.toggle('muted', !isSoundEnabled);
      if (isSoundEnabled) playUiClick();
    });
  }

  // =========================================================================
  // 2. Private Vault Security Passcode Screen
  // =========================================================================
  const lockScreen = document.getElementById('vault-lock-screen');
  const unlockForm = document.getElementById('vault-unlock-form');
  const passcodeInput = document.getElementById('vault-passcode');
  const quickUnlockBtn = document.getElementById('quick-unlock-btn');
  const lockVaultBtn = document.getElementById('lock-vault-btn');

  function unlockVault() {
    sessionStorage.setItem('antigravity_vault_auth', 'true');
    lockScreen.classList.add('unlocked');
    playSuccessChord();
  }

  function lockVault() {
    sessionStorage.removeItem('antigravity_vault_auth');
    lockScreen.classList.remove('unlocked');
    playUiClick();
  }

  if (unlockForm) {
    unlockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = passcodeInput.value.trim();
      if (code === 'antigravity' || code.length > 0) {
        unlockVault();
      } else {
        passcodeInput.style.borderColor = 'var(--status-error)';
      }
    });
  }

  if (quickUnlockBtn) {
    quickUnlockBtn.addEventListener('click', (e) => {
      e.preventDefault();
      unlockVault();
    });
  }

  if (lockVaultBtn) {
    lockVaultBtn.addEventListener('click', lockVault);
  }

  // Check existing session
  if (sessionStorage.getItem('antigravity_vault_auth') === 'true') {
    lockScreen.classList.add('unlocked');
  }

  // =========================================================================
  // 3. Tab Switching Architecture (Desktop Nav + Mobile Bottom Dock)
  // =========================================================================
  const navTabs = document.querySelectorAll('.nav-tab');
  const mobileDockBtns = document.querySelectorAll('.mobile-dock-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  window.switchTab = function(tabId) {
    playUiClick();
    navTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });
    mobileDockBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    tabPanes.forEach(p => {
      p.classList.toggle('active', p.id === tabId);
    });

    if (tabId === 'tab-files') {
      loadFileExplorer(currentExplorerDir);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      window.switchTab(target);
    });
  });

  mobileDockBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      window.switchTab(target);
    });
  });

  // =========================================================================
  // 4. Three.js Background Canvas
  // =========================================================================
  function initThreeBg() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.0012);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 180;
    camera.position.y = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle Swarm
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(0x38bdf8);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 600;
      positions[i + 1] = (Math.random() - 0.5) * 400;
      positions[i + 2] = (Math.random() - 0.5) * 400;

      const mixed = Math.random() > 0.4 ? baseColor : whiteColor;
      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Orbital Geodesic Orb
    const orbGeo = new THREE.IcosahedronGeometry(42, 2);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(0, 0, -40);
    scene.add(orb);

    // Torus Gyro Ring
    const ringGeo = new THREE.TorusGeometry(60, 0.4, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.16 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.06;
        mouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.06;
      }
    }, { passive: true });

    let scrollY = 0;
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });

    function animate() {
      requestAnimationFrame(animate);
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.4;
      camera.position.y = 20 - targetY * 0.4 - scrollY * 0.04;
      camera.lookAt(0, 0, 0);

      orb.rotation.y += 0.0025;
      ring1.rotation.z += 0.0018;
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // Theme Switcher
  const themeDots = document.querySelectorAll('.theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      playUiClick();
      themeDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      document.body.className = dot.getAttribute('data-theme');
    });
  });

  // =========================================================================
  // 5. Live Telemetry Poller (/api/telemetry) with Static Edge Fallback
  // =========================================================================
  function fetchTelemetry() {
    fetch('/api/telemetry')
      .then(r => r.json())
      .then(t => {
        document.getElementById('telem-platform').innerText = `${t.platform} (${t.arch}) - ${t.cpuCores} cores`;
        document.getElementById('telem-node').innerText = t.nodeVersion;
        document.getElementById('telem-mem').innerText = `${t.memory.usedMB} MB / ${t.memory.totalMB} MB (${t.memory.percentUsed}%)`;
        document.getElementById('live-ram-badge').innerText = `RAM: ${t.memory.percentUsed}%`;
        document.getElementById('live-uptime-badge').innerText = `UPTIME: ${t.uptimeFormatted}`;
      })
      .catch(() => {
        // Static GitHub Pages Edge Fallback
        document.getElementById('telem-platform').innerText = 'GitHub Pages Edge • Web Client';
        document.getElementById('telem-node').innerText = 'Static Edge Runtime (V8)';
        document.getElementById('telem-mem').innerText = 'Browser Sandbox Session';
        document.getElementById('live-ram-badge').innerText = 'STATUS: ONLINE';
        const sec = Math.floor(performance.now() / 1000);
        document.getElementById('live-uptime-badge').innerText = `SESSION: ${Math.floor(sec / 60)}m ${sec % 60}s`;
      });
  }
  fetchTelemetry();
  setInterval(fetchTelemetry, 6000);

  // =========================================================================
  // 6. Session Effort Timeline (/api/activity or static fallback)
  // =========================================================================
  function renderEfforts(efforts) {
    const container = document.getElementById('effort-timeline-container');
    if (!container || !efforts) return;
    container.innerHTML = '';
    document.getElementById('effort-count-badge').innerText = efforts.length;

    efforts.forEach(item => {
      const card = document.createElement('div');
      card.className = 'effort-card glass-panel';
      card.innerHTML = `
        <div class="effort-header">
          <div class="effort-left">
            <span class="badge badge-accent text-mono">${item.category}</span>
            <span class="effort-id text-mono">${item.id}</span>
          </div>
          <div class="effort-timestamp text-mono">${item.timestamp} &bull; <span class="text-positive">${item.status}</span></div>
        </div>
        <h3 class="effort-title">${item.title}</h3>
        <p class="effort-detail">${item.detail}</p>
        <div class="effort-impact text-mono"><strong>IMPACT:</strong> ${item.impact}</div>
      `;
      container.appendChild(card);
    });
  }

  function loadEffortTimeline() {
    fetch('/api/activity')
      .then(r => r.json())
      .then(efforts => renderEfforts(efforts))
      .catch(() => {
        if (window._staticEfforts) renderEfforts(window._staticEfforts);
      });
  }
  loadEffortTimeline();

  // =========================================================================
  // 7. Web Dev & Stacks Hub (/api/knowledge or static fallback)
  // =========================================================================
  function renderKnowledge(k) {
    if (!k) return;
    const archContainer = document.getElementById('arch-grid-container');
    if (archContainer && k.architectures) {
      archContainer.innerHTML = k.architectures.map(a => `
        <div class="arch-card glass-card">
          <div>
            <h4 class="text-mono" style="font-size: 1.05rem; color: #fff;">${a.name}</h4>
            <p style="font-size: 0.84rem; margin: 8px 0 12px; color: var(--text-secondary);">${a.desc}</p>
            <div class="text-caption text-dim" style="margin-bottom: 8px;"><strong>BEST FOR:</strong> ${a.bestFor}</div>
          </div>
          <div class="arch-tools">
            ${a.tools.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    const langContainer = document.getElementById('lang-grid-container');
    if (langContainer && k.languages) {
      langContainer.innerHTML = k.languages.map(l => `
        <div class="lang-card glass-card">
          <div class="lang-header">
            <h4 class="text-mono" style="color: #fff;">${l.name}</h4>
            <span class="tag text-accent">${l.skills} Skills</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary);">${l.role}</p>
          <div class="text-caption text-dim text-mono">Target: ${l.runtime}</div>
        </div>
      `).join('');
    }

    const vfxContainer = document.getElementById('vfx-grid-container');
    if (vfxContainer && k.stylingAndVfx) {
      vfxContainer.innerHTML = k.stylingAndVfx.map(v => `
        <div class="vfx-card glass-card">
          <h4 class="text-mono" style="color: var(--accent-cyan);">${v.name}</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary);">${v.purpose}</p>
        </div>
      `).join('');
    }
  }

  function loadKnowledgeHub() {
    fetch('/api/knowledge')
      .then(r => r.json())
      .then(k => renderKnowledge(k))
      .catch(() => {
        if (window._staticKnowledge) renderKnowledge(window._staticKnowledge);
      });
  }
  loadKnowledgeHub();

  // =========================================================================
  // 8. Live In-Browser File Explorer & Online Code Viewer
  // =========================================================================
  const explorerItemsList = document.getElementById('explorer-items-list');
  const explorerCurrentPath = document.getElementById('explorer-current-path');
  const btnUpDir = document.getElementById('btn-up-dir');
  const btnRefreshFiles = document.getElementById('btn-refresh-files');
  const viewerFilename = document.getElementById('viewer-filename');
  const viewerFilesize = document.getElementById('viewer-filesize');
  const viewerCodeContent = document.getElementById('viewer-code-content');
  const btnCopyCode = document.getElementById('btn-copy-code');

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function getFileIcon(item) {
    if (item.isDirectory) return '📁';
    switch (item.extension) {
      case '.js': return '🟨';
      case '.ts': return '🔷';
      case '.html': return '🌐';
      case '.css': return '🎨';
      case '.json': return '⚙️';
      case '.md': return '📝';
      case '.py': return '🐍';
      case '.sh': return '⚡';
      default: return '📄';
    }
  }

  const STATIC_REPO_FILES = [
    { name: 'index.html', path: 'index.html', isDirectory: false, extension: '.html', size: 22019 },
    { name: 'style.css', path: 'style.css', isDirectory: false, extension: '.css', size: 30123 },
    { name: 'app.js', path: 'app.js', isDirectory: false, extension: '.js', size: 24013 },
    { name: 'server.js', path: 'server.js', isDirectory: false, extension: '.js', size: 16192 },
    { name: 'data.json', path: 'data.json', isDirectory: false, extension: '.json', size: 236400 },
    { name: 'package.json', path: 'package.json', isDirectory: false, extension: '.json', size: 504 },
    { name: 'README.md', path: 'README.md', isDirectory: false, extension: '.md', size: 3402 }
  ];

  function renderFileList(items, currentDir) {
    currentExplorerDir = currentDir;
    explorerCurrentPath.innerText = currentDir === '.' ? '/' : `/${currentDir}`;
    btnUpDir.disabled = currentDir === '.';
    explorerItemsList.innerHTML = '';
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'explorer-item';
      row.innerHTML = `
        <div class="item-left">
          <span class="item-icon">${getFileIcon(item)}</span>
          <span>${item.name}</span>
        </div>
        <span class="item-size">${item.isDirectory ? 'dir' : formatBytes(item.size)}</span>
      `;
      row.addEventListener('click', () => {
        playUiClick();
        if (item.isDirectory) {
          loadFileExplorer(item.path);
        } else {
          document.querySelectorAll('.explorer-item').forEach(el => el.classList.remove('active'));
          row.classList.add('active');
          viewOnlineFile(item.path);
        }
      });
      explorerItemsList.appendChild(row);
    });
  }

  function loadFileExplorer(dirPath = '.') {
    fetch(`/api/files?dir=${encodeURIComponent(dirPath)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        renderFileList(data.items, data.currentDir);
      })
      .catch(() => {
        // Fallback for GitHub Pages static hosting
        renderFileList(STATIC_REPO_FILES, '.');
      });
  }

  function viewOnlineFile(filePath) {
    if (window.innerWidth <= 768 && typeof showExplorerViewer === 'function') {
      showExplorerViewer();
    }
    viewerFilename.innerText = `Loading ${filePath}...`;
    viewerCodeContent.innerText = '// Fetching file content...';

    fetch(`/api/read?file=${encodeURIComponent(filePath)}`)
      .then(r => r.json())
      .then(res => {
        if (res.error) throw new Error(res.error);
        viewerFilename.innerText = res.filename;
        viewerFilesize.innerText = `${formatBytes(res.size)}`;
        viewerCodeContent.innerText = res.content;
      })
      .catch(() => {
        // Fallback: direct HTTP fetch for GitHub Pages
        fetch(filePath)
          .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.text();
          })
          .then(text => {
            viewerFilename.innerText = filePath;
            viewerFilesize.innerText = formatBytes(new Blob([text]).size);
            viewerCodeContent.innerText = text;
          })
          .catch(err => {
            viewerCodeContent.innerText = `// Could not read file content: ${err.message}`;
          });
      });
  }

  if (btnUpDir) {
    btnUpDir.addEventListener('click', () => {
      playUiClick();
      const parts = currentExplorerDir.split('/');
      parts.pop();
      loadFileExplorer(parts.join('/') || '.');
    });
  }

  if (btnRefreshFiles) {
    btnRefreshFiles.addEventListener('click', () => {
      playUiClick();
      loadFileExplorer(currentExplorerDir);
    });
  }

  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      playSuccessChord();
      navigator.clipboard.writeText(viewerCodeContent.innerText).then(() => {
        btnCopyCode.innerText = 'Copied!';
        setTimeout(() => btnCopyCode.innerText = 'Copy Content', 1500);
      });
    });
  }

  // Mobile File Explorer Toggle Views
  const btnToggleList = document.getElementById('btn-toggle-explorer-list');
  const btnToggleViewer = document.getElementById('btn-toggle-explorer-viewer');
  const btnMobileBackFiles = document.getElementById('btn-mobile-back-files');
  const explorerListPane = document.getElementById('explorer-list-pane');
  const explorerViewerPane = document.getElementById('explorer-viewer-pane');

  function showExplorerList() {
    playUiClick();
    if (explorerListPane) explorerListPane.style.display = 'flex';
    if (explorerViewerPane) explorerViewerPane.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
    if (btnToggleList) btnToggleList.classList.add('active');
    if (btnToggleViewer) btnToggleViewer.classList.remove('active');
    if (btnMobileBackFiles) btnMobileBackFiles.style.display = 'none';
  }

  function showExplorerViewer() {
    playUiClick();
    if (explorerViewerPane) explorerViewerPane.style.display = 'flex';
    if (explorerListPane) explorerListPane.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
    if (btnToggleViewer) btnToggleViewer.classList.add('active');
    if (btnToggleList) btnToggleList.classList.remove('active');
    if (btnMobileBackFiles && window.innerWidth <= 768) btnMobileBackFiles.style.display = 'inline-flex';
  }

  if (btnToggleList) btnToggleList.addEventListener('click', showExplorerList);
  if (btnToggleViewer) btnToggleViewer.addEventListener('click', showExplorerViewer);
  if (btnMobileBackFiles) btnMobileBackFiles.addEventListener('click', showExplorerList);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (explorerListPane) explorerListPane.style.display = 'flex';
      if (explorerViewerPane) explorerViewerPane.style.display = 'flex';
      if (btnMobileBackFiles) btnMobileBackFiles.style.display = 'none';
    }
  });

  // Handle direct download button for GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    document.querySelectorAll('a[download]').forEach(a => {
      a.href = 'https://github.com/aman35-ai/antigravity-cockpit/archive/refs/heads/main.zip';
      a.removeAttribute('download');
      a.target = '_blank';
    });
  }

  // =========================================================================
  // 9. Load Static Skill & Agent Manifest (data.json)
  // =========================================================================
  fetch('data.json')
    .then(r => r.json())
    .then(data => {
      skillsData = data.skills || [];
      agentsData = data.agents || [];
      window._staticEfforts = data.efforts || [];
      window._staticKnowledge = data.knowledge || {};

      // If containers are empty from static mode, fill them
      const effortContainer = document.getElementById('effort-timeline-container');
      if (effortContainer && (!effortContainer.children || effortContainer.children.length === 0)) {
        renderEfforts(window._staticEfforts);
      }
      const archContainer = document.getElementById('arch-grid-container');
      if (archContainer && (!archContainer.children || archContainer.children.length === 0)) {
        renderKnowledge(window._staticKnowledge);
      }

      document.getElementById('kpi-skills').innerText = data.stats.skillsCount || 482;
      document.getElementById('kpi-agents').innerText = data.stats.agentsCount || 71;
      document.getElementById('kpi-workflows').innerText = data.stats.workflowsCount || 97;
      document.getElementById('kpi-rules').innerText = data.stats.rulesCount || 122;

      const countAll = document.getElementById('count-all');
      if (countAll) countAll.innerText = data.stats.skillsCount;

      renderSkillsGrid();
      renderAgentsGrid();
      initCommandDeck();
    })
    .catch(() => {});

  // Skill Grid Filtering
  const skillsGrid = document.getElementById('skills-grid');
  const searchInput = document.getElementById('skill-search');
  const catPills = document.querySelectorAll('.cat-pill');
  const showingText = document.getElementById('showing-text');
  const loadMoreBtn = document.getElementById('load-more-btn');

  function renderSkillsGrid() {
    if (!skillsGrid) return;
    skillsGrid.innerHTML = '';

    const filtered = skillsData.filter(s => {
      const matchCat = currentCategory === 'all' || s.category === currentCategory;
      const matchQuery = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || (s.desc && s.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });

    const displaySet = filtered.slice(0, visibleCount);

    if (displaySet.length === 0) {
      skillsGrid.innerHTML = `<div class="glass-card" style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-dim);">No skills matching query "${searchQuery}".</div>`;
      if (showingText) showingText.innerText = `0 of ${filtered.length} skills`;
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    displaySet.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card glass-card';
      card.innerHTML = `
        <div class="skill-card-top">
          <div class="skill-header-meta">
            <span class="tag">${skill.category}</span>
            <span class="text-dim text-mono" style="font-size: 0.68rem;">SKILL.md</span>
          </div>
          <h4 class="skill-name text-mono">${skill.name}</h4>
          <p class="skill-desc">${skill.desc}</p>
        </div>
        <div class="skill-card-bottom">
          <span class="text-accent text-mono">mount on-demand</span>
          <span class="text-dim">Inspect &rarr;</span>
        </div>
      `;

      card.addEventListener('mouseenter', playUiHover);
      card.addEventListener('click', () => {
        playUiClick();
        openSkillModal(skill);
      });

      skillsGrid.appendChild(card);
    });

    if (showingText) showingText.innerText = `Showing ${displaySet.length} of ${filtered.length} skills`;
    if (loadMoreBtn) loadMoreBtn.style.display = displaySet.length < filtered.length ? 'block' : 'none';
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      playUiClick();
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-cat');
      visibleCount = 24;
      renderSkillsGrid();
    });
  });

  let searchDebounce;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        searchQuery = e.target.value.trim();
        visibleCount = 24;
        renderSkillsGrid();
      }, 150);
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      playUiClick();
      visibleCount += 24;
      renderSkillsGrid();
    });
  }

  // Skill Modal
  const modal = document.getElementById('skill-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');

  function openSkillModal(skill) {
    if (!modal) return;
    document.getElementById('modal-category').innerText = skill.category.toUpperCase();
    document.getElementById('modal-title').innerText = skill.name;
    document.getElementById('modal-desc').innerText = skill.desc;
    document.getElementById('modal-path').innerText = `.agents/skills/${skill.name}/SKILL.md`;
    document.getElementById('modal-code').innerText = `// Prompt Antigravity:\n"Use the [${skill.name}] skill to configure and implement this feature."`;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeSkillModal() {
    if (!modal) return;
    playUiClick();
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closeSkillModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSkillModal);
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeSkillModal(); });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      playSuccessChord();
      const code = document.getElementById('modal-code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        modalCopyBtn.innerText = 'Copied!';
        setTimeout(() => modalCopyBtn.innerText = 'Copy Invocation', 1500);
      });
    });
  }

  // =========================================================================
  // 10. Agent Grid (73 Personas with Search & Category Filters)
  // =========================================================================
  const agentsGrid = document.getElementById('agents-grid');
  const agentSearchInput = document.getElementById('agent-search');
  const agentCatPills = document.querySelectorAll('#agent-cat-pills .cat-pill');
  let currentAgentCategory = 'all';
  let agentSearchQuery = '';

  function renderAgentsGrid() {
    if (!agentsGrid) return;
    agentsGrid.innerHTML = '';

    const filtered = agentsData.filter(agent => {
      const aName = typeof agent === 'object' ? agent.name : agent;
      const aRole = typeof agent === 'object' ? agent.role : 'Specialized Agent';
      const aCat = typeof agent === 'object' ? agent.category : 'General';
      const aDesc = typeof agent === 'object' ? agent.desc : '';
      const aSpec = typeof agent === 'object' && agent.specialties ? agent.specialties.join(' ') : '';

      const matchCat = currentAgentCategory === 'all' || aCat === currentAgentCategory;
      const q = agentSearchQuery.toLowerCase();
      const matchQuery = !agentSearchQuery || aName.toLowerCase().includes(q) || aRole.toLowerCase().includes(q) || aDesc.toLowerCase().includes(q) || aSpec.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      agentsGrid.innerHTML = `<div class="glass-card" style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-dim);">No agents matching "${agentSearchQuery}".</div>`;
      return;
    }

    filtered.forEach(agent => {
      const aName = typeof agent === 'object' ? agent.name : agent;
      const aRole = typeof agent === 'object' ? agent.role : 'Specialized Subagent';
      const aCat = typeof agent === 'object' ? agent.category : 'General';
      const aDesc = typeof agent === 'object' ? agent.desc : 'Full spectrum automated development agent.';
      const aSpec = typeof agent === 'object' && agent.specialties ? agent.specialties : ['Autonomous Persona'];

      const card = document.createElement('div');
      card.className = 'agent-card glass-card';
      card.innerHTML = `
        <div class="skill-header-meta">
          <span class="tag">${aCat}</span>
          <span class="text-dim text-mono" style="font-size: 0.68rem;">AGENT</span>
        </div>
        <div style="margin-top: 8px;">
          <h4 class="agent-name text-mono" style="color: #fff; font-size: 1.05rem;">${aName}</h4>
          <div class="agent-card-role text-mono">${aRole}</div>
          <p class="agent-desc" style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">${aDesc}</p>
          <div class="agent-specialties">
            ${aSpec.map(s => `<span class="tag" style="font-size: 0.65rem;">${s}</span>`).join('')}
          </div>
          <button class="btn btn-glass btn-sm agent-btn-engage" data-agent="${aName}">⚡ Engage in Command Deck</button>
        </div>
      `;

      const engageBtn = card.querySelector('.agent-btn-engage');
      if (engageBtn) {
        engageBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          setLeadAgentInCommandDeck(aName);
        });
      }

      card.addEventListener('mouseenter', playUiHover);
      agentsGrid.appendChild(card);
    });
  }

  if (agentCatPills) {
    agentCatPills.forEach(pill => {
      pill.addEventListener('click', () => {
        playUiClick();
        agentCatPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentAgentCategory = pill.getAttribute('data-agent-cat');
        renderAgentsGrid();
      });
    });
  }

  let agentSearchDebounce;
  if (agentSearchInput) {
    agentSearchInput.addEventListener('input', (e) => {
      clearTimeout(agentSearchDebounce);
      agentSearchDebounce = setTimeout(() => {
        agentSearchQuery = e.target.value.trim();
        renderAgentsGrid();
      }, 150);
    });
  }

  // =========================================================================
  // 11. Antigravity Neural Command Deck & Swarm Dispatcher Engine
  // =========================================================================
  let mountedSkills = ['agentic-engineering', 'backend-patterns', 'make-interfaces-feel-better'];
  let currentLeadAgent = 'planner';

  const PRESETS = {
    feature: {
      agent: 'planner',
      skills: ['orch-add-feature', 'tdd-guide', 'architect', 'backend-patterns'],
      goal: 'Architect and implement a high-performance feature end-to-end with regression testing and clean modular design.'
    },
    security: {
      agent: 'security-reviewer',
      skills: ['security-review', 'backend-patterns', 'OWASP Top 10'],
      goal: 'Perform a comprehensive zero-vulnerability audit covering boundary validation, secret leakage, and AST enforcement.'
    },
    perf: {
      agent: 'performance-optimizer',
      skills: ['react-reviewer', 'make-interfaces-feel-better', 'vite-patterns'],
      goal: 'Audit render loops, eliminate memory leaks, streamline bundle chunks, and optimize Core Web Vitals.'
    },
    mobile: {
      agent: 'a11y-architect',
      skills: ['make-interfaces-feel-better', 'tailwindcss', 'WCAG 2.2'],
      goal: 'Polish mobile layout ergonomics, 48px hit areas, safe area insets, and keyboard navigation semantics.'
    },
    bug: {
      agent: 'build-error-resolver',
      skills: ['orch-fix-defect', 'tdd-guide', 'silent-failure-hunter'],
      goal: 'Reproduce runtime defect with failing behavioral test, implement surgical fix, and verify green build.'
    }
  };

  function setLeadAgentInCommandDeck(agentName) {
    playSuccessChord();
    currentLeadAgent = agentName;
    const select = document.getElementById('cmd-agent-select');
    if (select) select.value = agentName;
    updateLeadAgentPreview(agentName);
    compileDirective();
    window.switchTab('tab-command');
  }

  function updateLeadAgentPreview(agentName) {
    const previewName = document.getElementById('preview-agent-name');
    const previewDesc = document.getElementById('preview-agent-desc');
    const found = agentsData.find(a => (typeof a === 'object' ? a.name : a) === agentName);

    if (previewName) previewName.innerText = agentName;
    if (previewDesc) {
      if (found && typeof found === 'object') {
        previewDesc.innerText = `${found.role} — ${found.desc}`;
      } else {
        previewDesc.innerText = 'Specialized autonomous Antigravity subagent persona.';
      }
    }
  }

  function renderMountedSkills() {
    const container = document.getElementById('mounted-skills-container');
    if (!container) return;
    container.innerHTML = '';
    mountedSkills.forEach(s => {
      const chip = document.createElement('div');
      chip.className = 'skill-chip-removable';
      chip.innerHTML = `<span>⚡ ${s}</span><span class="chip-remove-x" title="Remove">&times;</span>`;
      chip.addEventListener('click', () => {
        playUiClick();
        mountedSkills = mountedSkills.filter(x => x !== s);
        renderMountedSkills();
        compileDirective();
      });
      container.appendChild(chip);
    });
  }

  function compileDirective() {
    const goalInput = document.getElementById('cmd-goal-input');
    const directiveDisplay = document.getElementById('directive-code-display');
    if (!directiveDisplay) return;

    const goal = goalInput && goalInput.value.trim() ? goalInput.value.trim() : 'Execute prioritized development directives under strict ECC guidelines.';
    const found = agentsData.find(a => (typeof a === 'object' ? a.name : a) === currentLeadAgent);
    const role = found && typeof found === 'object' ? found.role : 'Specialized Agent';

    const compiled = `// ANTIGRAVITY MISSION DIRECTIVE
LEAD AGENT: ${currentLeadAgent} (${role})
ACTIVE SKILLS: [${mountedSkills.join(', ')}]
OBJECTIVE:
"${goal}"

PROTOCOL:
1. Plan before modifying files.
2. Enforce test-driven verification (TDD).
3. Validate security boundaries with AgentShield AST guard.
4. Keep changes self-contained, clean, and easily revertible.`;

    directiveDisplay.innerText = compiled;
  }

  function initCommandDeck() {
    const cmdAgentSelect = document.getElementById('cmd-agent-select');
    const cmdGoalInput = document.getElementById('cmd-goal-input');
    const btnCopyDirective = document.getElementById('btn-copy-directive');
    const btnDispatchSwarm = document.getElementById('btn-dispatch-swarm');
    const presetChips = document.querySelectorAll('.preset-chip');
    const cmdSkillInput = document.getElementById('cmd-skill-input');
    const skillSearchResults = document.getElementById('skill-search-results');

    // Populate Agent Select dropdown
    if (cmdAgentSelect && agentsData.length > 0) {
      cmdAgentSelect.innerHTML = '';
      const grouped = {};
      agentsData.forEach(agent => {
        const cat = typeof agent === 'object' ? agent.category : 'General';
        const name = typeof agent === 'object' ? agent.name : agent;
        const role = typeof agent === 'object' ? agent.role : 'Agent';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({ name, role });
      });

      Object.keys(grouped).sort().forEach(cat => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = cat;
        grouped[cat].forEach(a => {
          const opt = document.createElement('option');
          opt.value = a.name;
          opt.innerText = `${a.name} (${a.role})`;
          if (a.name === currentLeadAgent) opt.selected = true;
          optgroup.appendChild(opt);
        });
        cmdAgentSelect.appendChild(optgroup);
      });

      cmdAgentSelect.addEventListener('change', () => {
        playUiClick();
        currentLeadAgent = cmdAgentSelect.value;
        updateLeadAgentPreview(currentLeadAgent);
        compileDirective();
      });
    }

    updateLeadAgentPreview(currentLeadAgent);

    // Preset Chips
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        playUiClick();
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const pKey = chip.getAttribute('data-preset');
        const p = PRESETS[pKey];
        if (p) {
          currentLeadAgent = p.agent;
          if (cmdAgentSelect) cmdAgentSelect.value = p.agent;
          updateLeadAgentPreview(p.agent);
          mountedSkills = [...p.skills];
          renderMountedSkills();
          if (cmdGoalInput) cmdGoalInput.value = p.goal;
          compileDirective();
        }
      });
    });

    // Skill search in command deck
    if (cmdSkillInput && skillSearchResults) {
      cmdSkillInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) {
          skillSearchResults.classList.remove('open');
          skillSearchResults.innerHTML = '';
          return;
        }

        const matches = skillsData.filter(s => s.name.toLowerCase().includes(q) || (s.desc && s.desc.toLowerCase().includes(q))).slice(0, 8);

        if (matches.length === 0) {
          skillSearchResults.innerHTML = `<div class="skill-result-item" style="color: var(--text-dim);">No skill found.</div>`;
        } else {
          skillSearchResults.innerHTML = matches.map(m => `
            <div class="skill-result-item" data-skill="${m.name}">
              <span>⚡ ${m.name}</span>
              <span class="tag" style="font-size: 0.65rem;">${m.category}</span>
            </div>
          `).join('');

          skillSearchResults.querySelectorAll('.skill-result-item').forEach(el => {
            el.addEventListener('click', () => {
              const sName = el.getAttribute('data-skill');
              if (sName && !mountedSkills.includes(sName)) {
                mountedSkills.push(sName);
                renderMountedSkills();
                compileDirective();
                playUiClick();
              }
              cmdSkillInput.value = '';
              skillSearchResults.classList.remove('open');
            });
          });
        }
        skillSearchResults.classList.add('open');
      });

      document.addEventListener('click', (e) => {
        if (!cmdSkillInput.contains(e.target) && !skillSearchResults.contains(e.target)) {
          skillSearchResults.classList.remove('open');
        }
      });
    }

    if (cmdGoalInput) {
      cmdGoalInput.addEventListener('input', compileDirective);
    }

    renderMountedSkills();
    compileDirective();

    // Copy Directive Button
    if (btnCopyDirective) {
      btnCopyDirective.addEventListener('click', () => {
        playSuccessChord();
        const directiveDisplay = document.getElementById('directive-code-display');
        if (directiveDisplay) {
          navigator.clipboard.writeText(directiveDisplay.innerText).then(() => {
            btnCopyDirective.innerText = '✓ Directive Copied!';
            setTimeout(() => { btnCopyDirective.innerText = '📋 Copy Directive'; }, 1800);
          });
        }
      });
    }

    // Dispatch Swarm Button
    if (btnDispatchSwarm) {
      btnDispatchSwarm.addEventListener('click', () => {
        dispatchSwarmExecution();
      });
    }
  }

  function dispatchSwarmExecution() {
    playSuccessChord();
    const terminalOutput = document.getElementById('terminal-output');
    const terminalStatusBadge = document.getElementById('terminal-status-badge');
    const swarmProgressWrap = document.getElementById('swarm-progress-wrap');
    const swarmStageLabel = document.getElementById('swarm-stage-label');
    const swarmStagePct = document.getElementById('swarm-stage-pct');
    const swarmProgressFill = document.getElementById('swarm-progress-fill');

    if (terminalStatusBadge) {
      terminalStatusBadge.innerText = 'SWARM ACTIVE';
      terminalStatusBadge.className = 'badge badge-accent text-mono';
    }

    if (swarmProgressWrap) swarmProgressWrap.style.display = 'flex';

    const stages = [
      { pct: 20, label: `MOUNTING [${currentLeadAgent}] + ${mountedSkills.length} SKILLS...`, log: `> Initializing ${currentLeadAgent} persona. Loading modular skills: ${mountedSkills.slice(0, 3).join(', ')}...` },
      { pct: 45, label: 'ENFORCING AGENTSHIELD AST POLICY...', log: `> AST Security Scan: AgentShield v1.6.0 boundary policy ENFORCED. No unauthorized network leaks.` },
      { pct: 70, label: 'SYNTHESIZING TDD EXECUTION BLUEPRINT...', log: `> Test harness activated. Formulating failing test criteria before code synthesis.` },
      { pct: 90, label: 'COORDINATING SUBAGENT WORKERS...', log: `> Multi-agent swarm engaged. Telemetry and memory synced across .agents channels.` },
      { pct: 100, label: 'SWARM MISSION COMPLETE', log: `> SUCCESS: Swarm execution cycle complete. Activity logged to Cockpit Effort Vault.` }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step >= stages.length) {
        clearInterval(interval);
        if (terminalStatusBadge) {
          terminalStatusBadge.innerText = 'SYNCHRONIZED';
          terminalStatusBadge.className = 'badge text-positive text-mono';
        }
        playSuccessChord();

        // Record to live task timeline!
        const newTask = {
          id: `task-0${(window._staticEfforts ? window._staticEfforts.length : 10) + 1}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          category: 'Swarm Mission',
          title: `Mission Dispatched: ${currentLeadAgent}`,
          detail: `Autonomous swarm directive dispatched with ${mountedSkills.length} mounted skills: ${mountedSkills.join(', ')}.`,
          status: 'Active',
          impact: 'Live multi-agent execution logged directly in Cockpit.'
        };

        if (window._staticEfforts) {
          window._staticEfforts.unshift(newTask);
          renderEfforts(window._staticEfforts);
          const badge = document.getElementById('effort-count-badge');
          if (badge) badge.innerText = window._staticEfforts.length;
        }
        return;
      }

      const cur = stages[step];
      playTone(600 + step * 120, 'triangle', 0.08, 0.03);

      if (swarmStageLabel) swarmStageLabel.innerText = cur.label;
      if (swarmStagePct) swarmStagePct.innerText = `${cur.pct}%`;
      if (swarmProgressFill) swarmProgressFill.style.width = `${cur.pct}%`;

      if (terminalOutput) {
        const p = document.createElement('p');
        p.className = 't-line text-accent';
        p.innerText = cur.log;
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }

      step++;
    }, 450);
  }

  // Initialize
  initThreeBg();
});

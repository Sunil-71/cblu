// ============================================================
//  CBLU OLD QUESTION PAPERS — app.js
//  Real-time persistence via localStorage (store/ folder simulation)
//  Papers & PDFs are saved to browser's localStorage automatically
//  on every add/edit/delete — acts like a permanent store/ folder
// ============================================================

// ===== COURSES DATA =====
const COURSES = [
  { id: 'ba',   name: 'BA',          full: 'Bachelor of Arts',              icon: '🎓' },
  { id: 'bca',  name: 'BCA',         full: 'Bachelor of Computer Apps',     icon: '💻' },
  { id: 'mca',  name: 'MCA',         full: 'Master of Computer Apps',       icon: '🖥️' },
  { id: 'bsc',  name: 'BSc',         full: 'Bachelor of Science (General)', icon: '🔬' },
  { id: 'bscm', name: 'BSc Maths',   full: 'BSc Mathematics',               icon: '📐' },
  { id: 'bscs', name: 'BSc Science', full: 'BSc Science',                   icon: '⚗️' },
  { id: 'bsch', name: 'BSc History', full: 'BSc History',                   icon: '📜' },
  { id: 'bam',  name: 'BA Maths',    full: 'BA Mathematics',                icon: '📊' },
  { id: 'bag',  name: 'BA Geography',full: 'BA Geography',                  icon: '🌍' },
  { id: 'bahi', name: 'BA Hindi',    full: 'BA Hindi',                      icon: '📖' },
  { id: 'baen', name: 'BA English',  full: 'BA English',                    icon: '✍️' },
  { id: 'ma',   name: 'MA',          full: 'Master of Arts',                icon: '🏛️' },
  { id: 'bcom', name: 'BCom',        full: 'Bachelor of Commerce',          icon: '💼' },
  { id: 'mcom', name: 'MCom',        full: 'Master of Commerce',            icon: '📈' },
  { id: 'bba',  name: 'BBA',         full: 'Bachelor of Business Admin',    icon: '🏢' },
];

// ===== DEFAULT PAPERS (loaded on first run) =====
const DEFAULT_PAPERS = {
  ba: {
    1: [
      { id: 1, name: 'Hindi Literature Paper I — 2023', file: null },
      { id: 2, name: 'English Compulsory Paper — 2023', file: null },
      { id: 3, name: 'History of India Paper I — 2022', file: null },
      { id: 4, name: 'Political Science Paper I — 2022', file: null },
    ],
    2: [
      { id: 5, name: 'Hindi Literature Paper II — 2023', file: null },
      { id: 6, name: 'Sociology Paper I — 2022', file: null },
    ],
    3: [{ id: 7, name: 'Philosophy Paper I — 2023', file: null }],
    4: [], 5: [], 6: []
  },
  bca: {
    1: [
      { id: 10, name: 'Computer Fundamentals — 2023', file: null },
      { id: 11, name: 'Mathematics I — 2023', file: null },
      { id: 12, name: 'Programming in C — 2022', file: null },
      { id: 13, name: 'Digital Electronics — 2022', file: null },
    ],
    2: [
      { id: 14, name: 'Data Structures — 2023', file: null },
      { id: 15, name: 'Database Management System — 2022', file: null },
    ],
    3: [{ id: 16, name: 'Operating Systems — 2023', file: null }],
    4: [], 5: [], 6: []
  },
  bsc: {
    1: [
      { id: 20, name: 'Physics Paper I — 2023', file: null },
      { id: 21, name: 'Chemistry Paper I — 2023', file: null },
      { id: 22, name: 'Mathematics I — 2023', file: null },
      { id: 23, name: 'English Communication — 2022', file: null },
    ],
    2: [
      { id: 24, name: 'Physics Paper II — 2023', file: null },
      { id: 25, name: 'Chemistry Paper II — 2022', file: null },
    ],
    3: [], 4: [], 5: [], 6: []
  },
  mca: {
    1: [
      { id: 30, name: 'Advanced Algorithms — 2023', file: null },
      { id: 31, name: 'Computer Networks — 2022', file: null },
    ],
    2: [{ id: 32, name: 'Software Engineering — 2023', file: null }],
    3: [], 4: [], 5: [], 6: []
  },
  bscm: {
    1: [
      { id: 40, name: 'Advanced Calculus — 2023', file: null },
      { id: 41, name: 'Abstract Algebra — 2022', file: null },
    ],
    2: [], 3: [], 4: [], 5: [], 6: []
  },
};

// Fill empty structure for remaining courses
COURSES.forEach(c => {
  if (!DEFAULT_PAPERS[c.id]) {
    DEFAULT_PAPERS[c.id] = { 1:[], 2:[], 3:[], 4:[], 5:[], 6:[] };
  }
  for (let s = 1; s <= 6; s++) {
    if (!DEFAULT_PAPERS[c.id][s]) DEFAULT_PAPERS[c.id][s] = [];
  }
});

// ===== LOCALSTORAGE — acts as permanent store/ folder =====
const STORAGE_KEY = 'cblu_papers_v2';
const ID_KEY      = 'cblu_next_id';
const FILE_KEY    = 'cblu_files_v2';  // PDFs stored as base64 — simulates store/ folder

function loadPapers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) { console.warn('Papers load failed', e); }
  // First run — save default papers to store
  savePapers(DEFAULT_PAPERS);
  return JSON.parse(JSON.stringify(DEFAULT_PAPERS));
}

function savePapers(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) { console.warn('Papers save failed', e); }
}

function getNextId() {
  const id = parseInt(localStorage.getItem(ID_KEY) || '200');
  localStorage.setItem(ID_KEY, id + 1);
  return id;
}

// Save file to store (base64 in localStorage — permanent until admin deletes)
function saveFile(paperId, base64Data) {
  try {
    const files = JSON.parse(localStorage.getItem(FILE_KEY) || '{}');
    files[paperId] = base64Data;
    localStorage.setItem(FILE_KEY, JSON.stringify(files));
  } catch(e) { console.warn('File save failed — too large?', e); }
}

function getFile(paperId) {
  try {
    const files = JSON.parse(localStorage.getItem(FILE_KEY) || '{}');
    return files[paperId] || null;
  } catch(e) { return null; }
}

function deleteFile(paperId) {
  try {
    const files = JSON.parse(localStorage.getItem(FILE_KEY) || '{}');
    delete files[paperId];
    localStorage.setItem(FILE_KEY, JSON.stringify(files));
  } catch(e) {}
}

// ===== APP STATE =====
let papers       = loadPapers();
let curCourse    = null;
let curSem       = null;
let dlPaper      = null;
let delTarget    = null;  // { course, sem, id }
let editTarget   = null;  // { course, sem, id }
let adminCourse  = null;
let adminSem     = null;
let selectedFile = null;  // File object for upload

// ===== DARK MODE =====
function initTheme() {
  const saved = localStorage.getItem('cblu_theme') || 'light';
  applyTheme(saved);
}

function applyTheme(mode) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(mode + '-mode');
  const btn   = document.getElementById('theme-toggle');
  const icon  = btn.querySelector('.theme-icon');
  const label = btn.querySelector('.theme-label');
  if (mode === 'dark') {
    icon.textContent  = '☀️';
    label.textContent = 'Light Mode';
  } else {
    icon.textContent  = '🌙';
    label.textContent = 'Dark Mode';
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  const next   = isDark ? 'light' : 'dark';
  localStorage.setItem('cblu_theme', next);
  applyTheme(next);
});

// ===== PAGE NAVIGATION =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  curCourse = null; curSem = null;
  updateBreadcrumb();
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear-btn').style.display = 'none';
  renderCourseCards('courses-grid', COURSES, openCourse);
  document.getElementById('course-count').textContent = COURSES.length + ' Courses';
  showPage('page-home');
}

function goSems() {
  curSem = null;
  updateBreadcrumb();
  showPage('page-sems');
}

// ===== BREADCRUMB =====
function updateBreadcrumb() {
  const courseEl  = document.getElementById('bc-course');
  const courseSep = document.getElementById('bc-course-sep');
  const semEl     = document.getElementById('bc-sem');
  const semSep    = document.getElementById('bc-sem-sep');

  if (curCourse) {
    courseEl.textContent  = curCourse.name;
    courseEl.style.display  = 'inline';
    courseSep.style.display = 'inline';
  } else {
    courseEl.style.display  = 'none';
    courseSep.style.display = 'none';
  }

  if (curSem) {
    semEl.textContent    = 'Semester ' + curSem;
    semEl.style.display  = 'inline';
    semSep.style.display = 'inline';
  } else {
    semEl.style.display  = 'none';
    semSep.style.display = 'none';
  }
}

// ===== SEARCH =====
function filterCourses(q) {
  const clearBtn = document.getElementById('search-clear-btn');
  clearBtn.style.display = q ? 'block' : 'none';
  const filtered = COURSES.filter(c =>
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.full.toLowerCase().includes(q.toLowerCase())
  );
  renderCourseCards('courses-grid', filtered, openCourse);
  document.getElementById('course-count').textContent = filtered.length + ' Courses';
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear-btn').style.display = 'none';
  renderCourseCards('courses-grid', COURSES, openCourse);
  document.getElementById('course-count').textContent = COURSES.length + ' Courses';
}

// ===== RENDER COURSE CARDS =====
function renderCourseCards(gridId, list, clickFn) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<div class="no-results">🔍 No course found. Try a different keyword.</div>';
    return;
  }

  list.forEach(c => {
    const count = papers[c.id] ? Object.values(papers[c.id]).flat().length : 0;
    const div = document.createElement('div');
    div.className = 'course-card';
    div.innerHTML = `
      <div class="card-icon">${c.icon}</div>
      <div class="card-name">${c.name}</div>
      <div class="card-full">${c.full}</div>
      <div class="card-full" style="margin-top:6px;font-size:12px;color:var(--acc)">${count > 0 ? count + ' papers' : 'Papers coming soon'}</div>
    `;
    div.addEventListener('click', () => clickFn(c));
    grid.appendChild(div);
  });
}

// ===== OPEN COURSE =====
function openCourse(c) {
  curCourse = c;
  updateBreadcrumb();
  document.getElementById('sem-course-title').textContent = c.name + ' — ' + c.full;

  const grid = document.getElementById('sem-grid');
  grid.innerHTML = '';
  for (let s = 1; s <= 6; s++) {
    const count = (papers[c.id] && papers[c.id][s]) ? papers[c.id][s].length : 0;
    const div = document.createElement('div');
    div.className = 'sem-card';
    div.innerHTML = `
      <div class="sem-num">${s}</div>
      <div class="sem-label">Semester ${s}</div>
      <div class="sem-count">${count > 0 ? count + ' paper' + (count > 1 ? 's' : '') : 'No papers yet'}</div>
    `;
    div.addEventListener('click', () => openSem(s));
    grid.appendChild(div);
  }
  showPage('page-sems');
}

// ===== OPEN SEMESTER =====
function openSem(s) {
  curSem = s;
  updateBreadcrumb();
  document.getElementById('papers-title').textContent = curCourse.name + ' — Semester ' + s;
  renderPapers();
  showPage('page-papers');
}

function renderPapers() {
  const list = (papers[curCourse.id] && papers[curCourse.id][curSem]) ? papers[curCourse.id][curSem] : [];
  const container = document.getElementById('papers-list');
  document.getElementById('papers-count').textContent = list.length + ' paper' + (list.length !== 1 ? 's' : '') + ' available';

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No papers uploaded yet for this semester.</p>
      </div>`;
    return;
  }

  container.innerHTML = '';
  list.forEach(p => {
    const hasFile = !!getFile(p.id);
    const div = document.createElement('div');
    div.className = 'paper-card';
    div.innerHTML = `
      <div class="paper-icon">📄</div>
      <div class="paper-info">
        <div class="paper-name">${escHtml(p.name)}</div>
        <div style="margin-top:5px">
          <span class="paper-badge">${curCourse.name} • Sem ${curSem}</span>
          ${hasFile ? '<span class="paper-badge" style="margin-left:6px;background:var(--green-light);color:var(--green);">PDF ✓</span>' : ''}
        </div>
      </div>
      <div class="paper-actions">
        <button class="btn btn-primary" style="font-size:13px;padding:8px 16px" onclick="openDownload(${p.id}, '${escAttr(p.name)}')">⬇ Download</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ===== DOWNLOAD =====
function openDownload(id, name) {
  dlPaper = { id, name };
  document.getElementById('dl-paper-name-text').textContent = '"' + name + '"';
  openModal('download-modal');
}

function confirmDownload() {
  closeModal('download-modal');
  const fileData = getFile(dlPaper.id);
  if (fileData) {
    // real PDF download
    const a = document.createElement('a');
    a.href = fileData;
    a.download = dlPaper.name + '.pdf';
    a.click();
    showToast('✓ Download started!');
  } else {
    // dummy PDF
    const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>>>>>>>endobj
4 0 obj<</Length 120>>stream
BT /F1 18 Tf 72 700 Td (CBLU Old Question Paper) Tj 0 -30 Td /F1 14 Tf (${dlPaper.name}) Tj 0 -30 Td (Chaudhary Bansi Lal University, Bhiwani) Tj ET
endstream endobj
xref
0 5
0000000000 65535 f
0000000015 00000 n
0000000062 00000 n
0000000114 00000 n
0000000299 00000 n
trailer<</Size 5/Root 1 0 R>>startxref 471 %%EOF`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = dlPaper.name + '.pdf';
    a.click();
    showToast('✓ Download started!');
  }
}

// ===== ADMIN LOGIN =====
function showAdminLogin() {
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
  document.getElementById('login-err').classList.add('hidden');
  openModal('admin-login-modal');
  setTimeout(() => document.getElementById('admin-user').focus(), 100);
}

function doAdminLogin() {
  const u = document.getElementById('admin-user').value.trim();
  const p = document.getElementById('admin-pass').value;
  if (u === 'Mahak_1234' && p === '@Mahak127021@') {
    closeModal('admin-login-modal');
    loadAdminPanel();
  } else {
    document.getElementById('login-err').classList.remove('hidden');
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-pass').focus();
  }
}

function adminLogout() {
  goHome();
}

// ===== ADMIN PANEL =====
function loadAdminPanel() {
  adminCourse = null; adminSem = null;
  setAdminStep(1);
  renderCourseCards('admin-courses-grid', COURSES, c => {
    adminCourse = c;
    document.getElementById('admin-course-lbl').textContent = c.name + ' — ' + c.full;
    setAdminStep(2);
    renderAdminSems();
  });
  showPage('page-admin');
}

function renderAdminSems() {
  const grid = document.getElementById('admin-sem-grid');
  grid.innerHTML = '';
  for (let s = 1; s <= 6; s++) {
    const count = (papers[adminCourse.id] && papers[adminCourse.id][s]) ? papers[adminCourse.id][s].length : 0;
    const div = document.createElement('div');
    div.className = 'sem-card';
    div.innerHTML = `
      <div class="sem-num">${s}</div>
      <div class="sem-label">Semester ${s}</div>
      <div class="sem-count">${count} paper${count !== 1 ? 's' : ''}</div>
    `;
    div.addEventListener('click', () => {
      adminSem = s;
      document.getElementById('admin-sem-info').textContent =
        '📚 ' + adminCourse.name + ' (' + adminCourse.full + ') — Semester ' + s;
      setAdminStep(3);
      renderAdminPapers();
    });
    grid.appendChild(div);
  }
}

function renderAdminPapers() {
  const list = (papers[adminCourse.id] && papers[adminCourse.id][adminSem]) ? papers[adminCourse.id][adminSem] : [];
  const container = document.getElementById('admin-papers-list');

  if (list.length === 0) {
    container.innerHTML = '<div style="color:var(--text3);font-size:14px;padding:16px 0;text-align:center">No papers yet — add one below.</div>';
    return;
  }

  container.innerHTML = '';
  list.forEach(p => {
    const hasFile = !!getFile(p.id);
    const storePath = `store/${adminCourse.id}/sem${adminSem}/${p.id}.pdf`;
    const div = document.createElement('div');
    div.className = 'admin-paper-row';
    div.innerHTML = `
      <div style="flex:1;min-width:0">
        <div class="admin-paper-name">📄 ${escHtml(p.name)}</div>
        <div class="admin-paper-meta">${hasFile ? '✅ PDF stored → ' + storePath : '⚠️ No PDF uploaded yet'}</div>
      </div>
      <div class="admin-paper-actions">
        <button class="btn btn-edit" onclick="openEdit(${p.id}, '${escAttr(p.name)}')">✏️ Edit</button>
        <button class="btn btn-del" onclick="openDeleteConfirm(${p.id}, '${escAttr(p.name)}')">🗑️ Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ===== ADD PAPER =====
function handleFileSelect(input) {
  selectedFile = input.files[0] || null;
  const label = document.getElementById('file-text');
  if (selectedFile) {
    label.textContent = '✅ ' + selectedFile.name;
    label.classList.add('file-selected');
  } else {
    label.textContent = 'Click to select PDF';
    label.classList.remove('file-selected');
  }
}

function addPaper() {
  const nameInput = document.getElementById('new-paper-name');
  const name = nameInput.value.trim();

  if (!name) {
    showToast('⚠️ Please enter paper name!', true);
    nameInput.focus();
    return;
  }

  const id = getNextId();

  // Convert file to base64 and save to store
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      saveFile(id, e.target.result);
      finishAddPaper(id, name);
    };
    reader.readAsDataURL(selectedFile);
  } else {
    finishAddPaper(id, name);
  }
}

function finishAddPaper(id, name) {
  if (!papers[adminCourse.id]) papers[adminCourse.id] = {};
  if (!papers[adminCourse.id][adminSem]) papers[adminCourse.id][adminSem] = [];

  papers[adminCourse.id][adminSem].push({ id, name, file: null });
  savePapers(papers);

  // form reset
  document.getElementById('new-paper-name').value = '';
  document.getElementById('new-paper-file').value = '';
  document.getElementById('file-text').textContent = 'Click to select PDF';
  document.getElementById('file-text').classList.remove('file-selected');
  selectedFile = null;

  renderAdminPapers();
  showToast('✅ Paper uploaded successfully!');
}

// ===== DELETE =====
function openDeleteConfirm(id, name) {
  delTarget = { course: adminCourse, sem: adminSem, id };
  document.getElementById('del-paper-name-text').textContent = '"' + name + '" — this paper will be permanently deleted.';
  openModal('delete-modal');
}

function confirmDelete() {
  if (!delTarget) return;
  const list = papers[delTarget.course.id][delTarget.sem];
  papers[delTarget.course.id][delTarget.sem] = list.filter(p => p.id !== delTarget.id);
  deleteFile(delTarget.id);
  savePapers(papers);
  closeModal('delete-modal');
  renderAdminPapers();
  showToast('🗑️ Paper deleted successfully.');
  delTarget = null;
}

// ===== EDIT =====
function openEdit(id, name) {
  editTarget = { course: adminCourse, sem: adminSem, id };
  document.getElementById('edit-paper-input').value = name;
  openModal('edit-modal');
  setTimeout(() => document.getElementById('edit-paper-input').focus(), 100);
}

function confirmEdit() {
  if (!editTarget) return;
  const newName = document.getElementById('edit-paper-input').value.trim();
  if (!newName) { showToast('⚠️ Name cannot be empty!', true); return; }

  const paper = papers[editTarget.course.id][editTarget.sem].find(p => p.id === editTarget.id);
  if (paper) {
    paper.name = newName;
    savePapers(papers);
  }
  closeModal('edit-modal');
  renderAdminPapers();
  showToast('✅ Paper name updated successfully!');
  editTarget = null;
}

// ===== ADMIN STEP NAVIGATION =====
function setAdminStep(step) {
  document.getElementById('admin-s1').classList.toggle('hidden', step !== 1);
  document.getElementById('admin-s2').classList.toggle('hidden', step !== 2);
  document.getElementById('admin-s3').classList.toggle('hidden', step !== 3);

  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('step-' + i);
    el.classList.remove('active', 'done');
    if (i < step) el.classList.add('done');
    else if (i === step) el.classList.add('active');
  }
}

function adminToStep(step) {
  if (step === 1) { adminCourse = null; adminSem = null; loadAdminPanel(); }
  else if (step === 2) { adminSem = null; setAdminStep(2); renderAdminSems(); }
}

// ===== MODAL HELPERS =====
function openModal(id) {
  document.getElementById(id).classList.add('show');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('show');
  });
});

// ===== TOAST =====
let toastTimer = null;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('error');
  if (isError) toast.classList.add('error');
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== ESCAPE HELPERS =====
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escAttr(str) {
  return String(str).replace(/'/g, "\\'");
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
  }
  if (e.key === 'Enter' && document.getElementById('admin-login-modal').classList.contains('show')) {
    doAdminLogin();
  }
});

// ===== INIT =====
initTheme();
renderCourseCards('courses-grid', COURSES, openCourse);

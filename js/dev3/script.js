const STORAGE_KEY = 'fixMyAreaIssues';

const DEFAULT_ISSUES = [
  {
    id: 'ISS-1001',
    title: 'Large pothole near school entrance',
    category: 'pothole',
    area: 'Old Town',
    status: 'reported',
    priority: 'high',
    upvotes: 28,
    reportedBy: 'Demo Citizen',
    description: 'The road surface has collapsed outside the main school gate and is creating a safety hazard for pedestrians and cyclists.',
    createdAt: '2026-09-10T08:30:00.000Z'
  },
  {
    id: 'ISS-1002',
    title: 'Garbage overflow at bus stop',
    category: 'garbage',
    area: 'North Ridge',
    status: 'in-progress',
    priority: 'medium',
    upvotes: 17,
    reportedBy: 'Alice',
    description: 'Overflowing bins are attracting stray animals and creating an unpleasant environment near the bus stop.',
    createdAt: '2026-09-12T11:00:00.000Z'
  },
  {
    id: 'ISS-1003',
    title: 'Streetlight not working on Hill Road',
    category: 'streetlight',
    area: 'Hill Road',
    status: 'under-review',
    priority: 'high',
    upvotes: 23,
    reportedBy: 'Demo Citizen',
    description: 'Two streetlights adjacent to the residential lane are currently out and are making the area unsafe after dark.',
    createdAt: '2026-09-09T18:45:00.000Z'
  },
  {
    id: 'ISS-1004',
    title: 'Water leak from main pipe',
    category: 'water leakage',
    area: 'Mill View',
    status: 'resolved',
    priority: 'high',
    upvotes: 31,
    reportedBy: 'Jamie',
    description: 'A broken pipe is leaking near the public park and causing water pooling on the pavement.',
    createdAt: '2026-09-07T09:15:00.000Z'
  },
  {
    id: 'ISS-1005',
    title: 'Drain blocked near market square',
    category: 'drainage',
    area: 'Market Square',
    status: 'reported',
    priority: 'medium',
    upvotes: 14,
    reportedBy: 'Chris',
    description: 'Rainwater is not draining properly, causing pools to form in the central pedestrian route.',
    createdAt: '2026-09-13T07:40:00.000Z'
  }
];

function safeReadIssues() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ISSUES));
      return [...DEFAULT_ISSUES];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_ISSUES];
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ISSUES));
    return [...DEFAULT_ISSUES];
  }
}

function writeIssues(issues) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}

function getIssueById(id) {
  return safeReadIssues().find((issue) => issue.id === id);
}

function getVisibleIssues(filters) {
  const issues = safeReadIssues();
  const search = (filters.search || '').trim().toLowerCase();
  const category = filters.category || 'all';
  const status = filters.status || 'all';
  const priority = filters.priority || 'all';

  let result = issues.filter((issue) => {
    const matchesSearch = !search || [issue.title, issue.id, issue.category, issue.area].some((value) =>
      (value || '').toLowerCase().includes(search)
    );
    const matchesCategory = category === 'all' || issue.category === category;
    const matchesStatus = status === 'all' || issue.status === status;
    const matchesPriority = priority === 'all' || issue.priority === priority;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  if (filters.sort === 'oldest') {
    result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (filters.sort === 'upvotes') {
    result = [...result].sort((a, b) => Number(b.upvotes) - Number(a.upvotes));
  } else {
    result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
}

function getDemoCitizenReports() {
  return safeReadIssues().filter((issue) => issue.reportedBy === 'Demo Citizen');
}

function renderIssueCard(issue) {
  const statusClass = {
    reported: 'bg-yellow-100 text-yellow-800',
    'under-review': 'bg-sky-100 text-sky-800',
    'in-progress': 'bg-indigo-100 text-indigo-800',
    resolved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-rose-100 text-rose-800'
  };

  const priorityClass = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  };

  return `
    <article class="issue-card bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">${issue.id}</p>
          <h3 class="mt-2 text-xl font-bold text-gray-900">${issue.title}</h3>
        </div>
        <button
          type="button"
          data-action="upvote"
          data-id="${issue.id}"
          class="bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 border border-blue-100 shadow-sm"
        >
          ▲ ${issue.upvotes}
        </button>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass[issue.status] || 'bg-gray-100 text-gray-700'}">${issue.status}</span>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${priorityClass[issue.priority] || 'bg-gray-100 text-gray-700'}">${issue.priority}</span>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">${issue.category}</span>
      </div>

      <div class="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold">📍</span>
        <span>${issue.area}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-gray-700">${issue.description}</p>

      <div class="mt-5 flex justify-between items-center text-sm text-gray-500">
        <span>Reported by <span class="font-semibold text-gray-700">${issue.reportedBy}</span></span>
        <a href="issue-details.html?id=${issue.id}" class="font-semibold text-blue-600 hover:text-blue-700">View details</a>
      </div>
    </article>
  `;
}

function renderIssuesPage() {
  const container = document.getElementById('issuesContainer');
  const count = document.getElementById('issueCount');
  const emptyState = document.getElementById('emptyState');

  if (!container) return;

  const filters = {
    search: document.getElementById('searchInput') ? document.getElementById('searchInput').value : '',
    category: document.getElementById('categoryFilter') ? document.getElementById('categoryFilter').value : 'all',
    status: document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'all',
    priority: document.getElementById('priorityFilter') ? document.getElementById('priorityFilter').value : 'all',
    sort: document.getElementById('sortFilter') ? document.getElementById('sortFilter').value : 'newest'
  };

  const issues = getVisibleIssues(filters);
  container.innerHTML = issues.map(renderIssueCard).join('');

  if (count) {
    count.textContent = `${issues.length} issue${issues.length === 1 ? '' : 's'}`;
  }

  if (emptyState) {
    emptyState.classList.toggle('hidden', issues.length > 0);
  }
}

function renderMyReportsPage() {
  const container = document.getElementById('myReportsContainer');
  const empty = document.getElementById('myReportsEmpty');

  if (!container) return;

  const reports = getDemoCitizenReports();
  container.innerHTML = reports.length
    ? reports.map((issue) => `
        <article class="report-card bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">${issue.id}</p>
              <h3 class="text-xl font-black text-gray-900">${issue.title}</h3>
            </div>
            <span class="inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${
              issue.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
              issue.status === 'in-progress' ? 'bg-indigo-100 text-indigo-800' :
              'bg-amber-100 text-amber-800'
            }">${issue.status}</span>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span class="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">${issue.area}</span>
            <span class="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">${issue.category}</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span class="font-medium text-gray-600">Priority: ${issue.priority}</span>
            <a href="issue-details.html?id=${issue.id}" class="font-semibold text-blue-600 hover:text-blue-700">Open issue</a>
          </div>
        </article>
      `).join('')
    : '';

  if (empty) {
    empty.classList.toggle('hidden', reports.length > 0);
  }
}

function resetFilters() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const sortFilter = document.getElementById('sortFilter');

  if (searchInput) searchInput.value = '';
  if (categoryFilter) categoryFilter.value = 'all';
  if (statusFilter) statusFilter.value = 'all';
  if (priorityFilter) priorityFilter.value = 'all';
  if (sortFilter) sortFilter.value = 'newest';
  renderIssuesPage();
}

function upvoteIssue(issueId) {
  const issues = safeReadIssues();
  const index = issues.findIndex((issue) => issue.id === issueId);

  if (index >= 0) {
    issues[index].upvotes += 1;
    writeIssues(issues);
    renderIssuesPage();
  }
}

window.fixMyArea = {
  getIssues: safeReadIssues,
  getVisibleIssues,
  getDemoCitizenReports,
  renderIssuesPage,
  renderMyReportsPage,
  resetFilters,
  upvoteIssue
};

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('issuesContainer')) {
    renderIssuesPage();
  }

  if (document.getElementById('myReportsContainer')) {
    renderMyReportsPage();
  }
});

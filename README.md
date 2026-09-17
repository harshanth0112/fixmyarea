# FixMyArea — Civic Issue Reporting & Progress Tracker

> **"Small reports. Better neighborhoods."**

FixMyArea is a community-first civic technology platform designed to make local neighborhood problems easier to discover, report, and track toward resolution.

The user interface and design system are inspired by the clean, editorial, and knowledge-base aesthetic of modern documentation platforms (such as the **Ellipsus Help Center**), built entirely with vanilla web technologies.

---

## 🚀 Technologies Used
- **HTML5**: Semantic page architecture
- **Tailwind CSS (via CDN)**: Custom design system tokens, responsive utilities, and clean layouts
- **Vanilla JavaScript (ES Modules)**: In-memory simulation, layout rendering, and interactive state management
- **Zero Backend / Zero Database**: 100% client-side frontend demo with no dependencies on `localStorage`, `sessionStorage`, or external APIs.

---

## 📁 Repository Structure

```text
FixMyArea/
│
├── index.html              # Home overview, prominent search & category explorer
├── report.html             # Issue submission form & review state
├── issues.html             # Community issue directory with search & filters
├── issue-details.html      # Individual issue view with 4-stage status timeline
├── how-it-works.html       # 4-step workflow guide
├── about.html              # Mission, community values, and project background
├── contact.html            # Simulated contact inquiry form
├── login.html              # Role-based login (Citizen User, Admin, Guest)
├── user.html               # Citizen profile & submitted report tracker
│
├── js/
│   ├── layout.js           # Shared header, navigation, footer & UI card helpers
│   ├── main.js             # Homepage search & category initialization
│   ├── data.js             # In-memory mock issue dataset (12 civic issues)
│   ├── report.js           # Issue reporting form validation & simulation
│   └── issue-details.js    # Issue details loader & status progress timeline
│
├── pages/                  # Developer workspaces
│   ├── dev1/               # Dev 1: Home & Dashboard
│   ├── dev2/               # Dev 2: Report & Details
│   ├── dev3/               # Dev 3: Explore Issues & My Reports
│   └── dev4/               # Dev 4: Admin Panel & Data Management
│       └── admin.html
│
├── shared/
│   ├── constants.js        # Shared color palette, Tailwind classes & tokens
│   └── storage-contract.js # Unified in-memory issue state contract
│
└── docs/
    ├── layout.md           # Architecture design foundation & team roles
    └── TEAM_RULES.md       # Team workflow & collaboration guidelines
```

---

## 👥 Team Work Distribution

| Developer | Module / Responsibility | Primary Files |
| :--- | :--- | :--- |
| **Developer 1** | Home Page & Dashboard Visuals | `pages/dev1/home.html`, `dashboard.html` |
| **Developer 2** | Issue Reporting Module & Form Validation | `pages/dev2/report.html`, `issue-details.html` |
| **Developer 3** | Issue Explorer, Category Filtering & My Reports | `pages/dev3/issues.html`, `my-reports.html` |
| **Developer 4** | Admin Panel, Storage Contract & Supporting Pages | `pages/dev4/admin.html`, `issue-details.html`, `shared/` |

---

## 🌿 Git Branching Workflow

To prevent conflicts and enable concurrent development across all 4 team members:

### Branch Structure
- `main`: Protected production branch.
- `dev/shared-layout`: Shared design system and common header/footer updates (Developer 4).
- `dev/reporting`: Issue submission features (Developer 2).
- `dev/issue-explorer`: Search and filtering features (Developer 3).
- `dev/issue-details`: Admin panel and supporting pages (Developer 4).

### Sample Developer Commands
```bash
# 1. Fetch latest changes
git checkout main
git pull origin main

# 2. Switch to your assigned feature branch
git checkout -b dev/issue-details

# 3. Work and commit in focused stages
git add .
git commit -m "feat(dev4): add issue details timeline and supporting pages"

# 4. Push branch to GitHub
git push -u origin dev/issue-details
```

---

## ⚠️ Demonstration Notice
FixMyArea is a **frontend demonstration project**. All issues, statistics, and status updates are simulated and are not transmitted to any government or municipal authority.

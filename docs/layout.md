
# FIXMYAREA — SHARED TEAM DEVELOPMENT FOUNDATION

You are a senior frontend architect and UI/UX engineer.

We are a team of 4 developers building FixMyArea, a civic issue reporting and tracking website.

Our design inspiration is the Ellipsus Help Center:
https://help.ellipsus.com/support/home

We want a very close visual inspiration from the reference, while using our own FixMyArea branding, content, icons, and original implementation.

Your task is to create a SHARED FRONTEND FOUNDATION that allows all four developers to work on the same project without duplicating layouts or conflicting with one another.

DO NOT simply create separate, unrelated HTML pages.

First, build the common architecture, shared layout, and design system. Then organize the project so that each developer can work on an independent feature module.

==================================================
1. STRICT TECHNOLOGY REQUIREMENTS
==================================================

Use ONLY:

- HTML5
- Tailwind CSS via CDN
- Vanilla JavaScript
- Inline SVG icons where required

Do NOT use:

- React
- Vue
- Angular
- Node.js
- Backend services
- Databases
- Firebase
- Supabase
- LocalStorage
- SessionStorage
- Cookies for application data
- npm dependencies
- Build tools
- Separate CSS files unless absolutely necessary

The project must run using a static server or by opening HTML files directly in a browser.

Use Tailwind CSS utility classes for styling.

==================================================
2. CORE ARCHITECTURAL RULE
==================================================

Create a shared layout system.

Every page must use the same:

- Header
- FixMyArea logo
- Navigation
- Mobile navigation menu
- Footer
- Typography
- Color palette
- Buttons
- Form styles
- Cards
- Status badges
- Container widths
- Spacing system
- Responsive breakpoints
- Animation style

Do not copy and paste the complete header and footer into every page.

Create a reusable layout.js module that renders the common header and footer into designated HTML containers.

Use semantic HTML and ES modules where practical.

Example:

<body>
  <div id="site-header"></div>

  <main>
    <!-- Page-specific content -->
  </main>

  <div id="site-footer"></div>

  <script type="module" src="js/main.js"></script>
</body>

The header and footer should be initialized by the shared layout system.

Make sure relative paths work correctly across all pages.

==================================================
3. PROJECT STRUCTURE
==================================================

Create this structure:

fixmyarea/
│
├── index.html
├── report.html
├── issues.html
├── issue-details.html
├── how-it-works.html
├── about.html
├── contact.html
│
├── js/
│   ├── layout.js
│   ├── main.js
│   ├── data.js
│   ├── report.js
│   ├── issues.js
│   └── issue-details.js
│
├── assets/
│   ├── icons/
│   └── images/
│
└── README.md

Do not create a separate CSS file.

If the existing project already contains files, inspect them first and preserve useful work where possible.

==================================================
4. SHARED DESIGN SYSTEM
==================================================

Create a consistent design language inspired by the Ellipsus Help Center.

Visual qualities:

- Minimal
- Spacious
- Editorial
- Premium
- Friendly
- Calm
- Professional
- Documentation-inspired
- Community-focused

Suggested palette:

Background: #F7F6F2
Surface: #FFFFFF
Primary text: #202020
Secondary text: #737373
Border: #E7E5E0
Primary accent: #536B4F
Soft accent: #DDE6D8

Use these values consistently through Tailwind classes or a minimal Tailwind CDN configuration.

Typography:

- Use a clean modern font such as Inter or DM Sans.
- Use large editorial-style headings.
- Use readable body text.
- Maintain a consistent typographic scale.

Layout:

- Centered max-width container.
- Generous whitespace.
- Consistent horizontal padding.
- Rounded but restrained cards.
- Thin borders.
- Subtle hover effects.
- Responsive two-column layouts where appropriate.

Do not create a generic admin dashboard.

Do not use excessive gradients, neon colors, or excessive shadows.

==================================================
5. SHARED LAYOUT IMPLEMENTATION
==================================================

Create js/layout.js.

This file must be responsible for:

1. Rendering the common header.
2. Rendering the common footer.
3. Highlighting the active navigation link.
4. Rendering the mobile menu.
5. Supporting mobile menu open/close behavior.
6. Managing accessibility attributes.
7. Supporting consistent navigation across pages.

HEADER:

Left:
- FixMyArea logo.
- Minimal location-pin/checkmark SVG icon.
- Brand name.

Navigation:
- Home
- Explore Issues
- How It Works
- About
- Contact

Primary action:
- Report an Issue

Mobile:
- Hamburger menu.
- Accessible menu button.
- aria-expanded.
- Keyboard-friendly navigation.
- Close menu when a navigation link is selected.

FOOTER:

Include:
- FixMyArea logo.
- Short project description.
- Useful links.
- Explore Issues.
- How It Works.
- About.
- Contact.
- Demo disclaimer.

Use this disclaimer:

"FixMyArea is a frontend-only demonstration. Reports and updates are simulated and are not submitted to any government authority."

The layout must not contain fake government affiliations.

==================================================
6. SHARED UI COMPONENTS
==================================================

Create reusable JavaScript helper functions where practical.

Examples:

- createStatusBadge(status)
- createIssueCard(issue)
- createCategoryCard(category)
- createButton(label, options)
- escapeHTML(value)
- formatDate(date)
- getStatusClass(status)

Do not overengineer the project.

Keep the functions beginner-friendly and easy for all developers to understand.

If a reusable component requires complex abstractions, prefer a simple helper function.

All dynamic text must be safely escaped before being inserted as HTML.

==================================================
7. SHARED DATA MODULE
==================================================

Create js/data.js.

Export a temporary mock issue dataset containing at least 12 fictional issues.

Each issue should include:

- id
- title
- category
- area
- landmark
- description
- status
- urgency
- dateReported
- lastUpdated
- progress

Use fictional locations and clearly simulated reports.

Do not use localStorage.

Do not use sessionStorage.

Do not use APIs or databases.

Export reusable data and helper functions.

Example:

export const issues = [
  {
    id: "ISSUE-001",
    title: "Large pothole near the junction",
    category: "Road & Potholes",
    area: "Sample Nagar",
    status: "Reported",
    urgency: "High",
    dateReported: "2026-09-10",
    description: "A fictional example report for demonstration."
  }
];

All developers must import shared data instead of creating conflicting copies.

==================================================
8. PAGE PLACEHOLDERS
==================================================

Create all required HTML pages with the shared layout already connected.

Every page must include:

- Common header placeholder.
- Main content container.
- Common footer placeholder.
- Tailwind CSS CDN.
- Shared JavaScript module.
- Page-specific JavaScript only when needed.

Create basic but polished placeholder content for:

1. index.html
   Homepage with hero and search placeholder.

2. report.html
   Report submission placeholder.

3. issues.html
   Issue explorer placeholder.

4. issue-details.html
   Issue details placeholder.

5. how-it-works.html
   Step-by-step guide placeholder.

6. about.html
   About FixMyArea placeholder.

7. contact.html
   Contact form placeholder.

Do not build a separate design system for each page.

==================================================
9. RESPONSIVE DESIGN
==================================================

Support:

- Mobile: 320px and above.
- Tablet: 768px and above.
- Desktop: 1024px and above.
- Large desktop: 1280px and above.

Requirements:

- No horizontal overflow.
- Responsive navigation.
- Mobile-friendly buttons.
- Responsive cards.
- Consistent spacing.
- Readable text.
- Properly stacked layouts.

==================================================
10. TEAM COLLABORATION STRUCTURE
==================================================

Organize the code so four developers can work in parallel.

Developer 1:
SHARED LAYOUT AND DESIGN SYSTEM

Responsibilities:
- layout.js
- Shared header
- Shared footer
- Mobile navigation
- Global UI helpers
- Common visual consistency
- Homepage visual foundation

Developer 2:
REPORTING MODULE

Responsibilities:
- report.html
- report-specific JavaScript
- Report form
- Form validation
- Review screen
- Demo submission state

Developer 3:
ISSUE EXPLORER MODULE

Responsibilities:
- issues.html
- issues-specific JavaScript
- Search
- Filters
- Sort
- Issue cards
- Category filtering

Developer 4:
ISSUE DETAILS AND SUPPORTING PAGES

Responsibilities:
- issue-details.html
- issue-details.js
- how-it-works.html
- about.html
- contact.html
- Issue timeline
- Related issue display
- Supporting-page polish

IMPORTANT COLLABORATION RULES:

- Developer 1 owns the shared layout files.
- Other developers must not independently redesign the header or footer.
- Each developer should work in their own Git branch.
- Do not edit another developer's module without coordination.
- Shared files require team review before changes.
- Use clear commit messages.
- Merge small, focused changes.
- Resolve conflicts by preserving the shared architecture.

==================================================
11. GIT WORKFLOW DOCUMENTATION
==================================================

Add a team workflow section to README.md.

Recommended branches:

main
dev/shared-layout
dev/reporting
dev/issue-explorer
dev/issue-details

Workflow:

1. All developers clone the same repository.
2. Each developer creates their own feature branch.
3. Everyone pulls the latest main branch before starting.
4. Developers work only on their assigned modules.
5. Developers commit small, focused changes.
6. Open a pull request for review.
7. Test the shared layout before merging.
8. Merge completed work into main.

Include example commands:

git clone REPOSITORY_URL
git checkout -b dev/reporting
git add .
git commit -m "feat: add report form"
git push -u origin dev/reporting

Do not create fake repository URLs.

==================================================
12. ACCESSIBILITY
==================================================

Implement:

- Semantic HTML5.
- Proper heading hierarchy.
- Accessible navigation.
- Visible focus states.
- aria-expanded on the mobile menu.
- Labels for all form controls.
- aria-live for dynamic status messages.
- Keyboard accessibility.
- Reduced-motion support.

==================================================
13. QUALITY CHECKS
==================================================

Before finishing:

- Verify every page loads the shared header.
- Verify every page loads the shared footer.
- Verify the mobile menu works.
- Verify navigation links work.
- Verify Tailwind CDN is included.
- Verify JavaScript module paths.
- Verify no localStorage or sessionStorage is used.
- Verify no backend calls are made.
- Verify no console errors.
- Verify responsive layouts.
- Verify there is no horizontal overflow.
- Verify shared components are not duplicated unnecessarily.
- Verify each developer's module can be developed independently.
- Verify README.md documents the team structure.

==================================================
14. FINAL INSTRUCTION
==================================================

Do not merely explain the architecture.

Actually create the shared project foundation and all required files.

Start by inspecting the existing project.

Then implement:

1. Shared layout.
2. Shared design system.
3. Shared mock data.
4. Common navigation and footer.
5. Page placeholders.
6. Team-oriented project structure.
7. README documentation.

The result must be a clean, maintainable, beginner-friendly codebase that all four developers can use as a common starting point.

Do not add backend functionality.

Do not add localStorage.

Do not create separate CSS files.

Do not duplicate the shared layout across pages.
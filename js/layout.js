/**
 * FixMyArea - Shared Layout & UI Component System
 * Implements the Ellipsus Help Center-inspired visual design language.
 * Provides the shared header, mobile menu, footer, and reusable UI card helpers.
 */

// Helper: Escape HTML to avoid injection
export function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper: Format Date string
export function formatDate(dateString) {
  if (!dateString) return "Pending";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch (e) {
    return dateString;
  }
}

// Status Badges with Ellipsus-inspired calm styling
export function getStatusClass(status) {
  switch ((status || "").toLowerCase()) {
    case "reported":
      return "bg-[#F0EFEB] text-[#555] border-[#DEDBD5]";
    case "under review":
      return "bg-[#FEF5E7] text-[#9A6218] border-[#FCD9A5]";
    case "in progress":
      return "bg-[#EBF3FC] text-[#1E56A0] border-[#BFD9F8]";
    case "resolved":
      return "bg-[#EBF5EA] text-[#2D6A28] border-[#C3E4BF]";
    default:
      return "bg-[#F0EFEB] text-[#555] border-[#DEDBD5]";
  }
}

export function createStatusBadge(status) {
  const cls = getStatusClass(status);
  return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}">
    <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-70"></span>
    ${escapeHTML(status)}
  </span>`;
}

export function getUrgencyBadge(urgency) {
  const u = (urgency || "").toLowerCase();
  let cls = "text-[#666]";
  if (u === "high") cls = "text-[#C2410C] font-semibold";
  if (u === "medium") cls = "text-[#854D0E]";
  return `<span class="text-xs ${cls}">${escapeHTML(urgency)} Priority</span>`;
}

// Global Reusable Toast / Pop-up Notification Helper
export function showNotification(title, message, type = "success") {
  let popupContainer = document.getElementById("global-notification-toast");
  if (!popupContainer) {
    popupContainer = document.createElement("div");
    popupContainer.id = "global-notification-toast";
    popupContainer.className = "fixed top-6 right-6 z-50 max-w-sm w-full transition-all duration-300 transform translate-y-0 opacity-100";
    document.body.appendChild(popupContainer);
  }

  const isSuccess = type === "success";
  const iconSvg = isSuccess
    ? `<svg class="w-5 h-5 text-[#2D6A28]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`
    : `<svg class="w-5 h-5 text-[#B45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;

  popupContainer.innerHTML = `
    <div class="bg-white border ${isSuccess ? 'border-[#C3E4BF]' : 'border-[#FCD9A5]'} rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-start gap-3.5 animate-bounce-short">
      <div class="w-9 h-9 rounded-xl ${isSuccess ? 'bg-[#EBF5EA]' : 'bg-[#FEF3C7]'} flex items-center justify-center shrink-0 mt-0.5">
        ${iconSvg}
      </div>
      <div class="flex-grow">
        <h4 class="text-sm font-bold text-[#202020]">${escapeHTML(title)}</h4>
        <p class="text-xs text-[#555] mt-0.5 leading-relaxed">${escapeHTML(message)}</p>
      </div>
      <button onclick="this.closest('#global-notification-toast').remove()" class="text-[#888] hover:text-[#202020] p-1 rounded-md">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  `;

  clearTimeout(window._notifTimeout);
  window._notifTimeout = setTimeout(() => {
    if (popupContainer) {
      popupContainer.remove();
    }
  }, 4500);
}

// Helper: Logo SVG
function getLogoSVG() {
  return `<svg class="w-6 h-6 text-[#536B4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <polyline points="9 10 12 13 16 8"></polyline>
  </svg>`;
}

/**
 * Initialize Shared Navigation Header & Footer
 * @param {string} activePage - The current page identifier ('home', 'issues', 'report', 'how-it-works', 'about', 'contact')
 */
export function initLayout(activePage = "") {
  const headerContainer = document.getElementById("site-header");
  const footerContainer = document.getElementById("site-footer");

  // Determine path prefix based on whether page is nested in pages/ or at root
  const isNested = window.location.pathname.includes("/pages/");
  const rootPrefix = isNested ? "../../" : "";

  const navLinks = [
    { id: "home", label: "Home", href: `${rootPrefix}index.html` },
    { id: "issues", label: "Explore Issues", href: `${rootPrefix}issues.html` },
    { id: "how-it-works", label: "How It Works", href: `${rootPrefix}how-it-works.html` },
    { id: "about", label: "About", href: `${rootPrefix}about.html` },
    { id: "contact", label: "Contact", href: `${rootPrefix}contact.html` }
  ];

  let currentAuth = null;
  try {
    const savedAuth = sessionStorage.getItem("fixmyarea_auth_role");
    currentAuth = savedAuth ? JSON.parse(savedAuth) : null;
  } catch (e) {
    currentAuth = null;
  }

  const userProfileHref = currentAuth && currentAuth.role === "admin"
    ? `${rootPrefix}pages/dev4/admin.html`
    : currentAuth && currentAuth.role === "user"
      ? `${rootPrefix}user.html`
      : `${rootPrefix}login.html`;

  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="sticky top-0 z-40 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E7E5E0] transition-colors">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Brand Logo -->
            <a href="${rootPrefix}index.html" class="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#536B4F] rounded-lg p-1">
              <div class="p-1.5 rounded-lg bg-[#DDE6D8] transition-transform group-hover:scale-105">
                ${getLogoSVG()}
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-semibold tracking-tight text-[#202020]">FixMyArea</span>
                <span class="text-[10px] text-[#737373] tracking-wider uppercase font-medium -mt-1">Civic Reporter</span>
              </div>
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-1">
              ${navLinks.map(link => {
                const isActive = activePage === link.id;
                return `
                  <a href="${link.href}" 
                     class="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                       isActive
                         ? "bg-[#E7E5E0] text-[#202020]"
                         : "text-[#555] hover:text-[#202020] hover:bg-[#EFECE6]"
                     }">
                    ${link.label}
                  </a>
                `;
              }).join("")}
            </nav>

            <!-- Right Side Controls: User Logo & Report CTA -->
            <div class="hidden md:flex items-center gap-3">
              <a href="${rootPrefix}report.html" 
                 class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#536B4F] hover:bg-[#435740] active:scale-[0.98] rounded-full shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#536B4F] focus-visible:ring-offset-2">
                <svg class="w-4 h-4 mr-1.5 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Report an Issue
              </a>

              <!-- User Profile Logo in Right Top Corner -->
              <div class="relative">
                <a href="${userProfileHref}" 
                   title="User Profile & Login" 
                   aria-label="User Account" 
                   class="w-10 h-10 rounded-full bg-[#EFECE6] border border-[#E0DCD4] hover:border-[#536B4F] text-[#555] hover:text-[#202020] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#536B4F]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Mobile Hamburger Button -->
            <div class="flex md:hidden">
              <button id="mobile-menu-btn" 
                      type="button" 
                      aria-expanded="false" 
                      aria-label="Toggle navigation menu"
                      class="p-2 rounded-lg text-[#555] hover:text-[#202020] hover:bg-[#EFECE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#536B4F]">
                <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Collapsible Menu -->
        <div id="mobile-menu" class="hidden md:hidden border-b border-[#E7E5E0] bg-[#F7F6F2] px-4 pt-2 pb-5 space-y-1">
          ${navLinks.map(link => {
            const isActive = activePage === link.id;
            return `
              <a href="${link.href}" 
                 class="block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                   isActive
                     ? "bg-[#E7E5E0] text-[#202020]"
                     : "text-[#555] hover:text-[#202020] hover:bg-[#EFECE6]"
                 }">
                ${link.label}
              </a>
            `;
          }).join("")}
          <div class="pt-3 border-t border-[#E7E5E0] mt-2 space-y-2">
            <a href="${rootPrefix}report.html" 
               class="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#536B4F] hover:bg-[#435740] rounded-full shadow-sm">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Report an Issue
            </a>
            <a href="${userProfileHref}" 
               class="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-[#202020] bg-white border border-[#E7E5E0] hover:bg-[#EFECE6] rounded-full shadow-sm">
              <svg class="w-4 h-4 mr-1.5 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              Sign In / Account
            </a>
          </div>
        </div>
      </header>
    `;

    // Mobile Menu Interaction
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!isExpanded));
        mobileMenu.classList.toggle("hidden");
        hamburgerIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
      });
    }
  }

  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="bg-[#F2EFE9] border-t border-[#E7E5E0] mt-auto">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <!-- Brand Column -->
            <div class="md:col-span-2 space-y-3">
              <div class="flex items-center gap-2">
                <div class="p-1 rounded-md bg-[#DDE6D8]">
                  ${getLogoSVG()}
                </div>
                <span class="text-lg font-semibold text-[#202020]">FixMyArea</span>
              </div>
              <p class="text-sm text-[#737373] max-w-sm leading-relaxed">
                Small reports. Better neighborhoods. A clean, community-led civic reporting concept inspired by modern knowledge-base interfaces.
              </p>
              <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-[#E8E5DD] text-xs text-[#555]">
                <span>Frontend Demonstration Project</span>
              </div>
            </div>

            <!-- Quick Navigation -->
            <div>
              <h4 class="text-xs font-semibold uppercase tracking-wider text-[#202020] mb-3">Platform</h4>
              <ul class="space-y-2 text-sm text-[#737373]">
                <li><a href="${rootPrefix}index.html" class="hover:text-[#202020] transition-colors">Home Overview</a></li>
                <li><a href="${rootPrefix}issues.html" class="hover:text-[#202020] transition-colors">Explore Issues</a></li>
                <li><a href="${rootPrefix}report.html" class="hover:text-[#202020] transition-colors">Report an Issue</a></li>
                <li><a href="${rootPrefix}how-it-works.html" class="hover:text-[#202020] transition-colors">How It Works</a></li>
              </ul>
            </div>

            <!-- About & Contact -->
            <div>
              <h4 class="text-xs font-semibold uppercase tracking-wider text-[#202020] mb-3">About & Help</h4>
              <ul class="space-y-2 text-sm text-[#737373]">
                <li><a href="${rootPrefix}about.html" class="hover:text-[#202020] transition-colors">Project Mission</a></li>
                <li><a href="${rootPrefix}contact.html" class="hover:text-[#202020] transition-colors">Contact Team</a></li>
                <li><a href="${rootPrefix}user.html" class="hover:text-[#202020] transition-colors">Citizen Profile (User)</a></li>
                <li><a href="${rootPrefix}pages/dev4/admin.html" class="hover:text-[#202020] transition-colors font-medium text-[#536B4F]">Admin Panel</a></li>
                <li><a href="${rootPrefix}docs/layout.md" class="hover:text-[#202020] transition-colors">Design Docs</a></li>
              </ul>
            </div>
          </div>

          <!-- Bottom Disclaimer -->
          <div class="pt-8 border-t border-[#E0DCD4] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
            <p>
              &copy; ${new Date().getFullYear()} FixMyArea. Frontend demonstration only. Reports and updates are simulated and not submitted to any government authority.
            </p>
            <div class="flex items-center gap-4">
              <span class="inline-block w-2 h-2 rounded-full bg-[#536B4F]"></span>
              <span>100% Client-Side Simulation</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

/**
 * Shared UI Component: Issue Card
 */
export function createIssueCard(issue, rootPrefix = "") {
  return `
    <article class="group bg-white border border-[#E7E5E0] rounded-xl p-5 hover:border-[#D1CECA] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-2.5">
          <span class="text-xs font-mono font-medium text-[#888] tracking-wider">${escapeHTML(issue.id)}</span>
          ${createStatusBadge(issue.status)}
        </div>
        <h3 class="text-base font-semibold text-[#202020] group-hover:text-[#536B4F] transition-colors line-clamp-1 mb-1.5">
          <a href="${rootPrefix}issue-details.html?id=${encodeURIComponent(issue.id)}" class="focus:outline-none focus:underline">
            ${escapeHTML(issue.title)}
          </a>
        </h3>
        <p class="text-sm text-[#737373] line-clamp-2 mb-4 leading-relaxed">
          ${escapeHTML(issue.description)}
        </p>
      </div>

      <div class="pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#737373]">
        <div class="flex items-center gap-1.5 truncate">
          <svg class="w-3.5 h-3.5 text-[#888] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span class="truncate font-medium text-[#555]">${escapeHTML(issue.area)}</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span>${formatDate(issue.dateReported)}</span>
          <a href="${rootPrefix}issue-details.html?id=${encodeURIComponent(issue.id)}" class="text-[#536B4F] font-medium hover:underline inline-flex items-center">
            View &rarr;
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Shared UI Component: Category Card
 */
export function createCategoryCard(cat, rootPrefix = "") {
  return `
    <a href="${rootPrefix}issues.html?category=${encodeURIComponent(cat.id)}" 
       class="group bg-white border border-[#E7E5E0] rounded-xl p-5 hover:border-[#536B4F]/40 hover:shadow-[0_4px_16px_rgba(83,107,79,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between">
      <div>
        <div class="w-10 h-10 rounded-lg bg-[#F7F6F2] border border-[#E7E5E0] text-[#536B4F] flex items-center justify-center mb-3.5 group-hover:bg-[#DDE6D8] transition-colors">
          ${cat.icon}
        </div>
        <h3 class="text-base font-semibold text-[#202020] mb-1 group-hover:text-[#536B4F] transition-colors">
          ${escapeHTML(cat.name)}
        </h3>
        <p class="text-xs text-[#737373] leading-relaxed mb-4">
          ${escapeHTML(cat.description)}
        </p>
      </div>
      <div class="flex items-center justify-between text-xs font-medium text-[#737373] pt-3 border-t border-[#F2EFE9]">
        <span>${cat.count} Reports</span>
        <span class="text-[#536B4F] group-hover:translate-x-0.5 transition-transform">&rarr;</span>
      </div>
    </a>
  `;
}

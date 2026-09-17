import { initLayout, createIssueCard, createCategoryCard } from './layout.js';
import { issues, categories } from './data.js';

document.addEventListener("DOMContentLoaded", () => {
  // Initialize shared navigation & footer for 'home'
  initLayout("home");

  // Populate Categories
  const categoryGrid = document.getElementById("category-grid");
  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(cat => createCategoryCard(cat)).join("");
  }

  // Populate Recent Reports (Take first 4)
  const recentGrid = document.getElementById("recent-issues-grid");
  if (recentGrid) {
    recentGrid.innerHTML = issues.slice(0, 4).map(issue => createIssueCard(issue)).join("");
  }

  // Search Interaction
  const searchInput = document.getElementById("home-search-input");
  const searchDropdown = document.getElementById("search-results-dropdown");
  const clearBtn = document.getElementById("clear-search-btn");

  if (searchInput && searchDropdown) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      
      if (clearBtn) {
        if (q.length > 0) clearBtn.classList.remove("hidden");
        else clearBtn.classList.add("hidden");
      }

      if (q.length < 2) {
        searchDropdown.classList.add("hidden");
        searchDropdown.innerHTML = "";
        return;
      }

      const matches = issues.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.area.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div class="p-4 text-center text-sm text-[#737373]">
            Nothing found. Try a different keyword like <em>pothole</em> or <em>streetlight</em>.
          </div>
        `;
      } else {
        searchDropdown.innerHTML = `
          <div class="py-2">
            <div class="px-4 py-1.5 text-[11px] font-semibold text-[#888] uppercase tracking-wider">Matching Issues</div>
            ${matches.map(m => `
              <a href="issue-details.html?id=${encodeURIComponent(m.id)}" 
                 class="flex items-center justify-between px-4 py-2.5 hover:bg-[#F7F6F2] transition-colors border-b border-[#F2EFE9] last:border-0">
                <div>
                  <div class="text-sm font-medium text-[#202020]">${m.title}</div>
                  <div class="text-xs text-[#737373]">${m.area} &bull; ${m.category}</div>
                </div>
                <span class="text-xs font-mono text-[#888] bg-[#EFECE6] px-2 py-0.5 rounded">${m.id}</span>
              </a>
            `).join("")}
          </div>
        `;
      }
      searchDropdown.classList.remove("hidden");
    });

    // Clear search
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearBtn.classList.add("hidden");
        searchDropdown.classList.add("hidden");
        searchInput.focus();
      });
    }

    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add("hidden");
      }
    });
  }
});

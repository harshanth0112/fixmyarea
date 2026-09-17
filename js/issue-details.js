import { initLayout, escapeHTML, formatDate, createStatusBadge, createIssueCard, showNotification } from './layout.js';
import { issues, getIssueById } from './data.js';

document.addEventListener("DOMContentLoaded", () => {
  initLayout("issues");

  const urlParams = new URLSearchParams(window.location.search);
  const issueId = urlParams.get("id");

  const mainContent = document.getElementById("issue-details-content");
  const notFoundSection = document.getElementById("issue-not-found");
  const relatedGrid = document.getElementById("related-issues-grid");

  if (!issueId) {
    showNotFound("No issue ID specified in the URL.");
    return;
  }

  const issue = getIssueById(issueId);

  if (!issue) {
    showNotFound(`Issue "${issueId}" was not found.`);
    return;
  }

  // Render issue details
  document.getElementById("issue-id").textContent = issue.id;
  document.getElementById("issue-title").textContent = issue.title;
  document.getElementById("issue-status-badge").innerHTML = createStatusBadge(issue.status);
  document.getElementById("issue-category").textContent = issue.category;
  document.getElementById("issue-area").textContent = issue.area;
  document.getElementById("issue-landmark").textContent = issue.landmark || "Not specified";
  document.getElementById("issue-date").textContent = formatDate(issue.dateReported);
  document.getElementById("issue-description").textContent = issue.description;
  document.getElementById("issue-urgency").textContent = issue.urgency + " Priority";

  // Render Timeline
  const timelineContainer = document.getElementById("status-timeline");
  if (timelineContainer && issue.progress) {
    timelineContainer.innerHTML = issue.progress.map((step, idx) => {
      const isCompleted = step.completed;
      const isLast = idx === issue.progress.length - 1;

      return `
        <div class="relative flex items-start gap-4 ${isLast ? '' : 'pb-6'}">
          <!-- Line connector -->
          ${!isLast ? `<div class="absolute top-5 left-3 -ml-[1px] w-0.5 h-full ${isCompleted ? 'bg-[#536B4F]' : 'bg-[#E7E5E0]'}"></div>` : ''}
          
          <!-- Circle Marker -->
          <div class="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
            isCompleted ? 'bg-[#536B4F] text-white' : 'bg-[#F7F6F2] border-2 border-[#E7E5E0] text-transparent'
          }">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>

          <!-- Step Info -->
          <div class="flex-grow pt-0.5">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold ${isCompleted ? 'text-[#202020]' : 'text-[#888]'}">${escapeHTML(step.label)}</span>
              <span class="text-xs text-[#888] font-mono">${step.date ? formatDate(step.date) : 'Pending'}</span>
            </div>
            <p class="text-xs text-[#737373] mt-0.5">
              ${isCompleted ? 'Stage completed and logged in community timeline.' : 'Awaiting administrative update.'}
            </p>
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Related Issues
  if (relatedGrid) {
    const related = issues
      .filter(item => item.id !== issue.id && item.category === issue.category)
      .slice(0, 2);

    if (related.length > 0) {
      relatedGrid.innerHTML = related.map(rel => createIssueCard(rel)).join("");
    } else {
      // If no related in category, show any 2 recent
      const fallback = issues.filter(item => item.id !== issue.id).slice(0, 2);
      relatedGrid.innerHTML = fallback.map(rel => createIssueCard(rel)).join("");
    }
  }

  // Upvote & Action Alerts
  const upvoteBtn = document.getElementById("detail-upvote-btn");
  const upvoteCount = document.getElementById("detail-upvote-count");
  const copyBtn = document.getElementById("detail-copy-link-btn");

  let upvoted = false;
  let count = 12;

  if (upvoteBtn && upvoteCount) {
    upvoteBtn.addEventListener("click", () => {
      if (!upvoted) {
        count++;
        upvoted = true;
        upvoteCount.textContent = count;
        upvoteBtn.classList.add("bg-[#DDE6D8]", "text-[#2D6A28]", "border-[#C3E4BF]");
        showNotification("Upvoted!", "Your upvote for this issue has been recorded.", "success");
      } else {
        count--;
        upvoted = false;
        upvoteCount.textContent = count;
        upvoteBtn.classList.remove("bg-[#DDE6D8]", "text-[#2D6A28]", "border-[#C3E4BF]");
        showNotification("Upvote Removed", "Your upvote has been cancelled.", "warning");
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard?.writeText(window.location.href);
      showNotification("Link Copied!", "Direct link to this issue has been copied to your clipboard.", "success");
    });
  }

  function showNotFound(message) {
    if (mainContent) mainContent.classList.add("hidden");
    if (notFoundSection) {
      notFoundSection.classList.remove("hidden");
      const msgEl = document.getElementById("not-found-message");
      if (msgEl) msgEl.textContent = message;
    }
  }
});

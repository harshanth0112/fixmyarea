document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const sortFilter = document.getElementById('sortFilter');

  const applyFilters = () => {
    if (window.fixMyArea && typeof window.fixMyArea.renderIssuesPage === 'function') {
      window.fixMyArea.renderIssuesPage();
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  [categoryFilter, statusFilter, priorityFilter, sortFilter].forEach((element) => {
    if (element) {
      element.addEventListener('change', applyFilters);
    }
  });

  const issueContainer = document.getElementById('issuesContainer');
  if (issueContainer) {
    issueContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="upvote"]');
      if (!button) return;
      const issueId = button.dataset.id;
      if (window.fixMyArea && typeof window.fixMyArea.upvoteIssue === 'function') {
        window.fixMyArea.upvoteIssue(issueId);
      }
    });
  }

  const resetButton = document.querySelector('[data-reset-filters]');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (window.fixMyArea && typeof window.fixMyArea.resetFilters === 'function') {
        window.fixMyArea.resetFilters();
      }
    });
  }

  if (window.fixMyArea && typeof window.fixMyArea.renderIssuesPage === 'function') {
    window.fixMyArea.renderIssuesPage();
  }
});

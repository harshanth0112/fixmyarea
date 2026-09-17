document.addEventListener('DOMContentLoaded', () => {
  if (window.fixMyArea && typeof window.fixMyArea.renderMyReportsPage === 'function') {
    window.fixMyArea.renderMyReportsPage();
  }
});

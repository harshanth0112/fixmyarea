import { initLayout } from './layout.js';

document.addEventListener("DOMContentLoaded", () => {
  initLayout("report");

  const form = document.getElementById("issue-report-form");
  const successState = document.getElementById("report-success-state");
  const formSection = document.getElementById("form-section");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Form validation
      const title = document.getElementById("title").value.trim();
      const category = document.getElementById("category").value;
      const area = document.getElementById("area").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!title || !category || !area || !description) {
        alert("Please complete all required fields.");
        return;
      }

      // Generate in-memory temporary demo ID
      const demoId = "ISSUE-" + Math.floor(100 + Math.random() * 900);
      document.getElementById("demo-issue-id").textContent = demoId;

      // Show success state
      if (formSection && successState) {
        formSection.classList.add("hidden");
        successState.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
});

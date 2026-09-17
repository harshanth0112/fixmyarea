/**
 * Developer 4 - Admin Panel Controller
 * Handles administrative actions:
 * - Real-time statistics overview
 * - Filter & search reports table
 * - Updating issue status (Reported -> Under Review -> In Progress -> Resolved)
 * - Timeline status history updates
 */

import { initLayout, escapeHTML, formatDate, createStatusBadge, showNotification } from '../layout.js';
import { storage } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
  // Initialize shared layout
  initLayout("admin");

  const statsContainer = document.getElementById("admin-stats");
  const tableBody = document.getElementById("admin-issues-table-body");
  const searchInput = document.getElementById("admin-search");
  const statusFilter = document.getElementById("admin-status-filter");
  const categoryFilter = document.getElementById("admin-category-filter");
  const updateModal = document.getElementById("status-update-modal");
  const modalIssueId = document.getElementById("modal-issue-id");
  const modalIssueTitle = document.getElementById("modal-issue-title");
  const modalNewStatus = document.getElementById("modal-new-status");
  const modalNote = document.getElementById("modal-note");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const modalSaveBtn = document.getElementById("modal-save-btn");

  // Edit Modal refs
  const editModal = document.getElementById("edit-issue-modal");
  const editModalClose = document.getElementById("edit-modal-close");
  const editModalCancel = document.getElementById("edit-modal-cancel");
  const editIssueForm = document.getElementById("admin-edit-issue-form");
  const editIssueId = document.getElementById("edit-issue-id-display");

  // Confirm Delete Modal refs
  const deleteModal = document.getElementById("delete-confirm-modal");
  const deleteModalCancel = document.getElementById("delete-modal-cancel");
  const deleteModalClose = document.getElementById("delete-modal-close");
  const deleteModalConfirm = document.getElementById("delete-modal-confirm");
  const deleteModalTitle = document.getElementById("delete-modal-issue-title");

  let currentDeleteId = null;

  let currentSelectedIssueId = null;

  // Render Stats Cards
  function renderStats() {
    if (!statsContainer) return;
    const stats = storage.getStats();

    statsContainer.innerHTML = `
      <div class="bg-white border border-[#E7E5E0] rounded-xl p-4">
        <div class="text-xs font-semibold uppercase text-[#737373] mb-1">Total Issues</div>
        <div class="text-2xl font-bold text-[#202020]">${stats.total}</div>
      </div>
      <div class="bg-white border border-[#E7E5E0] rounded-xl p-4">
        <div class="text-xs font-semibold uppercase text-[#737373] mb-1">Reported</div>
        <div class="text-2xl font-bold text-[#555]">${stats.reported}</div>
      </div>
      <div class="bg-white border border-[#E7E5E0] rounded-xl p-4">
        <div class="text-xs font-semibold uppercase text-[#9A6218] mb-1">Under Review</div>
        <div class="text-2xl font-bold text-[#9A6218]">${stats.underReview}</div>
      </div>
      <div class="bg-white border border-[#E7E5E0] rounded-xl p-4">
        <div class="text-xs font-semibold uppercase text-[#1E56A0] mb-1">In Progress</div>
        <div class="text-2xl font-bold text-[#1E56A0]">${stats.inProgress}</div>
      </div>
      <div class="bg-white border border-[#E7E5E0] rounded-xl p-4">
        <div class="text-xs font-semibold uppercase text-[#2D6A28] mb-1">Resolved</div>
        <div class="text-2xl font-bold text-[#2D6A28]">${stats.resolved}</div>
      </div>
    `;
  }

  // Render Admin Issues Table
  function renderTable() {
    if (!tableBody) return;
    const query = searchInput ? searchInput.value : "";
    const status = statusFilter ? statusFilter.value : "all";
    const category = categoryFilter ? categoryFilter.value : "all";

    const filtered = storage.query({ search: query, status, category, sort: "newest" });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="p-8 text-center text-sm text-[#737373]">
            No matching issues found for current filters.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(item => `
      <tr class="hover:bg-[#FAF9F5] border-b border-[#F2EFE9] transition-colors">
        <td class="px-4 py-3.5 text-xs font-mono font-semibold text-[#666] whitespace-nowrap">
          ${escapeHTML(item.id)}
        </td>
        <td class="px-4 py-3.5 text-sm font-medium text-[#202020]">
          <div class="line-clamp-1 max-w-xs">${escapeHTML(item.title)}</div>
          <div class="text-xs text-[#888] font-normal">${escapeHTML(item.area)}</div>
        </td>
        <td class="px-4 py-3.5 text-xs text-[#555] whitespace-nowrap">
          ${escapeHTML(item.category)}
        </td>
        <td class="px-4 py-3.5 whitespace-nowrap">
          ${createStatusBadge(item.status)}
        </td>
        <td class="px-4 py-3.5 text-xs text-[#555] whitespace-nowrap">
          <span class="px-2 py-0.5 rounded text-[11px] font-medium ${
            item.urgency.toLowerCase() === 'high' ? 'bg-[#FEE2E2] text-[#B91C1C]' :
            item.urgency.toLowerCase() === 'medium' ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-[#E5E7EB] text-[#4B5563]'
          }">
            ${escapeHTML(item.urgency)}
          </span>
        </td>
        <td class="px-4 py-3.5 text-xs text-[#888] whitespace-nowrap">
          ${formatDate(item.dateReported)}
        </td>
        <td class="px-4 py-3.5 text-right whitespace-nowrap">
          <div class="flex items-center justify-end gap-1.5">
            <button data-action="update-status" data-id="${escapeHTML(item.id)}"
                    class="px-3 py-1 text-xs font-medium text-[#536B4F] bg-[#DDE6D8]/60 hover:bg-[#DDE6D8] border border-[#CBD8C4] rounded-full transition-all">
              Status
            </button>
            <button data-action="edit-issue" data-id="${escapeHTML(item.id)}"
                    class="px-3 py-1 text-xs font-medium text-[#1E56A0] bg-[#DBEAFE]/60 hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-full transition-all">
              Edit
            </button>
            <button data-action="delete-issue" data-id="${escapeHTML(item.id)}" data-title="${escapeHTML(item.title)}"
                    class="px-3 py-1 text-xs font-medium text-[#B91C1C] bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] border border-[#FECACA] rounded-full transition-all">
              Delete
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    // Attach button listeners
    tableBody.querySelectorAll('[data-action="update-status"]').forEach(btn => {
      btn.addEventListener("click", () => openModal(btn.getAttribute("data-id")));
    });

    tableBody.querySelectorAll('[data-action="edit-issue"]').forEach(btn => {
      btn.addEventListener("click", () => openEditModal(btn.getAttribute("data-id")));
    });

    tableBody.querySelectorAll('[data-action="delete-issue"]').forEach(btn => {
      btn.addEventListener("click", () => openDeleteModal(
        btn.getAttribute("data-id"),
        btn.getAttribute("data-title")
      ));
    });
  }

  // Open Status Update Modal
  function openModal(id) {
    const issue = storage.getById(id);
    if (!issue) return;

    currentSelectedIssueId = id;
    if (modalIssueId) modalIssueId.textContent = issue.id;
    if (modalIssueTitle) modalIssueTitle.textContent = issue.title;
    if (modalNewStatus) modalNewStatus.value = issue.status;
    if (modalNote) modalNote.value = "";

    if (updateModal) updateModal.classList.remove("hidden");
  }

  function closeModal() {
    currentSelectedIssueId = null;
    if (updateModal) updateModal.classList.add("hidden");
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener("click", closeModal);

  if (modalSaveBtn) {
    modalSaveBtn.addEventListener("click", () => {
      if (!currentSelectedIssueId) return;
      const newStatus = modalNewStatus ? modalNewStatus.value : "Reported";
      const note = modalNote ? modalNote.value.trim() : "";

      const updated = storage.updateStatus(currentSelectedIssueId, newStatus, note);
      closeModal();
      renderStats();
      renderTable();

      showNotification(
        "Status Updated",
        `Issue ${currentSelectedIssueId} is now marked as "${newStatus}".`,
        "success"
      );
    });
  }

  // ── Edit Issue Logic ────────────────────────────────────────────────
  function openEditModal(id) {
    const issue = storage.getById(id);
    if (!issue) return;

    if (editIssueId) editIssueId.textContent = issue.id;
    if (!editIssueForm) return;
    editIssueForm.querySelector("#edit-issue-hidden-id").value = issue.id;
    editIssueForm.querySelector("#edit-issue-title").value = issue.title;
    editIssueForm.querySelector("#edit-issue-category").value = issue.category;
    editIssueForm.querySelector("#edit-issue-urgency").value = issue.urgency;
    editIssueForm.querySelector("#edit-issue-area").value = issue.area;
    editIssueForm.querySelector("#edit-issue-desc").value = issue.description;

    if (editModal) editModal.classList.remove("hidden");
  }

  function closeEditModal() {
    if (editModal) editModal.classList.add("hidden");
  }

  if (editModalClose)  editModalClose.addEventListener("click", closeEditModal);
  if (editModalCancel) editModalCancel.addEventListener("click", closeEditModal);

  if (editIssueForm) {
    editIssueForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id          = editIssueForm.querySelector("#edit-issue-hidden-id").value;
      const title       = editIssueForm.querySelector("#edit-issue-title").value.trim();
      const category    = editIssueForm.querySelector("#edit-issue-category").value;
      const urgency     = editIssueForm.querySelector("#edit-issue-urgency").value;
      const area        = editIssueForm.querySelector("#edit-issue-area").value.trim();
      const description = editIssueForm.querySelector("#edit-issue-desc").value.trim();

      if (!title || !area || !description) {
        showNotification("Missing Fields", "Please fill all required fields.", "warning");
        return;
      }

      const updated = storage.edit(id, { title, category, urgency, area, description });
      closeEditModal();
      renderStats();
      renderTable();

      if (updated) {
        showNotification("Issue Updated", `"${updated.title}" (${updated.id}) has been edited successfully.`, "success");
      } else {
        showNotification("Error", "Could not update the issue.", "error");
      }
    });
  }

  // ── Delete Confirm Logic ────────────────────────────────────────────
  function openDeleteModal(id, title) {
    currentDeleteId = id;
    if (deleteModalTitle) deleteModalTitle.textContent = `"${title}" (${id})`;
    if (deleteModal) deleteModal.classList.remove("hidden");
  }

  function closeDeleteModal() {
    currentDeleteId = null;
    if (deleteModal) deleteModal.classList.add("hidden");
  }

  if (deleteModalClose)   deleteModalClose.addEventListener("click", closeDeleteModal);
  if (deleteModalCancel)  deleteModalCancel.addEventListener("click", closeDeleteModal);

  if (deleteModalConfirm) {
    deleteModalConfirm.addEventListener("click", () => {
      if (!currentDeleteId) return;
      const idToDelete = currentDeleteId;
      const success = storage.delete(idToDelete);
      closeDeleteModal();
      renderStats();
      renderTable();

      if (success) {
        showNotification("Issue Deleted", `Issue ${idToDelete} has been permanently removed.`, "error");
      } else {
        showNotification("Not Found", "The issue could not be deleted.", "warning");
      }
    });
  }

  // Quick Add Issue Modal Handlers
  const addIssueBtn = document.getElementById("admin-add-issue-btn");
  const addIssueModal = document.getElementById("add-issue-modal");
  const addModalClose = document.getElementById("add-modal-close");
  const addModalCancel = document.getElementById("add-modal-cancel");
  const newIssueForm = document.getElementById("admin-new-issue-form");

  function openAddModal() {
    if (newIssueForm) newIssueForm.reset();
    if (addIssueModal) addIssueModal.classList.remove("hidden");
  }

  function closeAddModal() {
    if (addIssueModal) addIssueModal.classList.add("hidden");
  }

  if (addIssueBtn) addIssueBtn.addEventListener("click", openAddModal);
  if (addModalClose) addModalClose.addEventListener("click", closeAddModal);
  if (addModalCancel) addModalCancel.addEventListener("click", closeAddModal);

  if (newIssueForm) {
    newIssueForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("new-issue-title")?.value.trim();
      const category = document.getElementById("new-issue-category")?.value;
      const urgency = document.getElementById("new-issue-urgency")?.value;
      const area = document.getElementById("new-issue-area")?.value.trim();
      const description = document.getElementById("new-issue-desc")?.value.trim();

      if (!title || !category || !area || !description) {
        showNotification("Missing Fields", "Please complete all required fields.", "warning");
        return;
      }

      const created = storage.create({
        title,
        category,
        urgency,
        area,
        description,
        reportedBy: "Admin Quick Add"
      });

      closeAddModal();
      renderStats();
      renderTable();

      showNotification(
        "Issue Created",
        `Added "${created.title}" (${created.id}) to community issues.`,
        "success"
      );
    });
  }

  // Filter Listeners
  if (searchInput) searchInput.addEventListener("input", renderTable);
  if (statusFilter) statusFilter.addEventListener("change", renderTable);
  if (categoryFilter) categoryFilter.addEventListener("change", renderTable);

  // Initial renders
  renderStats();
  renderTable();
});

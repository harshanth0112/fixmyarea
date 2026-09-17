/**
 * FixMyArea - Shared Storage & Issue Contract
 * Developer 4 Lead Module
 * 
 * Provides unified issue manipulation functions across the project.
 * Supports clean in-memory operations with seamless compatibility.
 */

import { issues as defaultIssues } from '../js/data.js';

// In-memory issue state
let activeIssues = [...defaultIssues];

/**
 * Get all current issues
 * @returns {Array} List of issues
 */
export function getAllIssues() {
  return [...activeIssues];
}

/**
 * Find an issue by its ID (e.g., 'ISSUE-001')
 * @param {string} id 
 * @returns {Object|null}
 */
export function getIssueById(id) {
  if (!id) return null;
  return activeIssues.find(item => item.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Add a new issue to the active in-memory collection
 * @param {Object} issueData
 * @returns {Object} Newly created issue with generated ID and timeline
 */
export function createIssue({
  title,
  category,
  area,
  landmark = "",
  description,
  urgency = "Medium",
  reportedBy = "Community Member"
}) {
  const nextNumber = activeIssues.length + 1;
  const newId = `ISSUE-${String(nextNumber).padStart(3, '0')}`;
  const now = new Date().toISOString().split("T")[0];

  const newIssue = {
    id: newId,
    title,
    category,
    area,
    landmark,
    description,
    status: "Reported",
    urgency,
    reportedBy,
    dateReported: now,
    lastUpdated: now,
    progress: [
      { label: "Report submitted", date: now, completed: true },
      { label: "Under review", date: null, completed: false },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  };

  activeIssues.unshift(newIssue);
  return newIssue;
}

/**
 * Update issue status and update its timeline progression (used by Dev 4 Admin)
 * @param {string} id - The issue ID
 * @param {string} newStatus - 'Reported' | 'Under Review' | 'In Progress' | 'Resolved'
 * @param {string} note - Optional note
 * @returns {Object|null} Updated issue
 */
export function updateIssueStatus(id, newStatus, note = "") {
  const issue = getIssueById(id);
  if (!issue) return null;

  const now = new Date().toISOString().split("T")[0];
  issue.status = newStatus;
  issue.lastUpdated = now;

  // Update progress timeline steps
  const statusOrder = ["Reported", "Under Review", "In Progress", "Resolved"];
  const targetIdx = statusOrder.indexOf(newStatus);

  if (targetIdx !== -1) {
    issue.progress.forEach((step, idx) => {
      if (idx <= targetIdx) {
        step.completed = true;
        if (!step.date) step.date = now;
      } else {
        step.completed = false;
      }
    });
  }

  if (note) {
    if (!issue.notes) issue.notes = [];
    issue.notes.push({ date: now, text: note });
  }

  return issue;
}

/**
 * Filter issues by search, category, status, and sort
 */
export function queryIssues({ search = "", category = "", status = "", sort = "newest" }) {
  let list = [...activeIssues];

  if (category && category !== "all") {
    list = list.filter(item => 
      item.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === category.toLowerCase().replace(/[^a-z0-9]/g, '-') ||
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (status && status !== "all") {
    list = list.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.trim().toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.area.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  if (sort === "oldest") {
    list.sort((a, b) => new Date(a.dateReported) - new Date(b.dateReported));
  } else if (sort === "alpha") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    list.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
  }

  return list;
}

/**
 * Get issue statistics for dashboards & admin panel
 */
export function getIssueStats() {
  return {
    total: activeIssues.length,
    reported: activeIssues.filter(i => i.status.toLowerCase() === "reported").length,
    underReview: activeIssues.filter(i => i.status.toLowerCase() === "under review").length,
    inProgress: activeIssues.filter(i => i.status.toLowerCase() === "in progress").length,
    resolved: activeIssues.filter(i => i.status.toLowerCase() === "resolved").length,
    highPriority: activeIssues.filter(i => i.urgency.toLowerCase() === "high").length
  };
}

/**
 * Edit an existing issue's core fields (Admin only)
 * @param {string} id - The issue ID
 * @param {Object} fields - Fields to update: { title, category, area, urgency, description }
 * @returns {Object|null} Updated issue or null if not found
 */
export function editIssue(id, { title, category, area, urgency, description }) {
  const issue = getIssueById(id);
  if (!issue) return null;

  const now = new Date().toISOString().split("T")[0];
  if (title !== undefined)       issue.title       = title;
  if (category !== undefined)    issue.category    = category;
  if (area !== undefined)        issue.area        = area;
  if (urgency !== undefined)     issue.urgency     = urgency;
  if (description !== undefined) issue.description = description;
  issue.lastUpdated = now;

  return issue;
}

/**
 * Delete an issue from the in-memory store (Admin only)
 * @param {string} id - The issue ID to remove
 * @returns {boolean} true if deleted, false if not found
 */
export function deleteIssue(id) {
  const idx = activeIssues.findIndex(item => item.id.toLowerCase() === id.toLowerCase());
  if (idx === -1) return false;
  activeIssues.splice(idx, 1);
  return true;
}

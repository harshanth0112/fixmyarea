/**
 * Developer 4 - Storage & Issue State Handler
 * Imports and connects with shared storage contract.
 */
import * as storageContract from '../../shared/storage-contract.js';

export const storage = {
  getAll: storageContract.getAllIssues,
  getById: storageContract.getIssueById,
  create: storageContract.createIssue,
  updateStatus: storageContract.updateIssueStatus,
  edit: storageContract.editIssue,
  delete: storageContract.deleteIssue,
  query: storageContract.queryIssues,
  getStats: storageContract.getIssueStats
};

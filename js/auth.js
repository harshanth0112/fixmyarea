/**
 * FixMyArea - In-Memory Simulated Auth State
 * Supports: Guest, Citizen / User, and Admin roles
 */

// In-memory current user state (persists across page session via window if single page, or defaults to Guest / Citizen)
const DEFAULT_USER = {
  role: "guest", // 'guest' | 'user' | 'admin'
  name: "Guest Visitor",
  email: ""
};

// Check in-memory session
let currentUser = { ...DEFAULT_USER };

try {
  const saved = sessionStorage.getItem("fixmyarea_auth_role");
  if (saved) {
    currentUser = JSON.parse(saved);
  }
} catch (e) {
  // fallback
}

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = { ...user };
  try {
    sessionStorage.setItem("fixmyarea_auth_role", JSON.stringify(currentUser));
  } catch (e) {}
}

export function logoutUser() {
  currentUser = { ...DEFAULT_USER };
  try {
    sessionStorage.removeItem("fixmyarea_auth_role");
  } catch (e) {}
}

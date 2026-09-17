/**
 * FixMyArea - Auth Guard
 * Runs immediately when loaded. Redirects to login.html
 * if no active session is found in sessionStorage.
 */
(function () {
  try {
    var session = sessionStorage.getItem("fixmyarea_auth_role");
    if (!session) {
      window.location.replace("login.html");
    }
  } catch (e) {
    window.location.replace("login.html");
  }
})();

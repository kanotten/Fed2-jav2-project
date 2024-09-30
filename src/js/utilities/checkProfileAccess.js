// src/js/utilities/checkProfileAccess.js
document.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.getElementById("profile-link");

  if (profileLink) {
    profileLink.addEventListener("click", (e) => {
      const token = localStorage.getItem("authToken");
      const apiKey = localStorage.getItem("apiKey");

      // Hvis token eller apiKey mangler, omdiriger til login-siden
      if (!token || !apiKey) {
        e.preventDefault(); // Forhindre standard lenkeoppførsel
        alert("You must be logged in to view this page.");
        window.location.href = "/auth/login/"; // Redirect til login-siden
      }
    });
  }
});

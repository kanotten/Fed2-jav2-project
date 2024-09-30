// src/js/utilities/authGuard.js

export function authGuard() {
  // Sjekk om vi er på profilsiden
  if (
    window.location.pathname === "/profile/index.html" ||
    window.location.pathname === "/profile/"
  ) {
    const authToken = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    // Hvis authToken eller apiKey ikke finnes, omdiriger til innloggingssiden
    if (!authToken || !apiKey) {
      alert("You must be logged in to view this page");
      window.location.href = "/auth/login/";
    }
  }
}

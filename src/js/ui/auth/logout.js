// src/js/ui/auth/logout.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Logout script loaded"); // Bekrefter at logout.js er lastet inn

  // Sjekk at logout-knappen finnes
  const logoutButton = document.getElementById("logout-link");

  if (logoutButton) {
    console.log("Logout button found"); // Knappen finnes
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Logout button clicked"); // Når knappen trykkes

      // Fjern authToken og apiKey fra localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("apiKey");

      console.log("authToken and apiKey removed from localStorage");

      // Omdiriger til hjem-siden
      window.location.href = "/";
    });
  } else {
    console.log("Logout button NOT found"); // Hvis knappen ikke finnes
  }
});

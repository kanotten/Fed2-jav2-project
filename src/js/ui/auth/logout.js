document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-link");

  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault(); // Forhindre sideoppdatering
      // Fjern token fra localStorage
      localStorage.removeItem("authToken");

      // Omdiriger til login-siden
      window.location.href = "/auth/login/index.html";
    });
  }
});

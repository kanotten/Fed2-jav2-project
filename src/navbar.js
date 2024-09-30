console.log("navbar.js loaded");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/navbar.html"); // Oppdatert til riktig bane for navbar.html
    const navbarHTML = await response.text();
    document.getElementById("navbar-container").innerHTML = navbarHTML;

    // Legg til logging for å bekrefte at navbaren er lastet
    console.log("Navbar loaded");

    // Sjekk om brukeren er innlogget
    const token = localStorage.getItem("authToken");
    if (token) {
      document.getElementById("profile-link").style.display = "block";
      document.getElementById("logout-link").style.display = "block";
      document.getElementById("login-link").style.display = "none";
    } else {
      document.getElementById("profile-link").style.display = "none";
      document.getElementById("logout-link").style.display = "none";
      document.getElementById("login-link").style.display = "block";
    }

    // Legg til lytter på Logout-knappen
    const logoutButton = document.getElementById("logout-link");
    console.log(logoutButton); // Sjekk om knappen er funnet

    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Logout button clicked");

        // Fjern authToken og apiKey fra localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("apiKey");
        console.log("authToken and apiKey removed from localStorage");

        // Omdiriger til hjem-siden
        window.location.href = "/";
      });
    } else {
      console.log("Logout button not found");
    }
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
});

console.log("navbar.js loaded");

document.addEventListener("DOMContentLoaded", async function () {
  // Sjekk om authToken og apiKey er i localStorage
  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!token || !apiKey) {
    // Hvis en av dem mangler, skjul hele navbaren
    console.log("User not logged in, hiding navbar.");

    // Sjekk om navbar-container finnes før vi prøver å skjule det
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
      navbarContainer.style.display = "none"; // Skjuler navbar-container
    }

    return; // Avslutt videre kjøring av koden hvis ikke logget inn
  }

  try {
    // Hent navbar-innholdet hvis brukeren er logget inn
    const response = await fetch("/navbar.html");
    const navbarHTML = await response.text();
    document.getElementById("navbar-container").innerHTML = navbarHTML;

    // Bekreft at navbar er lastet
    console.log("Navbar loaded");

    // Nå som vi har authToken og apiKey, vis de relevante lenkene
    document.getElementById("profile-link").style.display = "block";
    document.getElementById("logout-link").style.display = "block";
    document.getElementById("login-link").style.display = "none";

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

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/navbar.html"); // Oppdatert til riktig bane for navbar.html
    const navbarHTML = await response.text();
    document.getElementById("navbar-container").innerHTML = navbarHTML;

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
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
});

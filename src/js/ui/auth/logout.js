document.addEventListener("DOMContentLoaded", () => {
  console.log("Logout script loaded"); // Bekrefter at logout.js er lastet inn
  const logoutButton = document.getElementById("logout-link");

  if (logoutButton) {
    console.log("Logout button found"); // Bekrefter at logout-knappen finnes
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Logout button clicked"); // Bekrefter at logout-knappen klikkes
      // Fjern authToken fra localStorage
      localStorage.removeItem("authToken");
      console.log("authToken removed from localStorage"); // Bekrefter at authToken fjernes
      // Omdiriger brukeren til login-siden
      window.location.href = "/auth/login/";
    });
  } else {
    console.log("Logout button not found");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-link");

  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("authToken");
      localStorage.removeItem("apiKey");
      window.location.href = "/";
    });
  }
});

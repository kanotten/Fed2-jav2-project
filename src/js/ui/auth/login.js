import { login } from "/src/js/api/auth/login.js"; // Importer login-funksjonen

const form = document.forms.login;

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Forhindre at siden lastes inn på nytt ved form-innsending

  const email = form.email.value;
  const password = form.password.value;

  const data = {
    email,
    password,
  };

  console.log("Sending følgende data til API:", data); // Logging av dataene

  try {
    const result = await login(data);
    if (result && result.data && result.data.accessToken) {
      // Lagre accessToken i localStorage
      localStorage.setItem("authToken", result.data.accessToken);

      alert("Login successful!");
      window.location.href = "/profile/index.html"; // Omdiriger til profil etter innlogging
    } else {
      alert("Login failed: No access token received.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed: " + error.message); // Gi tilbakemelding til brukeren ved feil
  }
});

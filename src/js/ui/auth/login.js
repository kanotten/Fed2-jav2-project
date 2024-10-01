// src/js/ui/auth/login.js
import { getKey } from "/src/js/api/auth/key.js";
import { login } from "/src/js/api/auth/login.js";

const form = document.forms.login;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  try {
    const result = await login({ email, password });
    if (result && result.accessToken) {
      const authToken = result.accessToken;
      const userName = result.name; // Hent name fra API-responsen
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("name", userName); // Lagre name i localStorage

      alert("Login successful!");

      // Create the API key using the authToken
      const apiKeyResult = await getKey(authToken);
      if (apiKeyResult && apiKeyResult.data && apiKeyResult.data.key) {
        localStorage.setItem("apiKey", apiKeyResult.data.key); // Lagre API-nøkkelen
        console.log("API Key generated:", apiKeyResult.data.key);
      } else {
        console.error("Failed to generate API Key");
      }

      window.location.href = "/profile/index.html";
    } else {
      alert("Login failed: No access token received.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed: " + error.message);
  }
});

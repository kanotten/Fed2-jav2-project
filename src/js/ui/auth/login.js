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
    if (result && result.data && result.data.accessToken) {
      const authToken = result.data.accessToken;
      localStorage.setItem("authToken", authToken);

      alert("Login successful!");

      // Create the API key using the authToken
      const apiKeyResult = await getKey(authToken);
      if (apiKeyResult && apiKeyResult.data && apiKeyResult.data.key) {
        localStorage.setItem("apiKey", apiKeyResult.data.key); // Store the API key
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

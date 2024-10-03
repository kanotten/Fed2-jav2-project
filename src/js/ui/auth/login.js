import { getKey } from "/src/js/api/auth/key.js";
import { login } from "/src/js/api/auth/login.js";

const form = document.forms.login;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  try {
    const result = await login({ email, password });
    if (result?.accessToken) {
      localStorage.setItem("authToken", result.accessToken);
      localStorage.setItem("name", result.name);

      const apiKeyResult = await getKey(result.accessToken);
      if (apiKeyResult?.data?.key) {
        localStorage.setItem("apiKey", apiKeyResult.data.key);
      }

      window.location.href = "/profile/index.html";
    } else {
      alert("Login failed.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

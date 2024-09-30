// src/js/api/auth/key.js
export async function getKey(token) {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/create-api-key",
      {
        // Oppdatert URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Du bruker tokenet etter innlogging
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Key generation failed:", error);
  }
}

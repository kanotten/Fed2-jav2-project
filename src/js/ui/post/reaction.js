// src/js/ui/post/reaction.js

export function reactToPost(postId, emoji) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  console.log(`Reagerer på post ${postId} med emoji ${emoji}`);

  fetch(`https://v2.api.noroff.dev/social/posts/${postId}/react/${emoji}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Reaksjon feilet");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Reaction response data:", data);
      alert(`Reaksjon med ${emoji} ble lagt til!`);
      // Her kan du legge til mer logikk for å oppdatere UI basert på responsen
    })
    .catch((error) => {
      console.error("Error reacting to post:", error);
    });
}

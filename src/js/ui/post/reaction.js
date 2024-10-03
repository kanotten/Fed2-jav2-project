export function reactToPost(postId, emoji) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  fetch(`https://v2.api.noroff.dev/social/posts/${postId}/react/${emoji}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Reaction failed");
      }
      return response.json();
    })
    .then(() => {
      alert(`Reaksjon med ${emoji} ble lagt til!`);
    })
    .catch((error) => {
      console.error("Error reacting to post:", error);
    });
}

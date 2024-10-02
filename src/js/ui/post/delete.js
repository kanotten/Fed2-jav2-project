// src/js/ui/post/delete.js

export function deleteComment(postId, commentId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  fetch(
    `https://v2.api.noroff.dev/social/posts/${postId}/comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        // 204 No Content betyr at slettingen var vellykket
        document.getElementById(`comment-${commentId}`).remove(); // Fjern kommentaren fra UI
        alert("Kommentaren ble slettet!");
      } else {
        throw new Error("Kunne ikke slette kommentaren. Prøv igjen senere.");
      }
    })
    .catch((error) => {
      console.error("Feil ved sletting av kommentar:", error);
      alert("Noe gikk galt. Kommentaren ble ikke slettet.");
    });
}

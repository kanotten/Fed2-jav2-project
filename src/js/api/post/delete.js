// src/js/ui/post/delete.js

let isDeleting = false; // Variabel for å spore om en sletting er i gang

export async function deleteComment(postId, commentId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (isDeleting) {
    return; // Stopp hvis en sletting allerede pågår
  }

  try {
    isDeleting = true; // Merk at en sletting pågår

    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      alert("Kommentaren ble slettet!");

      // Fjern kommentaren fra UI
      const commentElement = document.getElementById(`comment-${commentId}`);
      if (commentElement) {
        commentElement.remove(); // Fjern fra DOM
      }
    } else {
      console.error("Sletting mislyktes. Status:", response.status);
      alert("Kunne ikke slette kommentaren.");
    }
  } catch (error) {
    console.error("Feil ved sletting av kommentar:", error);
  } finally {
    isDeleting = false; // Sett isDeleting tilbake til false etter slettingen
  }
}

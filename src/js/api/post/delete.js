let isDeletingPost = false; // Variabel for å spore om en post-sletting er i gang
let isDeletingComment = false; // Variabel for å spore om en kommentar-sletting er i gang

// Funksjon for å slette et innlegg (post)
export async function deletePost(postId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!authToken || !apiKey) {
    console.error("Auth-token eller API-nøkkel mangler!");
    return;
  }

  if (isDeletingPost) {
    console.log("En sletting av innlegg pågår allerede, avbryter.");
    return; // Stopp hvis en sletting allerede pågår
  }

  try {
    console.log("Sletter innlegg med ID:", postId);
    isDeletingPost = true; // Merk at en sletting pågår
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`, // Bruk det riktige endepunktet
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
      console.log("Innlegget ble slettet fra serveren.");
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.remove();
        console.log("Innlegget ble fjernet fra UI.");
      }
    } else {
      console.error("Sletting mislyktes. Status:", response.status);
    }
  } catch (error) {
    console.error("Feil ved sletting av innlegg:", error);
  } finally {
    isDeletingPost = false; // Sett isDeletingPost tilbake til false etter slettingen
  }
}

// Funksjon for å slette en kommentar
export async function deleteComment(postId, commentId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!authToken || !apiKey) {
    console.error("Auth-token eller API-nøkkel mangler!");
    return;
  }

  if (isDeletingComment) {
    console.log("En sletting av kommentar pågår allerede, avbryter.");
    return; // Stopp hvis en sletting allerede pågår
  }

  try {
    console.log("Sletter kommentar med ID:", commentId);
    isDeletingComment = true; // Merk at en sletting pågår

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
      console.log("Kommentaren ble slettet fra serveren.");
      const commentElement = document.getElementById(`comment-${commentId}`);
      if (commentElement) {
        commentElement.remove();
        console.log("Kommentaren ble fjernet fra UI.");
      }
    } else {
      console.error("Sletting mislyktes. Status:", response.status);
    }
  } catch (error) {
    console.error("Feil ved sletting av kommentar:", error);
  } finally {
    isDeletingComment = false; // Sett isDeletingComment tilbake til false etter slettingen
  }
}

import { getSinglePost } from "/src/js/api/post/read.js"; // Funksjon for å hente enkeltinnlegg

document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.querySelector(".post-container");

  // Hent post-ID fra URL-parametere
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    getSinglePost(postId)
      .then((post) => {
        if (post && post.data) {
          // Sjekk om API-et returnerer et post-objekt
          const { title, body, tags, media, created } = post.data;

          // Håndter tomme verdier for tags og media
          const postTags =
            tags.length > 0 ? tags.join(", ") : "No tags available";
          const postImage = media?.url || "";
          const postImageAlt = media?.alt || "No image available";

          postContainer.innerHTML = `
            <div class="post-details">
              <h1>${title || "Untitled"}</h1>
              <img src="${postImage}" alt="${postImageAlt}">
              <p>${body || "No description available"}</p>
              <p>Tags: ${postTags}</p>
              <p>Opprettet: ${new Date(created).toLocaleDateString()}</p>
            </div>
          `;
        } else {
          postContainer.innerHTML = `<p>Innlegget kunne ikke lastes. Prøv igjen senere.</p>`;
        }
      })
      .catch((error) => {
        console.error("Feil ved henting av innlegg:", error);
        postContainer.innerHTML = `<p>Innlegget kunne ikke lastes. Prøv igjen senere.</p>`;
      });
  } else {
    postContainer.innerHTML = `<p>Ingen post-ID oppgitt. Gå tilbake til <a href="/index.html">forsiden</a>.</p>`;
  }
});

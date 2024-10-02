import { getSinglePost } from "/src/js/api/post/read.js"; // Hent enkelt innlegg
import { reactToPost } from "/src/js/ui/post/reaction.js"; // Importer reaksjonsfunksjonen

document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.querySelector(".post-container");

  // Hent post-ID fra URL-parametere
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    getSinglePost(postId)
      .then((post) => {
        if (post && post.data) {
          const { title, body, tags, media, created } = post.data;
          const postTags =
            tags.length > 0 ? tags.join(", ") : "No tags available";
          const postImage = media?.url || "";
          const postImageAlt = media?.alt || "No image available";

          // Generer HTML for post detaljer inkludert emoji reaksjoner
          postContainer.innerHTML = `
            <div class="post-details">
              <h1>${title || "Untitled"}</h1>
              <img src="${postImage}" alt="${postImageAlt}">
              <p>${body || "No description available"}</p>
              <p>Tags: ${postTags}</p>
              <p>Opprettet: ${new Date(created).toLocaleDateString()}</p>

              <!-- Emoji reaksjoner -->
              <div class="emoji-reactions">
                <button class="emoji-btn" data-emoji="👍">👍</button>
                <button class="emoji-btn" data-emoji="❤️">❤️</button>
                <button class="emoji-btn" data-emoji="😂">😂</button>
                <button class="emoji-btn" data-emoji="🔥">🔥</button>
              </div>
            </div>
          `;

          // Legg til event listeners for emoji-knappene
          document.querySelectorAll(".emoji-btn").forEach((button) => {
            button.addEventListener("click", () => {
              const emoji = button.getAttribute("data-emoji");
              console.log(`Knapp med emoji ${emoji} ble trykket`);
              reactToPost(postId, emoji); // Kall funksjonen fra reaction.js
            });
          });
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

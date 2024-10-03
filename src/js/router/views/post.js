import { getSinglePost } from "/src/js/api/post/read.js"; // Hent enkelt innlegg
import { deleteComment } from "/src/js/ui/post/delete.js"; // Importer slett funksjon
import { reactToPost } from "/src/js/ui/post/reaction.js"; // Importer reaksjonsfunksjonen

// Funksjon for å sende en kommentar til et innlegg
function submitComment(postId, commentBody) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  fetch(`https://v2.api.noroff.dev/social/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: commentBody,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Feil ved sending av kommentar");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Kommentar lagt til:", data);
      appendCommentToUI(postId, data.data); // Legger til ny kommentar i UI
    })
    .catch((error) => {
      console.error("Feil ved å legge til kommentar:", error);
    });
}

// Funksjon for å legge til en ny kommentar i UI
function appendCommentToUI(postId, comment) {
  const commentList = document.getElementById("commentList");
  const commentElement = document.createElement("div");
  commentElement.setAttribute("class", "comment-element"); // Bruker class for CSS styling
  commentElement.setAttribute("id", `comment-${comment.id}`); // Gi kommentaren en unik ID

  commentElement.innerHTML = `
    <div class="comment-text">
      <p><strong>${comment.owner}</strong> skrev: ${comment.body}</p>
      <small>Opprettet: ${new Date(comment.created).toLocaleString()}</small>
    </div>
    <button class="delete-btn" data-comment-id="${comment.id}">❌</button>
  `;

  // Legg til event listener for sletting av kommentaren
  commentElement.querySelector(".delete-btn").addEventListener("click", () => {
    const commentId = comment.id;
    deleteComment(postId, commentId); // Kall funksjonen for å slette
  });

  commentList.appendChild(commentElement);
}

document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.querySelector(".post-container");

  // Hent post-ID fra URL-parametere
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    getSinglePost(postId, true, true) // Legg til kommentarer og reaksjoner
      .then((post) => {
        if (post && post.data) {
          const { title, body, tags, media, created, comments } = post.data;
          const postTags =
            tags.length > 0 ? tags.join(", ") : "No tags available";
          const postImage = media?.url || "";
          const postImageAlt = media?.alt || "No image available";

          // Dynamisk HTML for postdetaljer inkludert kommentarer
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

              <!-- Kommentar seksjon -->
              <div id="commentList">
                <h3>Kommentarer</h3>
              </div>
              <form id="commentForm">
                <textarea id="commentText" placeholder="Skriv en kommentar..."></textarea>
                <button type="submit">Send</button>
              </form>
            </div>
          `;

          // Vis eksisterende kommentarer
          if (comments && comments.length > 0) {
            comments.forEach((comment) => appendCommentToUI(postId, comment));
          }

          // Legg til event listeners for emoji-knappene
          document.querySelectorAll(".emoji-btn").forEach((button) => {
            button.addEventListener("click", () => {
              const emoji = button.getAttribute("data-emoji");
              console.log(`Knapp med emoji ${emoji} ble trykket`);
              reactToPost(postId, emoji);
            });
          });

          // Legg til event listener for kommentarinnsending
          document
            .getElementById("commentForm")
            .addEventListener("submit", (event) => {
              event.preventDefault();
              const commentBody = document.getElementById("commentText").value;
              if (commentBody.trim()) {
                submitComment(postId, commentBody);
                document.getElementById("commentText").value = ""; // Tøm tekstfeltet
              } else {
                alert("Kommentarfeltet kan ikke være tomt.");
              }
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

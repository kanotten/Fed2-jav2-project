import { getSinglePost } from "/src/js/api/post/read.js";
import { deleteComment } from "/src/js/ui/post/delete.js";
import { reactToPost } from "/src/js/ui/post/reaction.js";

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
    body: JSON.stringify({ body: commentBody }),
  })
    .then((response) => response.ok && response.json())
    .then((data) => appendCommentToUI(postId, data.data))
    .catch(() => alert("Kommentar kunne ikke legges til."));
}

function appendCommentToUI(postId, comment) {
  const commentList = document.getElementById("commentList");
  const commentElement = document.createElement("div");
  commentElement.className = "comment-element";
  commentElement.id = `comment-${comment.id}`;
  commentElement.innerHTML = `
    <div class="comment-text">
      <p><strong>${comment.owner}</strong> skrev: ${comment.body}</p>
      <small>Opprettet: ${new Date(comment.created).toLocaleString()}</small>
    </div>
    <button class="delete-btn" data-comment-id="${comment.id}">❌</button>
  `;

  commentElement
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteComment(postId, comment.id));
  commentList.appendChild(commentElement);
}

function renderPostDetails(post, postId) {
  const { title, body, tags, media, created, comments } = post;
  const postContainer = document.querySelector(".post-container");
  postContainer.innerHTML = `
    <div class="post-details">
      <h1>${title || "Untitled"}</h1>
      <img src="${media?.url || ""}" alt="${media?.alt || "No image available"}">
      <p>${body || "No description available"}</p>
      <p>Tags: ${tags.length > 0 ? tags.join(", ") : "No tags available"}</p>
      <p>Opprettet: ${new Date(created).toLocaleDateString()}</p>

      <div class="emoji-reactions">
        <button class="emoji-btn" data-emoji="👍">👍</button>
        <button class="emoji-btn" data-emoji="❤️">❤️</button>
        <button class="emoji-btn" data-emoji="😂">😂</button>
        <button class="emoji-btn" data-emoji="🔥">🔥</button>
      </div>

      <div id="commentList">
        <h3>Kommentarer</h3>
      </div>
      <form id="commentForm">
        <textarea id="commentText" placeholder="Skriv en kommentar..."></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  comments?.forEach((comment) => appendCommentToUI(postId, comment));
  setupEventListeners(postId);
}

function setupEventListeners(postId) {
  document
    .querySelectorAll(".emoji-btn")
    .forEach((button) =>
      button.addEventListener("click", () =>
        reactToPost(postId, button.getAttribute("data-emoji")),
      ),
    );

  document.getElementById("commentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const commentBody = document.getElementById("commentText").value;
    commentBody.trim()
      ? submitComment(postId, commentBody)
      : alert("Kommentarfeltet kan ikke være tomt.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const postContainer = document.querySelector(".post-container");
  const postId = new URLSearchParams(window.location.search).get("id");

  if (postId) {
    getSinglePost(postId, true, true)
      .then((post) => post.data && renderPostDetails(post.data, postId))
      .catch(
        () =>
          (postContainer.innerHTML = `<p>Innlegget kunne ikke lastes. Prøv igjen senere.</p>`),
      );
  } else {
    postContainer.innerHTML = `<p>Ingen post-ID oppgitt. Gå tilbake til <a href="/index.html">forsiden</a>.</p>`;
  }
});

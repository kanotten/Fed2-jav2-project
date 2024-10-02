import { deletePost } from "../../ui/post/delete.js";
import { updatePost } from "../../ui/post/update.js";

// Hent og fyll skjema med postdata basert på valgt post ID
export async function fetchPost(id) {
  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );

    if (response.ok) {
      const post = await response.json();
      console.log("Post data mottatt:", post);
      document.getElementById("title").value = post.data.title;
      document.getElementById("content").value = post.data.body;
      document.getElementById("tags").value = post.data.tags.join(", ");
      document.getElementById("mediaUrl").value = post.data.media.url || "";
      document.getElementById("mediaAlt").value = post.data.media.alt || "";
    } else {
      console.error("Feil ved henting av post:", response.statusText);
    }
  } catch (error) {
    console.error("Feil:", error);
  }
}

// Dynamisk fylle dropdown for valg av post (kun brukerens egne poster)
export async function populatePostDropdown() {
  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");
  const currentUser = localStorage.getItem("name"); // Hent nåværende bruker

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts?_author=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );

    if (response.ok) {
      const posts = await response.json();
      const dropdown = document.getElementById("postIdInput");
      dropdown.innerHTML = ""; // Tøm dropdown

      // Filtrer postene basert på den nåværende brukeren
      const userPosts = posts.data.filter(
        (post) => post.author.name === currentUser
      );

      userPosts.forEach((post) => {
        const option = document.createElement("option");
        option.value = post.id; // Lagre post-ID som value
        option.textContent = post.title; // Vis tittel i dropdown
        dropdown.appendChild(option);
      });

      if (userPosts.length === 0) {
        dropdown.innerHTML = `<option value="">Ingen poster funnet</option>`;
      }
    } else {
      console.error("Feil ved henting av poster:", response.statusText);
    }
  } catch (error) {
    console.error("Feil:", error);
  }
}

// Hente postdata når post velges fra dropdown
document
  .getElementById("postIdInput")
  .addEventListener("change", function (event) {
    const postId = event.target.value;
    if (postId) {
      fetchPost(postId); // Hent post basert på ID
    } else {
      console.log("Ingen post valgt.");
    }
  });

// Fyll dropdown med poster ved last inn
document.addEventListener("DOMContentLoaded", populatePostDropdown);

// Oppdatere post ved innsending av skjema
document.forms.editPost.addEventListener("submit", function (event) {
  event.preventDefault();
  const postId = document.getElementById("postIdInput").value;
  if (postId) {
    updatePost(postId); // Oppdater post basert på ID
  } else {
    alert("Post finnes ikke lenger!");
  }
});

// Koble delete-knappen til deletePost-funksjonen (uten brukernavn i URL-en)
document.getElementById("deleteBtn").addEventListener("click", function () {
  const postId = document.getElementById("postIdInput").value;
  if (postId) {
    deletePost(postId)
      .then(() => {
        populatePostDropdown(); // Oppdater dropdown etter sletting
        alert("Posten ble slettet.");
      })
      .catch((error) => console.error("Feil ved sletting:", error));
  } else {
    alert("Post finnes ikke!");
  }
});

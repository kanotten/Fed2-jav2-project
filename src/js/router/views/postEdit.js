import { deletePost } from "../../ui/post/delete.js";
import { updatePost } from "../../ui/post/update.js";

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
      },
    );

    if (response.ok) {
      const post = await response.json();
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

export async function populatePostDropdown() {
  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");
  const currentUser = localStorage.getItem("name");

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts?_author=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      },
    );

    if (response.ok) {
      const posts = await response.json();
      const dropdown = document.getElementById("postIdInput");
      dropdown.innerHTML = "";

      const userPosts = posts.data.filter(
        (post) => post.author.name === currentUser,
      );

      userPosts.forEach((post) => {
        const option = document.createElement("option");
        option.value = post.id;
        option.textContent = post.title;
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

document
  .getElementById("postIdInput")
  .addEventListener("change", function (event) {
    const postId = event.target.value;
    if (postId) {
      fetchPost(postId);
    } else {
      console.log("Ingen post valgt.");
    }
  });

document.addEventListener("DOMContentLoaded", populatePostDropdown);

document.forms.editPost.addEventListener("submit", function (event) {
  event.preventDefault();
  const postId = document.getElementById("postIdInput").value;
  if (postId) {
    updatePost(postId);
  } else {
    alert("Post finnes ikke lenger!");
  }
});

const deleteButton = document.getElementById("deleteBtn");
deleteButton.removeEventListener("click", handleDelete);
deleteButton.addEventListener("click", handleDelete, { once: true });

function handleDelete() {
  const postId = document.getElementById("postIdInput").value;
  if (postId) {
    deletePost(postId)
      .then(() => {
        populatePostDropdown();
        alert("Posten ble slettet.");
      })
      .catch((error) => console.error("Feil ved sletting:", error));
  } else {
    alert("Post finnes ikke!");
  }
}

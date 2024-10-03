import { readUserPosts } from "../../api/profile/read.js";
import { authGuard } from "../../utilities/authGuard.js";
import { getSinglePost } from "../../api/post/read.js";

authGuard();

let currentPage = 1;
const postsPerPage = 12;
let totalPages = 1;

export async function displayUserPosts(page = 1) {
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  if (!authToken || !username) return;

  try {
    const response = await readUserPosts(username);
    const posts = response.data;

    if (!posts || posts.length === 0) return;

    totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice(
      (page - 1) * postsPerPage,
      page * postsPerPage,
    );

    let postContainer = document.getElementById("post-container");
    if (!postContainer) {
      postContainer = document.createElement("div");
      postContainer.id = "post-container";
      document.body.appendChild(postContainer);
    } else {
      postContainer.innerHTML = "";
    }

    paginatedPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post-card";
      postElement.innerHTML = `
        <div class="post-card-content" data-post-id="${post.id}">
          <img src="${post.media?.url || ""}" alt="${post.media?.alt || "No image available"}" />
          <h2>${post.title || "No title available"}</h2>
          <p>${post.body || "No description available"}</p>
          <p class="tags">Tags: ${post.tags?.join(", ") || "No tags available"}</p>
          <p class="date">Created: ${post.created ? new Date(post.created).toLocaleDateString() : "Invalid date"}</p>
        </div>
      `;
      postElement
        .querySelector(".post-card-content")
        .addEventListener("click", () => showPostDetails(post.id));
      postContainer.appendChild(postElement);
    });

    displayPaginationControls();
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
}

export async function showPostDetails(postId) {
  try {
    const post = await getSinglePost(postId);
    const postData = post.data;

    const postContainer = document.getElementById("post-container");
    if (postContainer) {
      postContainer.innerHTML = `
        <div class="single-post-view">
          <h2>${postData.title || "No title available"}</h2>
          <img src="${postData.media?.url || ""}" alt="${postData.media?.alt || "No image available"}" />
          <p>${postData.body || "No description available"}</p>
          <p class="tags">Tags: ${postData.tags?.join(", ") || "No tags available"}</p>
          <p class="date">Created: ${postData.created ? new Date(postData.created).toLocaleDateString() : "Invalid date"}</p>
          <button id="back-button">Go Back</button>
        </div>
      `;
      document
        .getElementById("back-button")
        .addEventListener("click", () => displayUserPosts(currentPage));
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
}

function displayPaginationControls() {
  let paginationContainer = document.getElementById("pagination-container");
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination-container";
    paginationContainer.style.textAlign = "center";
    document.body.appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    currentPage--;
    displayUserPosts(currentPage);
  });
  paginationContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    currentPage++;
    displayUserPosts(currentPage);
  });
  paginationContainer.appendChild(nextButton);

  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = ` Page ${currentPage} of ${totalPages} `;
  paginationContainer.appendChild(pageIndicator);
}

displayUserPosts();

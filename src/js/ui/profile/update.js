// src/js/ui/profile/update.js

import { readUserPosts } from "../../api/profile/read.js"; // Import the function that fetches user posts
import { authGuard } from "../../utilities/authGuard.js";
import { getSinglePost } from "../../api/post/read.js"; // Import the function to fetch a single post's details

// Ensure the user is authenticated before proceeding
authGuard();

let currentPage = 1;
const postsPerPage = 12; // Number of posts to show per page
let totalPages = 1; // This will be updated based on the number of posts

// Asynchronous function to fetch and display user-specific posts
export async function displayUserPosts(page = 1) {
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  // Check if username and authToken exist
  if (!authToken || !username) {
    console.error("User is not authenticated or username is missing.");
    return;
  }

  try {
    // Fetch the user's posts from the API
    const response = await readUserPosts(username);
    const posts = response.data;

    if (!posts || posts.length === 0) {
      console.log("No posts found for this user.");
      return;
    }

    // Calculate total pages
    totalPages = Math.ceil(posts.length / postsPerPage);

    // Determine the start and end index for slicing posts for the current page
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    let postContainer = document.getElementById("post-container");
    if (!postContainer) {
      postContainer = document.createElement("div");
      postContainer.id = "post-container";
      document.body.appendChild(postContainer);
    } else {
      postContainer.innerHTML = "";
    }

    // Create and append each post to the container
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

    // Display pagination controls
    displayPaginationControls();

    console.log("User-specific posts displayed successfully.");
  } catch (error) {
    console.error("Error fetching user posts: ", error);
  }
}

// Function to show detailed view of a specific post
export async function showPostDetails(postId) {
  try {
    const post = await getSinglePost(postId); // Fetch single post details
    const postData = post.data; // Use the correct data field

    // Display post details on the page
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

      // Add event listener to the "Go Back" button to reload all posts
      document
        .getElementById("back-button")
        .addEventListener("click", () => displayUserPosts(currentPage));
    }
  } catch (error) {
    console.error("Error fetching post details: ", error);
  }
}

// Function to display pagination controls
function displayPaginationControls() {
  let paginationContainer = document.getElementById("pagination-container");
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination-container";
    paginationContainer.style.textAlign = "center";
    document.body.appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = ""; // Clear existing controls

  // Create and append Previous button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    currentPage--;
    displayUserPosts(currentPage);
  });
  paginationContainer.appendChild(prevButton);

  // Create and append Next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    currentPage++;
    displayUserPosts(currentPage);
  });
  paginationContainer.appendChild(nextButton);

  // Create and append page indicator
  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = ` Page ${currentPage} of ${totalPages} `;
  paginationContainer.appendChild(pageIndicator);
}

// Automatically display user posts when this script is loaded
displayUserPosts();

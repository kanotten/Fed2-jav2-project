// src/js/ui/profile/update.js

// Import necessary modules and functions
import { readUserPosts } from "../../api/profile/read.js";
import { authGuard } from "../../utilities/authGuard.js";

// Ensure the user is authenticated before proceeding
authGuard();

// Asynchronous function to fetch and display user-specific posts
export async function displayUserPosts() {
  // Retrieve authentication token and username from localStorage
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  // Check if username and authToken exist
  if (!authToken || !username) {
    console.error("User is not authenticated or username is missing.");
    alert(
      "Authentication failed: User is not authenticated or username is missing.",
    );
    return;
  }

  try {
    // Fetch the user's posts from the API
    console.log(`Fetching posts for username: ${username}`);
    const response = await readUserPosts(username);

    // Get the posts from the response
    const posts = response.data;

    // If no posts are found, show a message and return
    if (!posts || posts.length === 0) {
      console.log("No posts found for this user.");
      alert("No posts found for this user.");
      return;
    }

    // Clear any existing posts on the page or create a container if it doesn't exist
    let postContainer = document.getElementById("post-container");
    if (!postContainer) {
      postContainer = document.createElement("div");
      postContainer.id = "post-container";
      document.body.appendChild(postContainer);
    } else {
      postContainer.innerHTML = ""; // Clear existing posts
    }

    // Create and append each post to the container
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post-card";

      // Create the post card with title, image, and content
      postElement.innerHTML = `
        <div>
          <img src="${post.media?.url || ""}" alt="${
            post.media?.alt || "No image available"
          }" style="width:100%; height:200px; object-fit:cover;">
          <h2>${post.title}</h2>
          <p>${post.body || "No description available"}</p>
          <p class="tags">Tags: ${post.tags.join(", ")}</p>
          <p class="date">Created: ${new Date(post.created).toLocaleDateString()}</p>
        </div>
      `;

      // Append the post element to the container
      postContainer.appendChild(postElement);
    });

    console.log("User-specific posts displayed successfully.");
  } catch (error) {
    console.error("Error fetching user posts: ", error);
    alert("Failed to fetch posts. Please check your connection and try again.");
  }
}

// Automatically display user posts when this script is loaded
displayUserPosts();

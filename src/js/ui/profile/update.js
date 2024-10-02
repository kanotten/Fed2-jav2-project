import { readUserPosts } from "../../api/profile/read.js";

export async function onUpdateProfile(event) {
  event.preventDefault();
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  if (!authToken || !username) {
    console.error("User is not authenticated or username is missing");
    return;
  }

  try {
    console.log(`Fetching posts for username: ${username}`);
    const response = await readUserPosts(username);
    const posts = response.data; // Extract posts from the data field
    console.log(`Posts fetched successfully. Number of posts: ${posts.length}`);

    // Log the structure of each post to see the author field
    console.log("Post structure sample:", posts[0]);

    // Check how the author is stored in each post
    const userPosts = posts.filter((post) => {
      console.log("Post author field:", post.author);
      return post.author === username;
    });
    console.log(
      `User-specific posts fetched successfully. Number of posts: ${userPosts.length}`,
    );

    // Clear any existing posts on the page
    let postContainer = document.getElementById("post-container");
    if (!postContainer) {
      postContainer = document.createElement("div");
      postContainer.id = "post-container";
      document.body.appendChild(postContainer);
    } else {
      postContainer.innerHTML = "";
    }

    // Create and append each post
    userPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "user-post";
      postElement.style.border = "1px solid #ccc";
      postElement.style.margin = "10px";
      postElement.style.padding = "10px";

      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;

      postContainer.appendChild(postElement);
    });

    console.log("User-specific posts displayed successfully.");
  } catch (error) {
    console.error("Error fetching user posts: ", error);
  }
}

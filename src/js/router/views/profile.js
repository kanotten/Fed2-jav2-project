// src/js/router/views/profile.js

import { authGuard } from "../../utilities/authGuard.js";
import { displayUserPosts } from "../../ui/profile/update.js";

// Ensure the user is authenticated
authGuard();

// Wait for the DOM to be fully loaded before executing the function
document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile page loaded and DOM fully ready.");
  displayUserPosts(); // Display the posts when the profile page loads
});

// src/js/api/profile/read.js

export async function readProfile(username) {
  const response = await fetch(`/api/profile/${username}`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}

export async function readProfiles(limit, page) {}

export async function readUserPosts(username) {
  // Fetch posts for the user
  const response = await fetch(`/api/posts?username=${username}`);
  if (!response.ok) throw new Error("Failed to fetch user posts");
  return response.json();
}

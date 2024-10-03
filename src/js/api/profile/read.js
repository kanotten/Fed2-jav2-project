// src/js/api/profile/read.js

export async function readUserPosts(username) {
  // Define the endpoint URL for fetching posts by profile
  const url = `https://v2.api.noroff.dev/social/profiles/${username}/posts`;
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  // Logging for debugging purposes
  console.log("API URL:", url);
  console.log("Authorization Header:", `Bearer ${authToken}`);
  console.log("X-Noroff-API-Key:", apiKey);

  // Make a GET request to the specified URL with necessary headers
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  // If the response is not successful, throw an error
  if (!response.ok) {
    throw new Error(
      `Failed to fetch user posts. Error: ${response.statusText}`,
    );
  }

  // Parse the response JSON and return the data
  const data = await response.json();
  console.log("API Response Data:", data);
  return data; // This will return posts from the /social namespace
}

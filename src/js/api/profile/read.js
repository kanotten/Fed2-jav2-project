export async function readUserPosts(username) {
  // Use the /social/profiles/<username>/posts endpoint
  const url = `https://v2.api.noroff.dev/social/profiles/${username}/posts`;
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  console.log("API URL:", url);
  console.log("Authorization Header:", `Bearer ${authToken}`);
  console.log("X-Noroff-API-Key:", apiKey);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user posts. Error: ${response.statusText}`,
    );
  }

  const data = await response.json();
  console.log("API Response Data:", data);
  return data; // This will return posts from the /social namespace
}

export async function readUserPosts(username) {
  const url = `https://v2.api.noroff.dev/social/profiles/${username}/posts`;
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

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

  return await response.json();
}

// src/js/api/post/read.js

export async function getPosts() {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const options = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  const response = await fetch(
    "https://v2.api.noroff.dev/social/posts",
    options
  );
  const data = await response.json();

  return data;
}

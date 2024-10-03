export async function getPosts(
  page = 1,
  limit = 10,
  search = "",
  sort = "created",
  tag = "",
  sortOrder = "desc",
) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const options = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  const url = `https://v2.api.noroff.dev/social/posts?limit=${limit}&page=${page}&q=${encodeURIComponent(
    search,
  )}&sort=${sort}&sortOrder=${sortOrder}&_tag=${tag}`;

  const response = await fetch(url, options);

  if (!response.ok) throw new Error("Feil ved henting av innlegg.");

  return await response.json();
}

export async function getSinglePost(postId) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const options = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts/${postId}`,
    options,
  );

  if (!response.ok) throw new Error("Feil ved henting av innlegg.");

  return await response.json();
}

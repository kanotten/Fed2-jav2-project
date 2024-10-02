// src/js/api/post/read.js

// Funksjon for å hente innlegg med støtte for søk, filtrering, sortering og paginering
export async function getPosts(
  page = 1,
  limit = 10,
  search = "",
  sort = "created",
  tag = "",
  sortOrder = "desc" // Ny parameter for sorteringsrekkefølge
) {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const options = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  // URL med parametere for søk, filtrering, sortering og paginering
  const url = `https://v2.api.noroff.dev/social/posts?limit=${limit}&page=${page}&q=${encodeURIComponent(
    search
  )}&sort=${sort}&sortOrder=${sortOrder}&_tag=${tag}`;
  console.log(`Fetching URL: ${url}`);

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${response.statusText}`);
    throw new Error("Feil ved henting av innlegg.");
  }

  const data = await response.json();
  return data; // Returnerer både innleggene og metadata for paginering
}

// Funksjon for å hente et enkelt innlegg basert på ID
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
    options
  );

  if (!response.ok) {
    throw new Error("Feil ved henting av innlegg.");
  }

  const data = await response.json();
  return data;
}

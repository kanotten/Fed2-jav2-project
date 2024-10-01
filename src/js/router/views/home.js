// src/js/router/views/home.js

import { getPosts } from "/src/js/api/post/read.js"; // Importér funksjonen som henter innlegg

document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const container = document.querySelector(".container");
  const postsContainer = document.querySelector(".post-list");

  // Hvis brukeren ikke er logget inn, vis en velkomstmelding
  if (!authToken || !apiKey) {
    container.innerHTML += `
      <p>Velkommen til hjemmesiden! Vennligst <a href="/auth/login/">logg inn</a> eller <a href="/auth/register/index.html">registrer deg</a> for å fortsette.</p>
    `;
  } else {
    // Hvis brukeren er logget inn, vis innleggene
    getPosts().then((posts) => {
      posts.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-card";

        postElement.innerHTML = `
        <a href="/post.html?id=${post.id}">
          <img src="${post.media?.url || ""}" alt="${
          post.media?.alt || "No image available"
        }">
          <h2>${post.title}</h2>
          <p>${post.body || "No description available"}</p>
          <p class="tags">Tags: ${post.tags.join(", ")}</p>
          <p class="date">Opprettet: ${new Date(
            post.created
          ).toLocaleDateString()}</p>
        </a>
      `;
        postsContainer.appendChild(postElement);
      });
    });
  }
});

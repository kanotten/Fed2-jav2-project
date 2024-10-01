// src/js/router/views/home.js

import { getPosts } from "/src/js/api/post/read.js"; // Importér funksjonen som henter innlegg

document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const container = document.querySelector(".container");

  // Hvis brukeren ikke er logget inn, vis en velkomstmelding
  if (!authToken || !apiKey) {
    container.innerHTML += `
      <p>Velkommen til hjemmesiden! Vennligst <a href="/auth/login/">logg inn</a> eller <a href="/auth/register/index.html">registrer deg</a> for å fortsette.</p>
    `;
  } else {
    // Hvis brukeren er logget inn, vis innleggene
    getPosts().then((posts) => {
      const postsContainer = document.createElement("div");
      postsContainer.className = "posts-container";

      posts.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <p>Tags: ${post.tags.join(", ")}</p>
          <p>Opprettet: ${new Date(post.created).toLocaleDateString()}</p>
        `;
        postsContainer.appendChild(postElement);
      });

      container.appendChild(postsContainer);
    });
  }
});

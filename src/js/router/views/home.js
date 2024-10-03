// src/js/router/views/home.js

import { getPosts } from "/src/js/api/post/read.js";

let currentPage = 1;
const postsPerPage = 10;

document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const container = document.querySelector(".container");
  const postsContainer = document.querySelector(".post-list");
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");
  const tagFilter = document.querySelector("#tagFilter");
  const sortOrderSelect = document.querySelector("#sortOrderSelect");

  if (!authToken || !apiKey) {
    container.innerHTML += `
      <p>Velkommen til hjemmesiden! Vennligst <a href="/auth/login/">logg inn</a> eller <a href="/auth/register/index.html">registrer deg</a> for å fortsette.</p>
    `;
  } else {
    loadPosts(currentPage, postsPerPage);
  }

  function loadPosts(page, limit) {
    const searchQuery = searchInput.value.trim();
    const selectedSort =
      sortSelect.value === "created_asc" ? "created" : "created";
    const sortOrder = sortSelect.value === "created_asc" ? "asc" : "desc";
    const selectedTag = searchQuery ? "" : tagFilter.value;

    getPosts(page, limit, searchQuery, selectedSort, selectedTag, sortOrder)
      .then((response) => {
        postsContainer.innerHTML = "";

        const resetButton = document.querySelector(".reset-filter");
        if (selectedTag && !resetButton) {
          const newResetButton = document.createElement("button");
          newResetButton.className = "reset-filter";
          newResetButton.textContent = "Tilbakestill filtrering";
          newResetButton.onclick = () => {
            tagFilter.value = "";
            loadPosts(1, postsPerPage);
          };
          postsContainer.appendChild(newResetButton);
        } else if (!selectedTag && resetButton) {
          resetButton.remove();
        }

        if (response.data.length > 0) {
          const allTags = [
            ...new Set(response.data.flatMap((post) => post.tags)),
          ];
          tagFilter.innerHTML = allTags
            .map((tag) => `<option value="${tag}">${tag}</option>`)
            .join("");

          response.data.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "post-card";
            postElement.innerHTML = `
              <a href="/post.html?id=${post.id}">
                <img src="${post.media?.url || ""}" alt="${post.media?.alt || "No image available"}">
                <h2>${post.title}</h2>
                <p>${post.body || "No description available"}</p>
                <p class="tags">Tags: ${post.tags.join(", ")}</p>
                <p class="date">Opprettet: ${new Date(post.created).toLocaleDateString()}</p>
              </a>
            `;
            postsContainer.appendChild(postElement);
          });
        } else {
          postsContainer.innerHTML = "<p>Ingen innlegg funnet.</p>";
        }

        setupPagination(response.meta);
      })
      .catch(() => {
        postsContainer.innerHTML = "<p>Feil ved henting av innlegg.</p>";
      });
  }

  function setupPagination(meta) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    if (!meta.isFirstPage) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "Forrige";
      prevButton.addEventListener("click", () => {
        currentPage--;
        loadPosts(currentPage, postsPerPage);
      });
      paginationContainer.appendChild(prevButton);
    }

    if (!meta.isLastPage) {
      const nextButton = document.createElement("button");
      nextButton.textContent = "Neste";
      nextButton.addEventListener("click", () => {
        currentPage++;
        loadPosts(currentPage, postsPerPage);
      });
      paginationContainer.appendChild(nextButton);
    }
  }

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      loadPosts(1, postsPerPage);
    }
  });

  sortSelect.innerHTML = `
    <option value="created">Sorter etter dato (nyeste først)</option>
    <option value="created_asc">Sorter etter dato (eldste først)</option>
  `;

  sortSelect.addEventListener("change", () => loadPosts(1, postsPerPage));
  tagFilter.addEventListener("change", () => loadPosts(1, postsPerPage));
  sortOrderSelect?.addEventListener("change", () => loadPosts(1, postsPerPage));
});

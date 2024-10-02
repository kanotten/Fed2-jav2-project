import { getPosts } from "/src/js/api/post/read.js"; // Importér funksjonen som henter innlegg

let currentPage = 1;
const postsPerPage = 10; // Antall innlegg per side

document.addEventListener("DOMContentLoaded", () => {
  const authToken = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const container = document.querySelector(".container");
  const postsContainer = document.querySelector(".post-list");
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");
  const tagFilter = document.querySelector("#tagFilter");

  // Hvis brukeren ikke er logget inn, vis en velkomstmelding
  if (!authToken || !apiKey) {
    container.innerHTML += `
      <p>Velkommen til hjemmesiden! Vennligst <a href="/auth/login/">logg inn</a> eller <a href="/auth/register/index.html">registrer deg</a> for å fortsette.</p>
    `;
  } else {
    loadPosts(currentPage, postsPerPage);
  }

  // Hent og vis innlegg, med støtte for søk, filtrering, sortering og paginering
  function loadPosts(page, limit) {
    const searchQuery = searchInput.value;
    const selectedSort = sortSelect.value;
    const selectedTag = tagFilter.value;

    console.log(
      `Laster innlegg med parametre: Side: ${page}, Begrensning: ${limit}, Søk: ${searchQuery}, Sortering: ${selectedSort}, Tag: ${selectedTag}`
    );

    getPosts(page, limit, searchQuery, selectedSort, selectedTag)
      .then((response) => {
        postsContainer.innerHTML = ""; // Fjern eksisterende innlegg
        response.data.forEach((post) => {
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

        setupPagination(response.meta); // Sett opp paginering basert på metadata
      })
      .catch((error) => {
        console.error("Feil ved henting av innlegg:", error);
      });
  }

  // Funksjon for å sette opp pagineringselementer
  function setupPagination(meta) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Tøm eksisterende pagineringselementer

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

  // Event Listeners for søk, sortering og filtrering
  searchInput.addEventListener("input", () => loadPosts(1, postsPerPage));
  sortSelect.addEventListener("change", () => loadPosts(1, postsPerPage));
  tagFilter.addEventListener("change", () => loadPosts(1, postsPerPage));
});

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
  const sortOrderSelect = document.querySelector("#sortOrderSelect"); // Nytt felt for sorteringsrekkefølge

  // Hvis brukeren ikke er logget inn, vis en velkomstmelding
  if (!authToken || !apiKey) {
    container.innerHTML += `
      <p>Velkommen til hjemmesiden! Vennligst <a href="/auth/login/">logg inn</a> eller <a href="/auth/register/index.html">registrer deg</a> for å fortsette.</p>
    `;
  } else {
    loadPosts(currentPage, postsPerPage);
  }

  // Funksjon for å laste innlegg
  function loadPosts(page, limit) {
    const searchQuery = searchInput.value.trim(); // Sjekk at det ikke er tomme mellomrom
    let selectedSort =
      sortSelect.value === "created_asc" ? "created" : "created";
    let sortOrder = sortSelect.value === "created_asc" ? "asc" : "desc";

    const selectedTag = searchQuery ? "" : tagFilter.value; // Ignorer tag hvis det er et søk

    console.log(
      `Laster innlegg med parametre: Side: ${page}, Begrensning: ${limit}, Søk: ${searchQuery}, Sortering: ${selectedSort}, Tag: ${selectedTag}, Sorteringsrekkefølge: ${sortOrder}`
    );

    getPosts(page, limit, searchQuery, selectedSort, selectedTag, sortOrder)
      .then((response) => {
        postsContainer.innerHTML = ""; // Fjern eksisterende innlegg

        // Skjul tilbakestill-knappen hvis ingen tag er valgt
        const resetButton = document.querySelector(".reset-filter");
        if (selectedTag) {
          if (!resetButton) {
            const newResetButton = document.createElement("button");
            newResetButton.className = "reset-filter";
            newResetButton.textContent = "Tilbakestill filtrering";
            newResetButton.onclick = () => {
              tagFilter.value = "";
              loadPosts(1, postsPerPage);
            };
            postsContainer.appendChild(newResetButton);
          }
        } else if (resetButton) {
          resetButton.remove(); // Fjern knappen hvis ingen tag er valgt
        }

        if (response.data.length > 0) {
          // Log alle tags for å sjekke hvilke som er tilgjengelige
          console.log(
            "Available tags: ",
            response.data.map((post) => post.tags)
          );

          // Vis alle tilgjengelige tags i filtreringsmenyen
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
        } else {
          postsContainer.innerHTML = "<p>Ingen innlegg funnet.</p>";
        }

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

  // Søk kun når brukeren trykker 'Enter'
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const searchQuery = searchInput.value.trim();
      console.log("Søker etter: ", searchQuery); // Sjekk søkestrengen her
      loadPosts(1, postsPerPage);
    }
  });

  // Event Listeners for sortering, filtrering og sorteringsrekkefølge
  sortSelect.innerHTML = `
    <option value="created">Sorter etter dato (nyeste først)</option>
    <option value="created_asc">Sorter etter dato (eldste først)</option>
  `; // Fjern andre alternativer

  sortSelect.addEventListener("change", () => loadPosts(1, postsPerPage));
  tagFilter.addEventListener("change", () => loadPosts(1, postsPerPage));
  if (sortOrderSelect) {
    sortOrderSelect.addEventListener("change", () =>
      loadPosts(1, postsPerPage)
    );
  }
});

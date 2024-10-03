let isUpdating = false; // Variabel for å spore om en oppdatering pågår

export async function updatePost(postId) {
  // Sjekk om en oppdatering pågår
  if (isUpdating) {
    return; // Hvis en oppdatering allerede er i gang, vent til den er ferdig
  }

  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey"); // Hent API-nøkkel fra localStorage

  // Sjekk om token og apiKey finnes, hvis ikke gi en melding og returner
  if (!token || !apiKey) {
    alert("Du må være logget inn for å oppdatere en post.");
    return;
  }

  const updatedPost = {
    title: document.getElementById("title").value,
    body: document.getElementById("content").value,
    tags: document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim()),
    media: {
      url: document.getElementById("mediaUrl").value,
      alt: document.getElementById("mediaAlt").value,
    },
  };

  // Merk at oppdatering er i gang
  isUpdating = true;

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`, // Bruk postId direkte i URL-en
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Sørg for å sende token riktig
          "X-Noroff-API-Key": apiKey, // Legg til API-nøkkel i headeren
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }
    );

    if (response.ok) {
      alert("Posten ble oppdatert!");

      // Dynamisk oppdater dropdown med ny tittel
      const dropdown = document.getElementById("postIdInput");
      const optionToUpdate = dropdown.querySelector(
        `option[value="${postId}"]`
      );
      if (optionToUpdate) {
        optionToUpdate.textContent = updatedPost.title;
      }

      // Tøm skjemaet etter oppdatering
      document.forms.editPost.reset();
    } else {
      console.error("Oppdatering mislyktes. Status:", response.status);
      if (response.status === 401) {
        alert(
          "Du har ikke tilgang til å oppdatere denne posten. Vennligst logg inn på nytt."
        );
      } else {
        alert("Kunne ikke oppdatere posten. Prøv igjen.");
      }
    }
  } catch (error) {
    console.error("Feil ved oppdatering av post:", error);
  } finally {
    // Tillat ny oppdatering etter at den nåværende er fullført
    isUpdating = false;
  }
}

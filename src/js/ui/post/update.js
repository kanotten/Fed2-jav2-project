let isUpdating = false; // Variabel for å spore om en oppdatering pågår

export async function updatePost(postId) {
  // Sjekk om en oppdatering pågår
  if (isUpdating) {
    // alert("datering pågår, vennligst vent.");
    return;
  }

  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

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
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
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
      alert("Kunne ikke oppdatere posten.");
    }
  } catch (error) {
    console.error("Feil ved oppdatering av post:", error);
  } finally {
    // Tillat ny oppdatering etter at den nåværende er fullført
    isUpdating = false;
  }
}

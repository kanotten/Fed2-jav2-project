let isDeleted = false; // Variabel for å spore om posten er slettet

export async function deletePost(postId) {
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

  if (isDeleted) {
    // Sjekk om posten allerede er slettet
    alert("Posten er allerede slettet.");
    return; // Stopp funksjonen hvis posten allerede er slettet
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      alert("Posten ble slettet!");

      // Sett isDeleted til true etter suksessfull sletting
      isDeleted = true;

      // Fjern posten fra dropdown
      const dropdown = document.getElementById("postIdInput");
      const optionToDelete = dropdown.querySelector(
        `option[value="${postId}"]`
      );
      if (optionToDelete) {
        dropdown.removeChild(optionToDelete);
      }

      // Tøm skjemaet etter suksessfull sletting
      document.forms.editPost.reset();

      // Deaktiver sletteknappen
      document.getElementById("deleteBtn").disabled = true;

      // Returner for å stoppe videre utførelse
      return;
    } else {
      console.error("Sletting mislyktes. Status:", response.status);
      alert("Kunne ikke slette posten.");
    }
  } catch (error) {
    console.error("Feil ved sletting av post:", error);
  }
}

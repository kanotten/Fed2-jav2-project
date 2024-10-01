let isDeleting = false; // Variabel for å spore om en sletting er i gang

export async function deletePost(postId) {
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

  if (isDeleting) {
    alert("En sletting er allerede i gang.");
    return; // Stopp hvis en sletting allerede pågår
  }

  isDeleting = true; // Merk at en sletting pågår

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

      // Fjern posten fra dropdown
      const dropdown = document.getElementById("postIdInput");
      const optionToDelete = dropdown.querySelector(
        `option[value="${postId}"]`
      );
      if (optionToDelete) {
        dropdown.removeChild(optionToDelete);
      }

      // Tøm skjemaet etter sletting
      document.forms.editPost.reset();
    } else {
      console.error("Sletting mislyktes. Status:", response.status);
      alert("Kunne ikke slette posten.");
    }
  } catch (error) {
    console.error("Feil ved sletting av post:", error);
  } finally {
    // Sett isDeleting tilbake til false etter slettingen
    isDeleting = false;

    // Aktiver sletteknappen igjen
    document.getElementById("deleteBtn").disabled = false;
  }
}

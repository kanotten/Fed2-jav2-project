export async function deletePost(postId) {
  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("name");

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
      // Oppdater siden eller redirect til annen side
    } else {
      console.error("Sletting mislyktes. Status:", response.status);
      alert("Kunne ikke slette posten.");
    }
  } catch (error) {
    console.error("Feil ved sletting av post:", error);
  }
}

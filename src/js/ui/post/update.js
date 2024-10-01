// Oppdater en post basert på ID
export async function updatePost(id) {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  const postData = {
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

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (response.ok) {
      const updatedPost = await response.json();
      console.log("Post oppdatert:", updatedPost);
      alert("Posten ble oppdatert!");
    } else {
      console.error("Feil ved oppdatering av post:", response.statusText);
    }
  } catch (error) {
    console.error("Feil:", error);
  }
}

// Oppdatere post ved innsending av skjema
document.forms.editPost.addEventListener("submit", function (event) {
  event.preventDefault();
  const postId = document.getElementById("postIdInput").value;
  updatePost(postId); // Oppdater post
});

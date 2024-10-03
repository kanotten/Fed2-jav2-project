let isUpdating = false;

export async function updatePost(postId) {
  if (isUpdating) return;

  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!token || !apiKey) return;

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

  isUpdating = true;

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      },
    );

    if (response.ok) {
      const dropdown = document.getElementById("postIdInput");
      const optionToUpdate = dropdown.querySelector(
        `option[value="${postId}"]`,
      );
      if (optionToUpdate) optionToUpdate.textContent = updatedPost.title;

      document.forms.editPost.reset();
    }
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    isUpdating = false;
  }
}

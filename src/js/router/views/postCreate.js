// src/js/ui/post/create.js

export async function onCreatePost(event) {
  event.preventDefault();

  const postData = {
    title: event.target.title.value,
    body: event.target.content.value,
    tags: event.target.tags.value.split(",").map((tag) => tag.trim()),
    media: {
      url:
        event.target.mediaUrl.value ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG",
      alt: event.target.mediaAlt.value || "Default alt text",
    },
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      await response.json();
      alert("Posten ble opprettet suksessfullt!");
      event.target.reset();
    } else {
      alert(
        "Feil: " +
          ((await response.json()).errors[0]?.message || "Uventet feil."),
      );
    }
  } catch (error) {
    alert("Det oppstod en uventet feil.");
  }
}

document.forms.createPost.addEventListener("submit", onCreatePost, {
  once: true,
});

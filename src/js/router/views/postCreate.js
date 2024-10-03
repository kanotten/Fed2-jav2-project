console.log("postCreate.js er lastet inn");

export async function onCreatePost(event) {
  event.preventDefault();
  console.log("Skjemaet ble sendt inn");

  // Hent verdier fra skjemaet
  const title = event.target.title.value;
  const body = event.target.content.value; // Få body fra textarea
  const tags = event.target.tags.value.split(",").map((tag) => tag.trim()); // Hent og splitt tags
  const mediaUrl =
    event.target.mediaUrl.value ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG";
  const mediaAlt = event.target.mediaAlt.value || "Default alt text";

  // Data som skal sendes
  const postData = {
    title,
    body,
    tags, // Inkluder tags
    media: {
      url: mediaUrl,
      alt: mediaAlt,
    },
  };

  console.log("Data som skal sendes:", postData);

  try {
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    console.log("Bruker token og apiKey:", { token, apiKey });

    const response = await fetch(`https://v2.api.noroff.dev/social/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    console.log("Respons fra serveren:", response); // Logg responsen

    if (response.ok) {
      const result = await response.json();
      console.log("Post opprettet:", result);
      alert("Posten ble opprettet suksessfullt!");
      event.target.reset(); // Tøm skjemaet
      return; // Avslutt funksjonen etter en suksessfull post
    } else {
      const errorData = await response.json();
      console.error("Feil ved oppretting av innlegg:", errorData);
      alert("Feil: " + (errorData.errors[0]?.message || "Uventet feil."));
    }
  } catch (error) {
    console.error("Uventet feil:", error);
    alert("Det oppstod en uventet feil.");
  }
}

// Fjern eventuell tidligere event listener og legg til ny event listener
const createForm = document.forms.createPost;
createForm.removeEventListener("submit", onCreatePost);
createForm.addEventListener("submit", onCreatePost, { once: true });

import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

// set the user name
const name = localStorage.getItem("name");
document.getElementById("profile-name-header").innerText = name;

// fetch the posts
try {
    // copied from src/js/router/views/postEdit.js 
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");
    const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

    if (response.ok) {
        const posts = await response.json();
        const dropdown = document.getElementById("itacud-posts");
        dropdown.innerHTML = "";

        posts.data.forEach((post) => {
            const option = document.createElement("option");
            option.value = post.id;
            option.textContent = post.title;
            dropdown.appendChild(option);
        });
    } else {
        console.error("Feil ved henting av poster:", response.statusText);
    }
} catch (error) {
    console.error("Feil:", error);
}

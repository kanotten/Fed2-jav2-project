import { register } from "/src/js/api/auth/register.js";

const form = document.forms.register;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const bio = form.bio.value;
  const avatarUrl = form.avatar.value;
  const bannerUrl = form.banner.value;

  const data = { name, email, password, bio: bio || "" };

  if (avatarUrl) {
    data.avatar = { url: avatarUrl };
  }

  if (bannerUrl) {
    data.banner = { url: bannerUrl };
  }

  try {
    const result = await register(data);
    if (result) {
      alert("Registration successful!");
      window.location.href = "/auth/login/index.html";
    }
  } catch (error) {
    alert("Error during registration.");
  }
});

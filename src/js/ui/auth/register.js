import { register } from "/src/js/api/auth/register.js"; // Importer register-funksjonen fra API-et

const form = document.forms.register;

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Forhindre at siden lastes inn på nytt ved form-innsending

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const bio = form.bio.value;
  const avatarUrl = form.avatar.value;
  const bannerUrl = form.banner.value;

  // Forbered dataobjektet
  const data = {
    name,
    email,
    password,
    bio: bio || "",
  };

  // Bare legg til avatar og banner hvis de har gyldige URL-er
  if (avatarUrl) {
    data.avatar = { url: avatarUrl }; // Legger til avatar hvis URL er gitt
  }

  if (bannerUrl) {
    data.banner = { url: bannerUrl }; // Legger til banner hvis URL er gitt
  }

  console.log("Sending følgende data til API:", data); // Logging av dataene

  try {
    const result = await register(data);
    if (result) {
      alert("Registration successful!");
      window.location.href = "/auth/login/index.html"; // Omdiriger til innloggingssiden etter registrering
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
});

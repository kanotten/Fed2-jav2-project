export async function register({ name, email, password, bio, banner, avatar }) {
  const data = {
    name,
    email,
    password,
    bio: bio || "", // Valgfritt
    avatar: {
      url: avatar.url || "", // Valgfritt
      alt: "My avatar alt text", // Standardverdi
    },
    banner: {
      url: banner.url || "", // Valgfritt
      alt: "My banner alt text", // Standardverdi
    },
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Registration failed:", errorResponse);
      throw new Error(
        `Error: ${response.status} - ${errorResponse.errors
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}

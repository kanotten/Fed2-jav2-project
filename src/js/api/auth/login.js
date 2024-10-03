export async function login({ email, password }) {
  const data = {
    email,
    password,
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorResponse.errors[0].message}`,
      );
    }

    const result = await response.json();

    return {
      accessToken: result.data.accessToken,
      name: result.data.name,
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

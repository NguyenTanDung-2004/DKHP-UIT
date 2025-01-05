const API_URL = process.env.REACT_APP_API_URL;
const LOGIN_ENDPOINT = "/user/login";
const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}${LOGIN_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export { login };

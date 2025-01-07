const API_URL = process.env.REACT_APP_API_URL;

const get = async () => {
  try {
    const response = await fetch(`${API_URL}/registration-periods`);
    if (!response.ok) {
      throw new Error("Failed to registration period");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const response = await fetch(`${API_URL}/registration-periods/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to create registration period"
      );
    }

    if (response.status === 201) return true;
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { get, create };

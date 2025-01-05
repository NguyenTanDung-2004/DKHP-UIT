import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const getAllClasses = async () => {
  try {
    const response = await fetch(`${API_URL}/class/getAllClass`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Get all class failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getRegisteredClasses = async () => {
  const token = Cookies.get("jwtToken");
  console.log(token);
  try {
    const response = await fetch(
      `${API_URL}/student/getRegisteredClasses?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Get registered classes failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getCTDT = async (hocKy) => {
  try {
    const response = await fetch(`${API_URL}/CTDT/getCTDT?hocKy=${hocKy}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Get CTDT failed");
    }
    return await response.json(); // Trả về toàn bộ response
  } catch (error) {
    throw error;
  }
};

const dkhp = async (classIds) => {
  const token = Cookies.get("jwtToken");
  try {
    const response = await fetch(`${API_URL}/student/dkhp?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classIds),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Register classes failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const undkhp = async (classIds) => {
  const token = Cookies.get("jwtToken");
  try {
    const response = await fetch(`${API_URL}/student/undkhp?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classIds),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unregister classes failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export { getAllClasses, getRegisteredClasses, getCTDT, dkhp, undkhp };

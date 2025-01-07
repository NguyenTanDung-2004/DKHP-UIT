import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const createStaff = async (staffData) => {
  try {
    const response = await fetch(`${API_URL}/admin/createStaffAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: staffData.name,
        email: staffData.email,
        flagAdmin: staffData.role === "admin" ? 1 : 0,
        account: staffData.username,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create staff");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const deleteList = async (ids) => {
  try {
    const response = await fetch(`${API_URL}/staff/deleteList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete list staffs");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const editStaff = async (staffData) => {
  try {
    const response = await fetch(`${API_URL}/staff/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: staffData.id,
        fullName: staffData.name,
        email: staffData.email,
        account: staffData.username,
        flagAdmin: staffData.role === "admin" ? 1 : 0,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to edit staff");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getAllStaff = async () => {
  try {
    const response = await fetch(`${API_URL}/staff/list`);
    if (!response.ok) {
      throw new Error("Failed to fetch all list");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getName = async () => {
  try {
    const userInfo = Cookies.get("userInfo");
    if (!userInfo) {
      throw new Error("userInfo not found in cookie");
    }

    const response = await fetch(`${API_URL}/staff/name?id=${userInfo}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch staff name");
    }
    const name = await response.text();
    return name;
  } catch (error) {
    throw error;
  }
};

export { createStaff, deleteList, editStaff, getAllStaff, getName };

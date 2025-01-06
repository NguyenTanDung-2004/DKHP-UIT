const API_URL = process.env.REACT_APP_API_URL;

const addClassNonTH = async (classData) => {
  try {
    const response = await fetch(`${API_URL}/class/addClassNonTH`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create class (Non TH)");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const addClassWithInPractice = async (classData) => {
  try {
    const response = await fetch(`${API_URL}/class/addClassWithInPractice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create class (With TH)");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getGiangVienList = async () => {
  try {
    const response = await fetch(`${API_URL}/giangvien/listGiangVien`);
    if (!response.ok) {
      throw new Error("Failed to fetch giang vien list");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getRoomList = async () => {
  try {
    const response = await fetch(`${API_URL}/room/listRoomName`);
    if (!response.ok) {
      throw new Error("Failed to fetch room list");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { addClassNonTH, addClassWithInPractice, getGiangVienList, getRoomList };

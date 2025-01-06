const API_URL = process.env.REACT_APP_API_URL;

const getAllStudent = async () => {
  try {
    const response = await fetch(`${API_URL}/student/getAllStudent`);
    if (!response.ok) {
      throw new Error("Failed to fetch student list");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const deleteListStudent = async (mssvList) => {
  try {
    const response = await fetch(`${API_URL}/student/deleteListStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mssvList),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete list students");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const createStudent = async (studentData) => {
  try {
    const response = await fetch(`${API_URL}/student/create1Student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...studentData,
        password: "",
        code: "",
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create student");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const editStudent = async (studentData) => {
  try {
    const response = await fetch(`${API_URL}/student/editStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...studentData,
        password: "",
        code: "",
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to edit student");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getDetailStudent = async (mssv) => {
  try {
    const response = await fetch(
      `${API_URL}/student/getDetailStudent?mssv=${mssv}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch student details");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const createAccount = async (mssvList) => {
  try {
    const response = await fetch(`${API_URL}/student/createStudentAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mssvList),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create account students");
    }

    const sseUrl = await response.text();
    return { url: sseUrl };
  } catch (error) {
    throw error;
  }
};

export {
  getAllStudent,
  deleteListStudent,
  createStudent,
  editStudent,
  getDetailStudent,
  createAccount,
};

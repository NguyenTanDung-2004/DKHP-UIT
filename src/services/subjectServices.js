const API_URL = process.env.REACT_APP_API_URL;

const getAllSubjects = async () => {
  try {
    const response = await fetch(`${API_URL}/subject/getSubjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Get all subjects failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getAllOpenSubjects = async () => {
  try {
    const response = await fetch(`${API_URL}/openSubject/getAllOpenSubject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Get all open subjects failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getAllIdOpenSubjects = async () => {
  try {
    const response = await fetch(`${API_URL}/openSubject/getAllIdOpenSubject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Get all id of open subjects failed"
      );
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const addListOpenSubject = async (listSubjectId) => {
  try {
    const response = await fetch(`${API_URL}/openSubject/addListOpenSubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listSubjectId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to add list of open subjects"
      );
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const deleteOpenSubject = async (listSubjectId) => {
  try {
    const response = await fetch(`${API_URL}/openSubject/deleteOpenSubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listSubjectId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete open subjects");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getAllMaMonHoc = async () => {
  try {
    const response = await fetch(`${API_URL}/subject/getAllMaMonHoc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Get all ma mon hoc failed");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const createSubject = async (subjectData) => {
  try {
    const response = await fetch(`${API_URL}/subject/create1Subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create subject");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const editSubject = async (id, subjectData) => {
  try {
    const response = await fetch(`${API_URL}/subject/editSubject?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to edit subject");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const deleteSubject = async (maMonHoc, maKhoa) => {
  try {
    const response = await fetch(
      `${API_URL}/subject/delete1Subject?maMonHoc=${maMonHoc}&maKhoa=${maKhoa}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete subject");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export {
  getAllSubjects,
  getAllOpenSubjects,
  getAllIdOpenSubjects,
  addListOpenSubject,
  deleteOpenSubject,
  getAllMaMonHoc,
  createSubject,
  editSubject,
  deleteSubject,
};

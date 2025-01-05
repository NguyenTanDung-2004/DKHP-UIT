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

export {
  getAllSubjects,
  getAllOpenSubjects,
  getAllIdOpenSubjects,
  addListOpenSubject,
};

const API_URL = process.env.REACT_APP_API_URL;

const getStatisticsStaff = async () => {
  try {
    const response = await fetch(`${API_URL}/statistics/staff`);
    if (!response.ok) {
      throw new Error("Failed to fetch statistic for staff");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getStatisticsAdmin = async () => {
  try {
    const response = await fetch(`${API_URL}/statistics/admin`);
    if (!response.ok) {
      throw new Error("Failed to fetch statistic for admin");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { getStatisticsAdmin, getStatisticsStaff };

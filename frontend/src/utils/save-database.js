import axios from 'axios';

export const saveCurrentDatabase = async (apiUrl) => {
  try {
    const response = await axios.post(`${apiUrl}/databases`);
    alert("Database saved successfully!");
    return response.data;
  } catch (error) {
    console.error("Error saving the database:", error);
    throw error;
  }
};

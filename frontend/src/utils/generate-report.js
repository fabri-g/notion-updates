import axios from 'axios';
import { simplifyNotionData } from './simplifyNotionData';

export const generateReport = async (apiUrl, selectedFrom, selectedTo) => {
  if (!selectedFrom || !selectedTo) {
    alert('Please select both start and end timestamps.');
    return;
  }

  try {
    const [fromResponse, toResponse] = await Promise.all([
      axios.get(`${apiUrl}/databases/by-id/${selectedFrom}`),
      axios.get(`${apiUrl}/databases/by-id/${selectedTo}`)
    ]);

    const simplifiedOldSnapshot = fromResponse.data.responseData.results.map(simplifyNotionData);
    const simplifiedNewSnapshot = toResponse.data.responseData.results.map(simplifyNotionData);

    const reportResponse = await axios.post(`${apiUrl}/gpt/analysis`, {
      oldSnapshot: simplifiedOldSnapshot,
      newSnapshot: simplifiedNewSnapshot
    });

    return reportResponse.data.report;
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};

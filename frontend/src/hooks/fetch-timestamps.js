import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTimestamps = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/databases/timestamps`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);

        window.alert(`Error fetching database timestamps: ${error.message}`);
      });
  }, [apiUrl]);

  return { loading, data, error };
};

export default useFetchTimestamps;

import { useState, useEffect, useCallback } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Fetching URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      console.log('✅ Data received:', result);
      setData(result);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message || 'Error al obtener los datos');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

export default useFetch;
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message);
      message.error(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, loading, error, refetch };
};
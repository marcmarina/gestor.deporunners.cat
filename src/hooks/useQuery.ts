import { useCallback, useEffect, useState } from 'react';
import { http } from 'services';

export const useQuery = (path: string) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  const fetchData = useCallback(async () => {
    try {
      const res = await http.get(path);
      setData(res.data);
    } catch (err) {
      if (error.response) {
        setError(err.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [path, error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
  };
};

export default useQuery;

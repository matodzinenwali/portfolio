import { useEffect, useState, useCallback } from 'react';

export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let cancelled = false;
    setStatus('loading');
    fetchFn()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => load(), [load]);

  return { data, status, error, refetch: load };
}

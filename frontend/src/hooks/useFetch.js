import { useEffect, useState, useCallback, useRef } from 'react';

export function useFetch(fetchFn) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  const [revision, setRevision] = useState(0);
  const requestId = useRef(0);

  const refetch = useCallback(() => {
    requestId.current += 1;
    setRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const currentRequest = ++requestId.current;
    Promise.resolve()
      .then(() => {
        if (cancelled || currentRequest !== requestId.current) return;
        setStatus('loading');
        setError(null);
        return fetchFn();
      })
      .then((result) => {
        if (cancelled || currentRequest !== requestId.current) return;
        setData(result);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled || currentRequest !== requestId.current) return;
        setError(err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [fetchFn, revision]);

  return { data, status, error, refetch };
}

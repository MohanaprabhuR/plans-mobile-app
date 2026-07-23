import { useCallback, useEffect, useRef, useState } from "react";

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseApiOptions = {
  /** When false, skip fetching and resolve to idle (not loading). Default true. */
  enabled?: boolean;
};

/**
 * Runs an async API function and tracks loading/error/data state.
 * `fetcher` is re-invoked whenever `deps` change.
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  options: UseApiOptions = {},
): ApiState<T> & { refetch: () => void } {
  const enabled = options.enabled ?? true;
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });
  const requestIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const requestId = ++requestIdRef.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : "Something went wrong",
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo -- deps forwarded from caller
  }, [...deps, enabled]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refetch: load };
}

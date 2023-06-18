import { useEffect } from 'react';

const useDebounceCallback = (callback: () => Promise<void>, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};

export default useDebounceCallback;

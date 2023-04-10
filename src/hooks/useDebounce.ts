import { useEffect } from 'react';

const useDebounce = (callback: () => Promise<void>, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};

export default useDebounce;

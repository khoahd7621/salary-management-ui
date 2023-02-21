import { useState, useEffect } from 'react';

// This hook takes a string (value) and a delay (in ms) as parameters
// It returns debouncedValue, which will update with value after the specified delay
export const useDebounced = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
};

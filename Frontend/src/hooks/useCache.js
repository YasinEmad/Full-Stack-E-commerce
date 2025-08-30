import { useState, useEffect } from 'react';

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useCache(key, initialData) {
  const [data, setData] = useState(() => {
    try {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          return data;
        }
        // Clear expired cache
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    return initialData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }, [key, data]);

  return [data, setData];
}

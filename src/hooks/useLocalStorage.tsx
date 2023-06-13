import { useState } from "react";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): readonly [T, (v: T | ((v: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);

    localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [storedValue, setValue] as const;
};

// hooks/useDebounce.ts
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

// Optional: Install lodash.debounce if needed
// npm install lodash.debounce

// import debounce from 'lodash.debounce';

// const handleSearchChange = debounce((value: string) => {
//   setSearchTerm(value);
//   setCurrentPage(0);
// }, 300); // 300ms delay

// <input
//   type="search"
//   className={styles.searchInput}
//   placeholder="Search..."
//   value={searchTerm}
//   onChange={(e) => handleSearchChange(e.target.value)}
// />

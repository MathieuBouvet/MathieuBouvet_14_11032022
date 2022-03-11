import { useState, useEffect } from "react";

function useLocalStorage(storageKey) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    // initialize state from storage
    if (data === undefined) {
      const dataFromStorage = localStorage.getItem(storageKey);
      const parsedData = JSON.parse(dataFromStorage);
      setData(parsedData);
    }
  }, [storageKey, data]);

  useEffect(() => {
    // synchronize state with storage
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [storageKey, data]);

  return [data, setData];
}

export default useLocalStorage;

import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await fetch(url, { method: "get" });
        const resData = await res.json();
        setData(resData);
      } catch (error) {
        setError(error.error);
      }
    })();
  }, [url]);

  return [data, error];
}

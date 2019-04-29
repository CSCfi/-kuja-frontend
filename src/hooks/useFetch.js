import { useEffect } from "react";

export default function useFetch(url, onSuccess, onError) {
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => ({ type: onSuccess, payload: data }))
      .catch(err => ({ type: onError, payload: err }));
  }, []);
}

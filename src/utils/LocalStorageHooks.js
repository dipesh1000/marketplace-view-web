import { useState } from "react";

export function useLocalStorage(localItem) {
  const [local, setState] = useState(
    JSON.parse(localStorage.getItem(localItem))
  );

  function setLocal(newItem) {
    localStorage.setItem(localItem, JSON.stringify(newItem));
    setState(newItem);
  }
  return [local, setLocal];
}

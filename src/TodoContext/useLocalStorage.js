import { useEffect, useState } from "react";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setInterval(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify([]));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }, 1);
  });

  const saveItem = (newItems) => {
    localStorage.setItem(itemName, JSON.stringify(newItems));
    setItem(newItems);
  };

  return { loading, error, item, saveItem };
}

export { useLocalStorage };

// let defaultTodos = [
//   { id: 1, text: "Cortar cebolla", completed: true },
//   { id: 2, text: "Tomar curso de intro a react.js", completed: false },
//   { id: 3, text: "Llorar con la llorona", completed: true },
//   { id: 4, text: "Lalalala", completed: false },
//   { id: 5, text: "pepepep", completed: false },
// ];

// localStorage.setItem("TODOS_V1", JSON.stringify(defaultTodos));
// localStorage.removeItem("TODOS_v1");

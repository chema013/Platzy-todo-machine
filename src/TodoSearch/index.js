import React, { useContext } from "react";

import { TodoContext } from "../TodoContext";
import "./TodoSearch.css";

const TodoSearch = () => {
  const { setSearchValue } = useContext(TodoContext);

  const filteredTodos = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Cortar Cebolla"
      onChange={(event) => filteredTodos(event)}
    />
  );
};

export { TodoSearch };

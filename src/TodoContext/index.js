import React from "react";
import { createContext } from "react";

import { useLocalStorage } from "./useLocalStorage";

const TodoContext = createContext();
function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [...todos].filter((todo) => {
    if (todo.text.toLowerCase().search(searchValue.toLowerCase()) >= 0) {
      return todo;
    }
    return false;
  });

  const completeTodos = (data) => {
    let newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.id === data.id);
    newTodos[todoIndex].completed = true;

    saveTodos(newTodos);
  };

  const deleteTodo = (data) => {
    let newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.id === data.id);
    newTodos.splice(todoIndex, 1);

    saveTodos(newTodos);
  };

  const addTodo = (newTodo) => {
    const ids = todos.map((todo) => {
      return todo.id;
    });
    const id = ids.sort((a, b) => b - a)[0] + 1;
    let newTodos = [...todos, { id, text: newTodo, completed: false }];
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchedTodos,
        openModal,
        setOpenModal,
        setSearchValue,
        completeTodos,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

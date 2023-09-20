import React, { useContext, useRef } from "react";

import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

const TodoForm = () => {
  const { setOpenModal, addTodo } = useContext(TodoContext);
  const newTodo = useRef(null);

  const toggleModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = newTodo.current.value;
    addTodo(todo);
    setOpenModal(false);

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea
        ref={newTodo}
        placeholder="Cortar cebolla para el almuerzo"
      ></textarea>

      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={() => toggleModal()}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          Añadir
        </button>
      </div>
    </form>
  );
};

export { TodoForm };

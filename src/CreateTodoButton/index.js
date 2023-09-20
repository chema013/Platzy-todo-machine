import React, { useContext } from "react";

import { TodoContext } from "../TodoContext";
import "./CreateTodoButton.css";

const CreateTodoButton = () => {
  const { setOpenModal, openModal } = useContext(TodoContext);

  return (
    <button
      className="CreateTodoButton"
      type="button"
      onClick={(event) => {
        setOpenModal(!openModal);
      }}
    >
      +
    </button>
  );
};

export { CreateTodoButton };

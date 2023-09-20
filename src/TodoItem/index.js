import React from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { BsCheck } from "react-icons/bs";

import { CompleteIcon } from "../TodoIcon/CompleteIcon";
import { DeleteIcon } from "../TodoIcon/DeleteIcon";
import "./TodoItem.css";

const TodoItem = ({ data, completeTodos, deleteTodo }) => {

  return (
    <li className="TodoItem">
      <CompleteIcon
        className={`Icon Icon-check ${data.completed && "Icon-check--active"}`}
        completed={data.completed}
        onComplete={() => completeTodos(data)}
      />
      <p className={`TodoItem-p ${data.completed && "TodoItem-p--complete"}`}>
        {data.text}
      </p>
      <DeleteIcon
        className="Icon Icon-delete"
        onDelete={() => deleteTodo(data)}
      />
    </li>
  );
};

export { TodoItem };

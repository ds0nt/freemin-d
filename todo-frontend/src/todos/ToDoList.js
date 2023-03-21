import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import Quote from "./Quote";
import { Link } from "react-router-dom";
import ToDoCardList from "./ToDoCardList";

// Show page with list of todos from current user.
// This is routed to /todos 

function ToDoList() {
  const { currentUser } = useContext(UserContext);  

  console.debug(
    "ToDoList",
    "currentUser=", currentUser,
    "todos=", currentUser.todos,
    "todos.length =", currentUser.todos.length
);


  return (
      <div className="ToDoList">
          <Quote />
          <Link className="btn btn-outline-primary font-weight-bold text-uppercase my-4" to="/todo">
            New Todo
          </Link>
          {currentUser.todos.length
            ? <ToDoCardList />
            : <p className="lead mt-3">Start freeing up your mind.. =) </p>
        }
      </div>
  );
}


export default ToDoList;
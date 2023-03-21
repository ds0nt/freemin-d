import React, { useState} from "react";
import "./ToDoCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


// import UserContext from "../auth/UserContext";

// Show limited information about a todo.
//  Is rendered by TodoCardList to show a "card" for each todo.
//  Receives deletetodoById prop from parent, which is called on Delete.
//  TodoCardList -> TodoCard 

function ToDoCard(props) {
  console.debug("ToDoCard");
  const [checked, setChecked] = useState(false);

  // Check a todo
  async function handleCheck(evt) {

    console.log("event=", evt.target.parentNode.id);
    let today = new Date().toISOString().slice(0, 10);
    console.log("today:", today);

    let result = await props.checkTodo(evt.target.parentNode.id, {last_checked: today});
    if (result.success) {
      console.debug("Updated successfully" );
      setChecked(true);
    } else {
      console.log("Update failed:", result.errors);
    }
  }

  // Handle a todo deletion
  async function handleDelete(evt) {
    let id = evt.target.parentNode.closest(".card-body").id
    let result = await props.deleteTodoById(id);
    if (result.success) {
      console.debug("Deleted successfully" );
    } else {
      console.log("Deletion failed:", result.errors);
    }
  }

  return (
      <div className="ToDoCard card m-4">
        <div id={props.id} className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p>{props.habit_description}</p>
          <button
              className="btn btn-warning font-weight-bold text-uppercase float-right mx-3"
              onClick={handleCheck}
              disabled={checked || props.done}
          >
            {checked || props.done ? "Done" : "Check"}
          </button>
          <button
              className="btn btn-secondary font-weight-bold mx-3"
              onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashCan}/>
          </button>
        </div>
      </div>
  );
}

export default ToDoCard;
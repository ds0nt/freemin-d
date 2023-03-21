import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import ToDoCard from "./ToDoCard";
import todoApi from "../api/api";

// Show list of todo cards. 
//  todoList -> todoCardList 

function ToDoCardList() {
    const { currentUser, setCurrentUser } = useContext(UserContext);  
    const [todos, setToDos] = useState(currentUser.todos);
    const [checked, setChecked] = useState(false);  
   
    console.debug(
        "ToDoCardList",
        "currentUser=", currentUser,
        "todos=", currentUser.todos,
        "checked=", checked
    );
    

    // remove a todo
    async function deleteTodoById(id) {
        try {
            await todoApi.removeTodo(id, currentUser.username);
            currentUser.todos = currentUser.todos.filter(todo => +todo.id !== +id);
            setCurrentUser(currentUser);
            setToDos(currentUser.todos);
            return { success: true };

        } catch (errors) {
            console.error("todo deletion failed", errors);
            return { success: false, errors };
        }
        }
    

    // check a todo
    async function checkTodoById(id, data) {
        try {
            let res = await todoApi.checkTodo(id, currentUser.username, data);
            console.log("res in checkTodoById func", res);
            let updatedTodoId = currentUser.todos.findIndex(todo => +todo.id === +id);
            currentUser.todos[updatedTodoId] = res;
            setCurrentUser(currentUser);
            setChecked(!checked);
            return { success: true };

        } catch (errors) {
            console.error("todo check failed", errors);
            return { success: false, errors };
        }
        }

  
    //  if a todo has already been checked today it will disable the check button while rendering
  return (
      <div className="ToDoCardList col-md-8 offset-md-2">
      {todos.map(todo =>  
     
            <ToDoCard
                key={todo.id}
                id={todo.id}
                username={todo.username}
                title={todo.title}
                habit_description={todo.habit_description}
                deleteTodoById={deleteTodoById}
                checkTodo={checkTodoById}
                done={false}
            />  )}
        </div>
  ); 
}

export default ToDoCardList;
import React, { useContext } from "react";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import ToDoList from "../todos/ToDoList";

// Homepage of site.
// Shows welcome message or login/register buttons.
// 
// Routed at /
//  Routes -> Homepage

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
          {currentUser
              ? <ToDoList />
              : (
                  <div>
                    <h2 className="Homepage-title mb-3 font-weight-bold">
                        Welcome to FreeMind app!  
                    </h2>
                    <div className="Homepage-box">
                        <p className="lead">
                        “Your mind is for having ideas, not holding them.”
                        </p>
                        <p> The more we burden our brains with remembering tasks, the less we’re actually able to accomplish. </p>
                    </div>
                    <h3> This app is to allow you to offload this cognitive burden, freeing up your mental RAM and enabling you to work more efficiently.</h3>
                  </div>
              )}
        </div>
      </div>
  );
}

export default Homepage;
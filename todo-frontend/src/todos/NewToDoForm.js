import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

// NewTodo form.
// Shows form and manages update to state on changes.
// On submission:
//  - calls createNewToDo function prop
//  - redirects to /todos route
// Routes -> NewTodoForm -> Alert
// Routed as /todo

function NewToDoForm({ createNewToDo }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    habit_description: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "NewToDoForm",
      "createNewToDo=", typeof createNewToDo,
      "formData=", formData,
      "formErrors", formErrors,
  );

  // Handle form submit:
  // Calls createNewTodo function prop and, if successful, redirect to /todos.
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await createNewToDo(formData);
    if (result.success) {
      history.push("/todos");
    } else {
      setFormErrors(result.errors);
    }
  }

  // Update form data field
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">My To do</h3>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>New Todo</label>
                  <input
                      name="title"
                      className="form-control"
                      value={formData.title}
                      minLength="1"
                      maxLength="50"
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                      name="habit_description"
                      className="form-control"
                      value={formData.habit_description}
                      maxLength="250"
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button className="btn btn-primary float-right mt-3"
                    onSubmit={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NewToDoForm;
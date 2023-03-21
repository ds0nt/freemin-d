import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3007";

// API Class  that contains helper methods with AJAX calls


class todoApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // token is passed in the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${todoApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  
  // Get user details by username
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Get token for login from username, password.
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  // Signup for site.
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  // Create a new todo
  static async createTodo(data) {
    let res = await this.request(`todos/${data.username}`, data, "post");
    return res.todo;
  }

  // Update an id-todo
  static async getTodo(id, username) {
    let res = await this.request(`todos/${username}/${id}`);
    return res.todo;
  }

  // Update an todo-id
  static async updateTodo(id, username, data) {
    let res = await this.request(`todos/${username}/${id}`, data, "patch");
    return res.todo;
  }

  // Checked an id-Todo
  static async checkTodo(id, username, data) {
    console.log("update id-todo in API, id =", id , "username=", username, "data=", data);
    let res = await this.request(`todos/${username}/${id}/checked`, data, "patch");
    console.log("result after update in API", res.todo);
    return res.todo;
  }

  // Delete a todo by id
  static async removeTodo(id, username) {
    await this.request(`todos/${username}/${id}`, {}, "delete");
  }

}


export default todoApi;
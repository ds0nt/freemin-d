"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


//////////////////////////////////////////////////
// Related functions for todos.
//////////////////////////////////////////////////
//class Todo 
class Todo {
// Create a todo (from data), update db, return new todo data.
//  data should be { title, habit_description}
// Returns { id, username, title, habit_description }


  static async create(data) {

    const result = await db.query(
          `INSERT INTO todos (title,
                             habit_description, 
                             username)
           VALUES ($1, $2, $3)
           RETURNING id,
                    username,
                    title, 
                    habit_description`,
        [
          data.title,
          data.habit_description,
          data.username,
        ]);
    let todo = result.rows[0];

    return todo;
  }

  
//   Given a todo id and username, return data for this todo.
//     Returns { id,  username, title, habit_description }
//     Throws NotFoundError if not found.

static async get(username, id) {
    const todoRes = await db.query(
          `SELECT id,
                  username,
                  title,
                  habit_description
           FROM todos
           WHERE username=$1 AND id = $2`, [username, id]);

    const todo = todoRes.rows[0];
    if (!todo) throw new NotFoundError(`No todo: ${id}`);

    return todo;
  }


//  Delete given todo from database; returns undefined.
//  Throws NotFoundError if a todo not found.

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM todos
           WHERE id = $1
           RETURNING id`, [id]);
    const todo = result.rows[0];

    if (!todo) throw new NotFoundError(`No todo: ${id}`);
  }


//  Find all todos by username
//  Returns [{ id, username, title, description }, ...]


  static async findAllByUsername(username) {
    let todosRes = await db.query(
        `SELECT id,
                username,
                title,
                habit_description
         FROM todos
        WHERE username = $1`, [username]);
    return todosRes.rows;
  }


//  Update todos data with `data`.
//  Data can include: 
//  { title, habit_description } 
//  Returns todo Object
//  Throws NotFoundError if not found.

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data);
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE todos 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                username,
                                title, 
                                habit_description`;
    const result = await db.query(querySql, [...values, id]);
    const todo = result.rows[0];

    if (!todo) throw new NotFoundError(`No todo: ${id}`);
    return todo;
  }
}

module.exports = Todo;
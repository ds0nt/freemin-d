"use strict";

const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Todo = require("./todo.js");
const {
  commonBeforeAll,  
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUsernames,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// create todo
//////////////////////////////////////

describe("create todo", function () {
  
    test("works", async function () {
        let newTodo = {
            title: "Swim",
            habit_description: "Swimiming in the pool",
            username: testUsernames[0]
        };  
        let todo = await Todo.create(newTodo);
        expect(todo).toEqual({
        ...newTodo,
        id: expect.any(Number),
        });
    });
});


// get by id
////////////////////////////////////////

describe("get by id", function () {
    test("works", async function () {
        let  todoInDb = await Todo.create(
            {
                title: "Swim",
                habit_description: "Swimiming in the pool",
                username: testUsernames[0]
            }
        ); 
        let todo = await Todo.get(testUsernames[0], todoInDb.id);
        expect(todo).toEqual({
            id: todoInDb.id,  
            title: "Swimiming",
            habit_description: "Swimiming in the pool",
            username: testUsernames[0]
        });
    });
  
    test("not found if no such todo", async function () {
        try {
            await Todo.get(testUsernames[0], 0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
  });


//   remove
///////////////////////////////////////////

describe("remove", function () {
    test("works", async function () {
        let  todoInDb = await Todo.create(
            {
                title: "Swimiming",
                habit_description: "Swimiming in the pool",
                username: testUsernames[0]
                }
            ); 
        let todo = await Todo.get(testUsernames[0], todoInDb.id);
        
        let res = await db.query(
            "SELECT id FROM todos WHERE id=$1", [todo.id]);
        expect(res.rows.length).toEqual(1);

        await Todo.remove(todo.id);
        res = await db.query(
            "SELECT id FROM todos WHERE id=$1", [todo.id]);
        expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such todo", async function () {
        try {
            await Todo.remove(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
  });


// update
/////////////////////////////////////////////////////////

describe("update", function () {
    test("works", async function () {
        let  todoInDb = await Todo.create(
            {
                title: "Drink Water",
                habit_description: "2 glasses",
                username: testUsernames[0],
                }
            ); 
    
        let updateData = {
          title: "morning exercises"
        };  

        let todo = await Todo.update(todoInDb.id, updateData);
        expect(todo).toEqual({
            id: todoInDb.id,
            title: "morning exercises",
            habit_description: "2 glasses",
            username: testUsernames[0]
        });
    });
  
    test("not found if no such todo", async function () {
      try {
        await Todo.update(0, {
          title: "test",
        });
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });


//  find all todos by username
///////////////////////////////////////////

describe("findAll", function () {
    test("works", async function () {
      let todos = await Todo.findAllByUsername(testUsernames[0]);
      expect(todos).toEqual([]);
    });

}); 
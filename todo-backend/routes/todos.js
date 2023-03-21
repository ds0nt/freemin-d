"use strict";

// Routes for todos

const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Todo = require("../models/todo");
const todoNewSchema = require("../schemas/todoNew.json");
const todoUpdateSchema = require("../schemas/todoUpdate.json");

const router = express.Router({ mergeParams: true });


// POST / { todo } => { todo }
//  todo should be { title, habit_description, username }
//  Returns { id, username, title, habit_description }
//  Authorization required: admin or current user

router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, todoNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const todo = await Todo.create(req.body);
    return res.status(201).json({ todo });
  } catch (err) {
    return next(err);
  }
});

// GET /[username]/[TodoId] => { todo }
//  Returns { id, username, title, habit_description }
//  Authorization required: admin or correct user

router.get("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const todo = await Todo.get( req.params.username, req.params.id);
    return res.json({ todo });
  } catch (err) {
    return next(err);
  }
});

// PATCH /[username]/[TodotId] { fld1, fld2, ... } => { todo }
//   Data can include: { title, habit_description }
//   Returns { id, username, title, habit_description }
//   Authorization required: admin or correct user

router.patch("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, todoUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const todo = await Todo.update(req.params.id, req.body);
    return res.json({ todo });
  } catch (err) {
    return next(err);
  }
});

// PATCH /[username]/[todoId]/checked  { fld1, fld2, ... } => { todo }
//   Data can include: { last_checked  }
//   Returns { id, username, title, habit_description }
//   Authorization required: admin or correct user

router.patch("/:username/:id/checked", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, todoUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const todo = await Todo.checkTodo(req.params.id, req.params.username, req.body);
    return res.json({ todo });
  } catch (err) {
    return next(err);
  }
});


// DELETE /[handle]  =>  { deleted: id }
//  Authorization required: admin or correct user

router.delete("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Todo.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
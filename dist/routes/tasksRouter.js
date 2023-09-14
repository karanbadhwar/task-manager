"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
//Controllers
const { getAllTasks, createTask, updateTask, getTask, deleteTask, } = require("../controllers/tasksController");
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
module.exports = router;

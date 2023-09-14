import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// @route   GET api/tasks Function/ Controller
const getAllTasks = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    // res.status(200).json({tasks,amount: tasks.length,});

    // res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length } });
  }
);

// @route   POST api/tasks Function/Controller
const createTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// @route   GET api/tasks/:id Function/Controller
const getTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return next(createCustomError(`No task found with id: ${taskId}`, 404));
    }
    res.status(200).json({ task });
  }
);

// @route   PUT api/tasks/:id Function/Controller
const updateTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskId } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return next(createCustomError(`No task found with id: ${taskId}`, 404));
    }
    res.status(200).json({
      task,
    });
  }
);

// @route   DELETE api/tasks/:id Function/Controller
const deleteTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({
      _id: taskId,
    });
    if (!task) {
      return next(createCustomError(`No task found with id: ${taskId}`, 404));
    }
    res.status(200).json({
      task,
    });
  }
);

// Exporting all the functions
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

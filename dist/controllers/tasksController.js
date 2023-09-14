"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
// @route   GET api/tasks Function/ Controller
const getAllTasks = asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task.find({});
    res.status(200).json({ tasks });
    // res.status(200).json({tasks,amount: tasks.length,});
    // res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length } });
}));
// @route   POST api/tasks Function/Controller
const createTask = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.create(req.body);
    res.status(201).json({ task });
}));
// @route   GET api/tasks/:id Function/Controller
const getTask = asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const task = yield Task.findOne({ _id: taskId });
    if (!task) {
        return next(createCustomError(`No task found with id: ${taskId}`, 404));
    }
    res.status(200).json({ task });
}));
// @route   PUT api/tasks/:id Function/Controller
const updateTask = asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const task = yield Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createCustomError(`No task found with id: ${taskId}`, 404));
    }
    res.status(200).json({
        task,
    });
}));
// @route   DELETE api/tasks/:id Function/Controller
const deleteTask = asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    const task = yield Task.findOneAndDelete({
        _id: taskId,
    });
    if (!task) {
        return next(createCustomError(`No task found with id: ${taskId}`, 404));
    }
    res.status(200).json({
        task,
    });
}));
// Exporting all the functions
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};

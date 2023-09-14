"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//Set the structure of the database
const TaskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Must provide a name"],
        trim: true,
        maxLength: [20, "name cannot be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose_1.default.model("Task", TaskSchema);

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
const express = require("express");
const app = express();
//Connect To DB
const connectDb = require("./db/connect");
//dotenv config
require("dotenv").config();
//Import routes
const tasksRouter = require("./routes/tasksRouter");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
//Port
const port = process.env.PORT || 3000;
//Express Middleware
app.use(express.json());
// Static files
app.use(express.static("./public"));
// Routes
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connecting to DB
        yield connectDb(process.env.MONGO_URI);
        // Server is listening on port 3000
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();

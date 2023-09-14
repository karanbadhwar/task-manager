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
const port = process.env.PORT || process.argv[1] || 3000;

//Express Middleware
app.use(express.json());

// Static files
app.use(express.static("./public"));

// Routes
app.use("/api/v1/tasks", tasksRouter);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  try {
    // Connecting to DB
    await connectDb(process.env.MONGO_URI);
    // Server is listening on port 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

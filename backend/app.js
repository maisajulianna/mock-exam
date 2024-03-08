require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");


const userRouter = require("./routes/userRouter");
const fitnessRouter = require("./routes/fitnessRouter");

// express app
const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());



// routes
app.get("/", (req, res) => res.send("API Running!"));
app.use("/api/users", userRouter);
app.use("/api/fitness", fitnessRouter);



module.exports = app;
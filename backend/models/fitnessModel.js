const mongoose = require("mongoose");

const fitnessSchema = new mongoose.Schema({
  title: {type: String, required: true,},
  date: { type: Date, default: Date.now, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: String, required: true },
});

module.exports = mongoose.model("Fitness", fitnessSchema);
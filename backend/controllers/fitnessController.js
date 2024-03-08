const mongoose = require('mongoose');
const Fitness = require('../models/fitnessModel');


// GET all fitness data
const getFitnessData = async (req, res) => {
    try {
        const fitnessData = await Fitness.find({});
        res.status(200).json(fitnessData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST fitness data
const createFitnessData = async (req, res) => {
    const { title, date, duration, caloriesBurned } = req.body;
    
    const user_id = req.user._id;
    
    console.log();
    if (!title || !duration || !caloriesBurned) {
        return res.status(400).json({ message: "All fields are required" });
    };
    try {
        const fitnessData = new Fitness({ title, date, duration, caloriesBurned, user_id });
        await  fitnessData.save();
        res.status(201).json(fitnessData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET fitness data by ID
const getFitnessDataById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No fitness data with that ID");
    };

    try {
        const fitnessData = await Fitness.findById(id);
        if (!id) {
            return res.status(404).json({ message: "Fitness data not found" });
        };
        res.status(200).json(fitnessData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE fitness data
const deleteFitnessData = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No fitness data with that ID");
    };
    try {
        const user_id = req.user._id;
        const fitness = await Fitness.findByIdAndDelete({ _id: id, user_id: user_id });
        if (!id) {
          return res.status(404).json({ message: 'fitness data not found' });
    } res.status(200).json({ message: 'fitness data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE fitness data
const updateFitnessData = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send("No fitness data with that ID");
    };
    
    try {
        const user_id = req.user._id;
        const updatedFitnessData = await Fitness.findByIdAndUpdate(
            { _id: id, user_id: user_id },
            { ...req.body },
            { new: true }
        );
        if (!id) {
            return res.status(404).json({ message: "Fitness data not found" });
        }
        res.status(200).json(updatedFitnessData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getFitnessData,
    createFitnessData,
    getFitnessDataById,
    updateFitnessData,
    deleteFitnessData
};
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Fitness = require("../models/fitnessModel");
const User = require("../models/userModel");


const fitnessData = [
    { 
    "title": "Morning Test Jog",
    "date:":  "2024-05-08T08:00:00Z",
    "duration": 30,
    "caloriesBurned": "200"
    },
    {
    "title": "Afternoon Jog", 
    "date": "2024-03-08T08:00:00Z", 
    "duration": 22, 
    "caloriesBurned": "400"
    }
]

let token = null;

beforeAll(async () => {

    await User.deleteMany({});
    const result = await api
    .post("/api/users/signup")
    .send({email: "mattiv@matti.fi", password: "R3g5T7#gh"});
    token = result.body.token;
    
});

describe("Fitness API", () => {
    beforeEach(async () => {
        await Fitness.deleteMany({});
        await api
        .post("/api/fitness")
        .set("Authorization", "bearer " + token)
        .send(fitnessData[0])
        .send(fitnessData[1]);
    });
    
    // GET all fitness data
    it("should return all Fitness data when GET /api/movies is called", async () => {
    await api
    .get("/api/fitness")
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
    });

    // POST new fitness data
    it("Should add new fitness data when POST /api/fitness is called", async () => {
        const newFitness = {
            "title": "New Run",
            "date": "2023-03-08T08:00:00Z",
            "duration": 25,
            "caloriesBurned": "300"
        };
        await api
            .post("/api/fitness")
            .set("Authorization", "bearer " + token)
            .send(newFitness)
            .expect(201)
    });
    
    // GET fitness data by ID
    it("should return one fitness data when GET /api/fitness/:id is called", async () => {
        const fitness = await Fitness.findOne({});
        await api
        .get(`/api/fitness/${fitness._id}`)
        .set("Authorization", "bearer " + token)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    })

    // DELETE fitness data
    it("should delete one fitness data when DELETE /api/fitness/:id is called", async () => {
        const fitness = await Fitness.findOne();
        await api
            .delete("/api/fitness/" + fitness._id)
            .set("Authorization", "bearer " + token)
            .expect(200);
        const checkFitness = await Fitness.findById(fitness._id);
        expect(checkFitness).toBeNull();
    });

    // PUT fitness data
    it("should update one fitness data when PUT /api/fitness/:id is called", async () => {
        const fitness = await Fitness.findOne();
        const updatedFitness = {
            "title": "Updated Run",
            "duration": 25,
            "caloriesBurned": "300"
        };
        await api
            .put("/api/fitness/" + fitness._id)
            .set("Authorization", "bearer " + token)
            .send(updatedFitness)
            .expect(200);
        const checkFitness = await Fitness.findById(fitness._id);
        expect(checkFitness.toJSON()).toEqual(expect.objectContaining(updatedFitness));

    });
});

afterAll(() => {
    mongoose.connection.close();
});

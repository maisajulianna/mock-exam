const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

// Login test


// logic to test: POST /api/users/signup

describe("user routes", () => {
    describe("POST /api/users/signup", () => {
        it("should signup a new user with a valid credentials", async () => {
            const userData = {
                email: "testi@email.com",
                password: "R3g5T7#gh",
            };
            const response = await api.post("/api/users/signup").send(userData);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("token");
        });
    });
    
    it("should return an error with invalid crednetials", async () => {
        const userData = {
            email: "testi@email.com",
            password: "wrongpassword#gh",
        };
        const response = await api.post("/api/users/signup").send(userData);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("User Routes", () => {
  describe("POST /api/users/login", () => {
    it("should login a new user with valid credentials", async () => {
      const userData = {
        email: "testi@email.com",
        password: "R3g5T7#gh",
      };

      const response = await api.post("/api/users/login").send(userData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return an error with invalid credentials", async () => {
      const userData = {
        email: "testi@email.com",
        password: "wrongpassword#gh",
      };

      const response = await api.post("/api/users/login").send(userData);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

});

afterAll(() => {
    mongoose.connection.close();
  });
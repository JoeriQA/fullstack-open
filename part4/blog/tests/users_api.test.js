import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import app from "../app.js";
import { usersinDb } from "./test_helper.js";

const api = supertest(app);

describe.only("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "G Root", passwordHash });

    await user.save();
  });

  test("should return that user", async () => {
    const usersinDB = await usersinDb();
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(usersinDB.length, response.body.length);

    assert(response.body[0].username, "root");
    assert(response.body[0].name, "G Root");
    assert(response.body[0].id);
    assert.strictEqual(response.body[0].passwordHash, undefined);
  });

  test("should create a new user succesfully", async () => {
    const initialUsers = await usersinDb();

    const newUser = {
      username: "joe",
      name: "Joe Biden",
      password: "obamabro",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await usersinDb();
    const usernames = usersAfter.map((e) => e.username);

    assert.strictEqual(usersAfter.length, initialUsers.length + 1);
    assert(usernames.includes("joe"));
  });

  test("creation fails with proper statuscode and message if username is already taken", async () => {
    const initialUsers = await usersinDb();

    const newUser = {
      username: "root",
      name: "G Root",
      password: "iamgroot",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await usersinDb();

    assert(response.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAfter.length, initialUsers.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});

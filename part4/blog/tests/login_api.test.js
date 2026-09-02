import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import app from "../app.js";

const api = supertest(app);

describe.only("login", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "G Root", passwordHash });

    await user.save();
  });

  test("succeeds with correct credentials", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert(response.body.token);
    assert.strictEqual(response.body.username, "root");
    assert.strictEqual(response.body.name, "G Root");
  });

  test("fails with statuscode 401 if password is wrong", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "root", password: "wrong" })
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "invalid username or password");
  });

  test("fails with statuscode 401 if username does not exist", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "doesnotexist", password: "sekret" })
      .expect(401)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.error, "invalid username or password");
  });

  after(async () => {
    await mongoose.connection.close();
  });
});

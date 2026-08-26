import bcrypt from "bcrypt";
import express from "express";
import logger from "../utils/logger.js";
import User from "../models/user.js";

const usersRouter = express.Router();

usersRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    const userExists = await User.find({ username: username });
    if (userExists.length > 0)
      return response
        .status(400)
        .json({ error: "expected `username` to be unique" });

    if (password.length < 3)
      return response
        .status(400)
        .json({ error: "password must be at least 3 characters" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();

    return response.status(201).json(savedUser);
  } catch (error) {
    if (error.name === "ValidationError")
      return response.status(400).json({ error: error.message });
    logger.error(error);
    response.status(500).end();
  }
});

usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      likes: 1,
      url: 1,
    });
    response.status(200).json(users);
  } catch (error) {
    logger.error(error);
  }
});

export default usersRouter;

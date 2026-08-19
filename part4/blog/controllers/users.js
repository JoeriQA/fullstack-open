import bcrypt from "bcrypt";
import express from "express";
import logger from "../utils/logger.js";
import User from "../models/user.js";

const usersRouter = express.Router();

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const userExists = await User.find({ username: username });
  if (userExists.length > 0)
    response.status(400).json({ error: "expected `username` to be unique" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    logger.error(error);
  }
});

usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    logger.error(error);
  }
});

export default usersRouter;

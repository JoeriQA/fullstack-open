import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";
import logger from "../utils/logger.js";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    logger.error(error);
    return response.status(500).end();
  }
});

export default loginRouter;

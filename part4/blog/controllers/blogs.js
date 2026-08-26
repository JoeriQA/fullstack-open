import logger from "../utils/logger.js";
import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    return response.json(blogs);
  } catch (err) {
    logger.error(err);
  }
});

blogsRouter.post("/", async (request, response) => {
  try {
    if (!request.body.likes) request.body.likes = 0;

    if (!request.body.title || !request.body.url)
      return response.status(400).json({
        error: "title or url missing",
      });

    const users = await User.find({});
    const user = users[0];

    const blog = new Blog({ ...request.body, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return response.status(201).json(savedBlog);
  } catch (err) {
    logger.error(err);
    return response.status(500).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id);
    return response.status(201).json(result);
  } catch (err) {
    logger.error(err);
    return response.status(500).json({ error: err.message });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  if (!request.body.likes)
    return response.status(400).json({ error: "likes missing" });

  if (!request.body.title || !request.body.url)
    return response.status(400).json({
      error: "title or url missing",
    });

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        likes: request.body.likes,
      },
      { returnDocument: "after", runValidators: true },
    );
    return response.status(201).json(result);
  } catch (err) {
    logger.error(err);
    return response.status(500).end();
  }
});

export default blogsRouter;

import logger from "../utils/logger.js";
import express from "express";
import Blog from "../models/blog.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (err) {
    logger.error(err);
  }
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.likes) request.body.likes = 0;

  if (!request.body.title || !request.body.url)
    return response.status(400).json({
      error: "title or url missing",
    });

  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (err) {
    logger.error(err);
    response.status(500);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (err) {
    logger.error(err);
    response.status(500);
  }
});

export default blogsRouter;

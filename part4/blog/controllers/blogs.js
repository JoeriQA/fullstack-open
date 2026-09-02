import logger from "../utils/logger.js";
import express from "express";
import Blog from "../models/blog.js";
import { userExtractor } from "../utils/middleware.js";

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

blogsRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user;

  if (!request.body.likes) request.body.likes = 0;

  if (!request.body.title || !request.body.url)
    return response.status(400).json({
      error: "title or url missing",
    });

  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) return response.status(204).end();

  if (blogToDelete.user.toString() !== request.user.id.toString())
    return response
      .status(401)
      .json({ error: "blog can only be deleted by author" });

  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  if (!request.body.likes)
    return response.status(400).json({ error: "likes missing" });

  if (!request.body.title || !request.body.url)
    return response.status(400).json({
      error: "title or url missing",
    });

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      likes: request.body.likes,
    },
    { returnDocument: "after", runValidators: true },
  );
  return response.status(201).json(result);
});

export default blogsRouter;

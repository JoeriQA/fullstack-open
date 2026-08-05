import { test, after, beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blog.js";
import { initialBlogs, blogsInDb } from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const repsonse = await api.get("/api/blogs");

  assert.strictEqual(repsonse.body.length, initialBlogs.length);
});

test("a specific blog is within the returned notes", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((e) => e.title);
  assert(titles.includes("Beautiful Rocks"));
});

test("blogs are returned with a proper id", async () => {
  const response = await api.get("/api/blogs");

  assert(response.body[0].id);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "The Art of Testing",
    author: "Kent Beck",
    url: "https://example.com/art-of-testing",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((e) => e.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  assert(titles.includes("The Art of Testing"));
});

test("a blog without likes is added with 0 likes", async () => {
  const newBlog = {
    title: "The Art of Testing",
    author: "Kent Beck",
    url: "https://example.com/art-of-testing",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  const addedBlog = response.body.find((e) => e.title === "The Art of Testing");
  assert.equal(addedBlog.likes, 0);
});

test("a blog without title is not added", async () => {
  const newBlog = {
    author: "Brandon Sanderson",
    url: "https://example.com/art-of-testing",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
  assert(response.body, "title or url missing");
});

test("a blog without url is not added", async () => {
  const newBlog = {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
  assert(response.body, "title or url missing");
});

test("a blog with valid id can be deleted", async () => {
  const blogs = blogsInDb();
  const id = blogs[0].id;

  await api.delete(`/api/blogs/${id}`).expect(201);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});

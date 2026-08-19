import Blog from "../models/blog.js";
import User from "../models/user.js";

const initialBlogs = [
  {
    title: "Trees and such",
    author: "Jane Goodall",
    url: "https://example.com/trees-and-such",
    likes: 5,
  },
  {
    title: "Beautiful Rocks",
    author: "JK Rowling",
    url: "https://example.com/beautiful-rocks",
    likes: 7,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersinDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { initialBlogs, blogsInDb, usersinDb };

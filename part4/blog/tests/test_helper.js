import Blog from "../models/blog.js";

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

export { initialBlogs, blogsInDb };

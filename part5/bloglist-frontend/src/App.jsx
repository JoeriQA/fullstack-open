import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));

      setNotification({
        message: `logged in succesfully`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setNotification({ message: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("user");
    setUser(null);
  };

  const postBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(blogObject, user.token);
      setBlogs(blogs.concat(blog));

      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch {
      setNotification({ message: "blog creation failed", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const blog = await blogService.update(blogObject, user.token);
      setBlogs((prevBlogs) =>
        prevBlogs.map((p) => (p.id !== blog.id ? p : blogObject)),
      );
    } catch {
      setNotification({ message: "updating blog failed", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification?.message}
          type={notification?.type}
        />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification
          message={notification?.message}
          type={notification?.type}
        />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={postBlog} />
        </Togglable>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateLikes={updateBlog} />
          ))}
        </div>
      </div>
    );
  }
};

export default App;

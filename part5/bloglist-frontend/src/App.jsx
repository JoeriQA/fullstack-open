import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const postBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url }, user.token);
      setBlogs(blogs.concat(blog));

      setNotification({
        message: `a new blog ${title} by ${author} added`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch {
      setNotification({ message: "blog creation failed", type: "error" });
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
        <h2>create new</h2>
        <form onSubmit={postBlog}>
          <div>
            <label>
              title
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              author
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              url
              <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              ></input>
            </label>
            <button type="submit">create</button>
          </div>
        </form>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  }
};

export default App;

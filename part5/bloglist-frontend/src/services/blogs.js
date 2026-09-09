import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blog, token) => {
  const request = axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

export default { getAll, create };

import lodash from "lodash";

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, current) => sum + current.likes, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const authorCount = lodash.countBy(blogs, "author");
  const entries = Object.entries(authorCount);
  if (entries.length === 0) return {};
  const [author, count] = lodash.maxBy(entries, (entry) => entry[1]);
  return { author, blogs: count };
};

const mostLikes = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, "author");
  const likesByAuthor = lodash.mapValues(groupedAuthors, (authorBlogs) =>
    lodash.sumBy(authorBlogs, "likes"),
  );
  const entries = Object.entries(likesByAuthor);
  if (entries.length === 0) return {};
  const [author, likes] = lodash.maxBy(entries, (entry) => entry[1]);
  return { author, likes };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

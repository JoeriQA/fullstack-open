import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const emptyList = [];

    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422bb82c65b787345e28f9",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        url: "https://example.com/clean-code",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422cc93d76c898456f39fa",
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        url: "https://example.com/pragmatic-programmer",
        likes: 32,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 52);
  });
});

describe("favorite", () => {
  test("of empty list is undefined", () => {
    const emptyList = [];

    const result = listHelper.favoriteBlog(emptyList);
    assert.strictEqual(result, undefined);
  });

  test("when list has only one blog, returns that blog", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("of a bigger list returns the blog with most likes", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422bb82c65b787345e28f9",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        url: "https://example.com/clean-code",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422cc93d76c898456f39fa",
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        url: "https://example.com/pragmatic-programmer",
        likes: 32,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, listWithMultipleBlogs[2]);
  });

  test("of a bigger list with the same amount of likes returns the first", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 32,
        __v: 0,
      },
      {
        _id: "5a422bb82c65b787345e28f9",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        url: "https://example.com/clean-code",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422cc93d76c898456f39fa",
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        url: "https://example.com/pragmatic-programmer",
        likes: 32,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, listWithMultipleBlogs[0]);
  });
});

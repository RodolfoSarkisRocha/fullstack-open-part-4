const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, newBlog, getUserToken } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("blogs", () => {
  test("blogs are returned with length 2", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("id is the unique identifier of the blog's body", async () => {
    const targetUser = {
      username: "Sabaks",
      password: "fsadfds",
    };
    const userResult = await api
      .post("/api/login")
      .send(targetUser)
      .expect(200);

    const { token } = userResult.body;

    const response = await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response?.body?.id).toBeDefined();
  });

  test("blog is successfully created and has the target content", async () => {
    const targetUser = {
      username: "Sabaks",
      password: "fsadfds",
    };
    const userResult = await api
      .post("/api/login")
      .send(targetUser)
      .expect(200);

    const { token } = userResult.body;
    const savedBlog = await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await api.get("/api/blogs");

    expect(allBlogs?.body?.length).toBe(initialBlogs.length + 1);

    expect(savedBlog?.body?.likes?.toString()).toBe(newBlog.likes);
    expect(savedBlog?.body?.title).toBe(newBlog.title);
    expect(savedBlog?.body?.author).toBe(newBlog.author);
    expect(savedBlog?.body?.url).toBe(newBlog.url);
  });

  test("likes is not missing", async () => {
    const targetUser = {
      username: "Sabaks",
      password: "fsadfds",
    };
    const userResult = await api
      .post("/api/login")
      .send(targetUser)
      .expect(200);

    const { token } = userResult.body;

    const blog = {
      title: "Pokemon Blog",
      author: "Abner",
      url: "www.nintendo.com.br",
    };

    const savedBlog = await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(savedBlog?.body?.likes).toBeDefined();
  });

  test("url and title exists", async () => {
    const targetUser = {
      username: "Sabaks",
      password: "fsadfds",
    };
    const userResult = await api
      .post("/api/login")
      .send(targetUser)
      .expect(200);

    const { token } = userResult.body;

    const blog = {
      author: "Abner",
      likes: "12",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(blog)
      .expect(400);
  });

  test("blog is updated", async () => {
    const targetUser = {
      username: "Sabaks",
      password: "fsadfds",
    };
    const userResult = await api
      .post("/api/login")
      .send(targetUser)
      .expect(200);

    const { token } = userResult.body;

    const blog = {
      title: "New Blog",
      author: "New Author",
      url: "www.newurl.com",
      likes: 10,
    };

    const editedBlog = {
      title: "Updated Blog",
      author: "Updated Author",
      url: "www.updatedurl.com",
      likes: 10000,
    };

    const newBlog = await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(blog);

    const id = newBlog.body.id;    

    const updateBlogResult = await api
      .put(`/api/blogs/${id}`)
      .send(editedBlog)
      .expect(200);
          
    const updatedBlog = await api.get(`/api/blogs/${id}`).expect(200);    

    expect(updateBlogResult.body).toEqual(updatedBlog.body);
  });
});
afterAll(() => {
  mongoose.connection.close();
});

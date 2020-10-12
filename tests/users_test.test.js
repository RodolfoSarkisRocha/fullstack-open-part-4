const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const initialUsers = await testHelper.initialUsers();
  const userObjects = initialUsers.map((user) => new User(user));
  const promises = userObjects.map((user) => user.save());
  await Promise.all(promises);
});

describe("users", () => {
  test("only users with a username are created", async () => {
    const result = await api
      .post("/api/users")
      .send(testHelper.noUsernameUser)
      .expect(400);

    expect(result?.body).toBeDefined();
  });

  test("only users with a password are created", async () => {
    const result = await api
      .post("/api/users")
      .send(testHelper.noPasswordUser)
      .expect(400);

    expect(result?.body).toBeDefined();
  });

  test("only users with a username that has a length >= 3 are created", async () => {
    const result = await api
      .post("/api/users")
      .send(testHelper.invalidPasswordLenghtUser)
      .expect(400);

    expect(result?.body).toBeDefined();
  });

  test("only users with a password that has a length >= 3 are created", async () => {
    const result = await api
      .post("/api/users")
      .send(testHelper.invalidUsernameLenghtUser)
      .expect(400);

    expect(result?.body).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});

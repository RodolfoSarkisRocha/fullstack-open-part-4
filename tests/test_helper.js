const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "Agriculture Blog",
    author: "Aparecida",
    url: "www.google.com.br",
    likes: "3",
  },
  {
    title: "TI Blog",
    author: "Rodolfo",
    url: "www.facebook.com.br",
    likes: "1",
  },
];

const newBlog = {
  title: "Pokemon Blog",
  author: "Abner",
  url: "www.nintendo.com.br",
  likes: "12",
};

const noUsernameUser = {
  password: "123456789",
  name: "Rodolfo Sarkis",
};

const noPasswordUser = {
  username: "Apars",
  name: "Aparecida Helena",
};

const invalidUsernameLenghtUser = {
  username: "AP",
  password: "f15sd3f",
  name: "Aparecida Helena",
};

const invalidPasswordLenghtUser = {
  username: "Apars",
  password: "12",
  name: "Aparecida Helena",
};

const initialUsers = async () => {
  const users = [
    {
      username: "Apars",
      password: "f15sd3f",
      name: "Aparecida Helena",
    },
    {
      username: "Sabaks",
      password: "fsadfds",
      name: "Abner Delladona",
    },
    {
      username: "Dummy",
      password: "3244530421",
      name: "Luiz Felipe",
    },
  ];

  const promiseArray = users.map(async user => {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);
    return {
      username: user.username,
      name: user.name,
      passwordHash
    }
  });

  const usersMapped = await Promise.all(promiseArray)

  return usersMapped;
};

module.exports = {
  initialBlogs,
  newBlog,
  initialUsers,
  invalidPasswordLenghtUser,
  invalidUsernameLenghtUser,
  noPasswordUser,
  noUsernameUser,
};

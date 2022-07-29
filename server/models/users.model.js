// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPrismaUser = async (email) => {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email,
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });
  return newUser;
};

const findAllUsers = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  console.log(allUsers);
  return allUsers;
};

const findUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  return user;
};

module.exports = { findAllUsers, createPrismaUser, findUser };

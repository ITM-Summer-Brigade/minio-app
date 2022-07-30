// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPrismaUser = async (firstName, lastName, email, bucketName) => {
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      bucket: {
        create: {
          bucketName,
        },
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

const findUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

module.exports = { findAllUsers, createPrismaUser, findUser };

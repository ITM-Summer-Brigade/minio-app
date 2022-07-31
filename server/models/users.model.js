// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { createBucket } = require("../minio");

const createPrismaUser = async (firstName, lastName, email) => {
  const userBucketName = firstName.charAt(0) + lastName.slice(0, 4);
  const bucketName = createBucket(userBucketName);

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

const findSessionId = async (sessionId) => {
  return await prisma.session.findUnique({
    where: {
      sessionId,
    },
  });
};

const findOrCreatePrismaUser = async (firstName, lastName, email) => {
  const existingUser = findUser(email);
  if (existingUser) {
    return existingUser;
  }

  const userBucketName = firstName.charAt(0) + lastName.slice(0, 4);
  const bucketName = createBucket(userBucketName);

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

module.exports = {
  findAllUsers,
  createPrismaUser,
  findUser,
  findOrCreatePrismaUser,
};

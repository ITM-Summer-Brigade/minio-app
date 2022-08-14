// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findBucket = async (id) => {
  return prisma.bucket.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

const removeBucket = async (id) => {
  return prisma.bucket.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const createPrismaBucket = async (bucketName) => {
  return await prisma.bucket.create({
    data: {
      bucketName,
    },
  });
};

module.exports = {
  findBucket,
  createPrismaBucket,
  removeBucket,
};

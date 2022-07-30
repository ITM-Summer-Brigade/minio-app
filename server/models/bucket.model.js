// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findBucket = async () => {
  return prisma.bucket.findUnique({
    where: {},
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
};

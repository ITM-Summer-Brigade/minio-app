// Prisma
const { PrismaClient } = require("@prisma/client");
const { findClass } = require("./class.model");
const prisma = new PrismaClient();

const findAllFiles = async () => {
  return await prisma.file.findMany({});
};

const findFilesByClass = async (classUrl) => {
  return await prisma.file.findMany({
    where: {
      classUrl,
    },
  });
};

const findFilesBySubject = async (subjectId) => {
  return await prisma.file.findMany({
    where: {
      subjectId: parseInt(subjectId),
    },
  });
};

const saveFileInfo = async (fileName, size, fileType, fileUrl) => {
  return await prisma.file.create({
    data: {
      fileName,
      size,
      fileType,
      fileUrl,
    },
  });
};

module.exports = {
  findAllFiles,
  findFilesByClass,
  findFilesBySubject,
  saveFileInfo,
};

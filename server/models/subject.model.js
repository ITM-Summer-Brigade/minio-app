const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const subjectData = require("./subjects.json");

// initialize the subjects
const initSubjects = async () => {
  //   await prisma.bucket.create({
  //     data: {
  //       bucketName: "testclassbucket2",
  //     },
  //   });
  //   await prisma.user.create({
  //     data: {
  //       email: "testuser@gmail.com",
  //       firstName: "John",
  //       lastName: "Doe",
  //       bucketId: 2,
  //     },
  //   });
  const subjects = subjectData;
  const prismaSubjects = await findAllSubjects();
  if (!prismaSubjects.length) {
    subjects.forEach(async (subject) => {
      const { subjectName, abbreviation } = subject;
      await prisma.subject.create({
        data: { subjectName, abbreviation },
      });
    });
    console.log("Subjects initialized");
  }
};

const findAllSubjects = async () => {
  return await prisma.subject.findMany({});
};

const findSubject = async (subjectName) => {
  return await prisma.subject.findUnique({
    where: {
      subjectName: subjectName,
    },
  });
};

const deleteAllSubjects = async () => {
  return await prisma.subject.deleteMany({});
};

module.exports = {
  initSubjects,
  findAllSubjects,
  deleteAllSubjects,
  findSubject,
};

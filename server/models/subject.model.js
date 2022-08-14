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
      const existingSubject = await prisma.subject.findUnique({
        where: {
          subjectName,
        },
      });
      if (!existingSubject) {
        await prisma.subject.create({
          data: { subjectName, abbreviation },
        });
        console.log(`New subject ${subjectName} added. Reinitializing table.`);
      }
    });
  }
};

const findAllSubjects = async () => {
  return await prisma.subject.findMany({});
};

const findSubject = async (subjectName) => {
  return await prisma.subject.findUnique({
    where: {
      subjectName,
    },
  });
};

const findSubjectById = async (id) => {
  return await prisma.subject.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

const deleteAllSubjects = async () => {
  return await prisma.subject.deleteMany({});
};

const updateSubjectViews = async (id) => {
  let subject = await findSubjectById(id);
  return await prisma.subject.update({
    where: {
      id: parseInt(id),
    },
    data: {
      subjectViews: (subject.subjectViews += 1),
    },
  });
};

module.exports = {
  initSubjects,
  findAllSubjects,
  deleteAllSubjects,
  findSubject,
  findSubjectById,
  updateSubjectViews,
};

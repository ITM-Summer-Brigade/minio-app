const { createBucket } = require("../minio");
const {
  createPrismaUser,
  findAllUsers,
  findUser,
} = require("../models/users.model");

function working(req, res) {
  console.log("working");
  res.status(200).json({ message: "Working" });
}

const userList = [];

function createUser(req, res) {
  const { username, password } = req.body;

  const user = { id: userList.length + 1, user: username, pass: password };
  userList.push(user);
  return res.status(200).json({ message: "User created successfully", user });
}

function getAllUsers(req, res) {
  return res.status(200).json(userList);
}

// Prisma
async function createUserPrisma(req, res) {
  const { firstName, lastName, email } = req.body;
  const existingUser = await findUser(email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with that email already exists" });
  }

  const userBucketName = firstName.charAt(0) + lastName.slice(0, 4);
  const bucketName = createBucket(userBucketName);

  const user = await createPrismaUser(firstName, lastName, email, bucketName);
  console.log(user);
  return res.status(200).json({ message: "User created successfully" });
}

async function getPrismaUsers(req, res) {
  const allUsers = await findAllUsers();
  return res.status(200).json(allUsers);
}

module.exports = {
  userList,
  working,
  createUser,
  getAllUsers,
  createUserPrisma,
  getPrismaUsers,
};

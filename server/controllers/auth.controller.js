const {
  createPrismaUser,
  findAllUsers,
  findUser,
} = require("../models/users.model");

const homeUrl =
  process.env.NODE_ENV === "dev"
    ? "http://127.0.0.1:5500/minio-fileapp/client/index.html"
    : "http://192.168.172.75/";

function working(req, res) {
  console.log("working");
  res.status(200).json({ message: "Working" });
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

  const user = await createPrismaUser(firstName, lastName, email);
  console.log(user);
  return res.status(200).json({ message: "User created successfully" });
}

async function getPrismaUsers(req, res) {
  const allUsers = await findAllUsers();
  return res.status(200).json(allUsers);
}

async function redirectGoogle(req, res) {
  console.log("session", req.session.id);
  loggedInSessionId = req.session.id;

  req.session.save(function (err) {
    if (err) return next(err);
    return res.redirect(homeUrl);
  });
}

async function logout(req, res) {
  console.log(req.user, req.session.id);

  if (!req.user) {
    return res.json({ message: "You are currently not logged in" });
  }
  req.session.destroy();
  console.log("Logged out!");
  return res.redirect(homeUrl);
}

async function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(404).json({ message: "You are currently not logged in" });
  }
  return res.json(req.user);
}

module.exports = {
  working,
  createUserPrisma,
  getPrismaUsers,
  redirectGoogle,
  logout,
  getCurrentUser,
};

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

module.exports = { userList, working, createUser, getAllUsers };

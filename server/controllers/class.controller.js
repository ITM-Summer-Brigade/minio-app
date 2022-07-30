const {
  findAllClasses,
  createClass,
  findClass,
} = require("../models/class.model");

// On class creation, a bucket should be created for the class and the person
// who created it should be an admin. The admin will be assigned as the
// creator of the classroom
async function postClass(req, res) {
  const { className, classUrl, teacherName, subjectName, creatorEmail } =
    req.body;
  try {
    const existingClass = await findClass(classUrl);
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }
    const newClass = await createClass(
      className,
      classUrl,
      teacherName,
      subjectName,
      creatorEmail
    );
    return res
      .status(201)
      .json({ message: "Succesfully created new class", newClass });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getAllClasses(req, res) {
  const classList = await findAllClasses();
  // get classes
  if (!classList.length) {
    return res.status(404).json({ message: "No classes found" });
  }
  return res.json(classList);
}

module.exports = { getAllClasses, postClass };

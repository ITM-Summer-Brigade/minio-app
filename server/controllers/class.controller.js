const {
  findAllClasses,
  createClass,
  findClass,
  findClassesBySubject,
} = require("../models/class.model");

// On class creation, a bucket should be created for the class and the person
// who created it should be an admin. The admin will be assigned as the
// creator of the classroom
async function postClass(req, res) {
  const { className, teacherName, subjectName, creatorEmail } = req.body;
  try {
    const autoUrl = "/class/" + className.toLowerCase().split(" ").join("");
    const existingClass = await findClass(autoUrl);
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }
    const newClass = await createClass(
      className,
      autoUrl,
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

async function getClassByUrl(req, res) {
  const { classUrl } = req.params;
  const finUrl = "/class/" + classUrl;
  const classInfo = await findClass(finUrl);
  if (!classInfo) {
    return res.status(404).json({ message: "Class not found" });
  }
  return res.status(200).json(classInfo);
}

async function getAllClassesBySubject(req, res) {
  const { subjectId } = req.params;
  const classList = await findClassesBySubject(subjectId);
  // get classes
  if (!classList.length) {
    return res.status(404).json({ message: "No classes found" });
  }
  return res.json(classList);
}

module.exports = {
  getAllClasses,
  postClass,
  getAllClassesBySubject,
  getClassByUrl,
};

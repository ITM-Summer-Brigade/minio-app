const {
  findAllSubjects,
  findSubject,
  findSubjectById,
  updateSubjectViews,
} = require("../models/subject.model");

const getAllSubjects = async (req, res) => {
  const subjects = await findAllSubjects();
  return res.status(200).json(subjects);
};

const getSubjectById = async (req, res) => {
  const { subjectId } = req.params;
  const views = await updateSubjectViews(subjectId);
  const subject = await findSubjectById(subjectId);
  return res.status(200).json(subject);
};

module.exports = { getAllSubjects, getSubjectById };

const express = require("express");

// import controllers code
const subjectController = require("../controllers/subject.controller");

// create router
const subjectRouter = express.Router();

// set api routes
subjectRouter.get("/", subjectController.getAllSubjects);
subjectRouter.get("/:subjectId", subjectController.getSubjectById);

module.exports = subjectRouter;

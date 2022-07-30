const express = require("express");

// import controllers code
const subjectRouter = require("../routes/subject.router");
const classController = require("../controllers/class.controller");

// create router
const classRouter = express.Router({ mergeParams: true });

// set api routes
classRouter.get("/", classController.getAllClasses);
classRouter.get("/:classUrl", classController.getClassByUrl);

subjectRouter.use("/:subjectId/class", classController.getAllClassesBySubject);
classRouter.post("/", classController.postClass);

module.exports = classRouter;

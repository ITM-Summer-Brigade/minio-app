const express = require("express");

// For handling multipart/form-data (aka. files)
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });

// routers for nested routes
const classRouter = require("../routes/class.router");
const subjectRouter = require("../routes/subject.router");

const fileController = require("../controllers/files.controller");

// create file router
const fileRouter = express.Router({ mergeParams: true });

// set api routes
fileRouter.get("/", fileController.getFiles);
fileRouter.post("/", upload.single("file"), fileController.postFile);

subjectRouter.use("/:subjectId/files", fileController.getFilesBySubject);
classRouter.use("/:classUrl/files", fileController.getFilesByClass);

module.exports = fileRouter;

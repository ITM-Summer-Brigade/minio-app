const express = require("express");

// import controllers code
const classController = require("../controllers/class.controller");

// create router
const classRouter = express.Router();

// set api routes
classRouter.get("/", classController.getAllClasses);
classRouter.post("/", classController.postClass);

module.exports = classRouter;

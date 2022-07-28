const express = require("express");

// import controllers code
const classController = require("../controllers/class.controller");

// create router
const classRouter = express.Router();

// apply middleware
classRouter.use((req, res, next) => {
  next();
});

// set api routes
classRouter.get("/", classController.createClass);

module.exports = classRouter;

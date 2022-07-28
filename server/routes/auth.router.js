const express = require("express");

// import controllers code
const authController = require("../controllers/auth.controller");

// create router
const authRouter = express.Router();

// apply middleware
authRouter.use((req, res, next) => {
  next();
});

// set api routes
authRouter.get("/", authController.working);

module.exports = authRouter;

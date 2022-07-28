const express = require("express");
const { check, body } = require("express-validator");

// validation middleware
const { validateUser, checkUserExists } = require("../util/validator");

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
authRouter.post(
  "/user",
  validateUser,
  checkUserExists,
  authController.createUser
);
authRouter.get("/user", authController.getAllUsers);

module.exports = authRouter;

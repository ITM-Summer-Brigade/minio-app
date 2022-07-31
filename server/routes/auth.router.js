const express = require("express");
const { check, body } = require("express-validator");

// validation middleware
const {
  validateUser,
  checkUserExists,
  validatePUser,
} = require("../util/validator");

// import controllers code
const authController = require("../controllers/auth.controller");

const passport = require("passport");
// const { findOrCreatePrismaUser } = require("../models/users.model");
// const googleStrat = require("passport-google-oauth20").Strategy;
// require("dotenv").config();

// create router
const authRouter = express.Router();

// passport activation
const homeUrl =
  process.env.NODE_ENV == "dev"
    ? "http://127.0.0.1:5500/minio-fileapp/client/index.html"
    : "http://rescirect.io";

// set api routes
authRouter.get("/", authController.working);
authRouter.post("/puser", validatePUser, authController.createUserPrisma);
authRouter.get("/puser", authController.getPrismaUsers);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  authController.redirectGoogle
);
authRouter.get("/logout", authController.logout);
authRouter.get("/currentUser", authController.getCurrentUser);

module.exports = { passport, authRouter };

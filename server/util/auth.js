const passport = require("passport");
const { findOrCreatePrismaUser } = require("../models/users.model");
const googleStrat = require("passport-google-oauth20").Strategy;
require("dotenv").config();

function activateGoogleOAuth() {
  const homeUrl =
    process.env.NODE_ENV == "dev"
      ? "http://localhost:3005/auth/google/callback"
      : "http://rescirect.io/auth/google/callback";

  passport.initialize();
  passport.session();

  passport.use(
    new googleStrat(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: homeUrl,
      },
      function (accessToken, refreshToken, profile, done) {
        const {
          given_name: firstName,
          family_name: lastName,
          email,
        } = profile._json;

        findOrCreatePrismaUser(firstName, lastName, email);
        // console.log(profile);
        return done(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log(user._json);
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
}

module.exports = { activateGoogleOAuth };

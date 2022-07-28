const passport = require("passport");
const googleStrat = require("passport-google-oauth20").Strategy;

function activateGoogleOAuth() {
  passport.use(
    new googleStrat(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost.com/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(err, user);
      }
    )
  );
}

module.exports = activateGoogleOAuth;

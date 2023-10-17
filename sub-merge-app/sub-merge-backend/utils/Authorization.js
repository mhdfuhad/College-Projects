const passportJWT = require("passport-jwt");
const passport = require("passport");
const { ExtractJwt, Strategy } = passportJWT;
require("dotenv").config();

// Strategy for JWT that will be used to authenticate the user for all secure routes
passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    },
    (jwtPayload, cb) => {
      if (!jwtPayload) {
        return cb(null, false);
      }
      return cb(null, jwtPayload);
    }
  )
);

const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys.js");
const salt = 10;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const foundUser = await User.findOne({ username });
    let passwordsMatch;
    if (foundUser) {
      passwordsMatch = bcrypt.compareSync(password, foundUser.password);
      //   console.log(foundUser.password);
      //   console.log(password);
      console.log(passwordsMatch);

      if (passwordsMatch) return done(null, foundUser);
      else return done(null, false);
    } else {
      passwordsMatch = false;
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

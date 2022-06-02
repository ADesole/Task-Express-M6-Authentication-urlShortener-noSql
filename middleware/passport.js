const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const salt = 10;
const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const foundUser = await User.findOne({ username });
    let passwordsMatch;
    if (foundUser) {
      passwordsMatch = bcrypt.compareSync(foundUser.password, password);
      console.log(foundUser.password);
      console.log(password);
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

const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signup, signin, getUsers } = require("./users.controllers");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);

module.exports = router;

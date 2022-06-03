const User = require("../../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    const payload = {
      id: req.user.id,
      username: req.user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  console.log("🚀 ~ file: users.controllers.js ~ line 31 ~ token", token);
  return { token };
};

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + 60 * 60 * 60,
    };
    const token = jwt.sign(JSON.stringify(payload), "asdasds");
    res.status(201).json({ token });

    // res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const User = require("../../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    // res.json({ req });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 60 * 60 * 60,
  };
  const token = jwt.sign(JSON.stringify(payload), "asdasds");
  return token;
};

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    // generateToken(newUser);
    res.status(201).json(newUser);
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

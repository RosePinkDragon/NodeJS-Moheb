const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// ** Handle Errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err.message);
  if (err.message === "Incorrect Details" || err.message === "User Not Found") {
    errors.email = "Invalid Email Or Password";

    console.log(errors);
  }

  if (err.code === 11000) {
    errors.email = "That Email is already taken";
  }

  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Json Web Token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, "somesecret", { expiresIn: maxAge });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

module.exports.login_get = (req, res) => {
  res.render("log-in", { title: "Login Page" });
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("BlogsCookie", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("BlogsCookie", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

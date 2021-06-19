const User = require("../models/userModel");

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

module.exports.login_get = (req, res) => {
  res.render("log-in", { title: "Login Page" });
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
};

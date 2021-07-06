const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const token = req.cookies.BlogsCookie;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        if (!user) {
          res.locals.user = null;
          next();
        }
        console.log(decodedToken);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireUser = (req, res, next) => {
  const token = req.cookies.BlogsCookie;

  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/log-in");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/log-in");
  }
};

module.exports = { checkUser, requireUser };

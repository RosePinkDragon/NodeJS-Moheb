const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const token = req.cookies.BlogCookie;

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
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
  }
};

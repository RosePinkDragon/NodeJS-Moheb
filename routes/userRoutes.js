const express = require("express");
const userController = require("../controllers/userController");
const User = require("../models/userModel");

const router = express.Router();

router.get("/sign-up", userController.signup_get);
router.post("/sign-up", userController.signup_post);
router.get("/log-in", userController.login_get);
router.post("/log-in", userController.login_post);
router.get("/log-out", userController.logout_get);
// router.delete("/del", () =>{
//   User.deleteMany({}).then(()=>{
//     console.log('deleted')
//   })
// });

module.exports = router;

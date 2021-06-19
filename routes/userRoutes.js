const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/sign-up", userController.signup_get);
router.post("/sign-up", userController.signup_post);
router.get("/log-in", userController.login_get);
router.post("/log-in", userController.login_post);

module.exports = router;

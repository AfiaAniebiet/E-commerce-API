const express = require("express");
const router = express.Router();

//Method 1
// const authController = require('../controllers/auth.controller')
//
// router.get('/logout', authController.logoutUser)
// router.post('/register', authController.registerUser)
// router.post('/login', authController.loginUser)

//Method 2
const { registerUser, logoutUser, loginUser } = require("../controllers/auth.controller");

router.get("/logout", logoutUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

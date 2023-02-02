const express = require('express')
const router = express.Router()

//Method 1
// const authController = require('../controllers/auth.controller')
//
// router.get('/logout', authController.logoutUser)
// router.post('/register', authController.registerUser)
// router.post('/login', authController.loginUser)

//Method 2
const {registerUser, logoutUser, loginUser} = require('../controllers/auth.controller')

router.route('/logout').get(logoutUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router
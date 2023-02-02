const User = require('../models/user.model')

const registerUser = async (req, res, next) => {
    res.send('Register Route')
}

const loginUser = async (req, res, next) => {
    res.send('Login Route')
}

const logoutUser = async (req, res, next) => {
    res.send('Logout Route')
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}
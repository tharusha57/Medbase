const express = require('express')
const router = express.Router()

const { signupUser, loginUser, signupDoctor , loginDoctor } = require('../controllers/userControllers')

//login route for users
router.post('/loginuser', loginUser)

//login route for doctors
router.post('/logindoctor', loginDoctor)

//signup route for users
router.post('/signupuser', signupUser)

//signup route for Doctors
router.post('/signupdoctor', signupDoctor)

module.exports = router
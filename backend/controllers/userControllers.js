const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')

const createToken = ((_id, isDoctor) => {
    return jwt.sign({ _id, isDoctor }, process.env.SECRET, {
        expiresIn: '3d'
    })
})

const loginDoctor = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const doctor = await Doctor.login(email, password)
        const name = doctor.username
        const token = await createToken(doctor._id, doctor.isDoctor)
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({email,name,msg: 'Doctor logged in'})

    } catch (error) {
        next(error)
    }
}


const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id, user.isDoctor)

        const {_id} = user

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({email, _id,msg : 'User logged in'})

    } catch (error) {
        next(error)
    }
}

const signupDoctor = async (req, res, next) => {
    const { username, email, password, NIC, GOV, speciality, hospital } = req.body

    try {
        const hash = await Doctor.signup(email, password)

        const doctor = await Doctor.create({ username, email, password: hash, NIC, GOV, speciality, hospital })

        const token = createToken(doctor._id, doctor.isDoctor)

        res.cookie('access token', token, {
            httpOnly: true
        }).status(200).json({ email, token , _id})

    } catch (error) {
        next(error)
    }
}

const signupUser = async (req, res, next) => {
    const { username, email, password, gender, occupation, age,bloodType ,height,weight,dateofbirth} = req.body

    try {
        const hash = await User.signup(email, password)

        const user = await User.create({
            username, email, password: hash, gender, occupation, age, bloodType,height,weight,dateofbirth
        })

        const _id = user._id

        const token = createToken(user._id, user.isDoctor)

        res.cookie('access token', token, {
            httpOnly: true
        }).status(200).json({ email, token , _id})

    } catch (error) {
        next(error)
    }
}

module.exports = { signupUser, loginUser, signupDoctor, loginDoctor }
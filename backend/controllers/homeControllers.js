const mongoose = require('mongoose')
const { find } = require('../models/doctorModel')
const User = require('../models/userModel')
const { createError } = require('../utils/createError')

//get a user
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(404, 'No Such User'))
    }

    const user = await User.findById(id)

    if (!user) {
        return next(createError(404, 'No Such User'))
    }

    res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//get all users
const getUsers = async (req,res,next) => {
    try {
        const userList = await User.find()
        res.status(200).json(userList)
    } catch (error) {
        next(error)
    }
}

//update user table details
const updateTable = async(req,res,next) => {
    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(404, 'No Such User'))
        }
    
        
        const {seriumCholesterol,seriumTriglycerides,cholesterolHDL,cholesterolNHDL,cholesterolLDL,cholesterolVLDL,CHOL,LDL} = req.body

        const response = await User.findByIdAndUpdate(id , {
            "cholesterolDetails.seriumCholesterol" : seriumCholesterol,
            "cholesterolDetails.seriumTriglycerides" : seriumTriglycerides,
            "cholesterolDetails.cholesterolHDL" : cholesterolHDL,
            "cholesterolDetails.cholesterolNHDL" : cholesterolNHDL,
            "cholesterolDetails.cholesterolLDL" : cholesterolLDL,
            "cholesterolDetails.cholesterolVLDL" : cholesterolVLDL,
            "cholesterolDetails.CHOL" : CHOL,
            "cholesterolDetails.LDL" : LDL,

        })

        res.status(200).json({response})

    } catch (error) {
        next(error)
    }
}

//update a user medical details
const updateMainDetails = async (req, res, next) => {
    try {
        const { id } = req.params
    let updatedUser = await User.findById(id)

    const { cholesterol, glucose, bloodPressure, pulseRate } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(404, 'No Such User'))
    }
    
    if(cholesterol){
        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: { "medicalDeatils.cholesterol": cholesterol },
        }, { new: true })

    }
    if(glucose){
        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: { "medicalDeatils.glucose": glucose },
        }, { new: true })
    }
    if(bloodPressure){
        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: { "medicalDeatils.bloodPressure": bloodPressure },
        }, { new: true })

    }
    if(pulseRate){
        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: { "medicalDeatils.pulseRate": pulseRate },
        }, { new: true })

    }

    if (updatedUser.medicalDeatils.cholesterol.length > 4) {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $pop: { "medicalDeatils.cholesterol": -1 }
        })
    }

    if (updatedUser.medicalDeatils.glucose.length > 4) {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $pop: { "medicalDeatils.glucose": -1 }
        })
    }

    if (updatedUser.medicalDeatils.bloodPressure.length > 4) {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $pop: { "medicalDeatils.bloodPressure": -1 }
        })
    }

    if (updatedUser.medicalDeatils.pulseRate.length > 4) {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $pop: { "medicalDeatils.pulseRate": -1 }
        })
    }

    if (!updatedUser) {
        return next(createError(404, ' No Such User'))
    }

    res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

const updateMedicalLog = async (req,res,next) => {
    try {
        const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(404, 'No Such User'))
    }

    const {medicine , take} = req.body

    const updatedUser = await User.findByIdAndUpdate(id , {
        $push :{ medicalLog : {medicine : medicine , take : take}}
    })
    
    if(!updatedUser){
        next(createError(404 , 'No Such User'))
    }

    res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}


const updateNote = async (req,res,next) => {
    try {
        const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(404, 'No Such User'))
    }

    const {note , doctor} = req.body

    const updatedUser = await User.findByIdAndUpdate(id , {
        $push : { notes : { note : note , doctor : doctor}}
    })

    if(!updatedUser){
        next(createError(404 , 'No Such User'))
    }

    res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

module.exports = { getUser, getUsers , updateMainDetails ,updateMedicalLog , updateNote , updateTable}
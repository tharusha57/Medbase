const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
    },
    dateofbirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    medicalDeatils: {
        cholesterol: { type: [Number] },
        glucose: { type: [Number] },
        bloodPressure: { type: [Number] },
        pulseRate: { type: [Number] }
    },
    cholesterolDetails: {
        seriumCholesterol: { type: Number , default : 0},
        seriumTriglycerides: { type: Number , default : 0},
        cholesterolHDL: { type: Number , default : 0},
        cholesterolNHDL: { type: Number , default : 0},
        cholesterolLDL: { type: Number , default : 0},
        cholesterolVLDL: { type: Number , default : 0},
        CHOL: { type: Number , default : 0},
        LDL: { type: Number , default : 0}
    },
    medicalLog: [{ medicine: String, take: Number }],
    notes: [{ note: String, doctor: String }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    bloodType : {
        type : String,
        enum: ['B-', 'B+' , 'A-' ,'A+', 'O-','O+','AB-','AB+']
    },
    height : {
        type : Number
    },
    weight : {
        type:Number
    }
    
})

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('Please Fill all the fields')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid Email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Passwor not strong Enough')
    }

    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('Email already exists')
    }

    //Generating a has for the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Pleased Fill all the feilds')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid Email or Password')
    }

    //compare passwords
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid Email or Password')
    }

    return user
}




module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const doctorSchema = new mongoose.Schema({
    username : {
        type: String ,
        required : true,
        unique : true
    },
    email : {
        type : String , 
        required : true , 
        unique : true
    } , 
    password : {
        type : String ,
        required : true
    } ,
    NIC : {
        type : Number
    } , 
    GOV : {
        type: String ,
        required : true
    },
    speciality : {
        type : String
    },
    hospital : {
        type : String
    } ,
    isadmin : {
        type : Boolean ,
        default : false
    },
    isDoctor : {
        type: Boolean,
        default : true
    },
    isVerified : {
        type : Boolean ,
        default : false
    }

})


doctorSchema.statics.signup = async function(email , password) {

    if(!email || !password){
        throw Error('All Fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exist = await this.findOne({email})

    if(exist){
        throw Error('Email already exist')
    }

    //Generating a hash for the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    return hash
    
}

doctorSchema.statics.login = async function(email,password){

    if(!email || !password){
        throw Error ('All fields must be filled')
    }

    const doctor = await this.findOne({email})

    if(!doctor){
        throw Error ('Invalid Email or Password')
    }

    const match = await bcrypt.compare(password, doctor.password)

    if(!match){
        throw Error('Invalid Email or Password')
    }

    return doctor;

}

module.exports = mongoose.model('Doctor', doctorSchema)


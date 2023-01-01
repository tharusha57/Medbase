require('dotenv').config()

const cookieParser = require('cookie-parser')
const express = require('express')
const { mongoose } = require('mongoose')
const userRoutes = require('./routes/user')
const medicalRoutes = require('./routes/home')

const app = express()

//middlwares
app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user' , userRoutes)
app.use('/api/user/medical' , medicalRoutes)

//middleware error setup
app.use((err,req,res,next)=> {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something Went Wrong'

    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })
})


//database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log('Database connected')

        app.listen(process.env.port, () => {
            console.log('Listening on port ', process.env.port)
        })
    })
    .catch((error)=> {
        console.log(error)
    })
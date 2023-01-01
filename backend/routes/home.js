const express = require ('express')
const router = express.Router()
const {getUser, getUsers , updateMainDetails , updateMedicalLog , updateNote ,updateTable}  = require('../controllers/homeControllers')
const { verifyDoctor, verifyUser } = require('../middleware/verifyToken')

//Get a user
router.get('/:id' ,  getUser )

router.get('/',  getUsers)

//update user main medical details
router.patch('/update/:id' ,   updateMainDetails )

//update table details
router.patch('/update/table/:id', updateTable)

//update user medical log 
router.patch('/updateMedicalLog/:id' ,  updateMedicalLog )

//update user medical notes
router.patch('/updateMedicalNotes/:id' ,  updateNote )

module.exports = router
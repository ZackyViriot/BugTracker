const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../Validation/registerValidation')

// @route       GET /api/auth/test
// @desc        Test the auth route
// @access      Public 
router.get("/test",(req,res) => {
    res.send("Auth route working")
})

// @route       POST/api/auth/regisiter
// @desc        Create a new user
// @access      Public

router.post("/register", async (req,res) => {
    try {
        const {errors,isValid} = validateRegisterInput(req.body)

        if(!isValid){
            return res.status(400).json(errors)
        }

        // check for exisiting user
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        })
        if(existingEmail){
            return res.status(400).json({error:"this email has already been emailed"})
        }
        // hash the password 
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        //try code in here
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            name:req.body.name
        })

        // save the user to data base 
        const savedUser = await newUser.save()

        //retrun the new user 
        return res.json(savedUser)

    } catch (err) {
        //Error here
        console.log(err)

        res.status(500).send(err.message)
    }
})



module.exports = router;

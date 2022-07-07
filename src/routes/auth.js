const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../Validation/registerValidation')
const jwt = require('jsonwebtoken')
const requiresAuth = require("../middleware/permission")

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

        //save the user to databse 
        const savedUser = await newUser.save()

        const userToReturn = {...savedUser._doc}
        delete userToReturn.password


        //retrun the new user 
        return res.json(userToReturn)

    } catch (err) {
        //Error here
        console.log(err)

        res.status(500).send(err.message)
    }
})
// @route       POST/api/auth/login
// @desc        Login user and return a access token
// @access      Public

router.post('/login',async (req,res) => {
    try {
        // check for the user 
        const user = await User.findOne({
            email:new RegExp("^" + req.body.email + "$", "i")
        })
        if(!user){
            return res.status(400).json({error:'There was a problem with your login credentials'})
        }


        const passwordMatch = await bcrypt.compare(req.body.password,user.password);

        if(!passwordMatch){
            return res.status(400).json({error:'There was a problem with your login credentials'})
        }
        const payload = {userId: user._id};
        const token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("access-token",token,{
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 100),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        const userToReturn = {...user._doc};
        delete userToReturn.password;
        return res.json({
            token:token,
            user:userToReturn,

        })

        return res.json({passwordMatch:passwordMatch})
    }catch(err){
        console.log(err);

        return res.status(500).send(err.message)
    }
})
// @route       GET /api/auth/current
// @desc        Return the currently authed user
// @access      private

router.get("/current", requiresAuth ,(req,res) => {
    if(!req.user){
        return res.status(401).send("Unauthorized")

    }

    return res.json(req.user)
})

// @ route  PUT/api/auth/logout
// @  desc  Logout user and clear the cookie 
// @ access private


router.put("/logout",requiresAuth, async(req,res) => {
    try{
        res.clearCookie("access-token")


        return res.json({success: true})
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message)
    }
})
module.exports = router;

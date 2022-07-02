const express = require('express');
const router = express.Router();
const Ticket  = require("../models/Ticket")
const requiresAuth = require("../middleware/permission")
const validateTicketInput = require('../Validation/ticketValidation')


// @route  GET /api/Tickets/test
// @desc    Test the todos route
// @acesss Public


router.get("/test",(req,res) => {
    res.send("Tickets route is working")
})


// @route POST/api/ticket/new
// @desc Create a new ticket 
// @access  Private 

router.post("/new",requiresAuth, async (req,res) => {
    try{
        const {isValid,errors} = validateTicketInput(req.body)

        if(!isValid){
            return res.status(400).json(errors);
        }
        // create a new ticket 
        const newTicket = new Ticket({
            user: req.user._id,
            content: req.body.content,
            complete:false,
        })

        //save the new ticket 

        await newTicket.save()
        return res.json(newTicket);
    }catch(err) {
        console.log(err)

        return res.status(500).send(err.message);
    }
});
// @route GET/api/ticket/current
// @desc current user tickets
// @access  Private 

router.get('/current',requiresAuth, async (req,res) => {
    try{
        const completeTicket = await Ticket.find({
            user: req.user._id,
            complete:true,

        }).sort({completedAt:-1});

        const incompleteTicket = await Ticket.find({
            user:req.user._id,
            complete:false
        }).sort({createdAt: -1})

        return res.json({incomplete: incompleteTicket,complete: completeTicket})
    }catch(err){
        console.log(err);

        return res.status(500).send(err.message)
    }
})



module.exports = router;
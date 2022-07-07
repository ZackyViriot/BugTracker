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
// @route PUT/api/ticket/:ticketId/complete
// @desc Mark a ticket as complete
// @access  Private 


router.put('/:ticketId/complete',requiresAuth,async(req,res) => {
    try{
        const ticket = await Ticket.findOne({
            user: req.user._id,
            _id: req.params.ticketId
        })
        if(!ticket){
            return res.status(404).json({error:'Could not find Ticket'})
        }
        if(ticket.complete){
            res.status(400).json({error: 'Ticket is already complete'})
        }

        const updatedTicket = await Ticket.findOneAndUpdate(
            {
                user: req.user._id,
                _id:req.params.ticketId
            },
            {
                complete:true,
                completedAt: new Date(),
            },
            {
                new: true
            }

        )
        return res.json(updatedTicket);
    }catch(err){
        console.log(err);
        return res.status(500).send(err.message)
    }
})

// @route PUT/api/ticket/:ticketId/incomplete
// @desc Mark a ticket as incomplete
// @access  Private 

router.put("/:ticketId/incomplete",requiresAuth , async (req,res) => {
    try{
        const ticket = await Ticket.findOne({
            user:req.user._id,
            _id: req.params.ticketId
        })

        if(!ticket){
            return res.status(404).json({error: "Could not find ticket"})
        }

        if(!ticket.complete){
            return res.status(400).json({error: "Ticket is already incomplete"})
        }

        const updatedTicket = await Ticket.findOneAndUpdate(
            {
                user:req.user._id,
                _id: req.params.ticketId,
            },
            {
                complete:false,
                completedAt:null
            },
            {
                new:true,
            }
        )
        return res.json(updatedTicket)
    }catch(err){
        console.log(err);
        return res.status(500).send(err.message)
    }
})


// @ route PUT/api/ticket/:ticketId
// @  desc update a ticket
// @ access private

router.put("/:ticketId",requiresAuth, async (req,res) => {
    try{
        const ticket  = await Ticket.findOne({
            user:req.user._id,
            _id: req.params.ticketId
        })

        if(!ticket){
            return res.status(404).json({error: "Could not find ticket"})
        }
        const {isValid,errors} = validateTicketInput(req.body);

        if(!isValid){
            return res.status(400).json(errors)
        }

        const updatedTicket = await Ticket.findOneAndUpdate(
            {
                user:req.user._id,
                _id:req.params.ticketId ,
            },
            {
                content: req.body.content
            },
            {
                new:true
            }
        )
        return res.json(updatedTicket)

    }catch(err){
        console.log(err)

        return res.status(500).send(err.message)
    }
})



// @ route  Delete/api/ticket/:ticketId
// @  desc Delete a ticket
// @ access private


router.delete("/:ticketId",requiresAuth, async (req,res )=> {
    try{
        const ticket = await Ticket.findOne({
            user: req.user._id,
            _id:req.params.ticketId
        });
        if(!ticket){
            return res.status(404).json({error: "Could not find ticket"})
        }

        await Ticket.findOneAndRemove({
            user: req.user._id,
            _id: req.params.ticketId
        })
        return res.json({success:true});
    }catch(err){
        console.log(err)
        return res.status(500).send(err.message)
    }
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
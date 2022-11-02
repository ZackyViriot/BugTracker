const { compare } = require('bcryptjs')
const  {schema,model, Schema} = require('mongoose')

const TicketSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        severity:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        complete:{
            type: Boolean,
            default:false,
        },
        completedAt:{
            type:Date,
        }
    },{
        timestamps:true,
    }
)

//export model
const Ticket = model("Ticket",TicketSchema);
module.exports = Ticket
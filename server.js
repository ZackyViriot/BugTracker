require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const path = require("path")

//import routes 
const authRoute = require("./src/routes/auth")
const ticketRoute = require("./src/routes/ticket")

const app = express();


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())



app.get("/api", (req, res) => {
    res.send('Bug Tracker course Express Server')
});




app.use("/api/auth",authRoute);
app.use("/api/ticket",ticketRoute)




//connet to data base 
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database')

    app.listen(process.env.PORT, () => {
        console.log(`Server running on  port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error)
})

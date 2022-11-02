require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const path = require('path')
// import routes
const authRoute = require('./routes/auth')
const ticketRoute = require('./routes/ticket')

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Full stack React express Server");
});


app.use("/api/auth",authRoute);
app.use('/api/ticket',ticketRoute);
app.use(express.static(path.resolve(__dirname,'./client/build')))

app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname,"./client/build",'index.html'))
})


//going to connect to database
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connect to the database");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
}).catch((error) => {
    console.log(error);
}); 

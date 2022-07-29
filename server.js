const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
const User = require('./models/user.model')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);

//server
app.listen(process.env.PORT, () => console.log("🚀 Server Launched - Listening on port", process.env.PORT || 5000));

const user = new User({
    name : 'name', 
    userName : 'username',
    password : 'password',
    soldAccount : '1000',
})

//user.save();

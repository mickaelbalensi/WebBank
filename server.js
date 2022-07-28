const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);

//server
app.listen(5555, () => console.log("🚀 Server Launched - Listening on port", process.env.PORT || 5555));

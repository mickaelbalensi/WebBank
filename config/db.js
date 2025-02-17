require("dotenv").config({ path: "./config/.env" });

const mongoose = require("mongoose");
mongoose
  .connect(
   
    process.env.MONGOLAB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Failed connection MongoDb", err));



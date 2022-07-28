const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://micko:Mongo61352+@cluster0.owzh6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",   
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Failed connection MongoDb", err));


  // "mongodb+srv://aviel:123@cluster0.dlj2uh3.mongodb.net/mern-project",
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://aviel:123@cluster0.dlj2uh3.mongodb.net/mern-project",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Failed connection MongoDb", err));

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLen: 55,
    unique: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    minLength: 3,
    maxLen: 55,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLen: 55,
    trim: true,
  },
  soldAccount: {
    type: String,
  },
  historicAccount: {
    type: [String],
  },
  creditSource: {
    type: [String],
  },
  NameSource: {
    type: [String],
  },

  creditDestination: {
    type: [String],
  },
  nameDestination: {
    type: [String],
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;

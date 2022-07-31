const UserModel = require("../models/user.model");
const { Types } = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectID;

// Get All users

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select();
  res.status(200).json(users);
};

// Find a specific user by id
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unkwnown : " + req.params.id);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select();
};

//update soldAccount
module.exports.updateUser = async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unkwnown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          soldAccount: req.body.soldAccount,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

module.exports.updateController = async (req,res) => {
  console.log(req.body);
  const user = req.user;
  
  UserModel.findByIdAndUpdate(user.id, req.body, function(err) {
    if (err) {
      console.log(err);
    }
  })
  return res.status(200).json({id: user.id, nameConnected: req.user.name});
};

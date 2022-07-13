const UserModel = require("../models/user.model");

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { name, userName, password } = req.body;

  try {
    const user = await UserModel.create({ name, userName, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

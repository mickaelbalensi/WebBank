const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "./config/.env" });


module.exports.RegisterController = async (req, res) => {
  const exist = await User.findOne({ userName: req.body.userName });

  if (exist !== null)
    return res
      .status(303)
      .json({ userName: "This username already exists" })

  const hashedPassword = await bcrypt.hash(req.body.password,10);
  const user = await User.create({ 
    ...req.body,
    password : hashedPassword,
    numAccount : req.totalCount
  });
  res.status(201).json({ user: user.id });
};


module.exports.LoginController = async (req,res) => { 
  // Checks that the user exist
  const user = await User.findOne({ userName: req.body.userName });

  if (user === null)
    return res
      .status(404)
      .json({ email: "There is no account associated with this email" })

  // Compare password hash
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch)
    return res.status(400).json({ password: "The password is invalid" })

  // Create JWT, then return it
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: 3600 * 24,
  })
  return res
    .status(200)
    .json({
      id: user.id,
      token,
      name: user.name,
      manager: user.isAdmin,
      numAccount:user.numAccount,
      soldAccount: user.soldAccount,
      loanList:user.loanList,
      transactionList:user.transactionList
     })

}


const router = require("express").Router();
const {TotalBankAccount} = require("../middleware/auth_middleware");

const {RegisterController,LoginController} = require("../controllers/auth.controller");

//auth

router.post("/register",TotalBankAccount, RegisterController);
router.post("/login", LoginController);

module.exports = router;

const router = require("express").Router();
const {RegisterController, LoginController} = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//auth

router.post("/register", RegisterController);
router.post("/login", LoginController);

// userDisplay
router.get("/", userController.getAllUsers);

//choise by id
router.get("/:id", userController.userInfo);

//update
router.put("/:id", userController.updateUser);

//export
module.exports = router;

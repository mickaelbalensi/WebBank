const router = require("express").Router();

const {Authorization} = require("../middleware/auth_middleware");
const userController = require("../controllers/user.controller");

// userDisplay
router.get("/",Authorization, userController.getAllUsers);

//choise by id
router.get("/:id", userController.userInfo);

//update
router.put("/:id", userController.updateUser);

router.post("/updateUser",Authorization, userController.updateController);
//export
module.exports = router;

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { authUser, authorizePermissions } = require("../middleware/authentication");

router.route("/").get(authUser, authorizePermissions("admin", "owner"), userController.getAllUsers);
router.route("/currentuser").get(authUser, userController.showCurrentUser);
router.route("/updateuser").patch(authUser, userController.updateUser);
router.route("/updatepassword").patch(authUser, userController.updateUserPassword);
router.route("/:id").get(authUser, userController.getSingleUser);

module.exports = router;

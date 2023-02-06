const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.route("/").get(userController.getAllUsers);
router.route("/currentUser").get(userController.showCurrentUser);
router.route("/updateUser").patch(userController.updateUser);
router.route("/updatePassword").patch(userController.updateUserPassword);
router.route("/:id").get(userController.getSingleUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const { authUser, authorizePermissions } = require("../middleware/authentication");

router.get("/", authUser, authorizePermissions("admin"), orderController.getAllOrders);
router.get("/showAllMyOrders", authUser, orderController.getCurrentUserOrders);
router.post("/", authUser, orderController.createOrder);
router.get("/:id", authUser, orderController.getSingleOrder);
router.patch("/:id", authUser, orderController.updateOrder);

module.exports = router;

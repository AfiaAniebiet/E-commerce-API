const express = require("express");
const router = express.Router();

const { authUser, authorizePermissions } = require("../middleware/authentication");
const productsController = require("../controllers/products.controller");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post([authUser, authorizePermissions("admin")], productsController.createProduct);

router.route("/uploadImage").post([authUser, authorizePermissions("admin")], productsController.uploadImage);

router
  .route("/product/:id")
  .get(productsController.getSingleProduct)
  .patch([authUser, authorizePermissions("admin")], productsController.updateProduct)
  .delete([authUser, authorizePermissions("admin")], productsController.deleteProduct);

module.exports = router;

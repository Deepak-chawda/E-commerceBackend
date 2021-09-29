const router = require("express").Router();
// require controller file here
const {
  fetchUserProductController,
  fetchAdminProductController,
  addProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductController
} = require("../../controller/product/product.controller");
const auth = require("../../middleware/auth")
// fetch user product
router.get("/api/get/user/product", fetchUserProductController);
// fetch admin product 
router.get("/api/get/admin/product", auth, fetchAdminProductController);
// add product by admin
router.post("/api/add/product", auth, addProductController);
// update product by admin
router.put("/api/update/product", auth, updateProductController);
// delete product by admin
router.delete("/api/delete/product", auth, deleteProductController);
// fetch all product without log in 
router.get("/api/get/all/product", fetchAllProductController);

// here exports all router for using other place
module.exports = router;

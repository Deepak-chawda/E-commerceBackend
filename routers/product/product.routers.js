const router = require("express").Router();
// require controller file here
const {
  fetchUserProductController,
  fetchAdminProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../../controller/product/product.controller");
const auth = require("../../middleware/auth")
// fetch user product
router.get("/api/get/user/product", auth, fetchUserProductController);
// fetch admin product 
router.get("/api/get/admin/product", auth, fetchAdminProductController);
// add product by admin
router.post("/api/add/product", auth, addProductController);
// update product by admin
router.put("/api/update/product", auth, updateProductController);
// delete product by admin
router.delete("/api/delete/product", auth, deleteProductController);

// here exports all router for using other place
module.exports = router;

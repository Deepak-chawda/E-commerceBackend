const router = require("express").Router();

// require controller file here
const {
  fetchProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../../controller/product/prodict.controller");
const auth = require("../../middleware/auth")
// fetch
router.get("api/get/product", auth, fetchProductController);
// add
router.post("api/add/product", auth, addProductController);
// update
router.put("api/update/product", auth, updateProductController);
// delete
router.delete("api/delete/product", auth, deleteProductController);

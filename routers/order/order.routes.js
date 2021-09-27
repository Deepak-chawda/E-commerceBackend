// here require router method from express
const router = require("express").Router();

// require  all controller here  as a object
const {
  getOrderController,
  addOrderController,
  // updateOrderController,
  deleteOrderController,
} = require("../../controller/order/order.controller");
const auth = require("../../middleware/auth");

// user order router

router.get("/api/get/order", auth, getOrderController);
router.post("/api/add/order", auth, addOrderController);
router.delete("/api/delete/order", auth, deleteOrderController);

// here exports all router for using other place
module.exports = router;

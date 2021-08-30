// here require router method from express
const router = require("express").Router();

// require  all controller here  as a object
const {
  getWishlistController,
  addWishlistController,
  deleteWishlistController,
} = require("../../controller/wishlist/wishlist.controller");
const auth = require("../../middleware/auth");

// user order router

router.get("/api/get/wishlist", auth, getWishlistController);
router.post("/api/add/wishlist", auth, addWishlistController);
router.delete("/api/delete/wishlist", auth, deleteWishlistController);

// here exports all router for using other place
module.exports = router;

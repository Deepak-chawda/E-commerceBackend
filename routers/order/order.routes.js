// here require router method from express 
const router = require("express").Router();

// require  all controller here  as a object 
const { placeOrderController }=require ("../../controller/order/order.controller")
const auth = require("../../middleware/auth")

// sigin  user router 
router.post("/api/place/order" , auth, placeOrderController);



// here exports all router for using other place
module.exports = router;

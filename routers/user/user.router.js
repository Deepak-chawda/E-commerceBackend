const { signupController, signinController } = require("../../controller/user/user.controller");

// here require router method from express 
const router = require("express").Router();

// require  all controller here  as a object 
const {signupController, signinController }=require ("../../controller/user/user.controller")

// sigin router 
router.post("/api/sigin" , signinController);
// signup router
router.post("/api/signup", signupController);


// here exports all router for using other place
module.exports = router;


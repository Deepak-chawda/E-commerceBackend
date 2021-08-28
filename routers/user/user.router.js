// here require router method from express 
const router = require("express").Router();

// require  all controller here  as a object 
const {signupController, signinController }=require ("../../controller/user/user.controller")

// sigin  user router 
router.post("/api/sigin" , signinController);
// signup user  router
router.post("/api/signup", signupController);

// this is ADMIN routes only call by postman app
router.post("/api/admin/signup", signupController);


// here exports all router for using other place
module.exports = router;


require("dotenv").config({ path: "../.env" });
const User = require("../models/user/user.model");
const jwt = require("jsonwebtoken");

// authentication for protected router
const auth = async (req, res, next) => {
  // middleware function
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    
    if (!token) {
      const error = "Invalid authorization token";
      res.json({ error, code: 400 });
    }
    // console.log(token)
    const decoded = await jwt.verify(token , process.env.SECRET_KEY);
    // console.log(decoded)
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      const error = "Invalid user !";
      res.json({ error, code: 404 });
    }
    // starting user in req object so that we can access it later
    req.user = user;
    next();
  } catch (error) {
    console.log("error=> ", error);
    const msg = "Access denied!";
    res.json({ msg, code: 401 });
  }
};
module.exports = auth;

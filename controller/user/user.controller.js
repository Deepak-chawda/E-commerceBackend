require("dotenv").config({ path: "../../.env" });
// here require UserModel
const UserModal = require("../../models/user/user.model");
//  here i am require bcrypt package for change password to hash function
var bcrypt = require("bcryptjs");
// here i am require jsonwebtoken package to create tokon
var jwt = require("jsonwebtoken");
// here is a signin logic
exports.signinController = async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user)
      return res.json({ error: "Invalid user mail ", data: null, code: 404 });

    // check password & compare
    // console.log(user.password)
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // console.log(comparePassword)
    if (!comparePassword)
      return res.json({ error: "Invalid password ", data: null, code: 404 });

    // jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    //   console.log(token);
    // });

    //  here i am creating token asynchronously
    const token = await jwt.sign(
      { _id: user._id.toString()},
      process.env.SECRET_KEY
    );

    res.json({ data: { user, token }, error: null, code: 200 });
  } catch (error) {
    console.log("error => ", error);
    res.json({ error: "Something went wrong", data: null, code: 500 });
  }
};
// ....................................................................................................................................................................................................................................................................................................
// here is a signup logic
exports.signupController = async (req, res) => {
  const isAdmin = req.query.isAdmin; //tue, false
  // because isAdmin return to string type so you need to conver into boolean type
  const $isAdmin = isAdmin=== "true" ? true : false;
  try {
    if (!$isAdmin) {
      const newUser = new UserModal({
        email: req.body.email,
        password: req.body.password,
        role: "USER",
      });
      // if (UserModal.exists({ email : req.body.email })) {
      //   return res.json({err : "This email already present in database",data: null, code: 404,});
      // }
      // this is a sync function below convert in async function
      // bcrypt.genSalt(10, function(err, salt) {
      //     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
      //         // Store hash in your password DB.
      //     });
      // });
      // here i am secure password to change hash algorithem
      const salt = await bcrypt.genSalt(); // create password solt
      const hashedPassword = await bcrypt.hash(newUser.password, salt); //hash password +solt
      newUser.password = hashedPassword;
      await newUser.save();
      res.json({ data: newUser, error: null, code: 200 });
    } else {
      const newUser = new UserModal({
        email: req.body.email,
        password: req.body.password,
        role: "ADMIN",
      });
      // this is a sync function below convert in async function
      // bcrypt.genSalt(10, function(err, salt) {
      //     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
      //         // Store hash in your password DB.
      //     });
      // });
      // here i am secure password to change hash algorithem
      const salt = await bcrypt.genSalt(); // create password solt
      const hashedPassword = await bcrypt.hash(newUser.password, salt); //hash password +solt
      newUser.password = hashedPassword;
      await newUser.save();
      res.json({ data: newUser, error: null, code: 200 });
    }
  } catch (error) {
    console.log("error => ", error);
    res.json({
      error: "Something  went wrong",
      data: null,
      code: 500,
    });
  }
};

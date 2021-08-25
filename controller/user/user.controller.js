// here require UserModel
const UserModal = require("../../models/user/user.model");
//  here i am require bcrypt for change password to hash function
var bcrypt = require("bcryptjs");
// here is a signin logic
exports.signinController = async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user)
      return res.json({ error: "Invalid user ", data: null, code: 404 });
    // check password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword)
      return res.json({ error: "Invalid user", data: null, code: 404 });

    res.json({ data: user, error: null, code: 200 });
  } catch (error) {
    console.log("error => ", error);
    res.json({ error: "Something went wrong", data: null, code: 500 });
  }
};



// ....................................................................................................................................................................................................................................................................................................
// here is a signup logic 
exports.signupController = async (req, res) => {
  try {
    const newUser = new UserModal({
      email: req.body.email,
      password: req.body.password,
    });
    // this is a sync function below convert in async function
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });
    const salt = await bcrypt.genSalt(); // create password solt
    const hashedPassword = await bcrypt.hash(newUser.password, salt); //hash password +solt
    newUser.password = hashedPassword;
    await newUser.save();
    res.json({ data: UserModal, error: null, code: 200 });
  } catch (error) {
    console.log("error => ", error);
    res.json({
      error: "Something  went wrong.........",
      data: null,
      code: 500,
    });
  }
};

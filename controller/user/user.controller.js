require("dotenv").config({ path: "../../.env" });
// here require cloudnary file for image upload
const { cloudinary } = require("../../Cloudenary/cloudnary");
// here require UserModel
const UserModal = require("../../models/user/user.model");
//  here i am require bcrypt package for change password to hash function
var bcrypt = require("bcryptjs");
// here i am require jsonwebtoken package to create tokon
var jwt = require("jsonwebtoken");
// check  emailExistence

// here is a signin logic
exports.signinController = async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ error: "Invalid user mail ", data: null, code: 404 });

    // check password & compare
    // console.log(user.password)
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // console.log(comparePassword)
    if (!comparePassword)
      return res
        .status(400)
        .json({ error: "Invalid user password ", data: null, code: 404 });

    // jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    //   console.log(token);
    // });

    //  here i am creating token asynchronously
    const token = await jwt.sign(
      { _id: user._id.toString() },
      process.env.SECRET_KEY
    );
    // don't send password for front end
    user.password = undefined;
    res.status(200).json({
      data: { user, token },
      msg: "login successfully",
      error: null,
      code: 200,
    });
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
  const $isAdmin = isAdmin === "true" ? true : false;
  try {
    if (!$isAdmin) {
      const newUser = new UserModal({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        address: req.body.address,
        contact: req.body.contact,
        profilePic: req.body.profilePic,
        cloudinary_id: req.body.cloudinary_id,
        role: "USER",
      });
      // console.log(req.body.email);
      // var emailCheck = require('email-check');

      // // Quick version
      // await emailCheck('deepakchawda9696kdjfkjlk@gmail.com')
      //   .then(function (res) {
      //     // Returns "true" if the email address exists, "false" if it doesn't.
      //     console.log("mail valid",res)
      //   })
      //   .catch(function (err) {
      //     if (err.message === 'refuse') {
      //       // The MX server is refusing requests from your IP address.
      //       console.log("helloddd")
      //     } else {
      //       // Decide what to do with other errors.
      //       console.log("decide")
      //     }
      //   });

      const validateEmail = await UserModal.exists({ email: req.body.email });
      if (validateEmail) {
        return res.status(403).json({
          error: "This email already present in database",
          data: null,
          code: 403,
        });
      }
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
      newUser.password = undefined;
      res.json({ data: newUser, error: null, code: 200 });

       // auto generet mail when user register this site first time
    // const nodemailer = require("nodemailer");
    // send email when login
    //  var transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   requireTLS: true,
    //    service: "gmail",
    //    auth: {
    //      user: process.env.DeveloperMail,
    //      pass: process.env.DevloperPass,
    //    },
    //  });
    //  console.log(process.env.DeveloperMail)
    //  console.log(process.env.DevloperPass)

    //  var mailOptions = {
    //    from: process.env.DeveloperMail,
    //    to: req.body.email,
    //    subject: "Auto email SignUp Message",
    //    text: `Hello ${req.body.userName} , Regards from admin Deepak chawda . Thank You for Joining Iphone store . Please continue your shopping `,
    //  };

    //  transporter.sendMail(mailOptions, function (error, info) {
    //    if (error) {
    //      console.log(error);
    //    } else {
    //      console.log("Email sent: " + info.response);
    //    }
    //  });

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

// here is a edit user profile controller
exports.editUserController = async (req, res) => {
  const userId = req.query._id;
  const UpdateBody = req.body;
  const cloudId = req.query.cloudId;
  try {
    if (!cloudId == null) {
      console.log("hello");
      await cloudinary.uploader
        .destroy(cloudId)
        .then((result) => {
          // response.status(200).send({
          //   message: "success",
          //   result,
          // });
          console.log("image detelet and updated successfully");
        })
        .catch((error) => {
          // response.status(500).send({
          //   message: "Failure",
          //   error,
          // });
          console.log("failed delete");
        });
    }
    // this code for cloudnary image upload
    const uploadImage = await cloudinary.uploader.upload(
      UpdateBody.profilePic,
      {
        upload_preset: "user-profile-image",
      }
    );
    UpdateBody.cloudinary_id = uploadImage.public_id;
    UpdateBody.profilePic = uploadImage.secure_url;
    const edited = await UserModal.findByIdAndUpdate(
      { _id: userId },
      { $set: UpdateBody },
      { new: true }
    );
    edited.password = undefined;
    res.json({
      data: edited,
      error: null,
      code: 200,
      msg: "Edited user details successfull",
    });
  } catch (error) {
    console.log("error => ", error);
    res.json({
      error: "something went wrong",
      data: null,
      code: 500,
    });
  }
};
exports.getUserController= async(req,res)=>{
  const UId = req.query._id
  try {
    const findUser = await UserModal.findById({ _id : UId })
    if(!findUser){
      return res.status(404).json({
        error: "we unable to find user",
        data : null,
        code:500
      })
    }
    findUser.password = undefined;
    res.json({
      data: findUser,
      error: null,
      code: 200,
      msg: "user find successfully",
    });
  } catch (error) {
    console.log("error => ", error);
    res.json({
      error: "something went wrong",
      data: null,
      code: 500,
    });
  }   
  }
exports.finderMail =async(req,res)=>{
  try {
   
    const mailexistOrNot = await UserModal.exists({email:req.body.email})
    if(!mailexistOrNot){
      return res.json({
        msg: "This mail is not exists in data base",
        error : null,
        code : 400
      })
    }
    const user = await UserModal.findOne({ email: req.body.email });
    // res.json({
    //   error:null,
    //   data : user,
    //   msg : "user found"
    // })
    console.log(user._id)
    
    //  here i am creating token asynchronously
    const token = await jwt.sign(
      { _id: user._id.toString() },
      process.env.SECRET_KEY
    );
    // console.log(token)
    var fullUrl = req.protocol + `://api/forgetPass?token=${token}` 
    console.log(fullUrl)
      // auto generet mail when user register this site first time
    const nodemailer = require("nodemailer");
     var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
       service: "gmail",
       auth: {
         user: process.env.DeveloperMail,
         pass: process.env.DevloperPass,
       },
     });
    //  console.log(process.env.DeveloperMail)
    //  console.log(process.env.DevloperPass)
     var mailOptions = {
       from: process.env.DeveloperMail,
       to: req.body.email,
       subject: "Reset or Forget your Iphone email",
       text: `Please click this email to reset your password ............:${fullUrl}`,
      path : ` forget passs`,
      html: `<b>Please click this email to reset your password ${fullUrl}</b>`,
     };

    await transporter.sendMail(mailOptions, function (error, info) {
       if (error) {
         console.log(error);
       } else {
         res.json({
           error : null,
           code : 200,
           msg : "Email sent successfully"
         })
         console.log("Email sent: " + info.response);
       }
     });
    // const user = await UserModal.findOne({ email: req.query.d });
    // res.json({
    //   error:null,
    //   data : user,
    //   msg : "user found"
    // })
    
  } catch (error) {
    console.log("error",error)
  }
}


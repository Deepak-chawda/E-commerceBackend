const productModel = require("../../models/product/product.model");
// here require cloudnary file for image upload
const { cloudinary } = require("../../Cloudenary/cloudnary");
// get product list by admin
exports.fetchAdminProductController = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "ADMIN") {
      return res.json({ error: "Access denied ", data: null, code: 500 });
    }
    const productfetchedAdmin = await productModel.find();
    res.json({ data: productfetchedAdmin, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// get product list by user
exports.fetchUserProductController = async (req, res) => {
  const user = req.user;
  const page = req.query.page
  const limit = req.query.limit
  try {
    //   if(user.role!== "USER"){
    //     return res.json({error : "Access denied ", data : null , code : 500})
    // }
    const productfetched = await productModel.find();
    const startIndex = (page-1)*limit
    const endIndex = page*limit
    const productfetcheds= productfetched.slice(startIndex,endIndex)
    res.json({ data: productfetcheds, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// add product in data base by admin
exports.addProductController = async (req, res) => {
  const user = req.user;
  const cap = req.body.category
  const newCap =cap.charAt(0).toUpperCase() + cap.slice(1)
  // console.log("body",req.body.picture)
  try {
    if (user.role !== "ADMIN") {
      return res.json({
        error: "Something went wrong ",
        data: null,
        code: 500,
      });
    }
    // this code for cloudnary image upload
    const uploadImage = await cloudinary.uploader.upload(req.body.picture, {
      upload_preset: "test-media",
    });
    // console.log("uploaded url =",uploadImage)
    const product = new productModel({
      productName: req.body.productName,
      price: req.body.price,
      picture: uploadImage.secure_url,
      cloudinary_id: uploadImage.public_id,
      discription: req.body.discription,
      category : newCap
    });
    await product.save();
    res.json({
      data: product,
      msg: "Added product successfully",
      error: null,
      code: 200,
    });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// update product list by admin
exports.updateProductController = async (req, res) => {
  //this is for require role
  const user = req.user;
  const getbody = req.body;
  const getId =  req.query._id;
  const cloudId = req.query.cloudId;
  try {
    if (user.role !== "ADMIN") {
      res.json({ error: "Something went wrong ", data: null, code: 500 });
    } else {
      // first delete image from cloudnary
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
      // this code for cloudnary image upload
      const uploadImage = await cloudinary.uploader.upload(getbody.picture, {
        upload_preset: "test-media",
      });
      getbody.picture = uploadImage.secure_url;
      // getbody.cloudinary_id =uploadImage.public_id
      await productModel.findByIdAndUpdate(
        { _id: getId },
        { $set: getbody },
        { new: true }
      );
      res.json({ msg: "Data updated successfully", error: null, code: 200 });
    }
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// delete product item by admin
exports.deleteProductController = async (req, res) => {
  const user = req.user;
  const productId = req.query._id;
  const imageId = req.query.imgId;
  try {
    if (user.role !== "ADMIN") {
      return res.json({
        error: "Something went wrong ",
        data: null,
        code: 500,
      });
    }
    await cloudinary.uploader
      .destroy(imageId)
      .then((result) => {
        // response.status(200).send({
        //   message: "success",
        //   result,
        // });
        console.log("image deleted successfully");
      })
      .catch((error) => {
        // response.status(500).send({
        //   message: "Failure",
        //   error,
        // });
        console.log("failed delete");
      });
    await productModel.findByIdAndDelete({ _id: productId });
    res.json({
      msg: "Successfully delete from database",
      error: null,
      code: 200,
    });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// get product all without log in
exports.fetchAllProductController = async (req, res) => {
  try {
    const Allproductfetched = await productModel.find();
    res.json({ data: Allproductfetched, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// get category wise product 
exports.fetchCatagoryProductController = async(req,res)=>{
  try {
    let categoryid = req.params.category
    // console.log("getSpecial category",categoryid)
    if(!categoryid)
    {
      return res.json({
        err : "parma is not available in path",
        data : null,
        code : 404
      })
    }
   
    const categoryWiseProductFetched = await productModel.find({category : categoryid})
    // console.log("categoryWiseProductFetched",categoryWiseProductFetched)
    if(!categoryWiseProductFetched){
      return res.status(200).json({
        err : "This types of product not available",
        data : null,
        code : 404 
      })
    }
    res.json({
      data : categoryWiseProductFetched,
      err : null,
      code : 200
    })
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
}

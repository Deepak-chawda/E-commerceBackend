const productModel = require("../../models/product/product.model");
// get product list
exports.fetchProductController = async (req, res) => {
    const user =  req.user
  try {
    if(user.role !== "ADMIN"){
        return res.json({error : "Something went wrong ", data : null , code : 500})
    }
    await productModel.find()
    res.json({ data: productModel, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong.........", data: null, code: 500 });
  }
};
// add product in data base by admin
exports.addProductController = async (req, res) => {
    const user =  req.user
  try {
      if(user.role !== "ADMIN"){
          return res.json({error : "Something went wrong ", data : null , code : 500})
      }
    const product = new productModel({
      productName: req.body.productName,
      price: req.body.price,
      picture: null,
      discription: req.body.discription,
    });
    await product.save();
    res.json({ data: product, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong.........", data: null, code: 500 });
  }
};
// update product list by admin
exports.updateProductController = async (req, res) => {
    const user =  req.user
    const getbody = req.body
  try {
    if(user.role !== "ADMIN"){
        return res.json({error : "Something went wrong ", data : null , code : 500})
    }
     await productModel.findByIdAndUpdate(  { _id: user._id }, {$set:getbody}, { new: true } )
    res.json({ data: productModel , error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong.........", data: null, code: 500 });
  }
};
// delete product item by admin
exports.deleteProductController = async (req, res) => {
    const user =  req.user
  try {
    if(user.role !== "ADMIN"){
        return res.json({error : "Something went wrong ", data : null , code : 500})
    }
     await productModel.findByIdAndDelete({ _id: user._id })
    res.json({ data: productModel, error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong.........", data: null, code: 500 });
  }
};

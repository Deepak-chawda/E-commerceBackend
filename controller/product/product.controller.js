const productModel = require("../../models/product/product.model");
// get product list by admin
exports.fetchAdminProductController = async (req, res) => {
    const user =  req.user
  try {
    if(user.role !== "ADMIN"){
        return res.json({error : "Access denied ", data : null , code : 500})
    }
  const productfetchedAdmin = await productModel.find()
    res.json({ data: productfetchedAdmin , error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// get product list by user
exports.fetchUserProductController = async (req, res) => {
    const user =  req.user
  try {
  //   if(user.role!== "USER"){
  //     return res.json({error : "Access denied ", data : null , code : 500})
  // }
  const productfetched = await productModel.find()
    res.json({ data: productfetched , error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
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
    res.json({ data: product,msg:"Added product successfully", error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// update product list by admin
exports.updateProductController = async (req, res) => {
    //this is for require role  
  const user =  req.user
    const getbody = req.body
    const getId = req.query._id
  try {
    if(user.role !== "ADMIN"){
         res.json({error : "Something went wrong ", data : null , code : 500})
    }else{
    await productModel.findByIdAndUpdate(  { _id: getId }, {$set:getbody}, { new: true } )
    res.json({msg : "Data updated successfully", error: null, code: 200 });
    }
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// delete product item by admin
exports.deleteProductController = async (req, res) => {
    const user =  req.user
    const productId = req.query._id
  try {
    if(user.role !== "ADMIN"){
        return res.json({error : "Something went wrong ", data : null , code : 500})
    }
     await productModel.findByIdAndDelete({ _id : productId })
    res.json({ msg : "Successfully delete from database" , error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// get product all without log in 
exports.fetchAllProductController = async (req, res) => {
try {
const Allproductfetched = await productModel.find()
  res.json({ data: Allproductfetched , error: null, code: 200 });
} catch (error) {
  console.log("error =>", error);
  res.json({ error: "something went wrong", data: null, code: 500 });
}
};

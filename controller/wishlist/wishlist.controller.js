
const wishlistModel = require("../../models/wishlist/wishlist.model")
// get all wishlist by user
exports.getWishlistController= async (req,res)=>{
    const userId = req.user._id
    try {
        const findedWishlist = await wishlistModel.findOne({user : userId})
        if(!findedWishlist){
            return res.json({data : {msg : "Not wishlist yet plz add wishlist"},err : null ,code : 200})
        }
        res.json({data : findedWishlist,err : null,code : 200})
    } catch (error) {
        console.log( "error ",error)
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
}
// add wishlist by user
exports.addWishlistController = async (req, res)=>{
    const userId = req.user._id
    try {
        const newWishlist = new wishlistModel({
            product : req.body.productId,
             user :  userId,
        })
        await newWishlist.save()
        res.json({ data : newWishlist, code : 200})
        
    } catch (error) {
        console.log( "error ",error)
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
}
// delete wishlist by user
exports.deleteWishlistController = async (req, res) => {
    const wishlistId = req.query._id
  try {
     await wishlistModel.findByIdAndDelete({ _id : wishlistId })
    res.json({ msg : "Successfully delete from database" , error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
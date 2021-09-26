const wishlistModel = require("../../models/wishlist/wishlist.model");
// get all wishlist by user
exports.getWishlistController = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "USER") {
      return res
        .status(401)
        .json({ error: "Access denied ", data: null, code: 401 });
    }
    const findedWishlist = await wishlistModel
      .find({ user: user._id })
      .populate("product");
    if (!findedWishlist) {
      return res.json({
        data: { msg: "Not wishlist yet plz add wishlist" },
        err: null,
        code: 200,
      });
    }
    // console.log("finded wishlist", findedWishlist);
    res.json({ data: findedWishlist, err: null, code: 200 });
  } catch (error) {
    console.log("error ", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// add wishlist by user
exports.addWishlistController = async (req, res) => {
  const user = req.user;
  const productId = req.body.productId;
  try {
    if (user.role !== "USER") {
      return res
        .status(401)
        .json({ error: "Access denied ", data: null, code: 401 });
    }
    const newWishlist = new wishlistModel({
      product: req.body.productId,
      user: req.body.user,
    });
    await newWishlist.save();
    res.json({
      msg: "add wishlist successfully",
      data: newWishlist,
      code: 200,
    });
  } catch (error) {
    console.log("error ", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// delete wishlist by user
exports.deleteWishlistController = async (req, res) => {
  const user = req.user;
  const wishlistId = req.query._id;
  try {
    if (user.role !== "USER") {
      return res
        .status(401)
        .json({ error: "Access denied ", data: null, code: 401 });
    }
    await wishlistModel.findByIdAndDelete({ _id: wishlistId });
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

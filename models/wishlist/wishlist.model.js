const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const wishlistSchema = new Schema({
  product : { 
      type : mongoose.Schema.Types.ObjectId,
      ref : "productModel"
  },
  user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
  }
})
const wishlistModel = model("wishlistModel", wishlistSchema);
module.exports = wishlistModel;

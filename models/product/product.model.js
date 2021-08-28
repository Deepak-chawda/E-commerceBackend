const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    trim: true,
    require: true,
  },
  price: {
    type: Number,
    trim: true,
    require: true,
  },
  picture: { 
    type: String,
  },
  discription: {
    type: String,
  },
});

const productModel = model("productModel", productSchema);
module.exports = productModel;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  product : { 
      type : mongoose.Schema.Types.ObjectId,
      ref : "productModel"
  },
  orderDate : {
      type : Data,
  },
  transactionId : {
      type : String,
  },
  address : {
      type : String,
  },
  user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
  }
})
const orderModel = model("orderModel", orderSchema);
module.exports = orderModel;

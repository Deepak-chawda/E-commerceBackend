const orderModel = require("../../models/orders/order.model");
// get all order by user
exports.getOrderController = async (req, res) => {
  const user = req.user;
  // console.log(userId)
  try {
    if (user.role !=="USER") {
      return res
        .status(401)
        .json({ error: "Access denied ", data: null, code: 401 });
    }
    const findedOrder = await orderModel
      .find({ user: user._id })
      .populate("product");
    //   .populate("user");
    // console.log("finded Order =", findedOrder);
    res.json({ data: findedOrder, err: null, code: 200 });
  } catch (error) {
    console.log("error ", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// add order by user
exports.addOrderController = async (req, res) => {
  // const userId = req.user._id
  const user = req.user;
  try {
    if (user.role !== "USER") {
      return res.status(401).json({ error: " Access denied ", data: null, code: 500 });
    }
    const validateOrder = await orderModel.exists({
      product: req.body.product,
      user: req.body.user,
    });
    if (validateOrder) {
      return res.status(403).json({
        error: "This product already present in order list",
        data: null,
        code: 403,
      });
    }
    const newOrder = new orderModel({
      product: req.body.product,
      orderDate: req.body.orderDate,
      transactionId: req.body.transactionId,
      address: req.body.address,
      user: req.body.user,
    });
    await newOrder.save();
    res.json({ data: newOrder, msg: "order placed successfully", code: 200 });
  } catch (error) {
    console.log("error ", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
// update order by user
// exports.updateOrderController = async (req, res) => {
//     const getOrderBody = req.body
//     const getId = req.query._id
//   try {
//       await orderModel.findByIdAndUpdate(  { _id: getId }, {$set:getOrderBody}, { new: true } )
//     res.json({msg : "update successfully data", error: null, code: 200 });
//   } catch (error) {
//     console.log("error =>", error);
//     res.json({ error: "something went wrong", data: null, code: 500 });
//   }
// };
// delete order by user

exports.deleteOrderController = async (req, res) => {
  const orderId = req.query._id;
  try {
    await orderModel.findByIdAndDelete({ _id: orderId });
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

const orderModel = require("../../models/orders/order.model")
// get all order by user
exports.getOrderController = async (req,res)=>{
    const userId = req.user._id
    console.log(userId)
    try {
        console.log("getOrder")
        const findedOrder = await orderModel.find({user : userId})
        console.log(findedOrder)
        if(!findedOrder){
            return res.json({data : {msg : "Not order yet plz place order"},err : null ,code : 200})
        }
        res.json({data : findedOrder,err : null,code : 200})
    } catch (error) {
        console.log( "error ",error)
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
}
// add order by user
exports.addOrderController = async (req, res)=>{
    const userId = req.user._id
    try {
        const newOrder = new orderModel({
            product : req.body.productId,
            orderData : req.body.todaysDate,
             transactionId : req.body.transactionId,
             address : req.body.address,
             user :  userId,
        })
        await newOrder.save()
        res.json({ data : newOrder, code : 200})
        
    } catch (error) {
        console.log( "error ",error)
        res.json({ error: "something went wrong", data: null, code: 500 });
        
    }

}
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
    const orderId = req.query._id
  try {
     await orderModel.findByIdAndDelete({ _id : orderId })
    res.json({ msg : "Successfully delete from database" , error: null, code: 200 });
  } catch (error) {
    console.log("error =>", error);
    res.json({ error: "something went wrong", data: null, code: 500 });
  }
};
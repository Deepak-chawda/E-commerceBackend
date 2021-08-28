exports.placeOrderController =(req, res)=>{
    const userId = req.user._id
    try {
        const newOrder = new orderModel({
            product : req.body.productId,
            orderData : req.body.todaysDate,
             transactionId : req.body.transactionId,
             address : req.body.address,
             user :  userId ,
        })
        await newOrder.save()
        res.json({ data : newOrder, code : 200})
        
    } catch (error) {
        console.log( "error ",error)
        
    }

}
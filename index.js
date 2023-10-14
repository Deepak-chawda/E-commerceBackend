const express = require("express");
const app = express();
// this is server port assign portion
const port = process.env.PORT || 4000;
// here i am require cors package
const cors = require("cors");

// connection file require here
require("./connection/connectionDB");

// testing by myself
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// this predefine middleware use for image uploading
app.use(express.urlencoded({ limit: "50mb", extended: true }))


// require all routes here
const userRouters = require("./routers/user/user.router");
const productRoutes = require("./routers/product/product.routers");
const orderRoutes = require("./routers/order/order.routes");
const wishlistRoutes = require("./routers/wishlist/wishlist.routes");
app.use(userRouters);
app.use(productRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);

app.listen(port, () => {
  console.log(`server activated on port${port}....`);
});

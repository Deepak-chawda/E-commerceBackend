const express = require("express");
const app = express();
// this is server port assign portion
const port = process.env.PORT || 4000;
// here i am require cors package
const cors = require("cors");

// connection file require here
require("./connection/connectionDB");

// testing by myself
app.use(express.json());
app.use(cors());

// require all routes here
const userRouters = require("./routers/user/user.router");
const productRoutes = require("./routers/product/product.routers");
const orderRoutes = require("./routers/order/order.routes");
const wishlistRoutes = require("./routers/wishlist/wishlist.routes")
app.use(userRouters);
app.use(productRoutes);
app.use(orderRoutes);

app.listen(port, () => {
  console.log(`server activated on port${port}....`);
});

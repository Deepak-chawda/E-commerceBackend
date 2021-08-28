const express = require("express");
const app = express();
// this is server port assign portion
const port = process.env.PORT || 4000;

// testing by myself
app.use(express.json());
const router = require("./routers/user/user.router")
app.use(router)

// connection file require here
require("./connection/connectionDB");

app.listen(port,()=>{
    console.log(`server activated on port${port}...................`)
})
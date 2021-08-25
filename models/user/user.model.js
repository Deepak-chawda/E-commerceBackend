const mongoose = require("mongoose");
const { Schema, model }= mongoose;
const userSchema = new Schema({
    userName : {
        type : String,
        trim : true,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    profilePic : {
        type : String,
        // require : true,
    },
    address : {
        type : String,
    },
    contact : {
        type : String,
    },
}) ;
const UserModal =  model("UserModal",userSchema);
module.exports = UserModal;
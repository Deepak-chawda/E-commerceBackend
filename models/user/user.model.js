const mongoose = require("mongoose");
const { Schema, model }= mongoose;
const userSchema = new Schema({
    userName : {
        type : String,
        trim : true,
        // require : true,
    },
    email : {
        type : String,
        require : true,
    },
    password : {
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
    role : {
        type : String,   // user , admin
    }
}) ;
const UserModal =  model("UserModal",userSchema);
module.exports = UserModal;
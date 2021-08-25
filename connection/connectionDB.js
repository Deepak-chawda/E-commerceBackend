//require .env file here
require('dotenv').config()
// require mongoose from 'mongoose';
const mongoose = require("mongoose")
const connectToDb= async ()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              useCreateIndex: true,
            })
            console.log("connected successfully with Db.............")
    } catch (error) {
        console.log("error =>", error)
        console.log("couldn't connect to db.............")    
    }
}
connectToDb()
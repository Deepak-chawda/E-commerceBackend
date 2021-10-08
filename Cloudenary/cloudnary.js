require("dotenv");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.ApiKey,
  api_secret: process.env.ApiSecret,
});
module.exports = { cloudinary };

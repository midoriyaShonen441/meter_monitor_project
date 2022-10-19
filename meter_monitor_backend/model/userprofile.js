const mongoose = require("mongoose");

const userprofile = new mongoose.Schema(
    {
        username:{type: String, required: true}, 
        password:{type: String, required: true},
        type:{type: String, default:null}
    }
);

module.exports = mongoose.model("user_profile", userprofile);
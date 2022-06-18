const mongoose = require("mongoose");

const userprofile = new mongoose.Schema(
    {
        username:{type: String, default:null}, 
        password:{type: String, default:null},
        type:{type: String, default:null}
    }
);

module.exports = mongoose.model("userprofile", userprofile);
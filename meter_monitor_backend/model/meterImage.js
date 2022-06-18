const mongoose = require("mongoose");

const meterImage = new mongoose.Schema(
    {
        zone: String,
        meterId: String,
        image: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("meterImage", meterImage);
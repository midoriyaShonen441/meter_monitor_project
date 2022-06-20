const mongoose = require("mongoose");

const meterImage = new mongoose.Schema(
    {
        filename: String,
        zoneId: String,
        meterId: String,
        date: Date,
        size: String,
        image: String,
    },
);

module.exports = mongoose.model("meterImage", meterImage);
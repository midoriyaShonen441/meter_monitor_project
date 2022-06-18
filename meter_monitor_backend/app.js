const express = require("express");
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
require("dotenv").config();

const app = express()
app.use(express.json());
app.use(cors());

// writing image to db
app.post("/image/upload", async(req, res) => {
    const image = req.body;
})

module.exports = app
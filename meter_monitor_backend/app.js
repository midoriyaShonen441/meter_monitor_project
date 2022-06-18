const express = require("express");
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
const upload = require("./modules/uploadMiddleware")
require("dotenv").config();

const app = express()
app.use(express.json());
app.use(cors());

// writing image to db
app.get("/", async(req, res) => {
    res.send("OK")
})
app.post("/image/upload", upload.single("file"), async(req, res) => {
    res.send(req.file)
})

module.exports = app
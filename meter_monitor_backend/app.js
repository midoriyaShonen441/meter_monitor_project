const express = require("express");
const cors = require("cors")
require("dotenv").config();

const app = express()
app.use(express.json());
app.use(cors());

// writing image to db
app.get("/", async(req, res) => {
    res.send("OK-3")
})




module.exports = app
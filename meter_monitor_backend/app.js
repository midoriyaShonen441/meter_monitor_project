const express = require("express");
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
const upload = require("./modules/uploadMiddleware")
const fs = require("fs")
require("dotenv").config();
require('./connection/connection').connect()

const app = express()
app.use(express.json());
app.use(cors());

// writing image to db
app.get("/", async(req, res) => {
    res.send("OK")
})

app.post("/image/upload", upload.single("file"), async(req, res) => {
    const { filename, path } = req.file
    const meterImage = require("./model/meterImage")
    const metadata = filename.slice(0,-4).split("_")
    const date = metadata[2].split(";")
    /*{
        fieldname: 'file',
        originalname: 'Screen Shot 2565-06-17 at 10.05.12.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'uploads/',
        filename: '1655549036262.jpg',
        path: 'uploads/1655549036262.jpg',
        size: 1401793
      }
    */

    console.log(new Date(parseInt(date[2]), parseInt(date[1]), parseInt(date[0])));

    imageToBase64(path) // Path to the image
    .then(
        async(response) => {
            await meterImage.create({
                zone: metadata[0],
                meterId: metadata[1],
                date: new Date(date[2], date[1], date[0]),
                image: response
            })
            res.sendStatus(200);
        }
    )
    .catch(
        async(error) => {
            console.log(error); // Logs an error if there was one
        }
    )
    fs.unlinkSync(path);
})

module.exports = app
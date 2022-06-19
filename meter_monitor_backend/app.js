// config env and connection database // 
require("dotenv").config();
require("./connection/connection").connect(); // now connection to local database mongodb // 

// lib // 
const express = require("express");
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// add schema // 
const UserProfile = require("./model/userprofile");
const MeterImage = require("./model/meterImage");

// add modules // 
const upload = require("./modules/uploadMiddleware");
const auth = require("./middleware/auth");


const app = express()
app.use(express.json());
app.use(cors());

// setting encrypted password // 
const encryptedRounds = 10;


// checking login  // 
app.get("/checkingauth", auth, async (req, res) =>{
    const replyText = {
        isError: false,
        text: "ok"
    }
    res.send(replyText);
})

// user register // 
app.post("/haddleregister", async (req, res) => {
    const {username, password, type} = req.body;

    if((username, password, type)){

        try{
            const hashPassword = bcrypt.hashSync(password, encryptedRounds);
            await UserProfile.create({
                username: username,
                password: hashPassword,
                type: type
            });
    
            const replyText = {
                isError: false, 
                text: "register success."
            }
            
            res.send(replyText);

        }catch(err){

            const replyText = {
                isError: true, 
                text: err
            }

            res.send(replyText)
        }
        

    }else{
        const replyText = {
            isError: true,
            text: "username, password, type must not empty."
        }
        res.send(replyText)
    }


})

// user login // 
app.post("/haddlelogin", async (req, res) => {
    const {username, password} = req.body; 

    if((username, password)){
        
        try{
            const isUser = await UserProfile.findOne({username});
            
            if(isUser && (await bcrypt.compare(password, isUser.password))){
                
                const genToken = jwt.sign(
                    {user_id: isUser._id},
                    process.env.TOKEN_KEY,
                    {expiresIn: "1h"}
                )
                const replyText = {
                    isError: false, 
                    userData: {
                        username: isUser.username, 
                        isToken: genToken, 
                        userType: isUser.type
                    }
                }
    
                res.send(replyText);

            }else{

                const replyText = {
                    isError: true,
                    text: "invalid username or password."
                }

                res.send(replyText)
            }

            

        }catch(err){
            const replyText = {
                isError: true,
                text: "cannot connect to database."
            }
            res.send(replyText)
        }

    }else{
        const replyText = {
            isError: true,
            text: "username and password must not empty"
        }
        res.send(replyText)
    }

})

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
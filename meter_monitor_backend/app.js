// config env and connection database // 
require("dotenv").config();
require("./connection/connection").connect(); // now connection to local database mongodb // 


const express = require("express");
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// add schema // 
const UserProfile = require("./model/userprofile");
const MeterImage = require("./model/meterImage");

const app = express()
app.use(express.json());
app.use(cors());

// setting encrypted password // 
const encryptedRounds = 10;

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
app.post("/image/upload", async(req, res) => {
    const image = req.body;
})




module.exports = app
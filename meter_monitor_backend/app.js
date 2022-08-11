// config env and connection database // 
require("dotenv").config();
require("./connection/connection").connect(); // now connection to local database mongodb // 

// lib // 
const express = require("express");
const cors = require("cors");
const imageToBase64 = require("image-to-base64");
const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// add schema // 
const UserProfile = require("./model/userprofile");
const meterImage = require("./model/meterImage")

// add modules // 
const upload = require("./middleware/uploadMiddleware");
const auth = require("./middleware/auth");


const app = express()
app.use(express.json());
app.use(cors());

// convert int to byte value //
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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
                // res.sendStatus(200).send(replyText)
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

// get image API //
app.post("/fetchimg", async (req, res) => {

    const {dateIn} = req.body;
    // console.log("dateIn ===> ",dateIn);

    try{
        let setArrayData = []
        const rawCurrentDate = new Date(dateIn);
        const isCurrentDate = rawCurrentDate.setDate(rawCurrentDate.getDate() + 1)
        const currentDate = new Date(isCurrentDate);
        const StringCurrent = currentDate.toISOString().slice(0, 10);
        
        // const rawBeforeDate = new Date(dateIn);
        // const isbeforeDate = rawBeforeDate.setDate(rawBeforeDate.getDate()-1);
        // const beforeDate = new Date(isbeforeDate)
    
        // const dataImgRange = await meterImage.find({
        //     "date":{
        //         $gt: beforeDate.toISOString().slice(0, 10), 
        //         $lt: currentDate.toISOString().slice(0, 10)
        //     }
        // });
    
        const dataImgRange = await meterImage.find({
            dateString: StringCurrent
        });


        dataImgRange.forEach((element) => {
            if(element.isDelete === false){
                setArrayData.push(element)
            } 
        });
    
        const replyData = {
            isError: false,
            isDate: dateIn,
            listData: setArrayData
        }
        res.send(replyData);
    
    }catch(err){
        const replyData = {
            isError: true,
            text: "cannot get data from backend."
        }
    }

});



// save image API //
app.post("/image/upload", upload.single("file"), async(req, res) => {
    const { filename, path, size } = req.file
    const meterImage = require("./model/meterImage")
    const metadata = filename.slice(0,-4).split("_");
    const setDateToString = new Date(metadata[2]);
    const DateToString = setDateToString.toISOString().slice(0, 10);
    
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


    imageToBase64(path) // Path to the image
    .then(
        async(response) => {
            await meterImage.create({
                filename: filename,
                zoneId: metadata[0],
                meterId: metadata[1],
                date: new Date(metadata[2]),
                dateString: DateToString,
                size: formatBytes(size),
                image: response,
                isDelete: false, 
                isCheck: false,
                imgDesc:"There is no any comment for this images please click edit to add comment."
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

app.put("/updateprofile", async (req, res) => {
    const {username, isPassword} = req.body
    // console.log(username , isPassword)
    const myquery = {username: username}

    try{
        const hashPassword = bcrypt.hashSync(isPassword, encryptedRounds);
        await UserProfile.updateOne(myquery, {password: hashPassword});
        const replyMsg = {
            isError: false,
            text: "Update success."
        }
        res.send(replyMsg)
    }catch(err){
        const replyMsg = {
            isError: true,
            text: "cannot update data to database."
        }
        res.send(replyMsg)
    }
    
});


app.put("/updateMachine", async (req, res) => {
    const {updateType ,isCheck, imgDesc, isDelete, _id} = req.body; 
    // console.log(updateType ,isCheck, imgDesc, isDelete, _id)
    const myquery = {
        _id: _id
    }

    if(updateType === 'text'){
        console.log("text action")
        try{
            await meterImage.updateOne(myquery, {
                imgDesc: imgDesc
            }); 

            const replyText = {
                isError: false,
                text: "update success."
            }

            console.log(replyText)

            res.send(replyText);

        }catch(err){
            const replyText = {
                isError: true,
                text: "error update data to database."
            }

            res.send(replyText)
        }
    }else if(updateType === 'delete'){
        try{
            await meterImage.updateOne(myquery, {
                isDelete: isDelete,
            }); 

            const replyText = {
                isError: false,
                text: "delete success."
            }

            res.send(replyText);

        }catch(err){
            const replyText = {
                isError: true,
                text: "error update data to database."
            }

            res.send(replyText)
        }
    }else if(updateType === 'check' || updateType === 'uncheck'){
        try{
            await meterImage.updateOne(myquery, {
                isCheck: isCheck,
            }); 

            const replyText = {
                isError: false,
                text: "verify success."
            }

            res.send(replyText);

        }catch(err){
            const replyText = {
                isError: true,
                text: "error update data to database."
            }

            res.send(replyText);
        }
    }else{
        const replyText = {
            isError: true,
            text: "Invalid payload"
        }

        res.send(replyText);
    }
    
});


module.exports = app
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const getToken = req.headers['access-token']
    // console.log("mid ware ===>", getToken)

    if(!getToken){
        const replyText = {
            isError: true, 
            text:"please login."
        }
        res.send(replyText);
    }else{
        try{

            const decode = jwt.verify(getToken, process.env.TOKEN_KEY)
            const replyText = {
                loginStatus: true,
                decode: decode,
                token: getToken
            }
            // console.log("mid ware success ===>",replyText)
            // next();
            // res.status(200).send(replyText)
            // return
        }catch(err){
            const replyText = {
                isError: true, 
                text:"401 Unauthorized"
            }
            res.send(replyText);
        }
    }
    return next();
}

module.exports = verifyToken;
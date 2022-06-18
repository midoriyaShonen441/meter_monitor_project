const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {

    // Connect to mongodb // 
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to database")
    })
    .catch((error) => {
        console.log("error connecting")
        console.error(error)
        process.exit(1)
    });

}
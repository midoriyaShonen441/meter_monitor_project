require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

exports.connect = () => {
  exports.connect = () => {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
          authSource: "admin",
        },
        user: "root",
        pass: "example",
      })
      .then(() => {
        console.log("connected to database");
      })
      .catch((error) => {
        console.log("error Database connecting");
        console.error(error);
        process.exit(1);
      });
  };
};

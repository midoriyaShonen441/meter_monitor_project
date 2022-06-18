const app = require("../app");

function myAsyncFunction(arg1, arg2, cb) {
    // async things
    cb(false, "A");
}

myAsyncFunction(10, 99, function hee(error, data) {
    if (!error) {
        // hooray, everything went as planned
        console.log(data)
    } else {
        // disaster - retry / respond with an error etc
        console.log(error)
    }
});


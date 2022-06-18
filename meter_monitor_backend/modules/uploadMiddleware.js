const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startWith("image")) {
        cb(null, true);
    }
    else {
        cb("Not Image", false)
    }
}

let storage = multer.diskStorage({
    destination:  (req, file, cb)
})

// const upload = multer({
//   limits: {
//     fileSize: 4 * 1024 * 1024,
//   }
// });

module.exports = upload
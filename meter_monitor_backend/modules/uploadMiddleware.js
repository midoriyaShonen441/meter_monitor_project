const multer = require('multer');

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb("Not Image", false)
    }
}

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        // cb(null, __basedir + "/resources/static/assets/uploads/");
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // cb(null, `${Date.now()}-image-${file.originalname}`);
        cb(null, `${Date.now()}.jpg`);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

module.exports = upload
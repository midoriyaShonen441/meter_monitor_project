const fs = require("fs");
const imageToBase64 = require('image-to-base64');


imageToBase64() // Path to the image
    .then(
        (response) => {
            return response
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )


console.log(im)
// fs.readFile("./test_img.png", (err, data) => {
//     console.log(data.toDataURL("image/png"));
// })
// const base64 = a.toDataURL()

// console.log(base64);

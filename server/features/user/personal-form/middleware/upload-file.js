const multer = require("multer");
let upload = multer();
module.exports = { 
  upload,
}



/**
 * const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.new() + path.extname(file.originalname)
    );
  },
});

 */
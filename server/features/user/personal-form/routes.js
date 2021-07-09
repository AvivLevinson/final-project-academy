const router = require("express").Router();


const { setUserInfo } = require("./middleware/set-user-info");
const { upload } = require("./middleware/upload-file");

// the uesr will send his presonl info, i need to create db and store the image, and send to the dashborad the new user.
//router.post('/', uploadFile.single("image"), saveInfo);
router.post('/', upload.none(), setUserInfo);


module.exports = router;

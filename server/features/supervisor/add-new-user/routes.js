const router = require('express').Router();

const {addNewUser} = require('./middleware/add-new-user');
const {sendLoginMessage} = require('./middleware/send-login-meesage');


//add user to future db 
// send message to use to download app 
router.post('/', addNewUser,sendLoginMessage);


module.exports = router;
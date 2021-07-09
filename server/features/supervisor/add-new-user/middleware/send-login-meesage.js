// commands folder contine middleware 
const {sendMessageByTwilio} = require('../utils/send-message'); 

const APP_LINK  = ''

const sendLoginMessage =  (req,res,next)=>{
    console.log('sendLoginMessage function');

    const {phoneNumber, message} = req.body;
    const details = {phoneNumber, message}
    const success = sendMessageByTwilio(details);
    success ? res.json({msg:'message send', success: true}) : res.status(500).json({msg:'message cant send to the user', success: false});
    next();
}

module.exports = {
    sendLoginMessage,
}

const {pushNotification} = require('../utils/push-notification');

const pushNotificationToUser = async (req,res,next)=>{
    try {
    console.log('pushNotificationToUser');
    console.log(req.user)
    const {expoToken}  = req.user;

    let {msg} = req.body;
    const response = await pushNotification(expoToken, msg);
    console.log('response: ', response);
    res.json({msg: 'succsess'});
    } catch (error) {
        console.log(error);
        
    }   


}

module.exports = { 
    pushNotificationToUser
}
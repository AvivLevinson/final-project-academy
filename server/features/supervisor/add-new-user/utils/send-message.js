require('dotenv').config()
const Twilio = require('twilio');


const accountSid  = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;


const sendMessageByTwilio = async (details) => {

    const {message,phoneNumber} = details;
    
    const client = new Twilio(accountSid, authToken);

    try {
        const msg =   await client.messages.create({
            body: message,
            messagingServiceSid: 'MGcfaf7263f9ca3162e8591a49d6ec6bd0',      
            to: '+972542461315' 
        });
        
        console.log('msg.sid: ', msg.sid);
        return true;
    } catch (error) {
        console.log('Error sandMessage function, error: ', error)
        return false;
    }
}

module.exports = {
    sendMessageByTwilio,
};


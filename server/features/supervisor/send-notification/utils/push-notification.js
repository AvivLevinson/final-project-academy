const ExpoService = require('../../../../services/expo-service');


const pushNotification = async (expoToken, msg) => {
    try {
        const response = await ExpoService.pushNotification([expoToken], msg);
        console.log('response: ' ,response);
        return response;
    } catch (error) {
        console.log(`push-notifiaction Error: ${error}`);
    }
}


module.exports = { 
    pushNotification
}
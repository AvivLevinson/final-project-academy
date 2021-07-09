const {Expo} = require('expo-server-sdk')

// Create a new Expo SDK client
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

const pushNotification = async (usersExpoId, msg) => {

  try{



    let notifications = [];
    for (let pushToken of usersExpoId) {
      console.log('pushToken:',pushToken);
            // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      
          // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)

        notifications.push({
        to: pushToken,
        sound: "default",
        title: msg.title,
        body: msg.body,
        data: msg.data,
      });
    }
  
    let chunks = expo.chunkPushNotifications(notifications);
  
    (async () => {
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log('receipts: ' , receipts);
        } catch (error) {
          console.error('error: ',error);
        }
      }
    })();

  }catch(error){
    console.log('error push notification expo serivce:', error)
  }
  };


  const ExpoSerivce = {
    pushNotification,
  }
 
module.exports = ExpoSerivce;

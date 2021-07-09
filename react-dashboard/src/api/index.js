import axios from 'axios';

const BASE_URL = 'http://localhost:5000/covid-insulated';


const fetchDataByDate = async (date)=>{
    console.log('getDataByDate -> ');
    const endPoint = BASE_URL + '/api/supervisor/data-by-date';
    
    const params =  {
        date: date
      }

    try{
        const result = await axios.get(endPoint,{params});
        const {data} = result; 
        return data;

    }catch(error){
        console.log(`Error fetch date vy date, Error: ${error}`);
    }
}


const addNewUser  = async (user)=>{
    try{

    console.log('addFutureUser -> ');

    const endPoint = BASE_URL + '/api/supervisor/add-new-user';

    const {id, name,phone,message,startInsulation,endInsulation, days} = user;

    
    const userInfo = {
        id,
        name,
        phone,
        message,
        date:{
            startInsulation,
            endInsulation,
            days,

        },
    };




        const result = await axios.post(endPoint,userInfo);
        const {data} = result; 
        return data;

    }catch(error){
        console.log(`Error set new user to server, Error: ${error}`);
    }
}

const sendPushNotification = async (userId, msg)=>{
    try{
        const userInfo = {
            id:userId,
            msg
        }
        console.log('sendPushNotification -> ');
        const endPoint = BASE_URL + '/api/supervisor/send-notification';
        const result = await axios.post(endPoint,userInfo);
        console.log('result: ' , result);
        const {data} = result; 
        return data;

    } catch(error){
        console.log('send push notifiaction api error: ', error);
    }

}




const API = {
    sendPushNotification,
    addNewUser,
    fetchDataByDate
}

export default API;

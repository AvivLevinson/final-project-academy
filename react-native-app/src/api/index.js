import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:5000/covid-insulated';

const login = async (phoneNumber, id) => {
  //when the user make login to the server the server save the info and sand back id or jwt
  console.log('login');
  const endPoint = '/auth/user';
  
  const userInfo = {
    phone: phoneNumber,
    id: id,
  }
  
  try {
    const response = await axios.post(BASE_URL+endPoint,userInfo,{
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (!response) {
      const message = `Error Send Post Request, Status Code: ${response.status} `;
      throw message;
    }

    const { data } = response;
    console.log('data from response login: ',data);
    return true;

  } catch (error) {
    console.log('Error networking, Error:', error);
  }
};


const completeLoginProcess = async (state) => {
  console.log('complete Login Process');

  const {id, image,info, location, phone} = state; 

  const userInfo = { 
    id, 
    phone,
    ...info,
    location,
    image
  }
  const formData = new FormData();
  formData.append('userInfo', JSON.stringify(userInfo));

  const endPoint = '/auth/user/finish-process';

  try {

   const response = await axios.post(BASE_URL + endPoint,formData, {
      headers: {
        'content-type': 'multipart/form-data',      
      },
    });
 
    if (!response) {
      const message = `Error Send Post Request, Status Code: ${response.status} `;
      throw message;
    }
    const { data } = response;
    console.log(data);
    return true;

  } catch (error) {
    console.log(error);

    console.log('Error networking, Error:', error);
  }
};


export const Api = {
  login:login,
  completeLoginProcess:completeLoginProcess
}
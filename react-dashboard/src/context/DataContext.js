import React, {useState,useContext, useEffect } from 'react';

import moment from 'moment';
import { extendMoment } from "moment-range";


import {localDB} from '../db';

import API from '../api';

import socket from '../socket';

const DataContext = React.createContext();

export const DataProvider = ({children})=>{
    const [db, setDb] = useState(localDB);
    const [usersData, setUsersData ] = useState([]);
    const [date,setDate]  = useState(moment());
   
    const [usersFiltredData, setFilterUser] = useState([])
    const [filterDate,setFilterDates] = useState([]);

 
   
    const [globalInfo, setGlobalInfo] = useState({
        positiveWithSympyoms:0,
        positiveWithOutSympyoms: 0,
        negative:0,
        collaborator:0,
        uncollaborator:0,
        incorrectReporting:0
    });


useEffect(()=>{
    (async ()=>{

        try {
            const users =[]
            let positiveWithSympyoms = 0;
            let positiveWithOutSympyoms = 0;
            let negative = 0;
            let collaborator = 0;
            let uncollaborator = 0;
            let incorrectReporting = 0;
            const extendMom = extendMoment(moment);
            console.log('db.length: ', db.length);
            db.forEach((element)=>{
                let start = moment(element.date.startInsulation, "DD-MM-YYYY");
                let end = moment(element.date.endInsulation, "DD-MM-YYYY");
                const range = extendMom.range(start, end);
                
                if (range.contains(date)) {
                    //check covid result condition
                    if(element.covidResult.positive){
                        
                        if(element.covidResult.WithSymptoms){
                            positiveWithSympyoms++;
                        }else{
                            positiveWithOutSympyoms++;
                        }
                    }else{ 
                        negative++;
                    }
                
                    //check user collaborator
                    if(element.collaborator==='Collaborator'){
                        collaborator++;
                    } else if(element.collaborator==='Uncollaborator'){
                        uncollaborator++;
                    }else{
                        incorrectReporting++;
                    }
            
                    users.push(element);
                  }
            });

            console.log('users: ', users);
            
            let info = {positiveWithSympyoms,positiveWithOutSympyoms,negative,collaborator,uncollaborator,incorrectReporting};

            console.log('info:', info);
            setGlobalInfo(()=>info);
           setUsersData(()=>[...users]);
        }catch(error){
            console.log(error);

        }
    })();

},[date, db]);


useEffect(()=>{

    (async()=>{
        try {
            let positiveWithSympyoms = 0,
            positiveWithOutSympyoms = 0,
            negative = 0,
            collaborator = 0,
            uncollaborator = 0,
            incorrectReporting = 0;
            const extendMom = extendMoment(moment);
            const filterUsers =[]

            let start = moment( filterDate[0], "DD-MM-YYYY");
            let end = moment( filterDate[1], "DD-MM-YYYY");
        
            
            db.forEach((element)=>{
                const range = extendMom.range(start, end);
                if(range.contains(moment( element.date.startInsulation, "DD-MM-YYYY"))){
                    if(element.covidResult.positive){
                        
                        if(element.covidResult.WithSymptoms){
                            positiveWithSympyoms++;
                        }else{
                            positiveWithOutSympyoms++;
                        }
                    }else{ 
                        negative++;
                    }
                
                    //check user collaborator
                    if(element.collaborator==='Collaborator'){
                        collaborator++;
                    } else if(element.collaborator==='Uncollaborator'){
                        uncollaborator++;
                    }else{
                        incorrectReporting++;
                    }
                    filterUsers.push(element)
                }
            });
            let info = {positiveWithSympyoms,positiveWithOutSympyoms,negative,collaborator,uncollaborator,incorrectReporting};
            setGlobalInfo(info);
            setUsersData([...filterUsers]);
            
        } catch (error) {
            console.log(error);
            
        }
    })();

},[filterDate]);


useEffect(() => {

    socket.on("connect", () => {
        console.log('connect');

    });
        
        // server send new user info: 
    socket.on("newUser", (newUser) => {
            let user = JSON.parse(newUser)
            console.log(user); 
            setValueFromSocket(user)
     });

        // server send new user info: 
    socket.on("medicalReport", (reportUser) => {
                console.log('reportUser: ',reportUser); 
                setValueFromSocket(reportUser);
        });


    socket.on("locationReport", (reportUser) => {
            console.log('reportUser: ', reportUser); 
            setValueFromSocket(reportUser)

    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const setValueFromSocket = (userData) => {
    setDb((prev)=>{
        let db = prev.filter(user=> user.id !== userData.id); 
        return [...db, userData];
    });


    setUsersData((prev)=>{
        let db = prev.filter(user=> user.id !== userData.id); 
        return [...db, userData];
    });

    /*
    let date = moment().format('DD-MM-YYYY');
    getDataByDate(date);
    */
 

  }



    const filterUsersByDate = (dates)=>{
        setFilterDates([...dates])
/**        const filterUsers =[]
        let start = moment( dates[0], "DD-MM-YYYY");
        let end = moment( dates[1], "DD-MM-YYYY");
        const extendMom = extendMoment(moment);
        const range = extendMom.range(start, end);
        db.forEach((element)=>{
            if(range.contains(element.date.startIsolated)){
                filterUsers.push(element)
            }
        });
        console.log('this is filterUsers: ', filterUsers);
        setUsersData([...filterUsers]); */
    }

    

    const getDate = ()=>{
        return date;
    }

    const getDataByDate = (date) =>{
        //use effect is active after change the state of date
        console.log('getDataByDate');
        setDate(date)
    }

    const geGlobalData = () =>{
        //use effect is active after change the state of date
        //need to return info for card from usersData
        return;
    }


    // send user sms message
    const sendMessageToUser = async (user)=>{

        console.log('sendMessageToUser', user); 
        
        try {
            const data = await API.addNewUser(user);
            console.log(data);
        
        } catch (error) {
            console.log(error);

        }
    }


    const sendPushNotification =  async (userId, msg)=>{
        try{
            console.log('sendPushNotification function');
            const result =  await API.sendPushNotification(userId, msg);
            console.log(result);

        }catch(error){
            console.log('Error push notification to user, error: ', error);
        }

    }


   



    return(
        <DataContext.Provider
        
        value={{
            usersData,
            getDataByDate,
            getDate,
            geGlobalData,
            sendMessageToUser,
            globalInfo,
            filterUsersByDate,
            usersFiltredData,
            sendPushNotification
          
        }}
        >
        {children}

        </DataContext.Provider>
    );
};


export const useData = ()=> useContext(DataContext)
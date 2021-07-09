const {repository} = require('../../../../db');
const io = require('../../../../socket.js');


const compereUserCords = async (req,res,next)=>{
    try{
        const {cord, id} = req.body;
        const users = await repository.getUserById(id);
        const user = users[0];
        if(user===null){
            console.log('user not found in DB');
            return res.json({msg:'user not found', succsess: false});
        }

        const userCords = user.location.cords;

        const result = getDistanceFromLatLonInKm(cord, userCords);
        console.log('result cord:', result)

        if(result > 0.060){
            let collaborator = 'Incorrect';
            repository.updateUserCollaborator(user, collaborator);
            user.collaborator = 'Incorrect';
            io.getIo().emit('locationReport', user)
            return res.json({msg:'Incorrect data please go back to your home', result: true });
        } else{ 
            return res.json({msg:'Tnx for coporate with us', result: true});
        }

    
    }catch(error){
        console.log(`compere user cords, Error : ${error}`);
    }
  


}


function getDistanceFromLatLonInKm(cord,userCords) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(cord.lat-userCords.lat);  // deg2rad below
    var dLon = deg2rad(cord.lon-userCords.lon); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(userCords.lat)) * Math.cos(deg2rad(cord.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  module.exports = { 
    compereUserCords,
  }
  


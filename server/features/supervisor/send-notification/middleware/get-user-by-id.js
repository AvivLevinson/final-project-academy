const {repository} = require('../../../../db');
const {pushNotification} = require('../utils/push-notification');


const getUserById = async (req,res,next)=>{
    try {
    console.log('get User By Id');
    const {id} = req.body;
    console.log(id);
    user = await repository.getUserById(id);
    if(user === null){
        res.json({msg: 'Unsuccsess'});
    }
    req.user = user[0];
    next();
    } catch (error) {
        console.log(error);
        
    }   

}

module.exports = { 
    getUserById
}
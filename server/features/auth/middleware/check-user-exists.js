const {repository} = require('../../../db');


const checkUserExists = async (req,res,next)=>{
    const {phone, id, expoToken} = req.body;

    user = {
        phone,
        id,
        expoToken
    }

    try {
        // return the obj
        result = await repository.isUserExists(user);
        if(!result){
            res.json({msg:'Error user is not exists', jwt:false, user: user});

        }

        res.json({msg:'user exists', jwt:true, user: result});
        
    } catch (error) {
        console.log('Error checkUserExists, Error: ', error);
        
    }
}

module.exports=checkUserExists


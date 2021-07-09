const {repository} = require('../../../db');


const updateLoginProcess= async (req,res,next)=>{

    const {phone, id} = req.body;

    user = {
        phone,
        id
    }

    console.log(req);
    console.log(req.body);

    try {
        result = await repository.updateLoginProcess(user);
        next();
        
    } catch (error) {
        console.log('Error checkUserExists, Error: ', error);
        
    }
    
}

module.exports=updateLoginProcess

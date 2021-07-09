const {repository} = require('../../../../db');

const addNewUser = async (req,res,next)=>{
    console.log('add New User function');

    console.log(req.body);
    

    const {name, id, phone, date, isLogin = false, isCompleteLoginProcess = false } = req.body; 
    
    console.log('this is date: ', date);
    
    const userinfo = {
        id,
        firstName:name,
        phone,
        date,
        isLogin,
        isCompleteLoginProcess,
    };
   
    try {

        result = await repository.createUser(userinfo);

        result ? next() : res.status(500).json({msg:'Cant Add New User To DB', sucsess: false});

    } catch (error) {

        console.log(error);
        
    }   


}

module.exports = { 
    addNewUser
}
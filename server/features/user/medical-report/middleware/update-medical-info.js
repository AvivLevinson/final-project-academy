const {repository} = require('../../../../db');
const io = require('../../../../socket.js');


const updateMedicalInfo = async (req,res,next)=>{
    try {

        const {id, covidResult} = req.body;
        const users = await repository.getUserById(id);
        const user = users[0];
        if(user===null){
            console.log('user not found in DB');
            return res.json({msg:'user not found', succsess: false});
        }


        
        const positive = user.covidResult.positive;

        if(positive !== covidResult){
            
            user.covidResult.positive = !user.covidResult.positive
            repository.updateUserCovidResult(user, user.covidResult);
            io.getIo().emit('medicalReport', user)
            return res.json({msg:'covid result not equle ', result: true });


        } else{ 
            return res.json({msg:'Tnx for coporate with us', result: true});
        }

    } catch (error) {
        console.log(`updateMedicalInfo, Error: ${error}`);
    }

}


module.exports = { 
    updateMedicalInfo,
  }
  
const {repository} = require('../../../../db');
const io = require('../../../../socket.js');

const setUserInfo = async (req, res, next) => {
  try {

    const user = req.body;
    const {userInfo} = user;
    // only for test delete this

    console.log('setUserInfo, user: ', userInfo);
    const result = await repository.setUserInfo(userInfo);
    console.log('this is result from setUserInfo: ', result);
    if(!result ){
      res.json({msg:'user not update with the info data', success: result});
    } else{
      io.getIo().emit('newUser', userInfo)
      res.json({msg:'update user information', success: true});
    }

  } catch (error) {
    console.log(`Error set user info Error: ${error}`);
    res.json({msg:'user not update with the info data', success: result});
    result
  }
  
};


module.exports = {
  setUserInfo,
};

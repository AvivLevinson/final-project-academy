const router = require('express').Router();

const checkUserExists = require('./middleware/check-user-exists');
const updateLoginProcess = require('./middleware/update-login-process');


router.post('/user/finish-process',updateLoginProcess, (req,res,next)=>{
   res.redirect('/api/user/personal-form');
});

router.post('/user',checkUserExists);


router.post('/admin',(req,res,next)=>{
    res.json({roll: 'admin',jwt:'admin_jwt_example'});
 });
 


module.exports = router;
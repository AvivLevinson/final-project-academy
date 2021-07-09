const router = require('express').Router();
const {updateMedicalInfo} = require('./middleware/update-medical-info');


router.post('/',updateMedicalInfo);

module.exports = router;
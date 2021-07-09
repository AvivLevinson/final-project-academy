const personalFormRoutes = require('./personal-form/routes.js');
const medicalReportRoutes = require('./medical-report/routes.js');
const locationReportRoutes = require('./location-report/routes.js');


const router = require('express').Router();

router.use('/personal-form',personalFormRoutes);
router.use('/medical-report',medicalReportRoutes);
router.use('/location-report',locationReportRoutes);

module.exports = router;




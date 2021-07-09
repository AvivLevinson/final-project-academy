const addNewUserRoutes = require('./add-new-user/routes.js');
const sendNotificationRoutes = require('./send-notification/routes.js');
const router = require('express').Router();


router.use('/add-new-user',addNewUserRoutes);
router.use('/send-notification',sendNotificationRoutes);



module.exports = router;
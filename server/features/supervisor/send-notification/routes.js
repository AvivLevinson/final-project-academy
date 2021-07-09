const router = require('express').Router();

const {getUserById}  = require('./middleware/get-user-by-id');
const {pushNotificationToUser}  = require('./middleware/push-notification-to-user');


router.post('/', getUserById, pushNotificationToUser );

module.exports = router;
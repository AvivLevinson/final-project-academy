const router = require('express').Router();
const {compereUserCords} = require('./middleware/compere-user-cords');

router.post('/',compereUserCords);

module.exports = router;
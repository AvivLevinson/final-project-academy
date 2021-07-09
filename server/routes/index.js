const supervisorRoutes = require('../features/supervisor/routes.js');
const userRoutes = require('../features/user/routes.js');
const authRoutes = require('../features/auth/routes.js');


const router = require('express').Router();


router.use('/auth', authRoutes);
router.use('/api/supervisor', supervisorRoutes);
router.use('/api/user', userRoutes);


module.exports = router;
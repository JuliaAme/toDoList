const router = require('express').Router();
const authRoutes = require('./api/auth.routes');
const tokensRoutes = require('./api/tokens.routes');
const tasksRoutes = require('./api/tasks.routes');


router.use('/auth', authRoutes);
router.use('/tokens', tokensRoutes);
router.use('/tasks', tasksRoutes);



module.exports = router;
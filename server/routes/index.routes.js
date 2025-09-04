const router = require('express').Router();
const authRoutes = require('./api/auth.routes');
const tokensRoutes = require('./api/tokens.routes');



router.use('/auth', authRoutes);
router.use('/tokens', tokensRoutes);





module.exports = router;
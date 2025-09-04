const router = require('express').Router();
const verifyRefreshToken = require('../../middleware/verifyRefreshToken');
const generateTokens = require('../../utils/authUtils');

router.get('/refresh', verifyRefreshToken, (req, res) => {
   
    const { user } = res.locals;
    console.log(user);
    const { accessToken, refreshToken } = generateTokens({ user });
    res
        .cookie('refresh', refreshToken, { httpOnly: true })
        .status(200).json({ message: 'success', accessToken, user })
});

module.exports = router;
const jwt = require('jsonwebtoken')
const { User } = require('../db/models')

async function verifyRefreshToken(req, res, next) {
    
    try {
        
        const { refresh } = req.cookies
        let { user } = jwt.verify(refresh, process.env.REFRESH_TOKEN)


        user = await User.findOne({
            where: { id: user.id }, 
            attributes: ['id', 'name', 'email'],
         })

        res.locals.user = user;

        next()
    } catch (error) {
      console.log('Invalid access token');
      res.clearCookie('refreshToken').sendStatus(401)
    }
}

module.exports = verifyRefreshToken
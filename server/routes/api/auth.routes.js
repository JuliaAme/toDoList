const router = require('express').Router();
const { User } = require('../../db/models');

const bcrypt = require('bcrypt');
const generateTokens = require('../../utils/authUtils');

router.post('/registration', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            res.status(404).json({ message: 'put all inputs' });
            return;
        }
        const userInDb = await User.findOne({ where: { email } });
        if (userInDb) {
            res.status(400).json({ message: 'This user allready registred' });
            return;
        } 
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPassword });
        
        // delete user.dataValues.password;
        const plainUser = user.get()
        console.log('do udal parol', plainUser);
        delete plainUser.password
        console.log('posle udal parol', plainUser);
        const { accessToken, refreshToken } = generateTokens({ user: plainUser });
        if (user) {
            res.status(200)
                .cookie('refresh', refreshToken, {httpOnly: true})
                .json({ message: 'success', user: plainUser, accessToken });
            return;
        }
        res.status(400).json({ message: 'Something went wrong' });

    } catch ({message}) {
    res.status(500).json({error: message})   
    }
})

router.post('/authorization', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email.trim() === '' || password.trim() === '') {
            res.status(400).json({ message: 'put all inputs' })
        }
        const user = await User.findOne({ where: { email } });
        if (user) {
            const isCompare = await bcrypt.compare(password, user.password);
     
            if (isCompare) {
                // delete user.dataValues.password;
                const plainUser = user.get();
                delete plainUser.password;
                const { accessToken, refreshToken } = generateTokens({ user: plainUser });
                res.status(200)
                    .cookie('refresh', refreshToken, { httpOnly: true })
                    .json({ message: 'success', user: plainUser, accessToken });
                return;
            }
            res.status(400).json({ message: 'check email and password' });
            return;
        }
        res.status(400).json({ message: 'Not yet registred' })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.get('/logout', (req, res) => {
    res.locals.user = undefined;
    res.status(200).clearCookie('refresh').json({message: 'success'})
})




module.exports = router;
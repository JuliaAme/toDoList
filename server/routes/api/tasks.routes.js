const router = require('express').Router();
const { Task } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
        if (tasks) {
            res.status(200).json({ message: 'success', tasks })
            return;
        }
        res.status(400).json({ message: 'Something went wrong' })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({where: {id}} );
        if (task) {
            res.status(200).json({ message: 'success', task })
            return;
        }
        res.status(400).json({ message: 'Something went wrong' })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});
router.post('/', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const {title, status } = req.body;
        const task = await Task.create({title, status, userId: user.id });
        if (task) {
            res.status(200).json({ message: 'success', task })
            return;
        }
        res.status(400).json({ message: 'Something went wrong' })
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});
router.put('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const {title, status } = req.body;

    const result = await Task.update(
      {title, status},
      { where: { id, userId: user.id } }
    );
  
    if (result[0] > 0) {
      const task = await Task.findOne({ where: { id}});
      res.status(200).json({ message: 'success', task });
      return;
    }

    res.status(400).json({ message: 'Something went wrong' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});
router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const result = await Task.destroy({
      where: { id, userId: user.id },
    });

    if (result > 0) {
      res.status(200).json({ message: 'success' });
      return;
    }

    res.status(400).json({ message: 'Something went wrong' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});





module.exports = router;
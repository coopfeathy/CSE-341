const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

module.exports = router;
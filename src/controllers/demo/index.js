const router = require('router')();
const reviews = require('./reviews');

router.use('/reviews', reviews);

module.exports = router;

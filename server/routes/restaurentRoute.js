const router = require('express').Router();

router.get('/getRestaurents', async (req, res) => {
  console.log('first');
  res.send('sd');
});

module.exports = router;

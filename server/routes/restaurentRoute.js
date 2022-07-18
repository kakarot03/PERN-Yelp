const router = require('express').Router();

// Get all Restaurents
router.get('/getRestaurents', async (req, res) => {
  res.send('sd');
});

// Get specific Restaurent
router.get('/getRestaurent/:id', async (req, res) => {
  console.log(req);
});

module.exports = router;

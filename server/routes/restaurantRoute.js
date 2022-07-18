const router = require('express').Router();
const db = require('../db');

// Get all Restaurents
router.get('/getRestaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants');

    // const restaurantRatingsData = await db.query(
    //   'select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;'
    // );

    res.status(200).json({
      status: 'success',
      result: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get specific Restaurant
router.get('/getRestaurant/:id', async (req, res) => {
  try {
    // const restaurant = await db.query(
    //   'select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1',
    //   [req.params.id]
    // );
    const restaurant = await db.query(
      `select * from restaurants where id = ${req.params.id}`
    );

    //  const reviews = await db.query(
    //    'select * from reviews where restaurant_id = $1',
    //    [req.params.id]
    //  );

    res.status(200).json({
      status: 'succes',
      data: {
        restaurant: restaurant.rows[0],
        // reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create Restaurent
router.post('/addRestaurant', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: 'succes',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Restaurent
router.put('/updateRestaurant/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Restaurent
router.delete('/deleteRestaurant/:id', async (req, res) => {
  try {
    const results = db.query('DELETE FROM restaurants where id = $1', [
      req.params.id,
    ]);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

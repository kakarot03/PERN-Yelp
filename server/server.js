require('dotenv').config();
const express = require('express');
const cors = require('cors');
const resRoute = require('./routes/restaurantRoute');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/v1/restaurants', resRoute);

app.listen(port, () => console.log('listening on port ' + port));

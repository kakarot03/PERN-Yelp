require('dotenv').config();
const express = require('express');
const cors = require('cors');
const resRoute = require('./routes/restaurentRoute');
// const db = require('./db');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/v1/restaurents', resRoute);

app.listen(port, () => console.log('listening on port ' + port));

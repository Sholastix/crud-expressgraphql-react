require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сross-origin resource sharing permission.
app.use(cors());

const { Product } = require('./models/Product');

// // Seeds injection.
// require('./seed/seeder')();

// Server start and connect to DB.
require('./config/dbConnection')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schemas');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сross-origin resource sharing permission.
app.use(cors());

const { Product } = require('./models/Product');

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
}));

// // Seeds injection.
// require('./seed/seeder')();

// Server start and connect to DB.
(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(process.env.APP_PORT, () => {
      console.log(`Server listening on port ${process.env.APP_PORT}.`);
    });
  } catch (err) {
    console.error(`Connection failed: ${process.env.DB_CONNECT}`, err);
  };
})();
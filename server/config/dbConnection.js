const express = require('express');
const mongoose = require('mongoose');

const app = express();

module.exports = async () => {
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
};
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB connection failed', err);
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Connected to DB and server is listening on port ${PORT}`);
    });
  }
});

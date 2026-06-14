const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/movies', require('./routes/movies'));

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB connection failed', err);
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Connected to DB and server is listening on port ${PORT}`);
    });
  }
});
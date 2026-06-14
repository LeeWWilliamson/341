const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My API',
    description: 'Movie Wishlist API'
  },
  host: 'localhost:8080',
  schemes: ['http'],
  basePath: '/movies'
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/movies.js'];
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

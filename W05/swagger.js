const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'My API',
    description: 'Movie Wishlist API'
  },
  host: 'w05.onrender.com',
  schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/movies.js'];
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

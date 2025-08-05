require('dotenv').config();
const cloudinaryService = require('cloudinary').v2;

const { PORT, SECRET_KEY, NODE_ENV, PSQL, PSQL_TEST, DB_USER, DB_NAME, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
const databaseURL = NODE_ENV === 'test' ? PSQL_TEST : PSQL;

cloudinaryService.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET 
});

module.exports = {
  PORT,
  SECRET_KEY,
  databaseURL,
  cloudinaryService,
  DB_USER,
  DB_NAME,
};
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const { DB_PORT, PORT, SECRET_KEY, NODE_ENV, PSQL, PSQL_TEST, DB_USER, DB_NAME, DB_PASSWORD, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const databaseURL = NODE_ENV === 'test' ? PSQL_TEST : PSQL;

cloudinary.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = {
  PORT,
  DB_PORT,
  DB_PASSWORD,
  SECRET_KEY,
  databaseURL,
  cloudinary,
  DB_USER,
  DB_NAME,
};
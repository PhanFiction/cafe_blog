const { Pool } = require('pg');
const config = require('../config/index');

module.exports = new Pool({
  connectionString: `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@localhost:${config.DB_PORT}/${config.DB_NAME}`
});
const { Pool } = require('pg');
const config = require('../config/index');

// Create a new pool instance with the database configuration
/* module.exports = new Pool({
  host: "localhost",
  user: config.Pool,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.PORT || 4200
});
 */

module.exports = new Pool({
  connectionString: `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@localhost:${config.DB_PORT}/${config.DB_NAME}`
});
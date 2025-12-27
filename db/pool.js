const { Pool } = require('pg');
const config = require('../config/index');

module.exports = new Pool({
  connectionString: config.databaseURL,
});
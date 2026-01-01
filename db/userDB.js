const pool = require('./pool');
const bcrypt = require('bcrypt');

// Create a new user in the database
exports.createUser = async (userData) => {
  const { username, name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    "INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, name, email, hashedPassword]
  );
  return rows[0];
}

// Update an existing user in the database
exports.updateUser = async (id, userData) => {
  const { username, name, email, avatar_url, password } = userData;
  let query = "UPDATE users SET username = $1, name = $2, avatar_url = $3, email = $4, password = $5 WHERE id = $6 RETURNING  *";

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const values = [username, name, avatar_url, email, hashedPassword, id];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Get a user by ID from the database
exports.getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

// create user table for database
exports.createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      google_id VARCHAR(255) UNIQUE,
      username VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      avatar_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
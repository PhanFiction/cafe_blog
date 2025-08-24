const pool = require('./pool');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
  console.log('user data ', userData);
  const { username, name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    "INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, name, email, hashedPassword]
  );
  return rows[0];
};

exports.updateUser = async (id, userData) => {
  const { username, name, email, avatar_url, password } = userData;
  let query = "UPDATE users SET username = $1, name = $2, avatar_url = $3, email = $4 WHERE id = $5 ";
  const values = [username, name, avatar_url, email, id];

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ", password = $4";
    values.push(hashedPassword);
  }

  query += " WHERE id = $5 RETURNING *";
  values.push(id);

  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}
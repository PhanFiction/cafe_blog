const pool = require('./pool');
const cloudinaryService = require('../utils/cloudinaryService');

// Fetch all blogs from the database
exports.fetchBlogs = async () => {
  const { rows } = await pool.query("SELECT * FROM blogs");
  return rows;
};

// Fetch a single blog by ID in the database
exports.fetchBlogById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return rows[0];
};

// Create a new blog in the database
exports.createBlog = async (blogData, userId) => {
  const { title, content, img } = blogData;
  const { secure_url, public_id } = await cloudinaryService.uploadBlogImg(img);
  const { rows } = await pool.query(
    "INSERT INTO blogs (title, content, img, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, content, { secure_url, public_id }, userId]
  );
  return rows[0];
};

// Update an existing blog in the database
exports.updateBlog = async (id, blogData) => {
  const { title, content, img } = blogData;
  const { secure_url, public_id } = await cloudinaryService.uploadBlogImg(img);
  const foundBlog = await this.fetchBlogById(id);
  const imgObj = JSON.parse(foundBlog.img);
  // Delete old image from cloudinary
  await cloudinaryService.deleteImg(imgObj.public_id);
  const { rows } = await pool.query(
    "UPDATE blogs SET title = $1, content = $2, img = $3 WHERE id = $4 RETURNING *",
    [title, content, { secure_url, public_id }, id]
  );
  return rows[0];
};

// Delete a blog from the database
exports.deleteBlog = async (id) => {
  const { rows } = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);
  return rows[0];
};


exports.createBlogTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      img VARCHAR(255),
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    )
  `);
};
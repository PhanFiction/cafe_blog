const pool = require('./pool');
const cloudinaryService = require('../utils/cloudinaryService');

exports.fetchBlogs = async () => {
  const { rows } = await pool.query("SELECT * FROM blogs");
  return rows;
};

exports.fetchBlogById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return rows[0];
};

exports.createBlog = async (blogData, userId) => {
  const { title, content, img } = blogData;
  const { secure_url } = await cloudinaryService.uploadBlogImg(img);
  const { rows } = await pool.query(
    "INSERT INTO blogs (title, content, img, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, content, secure_url, userId]
  );
  return rows[0];
};

exports.updateBlog = async (id, blogData) => {
  const { title, content, img } = blogData;
  const { rows } = await pool.query(
    "UPDATE blogs SET title = $1, content = $2, img = $3 WHERE id = $4 RETURNING *",
    [title, content, img, id]
  );
  return rows[0];
};

exports.deleteBlog = async (id) => {
  const { rows } = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);
  return rows[0];
};


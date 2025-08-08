const { Pool } = require('./pool');

exports.fetchBlogs = async () => {
  const { rows } = await Pool.query("SELECT * FROM blogs");
  return rows;
};

exports.fetchBlogById = async (id) => {
  const { rows } = await Pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return rows[0];
};

exports.createBlog = async (blogData) => {
  const { title, content, img, author_id } = blogData;
  const { rows } = await Pool.query(
    "INSERT INTO blogs (title, content, img, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, content, img, author_id]
  );
  return rows[0];
};

exports.updateBlog = async (id, blogData) => {
  const { title, content, img } = blogData;
  const { rows } = await Pool.query(
    "UPDATE blogs SET title = $1, content = $2, img = $3 WHERE id = $4 RETURNING *",
    [title, content, img, id]
  );
  return rows[0];
};

exports.deleteBlog = async (id) => {
  const { rows } = await Pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);
  return rows[0];
};


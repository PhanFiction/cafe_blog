const db = require('../db/blogDB');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await db.fetchBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
}

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await db.fetchBlogById(id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
}

exports.createBlog = async (req, res) => {
  try {
      const blogData = req.body;
    // fetch user id from cookie
    req.userId = req['user'].id;
    const newBlog = await db.createBlog(blogData, req.userId);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog" });
  }
}

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const blogData = req.body;
  try {
    const updatedBlog = await db.updateBlog(id, blogData);
    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
}

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await db.deleteBlog(id);
    if (deletedBlog) {
      res.status(200).json(deletedBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
}
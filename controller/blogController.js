const db = require('../db/blogDB');
const cloudinaryService = require('../utils/cloudinaryService');

// Controller to handle blog-related requests
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await db.fetchBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
}

// Fetch a single blog by ID
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

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    req.userId = req.user.id;
    const newBlog = await db.createBlog(blogData, req.userId);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog" });
  }
}

// Update an existing blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const blogData = req.body;
  try {
    const foundBlog = await db.fetchBlogById(id);
    const imgObj = JSON.parse(foundBlog.img);
    // Delete old image from cloudinary
    await cloudinaryService.deleteImg(imgObj.public_id);
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

// Delete a blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const foundBlog = await db.fetchBlogById(id);
    const imgObj = JSON.parse(foundBlog.img);
    // Delete old image from cloudinary
    await cloudinaryService.deleteImg(imgObj.public_id);
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
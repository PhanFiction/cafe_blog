const blogController = require('../controller/blogController');
const router = require('express').Router();

router.post('/create', blogController.createBlog);
router.put('/update/:id', blogController.updateBlog);
router.delete('/delete/:id', blogController.deleteBlog);
router.get('/:id', blogController.getBlogById);
router.get('/', blogController.getAllBlogs);

module.exports = router;
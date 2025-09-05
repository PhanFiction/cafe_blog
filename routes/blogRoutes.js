const blogController = require('../controller/blogController');
const middleware = require('../middleware/index');
const router = require('express').Router();

router.post('/create', (middleware.checkAuth, middleware.checkBlogOwnerShip), blogController.createBlog);
router.put('/update/:id', (middleware.checkAuth, middleware.checkBlogOwnerShip), blogController.updateBlog);
router.delete('/delete/:id', (middleware.checkAuth, middleware.checkBlogOwnerShip), blogController.deleteBlog);
router.get('/:id', blogController.getBlogById);
router.get('/', blogController.getAllBlogs);

module.exports = router;
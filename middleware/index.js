// Extract token from the request and verify it
const verifyToken = require('../utils/verifyToken');
const blogDB = require('../db/blogDB');

exports.extractToken = (req, res, next) => {
  const cookie = req.headers.cookie.split(';')[0].split("authToken=")[1];
  const decodedToken = verifyToken(cookie);
  
  if(!decodedToken) return res.status(401).json({ error: 'Not authorized' });

  req.authorized = true;
  req.userId = decodedToken.id;

  next();
};

// Checks to make sure the blog creator matches the user id of who created the blog
exports.checkBlogOwnerShip = async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.userId;

  const foundBlog = await blogDB.fetchBlogById(blogId);

  if (foundBlog.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

  console.log(foundBlog);
  next();
};

// Checks to make sure recipe creator matches the user id of who created the recipe
exports.checkRecipeOwnership = async (req, res, next) => {
  const recipeId = req.params.id;
  const userId = req.userId;

  const foundRecipe = await recipeDB.fetchRecipeById(recipeId);

  if (foundRecipe.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

  console.log(foundRecipe);
  next();
};

exports.validateRecipe = (req, res, next) => {
  const { title, ingredients, instructions, steps, description } = req.body;

  if (!title || !ingredients || !instructions || !steps || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
};
const recipeController = require('../controllers/recipeController');
const middleware = require('../middleware/index');
const router = require('express').Router();

// Routes for recipe operations
router.get('/', recipeController.getAllRecipes);
router.post('/', middleware.validateRecipe, recipeController.createRecipe);
router.put('/:id', middleware.validateRecipe, middleware.checkRecipeOwnership, recipeController.updateRecipe);
router.delete('/:id', middleware.checkRecipeOwnership, recipeController.deleteRecipe);

module.exports = router;
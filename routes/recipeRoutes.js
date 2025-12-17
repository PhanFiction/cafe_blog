const recipeController = require('../controller/recipeController');
const middleware = require('../middleware/index');
const router = require('express').Router();

// Routes for recipe operations
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/create', recipeController.createRecipe);
router.put('/:id', middleware.validateRecipe, middleware.checkRecipeOwnership, recipeController.updateRecipe);
router.delete('/:id', middleware.checkRecipeOwnership, recipeController.deleteRecipe);

module.exports = router;
const db = require("../db/recipeDB");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await db.fetchRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
}

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await db.fetchSingleRecipe(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
}

exports.createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    // fetch user id from cookie
    req.userId = req['user'].id;
    const newRecipe = await db.createRecipe(recipeData, req.userId);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: "Failed to create recipe" });
  }
}

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipeData = req.body;
  try {
    const updatedRecipe = await db.updateRecipe(id, recipeData);
    if (updatedRecipe) {
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update recipe" });
  }
}

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await db.deleteRecipe(id);
    if (deletedRecipe) {
      res.status(200).json(deletedRecipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
}
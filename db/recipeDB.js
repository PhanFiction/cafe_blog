const pool = require('./pool');
const cloudinaryService = require('../utils/cloudinaryService');

// Fetch all recipes from the database
exports.fetchAllRecipes = async () => {
  const { rows } = await pool.query("SELECT * FROM recipes");
  return rows;
}

// Fetch a single recipe by its ID in the database
exports.fetchSingleRecipe = async (id) => {
  const { rows } = await pool.query("SELECT * FROM recipes WHERE id = ${1}", [id]);
  return rows[0];
}

// Create a new recipe in the database
exports.createRecipe = async (recipeData, userId) => {
  const { title, ingredients, description, steps, img } = recipeData;
  const { secure_url } = await cloudinaryService.uploadRecipeImg(img);
  const { rows } = await pool.query(
    "INSERT INTO recipes (title, ingredients, steps, description, img, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, ingredients, steps, description, secure_url, userId]
  );
  return rows[0];
}

// Update an existing recipe in the database
exports.updateRecipe = async (id, recipeData) => {
  const { title, ingredients, description, img } = recipeData;
  let updatedImgUrl = null;

  if (img) {
    const { secure_url } = await cloudinaryService.uploadRecipeImg(img);
    updatedImgUrl = secure_url;
  }

  const { rows } = await pool.query(
    `UPDATE recipes 
     SET title = $1, ingredients = $2, description = $3, img = COALESCE($4, img) 
     WHERE id = $5 
     RETURNING *`,
    [title, ingredients, description, updatedImgUrl, id]
  );
  return rows[0];
}

// Delete a recipe from the database
exports.deleteRecipe = async (id) => {
  const { rows } = await pool.query("DELETE FROM recipes WHERE id = $1 RETURNING *", [id]);
  return rows[0];
}

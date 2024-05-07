import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';
import './RecipeDetail.css'; // Make sure the CSS file is imported

function RecipeDetail() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useStore((state) => state.currentRecipe);
  const deleteRecipe = useStore((state) => state.deleteRecipe);
  const fetchRecipe = useStore((state) => state.fetchRecipe);

  console.log(recipe);

  useEffect(() => {
    fetchRecipe(recipeId);
  }, [fetchRecipe, recipeId]);

  const handleDelete = async () => {
    await deleteRecipe(recipeId);
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/recipes/edit/${recipeId}`);
  };

  return (
    <div className="recipe-container">
      {recipe ? (
        <>
          <div className="recipe-header">
            <h1 className="recipe-title">{recipe.title}</h1>
            <div className="button-group">
              <button type="button" onClick={handleEdit} className="button">Edit</button>
              <button type="button" onClick={handleDelete} className="button button-delete">Delete</button>
            </div>
          </div>
          <img src={recipe.coverUrl} alt={recipe.title} className="recipe-image" />
          <p className="recipe-content">{recipe.content}</p>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
}

export default RecipeDetail;

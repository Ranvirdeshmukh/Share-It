import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';

function RecipeDetail() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useStore((state) => state.recipes.find((r) => r.id === recipeId));
  const deleteRecipe = useStore((state) => state.deleteRecipe);

  const handleDelete = async () => {
    await deleteRecipe(recipeId);
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/recipes/edit/${recipeId}`); // Navigate to the edit page
  };

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.coverUrl} alt={recipe.title} />
          <p>{recipe.content}</p>
          <div>
            <button type="button" onClick={handleDelete}>Delete</button>
            <button type="button" onClick={handleEdit}>Edit</button>
          </div>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
}

export default RecipeDetail;

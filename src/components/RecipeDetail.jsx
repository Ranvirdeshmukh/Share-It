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

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <img src={recipe.coverUrl} alt={recipe.title} />
          <p>{recipe.content}</p>
          <button type="button" onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
}

export default RecipeDetail;

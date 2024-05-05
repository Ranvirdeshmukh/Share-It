import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

function RecipeList() {
  const navigate = useNavigate();
  const recipes = useStore((state) => state.recipes);
  const fetchRecipes = useStore((state) => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleKeyPress = (event, id) => {
    if (event.key === 'Enter') {
      navigate(`/recipes/${id}`);
    }
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          tabIndex={0} // Allows the div to be focused
          role="button" // ARIA role for users of assistive technologies
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          onKeyDown={(event) => handleKeyPress(event, recipe.id)}
          style={{ cursor: 'pointer' }} // Visual cue for interactivity
        >
          <img src={recipe.coverUrl} alt={recipe.title} />
          <h3>{recipe.title}</h3>
          <p>{recipe.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;

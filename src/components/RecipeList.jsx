import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import './RecipeList.css';

function RecipeList() {
  const navigate = useNavigate();
  const recipes = useStore((state) => state.recipes);
  const fetchRecipes = useStore((state) => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const formatTags = (tags) => {
    if (Array.isArray(tags)) {
      return tags.join(', ');
    } else if (typeof tags === 'string') {
      return tags;
    }
    return ''; // Return empty string if tags are undefined or in a different unexpected format
  };

  return (
    <div className="posts-grid">
      {recipes.map((recipe) => (
        <button
          key={recipe.id}
          className="post-card"
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          onKeyDown={(event) => event.key === 'Enter' && navigate(`/recipes/${recipe.id}`)}
          style={{ all: 'unset', cursor: 'pointer' }}
          type="button"
        >
          <img src={recipe.coverUrl} alt={recipe.title} className="post-image" />
          <div className="post-content">
            <h3>{recipe.title}</h3>
            <p>{formatTags(recipe.tags)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default RecipeList;

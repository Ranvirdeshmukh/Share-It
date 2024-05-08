import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import './RecipeList.css';

function RecipeList() {
  const navigate = useNavigate();
  const recipes = useStore((state) => state.recipes);
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeTags = recipe.tags.split(',').map((tag) => tag.trim().toLowerCase());
    return recipeTags.some((tag) => tag.includes(filter));
  });

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by tags"
        style={{ margin: '10px', padding: '5px' }}
      />
      <div className="posts-grid">
        {filteredRecipes.map((recipe) => (
          <button
            key={recipe.id}
            className="post-card"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            style={{ all: 'unset', cursor: 'pointer' }}
            type="button"
          >
            <img src={recipe.coverUrl} alt={recipe.title} className="post-image" />
            <div className="post-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.tags}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;

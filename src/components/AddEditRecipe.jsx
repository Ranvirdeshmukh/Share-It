import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';

function AddEditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const addRecipe = useStore((state) => state.addRecipe);
  const updateRecipe = useStore((state) => state.updateRecipe);
  const recipe = useStore((state) => state.recipes.find((r) => r.id === recipeId));

  const [formState, setFormState] = useState({
    title: '',
    content: '',
    coverUrl: '',
    tags: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormState({
        title: recipe.title,
        content: recipe.content,
        coverUrl: recipe.coverUrl,
        tags: recipe.tags.join(','),
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formState,
      tags: formState.tags.split(','),
    };

    if (recipeId) {
      await updateRecipe(recipeId, recipeData);
    } else {
      await addRecipe(recipeData);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formState.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        value={formState.content}
        onChange={handleChange}
        required
      />

      <label htmlFor="coverUrl">Cover URL</label>
      <input
        type="text"
        id="coverUrl"
        name="coverUrl"
        value={formState.coverUrl}
        onChange={handleChange}
      />

      <label htmlFor="tags">Tags (comma separated)</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={formState.tags}
        onChange={handleChange}
      />

      <button type="submit">{recipeId ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
  );
}

export default AddEditRecipe;

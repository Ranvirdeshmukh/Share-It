import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';
import './AddEditRecipe.css'; // Make sure to create and import this CSS file

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
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title: formState.title,
      content: formState.content,
      coverUrl: formState.coverUrl,
      tags: formState.tags.split(',').map((tag) => tag.trim()).join(','),
    };

    try {
      if (recipeId) {
        await updateRecipe(recipeId, recipeData);
      } else {
        await addRecipe(recipeData);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to submit recipe:', error);
    }
  };

  return (
    <div className="add-edit-recipe">
      <h1>Create A New Post</h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formState.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" name="tags" value={formState.tags} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" value={formState.content} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="coverUrl">Cover Image URL</label>
          <input type="text" id="coverUrl" name="coverUrl" value={formState.coverUrl} onChange={handleChange} />
        </div>
        <button type="submit">{recipeId ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
    </div>
  );
}

export default AddEditRecipe;

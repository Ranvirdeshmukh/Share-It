import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';
import './AddEditRecipe.css'; // Ensure your CSS file has styles for form layout

function AddEditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const addRecipe = useStore((state) => state.addRecipe);
  const updateRecipe = useStore((state) => state.updateRecipe);
  const recipe = useStore((state) => state.recipes.find((r) => r.id === recipeId));

  // Set initial form state, either new or from existing recipe
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    coverUrl: '',
    tags: '',
  });

  // Load existing recipe into form when component mounts or when recipe changes
  useEffect(() => {
    if (recipe) {
      const formattedTags = Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags || '';
      setFormState({
        title: recipe.title,
        content: recipe.content,
        coverUrl: recipe.coverUrl,
        tags: formattedTags,
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title, content, coverUrl, tags,
    } = formState;
    const recipeData = {
      title,
      content,
      coverUrl,
      tags: tags.split(',').map((tag) => tag.trim()).join(', '),
    };

    console.log('Submitting recipe:', recipeData); // Log the data being submitted

    try {
      if (recipeId) {
        const response = await updateRecipe(recipeId, recipeData);
        console.log('Update successful:', response);
        navigate('/');
      } else {
        const response = await addRecipe(recipeData);
        console.log('Add successful:', response);
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to submit recipe:', error);
      if (error.response) {
        console.error('Response:', error.response.data); // Log more detailed server response
      }
    }
  };
  return (
    <div className="add-edit-recipe">
      <h1>{recipeId ? 'Edit Recipe' : 'Create A New Recipe'}</h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formState.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
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
        <button type="submit" className="submit-button">{recipeId ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
    </div>
  );
}

export default AddEditRecipe;

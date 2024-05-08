import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddEditRecipe from './components/AddEditRecipe';
import NavBar from './components/NavBar';
import './style.scss';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/new" element={<AddEditRecipe />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
        <Route path="/recipes/edit/:recipeId" element={<AddEditRecipe />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

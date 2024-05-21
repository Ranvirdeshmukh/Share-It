import axios from 'axios';
// import { current } from 'immer';
import create from 'zustand';

// Define the base URL for the API
const apiBaseUrl = 'https://platform-api-ranvirdeshmukh.onrender.com/api/';

// Create the store using Zustand
const useStore = create((set) => ({
  recipes: [],
  currentRecipe: {},

  // Fetch all recipes
  fetchRecipes: async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/posts?key=ranvir_deshmukh`);
      set({ recipes: response.data });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      throw error; // Optional: re-throw to handle in UI components
    }
  },

  // Fetch recipe
  fetchRecipe: async (recipeId) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/posts/${recipeId}?key=ranvir_deshmukh`);
      set({ currentRecipe: response.data });
    } catch (error) {
      console.error('Failed to fetch recipe:', error);
      throw error; // Optional: re-throw to handle in UI components
    }
  },

  addRecipe: async (recipe) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/posts?key=ranvir_deshmukh`, recipe, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Assuming response.data contains the full new recipe object, including its unique ID
      set((state) => ({
        recipes: [...state.recipes, response.data],

      }));
    } catch (error) {
      console.error('Failed to add recipe:', error.response ? error.response.data : error);
      throw error; // It's good to re-throw the error if you want to handle it in the component
    }
  },

  // Update an existing recipe
  // Update an existing recipe
  updateRecipe: async (id, updatedData) => {
    try {
    // Construct the URL with the recipe ID and API key
      const updateUrl = `${apiBaseUrl}/posts/${id}?key=ranvir_deshmukh`;
      const response = await axios.put(updateUrl, updatedData, {
        headers: {
          'Content-Type': 'application/json', // Ensure the server treats this as JSON
        },
      });
      set((state) => ({
        recipes: state.recipes.map((r) => (r.id === id ? { ...r, ...updatedData } : r)),
      }));
      return response;
    } catch (error) {
      console.error('Failed to update recipe:', error); // Log any errors
      throw error;
    }
  },

  // Delete a recipe
  deleteRecipe: async (id) => {
    try {
      const response = await axios.delete(`${apiBaseUrl}/posts/${id}?key=ranvir_deshmukh`);
      set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) }));
      return response; // Return response for further handling
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      throw error;
    }
  },
}));

export default useStore;

import axios from 'axios';
import create from 'zustand';

const apiBaseUrl = 'https://platform.cs52.me/api';
const apiKey = '?key=ranvir_deshmukh';

const useStore = create((set) => ({
  recipes: [],
  fetchRecipes: async () => {
    const response = await axios.get(`${apiBaseUrl}/posts?key=${apiKey}`);
    set({ recipes: response.data });
  },
  addRecipe: async (recipe) => {
    const response = await axios.post(`${apiBaseUrl}/posts?key=${apiKey}`, recipe);
    set((state) => ({ recipes: [...state.recipes, response.data] }));
  },
  updateRecipe: async (id, updatedData) => {
    await axios.put(`${apiBaseUrl}/posts/${id}?key=${apiKey}`, updatedData);
    set((state) => ({ recipes: state.recipes.map((r) => (r.id === id ? { ...r, ...updatedData } : r)) }));
  },
  deleteRecipe: async (id) => {
    await axios.delete(`${apiBaseUrl}/posts/${id}?key=${apiKey}`);
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) }));
  },
}));

export default useStore;

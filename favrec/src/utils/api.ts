import { Recipe } from "@/types/recipe";

const API_BASE_URL = "/rest"; // Azure Static Web Apps Data API endpoint

export const recipeApi = {
  // Get all recipes
  async getRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/Recipe`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  // Get recipe by ID
  async getRecipe(id: string): Promise<Recipe> {
    try {
      const response = await fetch(`${API_BASE_URL}/Recipe/id/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  },

  // Create new recipe
  async createRecipe(recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">): Promise<Recipe> {
    try {
      const newRecipe = {
        ...recipe,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/Recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  },

  // Update recipe
  async updateRecipe(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    try {
      const updatedRecipe = {
        ...recipe,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/Recipe/id/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  },

  // Delete recipe
  async deleteRecipe(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/Recipe/id/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  },

  // Search recipes
  async searchRecipes(query: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/Recipe?$filter=contains(title,'${query}') or contains(description,'${query}') or contains(category,'${query}')`);
      if (!response.ok) {
        throw new Error('Failed to search recipes');
      }
      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }
};

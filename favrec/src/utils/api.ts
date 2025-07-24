import { Recipe } from "@/types/recipe";

const API_BASE_URL = "/rest"; // Azure Static Web Apps Data API endpoint

// Helper function to generate UUID (fallback for crypto.randomUUID)
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID generation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const recipeApi = {
  // Get all recipes
  async getRecipes(): Promise<Recipe[]> {
    try {
      console.log('Fetching recipes from:', `${API_BASE_URL}/Recipe`);
      const response = await fetch(`${API_BASE_URL}/Recipe`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      // Handle both direct array and OData format
      const recipes = Array.isArray(data) ? data : (data.value || []);
      return recipes;
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
        id: generateUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating recipe:', newRecipe);

      const response = await fetch(`${API_BASE_URL}/Recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      console.log('Create response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Created recipe:', result);
      return result;
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
      console.log('Deleting recipe:', id);
      
      const response = await fetch(`${API_BASE_URL}/Recipe/id/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Delete response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
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

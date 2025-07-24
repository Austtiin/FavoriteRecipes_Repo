"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { recipeApi } from "@/utils/api";
import { getEnvironmentInfo } from "@/utils/environment";
import AddRecipe from "@/components/AddRecipe";
import RecipeList from "../components/RecipeList";
import RecipeDetail from "../components/RecipeDetail";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Load recipes from the API
  const loadRecipes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check environment and database availability
      const envInfo = await getEnvironmentInfo();
      setUsingMockData(envInfo.usingMockData);
      
      if (envInfo.databaseAvailable) {
        // Load from actual API
        const apiRecipes = await recipeApi.getRecipes();
        setRecipes(apiRecipes);
        console.log(`Loaded ${apiRecipes.length} recipes from database`);
      } else {
        throw new Error('Database not available');
      }
    } catch (error) {
      console.error("Failed to load recipes from API:", error);
      setUsingMockData(true);
      
      // Fallback to mock data for development/testing
      const mockRecipes: Recipe[] = [
        {
          id: "1",
          title: "Chocolate Chip Cookies",
          description: "Classic homemade chocolate chip cookies",
          ingredients: ["2 cups flour", "1 cup butter", "1/2 cup brown sugar", "1/2 cup white sugar", "2 eggs", "1 tsp vanilla", "1 tsp baking soda", "1/2 tsp salt", "2 cups chocolate chips"],
          instructions: ["Preheat oven to 375°F", "Cream butter and sugars", "Add eggs and vanilla", "Mix in dry ingredients", "Stir in chocolate chips", "Drop onto baking sheet", "Bake 9-11 minutes"],
          cookingTime: 25,
          servings: 24,
          difficulty: "Easy",
          category: "Dessert",
          tags: ["cookies", "chocolate", "baking"],
          author: "Chef Demo",
          rating: 4.5,
          createdAt: new Date().toISOString()
        }
      ];
      setRecipes(mockRecipes);
      setError("Using demo data - database not connected");
    } finally {
      setLoading(false);
    }
  };

  // Add new recipe
  const handleAddRecipe = async (newRecipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">) => {
    try {
      setError(null);
      // Try to create via API first
      const createdRecipe = await recipeApi.createRecipe(newRecipe);
      setRecipes(prev => [createdRecipe, ...prev]);
      setActiveTab("list");
      setSuccess("Recipe added successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Failed to create recipe via API:", error);
      setError("Failed to save recipe to database. Using local storage.");
      // Fallback to local state for development
      const recipe: Recipe = {
        ...newRecipe,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setRecipes(prev => [recipe, ...prev]);
      setActiveTab("list");
      setTimeout(() => setError(null), 5000);
    }
  };

  // Delete recipe
  const handleDeleteRecipe = async (id: string) => {
    try {
      setError(null);
      // Try to delete via API first
      await recipeApi.deleteRecipe(id);
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null);
      }
      setSuccess("Recipe deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Failed to delete recipe via API:", error);
      setError("Failed to delete from database. Removed locally only.");
      // Fallback to local state for development
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null);
      }
      setTimeout(() => setError(null), 5000);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  if (selectedRecipe) {
    return (
      <RecipeDetail 
        recipe={selectedRecipe} 
        onBack={() => setSelectedRecipe(null)}
        onDelete={handleDeleteRecipe}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Success/Error Notifications */}
      {success && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          ✅ {success}
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          ⚠️ {error}
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🍳 Favorite Recipes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and discover your favorite recipes
          </p>
          {usingMockData && (
            <div className="mt-2 inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
              📝 Demo Mode - Using sample data
            </div>
          )}
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-4 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "list"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              All Recipes ({recipes.length})
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "add"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Add New Recipe
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "list" && (
            <RecipeList
              recipes={recipes}
              loading={loading}
              onSelectRecipe={setSelectedRecipe}
              onDeleteRecipe={handleDeleteRecipe}
            />
          )}
          {activeTab === "add" && (
            <AddRecipe onSubmit={handleAddRecipe} />
          )}
        </div>
      </div>
    </div>
  );
}

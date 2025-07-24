"use client";

import { Recipe } from "@/types/recipe";
import Image from "next/image";

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
}

export default function RecipeList({ recipes, loading, onSelectRecipe, onDeleteRecipe }: RecipeListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No recipes yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Start by adding your first recipe!
        </p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTime = (minutes?: number) => {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectRecipe(recipe)}
        >
          {/* Recipe Image */}
          <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
            {recipe.imageUrl ? (
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🍽️
              </div>
            )}
            {/* Rating Badge */}
            {recipe.rating && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-medium">
                ⭐ {recipe.rating}
              </div>
            )}
          </div>

          {/* Recipe Content */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {recipe.title}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRecipe(recipe.id);
                }}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete recipe"
              >
                🗑️
              </button>
            </div>

            {recipe.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {recipe.description}
              </p>
            )}

            {/* Recipe Info */}
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.difficulty && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}
                >
                  {recipe.difficulty}
                </span>
              )}
              {recipe.category && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                  {recipe.category}
                </span>
              )}
            </div>

            {/* Time and Servings */}
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
              <div className="flex items-center gap-4">
                {recipe.cookingTime && (
                  <span className="flex items-center gap-1">
                    ⏱️ {formatTime(recipe.cookingTime)}
                  </span>
                )}
                {recipe.servings && (
                  <span className="flex items-center gap-1">
                    👥 {recipe.servings}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {recipe.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    +{recipe.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Author and Date */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                {recipe.author && <span>By {recipe.author}</span>}
                {recipe.createdAt && (
                  <span>
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

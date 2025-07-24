"use client";

import { Recipe } from "@/types/recipe";
import Image from "next/image";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export default function RecipeDetail({ recipe, onBack, onDelete }: RecipeDetailProps) {
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
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ⭐
        </span>
      );
    }
    return <div className="flex items-center gap-1">{stars} <span className="ml-2 text-sm">({rating}/5)</span></div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium"
          >
            ← Back to Recipes
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium"
          >
            🗑️ Delete Recipe
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Recipe Image */}
          {recipe.imageUrl && (
            <div className="h-64 md:h-80 relative">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title and Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {recipe.title}
              </h1>
              
              {recipe.description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {recipe.description}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 items-center mb-4">
                {recipe.difficulty && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                )}
                {recipe.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                    {recipe.category}
                  </span>
                )}
                {recipe.author && (
                  <span className="text-gray-600 dark:text-gray-300">
                    by <strong>{recipe.author}</strong>
                  </span>
                )}
              </div>

              {/* Rating */}
              {recipe.rating && (
                <div className="mb-4">
                  {renderStars(recipe.rating)}
                </div>
              )}

              {/* Time and Servings */}
              <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-300">
                {recipe.cookingTime && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⏱️</span>
                    <span><strong>Cook Time:</strong> {formatTime(recipe.cookingTime)}</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👥</span>
                    <span><strong>Serves:</strong> {recipe.servings}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-4 text-gray-700 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="pt-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Footer Info */}
            {(recipe.createdAt || recipe.updatedAt) && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex flex-wrap justify-between gap-4">
                  {recipe.createdAt && (
                    <span>
                      Created: {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                  {recipe.updatedAt && recipe.updatedAt !== recipe.createdAt && (
                    <span>
                      Updated: {new Date(recipe.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

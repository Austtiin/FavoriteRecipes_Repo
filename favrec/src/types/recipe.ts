export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookingTime?: number;
  servings?: number;
  difficulty?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  author?: string;
  rating?: number;
  imageUrl?: string;
}

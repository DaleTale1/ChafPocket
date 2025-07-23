"use client";

import { useState, useMemo, type SetStateAction, type Dispatch } from 'react';
import type { Recipe } from '@/lib/types';
import { Header } from '@/components/Header';
import { RecipeCard } from '@/components/RecipeCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const initialRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Spaghetti Carbonara',
    ingredients: [
      { id: 'i1', name: 'Spaghetti', checked: false },
      { id: 'i2', name: 'Guanciale', checked: false },
      { id: 'i3', name: 'Eggs', checked: false },
      { id: 'i4', name: 'Pecorino Romano Cheese', checked: false },
      { id: 'i5', name: 'Black Pepper', checked: false },
    ],
    tags: ['pasta', 'italian', 'classic'],
    imageUrl: 'https://placehold.co/600x400.png',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Avocado Toast with a Twist',
    ingredients: [
      { id: 'i1', name: 'Sourdough Bread', checked: false },
      { id: 'i2', name: 'Avocado', checked: false },
      { id: 'i3', name: 'Red Pepper Flakes', checked: false },
      { id: 'i4', name: 'Lemon Juice', checked: false },
      { id: 'i5', name: 'Feta Cheese', checked: false },
    ],
    tags: ['breakfast', 'healthy', 'vegetarian'],
    imageUrl: 'https://placehold.co/600x400.png',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: '3',
    name: 'Spicy Thai Green Curry',
    ingredients: [
      { id: 'i1', name: 'Chicken Breast', checked: false },
      { id: 'i2', name: 'Green Curry Paste', checked: false },
      { id: 'i3', name: 'Coconut Milk', checked: false },
      { id: 'i4', name: 'Bamboo Shoots', checked: false },
      { id: 'i5', name: 'Thai Basil', checked: false },
    ],
    tags: ['thai', 'spicy', 'curry'],
    imageUrl: 'https://placehold.co/600x400.png',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
];

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  const setRecipe: Dispatch<SetStateAction<Recipe>> = (recipeOrFn) => {
    if (typeof recipeOrFn === 'function') {
      // Not handling function update for this mock
    } else {
        handleUpdateRecipe(recipeOrFn);
    }
  }

  const filteredRecipes = useMemo(() => {
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [recipes, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onAddRecipe={handleAddRecipe} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes by name or tag..."
              className="pl-10 w-full h-12 text-lg rounded-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                setRecipe={setRecipe}
                onUpdate={handleUpdateRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-muted-foreground">No recipes found</h2>
            <p className="mt-2 text-muted-foreground">
              Try a different search term or add a new recipe!
            </p>
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>Pocket Chef &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

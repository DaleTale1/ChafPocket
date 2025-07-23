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
    name: 'ספגטי קרבונרה קלאסי',
    ingredients: [
      { id: 'i1', name: 'ספגטי', checked: false },
      { id: 'i2', name: 'גואנצ\'לה', checked: false },
      { id: 'i3', name: 'ביצים', checked: false },
      { id: 'i4', name: 'גבינת פקורינו רומנו', checked: false },
      { id: 'i5', name: 'פלפל שחור', checked: false },
    ],
    tags: ['פסטה', 'איטלקי', 'קלאסי'],
    imageUrl: 'https://placehold.co/600x400.png',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'טוסט אבוקדו עם טוויסט',
    ingredients: [
      { id: 'i1', name: 'לחם מחמצת', checked: false },
      { id: 'i2', name: 'אבוקדו', checked: false },
      { id: 'i3', name: 'פתיתי צ\'ילי', checked: false },
      { id: 'i4', name: 'מיץ לימון', checked: false },
      { id: 'i5', name: 'גבינת פטה', checked: false },
    ],
    tags: ['ארוחת בוקר', 'בריא', 'צמחוני'],
    imageUrl: 'https://placehold.co/600x400.png',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: '3',
    name: 'קארי ירוק תאילנדי חריף',
    ingredients: [
      { id: 'i1', name: 'חזה עוף', checked: false },
      { id: 'i2', name: 'משחת קארי ירוק', checked: false },
      { id: 'i3', name: 'חלב קוקוס', checked: false },
      { id: 'i4', name: 'נצרי במבוק', checked: false },
      { id: 'i5', name: 'בזיליקום תאילנדי', checked: false },
    ],
    tags: ['תאילנדי', 'חריף', 'קארי'],
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
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="חפש מתכונים לפי שם או תגית..."
              className="pr-10 w-full h-12 text-lg rounded-full shadow-sm"
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
            <h2 className="text-2xl font-semibold text-muted-foreground">לא נמצאו מתכונים</h2>
            <p className="mt-2 text-muted-foreground">
              נסה מונח חיפוש אחר או הוסף מתכון חדש!
            </p>
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>שף כיס &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

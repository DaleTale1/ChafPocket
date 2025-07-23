"use client";

import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { Recipe, Ingredient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RecipeForm } from '@/components/RecipeForm';
import { FilePenLine, Trash2 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  onUpdate: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export function RecipeCard({ recipe, setRecipe, onUpdate, onDelete }: RecipeCardProps) {
  const [isEditOpen, setEditOpen] = useState(false);

  const handleIngredientToggle = (ingredientId: string) => {
    const updatedIngredients = recipe.ingredients.map((ing) =>
      ing.id === ingredientId ? { ...ing, checked: !ing.checked } : ing
    );
    onUpdate({ ...recipe, ingredients: updatedIngredients });
  };
  
  const handleUpdateDone = () => {
    setEditOpen(false);
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={recipe.imageUrl || 'https://placehold.co/600x400.png'}
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="recipe food"
          />
        </div>
        <div className="p-6 pb-2">
            <CardTitle className="text-xl font-headline">{recipe.name}</CardTitle>
            <CardDescription className="pt-2">
                {new Date(recipe.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="ingredients">
            <AccordionTrigger>Ingredients</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${recipe.id}-${ingredient.id}`}
                      checked={ingredient.checked}
                      onCheckedChange={() => handleIngredientToggle(ingredient.id)}
                    />
                    <Label
                      htmlFor={`${recipe.id}-${ingredient.id}`}
                      className={`flex-grow ${ingredient.checked ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {ingredient.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex justify-end gap-2">
        <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FilePenLine className="mr-2 h-4 w-4" /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Recipe</DialogTitle>
            </DialogHeader>
            <RecipeForm
              onFormSubmit={onUpdate}
              onDone={handleUpdateDone}
              existingRecipe={recipe}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the recipe for "{recipe.name}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(recipe.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

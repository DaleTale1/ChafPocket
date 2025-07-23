"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChefHatIcon } from '@/components/icons/ChefHatIcon';
import { RecipeForm } from '@/components/RecipeForm';
import { TimerDialog } from '@/components/TimerDialog';
import { SettingsSheet } from '@/components/SettingsSheet';
import type { Recipe } from '@/lib/types';
import { Plus, Timer, Settings } from 'lucide-react';

interface HeaderProps {
  onAddRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
}

export function Header({ onAddRecipe }: HeaderProps) {
  const [isAddRecipeOpen, setAddRecipeOpen] = useState(false);
  
  const handleRecipeAdded = () => {
    setAddRecipeOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <ChefHatIcon className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold font-headline">Pocket Chef</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Dialog open={isAddRecipeOpen} onOpenChange={setAddRecipeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add a New Recipe</DialogTitle>
              </DialogHeader>
              <RecipeForm onFormSubmit={onAddRecipe} onDone={handleRecipeAdded} />
            </DialogContent>
          </Dialog>

          <TimerDialog />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <SettingsSheet />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

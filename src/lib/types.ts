export interface Ingredient {
  id: string;
  name: string;
  checked: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  tags: string[];
  imageUrl: string;
  createdAt: Date;
}

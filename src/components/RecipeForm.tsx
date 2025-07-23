"use client"

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Recipe, Ingredient } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Trash2, PlusCircle, UploadCloud } from "lucide-react";

const recipeSchema = z.object({
  name: z.string().min(3, "שם המתכון חייב להכיל לפחות 3 תווים."),
  imageUrl: z.string().url("אנא הזן כתובת URL חוקית של תמונה.").or(z.literal("")),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "שם המרכיב לא יכול להיות ריק."),
    })
  ).min(1, "אנא הוסף לפחות מרכיב אחד."),
  tags: z.array(
    z.object({
      value: z.string().min(1, "תגית לא יכולה להיות ריקה."),
    })
  ),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  onFormSubmit: (data: any) => void;
  onDone: () => void;
  existingRecipe?: Recipe;
}

export function RecipeForm({ onFormSubmit, onDone, existingRecipe }: RecipeFormProps) {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: existingRecipe?.name || "",
      imageUrl: existingRecipe?.imageUrl || "",
      ingredients: existingRecipe?.ingredients.map(ing => ({ name: ing.name })) || [{ name: "" }],
      tags: existingRecipe?.tags.map(tag => ({ value: tag })) || [],
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const onSubmit = (data: RecipeFormValues) => {
    const submittedData = {
      ...existingRecipe,
      ...data,
      tags: data.tags.map(t => t.value),
      ingredients: data.ingredients.map(ing => ({
        id: Math.random().toString(),
        name: ing.name,
        checked: false,
      })),
    };
    onFormSubmit(submittedData);
    toast({
        title: `המתכון ${existingRecipe ? 'עודכן' : 'נוסף'}!`,
        description: `"${data.name}" ${existingRecipe ? 'עודכן' : 'נוסף'} בהצלחה.`,
    })
    onDone();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>שם המתכון</FormLabel>
                    <FormControl>
                        <Input placeholder="לדוגמה, עוגת התפוחים של סבתא" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="space-y-2">
                    <FormLabel>מצרכים</FormLabel>
                    {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                            <FormField
                            control={form.control}
                            name={`ingredients.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                <FormControl>
                                    <Input placeholder={`מצרך ${index + 1}`} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendIngredient({ name: "" })}>
                        <PlusCircle className="ml-2 h-4 w-4" /> הוסף מצרך
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                 <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>כתובת URL של תמונה</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2">
                    <FormLabel>תגיות</FormLabel>
                    <div className="flex flex-wrap gap-2">
                        {tagFields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1">
                                <FormField
                                control={form.control}
                                name={`tags.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="bg-transparent border-none h-6 p-0 focus-visible:ring-0" placeholder="תגית" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                                <button type="button" onClick={() => removeTag(index)}>
                                    <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive"/>
                                </button>
                            </div>
                        ))}
                    </div>
                     <Button type="button" variant="outline" size="sm" onClick={() => appendTag({ value: "" })}>
                        <PlusCircle className="ml-2 h-4 w-4" /> הוסף תגית
                    </Button>
                </div>

            </div>
        </div>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onDone}>ביטול</Button>
            <Button type="submit">שמור מתכון</Button>
        </div>
      </form>
    </Form>
  );
}

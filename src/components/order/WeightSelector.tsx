
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues, weightOptions } from "./OrderFormSchema";

interface WeightSelectorProps {
  form: UseFormReturn<FormValues>;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({ form }) => {
  // Calculate info values based on selected weight
  const selectedWeight = parseFloat(form.watch("weight") || "1");
  const skewersCount = selectedWeight * 5;
  const peopleCount = selectedWeight * 4;

  return (
    <>
      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Вес (кг)</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите вес" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {weightOptions.map((weight) => (
                  <SelectItem key={weight} value={weight.toString()}>
                    {weight} кг
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-suretRed" />
          <span className="text-sm">{skewersCount} шампуров</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-suretRed" />
          <span className="text-sm">Хватает на {peopleCount} человек</span>
        </div>
      </div>
    </>
  );
};

export default WeightSelector;

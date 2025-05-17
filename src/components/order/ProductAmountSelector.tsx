import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Minus, Plus, Users, Utensils } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormValues,
  Product,
  quantityOptions,
  weightOptions,
} from "./OrderFormSchema";

interface ProductAmountSelectorProps {
  form: UseFormReturn<FormValues>;
  product: Product;
}

const ProductAmountSelector: React.FC<ProductAmountSelectorProps> = ({
  form,
  product,
}) => {
  const isSteak = product.type === "steak";

  // For steaks: use quantity, for other products: use weight
  const fieldName = isSteak ? "quantity" : "weight";
  const options = isSteak ? quantityOptions : weightOptions;
  const unit = isSteak ? "шт." : "кг";
  const fieldLabel = isSteak ? "Количество (шт.)" : "Вес (кг)";

  // Get the current value with a fallback to "1"
  const currentValue = form.watch(fieldName) || "1";
  const numericValue = parseFloat(currentValue);

  // Calculate info values based on selected amount
  let peopleCount = 0;
  let skewersCount = 0;

  if (isSteak) {
    // For steaks: 1 piece per person
    peopleCount = numericValue;
  } else {
    // For other products: 4 people per kg, 5 skewers per kg
    peopleCount = numericValue * 4;
    skewersCount = numericValue * 5;
  }

  const handleIncrement = () => {
    const newValue = numericValue + (isSteak ? 1 : 0.5);

    if (newValue <= options[options.length - 1]) {
      form.setValue(fieldName, newValue.toString());
    }
  };

  const handleDecrement = () => {
    const newValue = numericValue - (isSteak ? 1 : 0.5);

    if (newValue >= options[0]) {
      form.setValue(fieldName, newValue.toString());
    }
  };

  return (
    <div className="flex justify-between items-end gap-2">
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldLabel}</FormLabel>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={parseFloat(field.value || "1") <= options[0]}
                className="h-10 w-10 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <FormControl>
                <div className="flex items-center justify-center h-10 w-16 border rounded-md bg-white">
                  <span className="font-medium">
                    {field.value || "1"} {unit}
                  </span>
                </div>
              </FormControl>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={
                  parseFloat(field.value || "1") >= options[options.length - 1]
                }
                className="h-10 w-10 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md h-min">
        {!isSteak && (
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-suretRed" />
            <span className="text-sm">{skewersCount} шампуров</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-suretRed" />
          <span className="text-sm">Хватает на {peopleCount} человек</span>
        </div>
      </div>
    </div>
  );
};

export default ProductAmountSelector;

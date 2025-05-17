import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Minus, Plus, Users } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues, quantityOptions } from "./OrderFormSchema";

interface QuantitySelectorProps {
  form: UseFormReturn<FormValues>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ form }) => {
  // Calculate info values based on selected quantity
  const selectedQuantity = parseFloat(form.watch("quantity") || "1");
  const peopleCount = selectedQuantity; // 1 piece per person

  const handleIncrement = () => {
    const currentQuantity = parseFloat(form.getValues("quantity"));
    const newQuantity = currentQuantity + 1;

    if (newQuantity <= quantityOptions[quantityOptions.length - 1]) {
      form.setValue("quantity", newQuantity.toString());
    }
  };

  const handleDecrement = () => {
    const currentQuantity = parseFloat(form.getValues("quantity"));
    const newQuantity = currentQuantity - 1;

    if (newQuantity >= quantityOptions[0]) {
      form.setValue("quantity", newQuantity.toString());
    }
  };

  return (
    <div className="flex justify-between gap-2">
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Количество (шт.)</FormLabel>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={parseFloat(field.value) <= quantityOptions[0]}
                className="h-10 w-10 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <FormControl>
                <div className="flex items-center justify-center h-10 w-16 border rounded-md bg-white">
                  <span className="font-medium">{field.value} шт.</span>
                </div>
              </FormControl>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={
                  parseFloat(field.value) >=
                  quantityOptions[quantityOptions.length - 1]
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
      <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-suretRed" />
          <span className="text-sm">Хватает на {peopleCount} человек</span>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;

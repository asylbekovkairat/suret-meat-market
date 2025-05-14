
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Drill, Flame } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./OrderFormSchema";

interface ExtrasSelectorProps {
  form: UseFormReturn<FormValues>;
}

const ExtrasSelector: React.FC<ExtrasSelectorProps> = ({ form }) => {
  return (
    <div className="space-y-2 p-3 bg-gray-50 rounded-md">
      <p className="text-sm font-medium mb-2">Дополнительные услуги:</p>
      
      <FormField
        control={form.control}
        name="extras.grill"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="flex items-center gap-2">
                <Drill className="h-4 w-4 text-suretRed" />
                Мангал
              </FormLabel>
              <p className="text-xs text-muted-foreground">
                Складной мангал для приготовления шашлыка
              </p>
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="extras.charcoal"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-suretRed" />
                Уголь
              </FormLabel>
              <p className="text-xs text-muted-foreground">
                Качественный уголь для быстрого розжига
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ExtrasSelector;

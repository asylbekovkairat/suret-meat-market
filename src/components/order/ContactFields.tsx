
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./OrderFormSchema";
import { MapPin } from "lucide-react";

interface ContactFieldsProps {
  form: UseFormReturn<FormValues>;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Имя</FormLabel>
            <FormControl>
              <Input placeholder="Ваше имя" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => {
          const formatPhoneNumber = (value: string) => {
            // Remove all non-digits
            const digits = value.replace(/\D/g, '');
            
            // Format for display
            if (digits.length === 0) return '';
            
            let formatted = '+996';
            
            if (digits.length > 0) {
              formatted += ' ' + digits.substring(0, Math.min(digits.length, 3));
            }
            
            if (digits.length > 3) {
              formatted += ' ' + digits.substring(3, Math.min(digits.length, 6));
            }
            
            if (digits.length > 6) {
              formatted += '-' + digits.substring(6, Math.min(digits.length, 8));
            }
            
            if (digits.length > 8) {
              formatted += '-' + digits.substring(8, Math.min(digits.length, 10));
            }
            
            return formatted;
          };
          
          const [displayValue, setDisplayValue] = useState(formatPhoneNumber(field.value));
          
          return (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+996 ___ ___-__-__" 
                  type="tel"
                  value={displayValue}
                  onChange={(e) => {
                    // Extract only digits for form value
                    const rawValue = e.target.value.replace(/\D/g, '');
                    // Store raw digits in form
                    field.onChange(rawValue);
                    // Update display value with formatting
                    setDisplayValue(formatPhoneNumber(rawValue));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Город</FormLabel>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Ваш город" 
                  className="pl-8" 
                  {...field} 
                  onChange={(e) => {
                    // Allow only letters, spaces, and hyphens
                    let value = e.target.value;
                    // Convert first letter of each word to uppercase
                    value = value.replace(/\b\w/g, c => c.toUpperCase());
                    field.onChange(value);
                  }}
                />
              </div>
            </FormControl>
            <p className="text-xs text-muted-foreground mt-1">
              Введите название города (например, Бишкек, Ош)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactFields;

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, User } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import InputMask from "react-input-mask";
import { FormValues } from "./OrderFormSchema";

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
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Ваше имя"
                  className="pl-8"
                  {...field}
                  onChange={(e) => {
                    // Capitalize first letter of each word
                    const value = e.target.value.replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    );
                    field.onChange(value);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <InputMask
                    mask="0 999 999 999"
                    value={field.value}
                    onChange={(e) => {
                      // Extract only digits for form value
                      const rawValue = e.target.value.replace(/\D/g, "");
                      field.onChange(rawValue);
                    }}
                    alwaysShowMask={true}
                    maskChar="_"
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        type="tel"
                        placeholder="Например: 0 999 999 999"
                        className="pl-8"
                      />
                    )}
                  </InputMask>
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                Формат: 0 XXX XXX XX XX
              </p>
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
                <InputMask
                  mask="aaaaaaaaaaaaaaaaaaaaa"
                  maskChar=""
                  formatChars={{
                    a: "[А-Яа-яA-Za-z- ]",
                  }}
                  value={field.value}
                  onChange={(e) => {
                    // Allow only letters, spaces, and hyphens
                    let value = e.target.value;
                    // Convert first letter of each word to uppercase
                    value = value.replace(/\b\w/g, (c) => c.toUpperCase());
                    field.onChange(value);
                  }}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      placeholder="Ваш город"
                      className="pl-8"
                    />
                  )}
                </InputMask>
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

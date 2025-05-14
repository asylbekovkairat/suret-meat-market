
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Utensils, Users, Grill, Coal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { sendTelegramMessage } from "@/utils/telegram";

interface Product {
  id: number;
  name: string;
  description: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const formSchema = z.object({
  weight: z.string({
    required_error: "Пожалуйста, выберите вес",
  }),
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z.string().min(10, {
    message: "Введите корректный номер телефона",
  }),
  city: z.string().min(2, {
    message: "Укажите город доставки",
  }),
  extras: z.object({
    grill: z.boolean().default(false),
    charcoal: z.boolean().default(false),
  }).default({
    grill: false,
    charcoal: false,
  }),
});

type FormValues = z.infer<typeof formSchema>;

const weightOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "1",
      name: "",
      phone: "",
      city: "",
      extras: {
        grill: false,
        charcoal: false,
      },
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Convert weight from string to number for calculations
      const weightNum = parseFloat(values.weight);
      const skewers = weightNum * 5;
      const people = weightNum * 4;
      
      // Format message for Telegram
      const message = `
🆕 Новый заказ:
Продукт: ${product.name}
Имя: ${values.name}
Телефон: ${values.phone}
Кол-во: ${values.weight} кг (≈ ${skewers} шампуров, на ${people} чел.)
Город: ${values.city}
Дополнительные услуги: ${values.extras.grill ? '✅ Мангал' : '❌ Мангал'}, ${values.extras.charcoal ? '✅ Уголь' : '❌ Уголь'}
      `;
      
      // In a real application, you would send this to your Telegram webhook
      console.log("Sending to Telegram:", message);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setFormSuccess(true);
      toast({
        title: "✅ Спасибо!",
        description: "Мы скоро свяжемся с вами.",
      });
      
      // Close modal after a delay
      setTimeout(() => {
        onClose();
        setFormSuccess(false);
        form.reset();
      }, 2000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заказ. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate info values based on selected weight
  const selectedWeight = parseFloat(form.watch("weight") || "1");
  const skewersCount = selectedWeight * 5;
  const peopleCount = selectedWeight * 4;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-bold text-suretRed">
          Заказать: {product.name}
        </DialogTitle>
        <DialogDescription>
          Заполните форму, и мы свяжемся с вами для уточнения деталей заказа.
        </DialogDescription>
        
        {formSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-center text-lg font-medium">Спасибо за заказ!</p>
            <p className="text-center text-gray-500">Мы скоро свяжемся с вами.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          <Grill className="h-4 w-4 text-suretRed" />
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
                          <Coal className="h-4 w-4 text-suretRed" />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер телефона</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+7 (___) ___-__-__" 
                        type="tel"
                        {...field}
                        onChange={(e) => {
                          // Simple phone number formatting logic
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Город</FormLabel>
                    <FormControl>
                      <Input placeholder="Ваш город" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-suretGreen hover:bg-green-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заказ"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;

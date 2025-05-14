
import * as z from "zod";

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;

export const weightOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface OrderFormProps {
  product: Product;
  onSubmit: (values: FormValues) => Promise<void>;
  isSubmitting: boolean;
}

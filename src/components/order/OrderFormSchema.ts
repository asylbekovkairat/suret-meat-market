import * as z from "zod";

export const formSchema = z.object({
  weight: z
    .string({
      required_error: "Пожалуйста, выберите вес",
    })
    .optional(),
  quantity: z
    .string({
      required_error: "Пожалуйста, выберите количество",
    })
    .optional(),
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z
    .string()
    .min(9, { message: "Номер телефона должен содержать минимум 9 цифр" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Номер телефона должен содержать только цифры",
    }),
  city: z
    .string()
    .min(2, { message: "Укажите город доставки" })
    .refine((val) => /^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(val), {
      message:
        "Название города должно содержать только буквы, пробелы и дефисы",
    }),
  extras: z
    .object({
      grill: z.boolean().default(false),
      charcoal: z.boolean().default(false),
    })
    .default({
      grill: false,
      charcoal: false,
    }),
  // Not required in the form but will be calculated and added to the submission
  totalPrice: z.number().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export const weightOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface Product {
  id: number;
  name: string;
  description: string;
  type?: string; // 'steak' for steaks, undefined or other values for other products
}

export interface OrderFormProps {
  product: Product;
  onSubmit: (values: FormValues & { totalPrice: number }) => Promise<void>;
  isSubmitting: boolean;
}

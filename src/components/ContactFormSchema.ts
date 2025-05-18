import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z
    .string()
    .min(9, { message: "Номер телефона должен содержать минимум 9 цифр" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Номер телефона должен содержать только цифры",
    }),
  message: z.string().min(10, {
    message: "Сообщение должно содержать минимум 10 символов",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => Promise<void>;
  isSubmitting: boolean;
}

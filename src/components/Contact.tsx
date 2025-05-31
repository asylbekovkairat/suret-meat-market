import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Instagram, Mail, MessageSquare, Phone } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { contactFormSchema, ContactFormValues } from "./ContactFormSchema";

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Send contact data to our backend API
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const response = await axios.post(`${apiUrl}/api/contact-us`, values);

      if (response.data.success) {
        // Show success message
        setFormSuccess(true);
        toast({
          title: "✅ Спасибо за сообщение!",
          description: "Мы скоро свяжемся с вами.",
        });

        // Reset form
        form.reset();

        // Reset success state after a delay
        setTimeout(() => {
          setFormSuccess(false);
        }, 3000);
      } else {
        throw new Error(
          response.data.message || "Произошла ошибка при отправке сообщения"
        );
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Ошибка",
        description:
          "Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-suretGray py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          Остались вопросы? Напишите нам
        </h2>

        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-suretRed text-white p-8">
              <h3 className="text-2xl font-semibold mb-6">
                Контактная информация
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Телефон / WhatsApp</p>
                    <a
                      href="https://wa.me/996503113311"
                      className="text-white hover:text-white underline transition-colors"
                    >
                      +996 503 11-33-11
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:suret.meat.kg@gmail.com"
                      className="text-white hover:text-white underline transition-colors"
                    >
                      suret.meat.kg@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <a
                      className="text-white hover:text-white underline transition-colors"
                      href="https://www.instagram.com/suret.kg/"
                      target="_blank"
                    >
                      @suret.kg
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Имя
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-suretRed focus:border-transparent"
                              placeholder="Ваше имя"
                              {...field}
                              onChange={(e) => {
                                // Auto-capitalize first letter of each word
                                const value = e.target.value;
                                const capitalized = value
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ");
                                field.onChange(capitalized);
                              }}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
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
                                  const rawValue = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Сообщение
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-suretRed focus:border-transparent"
                            placeholder="Ваше сообщение"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-suretRed hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                  </Button>

                  {formSuccess && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
                      Спасибо! Ваше сообщение успешно отправлено.
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

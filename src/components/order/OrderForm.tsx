
import React from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema, OrderFormProps } from "./OrderFormSchema";
import WeightSelector from "./WeightSelector";
import ExtrasSelector from "./ExtrasSelector";
import ContactFields from "./ContactFields";

const OrderForm: React.FC<OrderFormProps> = ({ product, onSubmit, isSubmitting }) => {
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

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <WeightSelector form={form} />
        
        <ExtrasSelector form={form} />

        <ContactFields form={form} />
        
        <Button 
          type="submit" 
          className="w-full bg-suretGreen hover:bg-green-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить заказ"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;

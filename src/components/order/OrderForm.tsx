import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import ContactFields from "./ContactFields";
import ExtrasSelector from "./ExtrasSelector";
import { formSchema, FormValues, OrderFormProps } from "./OrderFormSchema";
import ProductAmountSelector from "./ProductAmountSelector";

const OrderForm: React.FC<OrderFormProps> = ({
  product,
  onSubmit,
  isSubmitting,
}) => {
  // Set default values based on product type
  const isSteak = product.type === "steak";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // For steaks, use quantity; for other products, use weight
      ...(isSteak ? { quantity: "1" } : { weight: "1" }),
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
        <ProductAmountSelector form={form} product={product} />

        <ContactFields form={form} />

        <ExtrasSelector form={form} />
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

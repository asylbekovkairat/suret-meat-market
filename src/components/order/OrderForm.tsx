import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, Utensils } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import ContactFields from "./ContactFields";
import ExtrasSelector from "./ExtrasSelector";
import { formSchema, FormValues, OrderFormProps } from "./OrderFormSchema";
import ProductAmountSelector from "./ProductAmountSelector";

// Price mapping for products (in som)
const PRODUCT_PRICES = {
  "Куриный шашлык": 990, // филе
  "Куриные крылышки": 995,
  Стейки: 850, // говядина
  Ребрышки: 1500, // баранина
};

const OrderForm: React.FC<OrderFormProps> = ({
  product,
  onSubmit,
  isSubmitting,
}) => {
  // Set default values based on product type
  const isSteak = product.type === "steak";
  const [totalPrice, setTotalPrice] = useState(0);

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

  // Watch for changes in quantity or weight to update price
  const quantity = useWatch({
    control: form.control,
    name: "quantity",
    defaultValue: "1",
  });

  const weight = useWatch({
    control: form.control,
    name: "weight",
    defaultValue: "1",
  });

  const extras = useWatch({
    control: form.control,
    name: "extras",
    defaultValue: { grill: false, charcoal: false },
  });

  // Calculate price based on product type and amount
  // Calculate info values based on selected amount
  const [peopleCount, setPeopleCount] = useState(0);
  const [skewersCount, setSkewersCount] = useState(0);

  useEffect(() => {
    const basePrice = PRODUCT_PRICES[product.name] || 990; // Default to 990 if not found

    // Calculate price based on quantity for steaks or weight for other products
    let amount = 1;
    if (isSteak && quantity) {
      amount = parseInt(quantity, 10) || 1;
      // For steaks: 1 piece per person
      setPeopleCount(amount);
    } else if (!isSteak && weight) {
      amount = parseFloat(weight) || 1;
      // For other products: 4 people per kg, 5 skewers per kg
      setPeopleCount(amount * 4);
      setSkewersCount(amount * 5);
    }

    // Calculate extras cost (example: 100 som for grill, 150 for charcoal)
    const extrasPrice = (extras.grill ? 100 : 0) + (extras.charcoal ? 150 : 0);

    // Calculate total price
    const calculatedPrice = basePrice * amount + extrasPrice;
    setTotalPrice(calculatedPrice);
  }, [product.name, isSteak, quantity, weight, extras]);

  const handleSubmit = async (values: FormValues) => {
    // Add price to the submitted values
    await onSubmit({ ...values, totalPrice });
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
          {isSubmitting ? "Отправка..." : `Отправить заказ (${totalPrice} сом)`}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;

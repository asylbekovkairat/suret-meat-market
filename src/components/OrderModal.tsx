import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";
import OrderForm from "./order/OrderForm";
import { FormValues, Product } from "./order/OrderFormSchema";
import OrderSuccess from "./order/OrderSuccess";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Send order data to our backend API
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      // Always use /api/submit-order as the endpoint
      console.log("Sending order to:", `${apiUrl}/api/submit-order`);
      const response = await axios.post(`${apiUrl}/api/submit-order`, {
        product,
        values,
      });

      if (response.data.success) {
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
        }, 2000);
      } else {
        throw new Error(
          response.data.message || "Произошла ошибка при отправке заказа"
        );
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Ошибка",
        description:
          "Не удалось отправить заказ. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] w-[95vw] md:w-auto p-4 md:p-6">
        <DialogTitle className="text-xl font-bold text-suretRed">
          Заказать: {product.name}
        </DialogTitle>
        <DialogDescription>
          Заполните форму, и мы свяжемся с вами для уточнения деталей заказа.
        </DialogDescription>

        {formSuccess ? (
          <OrderSuccess />
        ) : (
          <OrderForm
            product={product}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;

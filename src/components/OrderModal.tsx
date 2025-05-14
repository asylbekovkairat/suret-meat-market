
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import OrderForm from "./order/OrderForm";
import OrderSuccess from "./order/OrderSuccess";
import { FormValues, Product } from "./order/OrderFormSchema";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const handleSubmit = async (values: FormValues) => {
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

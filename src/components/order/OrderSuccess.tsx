
import React from 'react';

const OrderSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-4xl mb-4">✅</div>
      <p className="text-center text-lg font-medium">Спасибо за заказ!</p>
      <p className="text-center text-gray-500">Мы скоро свяжемся с вами.</p>
    </div>
  );
};

export default OrderSuccess;
